import { Image } from "@nextui-org/react";
import React from "react";

type Props = {
	title: string;
	image: string;
	desc: string;
};

export default function ValueCard(props: Props) {
	return (
		<div className="top-0 relative hover:-top-1 cursor-pointer transition-all bg-background col-span-1 shadow-sm p-3 rounded-xl flex justify-center flex-col items-center">
			<Image
				src={props.image}
				alt="SmallWorldVenture"
				className="w-[70%] mx-auto mb-4"
			/>
			<h3 className="text-xl font-bold my-2">{props.title}</h3>
			<p className="opacity-70 text-center">{props.desc}</p>
		</div>
	);
}
