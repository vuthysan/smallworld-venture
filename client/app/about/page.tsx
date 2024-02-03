import { Image } from "@nextui-org/react";
import { title } from "@/components/primitives";

export default function AboutPage() {
	return (
		<div className="overflow-hidden relative">
			<section className="text-gray-600 body-font">
				<div className="container mx-auto flex justify-center flex-col items-center">
					<div>
						<Image
							radius="lg"
							className="h-[600px] w-screen object-cover mt-10"
							alt="hero"
							src="/images/DSC00527.JPG"
						/>
					</div>

					<div className="w-2/3 text-center bg-white/80 backdrop-blur-lg py-12 px-20  rounded-xl relative -mt-28 mb-10 shadow-md  z-10">
						<h2 className="font-bold text-4xl mb-3">
							Our <span className="font-black text-primary">Story</span>
						</h2>
						<p className="text-xl">
							SmallWorld started as a collaborative space designed to aid
							ambitious individuals in transforming ideas into profitable
							ventures.
						</p>
						<p className="text-xl">
							Today, our focus has shifted to venture-building and becoming a
							micro-VC for tech startups. We aim to leverage our expertise to
							support successful ventures and contribute positively to local,
							national, and global communities.
						</p>
						<p className="text-xl">
							Today, our focus has shifted to venture-building and becoming a
							micro-VC for tech startups. We aim to leverage our expertise to
							support successful ventures and contribute positively to local,
							national, and global communities.
						</p>
					</div>
				</div>
			</section>

			<div className="bg-[url('/images/mission-back.jpg')] h-screen w-screen ">
				<div className="bg-slate-950/60 backdrop-blur-lg text-white">
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

			<div className="container mx-auto py-20">
				{/* <h2 className="md:text-2xl font-bold mb-12 mt-8 ">
					We seek to recruit and partner with
				</h2>
				<div className="grid grid-cols-3 w-[80%] mx-auto gap-4">
					<div className="text-center bg-default/10 backdrop-blur-lg text-secondary border-2 border-secondary py-8 rounded-xl shadow-sm">
						<div>Visionary</div>
						<div className="font-bold text-2xl ">founders</div>
					</div>
					<div className="text-center bg-default/10 backdrop-blur-lg text-[#2CD3E1] border-2 border-[#2CD3E1] py-8 rounded-xl shadow-sm">
						<div>Underdog</div>
						<div className="font-bold text-2xl">innovators</div>
					</div>
					<div className="text-center bg-default/10 backdrop-blur-lg text-[#ED5AB3] border-2 border-[#ED5AB3] py-8 rounded-xl shadow-sm">
						<div>Unreasonable</div>
						<div className="font-bold text-2xl">dreamers</div>
					</div>
				</div> */}
				<h2 className="text-center font-bold text-5xl mb-3">
					Our <span className="font-black text-primary">Portfolios</span>
				</h2>
				<p className="w-[50%] mx-auto text-center text-lg mb-12">
					We began experimenting with equity investment partnerships in 2013,
					and since then we&apos;ve listed a few startup teams we&apos;re proud
					to be partnered with from their inception.
				</p>
				<div className="grid lg:grid-cols-4 grid-cols-2 flex-wrap gap-4">
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
								Photo booth fam kinfolk cold-pressed sriracha leggings jianbing
								microdosing tousled waistcoat.
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
								Photo booth fam kinfolk cold-pressed sriracha leggings jianbing
								microdosing tousled waistcoat.
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
								Photo booth fam kinfolk cold-pressed sriracha leggings jianbing
								microdosing tousled waistcoat.
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
								Photo booth fam kinfolk cold-pressed sriracha leggings jianbing
								microdosing tousled waistcoat.
							</p>
						</div>
					</div>
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
