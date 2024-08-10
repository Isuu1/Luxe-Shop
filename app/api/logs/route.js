import { getLogs } from "../../../lib/logger";

export async function GET(req) {
  return new Response(JSON.stringify(getLogs()), {
    headers: { "Content-Type": "application/json" },
  });
}
