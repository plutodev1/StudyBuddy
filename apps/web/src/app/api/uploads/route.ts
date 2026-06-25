import { NextRequest, NextResponse } from "next/server";
import { requireUser } from "@/lib/auth/get-user";
import { createSupabaseAdminClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

const ALLOWED_EXTENSIONS = [".txt", ".md"];
const MAX_TEXT_CHARS = 200000;

function sanitizeFileName(fileName: string) {
  return fileName.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 90);
}

function hasSupportedExtension(fileName: string) {
  const lowerName = fileName.toLowerCase();
  return ALLOWED_EXTENSIONS.some((extension) => lowerName.endsWith(extension));
}

export async function POST(request: NextRequest) {
  const auth = await requireUser(request);

  if ("error" in auth) {
    return auth.error;
  }

  const formData = await request.formData();
  const file = formData.get("file");
  const requestedTitle = formData.get("title");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "A file is required." }, { status: 400 });
  }

  if (!hasSupportedExtension(file.name)) {
    return NextResponse.json(
      { error: "Only .txt and .md uploads are supported in this hackathon build." },
      { status: 415 },
    );
  }

  const extractedText = (await file.text()).trim().slice(0, MAX_TEXT_CHARS);

  if (!extractedText) {
    return NextResponse.json(
      { error: "The uploaded file did not contain readable text." },
      { status: 400 },
    );
  }

  const supabase = createSupabaseAdminClient();
  const safeName = sanitizeFileName(file.name);
  const filePath = `${auth.user.id}/${crypto.randomUUID()}-${safeName}`;

  let storedFilePath: string | null = null;

  const { error: uploadError } = await supabase.storage
    .from("study-notes")
    .upload(filePath, file, {
      contentType: file.type || "text/plain",
      upsert: false,
    });

  if (uploadError) {
    const bucketMissing = /bucket not found/i.test(uploadError.message);

    if (!bucketMissing) {
      return NextResponse.json({ error: uploadError.message }, { status: 500 });
    }
  } else {
    storedFilePath = filePath;
  }

  const title =
    typeof requestedTitle === "string" && requestedTitle.trim()
      ? requestedTitle.trim()
      : file.name.replace(/\.[^.]+$/, "");

  const { data: note, error: noteError } = await supabase
    .from("notes")
    .insert({
      user_id: auth.user.id,
      title,
      file_path: storedFilePath,
      file_name: file.name,
      file_type: file.type || "text/plain",
      extracted_text: extractedText,
    })
    .select("id, title, file_name, file_type, created_at")
    .single();

  if (noteError || !note) {
    return NextResponse.json(
      { error: noteError?.message ?? "Failed to save uploaded note." },
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
