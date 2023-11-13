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
            Find the right talents for the right projects with TeamUp Pro!
          </div>
          <div className="text-title">
            TeamUp Pro provide a platform where you can easily find talents and
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
      <div className="min-h-screen flex flex-col items-start justify-center">
        <div className="text-subheading my-5 px-6">Timeline</div>
        <ol className="relative border-s border-gray-200 dark:border-gray-700">
          {timelineSteps.map((step, index) => (
            <TimelineItem key={index} title={step.title} text={step.text} />
          ))}
        </ol>
        <div className="my-10"></div>
        <div className="flex justify-evenly items-center">
          <Link
            href={"/user_portal"}
            className="hover:cursor-pointer flex flex-col 
          md:flex-row items-center justify-evenly w-full gap-4"
          >
            <Image
              alt={""}
              src={"/undraw_team_1.svg"}
              width={230}
              height={230}
              className="rounded bg-white shadow border p-5"
            />
            <div className="flex flex-col justify-evenly h-full md:w-1/2 gap-3 text-start">
              <div className="flex flex-col gap-2">
                <div className="text-lg text-left text-subheading flex items-center gap-2 text-primary">
                  User Portal <FiExternalLink size={25} />
                </div>
              </div>
              <div className="flex justify-start items-start md:items-center gap-3 flex-col md:flex-row">
                <p className="italic font-bold">
                  Start Now and Find the Right Talents!
                </p>
              </div>
            </div>
          </Link>
          <Link
            href={"/professional_portal"}
            className="hover:cursor-pointer flex flex-col 
          md:flex-row items-center justify-evenly w-full gap-4"
          >
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
                  <div className="text-lg text-left text-subheading flex gap-2 text-primary">
                    Professional Portal <FiExternalLink size={25} />
                  </div>
                </div>
                <div className="flex justify-start items-start md:items-center gap-3 flex-col md:flex-row">
                  <p className="italic font-bold">
                    Start Now and Find the Right Projects!
                  </p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

// time line components

const timelineSteps = [
  {
    title: "Request Submission",
    text: "Users can submit their requests by filling out a form where they provide details such as the title, description, industry, budget, and deadline.",
  },
  {
    title: "Request Management",
    text: "Users can view and manage their submitted requests, including editing, deleting, and tracking the status of each request.",
  },
  {
    title: "Pitch Selection",
    text: "Once professionals send their pitches, users can view and compare the pitches received, and select the professionals they want to work with.",
  },
];

const TimelineItem = ({ title, text }: { title: string; text: string }) => {
  return (
    <li className="mb-10 px-6">
      <TimelineIcon />
      <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">
        {title}
      </h3>
      <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
        {text}
      </p>
    </li>
  );
};

const TimelineIcon = () => {
  return (
    <span className="absolute flex items-center justify-center w-6 h-6 bg-primary rounded-full -start-3 ring-8 ring-white">
      <svg
        className="w-2.5 h-2.5 text-white"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
      </svg>
    </span>
  );
};
