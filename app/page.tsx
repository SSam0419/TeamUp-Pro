"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Link href={"/user_portal"}>
        <h1>Go to user portal</h1>
      </Link>
    </div>
  );
}
