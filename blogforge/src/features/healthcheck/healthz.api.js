import { createNhostClient } from "@/lib/nhost";


export async function checkNhostHealth() {
  // 1. Get your environmental variables
  const subdomain = process.env.NEXT_NHOST_SUBDOMAIN;
  const region = process.env.NEXT_NHOST_REGION;

  // 2. Construct the Auth healthz URL
  const authHealthUrl = `https://${subdomain}.auth.${region}.nhost.run/v1/healthz`;

  try {
    // 3. Perform a standard fetch request
    const response = await fetch(authHealthUrl, {
        method: "GET"
    });

    if (response.ok) {
      const text = await response.text(); // Auth returns a simple "OK" text
      return { online: response.ok, message: text };
    }

    return { online: false, status: response.status };
  } catch (error) {
    // The server could be completely unreachable
    return { online: false, error: error.message };
  }
}

