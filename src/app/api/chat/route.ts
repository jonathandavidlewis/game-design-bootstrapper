import { createAnthropic } from "@ai-sdk/anthropic";
import { streamText } from "ai";
import { buildSystemPrompt, type GenreId } from "@/lib/prompts";

export const maxDuration = 60;

export async function POST(req: Request) {
  const apiKey = req.headers.get("x-api-key");

  if (!apiKey) {
    return new Response(JSON.stringify({ error: "API key is required" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { messages, genreId } = await req.json();

  const systemPrompt = buildSystemPrompt(genreId as GenreId | undefined);

  const anthropic = createAnthropic({
    apiKey,
  });

  const result = await streamText({
    model: anthropic("claude-sonnet-4-20250514"),
    system: systemPrompt,
    messages,
  });

  return result.toDataStreamResponse();
}
