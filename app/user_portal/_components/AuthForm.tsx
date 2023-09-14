"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

import React from "react";

export default function AuthForm() {
  const supabase = createClientComponentClient();
  return (
    <div className="w-[500px]">
      <Auth
        supabaseClient={supabase}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: "#F7717D",
                brandAccent: "#F7717D",
              },
            },
          },
        }}
        view="sign_in"
        theme="light"
        providers={["github", "apple", "google"]}
        redirectTo="http://localhost:3000/api/auth/callback"
      ></Auth>
    </div>
  );
}
