'use server';
import { generateEmbeddingsInPineconeVectorStore } from '@/lib/langchain';
import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';

export async function generateEmbeddings(docId: string) {
  auth().protect(); // Protect this route with Clerk
  // No one can do this code if not authorize

  // turn a PDF into a lot of embeddings [0.0123234, 0.234234, ...]
  // turn a PDF into string of numbers
  await generateEmbeddingsInPineconeVectorStore(docId);

  revalidatePath('/dashboard');

  return { completed: true };
}
