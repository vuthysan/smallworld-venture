"use client";

import {
	DiscordIcon,
	GithubIcon,
	HeartFilledIcon,
	SearchIcon,
	TwitterIcon,
} from "@/components/icons";
import {
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	NavbarMenu,
	NavbarMenuItem,
	NavbarMenuToggle,
	Navbar as NextUINavbar,
} from "@nextui-org/navbar";

import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/react";
import { Input } from "@nextui-org/input";
import { Kbd } from "@nextui-org/kbd";
import { Link } from "@nextui-org/link";
import { Logo } from "@/components/icons";
import { NavLink } from "./ActiveLink";
import NextLink from "next/link";
import { ThemeSwitch } from "@/components/theme-switch";
import clsx from "clsx";
import { link as linkStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";

export const AppNavbar = () => {
	return (
		<Navbar maxWidth="2xl" className="bg-primary/80">
			<NavbarBrand>
				<Link href="/">
					<Image
						src="https://smallworldventure.com/images/home/sw-white.png"
						alt="SmallWorldVenture"
						className="h-[75px]"
					/>
				</Link>
			</NavbarBrand>
			<NavbarContent className="hidden sm:flex gap-4" justify="end">
				<ul className="hidden lg:flex gap-4 justify-start ml-2">
					{siteConfig.navItems.map((item) => (
						<NavLink
							href={item.href}
							key={item.href}
							className="text-white font-semibold"
						>
							<NavbarItem>
								<div className="flex flex-col items-center">
									<div className=" text-lg">{item.label}</div>
								</div>
							</NavbarItem>
						</NavLink>
					))}
				</ul>
			</NavbarContent>
		</Navbar>
	);
};
