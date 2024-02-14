"use client";
import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import ProfileCard from "@/components/ProfileCard";
import { usePathname } from "next/navigation";
import Link from "next/link";
import useConstants from "@/hooks/useFetchConstant";
import { useAppStore } from "@/libs/ZustandStore";
import classNames from "classnames";
import CustomButton from "./CustomButtons/CustomButton";

type props = {
  portalType: "main" | "user" | "professional";
  menuItems: { name: string; link: string }[];
};

export default function NavBar({ portalType, menuItems }: props) {
  useConstants();

  const pathName = usePathname();

  const user = useAppStore((state) => state.profileInfo);

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <div className="bg-white" key={portalType}>
      <Navbar
        isBordered
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
        className="w-screen fixed"
      >
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
          <NavbarBrand>
            <Link
              href={`${
                user == null
                  ? "/"
                  : user.professionalProfile == null
                  ? "/professional_portal"
                  : "/user_portal"
              }`}
              className="text-subheading"
            >
              TeamUp Pro
            </Link>
          </NavbarBrand>
          {menuItems.map((item, index) => (
            <NavbarItem
              key={`${item}-${index}`}
              className={classNames({
                // "w-[200px]": portalType === "main",
                // "w-[150px]": portalType !== "main",
                "text-center": true,
                "px-4": true,
                "py-2": true,
                "rounded-full": true,
                "font-semibold": true,
                "text-primary": pathName === item.link,
              })}
            >
              <Link className={`w-full`} color="foreground" href={item.link}>
                {item.name}
              </Link>
            </NavbarItem>
          ))}
        </NavbarContent>

        <NavbarContent>
          <NavbarItem>
            <Link
              className={`w-full`}
              color="foreground"
              href={
                portalType === "professional"
                  ? "/user_portal"
                  : "/professional_portal"
              }
            >
              <CustomButton
                action={() => {}}
                variant="secondary"
                text={
                  portalType === "professional"
                    ? "User Portal"
                    : "Professional Portal"
                }
                style="bordered"
              />
            </Link>
          </NavbarItem>
        </NavbarContent>

        <NavbarContent justify="end" className="hidden sm:flex">
          <NavbarItem>
            <ProfileCard portalType={portalType} />
          </NavbarItem>
        </NavbarContent>

        {/* mobile navbar */}
        <NavbarMenu className="w-screen">
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                className={`w-full ${
                  pathName === item.link ? "text-primary font-medium" : ""
                } `}
                color={"foreground"}
                href={item.link}
              >
                {item.name}
              </Link>
            </NavbarMenuItem>
          ))}
          <NavbarMenuItem>
            <NavbarItem>
              <ProfileCard portalType={portalType} />
            </NavbarItem>
          </NavbarMenuItem>
        </NavbarMenu>
      </Navbar>
    </div>
  );
}
