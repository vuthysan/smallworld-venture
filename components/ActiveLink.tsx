import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps {
	href: string;
	exact?: boolean;
	children: React.ReactNode;
	className?: string; // Add className to the interface
}

export const NavLink: React.FC<NavLinkProps> = ({
	href,
	exact,
	children,
	className,
	...props
}) => {
	const pathname = usePathname();
	const active = "block w-full font-bold";

	const isActive = exact
		? pathname === href.split("?q=")[0]
		: pathname.startsWith(href);

	if (isActive) {
		className = (className || "") + active;
	}

	return (
		<Link href={href} {...props} className={className}>
			{children}
		</Link>
	);
};
