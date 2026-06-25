"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";
import "@/app/dashboard/dashboard.css";

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const supabase = createBrowserSupabaseClient();

    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        router.replace("/dashboard");
        return;
      }

      router.replace("/auth/login");
    });
  }, [router]);

  return (
    <main className="dashboard-page">
      <section className="dashboard-card narrow">
        <h1>Finishing sign in...</h1>
        <p>Please wait while we redirect you to your dashboard.</p>
      </section>
    </main>
  );
}
