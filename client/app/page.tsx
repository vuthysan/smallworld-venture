import { Button, Image } from "@nextui-org/react";

import ValueCard from "@/components/ValueCard";

const data = [
	{
		id: 1,
		title: "Startup Comunity",
		desc: "SmallWorld Ventures is committed to becoming the number one catalyst for funding and assisting startups in Cambodia.",
		image: "/images/home/start-up.png",
	},
	{
		id: 2,
		title: "Seed Equity Investments",
		desc: "Seed Equity Investments are provided to promising startup teams with projects ranging between 5,000 to 25,000 USD.",
		image: "/images/home/venture-building.png",
	},
	{
		id: 3,
		title: "Venture Building",
		desc: "Smallworld Ventures has built an internal team of technicians engaged in research and development projects with an aim to spin off new ventures.		",
		image: "/images/home/investment.png",
	},
	{
		id: 4,
		title: "Ecovillage Development",
		desc: "At our rural ecovillage project, we're building a hands-on learning, working, and living environment with a balance among the natural world, education, economics, and sustainable living practices.		",
		image: "/images/home/reforest.png",
	},
];

export default function Home() {
	return (
		<section className="relative overflow-hidden">
			<div className=" bg-[url('/images/home/home-banner.png')] w-screen bg-no-repeat h-screen  bg-bottom">
				{/* <Image
					alt="SmallWorldVenture"
					height={0}
					width={0}
					sizes="100vw"
					style={{ height: "100vh", width: "100vw", objectFit: "cover" }}
					src="/images/home/home-banner.png"
				/> */}
				<div className="relative container mx-auto">
					<div className="grid grid-cols-2 h-[80vh] items-center">
						<div>
							<h2 className="text-5xl font-black mb-6 text-default-50">
								{"<"}Homegrown Startup Community{"/>"}
							</h2>
							<p className="text-xl text-default-50">
								We began in 2011 by providing a collaborative workspace
								environment for entrepreneurs, and then quickly moved forward
								raising investment capital to fund new startup projects.
							</p>
							<p className="text-xl text-default-50">
								With a variety of research and development projects in motion
								today, we are involved in startup venture building through
								community supported seed equity investments, together with rural
								ecovillage development and long-term land management.
							</p>

							<Button
								type="button"
								color="secondary"
								className="text-slate-900 font-bold w-[150px] mt-4"
								radius="full"
							>
								Learn More
							</Button>
						</div>
						<div></div>
					</div>
				</div>
			</div>
			<div className="container mx-auto py-12">
				<div className="mb-10">
					<h2 className="text-center font-black opacity-80 text-4xl mb-4">
						Our Core Values
					</h2>
					<p className="w-2/4 mx-auto text-center text-lg opacity-70">
						Founded in 2011 as SmallWorld Cambodia, we created a shared
						professional workspace where progressive young business minds could
						explore and pursue their aspirations while transforming ideas into
						reality.
					</p>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-4 gap-4 container mx-auto">
					{data.map((d) => {
						return (
							<ValueCard
								key={d.id}
								title={d.title}
								desc={d.desc}
								image={d.image}
							/>
						);
					})}
				</div>
			</div>
		</section>
	);
}
