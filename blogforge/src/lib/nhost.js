import { createClient } from "@nhost/nhost-js";

// Replace <subdomain> and <region> with your project's values
export const nhost = createClient({
  subdomain: process.env.NEXT_NHOST_SUBDOMAIN,
  region: process.env.NEXT_NHOST_REGION,
});
