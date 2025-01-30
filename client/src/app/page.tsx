import type { Block } from "@/types";
import { getLandingPage } from "@/lib/loaders";

import { Hero } from "@/components/hero";
import { SectionHeading } from "@/components/section-heading";
import ContentWithImage from "@/components/content-with-image";
import { Pricing } from "@/components/pricing";
import { CardCarousel } from "@/components/card-carousel";

function BlockRenderer(block: Block, index: number) {
  console.dir(block.__component, { depth: null });
  switch (block.__component) {
    case "layout.hero":
      return <Hero key={index} {...block} />;
    case "layout.card-grid":
      return <CardCarousel key={index} {...block} />;
    case "layout.section-heading":
      return <SectionHeading key={index} {...block} />;
    case "layout.content-with-image":
      return <ContentWithImage key={index} {...block} />;
    case "layout.price-grid":
      return <Pricing key={index} {...block} />;
    default:
      return null;
  }
}

export default async function Home() {
  const data = await getLandingPage();
  const blocks = data?.data?.blocks;
  if (!blocks) return null;
  return <div>{blocks ? blocks.map((block: any, index: number) => BlockRenderer(block, index)) : null}</div>;
}
