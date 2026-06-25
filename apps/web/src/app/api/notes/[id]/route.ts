import { NextRequest, NextResponse } from "next/server";
import { requireUser } from "@/lib/auth/get-user";
import { createSupabaseAdminClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const auth = await requireUser(request);

  if ("error" in auth) {
    return auth.error;
  }

  const { id } = await context.params;
  const supabase = createSupabaseAdminClient();

  const { data: note, error: noteError } = await supabase
    .from("notes")
    .select(
      "id, title, file_path, file_name, file_type, extracted_text, created_at, updated_at",
    )
    .eq("id", id)
    .eq("user_id", auth.user.id)
    .single();

  if (noteError || !note) {
    return NextResponse.json({ error: "Note not found." }, { status: 404 });
  }

  const { data: outputs, error: outputsError } = await supabase
    .from("ai_outputs")
    .select("id, note_id, type, content, created_at")
    .eq("note_id", note.id)
    .eq("user_id", auth.user.id)
    .order("created_at", { ascending: false });

  if (outputsError) {
    return NextResponse.json({ error: outputsError.message }, { status: 500 });
  }

  return NextResponse.json({
    note: {
      id: note.id,
      title: note.title,
      filePath: note.file_path,
      fileName: note.file_name,
      fileType: note.file_type,
      extractedText: note.extracted_text,
      createdAt: note.created_at,
      updatedAt: note.updated_at,
      outputs: outputs.map((output) => ({
        id: output.id,
        noteId: output.note_id,
        type: output.type,
        content: output.content,
        createdAt: output.created_at,
      })),
    },
  });
}
