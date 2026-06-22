import { createServerClient } from "@nhost/nhost-js";
import { cookies } from "next/headers";

// Nhost stores the whole session object under a single default key
const NHOST_SESSION_KEY = "nhostSession";

export async function createNhostClient() {
  const cookieStore = await cookies();

  return createServerClient({
    subdomain: process.env.NEXT_NHOST_SUBDOMAIN,
    region: process.env.NEXT_NHOST_REGION,
    storage: {
      // Reads the session from cookies
      get() {
        const rawSession = cookieStore.get(NHOST_SESSION_KEY)?.value;
        return rawSession ? JSON.parse(rawSession) : null;
      },
      // Sets the session cookie
      set(value) {
        try {
          cookieStore.set(NHOST_SESSION_KEY, JSON.stringify(value), {
            path: "/",
            httpOnly: false, // Must be false if client-side state synchronization is needed
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
          });
        } catch {
          // This catch blocks suppresses errors when called from a read-only
          // context like a standard React Server Component (RSC) page layout.
        }
      },
      // Deletes the session cookie on logout
      remove() {
        try {
          cookieStore.delete(NHOST_SESSION_KEY);
        } catch {
          // Suppress errors if called during a read-only layout render
        }
      },
    },
  });
}
