"use client";

import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
// import { useRouter } from "next/navigation";
// import { useState } from "react";

export default function AuthForm() {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const router = useRouter();
  // const supabase = createClientComponentClient();

  // const handleSignUp = async () => {
  //   await supabase.auth.signUp({
  //     email,
  //     password,
  //     options: {
  //       emailRedirectTo: `${location.origin}/auth/callback`,
  //     },
  //   });
  //   router.refresh();
  // };

  // const handleSignIn = async () => {
  //   await supabase.auth.signInWithPassword({
  //     email,
  //     password,
  //   });
  //   router.refresh();
  // };

  // const handleSignOut = async () => {
  //   await supabase.auth.signOut();
  //   router.refresh();
  // };

  // return (
  //   <>
  //     <input
  //       name="email"
  //       onChange={(e) => setEmail(e.target.value)}
  //       value={email}
  //     />
  //     <input
  //       type="password"
  //       name="password"
  //       onChange={(e) => setPassword(e.target.value)}
  //       value={password}
  //     />
  //     <button onClick={handleSignUp}>Sign up</button>
  //     <button onClick={handleSignIn}>Sign in</button>
  //     <button onClick={handleSignOut}>Sign out</button>
  //   </>
  // );
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
        redirectTo="/api/auth/callback"
      ></Auth>
    </div>
  );
}
