import React, { useEffect, useState } from "react";
import { AiFillGithub, AiOutlineMail } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { RiLockPasswordLine } from "react-icons/ri";
import PrimaryButton from "./CustomButtons/PrimaryButton";
import SecondaryButton from "./CustomButtons/SecondaryButton";
import Link from "next/link";
import { useMutation } from "react-query";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import axios from "axios";

const AuthForm = ({ isUserPortal }: { isUserPortal: boolean }) => {
  const supabase = createClientComponentClient();

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
          //create a profile with this email by going to api/auth links
          const { data: response } = await axios.get(
            `/api/profile/${
              isUserPortal ? "user" : "professional"
            }?email=${email}`
          );
          if (response.data !== null) {
            setHint("This email is already registered ");
            return {
              data: null,
              error: "This email is already registered ",
            };
          } else {
            const { data, error } = await supabase.auth.signUp({
              email: email,
              password: password,
            });

            setHint("an confirmation email has sent to your email");
            return { data, error };
          }
        } else {
          setHint("Please fill the valid information in the fields");
          return {
            data: null,
            error: "Please fill the valid information in the fields",
          };
        }
      },
      {
        onError: ({ error }) => {
          setHint("Error" + error);
        },
      }
    );
  const { mutate: signInWithEmail, isLoading: signingInWithEmail } =
    useMutation(
      ["signInWithEmail"],
      async () => {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        return { data, error };
      },
      {
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
            redirectTo: origin
              ? `${origin}/${
                  isUserPortal ? "user_portal" : "professional_portal"
                }`
              : "localhost:3000",
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
            redirectTo: origin
              ? `${origin}/${
                  isUserPortal ? "user_portal" : "professional_portal"
                }`
              : "localhost:3000",
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
    <div className="w-[500px] flex flex-col gap-5 h-[450px] justify-center">
      {signingInWithOauth && (
        <div className="italic text-center">Signing In ..</div>
      )}

      {!signingInWithOauth && (
        <>
          <div className="flex gap-3 items-center justify-between">
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
              <PrimaryButton
                text="Sign Up"
                action={() => {
                  signUpWithEmail();
                }}
              />
              <SecondaryButton
                text="Cancel"
                action={() => {
                  setSignUp(false);
                }}
              />
            </div>
          )}
          {!signUp && (
            <div className="flex gap-2 justify-center items-center text-sm">
              <PrimaryButton
                text="Sign In"
                action={() => {
                  signInWithEmail();
                }}
              />
              <SecondaryButton
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
