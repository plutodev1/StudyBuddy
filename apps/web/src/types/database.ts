export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string | null;
          full_name: string | null;
          school: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email?: string | null;
          full_name?: string | null;
          school?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          email?: string | null;
          full_name?: string | null;
          school?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      notes: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          file_path: string | null;
          file_name: string | null;
          file_type: string | null;
          extracted_text: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          file_path?: string | null;
          file_name?: string | null;
          file_type?: string | null;
          extracted_text: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          title?: string;
          file_path?: string | null;
          file_name?: string | null;
          file_type?: string | null;
          extracted_text?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "notes_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      ai_outputs: {
        Row: {
          id: string;
          user_id: string;
          note_id: string;
          type: "summary" | "quiz" | "schedule";
          content: Json;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          note_id: string;
          type: "summary" | "quiz" | "schedule";
          content: Json;
          created_at?: string;
        };
        Update: {
          content?: Json;
        };
        Relationships: [
          {
            foreignKeyName: "ai_outputs_note_id_fkey";
            columns: ["note_id"];
            isOneToOne: false;
            referencedRelation: "notes";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ai_outputs_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
