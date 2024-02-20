import React, { useEffect, useState } from "react";
import { AiFillGithub, AiOutlineMail } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { RiLockPasswordLine } from "react-icons/ri";
import CustomButton from "./CustomButtons/CustomButton";
import Link from "next/link";
import { useMutation } from "react-query";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import axios from "axios";
import { AuthError } from "@supabase/supabase-js";

const PortalUrl = {
  main: "",
  user: "user_portal",
  professional: "professional_portal",
};

const AuthForm = ({
  portalType,
}: {
  portalType: "main" | "user" | "professional";
}) => {
  const supabase = createClientComponentClient();
  const portalUrl = PortalUrl[portalType];
  const [signUp, setSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [hint, setHint] = useState("");
  const [signingInWithOauth, setSigningInWithOauth] = useState(false);

  const clearStates = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setHint("");
  };

  useEffect(() => {
    clearStates();
  }, [signUp]);

  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";

  const { mutate: signUpWithEmail, isLoading: signingUpWithEmail } =
    useMutation(
      ["signUpWithEmail"],
      async () => {
        if (password == confirmPassword && email && password) {
          //check if email exists

          const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
          });

          return { data, error };
        } else {
          setHint("Please fill the valid information in the fields");
          return {
            data: null,
            error: "Please fill the valid information in the fields",
          };
        }
      },
      {
        onSuccess: ({ data, error }) => {
          if (error instanceof AuthError) {
            setHint(error.message);
          } else if (data?.user?.identities?.length === 0) {
            setHint("This user already exists");
          } else if (data) {
            setHint("check your inbox for confirmation email");
          }
        },
        onError: ({ error }) => {
          setHint("Error" + error);
        },
      }
    );
  const { mutate: signInWithEmail, isLoading: signingInWithEmail } =
    useMutation(
      ["signInWithEmail"],
      async () => {
        setSigningInWithOauth(true);
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        console.log({ data, error });
        return { data, error };
      },

      {
        onSuccess: ({ data, error }) => {
          if (error) {
            setHint(error.message);
          }
          setSigningInWithOauth(false);
        },
        onError: () => {
          setSigningInWithOauth(false);
        },
      }
    );

  const { mutate: signInWithGithub, isLoading: signingInWithGithub } =
    useMutation(
      ["signInWithGithub"],
      async () => {
        setSigningInWithOauth(true);

        const { data, error } = await supabase.auth.signInWithOAuth({
          provider: "github",
          options: {
            redirectTo: origin ? `${origin}/${portalUrl}` : "localhost:3000",
          },
        });
        return { data, error };
      },
      {
        onError: () => {
          setSigningInWithOauth(false);
        },
      }
    );
  const { mutate: signInWithGoogle, isLoading: signingInWithGoogle } =
    useMutation(
      ["signInWithGoogle"],
      async () => {
        setSigningInWithOauth(true);

        const { data, error } = await supabase.auth.signInWithOAuth({
          provider: "google",
          options: {
            redirectTo: origin ? `${origin}/${portalUrl}` : "localhost:3000",
          },
        });
        return { data, error };
      },
      {
        onError: () => {
          setSigningInWithOauth(false);
        },
      }
    );
  return (
    <div className="md:w-[500px] flex flex-col gap-5 h-[450px] justify-center">
      {signingInWithOauth && (
        <div className="italic text-center">Signing In ..</div>
      )}

      {!signingInWithOauth && (
        <>
          <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
            <button
              className="border rounded-lg py-2 px-4 text-sm font-semibold w-[230px] flex items-center justify-center gap-2 hover:opacity-80"
              onClick={() => signInWithGoogle()}
            >
              <FcGoogle size={25} />
              Sign In With Google
            </button>
            <button
              className="border rounded-lg py-2 px-4 text-sm font-semibold w-[230px] flex items-center justify-center gap-2 hover:opacity-80"
              onClick={() => signInWithGithub()}
            >
              <AiFillGithub size={25} />
              Sign In With Github
            </button>
          </div>
          <div className="grid grid-cols-7 items-center justify-center">
            <div className="border-secondary border col-span-3"></div>
            <div className="text-center text-base italic text-secondary">
              or
            </div>
            <div className="border-secondary border col-span-3"></div>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <div className="border rounded-lg p-2 flex items-center justify-start">
              <AiOutlineMail size={25} />
              <input
                required
                id="email"
                placeholder="your email address"
                className="outline-none p-2 placeholder:font-thin placeholder:italic w-full"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              ></input>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password">Password</label>
            <div className="border rounded-lg p-2 flex items-center justify-start">
              <RiLockPasswordLine size={25} />
              <input
                id="password"
                placeholder="your password"
                className="outline-none p-2 placeholder:font-thin placeholder:italic w-full"
                value={password}
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              ></input>
            </div>
          </div>
          {signUp && (
            <div className="flex flex-col gap-2">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="border rounded-lg p-2 flex items-center justify-start">
                <RiLockPasswordLine size={25} />
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="your password"
                  className="outline-none p-2 placeholder:font-thin placeholder:italic w-full"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                ></input>
              </div>
            </div>
          )}
          <div className="italic text-primary h-[10px]">{hint}</div>
          {signUp && (
            <div className="flex gap-2 justify-center items-center text-sm">
              <CustomButton
                variant="primary"
                text="Sign Up"
                action={() => {
                  signUpWithEmail();
                }}
                isLoading={signingUpWithEmail}
              />
              <CustomButton
                disabled={signingUpWithEmail}
                variant="secondary"
                text="Cancel"
                action={() => {
                  setSignUp(false);
                }}
              />
            </div>
          )}
          {!signUp && (
            <div className="flex gap-2 justify-center items-center text-sm">
              <CustomButton
                variant="primary"
                text="Sign In"
                action={() => {
                  signInWithEmail();
                }}
              />
              <CustomButton
                variant="secondary"
                text="Sign Up"
                action={() => {
                  setSignUp(true);
                }}
              />
            </div>
          )}
          <div className="">
            <p className="underline">
              <Link href="/">Forgot Password?</Link>
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default AuthForm;
