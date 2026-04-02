import { NextRequest, NextResponse } from "next/server";

const LAMBDA_URL =
  "https://bfh5gosfjg.execute-api.ap-south-1.amazonaws.com/default/minecraft-controller";

export async function GET(req: NextRequest) {
  const action = req.nextUrl.searchParams.get("action");

  if (!action || !["status", "start", "stop"].includes(action)) {
    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  }

  try {
    const lambdaRes = await fetch(`${LAMBDA_URL}?action=${action}`, {
      // No browser involved — no CORS, no caching issues
      cache: "no-store",
    });

    const text = await lambdaRes.text();
    let data: unknown;
    try {
      data = JSON.parse(text);
    } catch {
      data = { raw: text };
    }

    console.log(`[api/ec2] action=${action} →`, data);

    return NextResponse.json(data, {
      status: lambdaRes.status,
      headers: { "Cache-Control": "no-store, max-age=0" },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(`[api/ec2] action=${action} failed:`, message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
