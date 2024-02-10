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
      base_location_options: {
        Row: {
          country: string | null;
          id: number;
        };
        Insert: {
          country?: string | null;
          id?: number;
        };
        Update: {
          country?: string | null;
          id?: number;
        };
        Relationships: [];
      };
      industry_options: {
        Row: {
          id: number;
          industry: string | null;
        };
        Insert: {
          id?: number;
          industry?: string | null;
        };
        Update: {
          id?: number;
          industry?: string | null;
        };
        Relationships: [];
      };
      language_options: {
        Row: {
          id: number;
          language: string | null;
        };
        Insert: {
          id?: number;
          language?: string | null;
        };
        Update: {
          id?: number;
          language?: string | null;
        };
        Relationships: [];
      };
      professional_mailbox: {
        Row: {
          created_at: string;
          id: string;
          is_read: boolean | null;
          message: string | null;
          sent_from: string | null;
          sent_to: string | null;
        };
        Insert: {
          created_at?: string;
          id?: string;
          is_read?: boolean | null;
          message?: string | null;
          sent_from?: string | null;
          sent_to?: string | null;
        };
        Update: {
          created_at?: string;
          id?: string;
          is_read?: boolean | null;
          message?: string | null;
          sent_from?: string | null;
          sent_to?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "professional_mailbox_sent_from_fkey";
            columns: ["sent_from"];
            isOneToOne: false;
            referencedRelation: "user_profile";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "professional_mailbox_sent_to_fkey";
            columns: ["sent_to"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      professional_pitch: {
        Row: {
          created_at: string;
          delivery_time: number | null;
          delivery_unit: Database["public"]["Enums"]["duration_unit"] | null;
          id: string | null;
          message: string | null;
          price: number | null;
          professional_id: string;
          request_details_id: string;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string;
          delivery_time?: number | null;
          delivery_unit?: Database["public"]["Enums"]["duration_unit"] | null;
          id?: string | null;
          message?: string | null;
          price?: number | null;
          professional_id: string;
          request_details_id: string;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string;
          delivery_time?: number | null;
          delivery_unit?: Database["public"]["Enums"]["duration_unit"] | null;
          id?: string | null;
          message?: string | null;
          price?: number | null;
          professional_id?: string;
          request_details_id?: string;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "professional_pitch_professional_id_fkey";
            columns: ["professional_id"];
            isOneToOne: false;
            referencedRelation: "professional_profile";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "professional_pitch_professional_id_fkey";
            columns: ["professional_id"];
            isOneToOne: false;
            referencedRelation: "professional_profile_view";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "professional_pitch_request_details_id_fkey";
            columns: ["request_details_id"];
            isOneToOne: false;
            referencedRelation: "professional_free_request_view";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "professional_pitch_request_details_id_fkey";
            columns: ["request_details_id"];
            isOneToOne: false;
            referencedRelation: "request_details";
            referencedColumns: ["id"];
          }
        ];
      };
      professional_pitch_status: {
        Row: {
          created_at: string;
          id: string;
          is_accepted: boolean | null;
          is_read: boolean | null;
        };
        Insert: {
          created_at?: string;
          id: string;
          is_accepted?: boolean | null;
          is_read?: boolean | null;
        };
        Update: {
          created_at?: string;
          id?: string;
          is_accepted?: boolean | null;
          is_read?: boolean | null;
        };
        Relationships: [
          {
            foreignKeyName: "professional_pitch_status_id_fkey";
            columns: ["id"];
            isOneToOne: true;
            referencedRelation: "professional_pitch";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "professional_pitch_status_id_fkey";
            columns: ["id"];
            isOneToOne: true;
            referencedRelation: "professional_pitch_view";
            referencedColumns: ["id"];
          }
        ];
      };
      professional_profile: {
        Row: {
          avatar_link: string | null;
          bio: string | null;
          created_at: string | null;
          email: string | null;
          firstname: string | null;
          id: string;
          industry: string | null;
          lastname: string | null;
          occupation: string | null;
          phone_number: string | null;
          resume: string | null;
          updated_at: string | null;
        };
        Insert: {
          avatar_link?: string | null;
          bio?: string | null;
          created_at?: string | null;
          email?: string | null;
          firstname?: string | null;
          id: string;
          industry?: string | null;
          lastname?: string | null;
          occupation?: string | null;
          phone_number?: string | null;
          resume?: string | null;
          updated_at?: string | null;
        };
        Update: {
          avatar_link?: string | null;
          bio?: string | null;
          created_at?: string | null;
          email?: string | null;
          firstname?: string | null;
          id?: string;
          industry?: string | null;
          lastname?: string | null;
          occupation?: string | null;
          phone_number?: string | null;
          resume?: string | null;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "professional_profile_id_fkey";
            columns: ["id"];
            isOneToOne: true;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      professional_skill: {
        Row: {
          created_at: string;
          professional_id: string;
          skill_name: string;
        };
        Insert: {
          created_at?: string;
          professional_id: string;
          skill_name: string;
        };
        Update: {
          created_at?: string;
          professional_id?: string;
          skill_name?: string;
        };
        Relationships: [
          {
            foreignKeyName: "professional_skill_professional_id_fkey";
            columns: ["professional_id"];
            isOneToOne: false;
            referencedRelation: "professional_profile";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "professional_skill_professional_id_fkey";
            columns: ["professional_id"];
            isOneToOne: false;
            referencedRelation: "professional_profile_view";
            referencedColumns: ["id"];
          }
        ];
      };
      request_details: {
        Row: {
          accepted_pitch: string | null;
          base_location: string | null;
          budget_lower_limit: number | null;
          budget_upper_limit: number | null;
          content: string | null;
          created_at: string | null;
          created_by: string | null;
          duration: string | null;
          duration_unit: Database["public"]["Enums"]["duration_unit"] | null;
          id: string;
          industry: string | null;
          language_requirements: string[] | null;
          days_until_expiration: number | null;
          status: string | null;
          title: string | null;
          updated_at: string | null;
          workmode: Database["public"]["Enums"]["workmode"] | null;
        };
        Insert: {
          accepted_pitch?: string | null;
          base_location?: string | null;
          budget_lower_limit?: number | null;
          budget_upper_limit?: number | null;
          content?: string | null;
          created_at?: string | null;
          created_by?: string | null;
          duration?: string | null;
          duration_unit?: Database["public"]["Enums"]["duration_unit"] | null;
          id?: string;
          industry?: string | null;
          language_requirements?: string[] | null;
          days_until_expiration?: number | null;
          status?: string | null;
          title?: string | null;
          updated_at?: string | null;
          workmode?: Database["public"]["Enums"]["workmode"] | null;
        };
        Update: {
          accepted_pitch?: string | null;
          base_location?: string | null;
          budget_lower_limit?: number | null;
          budget_upper_limit?: number | null;
          content?: string | null;
          created_at?: string | null;
          created_by?: string | null;
          duration?: string | null;
          duration_unit?: Database["public"]["Enums"]["duration_unit"] | null;
          id?: string;
          industry?: string | null;
          language_requirements?: string[] | null;
          days_until_expiration?: number | null;
          status?: string | null;
          title?: string | null;
          updated_at?: string | null;
          workmode?: Database["public"]["Enums"]["workmode"] | null;
        };
        Relationships: [
          {
            foreignKeyName: "request_details_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "user_profile";
            referencedColumns: ["id"];
          }
        ];
      };
      unlocked_request: {
        Row: {
          created_at: string;
          professional_id: string;
          request_id: string;
        };
        Insert: {
          created_at?: string;
          professional_id: string;
          request_id: string;
        };
        Update: {
          created_at?: string;
          professional_id?: string;
          request_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "unlocked_request_professional_id_fkey";
            columns: ["professional_id"];
            isOneToOne: false;
            referencedRelation: "professional_profile";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "unlocked_request_professional_id_fkey";
            columns: ["professional_id"];
            isOneToOne: false;
            referencedRelation: "professional_profile_view";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "unlocked_request_request_id_fkey";
            columns: ["request_id"];
            isOneToOne: false;
            referencedRelation: "professional_free_request_view";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "unlocked_request_request_id_fkey";
            columns: ["request_id"];
            isOneToOne: false;
            referencedRelation: "request_details";
            referencedColumns: ["id"];
          }
        ];
      };
      user_mailbox: {
        Row: {
          created_at: string;
          id: string;
          is_read: boolean | null;
          message: string | null;
          sent_from: string | null;
          sent_to: string | null;
        };
        Insert: {
          created_at?: string;
          id?: string;
          is_read?: boolean | null;
          message?: string | null;
          sent_from?: string | null;
          sent_to?: string | null;
        };
        Update: {
          created_at?: string;
          id?: string;
          is_read?: boolean | null;
          message?: string | null;
          sent_from?: string | null;
          sent_to?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "user_mailbox_sent_from_fkey";
            columns: ["sent_from"];
            isOneToOne: false;
            referencedRelation: "professional_profile";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "user_mailbox_sent_from_fkey";
            columns: ["sent_from"];
            isOneToOne: false;
            referencedRelation: "professional_profile_view";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "user_mailbox_sent_to_fkey";
            columns: ["sent_to"];
            isOneToOne: false;
            referencedRelation: "user_profile";
            referencedColumns: ["id"];
          }
        ];
      };
      user_profile: {
        Row: {
          avatar_link: string | null;
          bio: string | null;
          created_at: string | null;
          email: string | null;
          firstname: string | null;
          id: string;
          lastname: string | null;
          occupation: string | null;
          phone_number: string | null;
          updated_at: string | null;
          username: string | null;
          verify_status: boolean | null;
        };
        Insert: {
          avatar_link?: string | null;
          bio?: string | null;
          created_at?: string | null;
          email?: string | null;
          firstname?: string | null;
          id: string;
          lastname?: string | null;
          occupation?: string | null;
          phone_number?: string | null;
          updated_at?: string | null;
          username?: string | null;
          verify_status?: boolean | null;
        };
        Update: {
          avatar_link?: string | null;
          bio?: string | null;
          created_at?: string | null;
          email?: string | null;
          firstname?: string | null;
          id?: string;
          lastname?: string | null;
          occupation?: string | null;
          phone_number?: string | null;
          updated_at?: string | null;
          username?: string | null;
          verify_status?: boolean | null;
        };
        Relationships: [
          {
            foreignKeyName: "user_profile_id_fkey";
            columns: ["id"];
            isOneToOne: true;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      professional_free_request_view: {
        Row: {
          base_location: string | null;
          budget_lower_limit: number | null;
          budget_upper_limit: number | null;
          content: string | null;
          duration: string | null;
          id: string | null;
          industry: string | null;
          language_requirements: string[] | null;
          professional_id: string | null;
          status: string | null;
          title: string | null;
          unlocked: boolean | null;
          workmode: Database["public"]["Enums"]["workmode"] | null;
        };
        Relationships: [
          {
            foreignKeyName: "unlocked_request_professional_id_fkey";
            columns: ["professional_id"];
            isOneToOne: false;
            referencedRelation: "professional_profile";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "unlocked_request_professional_id_fkey";
            columns: ["professional_id"];
            isOneToOne: false;
            referencedRelation: "professional_profile_view";
            referencedColumns: ["id"];
          }
        ];
      };
      professional_pitch_view: {
        Row: {
          created_at: string | null;
          delivery_time: number | null;
          delivery_unit: Database["public"]["Enums"]["duration_unit"] | null;
          id: string | null;
          is_accepted: boolean | null;
          is_read: boolean | null;
          message: string | null;
          price: number | null;
          professional_id: string | null;
          request_details_id: string | null;
          updated_at: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "professional_pitch_professional_id_fkey";
            columns: ["professional_id"];
            isOneToOne: false;
            referencedRelation: "professional_profile";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "professional_pitch_professional_id_fkey";
            columns: ["professional_id"];
            isOneToOne: false;
            referencedRelation: "professional_profile_view";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "professional_pitch_request_details_id_fkey";
            columns: ["request_details_id"];
            isOneToOne: false;
            referencedRelation: "request_details";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "professional_pitch_request_details_id_fkey";
            columns: ["request_details_id"];
            isOneToOne: false;
            referencedRelation: "professional_free_request_view";
            referencedColumns: ["id"];
          }
        ];
      };
      professional_profile_view: {
        Row: {
          avatar_link: string | null;
          bio: string | null;
          created_at: string | null;
          email: string | null;
          firstname: string | null;
          id: string | null;
          industry: string | null;
          lastname: string | null;
          occupation: string | null;
          phone_number: string | null;
          resume: string | null;
          skill: string[] | null;
          updated_at: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "professional_profile_id_fkey";
            columns: ["id"];
            isOneToOne: true;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      duration_unit: "Days" | "Weeks" | "Months" | "Years";
      request_details_status: "Active" | "Cancelled" | "Hired";
      workmode: "Remote Only" | "On Site Only" | "Hybrid";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never;
