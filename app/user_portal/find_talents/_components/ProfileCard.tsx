import CustomButton from "@/components/CustomButtons/CustomButton";
import { UserProfileClass } from "@/libs/models/UserProfileClass/UserProfileClass";
import {
  Avatar,
  Badge,
  Button,
  Checkbox,
  Chip,
  Divider,
} from "@nextui-org/react";

import { ReadonlyURLSearchParams } from "next/navigation";
import React from "react";

type props = {
  idx: number;
  setCheckFunction: Function;
  setShowContactFunction: Function;
  showContact: boolean[];
  check: boolean[];
  profile: UserProfileClass;
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
      {/* <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
        <Checkbox isSelected={check[idx]} size="lg"></Checkbox>
      </div> */}

      <div className="flex items-center gap-2">
        {profile.avatarLink && (
          <div>
            <Avatar src={profile.avatarLink} />
          </div>
        )}
        <div className="">
          {profile.firstname} {profile.lastname}
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-small">{profile.currentOrganization}</span>
        <span className="text-tiny text-default-600">
          {profile.professionalProfile?.professionalJobTitle}
        </span>
      </div>

      <Divider />

      <div className="h-2/6">
        {profile.professionalProfile?.professionalIntroduction}
      </div>

      <Divider />

      <div className="h-2/6">
        <div className="flex flex-wrap gap-2">
          {profile.professionalProfile?.skills.map((skill, idx) => {
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
                <Chip color="default">{skill}</Chip>
              </div>
            );
          })}
        </div>
      </div>
      <Divider />

      <div className="h-1/6">
        <CustomButton
          variant="secondary"
          text="Get Resume"
          action={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            e.stopPropagation();
            if (profile.professionalProfile?.resumeLink)
              window.open(profile.professionalProfile?.resumeLink, "_blank");
          }}
        />
      </div>
    </div>
  );
};

export default ProfileCard;
