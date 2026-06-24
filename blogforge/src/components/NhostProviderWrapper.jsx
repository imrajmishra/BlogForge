'use client';

import React from 'react';
import { NhostClient, NhostProvider } from '@nhost/nextjs';

const nhost = new NhostClient({
  subdomain: process.env.NEXT_PUBLIC_NHOST_SUBDOMAIN || process.env.NEXT_NHOST_SUBDOMAIN || 'moqxpzkncgjglqggrpxk',
  region: process.env.NEXT_PUBLIC_NHOST_REGION || process.env.NEXT_NHOST_REGION || 'ap-south-1',
});

export default function NhostProviderWrapper({ children }) {
  return <NhostProvider nhost={nhost}>{children}</NhostProvider>;
}
