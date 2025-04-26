import { MetadataRoute } from "next";
import { APPConf } from "@/conf/conf";
import {
  AirtableModel,
  PropmtResourceModel,
  ResourceModel,
} from "@/models/airtable.model";
import { sanityFetch } from "@/sanity/lib/fetch";
import { postsQuery } from "@/sanity/lib/queries";
import { SanityDocument } from "next-sanity";

async function fetchTools() {
  try {
    // Fetch data from API
    const response = await fetch(`${APPConf.BASE_URL}/api/tools`);
    const { data } = await response.json();

    // Find the matching product
    return data.map((product: AirtableModel) => {
      return {
        name: product?.fields?.Name?.toLowerCase()?.trim()?.replace(/\s/g, "-"),
        // description: product?.fields?.Description?.toLowerCase(),
      };
    });
  } catch (error) {
    console.error("Error fetching tools:", error);
    return [];
  }
}

async function fetchPrompts() {
  try {
    // Fetch data from API
    const response = await fetch(`${APPConf.BASE_URL}/api/prompts`);
    const { data } = await response.json();

    // Find the matching product
    return data.map((prompt: PropmtResourceModel) => {
      return {
        name: prompt?.fields.Name?.toLowerCase()?.trim()?.replace(/\s/g, "-"),
      };
    });
  } catch (error) {
    console.error("Error fetching tools:", error);
    return [];
  }
}

async function fetchResources() {
  try {
    // Fetch data from API
    const response = await fetch(`${APPConf.BASE_URL}/api/resources`);
    const { data } = await response.json();

    // Find the matching product
    return data.map((product: ResourceModel) => {
      return {
        name: product?.fields?.Name?.toLowerCase()?.trim()?.replace(/\s/g, "-"),
        // description: product?.fields?.Description?.toLowerCase(),
      };
    });
  } catch (error) {
    console.error("Error fetching tools:", error);
    return [];
  }
}

async function fetchBlogs() {
  try {
    const posts = await sanityFetch<SanityDocument[]>({ query: postsQuery });
    return posts.map((post) => ({
      slug: post.slug.current,
      lastModified: post._updatedAt || post._createdAt || new Date(),
    }));
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
}

async function fetchExperts() {
  try {
    const response = await fetch(`${APPConf.BASE_URL}/api/experts`);
    const { data } = await response.json();

    return data.map((expert: any) => ({
      slug: expert?.fields?.["First Name"]?.toLowerCase()?.trim()?.replace(/\s/g, "-"),
      lastModified: expert?.fields?.LastModified || new Date(),
    }));
  } catch (error) {
    console.error("Error fetching experts:", error);
    return [];
  }
}



export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = APPConf.BASE_URL;

  const tools = (await fetchTools()) || [];
  // const resources = (await fetchResources()) || [];
  // const prompts = (await fetchPrompts()) || [];
  // const blogs = (await fetchBlogs()) || [];
  // const experts = (await fetchExperts()) || [];

  const staticRoutes = [
    "",
    "/about-us",
    "/contact",
    "/experts",
    "/prompts",
    "/resources",
    "/submit-a-tool",
    "/tools",
    "/blogs",
    "/projects",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));

  const dynamicRoutes = [
    ...tools?.map((tool: any) => ({
      url: `${baseUrl}/tools/${tool.name}`,
      lastModified: new Date(),
    })),
    // ...prompts.map((prompt: any) => ({
    //   url: `${baseUrl}/prompts/${prompt.name}`,
    //   lastModified: new Date(),
    // })),
    // ...resources.map((resource: any) => ({
    //   url: `${baseUrl}/resources/${resource.name}`,
    //   lastModified: new Date(),
    // })),
    // ...blogs.map((blog: any) => ({
    //   url: `${baseUrl}/blogs/${blog.slug}`,
    //   lastModified: blog.lastModified,
    // })),
    // ...experts.map((expert: any) => ({
    //   url: `${baseUrl}/experts/${expert.slug}`,
    //   lastModified: expert.lastModified,
    // })),
   
  ];

  return [...staticRoutes, ...dynamicRoutes];
}