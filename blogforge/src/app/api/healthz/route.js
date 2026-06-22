import { NextResponse } from "next/server";
import { checkNhostHealth } from "@/features/healthcheck/healthz.api";
// Note: Double check if your path alias is '@' or '../../features/healthcheck/healthz.api'

export async function GET() {
  try {
    const healthStatus = await checkNhostHealth();

    // Return the response back to your browser
    return NextResponse.json(
      {
        status: "UP",
        timestamp: new Date().toISOString(),
        nhost: healthStatus,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        status: "DOWN",
        error: error.message,
      },
      { status: 500 },
    );
  }
}
