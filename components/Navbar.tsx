"use client";
import React, { ReactNode } from "react";
import {
  Divider,
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
import { PiSignpostFill } from "react-icons/pi";

type props = {
  portalType: "main" | "user" | "professional";
  menuItems: { name: string; link: string; icon?: ReactNode }[];
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
                portalType == "main"
                  ? "/"
                  : portalType == "professional"
                  ? "/professional_portal"
                  : "/user_portal"
              }`}
              className="font-bold"
            >
              TeamUp Pro
            </Link>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent>
          {menuItems.map((item, index) => (
            <NavbarItem
              key={`${item}-${index}`}
              className={classNames({
                "text-center": true,
                "text-primary": pathName === item.link,
              })}
            >
              <Link
                className={`w-full rounded-full px-5 py-2 hover:bg-default flex gap-2  items-center justify-center`}
                color="foreground"
                href={item.link}
              >
                {item.icon !== null && item.icon}
                {item.name}
              </Link>
            </NavbarItem>
          ))}
        </NavbarContent>

        {!(portalType === "main") && (
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
        )}

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
