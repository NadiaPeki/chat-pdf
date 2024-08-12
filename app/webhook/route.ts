import { adminDb } from '@/firebaseAdmin';
import stripe from '@/lib/stripe';
import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(req: NextRequest) {
  const headersList = headers();
  const body = await req.text();
  const signature = headersList.get('stripe-signature');

  console.log('Received webhook, processing...');

  if (!signature) {
    console.error('No signature found in headers.');
    return new Response('No signature', { status: 400 });
  }

  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    console.error('Stripe webhook secret is not set.');
    return new NextResponse('Stripe webhook secret is not set', {
      status: 400,
    });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET);
    // console.log('Webhook event constructed successfully:', event.type);
  } catch (err) {
    console.error(`Webhook Error: ${err}`);
    return new NextResponse(`Webhook Error: ${err}`, { status: 400 });
  }

  const getUserDetails = async (customerId: string) => {
    // console.log('Looking for user with Stripe customerId:', customerId);

    const userDoc = await adminDb
      .collection('users')
      .where('stripeCustomerId', '==', customerId)
      .limit(1)
      .get();

    if (!userDoc.empty) {
      // console.log('User found:', userDoc.docs[0].id);
      return userDoc.docs[0];
    }
  };

  switch (event.type) {
    case 'checkout.session.completed':
    case 'payment_intent.succeeded': {
      // console.log('Handling event:', event.type);
      const invoice = event.data.object;
      const customerId = invoice.customer as string;

      const userDetails = await getUserDetails(customerId);
      if (!userDetails?.id) {
        // console.error('User not found for checkout.session.completed or payment_intent.succeeded.');
        return new NextResponse('User not found', { status: 404 });
      }
// Update the user's subscription status
      await adminDb.collection('users').doc(userDetails?.id).update({
        hasActiveMembership: true,
      });
      break;
    }
    case 'customer.subscription.deleted':
    case 'subscription_schedule.canceled': {
      // console.log('Handling event:', event.type);
      const subscription = event.data.object as Stripe.Subscription;
      const customerId = subscription.customer as string;

      const userDetails = await getUserDetails(customerId);
      if (!userDetails?.id) {
        return new NextResponse('User not found', { status: 404 });
      }

        await adminDb.collection('users').doc(userDetails?.id).update({
          hasActiveMembership: false,
        });
        break;
    }

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // console.log('Webhook processing completed.');
  return NextResponse.json({ message: 'Webhook received' });
}
