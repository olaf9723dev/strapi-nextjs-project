import type { Block } from "@/types";

import { Hero } from "@/components/blocks/hero";
import { SectionHeading } from "@/components/blocks/section-heading";
import ContentWithImage from "@/components/blocks/content-with-image";
import { Pricing } from "@/components/blocks/pricing";
import { CardCarousel } from "@/components/blocks/card-carousel";

function blockRenderer(block: Block, index: number) {
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

export function BlockRenderer({ blocks }: { blocks: Block[] }) {
  return blocks.map((block, index) => blockRenderer(block, index));
}
