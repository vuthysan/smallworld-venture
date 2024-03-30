import BlogCard, { BlogProps } from "@/components/BlogCard";
import { Button, Image } from "@nextui-org/react";
import { getFirstParagraph, getThumbnail } from "@/utils/editor-parse";

import Blogs from "@/components/BlogCard";
import Marquee from "react-fast-marquee";
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

export default async function Home() {
	const my_photos = Array.from({ length: 12 }, (_, index) => index);
	const my_photos_1 = Array.from({ length: 12 }, (_, index) => index);

	let blogsData = JSON.stringify({
		query: `{
              getBlogsByOrg(orgId: "65cb897ea99b50af22007c00"){
                id
                  slug
                  title
                  views
                  status
                  isPublic
                  createdAt
                  updatedAt
                  content
              }
            }`,
	});

	const revalidatedData: BlogProps = await fetch(
		"https://api.weteka.org/api/private",
		{
			method: "post",
			headers: {
				"Content-Type": "application/json",
			},
			body: blogsData,
		}
	)
		.then((response) => response.json())
		.then(({ data }) => {
			return data.getBlogsByOrg;
		});

	return (
		<section className="overflow-hidden relative">
			<div className="md:h-screen h-[100vh]">
				<div className="absolute top-0 left-0 bg-[url('/images/home/home-banner.png')] w-screen bg-no-repeat md:h-screen h-[95vh]  bg-bottom"></div>

				<div className="px-2 py-8 relative container mx-auto">
					<div className="grid md:grid-cols-2 grid-cols-1 h-[80vh] items-center">
						<div>
							<h2 className="md:text-5xl text-3xl font-black mb-6 text-default-50">
								Homegrown Startup Community
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
								variant="shadow"
							>
								Learn More
							</Button>
						</div>
						<div></div>
					</div>
				</div>
			</div>

			<div className="container mx-auto py-12 relative">
				<img
					src="/images/bg1.png"
					className="absolute overflow-hidden h-full w-full blur-3xl opacity-30"
					alt=""
				/>
				<div className="mb-10">
					<h2 className="text-center font-black opacity-80 md:text-4xl text-2xl mb-4">
						SmallWorld Venture
					</h2>
					<p className="md:w-1/2 w-full opacity-75 mx-auto text-center md:text-xl mb-12 ">
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

			<section className=" bg-[#0072bc] py-10 mt-6">
				<div className="container mx-auto flex py-24 md:flex-row flex-col items-center">
					<div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
						<h1 className="sm:text-5xl text-3xl mb-4 font-extrabold text-default-50">
							Have some ideas for new venture?
						</h1>
						<div>
							<p className="leading-relaxed text-default-50 md:text-xl">
								We&apos;re looking for new approaches to problem solving and
								creating business.Do you have an innovative idea for a startup
								venture?
							</p>
							<p className="leading-relaxed text-default-50 md:text-xl">
								Or maybe you have a skillset in mind that you want to develop as
								you work within our existing SmallWorld venture.
							</p>
							<p className="leading-relaxed text-default-50 md:text-xl">
								We&apos;re open to discussing your own startup ideas, however
								unconventional, regardless of age, gender, or nationality.
							</p>
							<p className="leading-relaxed text-default-50 md:text-xl">
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
					<div className="md:block hidden lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
						<Image
							className="scale-110"
							radius="none"
							alt="hero"
							src="/images/idea-banner.png"
						/>
					</div>
				</div>
			</section>

			<section className="body-font  bg-gradient-to-r from-cyan-500 to-blue-500 h-screen relative">
				<div className="bg-default-50/80 backdrop-blur-md h-full w-full py-16">
					<div className="container mx-auto">
						<h2 className="text-center font-black opacity-80 md:text-5xl text-3xl  mb-4">
							Join, collaborate and connect
						</h2>
						<p className="text-center md:text-2xl text-xl md:w-2/3 w-full mx-auto mt-6 mb-10 opacity-75">
							Our ventures are working on exciting projects in various
							industries! Read our community news to stay updated on their
							initiatives and milestones!
						</p>
					</div>
					<Marquee>
						<div className="flex">
							{my_photos.map((_, index) => (
								<Image
									key={index} // Make sure to provide a unique key for each item in the loop
									src={`/images/photos/${index + 1}.jpg`}
									alt="smallworldventure"
									className="md:h-80 md:w-80 h-48 w-48 object-cover p-2"
								/>
							))}
						</div>
					</Marquee>

					<Marquee direction="right" speed={30} className="mt-1">
						<div className="flex">
							{my_photos_1.map((_, index) => (
								<Image
									key={index} // Make sure to provide a unique key for each item in the loop
									src={`/images/photos/${index + 13}.jpg`}
									alt="smallworldventure"
									className="md:h-64 md:w-64 h-36 w-36 object-cover p-2"
								/>
							))}
						</div>
					</Marquee>
				</div>
			</section>

			<section className="text-gray-600 body-font py-16">
				<div className="container px-5 mx-auto">
					<div className="text-center">
						<h2 className="md:text-4xl text-3xl font-black mb-4">
							START-UP NEWS
						</h2>
						<p className="md:w-1/2 w-full opacity-75 mx-auto text-center text-xl mb-12 ">
							Our ventures are working on exciting projects in various
							industries! Read our community news to stay updated on their
							initiatives and milestones!
						</p>
					</div>
					<div className="grid md:grid-cols-4 grid-cols-1 flex-wrap gap-4">
						{revalidatedData.map((res: BlogProps) => {
							const thumbnail = getThumbnail(JSON.parse(res.content));

							return (
								<>
									<BlogCard
										image={thumbnail ?? "/images/blog-1.jpg"}
										title={res.title}
										desc={getFirstParagraph(JSON.parse(res.content))}
										content={""}
									/>
								</>
							);
						})}
						{/* <Blogs /> */}
					</div>
				</div>
			</section>
		</section>
	);
}
