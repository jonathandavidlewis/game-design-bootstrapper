"use client";

import { useChat } from "ai/react";
import { useEffect, useRef, useState } from "react";
import { Send, RefreshCw, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatMessage } from "./chat-message";
import { GENRES, type GenreId } from "@/lib/prompts/genres";

function detectGenreFromContent(content: string): GenreId | null {
  const lowerContent = content.toLowerCase();

  if (
    lowerContent.includes("platformer") ||
    lowerContent.includes("side-scrolling") ||
    lowerContent.includes("side scrolling")
  ) {
    return "platformer";
  }
  if (
    lowerContent.includes("runner") ||
    lowerContent.includes("infinite") ||
    lowerContent.includes("endless")
  ) {
    return "runner";
  }
  if (
    lowerContent.includes("deck") ||
    lowerContent.includes("card") ||
    lowerContent.includes("roguelike")
  ) {
    return "deckbuilder";
  }
  if (lowerContent.includes("metroidvania") || lowerContent.includes("metroid")) {
    return "metroidvania";
  }
  if (
    lowerContent.includes("fighter") ||
    lowerContent.includes("platform fighter") ||
    lowerContent.includes("smash")
  ) {
    return "fighter";
  }
  if (
    lowerContent.includes("survival") ||
    lowerContent.includes("micro-survival") ||
    lowerContent.includes("micro survival")
  ) {
    return "survival";
  }
  return null;
}

const INITIAL_MESSAGE = {
  id: "welcome",
  role: "assistant" as const,
  content: `Welcome! I'm your game design mentor with 15+ years of experience shipping titles across multiple genres.

I'm here to help you design your own game through a collaborative interview process. Together, we'll explore your vision, make concrete design decisions, and create an MVP game design document.

**Let's start by choosing a genre. Which type of game excites you most?**

${GENRES.map((g) => `- **${g.name}** ${g.emoji}`).join("\n")}

Just tell me which one interests you, and we'll dive into a focused design session for that genre.`,
};

export function Chat() {
  const [selectedGenre, setSelectedGenre] = useState<GenreId | null>(null);
  const [pendingGenre, setPendingGenre] = useState<GenreId | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { messages, input, handleInputChange, handleSubmit, isLoading, setMessages } =
    useChat({
      api: "/api/chat",
      body: {
        genreId: selectedGenre,
      },
      initialMessages: [INITIAL_MESSAGE],
      onFinish: () => {
        // Apply pending genre after response is complete
        if (pendingGenre && !selectedGenre) {
          setSelectedGenre(pendingGenre);
          setPendingGenre(null);
        }
      },
    });

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    // Detect genre from input before submitting
    if (!selectedGenre) {
      const detected = detectGenreFromContent(input);
      if (detected) {
        setPendingGenre(detected);
      }
    }

    handleSubmit(e);
  };

  const handleReset = () => {
    setSelectedGenre(null);
    setPendingGenre(null);
    setMessages([INITIAL_MESSAGE]);
  };

  const handleExport = () => {
    const markdown = messages
      .map((m) => {
        const role = m.role === "user" ? "**You:**" : "**Game Design Mentor:**";
        return `${role}\n\n${m.content}`;
      })
      .join("\n\n---\n\n");

    const blob = new Blob([markdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `game-design-session-${new Date().toISOString().split("T")[0]}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const displayedGenre = selectedGenre || pendingGenre;

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div>
          <h1 className="text-xl font-bold">Game Design Bootstrapper</h1>
          {displayedGenre && (
            <p className="text-sm text-muted-foreground">
              Designing: {GENRES.find((g) => g.id === displayedGenre)?.name}
            </p>
          )}
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleExport}
            disabled={messages.length <= 1}
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm" onClick={handleReset}>
            <RefreshCw className="h-4 w-4 mr-2" />
            New Session
          </Button>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div ref={scrollRef} className="space-y-4">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              role={message.role as "user" | "assistant"}
              content={message.content}
            />
          ))}
          {isLoading && (
            <div className="flex items-center gap-2 p-4 text-muted-foreground">
              <div className="h-2 w-2 bg-current rounded-full animate-pulse" />
              <div
                className="h-2 w-2 bg-current rounded-full animate-pulse"
                style={{ animationDelay: "0.2s" }}
              />
              <div
                className="h-2 w-2 bg-current rounded-full animate-pulse"
                style={{ animationDelay: "0.4s" }}
              />
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input */}
      <form onSubmit={handleFormSubmit} className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Type your response..."
            disabled={isLoading}
            className="flex-1"
          />
          <Button type="submit" disabled={isLoading || !input.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2 text-center">
          Press Enter to send. Your mentor will guide you through the design process.
        </p>
      </form>
    </div>
  );
}
