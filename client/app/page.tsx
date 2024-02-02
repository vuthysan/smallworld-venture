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
					<p className="w-[55%] opacity-75 mx-auto text-center text-xl mb-12 ">
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

			<section className=" bg-[#0072bc]">
				<div className="container mx-auto flex py-24 md:flex-row flex-col items-center">
					<div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
						<h1 className="sm:text-5xl text-3xl mb-4 font-extrabold text-default-50">
							Have some ideas for new venture?
						</h1>
						<div>
							<p className="leading-relaxed text-default-50 text-xl">
								We&apos;re looking for new approaches to problem solving and
								creating business.Do you have an innovative idea for a startup
								venture?
							</p>
							<p className="leading-relaxed text-default-50 text-xl">
								Or maybe you have a skillset in mind that you want to develop as
								you work within our existing SmallWorld venture.
							</p>
							<p className="leading-relaxed text-default-50 text-xl">
								We&apos;re open to discussing your own startup ideas, however
								unconventional, regardless of age, gender, or nationality.
							</p>
							<p className="leading-relaxed text-default-50 text-xl">
								Send us a message!
							</p>
						</div>
						<div className="flex justify-center">
							<Button
								radius="full"
								variant="shadow"
								color="secondary"
								className="text-slate-900 font-bold w-[150px] mt-4"
							>
								Contact Us
							</Button>
						</div>
					</div>
					<div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
						<Image
							className="scale-150"
							radius="none"
							alt="hero"
							src="/images/idea-banner.png"
						/>
					</div>
				</div>
			</section>

			<section className="text-gray-600 body-font py-16">
				<div className="container px-5 mx-auto">
					<div className="text-center">
						<h2 className="text-4xl font-black mb-4">START-UP NEWS</h2>
						<p className="w-[55%] opacity-75 mx-auto text-center text-xl mb-12 ">
							Our ventures are working on exciting projects in various
							industries! Read our community news to stay updated on their
							initiatives and milestones!
						</p>
					</div>
					<div className="grid grid-cols-4 flex-wrap gap-4">
						<div className="h-full shadow-sm border-gray-200 bg-default-50 border-opacity-60 rounded-lg overflow-hidden">
							<Image
								className="lg:h-48 md:h-36 w-full object-cover object-center"
								src="https://dummyimage.com/720x400"
								alt="blog"
							/>
							<div className="p-6">
								<h2 className="tracking-widest text-xs font-medium text-gray-400 mb-1">
									CATEGORY
								</h2>
								<h1 className="text-lg font-medium text-gray-900 mb-3">
									The Catalyzer
								</h1>
								<p className="leading-relaxed mb-3">
									Photo booth fam kinfolk cold-pressed sriracha leggings
									jianbing microdosing tousled waistcoat.
								</p>
							</div>
						</div>

						<div className="h-full shadow-sm border-gray-200 bg-default-50 border-opacity-60 rounded-lg overflow-hidden">
							<Image
								className="lg:h-48 md:h-36 w-full object-cover object-center"
								src="https://dummyimage.com/720x400"
								alt="blog"
							/>
							<div className="p-6">
								<h2 className="tracking-widest text-xs font-medium text-gray-400 mb-1">
									CATEGORY
								</h2>
								<h1 className="text-lg font-medium text-gray-900 mb-3">
									The Catalyzer
								</h1>
								<p className="leading-relaxed mb-3">
									Photo booth fam kinfolk cold-pressed sriracha leggings
									jianbing microdosing tousled waistcoat.
								</p>
							</div>
						</div>

						<div className="h-full shadow-sm border-gray-200 bg-default-50 border-opacity-60 rounded-lg overflow-hidden">
							<Image
								className="lg:h-48 md:h-36 w-full object-cover object-center"
								src="https://dummyimage.com/720x400"
								alt="blog"
							/>
							<div className="p-6">
								<h2 className="tracking-widest text-xs font-medium text-gray-400 mb-1">
									CATEGORY
								</h2>
								<h1 className="text-lg font-medium text-gray-900 mb-3">
									The Catalyzer
								</h1>
								<p className="leading-relaxed mb-3">
									Photo booth fam kinfolk cold-pressed sriracha leggings
									jianbing microdosing tousled waistcoat.
								</p>
							</div>
						</div>

						<div className="h-full shadow-sm border-gray-200 bg-default-50 border-opacity-60 rounded-lg overflow-hidden">
							<Image
								className="lg:h-48 md:h-36 w-full object-cover object-center "
								src="https://dummyimage.com/720x400"
								alt="blog"
							/>
							<div className="p-6">
								<h2 className="tracking-widest text-xs font-medium text-gray-400 mb-1">
									CATEGORY
								</h2>
								<h1 className="text-lg font-medium text-gray-900 mb-3">
									The Catalyzer
								</h1>
								<p className="leading-relaxed mb-3">
									Photo booth fam kinfolk cold-pressed sriracha leggings
									jianbing microdosing tousled waistcoat.
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>
		</section>
	);
}
