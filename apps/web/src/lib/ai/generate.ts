import type { AiOutputType } from "@/types/study";
import type { Json } from "@/types/database";
import {
  buildQuizPrompt,
  buildSchedulePrompt,
  buildSummaryPrompt,
} from "@/lib/ai/prompts";
import { runIonetJsonPrompt } from "@/lib/ai/ionet";

const MAX_AI_INPUT_CHARS = 24000;

export async function generateStudyOutput(
  type: AiOutputType,
  extractedText: string,
): Promise<Json> {
  const trimmedText = extractedText.slice(0, MAX_AI_INPUT_CHARS);

  if (type === "summary") {
    return runIonetJsonPrompt(buildSummaryPrompt(trimmedText));
  }

  if (type === "quiz") {
    return runIonetJsonPrompt(buildQuizPrompt(trimmedText));
  }

  return runIonetJsonPrompt(buildSchedulePrompt(trimmedText));
}
