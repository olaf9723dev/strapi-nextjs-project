import Link from "next/link";
import { StrapiImage } from "@/components/strapi-image";
import { Card, CardContent } from "@/components/ui/card";
import { Search } from "@/components/search";
import { PaginationComponent } from "@/components/pagination";
import { CategorySelect } from "@/components/category-select";
import { formatDate } from "@/lib/utils";
import { getBlogPosts } from "@/lib/loaders";

interface PageProps {
  searchParams: Promise<{ page?: string; query?: string; category?: string }>
}

/*
{
  id: 6,
  documentId: 'phsnnk9tf9s9r8lqfn2l1paf',
  title: 'Top 10 Headless CMS Platforms for 2024',
  description: 'An in-depth look at the top headless CMS platforms available in 2024, highlighting their features, benefits, and use cases.',
  slug: 'top-10-headless-cms-platforms-for-2024',
  content: 'As businesses continue to demand more flexibility and scalability from their CMS, headless CMS platforms have risen in popularity. Here are the top 10 headless CMS platforms for 2024:\n' +
    '\n' +
    '1. **Strapi**: An open-source headless CMS that is highly customizable and developer-friendly.\n' +
    '2. **Contentful**: Known for its robust API and flexibility, making it a top choice for enterprises.\n' +
    '3. **Sanity**: Offers real-time collaboration and a flexible content model.\n' +
    '4. **Ghost**: Ideal for publishers and content-driven websites.\n' +
    '5. **DatoCMS**: Provides a user-friendly interface and powerful API.\n' +
    '6. **ButterCMS**: Features a simple setup and easy-to-use dashboard.\n' +
    '7. **Prismic**: Offers a unique approach to content modeling and API.\n' +
    '8. **Kentico Kontent**: A cloud-based CMS with strong support for marketing and IT.\n' +
    '9. **Agility CMS**: Combines headless CMS features with a traditional CMS experience.\n' +
    '10. **GraphCMS**: Provides a GraphQL-based API for efficient content management.\n' +
    '\n' +
    '### Conclusion\n' +
    'Each of these platforms offers unique features and benefits, making them suitable for different use cases. By understanding your specific needs, you can choose the right headless CMS that will enhance your content management and delivery process.\n',
  createdAt: '2024-07-20T15:43:09.851Z',
  updatedAt: '2024-08-20T15:30:40.625Z',
  publishedAt: '2024-08-20T15:30:40.631Z',
  image: {
    id: 5,
    documentId: 'qjkxg3iq4ztgx6a5d5x4p3dv',
    url: '/uploads/pexels_cottonbro_4855369_3580aa2279.jpg',
    alternativeText: null,
    name: 'pexels-cottonbro-4855369.jpg'
  },
  category: { id: 2, documentId: 'ml0rzwifz6gej5kmpgh3no1b', text: 'tech' }
}
*/

interface PostProps {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  image: {
    id: number;
    documentId: string;
    url: string;
    alternativeText: null | string;
    name: string;
  };
  category: {
    id: number;
    documentId: string;
    text: string;
  };
}

export default async function BlogRoute({ searchParams }: PageProps) {
  const resolveParams = await searchParams;
  const currentPage = Number(resolveParams?.page) || 1;
  const query = resolveParams?.query ?? "";
  const category = resolveParams?.category ?? "";

  const { data, meta } = await getBlogPosts(currentPage, query, category);

  const total = Number(meta?.pagination?.pageCount);
  const posts = data as PostProps[];
  return (
    <section className="container flex flex-col items-center gap-6 py-24 sm:gap-7">
      <div className="flex flex-col gap-3">
        <span className="font-bold uppercase text-primary text-center">Articles</span>
        <h2 className="font-heading text-3xl font-semibold sm:text-4xl text-center">Our Blog</h2>
      </div>
      <p className="text-lg text-muted-foreground max-w-2xl text-center">
        Checkout some of our cool articles. We write about the latest trends in tech, design and much more.
      </p>
      <CategorySelect />
      <Search />
      <div className="mt-6 grid auto-rows-fr grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
        {posts &&
          posts.map((item: PostProps) => {
            console.log(item);
            return (
              <Link href={"/blog/" + item.slug} key={item.documentId}>
                <Card className="h-full shadow-lg border-none">
                  <CardContent className="flex h-full flex-col items-start gap-5 px-0">
                    <div className="relative h-52 w-full">
                      <StrapiImage
                        alt={item.image.alternativeText}
                        src={item.image.url}
                        fill
                        className="object-cover rounded-t-lg"
                      />
                    </div>
                    <div className="flex flex-1 flex-col gap-4 px-5">
                      <h4 className="text-lg font-semibold">{item.title}</h4>
                      <p className="mb-auto text-muted-foreground">{item.description}</p>
                      <div className="flex items-center gap-3">
                        <span className="rounded-full outline outline-1 outline-primary text-primary px-3 py-0.5 text-sm">
                          {item.category.text}
                        </span>
                        <span className="text-sm text-muted-foreground">{formatDate(item.publishedAt)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
      </div>
      <PaginationComponent pageCount={total} />
    </section>
  );
}
