
import { Metadata } from "next";
import { formatDate } from "@/lib/utils";
import { MarkdownText } from "@/components/markdown-text";
import { StrapiImage } from "@/components/strapi-image";
import { getBlogPostBySlug } from "@/lib/loaders";


interface PageProps {
  params: Promise<{ slug: string }>
}


export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolveParams = await params;
  const slug = await resolveParams?.slug;
  const data = await getBlogPostBySlug(slug);
  const { title, description } = data?.data[0];
  
  return {
    title: title,
    description: description,
  };
}
export default async function SinglePost({ params }: PageProps) {
  const resolveParams = await params;
  const slug = await resolveParams?.slug;
  const data = await getBlogPostBySlug(slug);
  const post = data?.data[0];
  if (!post) return null;

  return (
    <article>
      <div>
        <header className="container mx-auto my-10">
          <h1 className="text-6xl font-bold tracking-tighter sm:text-5xl mb-4">{post.title}</h1>
          <p className="text-muted-foreground">
            Posted on {formatDate(post.publishedAt)} - {post.category.text}
          </p>
          <StrapiImage
            src={post.image.url}
            alt={post.image.alternativeText}
            width={800}
            height={600}
            priority
            className="w-full rounded-lg mt-8"
          />
        </header>
      </div>

      <div className="container mx-auto max-w-4xl text-base leading-7">
        <MarkdownText content={post.content} />
      </div>
    </article>
  );
}
