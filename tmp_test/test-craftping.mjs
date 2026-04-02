import { QueryClient, JavaPingClient } from "craftping";

const HOST = "43.204.78.40";
const PORT = 25565;
const TIMEOUT_MS = 10000; // Increased timeout to 10s

console.log(`\n🔍 Testing craftping against ${HOST}:${PORT}\n`);
console.log("=".repeat(50));

async function runTest() {
  // ──────────────────────────────────────────────────
  // 1. Server List Ping (TCP)
  // ──────────────────────────────────────────────────
  console.log("\n[1] Server List Ping (TCP – always available)...");
  try {
    const pingClient = new JavaPingClient();
    const t0 = Date.now();
    const pinged = await pingClient.ping(HOST, PORT, { signal: AbortSignal.timeout(TIMEOUT_MS) });
    const elapsed = Date.now() - t0;

    console.log(`✅  Ping succeeded in ${elapsed}ms`);
    console.log("Raw ping response:");
    console.log(JSON.stringify(pinged, null, 2));

    console.log("\n--- Extracted fields ---");
    console.log(`  playersOnline:  ${pinged.players?.online ?? "??"}`);
    console.log(`  maxPlayers:     ${pinged.players?.max ?? "??"}`);
  } catch (err) {
    console.error("❌  Ping failed:", err.message);
  }

  // ──────────────────────────────────────────────────
  // 2. Query (UDP)
  // ──────────────────────────────────────────────────
  console.log("\n[2] Full Query (UDP)...");
  try {
    const queryClient = new QueryClient();
    const t0 = Date.now();
    console.log("  Sending Full Query...");
    const queried = await queryClient.queryFull(HOST, PORT, AbortSignal.timeout(TIMEOUT_MS));
    const elapsed = Date.now() - t0;

    console.log(`✅  Query succeeded in ${elapsed}ms`);
    console.log("Raw query response:");
    console.log(JSON.stringify(queried, null, 2));
    
    await queryClient.close();
  } catch (err) {
    console.error("❌  Query failed:", err.message);
    if (err.name === 'AbortError') {
      console.log("    Tip: Check if UDP port 25565 is open in AWS Security Groups.");
    }
  }

  console.log("\n" + "=".repeat(50));
  console.log("Done.\n");
}

runTest().catch(console.error);
