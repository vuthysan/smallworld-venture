// "use client";

// import {
// 	DiscordIcon,
// 	GithubIcon,
// 	HeartFilledIcon,
// 	SearchIcon,
// 	TwitterIcon,
// } from "@/components/icons";
// import {
// 	Navbar,
// 	NavbarBrand,
// 	NavbarContent,
// 	NavbarItem,
// 	NavbarMenu,
// 	NavbarMenuItem,
// 	NavbarMenuToggle,
// 	Navbar as NextUINavbar,
// } from "@nextui-org/navbar";

// import { Button } from "@nextui-org/button";
// import { Image } from "@nextui-org/react";
// import { Input } from "@nextui-org/input";
// import { Kbd } from "@nextui-org/kbd";
// import { Link } from "@nextui-org/link";
// import { Logo } from "@/components/icons";
// import { NavLink } from "./ActiveLink";
// import NextLink from "next/link";
// import { ThemeSwitch } from "@/components/theme-switch";
// import clsx from "clsx";
// import { link as linkStyles } from "@nextui-org/theme";
// import { siteConfig } from "@/config/site";

// export const AppNavbar = () => {
// 	return (
// 		<Navbar maxWidth="2xl" className="bg-primary/80">
// 			<NavbarBrand>
// 				<Link href="/">
// 					<Image
// 						src="https://smallworldventure.com/images/home/sw-white.png"
// 						alt="SmallWorldVenture"
// 						className="h-[75px]"
// 					/>
// 				</Link>
// 			</NavbarBrand>
// 			<NavbarContent className="hidden sm:flex gap-4" justify="end">
// 				<ul className="hidden lg:flex gap-4 justify-start ml-2">
// 					{siteConfig.navItems.map((item) => (
// 						<NavLink
// 							href={item.href}
// 							key={item.href}
// 							className="text-white font-semibold"
// 						>
// 							<NavbarItem>
// 								<div className="flex flex-col items-center">
// 									<div className=" text-lg">{item.label}</div>
// 								</div>
// 							</NavbarItem>
// 						</NavLink>
// 					))}
// 				</ul>
// 			</NavbarContent>
// 		</Navbar>
// 	);
// };

"use client";

import {
	Button,
	Image,
	Link,
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	NavbarMenu,
	NavbarMenuItem,
	NavbarMenuToggle,
} from "@nextui-org/react";

import { NavLink } from "./ActiveLink";
import type { NavbarProps } from "@nextui-org/react";
import React from "react";
import { cn } from "./cn";
import { siteConfig } from "@/config/site";

const menuItems = [
	"About",
	"Blog",
	"Customers",
	"Pricing",
	"Enterprise",
	"Changelog",
	"Documentation",
	"Contact Us",
];

export default function AppNavbar(props: NavbarProps) {
	const [isMenuOpen, setIsMenuOpen] = React.useState(false);

	return (
		<>
			<Navbar
				{...props}
				isBordered
				classNames={{
					base: cn("border-default-100 px-2", {
						"bg-default-200/50 dark:bg-default-100/50": isMenuOpen,
					}),
					wrapper: "w-full justify-center px-0",
					item: "hidden md:flex w-full justify-center",
				}}
				height="60px"
				isMenuOpen={isMenuOpen}
				onMenuOpenChange={setIsMenuOpen}
				maxWidth="2xl"
			>
				<div className="md:hidden flex justify-center items-center w-full">
					<div className="rounded-full text-background">
						<Link href="/">
							<Image
								radius="none"
								src="/images/home/smallworld.png"
								alt="SmallWorldVenture"
								className="h-[40px]  "
							/>
						</Link>
					</div>
				</div>

				<NavbarBrand>
					<div className="rounded-full text-background">
						<Link href="/">
							<Image
								radius="none"
								src="/images/home/smallworld.png"
								alt="SmallWorldVenture"
								className="h-[40px]  "
							/>
						</Link>
					</div>
				</NavbarBrand>
				<NavbarContent
					className="hidden h-11 gap-4 rounded-full border-large border-default-200/20 bg-background/60 px-4 backdrop-blur-md backdrop-saturate-150 md:flex dark:bg-default-100/50"
					justify="center"
				>
					{siteConfig.navItems.map((item) => (
						<NavLink href={item.href} key={item.href}>
							<NavbarItem>
								<div className="flex flex-col items-center">
									<div>{item.label}</div>
								</div>
							</NavbarItem>
						</NavLink>
					))}
				</NavbarContent>
				<NavbarContent justify="end">
					<NavbarItem className="ml-2 !flex gap-2">
						<a
							href="https://member.smallworldventure.com/"
							target="_blank"
							rel="noopener noreferrer"
						>
							<Button
								className="hidden border-small border-secondary-500/20 bg-secondary-500/10 text-secondary-800 sm:flex"
								color="secondary"
								radius="full"
								style={{
									boxShadow: "inset 0 0 4px #bf97ff70",
								}}
								variant="flat"
							>
								Join Our Membership
							</Button>
						</a>
					</NavbarItem>
				</NavbarContent>
			</Navbar>
			<div className="md:hidden block fixed p-4 w-[100%] bottom-0  left-0  z-50 bg-default-100/80 backdrop-blur-md">
				<div className="flex gap-8 justify-center items-center">
					{siteConfig.navItems.map((item, index) => (
						<div key={`${item.label}-${index}`}>
							<NavLink href={item.href}>
								<div className="flex flex-col items-center">
									<div>{item.label}</div>
								</div>
							</NavLink>
						</div>
					))}
				</div>

				{/* {menuItems.map((item, index) => (
			<NavbarMenuItem key={`${item}-${index}`}>
				<Link className="w-full text-default-500" href="#" size="md">
					{item}
				</Link>
			</NavbarMenuItem>
		))} */}
			</div>
		</>
	);
}
