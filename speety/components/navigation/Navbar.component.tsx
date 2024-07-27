"use client";
import * as React from "react";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { RxHamburgerMenu, RxCross1 } from "react-icons/rx";
import { GrCaretNext } from "react-icons/gr";
import { ProfileAvatar } from "./ProfileAvatar.component";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/config";
import { Notifications } from "./Notification.component";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
];

const navLinks = [
  { title: "Buy", path: "/buy" },
  { title: "Sell", path: "/sell" },
  { title: "Rent", path: "/rent" },
  { title: "Agent", path: "/agent" },
  { title: "Contact", path: "/contact" },
];

export const Navbar = () => {
  const [isMobileNavOpen, setIsMobileNavOpen] = React.useState(false);

  const [user] = useAuthState(auth);

  const toggleMobileNav = () => setIsMobileNavOpen(!isMobileNavOpen);

  return (
    <>
      <nav className="flex items-center justify-between px-1 md:px-20 py-5 sticky bg-white bg-center bg-cover top-0 z-10">
        <div className="logo">
          <Link href={"/"}>
            <Image
              src={"/speety_logo.png"}
              height={100}
              width={100}
              alt="Logo"
            />
          </Link>
        </div>

        <div className="hidden lg:block">
          <NavigationLinks />
        </div>

        <div className="actions flex items-center justify-center gap-x-5">
          <button className="block lg:hidden" onClick={toggleMobileNav}>
            {isMobileNavOpen ? (
              <RxCross1 size={30} />
            ) : (
              <RxHamburgerMenu size={30} />
            )}
          </button>
          {!user && (
            <div>
              <Link
                href={"/auth/login"}
                className="bg-[#397367] hover:bg-gray-900 font-medium text-white px-8 py-2 rounded-[30px] shadow-lg md:h-12 2xl:h-14 flex items-center space-x-2 text-lg 2xl:text-lg"
              >
                <span>Launch App</span>
                <GrCaretNext />
              </Link>
            </div>
          )}
          {user && <Notifications />}
          {user && <ProfileAvatar />}
        </div>
      </nav>
      {isMobileNavOpen && (
        <div className="mobile-nav h-[70vh] w-full fixed border-4  bg-white flex lg:hidden z-10 rounded-lg px-8 py-8">
          <ul className="flex flex-col gap-y-8">
            <li>
              <Link href={"/"}>Get Started</Link>
            </li>
            <li>
              <Link href={"/"}>Support</Link>
            </li>
            <li>
              <Link href={"/docs"}>Documentation</Link>
            </li>
            <li>
              <Link href={"/"}>Link</Link>
            </li>

            <li>
              <Link href={"/"}>Link</Link>
            </li>

            <li>
              <Link href={"/"}>Link</Link>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

function NavigationLinks() {
  const [user] = useAuthState(auth);

  return (
    <NavigationMenu>
      <NavigationMenuList className="gap-x-10">
        {!user && (
          <>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-md">
                Getting started
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <a
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        href="/"
                      >
                        <div className="mb-2 mt-4 text-lg font-medium">
                          shadcn/ui
                        </div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          Beautifully designed components that you can copy and
                          paste into your apps. Accessible. Customizable. Open
                          Source.
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <ListItem href="/docs" title="Introduction">
                    Re-usable components built using Radix UI and Tailwind CSS.
                  </ListItem>
                  <ListItem href="/docs/installation" title="Installation">
                    How to install dependencies and structure your app.
                  </ListItem>
                  <ListItem
                    href="/docs/primitives/typography"
                    title="Typography"
                  >
                    Styles for headings, paragraphs, lists...etc
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-md">
                Support
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                  {components.map((component) => (
                    <ListItem
                      key={component.title}
                      title={component.title}
                      href={component.href}
                    >
                      {component.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/docs" legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(navigationMenuTriggerStyle(), "text-md")}
                >
                  Documentation
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </>
        )}
        {user && (
          <>
            {navLinks.map((item, key) => {
              return (
                <NavigationMenuItem key={key}>
                  <Link href={item.path} legacyBehavior passHref>
                    <NavigationMenuLink
                      className={cn(navigationMenuTriggerStyle(), "text-md")}
                    >
                      {item.title}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              );
            })}
          </>
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
