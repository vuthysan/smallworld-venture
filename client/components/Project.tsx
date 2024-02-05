import { Image } from "@nextui-org/react";
import React from "react";

export default function Project({
	title,
	description,
	image,
}: {
	title: string;
	description: string;
	image: string;
}) {
	return (
		<div className="grid grid-cols-2 h-full shadow-sm border-gray-200 bg-default-50 border-opacity-60 rounded-lg overflow-hidden">
			<Image
				className="h-full object-cover object-center"
				src={image}
				alt={title}
				radius="none"
			/>
			<div className="p-6 ">
				<h1 className="text-2xl font-extrabold text-gray-900 mb-3">{title}</h1>
				<p className="leading-relaxed mb-3">{description}</p>
			</div>
		</div>
	);
}
