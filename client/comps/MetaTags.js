import { NextSeo } from "next-seo";

const MetaTags = ({ title, description, canonical, thumbnail }) => (
  <NextSeo
    title={`${title} - SmallWorld Venture`}
    description={description}
    canonical={canonical}
    openGraph={{
      url: canonical,
      title: `${title} - SmallWorld Venture`,
      description: description,
      images: [{ url: thumbnail }],
      site_name: "smallworldventure",
    }}
    twitter={{
      handle: "@handle",
      site: "@site",
      cardType: "summary_large_image",
    }}
  />
);
export default MetaTags;
