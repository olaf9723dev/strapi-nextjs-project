import type { Block } from "@/types";

import { Hero } from "@/components/hero";
import { getAllPagesSlugs, getPageBySlug } from "@/lib/loaders";
import { CardGrid } from "@/components/card-grid";
import { SectionHeading } from "@/components/section-heading";
import ContentWithImage from "@/components/content-with-image";

export async function generateStaticParams() {
  const pages = await getAllPagesSlugs();
  return pages.data.map((page) => ({
    slug: page.slug,
  }));
}

function BlockRenderer(block: Block, index: number) {
  switch (block.__component) {
    case "layout.hero":
      return <Hero key={index} {...block} />;
    case "layout.card-grid":
      return <CardGrid key={index} {...block} />;
    case "layout.section-heading":
      return <SectionHeading key={index} {...block} />;
    case "layout.content-with-image":
      return <ContentWithImage key={index} {...block} />;
    default:
      return null;
  }
}

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function PageBySlugRoute({ params }: PageProps) {
  const resolveParams = await params;
  const slug = await resolveParams?.slug;
  const data = await getPageBySlug(slug);
  const blocks = data?.data[0]?.blocks;
  if (!blocks) return null;
  return <div>{blocks ? blocks.map((block: any, index: number) => BlockRenderer(block, index)) : null}</div>;
}
