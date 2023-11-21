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

type props = {
  portalType: "main" | "user" | "professional";
  menuItems: { name: string; link: string }[];
};

export default function NavBar({ portalType, menuItems }: props) {
  const pathName = usePathname();

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <div className="bg-white">
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
            <p className="text-subheading">TeamUp Pro</p>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          {menuItems.map((item, index) => (
            <NavbarItem
              key={`${item}-${index}`}
              className={`${pathName === item.link ? "border-primary" : ""} ${
                portalType === "main" ? "w-[200px]" : "w-[150px]"
              } text-center border shadpw px-4 py-2 rounded-full`}
            >
              <Link
                className={`w-full ${
                  pathName === item.link ? "text-primary font-medium" : ""
                } `}
                color={"foreground"}
                href={item.link}
              >
                {item.name}
              </Link>
            </NavbarItem>
          ))}
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
