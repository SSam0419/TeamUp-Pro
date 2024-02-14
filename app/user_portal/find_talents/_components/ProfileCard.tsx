import CustomButton from "@/components/CustomButtons/CustomButton";
import { Badge, Button, Checkbox, Chip } from "@nextui-org/react";

import { ReadonlyURLSearchParams } from "next/navigation";
import React from "react";

type props = {
  idx: number;
  setCheckFunction: Function;
  setShowContactFunction: Function;
  showContact: boolean[];
  check: boolean[];
  profile: UserProfile;
  query: string;
  searchParams: ReadonlyURLSearchParams;
};

const ProfileCard = ({
  idx,
  check,
  showContact,
  profile,
  query,
  searchParams,
  setCheckFunction,
  setShowContactFunction,
}: props) => {
  return (
    <div
      key={idx}
      className="bg-white p-5 relative rounded-lg shadow border md:w-[260px] flex flex-col md:h-[430px] gap-3 hover:cursor-pointer hover:bg-slate-100"
      onClick={() => setCheckFunction(idx)}
    >
      <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
        <Checkbox isSelected={check[idx]} size="lg"></Checkbox>
      </div>

      <div className="h-1/6 border-b flex-col justify-between">
        <div className="">Occupation : {profile.occupation}</div>
        <div className="font-light">
          Contact person: {profile.firstname} {profile.lastname}
        </div>
      </div>
      <div className="h-2/6">{profile.bio}</div>
      <hr></hr>
      <div className="h-2/6">
        Skills :
        <div className="flex flex-wrap gap-2">
          {profile.skill.map((skill, idx) => {
            let style = false;
            if (query.includes("query")) {
              const current = new URLSearchParams(
                Array.from(searchParams.entries())
              );
              const filterQuery = current.get("query");

              const skillArray = skill.split(" ");
              for (const s of skillArray) {
                if (
                  filterQuery &&
                  filterQuery
                    .split(" ")
                    .some(
                      (substring) =>
                        substring.includes(s) || s.includes(substring)
                    )
                ) {
                  style = true;
                }
              }
            }
            return (
              <div key={idx} className={`${style ? "text-primary" : ""}`}>
                <Chip color="primary">{skill}</Chip>
              </div>
            );
          })}
        </div>
      </div>

      <div className="h-1/6">
        {!showContact[idx] && (
          <CustomButton
            variant="secondary"
            text="Get Contact"
            action={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
              e.stopPropagation();
              setShowContactFunction();
            }}
          />
        )}
        {showContact[idx] && (
          <div className=" font-semibold">Email: {profile.email}</div>
        )}
        {/* <div className="my-1"></div>
                  <CustomButton variant="primary"
                    text="Send Request"
                    action={(
                      e: React.MouseEvent<HTMLButtonElement, MouseEvent>
                    ) => {
                      e.stopPropagation();
                    }}
                  /> */}
      </div>
    </div>
  );
};

export default ProfileCard;
