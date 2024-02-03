import { Image } from "@nextui-org/react";

export default function DocsPage() {
	return (
		<div className="max-w-7xl mx-auto">
			<section className="text-gray-600 body-font py-10">
				<div className="flex gap-12">
					<div className="w-1/2 flex flex-col justify-center">
						<h1 className="font-extrabold text-3xl mb-4">STARTUP COMMUNITY</h1>
						<p className="text-xl">
							Since 2011, SmallWorld has remained focused on their vision of
							building a vibrant startup community in Phnom Penh through
							partnering with other area workspace groups to offer greater value
							and accessibility to early stage startup teams and entrepreneurs.
						</p>
					</div>
					<div className="md:w-1/2">
						<Image
							className="object-cover object-center rounded w-full"
							alt="hero"
							src="/images/home/startup-com.png"
						/>
					</div>
				</div>
			</section>

			<section className="text-gray-600 body-font py-10">
				<div className="flex gap-12">
					<div className="md:w-1/2">
						<Image
							className="object-cover object-center rounded w-full"
							alt="hero"
							src="/images/home/investment.png"
						/>
					</div>
					<div className="w-1/2 flex flex-col justify-center">
						<h1 className="font-extrabold text-3xl mb-4">
							SEED EQUITY INVESTMENTS{" "}
						</h1>
						<p className="text-xl">
							Seed Equity Investments are used to form equity investment
							partnerships that serve as the foundation for building a strong
							startup community.
						</p>
						<p className="text-xl">
							During our formative years we gained insightful experience by
							working with dozens of innovative startups and now provide Seed
							Equity Investments for five new startup teams each year.
						</p>
						<p className="text-xl">
							With a funding range between 5,000 to 25,000 USD per team, our
							Seed Equity Investments are not loans, but equity-based
							investments.
						</p>
						<p className="text-xl">
							Local co-investor equity participation is encouraged and generated
							through seminars and presentations within the greater Phnom Penh
							business.
						</p>
					</div>
				</div>
			</section>

			<section className="text-gray-600 body-font py-10">
				<div className="flex gap-12">
					<div className="w-1/2 flex flex-col justify-center">
						<h1 className="font-extrabold text-3xl mb-4">VENTURE BUILDING </h1>
						<p className="text-xl">
							Our branded KOOMPI system is one among several exciting ventures
							in our portfolio.
						</p>
						<p className="text-xl">
							We produced practical, affordable, and effective entry-level
							notebookS designed for future engineers, inventors, organizers,
							developers, and freethinkers.
						</p>
						<p className="text-xl">
							Powering the KOOMPI notebook is KOOMPI OS, our own version of the
							popular open-source Linux that has been tailored for the Cambodian
							marketplace.
						</p>

						<h1 className="font-extrabold text-3xl mb-4">
							{" "}
							RESEARCH AND DEVELOPMENT{" "}
						</h1>
						<p className="text-xl">
							The cornerstone of SmallWorld Ventures is to promote Venture
							Building with a key focus on Research and Development (R&D).
						</p>
						<p className="text-xl">
							We&aposre engaged in both hardware and software R&D projects
							related to decentralized peer-to-peer applications, tokenization,
							robotics, artificial intelligence, and automation.
						</p>
						<p className="text-xl">
							Beyond hardware and software, we are building an all-natural
							outdoor environment using industrial hemp and bamboo designs as
							the fundamental basis for production.
						</p>
					</div>
					<div className="md:w-1/2">
						<Image
							className="object-cover object-center rounded w-full"
							alt="hero"
							src="/images/home/venture-building.png"
						/>
					</div>
				</div>
			</section>

			<section className="text-gray-600 body-font py-10">
				<div className="flex gap-12">
					<div className="md:w-1/2">
						<Image
							className="object-cover object-center rounded w-full"
							alt="hero"
							src="/images/home/reforest.png"
						/>
					</div>
					<div className="w-1/2 flex flex-col justify-center">
						<h1 className="font-extrabold text-3xl mb-4">
							ENVIRONMENTAL STEWARDSHIP
						</h1>
						<p className="text-xl">
							Environmental stewardship means the responsible use and protection
							of our natural resources through conservation and sustainable
							practice.
						</p>
						<p className="text-xl">
							We strive to be knowledgeable of the natural world and to minimize
							negative impact on it.
						</p>
						<p className="text-xl">
							VitaminAir is our ecovillage project on 100+ hectares of rural
							land located 100 kilometres east of Phnom Penh beneath Phnom Pich
							Nil near the base of the Dâmrei Mountains.
						</p>
						<p className="text-xl">
							At our VitaminAir project and the surrounding protect sites, we
							directly engage in small-scale agriculture and reforestation,
							along with nature and wildlife preservation programs.
						</p>
						<p className="text-xl">
							In addition, we are creating hands-on learning, working, and
							living environment while balancing economic opportunity,
							environmental protection, and sustainable living practices.
						</p>
					</div>
				</div>
			</section>
		</div>
	);
}
