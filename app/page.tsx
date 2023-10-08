import Image from "next/image";
import Link from "next/link";
import { BsMouse } from "react-icons/bs";
import { FiExternalLink } from "react-icons/fi";

export default function Home() {
  return (
    <div className="bg-white p-5 min-h-screen min-w-full flex items-center justify-center flex-col py-10">
      <div className="flex items-center justify-between gap-5 min-h-screen">
        <div className="md:w-[550px]">
          <div className="my-2 text-heading">
            Find the right talents for the right projects with September!
          </div>
          <div className="text-title">
            September provide a platform where you can easily find talents and
            bring your projects to life.
          </div>
          <Link
            className="mt-16 text-subtitle flex items-center justify-center gap-5 hover:cursor-pointer"
            href={"#portal-section"}
          >
            <div className="animate-bounce">
              <BsMouse size={25} />
            </div>
            Scroll to Read More
          </Link>
        </div>{" "}
        <div className="hidden md:block">
          <Image
            alt={""}
            src={"/undraw_2.svg"}
            width={450}
            height={450}
            className="rounded"
          />
        </div>
      </div>
      <div className="border w-full my-10" id="portal-section"></div>
      <div className="flex flex-col gap-5 min-h-screen w-full">
        <div className=" flex flex-col items-center gap-3 p-3 md:h-[450px] justify-evenly w-full">
          <div className="flex flex-col md:flex-row items-center justify-evenly w-full gap-4">
            <Image
              alt={""}
              src={"/undraw_team_1.svg"}
              width={230}
              height={230}
              className="rounded bg-white shadow border p-5"
            />
            <div className="flex flex-col justify-evenly h-full md:w-1/2 gap-3 text-start">
              <div className="flex flex-col gap-2">
                <div className="text-lg text-left text-subheading">
                  User Portal
                </div>
                <p className="text-title">
                  Are you seeking professional services?
                </p>
                <p className="text-title">
                  Are you tired of endless talent searches?
                </p>
                <p className="text-title">
                  Are you looking for a simpler way to connect with experts?
                </p>
              </div>
              <div className="flex justify-start items-start md:items-center gap-3 flex-col md:flex-row">
                <p className="italic font-bold">
                  Start Now and Find the Right Talents!
                </p>
                <div className=" text-primary flex justify-center items-center ">
                  <Link
                    href={"/user_portal"}
                    className="flex justify-center items-center gap-2"
                  >
                    <FiExternalLink size={20} />
                    <h1>User Portal</h1>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="border w-full my-10 sm:hidden"
          id="portal-section"
        ></div>
        <div className=" flex flex-col items-center gap-3 p-3 md:h-[450px] justify-evenly w-full">
          <div className="flex flex-col md:flex-row items-center justify-evenly w-full gap-4">
            <Image
              alt={""}
              src={"/undraw_search_1.svg"}
              width={230}
              height={230}
              className="rounded bg-white shadow border p-5"
            />
            <div className="flex flex-col justify-evenly h-full md:w-1/2 gap-3 text-start">
              <div className="flex flex-col gap-2">
                <div className="text-lg text-left text-subheading">
                  Professional Portal
                </div>
                <p className="text-title">
                  Want to showcase your professional profile?
                </p>
                <p className="text-title">
                  Searching for new projects and opportunities?
                </p>
              </div>
              <div className="flex justify-start items-start md:items-center gap-3 flex-col md:flex-row">
                <p className="italic font-bold">
                  Start Now and Find the Right Projects!
                </p>
                <div className=" text-primary flex justify-center items-center ">
                  <Link
                    href={"/professional_portal"}
                    className="flex justify-center items-center gap-2"
                  >
                    <FiExternalLink size={20} />
                    <h1>Professional Portal</h1>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
