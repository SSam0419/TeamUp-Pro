import React, { useState } from "react";
import { AiFillGithub, AiOutlineMail } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { RiLockPasswordLine } from "react-icons/ri";
import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton";
import Link from "next/link";
import { useMutation } from "react-query";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const AuthForm = () => {
  const supabase = createClientComponentClient();

  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";

  const { mutate: signInWithGithub, isLoading: signingInWithGithub } =
    useMutation(["signInWithGithub"], async () => {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "github",
        options: {
          redirectTo: origin ? `${origin}/user_portal` : "localhost:3000",
        },
      });
      console.log({ data, error });
      return { data, error };
    });

  return (
    <div className="w-[500px] flex flex-col gap-5">
      {signingInWithGithub && (
        <div className="italic ">Signing In with Github ..</div>
      )}

      {!signingInWithGithub && (
        <>
          <div className="flex gap-3 items-center justify-between">
            <button
              className="border rounded-lg py-2 px-4 text-sm font-semibold w-[230px] flex items-center justify-center gap-2"
              onClick={() => signInWithGithub()}
            >
              <FcGoogle size={25} />
              Sign In With Google
            </button>
            <button
              className="border rounded-lg py-2 px-4 text-sm font-semibold w-[230px] flex items-center justify-center gap-2"
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
              ></input>
            </div>
          </div>
          <div className="flex gap-2 justify-center items-center text-sm">
            <PrimaryButton text="Sign In" action={() => {}} />
            <SecondaryButton text="Sign Up" action={() => {}} />
          </div>
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
