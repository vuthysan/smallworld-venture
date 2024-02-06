export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	name: "SmallWorld Venture",
	description:
		"Founded in 2011 as SmallWorld Cambodia, we created a shared professional workspace where progressive young business minds could explore and pursue their aspirations while transforming ideas into reality.",
	navItems: [
		{
			label: "About",
			href: "/about",
		},
		{
			label: "Works",
			href: "/works",
		},
		{
			label: "News",
			href: "/news",
		},
		{
			label: "Contact",
			href: "/contact",
		},
	],
	links: {
		github: "https://github.com/nextui-org/nextui",
		twitter: "https://twitter.com/getnextui",
		docs: "https://nextui.org",
		discord: "https://discord.gg/9b6yyZKmH4",
		sponsor: "https://patreon.com/jrgarciadev",
	},
};
