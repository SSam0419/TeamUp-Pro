"use client";
import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import ProfileCard from "@/components/ProfileCard";
import { usePathname } from "next/navigation";

type props = {
  isUserPortal: boolean;
  menuItems: { name: string; link: string }[];
};

export default function NavBar({ isUserPortal, menuItems }: props) {
  const pathName = usePathname();

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <Navbar
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      className="w-screen"
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <p className="text-subheading">ProMatch</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {menuItems.map((item, index) => (
          <NavbarItem key={`${item}-${index}`}>
            <Link
              className={`w-full ${
                pathName === item.link ? "text-primary font-medium" : ""
              } `}
              color={"foreground"}
              href={item.link}
              size="lg"
            >
              {item.name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end" className="hidden sm:flex">
        <NavbarItem>
          <ProfileCard isUserCard={isUserPortal} />
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu className="w-screen">
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              color={"foreground"}
              href={item.link}
              size="lg"
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
        <NavbarMenuItem>
          <NavbarItem>
            <ProfileCard isUserCard={isUserPortal} />
          </NavbarItem>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}
