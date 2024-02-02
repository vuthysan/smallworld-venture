import { title } from "@/components/primitives";

export default function AboutPage() {
	return (
		<div className="overflow-hidden relative">
			<section className="text-gray-600 body-font">
				<div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
					<div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
						<h1 className="title-font sm:text-4xl text-3xl mb-4 font-extrabold text-gray-900">
							Our Story
						</h1>
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
					<div className="lg:max-w-xl lg:w-full md:w-1/2 w-5/6">
						<img
							className="object-cover object-center rounded"
							alt="hero"
							src="https://dummyimage.com/720x600"
						/>
					</div>
				</div>
			</section>

			<div className="bg-[url('/images/mission-back.jpg')] h-screen w-screen ">
				<div className="bg-slate-950/80 backdrop-blur-md text-white">
					<section className="container mx-auto">
						<div className="h-screen flex justify-center items-center flex-col">
							<h2 className="md:text-2xl font-bold">Mission</h2>
							<p className="md:text-6xl text-xl md:w-[75%] text-center font-black my-8">
								Build better startup community through a thesis-driven approach
								to venture building and micro-investments, while crafting a new
								startup narrative.
							</p>

							<h2 className="md:text-2xl font-bold mb-12 mt-8 ">
								We seek to recruit and partner with
							</h2>
							<div className="grid grid-cols-3 w-[80%] mx-auto gap-4">
								<div className="text-center bg-default/10 backdrop-blur-lg text-secondary border-2 border-secondary py-8 rounded-xl shadow-sm">
									<div>Visionary</div>
									<div className="font-bold text-2xl ">founders</div>
								</div>
								<div className="text-center bg-default/10 backdrop-blur-lg text-[#3559E0] border-2 border-[#3559E0] py-8 rounded-xl shadow-sm">
									<div>Underdog</div>
									<div className="font-bold text-2xl">innovators</div>
								</div>
								<div className="text-center bg-default/10 backdrop-blur-lg text-[#ED5AB3] border-2 border-[#ED5AB3] py-8 rounded-xl shadow-sm">
									<div>Unreasonable</div>
									<div className="font-bold text-2xl">dreamers</div>
								</div>
							</div>
						</div>
					</section>
				</div>
			</div>
		</div>
	);
}
