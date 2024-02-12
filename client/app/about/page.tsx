/* eslint-disable @next/next/no-img-element */
import { Image } from "@nextui-org/react";
import Project from "@/components/Project";
import SportlightCard from "@/components/SportlightCard";
import { title } from "@/components/primitives";

export default function AboutPage() {
	return (
		<div className="overflow-hidden relative text-gray-600">
			<section className="body-font container mx-auto">
				<div className="py-20 grid grid-cols-2 overflow-hidden">
					<Image
						radius="md"
						alt="hero"
						className="w-full"
						src="/images/about.png"
					/>
					<div className="relative h-[100%]">
						<img
							src="/images/bg1.png"
							className="absolute top-0 left-0 w-full h-full object-cover blur-3xl"
							alt="smallworldventure"
						/>
						<div className="h-[100%] border-white border-2 relative bg-white/80 backdrop-blur-lg p-6 rounded-lg">
							<h2 className="font-black text-4xl mb-3">
								Start SMALL Dream BIG{" "}
							</h2>
							<p className="text-lg">
								SmallWorld started as a collaborative space designed to aid
								ambitious individuals in transforming ideas into profitable
								ventures.
							</p>
							<p className="text-lg">
								Today, our focus has shifted to venture-building and becoming a
								micro-VC for tech startups. We aim to leverage our expertise to
								support successful ventures and contribute positively to local,
								national, and global communities.
							</p>
							<p className="text-lg">
								Today, our focus has shifted to venture-building and becoming a
								micro-VC for tech startups. We aim to leverage our expertise to
								support successful ventures and contribute positively to local,
								national, and global communities.
							</p>

							<h2 className="text-lg font-bold mb-3">
								We seek to recruit and partner with
							</h2>
							<div className="flex gap-12 text-2xl">
								<div className="text-center">
									<div className="text-base">Visionary</div>
									<div className="font-black  text-secondary">Founders</div>
								</div>
								<div className="text-center">
									<div className="text-base">Underdog</div>
									<div className="font-black  text-[#2CD3E1]">Innovators</div>
								</div>
								<div className="text-center">
									<div className="text-base">Unreasonable</div>
									<div className="font-black  text-[#ED5AB3] ">Dreamers</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<div className="bg-[url('/images/mission-back.jpg')] h-screen w-screen ">
				<div className="bg-slate-950/80 backdrop-blur-xl text-white">
					<section className="container mx-auto">
						<div className="h-screen flex justify-center items-center flex-col">
							<h2 className="md:text-2xl font-bold">Mission</h2>
							<p className="md:text-6xl text-xl md:w-[75%] text-center font-black my-8">
								Build better startup community through a thesis-driven approach
								to venture building and micro-investments, while crafting a new
								startup narrative.
							</p>
						</div>
					</section>
				</div>
			</div>

			<div className="container mx-auto pt-10">
				<h2 className="text-center font-bold text-5xl mb-3">
					Our <span className="font-black text-primary">Portfolios</span>
				</h2>
				<p className="w-[50%] mx-auto text-center text-lg mb-12">
					We began experimenting with equity investment partnerships in 2013,
					and since then we&apos;ve listed a few startup teams we&apos;re proud
					to be partnered with from their inception.
				</p>
				<div className="grid grid-cols-2 flex-wrap gap-4">
					<Project
						link="https://koompi.com"
						title="KOOMPI"
						image="/images/KOOMPI.png"
						description="KOOMPI empowers the next generation of creators, innovators and thinkers to build better, through development of essential tools for learning."
					/>
					<Project
						link="https://koompi.com/koompi/onelab"
						title="Onelab"
						image="/images/onelb.png"
						description="Enhancing Educational Progress in Cambodia through Accessible Technology"
					/>
					<Project
						link="#"
						title="Content Server"
						image="/images/content-server.png"
						description="An Offline Learning Hub for students in remote areas with little to no internet access."
					/>
					<Project
						link="https://weteka.org/"
						title="Weteka"
						image="/images/weteka.png"
						description="Weteka is a digital school platform that enables schools to create their own digital schools. Students can access a wide range of high-quality courses through the platform."
					/>
					<Project
						link="https://riverbase.org/"
						title="Riverbase"
						image="/images/riverbase-org.png"
						description="E-commerce platforms for SMEs and developers."
					/>

					<Project
						link="#"
						title="Baray (InDev)"
						image="/images/baray.png"
						description="A  financial platform that streamlines online payment integration and management for developers and SMEs."
					/>

					<Project
						link="https://vitaminair.org/"
						title="VitaminAir"
						image="/images/Home-Vitaminair.png"
						description="VitaminAir flourishes as a community dedicated to driving positive change through social, cultural, ecological, and economic regeneration initiatives."
					/>

					<Project
						link="#"
						title="SmallWorld Realty"
						image="/images/smallworld-realty.jpg"
						description="With SWR's virtual office solution, SMEs and startups can benefit from a physical address without the associated costs and hassles."
					/>
				</div>
			</div>

			<div className="container mx-auto py-10">
				<h2 className="text-center font-bold text-5xl mb-3">
					<span className="font-black text-primary">Investments</span>
				</h2>
				<p className="w-[50%] mx-auto text-center text-lg mb-12">
					These team operate independently and have the freedom to pursue their
					own path. We consider ourselves fortunate to be a part of their
					journey from the very beginning.
				</p>
				<div className="grid grid-cols-2 flex-wrap gap-4">
					<Project
						link="https://www.seavphovjivet.com/"
						title="Seavphovjivet"
						image="/images/seavphovjivet.jpg"
						description="Nurture a reading nation, empowering one author at a time."
					/>
					<Project
						link="https://www.jabaram.com/"
						title="Jabaram"
						image="/images/jabaram.png"
						description="Shop from Amazon and e-commerce in the world in one place."
					/>
					<Project
						link="https://getgrood.com/"
						title="GROOD"
						image="/images/GROOD-GET-GROOD.png"
						description="Phnom Penh e-bike and upcycling bicycle"
					/>
					<Project
						link="https://bookmebus.com/"
						title="BookMeBus"
						image="/images/BookMeBus.png"
						description="Bus, boat and everything tickets booking app"
					/>
				</div>
			</div>

			<div className="container mx-auto">
				<h2 className="text-center font-bold text-5xl mb-3">
					Board of <span className="font-black text-primary">Directors</span>
				</h2>
				<p className="lg:w-[50%] w-screen mx-auto text-center text-lg mb-12">
					We are honored to have courageous and insightful business and
					community leaders to serve on our Board of Directors.
				</p>

				<div className="grid lg:grid-cols-5 grid-cols-2 flex-wrap gap-4 mb-20">
					<div className="bg-white p-4 rounded-2xl border-b-2 border-b-[#22A699]">
						<div className="h-full flex flex-col items-center text-center">
							<Image
								radius="full"
								alt="team"
								className="h-40 w-40 mb-4"
								src="/images/about/rithy-thul.webp"
							/>
							<div className="w-full">
								<h2 className="title-font font-bold text-lg text-[#22A699]">
									Mr. Rithy THUL
								</h2>
								<h3 className="text-gray-500 mb-3">
									Co-Founder & CEO of SmallWorld Venture
								</h3>
							</div>
						</div>
					</div>
					<div className="bg-white p-4 rounded-2xl border-b-2 border-b-[#1abc9c]">
						<div className="h-full flex flex-col items-center text-center">
							<Image
								radius="full"
								alt="team"
								className="h-40 w-40 mb-4"
								src="/images/about/mr-lin-willson.jpg"
							/>
							<div className="w-full">
								<h2 className="title-font font-bold text-lg text-[#1abc9c] ">
									Mr. Willson LIN
								</h2>
								<h3 className="text-gray-500 mb-3">
									Founder & CEO of DOERS Education Group
								</h3>
							</div>
						</div>
					</div>

					<div className="bg-white p-4 rounded-2xl border-b-2 border-b-[#E76161]">
						<div className="h-full flex flex-col items-center text-center">
							<Image
								radius="full"
								alt="team"
								className="h-40 w-40 mb-4"
								src="/images/about/Ratana.jpg"
							/>
							<div className="w-full">
								<h2 className="title-font font-bold text-lg text-[#E76161]">
									Ms. Ratana Phurik-Callebaut
								</h2>
								<h3 className="text-gray-500 mb-3">Independent Director</h3>
							</div>
						</div>
					</div>
					<div className="bg-white p-4 rounded-2xl border-b-2 border-b-[#C92C6D]">
						<div className="h-full flex flex-col items-center text-center">
							<Image
								radius="full"
								alt="team"
								className="h-40 w-40 mb-4"
								src="/images/about/mr-sila-chy.jpeg"
							/>
							<div className="w-full">
								<h2 className="title-font font-bold text-lg text-[#C92C6D]">
									Mr. Sila CHY
								</h2>
								<h3 className="text-gray-500 mb-3">
									CEO of Sabay Digital Corp
								</h3>
							</div>
						</div>
					</div>
					<div className="bg-white p-4 rounded-2xl border-b-2 border-b-[#2F58CD]">
						<div className="h-full flex flex-col items-center text-center">
							<Image
								radius="full"
								alt="team"
								className="h-40 w-40 mb-4"
								src="/images/about/mr-sen-kang.jpeg"
							/>
							<div className="w-full">
								<h2 className="title-font font-bold text-lg text-[#2F58CD]">
									Mr. Sen KANG
								</h2>
								<h3 className="text-gray-500 mb-3">
									Managing Director of Fuxin Steel Building
								</h3>
							</div>
						</div>
					</div>
				</div>

				<div className="container mx-auto">
					<h2 className="text-center font-bold text-5xl mb-3">
						Strategic <span className="font-black text-primary">Partners</span>
					</h2>
					<p className="w-[50%] mx-auto text-center text-lg mb-12">
						We are especially pleased to have built strategic partnerships with
						forward-thinking leaders in the business world.
					</p>

					<div className="flex max-w-4xl gap-x-20 gap-y-3 mx-auto items-center justify-between">
						<Image
							src="/images/about/Doer.png"
							alt="SmallWorld Venture Doers"
						/>
						<Image
							src="/images/about/sabay.png"
							alt="SmallWorld Venture Doers"
						/>
						<Image src="/images/about/ISI.png" alt="SmallWorld Venture Doers" />
					</div>
				</div>
			</div>
		</div>
	);
}
