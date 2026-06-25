import type { Json } from "@/types/database";

type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

type IonetChatResponse = {
  choices?: Array<{
    message?: {
      content?: string;
    };
  }>;
};

function getIonetConfig() {
  const apiKey = process.env.IONET_API_KEY;
  const baseUrl =
    process.env.IONET_BASE_URL ?? "https://api.intelligence.io.solutions/api/v1";
  const model = process.env.IONET_MODEL ?? "meta-llama/Llama-3.3-70B-Instruct";

  if (!apiKey) {
    throw new Error("Missing required environment variable: IONET_API_KEY");
  }

  return {
    apiKey,
    baseUrl: baseUrl.replace(/\/$/, ""),
    model,
  };
}

function parseJsonContent(content: string): Json {
  const cleaned = content
    .trim()
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/i, "");

  try {
    return JSON.parse(cleaned) as Json;
  } catch {
    return {
      raw: content,
      parse_error: "AI returned text that was not valid JSON.",
    };
  }
}

export async function runIonetJsonPrompt(prompt: string): Promise<Json> {
  const config = getIonetConfig();

  const messages: ChatMessage[] = [
    {
      role: "system",
      content:
        "You are StudyBuddy. Always return concise, valid JSON and no markdown.",
    },
    {
      role: "user",
      content: prompt,
    },
  ];

  const response = await fetch(`${config.baseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: config.model,
      messages,
      temperature: 0.3,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`io.net request failed: ${response.status} ${errorText}`);
  }

  const payload = (await response.json()) as IonetChatResponse;
  const content = payload.choices?.[0]?.message?.content;

  if (!content) {
    throw new Error("io.net response did not include message content.");
  }

  return parseJsonContent(content);
}
