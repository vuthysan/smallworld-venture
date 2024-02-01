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
import { Input } from "@nextui-org/input";
import { Kbd } from "@nextui-org/kbd";
import { Link } from "@nextui-org/link";
import { Logo } from "@/components/icons";
import NextLink from "next/link";
import { ThemeSwitch } from "@/components/theme-switch";
import clsx from "clsx";
import { link as linkStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";

export const AppNavbar = () => {
	return (
		<Navbar maxWidth="2xl">
			<NavbarBrand>
				<p className="font-bold text-inherit">ACME</p>
			</NavbarBrand>
			<NavbarContent className="hidden sm:flex gap-4" justify="end">
				<NavbarItem>
					<Link color="foreground" href="#">
						About
					</Link>
				</NavbarItem>
				<NavbarItem isActive>
					<Link href="#" aria-current="page">
						Works
					</Link>
				</NavbarItem>
				<NavbarItem>
					<Link color="foreground" href="#">
						News
					</Link>
				</NavbarItem>
				<NavbarItem>
					<Link color="foreground" href="#">
						Spaces
					</Link>
				</NavbarItem>
				<NavbarItem>
					<Link color="foreground" href="#">
						Contact
					</Link>
				</NavbarItem>
			</NavbarContent>
		</Navbar>
	);
};
