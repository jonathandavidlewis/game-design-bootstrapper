import { anthropic } from "@ai-sdk/anthropic";
import { streamText } from "ai";
import { buildSystemPrompt, type GenreId } from "@/lib/prompts";

export const maxDuration = 60;

export async function POST(req: Request) {
  const { messages, genreId } = await req.json();

  const systemPrompt = buildSystemPrompt(genreId as GenreId | undefined);

  const result = await streamText({
    model: anthropic("claude-sonnet-4-20250514"),
    system: systemPrompt,
    messages,
  });

  return result.toDataStreamResponse();
}
