"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Session } from "@supabase/supabase-js";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";
import type { AiOutputListItem, AiOutputType, NoteListItem } from "@/types/study";
import type { Json } from "@/types/database";

function isRecord(value: Json): value is Record<string, Json> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function asString(value: Json | undefined) {
  return typeof value === "string" ? value : "";
}

function asStringArray(value: Json | undefined) {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string")
    : [];
}

function OutputContent({ output }: { output: AiOutputListItem }) {
  const content = output.content;

  if (!isRecord(content)) {
    return <pre>{JSON.stringify(content, null, 2)}</pre>;
  }

  if (output.type === "summary") {
    return (
      <div className="output-content">
        <p>{asString(content.overview)}</p>

        <h4>Key Points</h4>
        <ul>
          {asStringArray(content.key_points).map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>

        <h4>Likely Exam Questions</h4>
        <ul>
          {asStringArray(content.likely_exam_questions).map((question) => (
            <li key={question}>{question}</li>
          ))}
        </ul>
      </div>
    );
  }

  if (output.type === "quiz" && Array.isArray(content.questions)) {
    return (
      <div className="output-content">
        {content.questions.map((question, index) => {
          if (!isRecord(question)) {
            return null;
          }

          return (
            <div className="quiz-preview" key={`${output.id}-${index}`}>
              <h4>{asString(question.question)}</h4>
              <ol>
                {asStringArray(question.options).map((option) => (
                  <li key={option}>{option}</li>
                ))}
              </ol>
              <p>{asString(question.explanation)}</p>
            </div>
          );
        })}
      </div>
    );
  }

  if (output.type === "schedule" && Array.isArray(content.sessions)) {
    return (
      <div className="output-content">
        <p>{asString(content.goal)}</p>
        {content.sessions.map((session, index) => {
          if (!isRecord(session)) {
            return null;
          }

          return (
            <div className="schedule-preview" key={`${output.id}-${index}`}>
              <strong>
                {asString(session.day)}: {asString(session.focus)}
              </strong>
              <ul>
                {asStringArray(session.tasks).map((task) => (
                  <li key={task}>{task}</li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    );
  }

  return <pre>{JSON.stringify(content, null, 2)}</pre>;
}

export default function DashboardClient() {
  const router = useRouter();
  const supabase = useMemo(() => {
    try {
      return createBrowserSupabaseClient();
    } catch {
      return null;
    }
  }, []);

  const [session, setSession] = useState<Session | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [title, setTitle] = useState("");
  const [noteText, setNoteText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [notes, setNotes] = useState<NoteListItem[]>([]);
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [setupWarning, setSetupWarning] = useState("");
  const [isBusy, setIsBusy] = useState(false);
  const [generating, setGenerating] = useState<string | null>(null);

  const selectedNote =
    notes.find((note) => note.id === selectedNoteId) ?? notes[0] ?? null;

  const authHeaders = useCallback(() => {
    if (!session) {
      throw new Error("You need to sign in first.");
    }

    return {
      Authorization: `Bearer ${session.access_token}`,
    };
  }, [session]);

  const loadNotes = useCallback(async () => {
    if (!session) {
      setNotes([]);
      return;
    }

    const response = await fetch("/api/notes", {
      headers: authHeaders(),
    });
    const payload = await response.json();

    if (!response.ok) {
      const message = payload.error ?? "Failed to load notes.";

      if (/schema cache|relation .* does not exist/i.test(message)) {
        throw new Error(
          "Supabase tables are missing. Run apps/web/supabase/schema.sql in Supabase Dashboard → SQL Editor.",
        );
      }

      throw new Error(message);
    }

    setNotes(payload.notes);
    setSelectedNoteId((current) => current ?? payload.notes[0]?.id ?? null);
  }, [authHeaders, session]);

  useEffect(() => {
    if (!supabase) {
      return;
    }

    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        router.replace("/auth/login");
        return;
      }

      setSession(data.session);
      setAuthReady(true);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (!nextSession) {
        router.replace("/auth/login");
        return;
      }

      setSession(nextSession);
      setAuthReady(true);
    });

    return () => subscription.unsubscribe();
  }, [router, supabase]);

  useEffect(() => {
    if (!session) {
      return;
    }

    fetch("/api/setup")
      .then(async (response) => {
        const payload = await response.json();

        if (!response.ok) {
          const details = Array.isArray(payload.issues)
            ? payload.issues.join(" ")
            : "Database setup is incomplete.";
          setSetupWarning(`${details} ${payload.fix ?? ""}`.trim());
        } else {
          setSetupWarning("");
        }
      })
      .catch(() => {
        setSetupWarning(
          "Could not verify Supabase setup. Run apps/web/supabase/schema.sql in the Supabase SQL Editor.",
        );
      });
  }, [session]);

  useEffect(() => {
    if (!session) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      loadNotes().catch((loadError: unknown) => {
        setError(
          loadError instanceof Error ? loadError.message : "Failed to load notes.",
        );
      });
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [loadNotes, session]);

  async function handleSignOut() {
    if (!supabase) {
      return;
    }

    await supabase.auth.signOut();
    setSession(null);
    setNotes([]);
    setSelectedNoteId(null);
    router.push("/auth/login");
  }

  async function handleCreateNote(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setStatus("");
    setIsBusy(true);

    try {
      const response = await fetch("/api/notes", {
        method: "POST",
        headers: {
          ...authHeaders(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          extractedText: noteText,
        }),
      });
      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error ?? "Failed to create note.");
      }

      setTitle("");
      setNoteText("");
      setSelectedNoteId(payload.note.id);
      setStatus("Note saved.");
      await loadNotes();
    } catch (createError) {
      setError(createError instanceof Error ? createError.message : "Failed to save note.");
    } finally {
      setIsBusy(false);
    }
  }

  async function handleUpload(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!file) {
      setError("Choose a .txt or .md file first.");
      return;
    }

    setError("");
    setStatus("");
    setIsBusy(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("title", title);

      const response = await fetch("/api/uploads", {
        method: "POST",
        headers: authHeaders(),
        body: formData,
      });
      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error ?? "Failed to upload note.");
      }

      setFile(null);
      setTitle("");
      setSelectedNoteId(payload.note.id);
      setStatus("File uploaded.");
      await loadNotes();
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Upload failed.");
    } finally {
      setIsBusy(false);
    }
  }

  async function handleGenerate(noteId: string, type: AiOutputType) {
    setError("");
    setStatus("");
    setGenerating(`${noteId}:${type}`);

    try {
      const endpoint =
        type === "summary" ? "summarize" : type === "quiz" ? "quiz" : "schedule";
      const response = await fetch(`/api/ai/${endpoint}`, {
        method: "POST",
        headers: {
          ...authHeaders(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ noteId }),
      });
      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error ?? `Failed to generate ${type}.`);
      }

      setStatus(`${type} generated.`);
      await loadNotes();
    } catch (generateError) {
      setError(
        generateError instanceof Error
          ? generateError.message
          : "AI generation failed.",
      );
    } finally {
      setGenerating(null);
    }
  }

  if (!supabase) {
    return (
      <main className="dashboard-page">
        <section className="dashboard-card narrow">
          <h1>StudyBuddy backend setup needed</h1>
          <p>Add your Supabase environment variables, then restart the dev server.</p>
        </section>
      </main>
    );
  }

  if (!authReady || !session) {
    return (
      <main className="dashboard-page">
        <section className="dashboard-card narrow">
          <h1>Loading your workspace...</h1>
          <p>Checking your session before opening the dashboard.</p>
        </section>
      </main>
    );
  }

  return (
    <main className="dashboard-page">
      <nav className="dashboard-nav">
        <Link href="/" className="dashboard-logo">
          Study<span>Buddy</span>
        </Link>
        <button type="button" className="quiet-button" onClick={handleSignOut}>
          Sign out
        </button>
      </nav>

      {setupWarning && (
        <div className="toast error setup-banner">
          {setupWarning}
        </div>
      )}

      <section className="dashboard-grid">
          <aside className="dashboard-card">
            <p className="eyebrow">Input</p>
            <h1>Study material</h1>

            <form className="dashboard-form" onSubmit={handleCreateNote}>
              <label>
                Title
                <input
                  type="text"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  placeholder="CSC 201 recursion notes"
                />
              </label>
              <label>
                Paste notes
                <textarea
                  value={noteText}
                  onChange={(event) => setNoteText(event.target.value)}
                  placeholder="Paste lecture notes here for the fastest demo path."
                  rows={9}
                />
              </label>
              <button
                type="submit"
                className="primary-button"
                disabled={isBusy || !noteText.trim()}
              >
                Save pasted notes
              </button>
            </form>

            <form className="dashboard-form upload-form" onSubmit={handleUpload}>
              <label>
                Upload .txt or .md
                <input
                  type="file"
                  accept=".txt,.md,text/plain,text/markdown"
                  onChange={(event) => setFile(event.target.files?.[0] ?? null)}
                />
              </label>
              <button type="submit" className="secondary-button" disabled={isBusy || !file}>
                Upload file
              </button>
            </form>
          </aside>

          <section className="dashboard-card notes-panel">
            <div className="panel-header">
              <div>
                <p className="eyebrow">Workspace</p>
                <h2>Your notes</h2>
              </div>
              <button type="button" className="quiet-button" onClick={() => loadNotes()}>
                Refresh
              </button>
            </div>

            {notes.length === 0 ? (
              <p className="muted">No notes yet. Paste notes or upload a text file.</p>
            ) : (
              <div className="notes-list">
                {notes.map((note) => (
                  <button
                    type="button"
                    className={`note-button ${selectedNote?.id === note.id ? "active" : ""}`}
                    key={note.id}
                    onClick={() => setSelectedNoteId(note.id)}
                  >
                    <span>{note.title}</span>
                    <small>{new Date(note.createdAt).toLocaleString()}</small>
                  </button>
                ))}
              </div>
            )}

            {selectedNote && (
              <div className="selected-note">
                <div className="panel-header">
                  <div>
                    <p className="eyebrow">Selected</p>
                    <h3>{selectedNote.title}</h3>
                  </div>
                </div>

                <div className="ai-actions">
                  {(["summary", "quiz", "schedule"] as AiOutputType[]).map((type) => (
                    <button
                      type="button"
                      className="secondary-button"
                      key={type}
                      disabled={generating !== null}
                      onClick={() => handleGenerate(selectedNote.id, type)}
                    >
                      {generating === `${selectedNote.id}:${type}`
                        ? "Generating..."
                        : `Generate ${type}`}
                    </button>
                  ))}
                </div>

                <div className="outputs-list">
                  {selectedNote.outputs.length === 0 ? (
                    <p className="muted">No AI outputs yet.</p>
                  ) : (
                    selectedNote.outputs.map((output) => (
                      <article className="output-card" key={output.id}>
                        <div className="output-header">
                          <strong>{output.type}</strong>
                          <small>{new Date(output.createdAt).toLocaleString()}</small>
                        </div>
                        <OutputContent output={output} />
                      </article>
                    ))
                  )}
                </div>
              </div>
            )}
          </section>
        </section>

      {(status || error) && (
        <div className={`toast ${error ? "error" : "success"}`}>
          {error || status}
        </div>
      )}
    </main>
  );
}
