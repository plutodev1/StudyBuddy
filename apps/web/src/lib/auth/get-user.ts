import { NextRequest, NextResponse } from "next/server";
import type { User } from "@supabase/supabase-js";
import { createSupabaseAuthClient } from "@/lib/supabase/server";

type AuthResult =
  | {
      user: User;
      token: string;
    }
  | {
      error: NextResponse;
    };

export async function requireUser(request: NextRequest): Promise<AuthResult> {
  const authorization = request.headers.get("authorization");
  const token = authorization?.replace(/^Bearer\s+/i, "").trim();

  if (!token) {
    return {
      error: NextResponse.json(
        { error: "Missing Authorization bearer token." },
        { status: 401 },
      ),
    };
  }

  const supabase = createSupabaseAuthClient();
  const { data, error } = await supabase.auth.getUser(token);

  if (error || !data.user) {
    return {
      error: NextResponse.json(
        { error: "Invalid or expired session." },
        { status: 401 },
      ),
    };
  }

  return {
    user: data.user,
    token,
  };
}
