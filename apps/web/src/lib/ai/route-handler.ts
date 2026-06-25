import { NextRequest, NextResponse } from "next/server";
import { requireUser } from "@/lib/auth/get-user";
import { createSupabaseAdminClient } from "@/lib/supabase/server";
import { generateStudyOutput } from "@/lib/ai/generate";
import type { AiOutputType } from "@/types/study";

export async function handleAiGeneration(
  request: NextRequest,
  type: AiOutputType,
) {
  try {
    const auth = await requireUser(request);

    if ("error" in auth) {
      return auth.error;
    }

    const body = (await request.json()) as { noteId?: string };

    if (!body.noteId) {
      return NextResponse.json({ error: "noteId is required." }, { status: 400 });
    }

    const supabase = createSupabaseAdminClient();
    const { data: note, error: noteError } = await supabase
      .from("notes")
      .select("id, user_id, extracted_text")
      .eq("id", body.noteId)
      .eq("user_id", auth.user.id)
      .single();

    if (noteError || !note) {
      return NextResponse.json({ error: "Note not found." }, { status: 404 });
    }

    if (!note.extracted_text.trim()) {
      return NextResponse.json(
        { error: "This note does not contain extracted text." },
        { status: 400 },
      );
    }

    const content = await generateStudyOutput(type, note.extracted_text);

    const { data: output, error: outputError } = await supabase
      .from("ai_outputs")
      .insert({
        user_id: auth.user.id,
        note_id: note.id,
        type,
        content,
      })
      .select("id, note_id, type, content, created_at")
      .single();

    if (outputError || !output) {
      return NextResponse.json(
        { error: outputError?.message ?? "Failed to save AI output." },
        { status: 500 },
      );
    }

    return NextResponse.json({
      output: {
        id: output.id,
        noteId: output.note_id,
        type: output.type,
        content: output.content,
        createdAt: output.created_at,
      },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "AI generation failed.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
