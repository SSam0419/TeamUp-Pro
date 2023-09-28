"use client";

import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-white p-2 min-h-screen min-w-full flex items-center justify-center flex-col py-10">
      <div className="flex items-center justify-center gap-3">
        <Image
          alt={""}
          src={"/office_2.png"}
          width={650}
          height={650}
          className="rounded"
        />
        <div className="w-[300px]">
          <div className="my-2 text-lg">Welcome to September!</div>
          <div className="">
            September is a platform to connect clients and professionals,
            providing a platform where you can easily collaborate and bring your
            projects to life. Whether you are a user looking to submit a request
            or a professional ready to pitch your expertise and find your
            client, we have you covered.
          </div>
        </div>
      </div>
      <div className="border w-[800px] my-10"></div>
      <div className="flex gap-5">
        <div className="w-[500px] flex flex-col items-center gap-3 shadow p-3 border rounded-lg h-[400px] justify-evenly">
          <div className="text-lg text-center">User Portal</div>
          <div className="border w-full"></div>

          <div className="w-3/4 text-justify h-[150px]">
            Are you in need of professional services?
            <div></div>
            Our User Portal allows you to effortlessly submit your requests, and
            wait for professional to send their pitches! you can manage your
            requests from a centralized dashboard. Edit, delete, or track the
            status of each request with ease.
          </div>
          <div className="italic">
            Find the right talents for your projects now!
          </div>
          <div className="p-2 bg-primary text-white flex justify-center items-center rounded-xl w-1/2">
            <Link href={"/user_portal"}>
              <h1>Go to User Portal</h1>
            </Link>
          </div>
        </div>

        <div className="w-[500px] flex flex-col items-center gap-3 shadow p-3 border rounded-lg h-[400px] justify-evenly">
          <div className="text-lg text-center">Professional Portal</div>
          <div className="border w-full"></div>
          <div className="w-3/4 text-justify h-[150px]">
            Are you a skilled professional looking for exciting opportunities?
            <div></div>
            Our Professional Portal offers a platform where you can discover
            relevant requests tailored to your industry and skills. Explore a
            range of projects and unlock those that catch your interest.
          </div>{" "}
          <div className="italic">
            Find the right projects for your talents now!
          </div>
          <div className="p-2 bg-primary text-white flex justify-center items-center rounded-xl w-1/2">
            <Link href={"/professional_portal"}>
              <h1>Go to Professional Portal</h1>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
