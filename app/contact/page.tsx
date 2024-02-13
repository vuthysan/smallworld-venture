import React from "react";

export default function page() {
	return (
		<>
			<div className="bg-gradient-to-r from-indigo-500 from-10% via-30% to-emerald-500 to-90% md:min-h-[40vh] min-h-[20vh] flex justify-center items-center">
				<h2 className="md:text-5xl text-3xl font-black text-center text-white">
					Contact Us
				</h2>
			</div>
			<div className="container mx-auto">
				<div>
					<div className=" flex flex-col items-center gap-16 my-6">
						<div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
							<div className="flex flex-col items-center px-8 py-6 bg-white rounded-3xl shadow-sm">
								<span>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="38"
										height="38"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										// className="lucide lucide-mail"
									>
										<rect width="20" height="16" x="2" y="4" rx="2" />
										<path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
									</svg>
								</span>
								<div className="text-xl mt-3 font-bold text-grey-900">
									Email
								</div>
								<div className="text-base text-gray-500 mb-2">
									Contact us at
								</div>
								<a
									className="text-lg font-bold text-purple-blue-500"
									href="mailto: hello@loopple.com"
								>
									smallworldventure@gmail.com
								</a>
							</div>
							<div className="flex flex-col items-center px-8 py-10 bg-white rounded-3xl shadow-sm">
								<span>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="38"
										height="38"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
									>
										<path d="m22 2-7 20-4-9-9-4Z" />
										<path d="M22 2 11 13" />
									</svg>
								</span>
								<div className="text-xl mt-3 font-bold text-grey-900">
									Telegram
								</div>
								<div className="text-base text-gray-500 mb-2">Get in touch</div>
								<a
									className="text-lg font-bold text-purple-blue-500"
									href="mailto: hello@loopple.com"
								>
									xxxx
								</a>
							</div>
							<div className="flex flex-col items-center px-8 py-10 bg-white rounded-3xl shadow-sm">
								<span>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="38"
										height="38"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
									>
										<path d="M18 8c0 4.5-6 9-6 9s-6-4.5-6-9a6 6 0 0 1 12 0" />
										<circle cx="12" cy="8" r="2" />
										<path d="M8.835 14H5a1 1 0 0 0-.9.7l-2 6c-.1.1-.1.2-.1.3 0 .6.4 1 1 1h18c.6 0 1-.4 1-1 0-.1 0-.2-.1-.3l-2-6a1 1 0 0 0-.9-.7h-3.835" />
									</svg>
								</span>
								<div className="text-xl mt-3 font-bold text-grey-900">
									Location
								</div>
								<div className="text-base text-gray-500 mb-2">Find us</div>
								<div className="text-lg font-bold text-purple-blue-500 text-center">
									#92 E1K, St.19m Doun Penh, Phnom Penh, Cambodia
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<section className="container mx-auto relative mb-10">
				<div className="-auto flex sm:flex-nowrap flex-wrap">
					<div className=" w-full rounded-lg overflow-hidden h-[500px] relative">
						<iframe
							src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7817.436428190994!2d104.919107!3d11.572047!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3109513f9c42b99d%3A0x18ece5f26940089a!2sSmallworld%20Realty%20Co%20.%2C%20Ltd!5e0!3m2!1sen!2skh!4v1706950659147!5m2!1sen!2skh"
							loading="lazy"
							referrerPolicy="no-referrer-when-downgrade"
							className="w-full h-full"
						></iframe>
					</div>
				</div>
			</section>
		</>
	);
}
