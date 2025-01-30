import sdk from "@/lib/sdk";
const PAGE_SIZE = 3;

export async function getLandingPage() {
  const landingPage = await sdk.single("landing-page").find({
    populate: {
      blocks: {
        on: {
          "layout.hero": {
            populate: {
              image: {
                fields: ["url", "alternativeText", "name"],
              },
              buttonLink: {
                populate: "*",
              },
              topLink: {
                populate: "*",
              },
            },
          },
          "layout.card-grid": {
            populate: "*",
          },
          "layout.section-heading": {
            populate: "*",
          },
          "layout.content-with-image": {
            populate: {
              image: {
                fields: ["url", "alternativeText", "name"],
              },
            },
          },
          "layout.price-grid": {
            populate: {
              priceCard: {
                populate: "*",
              },
            },
          },
        },
      },
    },
  });
  return landingPage;
}

export async function getAllPages() {
  const pages = await sdk.collection("pages").find();
  return pages;
}

export async function getAllPagesSlugs() {
  const pages = await sdk.collection("pages").find({
    fields: ["slug"],
  });
  return pages;
}

export async function getPageBySlug(slug: string) {
  const page = await sdk.collection("pages").find({
    populate: {
      blocks: {
        on: {
          "layout.hero": {
            populate: {
              image: {
                fields: ["url", "alternativeText", "name"],
              },
              buttonLink: {
                populate: "*",
              },
              topLink: {
                populate: "*",
              },
            },
          },
          "layout.card-grid": {
            populate: "*",
          },
          "layout.section-heading": {
            populate: "*",
          },
          "layout.content-with-image": {
            populate: {
              image: {
                fields: ["url", "alternativeText", "name"],
              },
            },
          },
        },
      },
    },
    filters: {
      slug: slug,
    },
  });
  return page;
}

export async function getBlogPostBySlug(slug: string) {
  const post = await sdk.collection("posts").find({
    populate: {
      image: {
        fields: ["url", "alternativeText", "name"],
      },
      category: {
        fields: ["text"],
      },
    },
    filters: {
      slug: { $eq: slug },
    },
  });
  return post;
}

// TODO: FIX THE SEARCH QUERY
export async function getBlogPosts(page: number, queryString: string, category: string) {
  const posts = await sdk.collection("posts").find({
    populate: {
      image: {
        fields: ["url", "alternativeText", "name"],
      },
      category: {
        fields: ["text"],
      },
    },
    filters: {
      category: category.length !== 0 ? { text: { $eq: category } } : {},
      ...(queryString.length !== 0 ? { title: { $containsi: queryString } } : {}),
      // $or: [
      //   { title: { $containsi: queryString } },
      //   { description: { $containsi: queryString } },
      //   { content: { $containsi: queryString } },
      // ],
    
    },

    pagination: {
      pageSize: PAGE_SIZE,
      page: page,
    },
  });
  return posts;
}
