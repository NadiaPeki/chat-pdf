'use server';
import { auth } from '@clerk/nextjs/server';
import { UserDetails } from '@/app/dashboard/upgrade/page';

export async function createCheckoutSession(userDetails: UserDetails) {
  auth().protect();
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User not found");
    
  }
}
