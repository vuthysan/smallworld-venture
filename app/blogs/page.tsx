import BlogCard, { BlogProps } from "@/components/BlogCard";
import { getFirstParagraph, getThumbnail } from "@/utils/editor-parse";

import { title } from "@/components/primitives";

export default async function BlogPage() {
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
		<div>
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
		</div>
	);
}
