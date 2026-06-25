import { NextRequest, NextResponse } from "next/server";
import { requireUser } from "@/lib/auth/get-user";
import { createSupabaseAdminClient } from "@/lib/supabase/server";
import type { AiOutputListItem, NoteListItem } from "@/types/study";

export const runtime = "nodejs";

type CreateNoteBody = {
  title?: string;
  extractedText?: string;
};

export async function GET(request: NextRequest) {
  const auth = await requireUser(request);

  if ("error" in auth) {
    return auth.error;
  }

  const supabase = createSupabaseAdminClient();
  const { data: notes, error: notesError } = await supabase
    .from("notes")
    .select("id, title, file_name, file_type, created_at")
    .eq("user_id", auth.user.id)
    .order("created_at", { ascending: false });

  if (notesError) {
    return NextResponse.json({ error: notesError.message }, { status: 500 });
  }

  const noteIds = notes.map((note) => note.id);
  const { data: outputs, error: outputsError } = noteIds.length
    ? await supabase
        .from("ai_outputs")
        .select("id, note_id, type, content, created_at")
        .eq("user_id", auth.user.id)
        .in("note_id", noteIds)
        .order("created_at", { ascending: false })
    : { data: [], error: null };

  if (outputsError) {
    return NextResponse.json({ error: outputsError.message }, { status: 500 });
  }

  const outputsByNoteId = new Map<string, AiOutputListItem[]>();

  for (const output of outputs) {
    const normalizedOutput: AiOutputListItem = {
      id: output.id,
      noteId: output.note_id,
      type: output.type,
      content: output.content,
      createdAt: output.created_at,
    };

    outputsByNoteId.set(output.note_id, [
      ...(outputsByNoteId.get(output.note_id) ?? []),
      normalizedOutput,
    ]);
  }

  const normalizedNotes: NoteListItem[] = notes.map((note) => ({
    id: note.id,
    title: note.title,
    fileName: note.file_name,
    fileType: note.file_type,
    createdAt: note.created_at,
    outputs: outputsByNoteId.get(note.id) ?? [],
  }));

  return NextResponse.json({ notes: normalizedNotes });
}

export async function POST(request: NextRequest) {
  const auth = await requireUser(request);

  if ("error" in auth) {
    return auth.error;
  }

  const body = (await request.json()) as CreateNoteBody;
  const title = body.title?.trim() || "Untitled note";
  const extractedText = body.extractedText?.trim();

  if (!extractedText) {
    return NextResponse.json(
      { error: "extractedText is required." },
      { status: 400 },
    );
  }

  const supabase = createSupabaseAdminClient();
  const { data: note, error } = await supabase
    .from("notes")
    .insert({
      user_id: auth.user.id,
      title,
      file_type: "pasted-text",
      extracted_text: extractedText,
    })
    .select("id, title, file_name, file_type, created_at")
    .single();

  if (error || !note) {
    return NextResponse.json(
      { error: error?.message ?? "Failed to create note." },
      { status: 500 },
    );
  }

  return NextResponse.json(
    {
      note: {
        id: note.id,
        title: note.title,
        fileName: note.file_name,
        fileType: note.file_type,
        createdAt: note.created_at,
        outputs: [],
      },
    },
    { status: 201 },
  );
}
