import type { Json } from "./database";

export type AiOutputType = "summary" | "quiz" | "schedule";

export type NoteListItem = {
  id: string;
  title: string;
  fileName: string | null;
  fileType: string | null;
  createdAt: string;
  outputs: AiOutputListItem[];
};

export type AiOutputListItem = {
  id: string;
  noteId: string;
  type: AiOutputType;
  content: Json;
  createdAt: string;
};
