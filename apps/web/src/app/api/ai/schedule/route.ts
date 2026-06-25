import { NextRequest } from "next/server";
import { handleAiGeneration } from "@/lib/ai/route-handler";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  return handleAiGeneration(request, "schedule");
}
