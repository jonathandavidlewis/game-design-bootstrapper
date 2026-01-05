export const GENRES = [
  {
    id: "platformer",
    name: "2D Side-Scrolling Platformer",
    emoji: "🏃",
    directory: "2d-side-scrolling-platformer",
    promptFile: "2d-side-scrolling-platformer-interview-guide-01.md",
  },
  {
    id: "runner",
    name: "Infinite Runner",
    emoji: "🏃‍♂️",
    directory: "2d-infinite-runner",
    promptFile: "2d-infinite-runner-interview-guide-01.md",
  },
  {
    id: "deckbuilder",
    name: "Roguelike Deck Builder",
    emoji: "🃏",
    directory: "roguelike-deck-builder",
    promptFile: "roguelike-deck-builder-interview-guide-01.md",
  },
  {
    id: "metroidvania",
    name: "Metroidvania",
    emoji: "🗺️",
    directory: "metroidvania",
    promptFile: "metroidvania-interview-guide-01.md",
  },
  {
    id: "fighter",
    name: "Multiplayer Platform Fighter",
    emoji: "⚔️",
    directory: "multiplayer-platform-fighter",
    promptFile: "multiplayer-platform-fighter-interview-guide-01.md",
  },
  {
    id: "survival",
    name: "Micro-Survival",
    emoji: "🏕️",
    directory: "micro-survival",
    promptFile: "micro-survival-interview-guide-01.md",
  },
] as const;

export type GenreId = (typeof GENRES)[number]["id"];
