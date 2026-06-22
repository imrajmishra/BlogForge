"use server";

import { createNhostClient } from "@/lib/nhost";


/**
 * POST /api/signout
 * Backend API route to handle Nhost user sign-out
 */
export async function signOutUser() {
  const nhost = await createNhostClient();

  // 1. Revoke the tokens on Nhost's backend
  await nhost.auth.signOut();

  // 2. Clear out Next.js page caches so the UI updates globally
  revalidatePath("/", "layout");

  // 3. Kick the user back to the home page or login screen
  redirect("/login");
}