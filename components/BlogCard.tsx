import { Image } from "@nextui-org/react";
import React from "react";

export type BlogProps = {
	[x: string]: any;
	image: string;
	title: string;
	desc: string;
	content: string;
};

export default function BlogCard(prop: BlogProps) {
	return (
		<>
			<div className="h-full shadow-sm border-gray-200 bg-default-50 border-opacity-60 rounded-lg overflow-hidden">
				<div className="p-2">
					<Image
						className="lg:h-48 md:h-36 w-screen object-cover object-center"
						src={prop.image}
						alt="blog"
					/>
				</div>
				<div className="p-6">
					<h1 className="text-lg font-medium text-gray-900 mb-3 line-clamp-2">
						{prop.title}
					</h1>
					<div
						dangerouslySetInnerHTML={{ __html: prop.desc }}
						className="line-clamp-2"
					></div>
				</div>
			</div>
		</>
	);
}
