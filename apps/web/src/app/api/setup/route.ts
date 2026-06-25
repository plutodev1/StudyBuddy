import { NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

export async function GET() {
  const issues: string[] = [];

  try {
    const supabase = createSupabaseAdminClient();

    const { error: notesError } = await supabase.from("notes").select("id").limit(1);

    if (notesError) {
      issues.push(`Database: ${notesError.message}`);
    }

    const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();

    if (bucketsError) {
      issues.push(`Storage: ${bucketsError.message}`);
    } else if (!buckets?.some((bucket) => bucket.name === "study-notes")) {
      issues.push('Storage bucket "study-notes" is missing.');
    }

    if (issues.length > 0) {
      return NextResponse.json(
        {
          ready: false,
          issues,
          fix:
            "Open Supabase Dashboard → SQL Editor, paste apps/web/supabase/schema.sql, and click Run.",
        },
        { status: 503 },
      );
    }

    return NextResponse.json({ ready: true });
  } catch (error) {
    return NextResponse.json(
      {
        ready: false,
        issues: [error instanceof Error ? error.message : "Setup check failed."],
        fix: "Verify NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in apps/web/.env.local",
      },
      { status: 503 },
    );
  }
}
