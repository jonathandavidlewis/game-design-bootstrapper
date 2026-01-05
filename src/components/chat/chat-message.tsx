"use client";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, Bot } from "lucide-react";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
}

export function ChatMessage({ role, content }: ChatMessageProps) {
  const isUser = role === "user";

  return (
    <div
      className={cn(
        "flex gap-3 p-4 rounded-lg",
        isUser ? "bg-muted/50" : "bg-background"
      )}
    >
      <Avatar className={cn("h-8 w-8", isUser ? "bg-primary" : "bg-secondary")}>
        <AvatarFallback
          className={cn(
            isUser
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-secondary-foreground"
          )}
        >
          {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 space-y-2 overflow-hidden">
        <p className="text-sm font-medium">
          {isUser ? "You" : "Game Design Mentor"}
        </p>
        <div className="prose prose-sm dark:prose-invert max-w-none">
          <MessageContent content={content} />
        </div>
      </div>
    </div>
  );
}

function MessageContent({ content }: { content: string }) {
  // Simple markdown-like rendering for bold, headers, and lists
  const lines = content.split("\n");

  return (
    <div className="space-y-2">
      {lines.map((line, i) => {
        // Empty line
        if (line.trim() === "") {
          return <div key={i} className="h-2" />;
        }

        // Headers
        if (line.startsWith("### ")) {
          return (
            <h4 key={i} className="font-semibold text-sm mt-3">
              {line.slice(4)}
            </h4>
          );
        }
        if (line.startsWith("## ")) {
          return (
            <h3 key={i} className="font-semibold text-base mt-4">
              {line.slice(3)}
            </h3>
          );
        }
        if (line.startsWith("# ")) {
          return (
            <h2 key={i} className="font-bold text-lg mt-4">
              {line.slice(2)}
            </h2>
          );
        }

        // Bullet points
        if (line.startsWith("- ") || line.startsWith("* ")) {
          return (
            <div key={i} className="flex gap-2 pl-2">
              <span className="text-muted-foreground">•</span>
              <span>{formatInlineStyles(line.slice(2))}</span>
            </div>
          );
        }

        // Numbered lists
        const numberedMatch = line.match(/^(\d+)\.\s/);
        if (numberedMatch) {
          return (
            <div key={i} className="flex gap-2 pl-2">
              <span className="text-muted-foreground min-w-[1.5rem]">
                {numberedMatch[1]}.
              </span>
              <span>{formatInlineStyles(line.slice(numberedMatch[0].length))}</span>
            </div>
          );
        }

        // Regular paragraph
        return (
          <p key={i} className="text-sm leading-relaxed">
            {formatInlineStyles(line)}
          </p>
        );
      })}
    </div>
  );
}

function formatInlineStyles(text: string): React.ReactNode {
  // Handle **bold** text
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}
