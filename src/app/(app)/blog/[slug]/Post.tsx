'use client';

import React, { useEffect, useState, useRef } from 'react';
import { SanityDocument } from "@sanity/client";
import { PortableText, PortableTextReactComponents } from "@portabletext/react";
import { client } from "@/sanity/lib/client";
import imageUrlBuilder from "@sanity/image-url";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import speakingurl from 'speakingurl';
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Facebook, Linkedin, Mail, Table, Twitter } from 'lucide-react';
import { Button } from "@/components/ui/button";
import urlBuilder from '@sanity/image-url';

import { getImageDimensions } from "@sanity/asset-utils";
import Link from 'next/link';
import NewsLetter from '@/components/newsletter';
import { useParams, usePathname } from 'next/navigation';
import { SanityConf } from '@/conf/conf';

const builder = imageUrlBuilder(client);
interface PostProps {
  post: SanityDocument;
}
const imageBuilder = urlBuilder({
  projectId: SanityConf.PROJECT_ID, 
  dataset: SanityConf.DATASET,
});

export const urlFor = (source:any) => imageBuilder.image(source);


const slugify = (text: string) => speakingurl(text.toLowerCase(), { symbols: true, maintainCase: true });
// PortableText custom components
const RichTextComponents: Partial<PortableTextReactComponents> = {
  list: ({ children, type }: any) => {
    const style = type === 'bullet' ? 'list-disc' : 'list-decimal';
    return <ul className={`ml-8 my-4 ${style}`}>{children}</ul>;
  },
  listItem: ({ children }: any) => <li className="mb-2">{children}</li>,
  hardBreak: () => <br />,
  unknownMark: ({ children }: any) => <span>{children}</span>,
  types: {
    image: ({ value, isInline }) => {
      console.log("img",{value});
      if(!value?.asset) return null;
      return (
        <div className={`my-4 pr-8 py-4 ${isInline ? 'inline-block' : 'block'} w-fit h-fit`}>
          <Image
            src={urlFor(value)?.url()}
            alt={value.alt || 'Image'}
            width={1366}
            height={768}
            className="rounded-xl shadow-lg"
            loading="lazy"
          />
        </div>
      );
    },
  },

  block: {
    h2: ({ value }: any) => (
      <h2 id={slugify(value.children[0].text)} className="text-3xl font-medium my-4 text-gray-900">{value.children[0].text}</h2>
    ),
    h3: ({ value }: any) => (
      <h3 id={slugify(value.children[0].text)} className="text-2xl font-medium my-4 text-gray-900">{value.children[0].text}</h3>
    ),
    h4: ({ value }: any) => (
      <h4 className="text-xl font-medium my-4 text-gray-900">{value.children[0].text}</h4>
    ),
    h5: ({ value }: any) => (
      <h5 className="text-lg font-medium my-4 text-gray-900">{value.children[0].text}</h5>
    ),
    h6: ({ value }: any) => (
      <h6 className="text-md font-medium my-4 text-gray-900">{value.children[0].text}</h6>
    ),
    blockquote: ({ value }: any) => (
      <blockquote className="border-l-4 pl-4 my-4 italic text-gray-700 border-gray-300">
        {value.children[0].text}
      </blockquote>
    ),
    ul: ({ value }: any) => ( 
      <ul className="list-disc ml-8 my-4">{value.children[0].text}</ul>
    ),
    ol: ({ value }: any) => (
      <ol className="list-decimal ml-8 my-4">{value.children[0].text}</ol>
    ),
    li: ({ value }: any) => (
      <li className="mb-2">{value.children[0].text}</li>
    ),
    normal: ({ children }: any) => (
      <p className="text-md my-2 text-gray-700 text-xl">{children}</p>
    ),
   
  },
  marks: {
    link: ({ children, value }: { children: React.ReactNode; value?: any; }) => {
      // const rel = !value.href?.startsWith("/") ? "noopener noreferrer" : undefined;
      return (
        <Link
          href={value.href || ""}
          // rel={rel}
          className="text-blue-500 underline hover:text-blue-700"
        >
          {children}
        </Link>
      );
    },
  },
  
};


const Post: React.FC<PostProps> = ({ post }) => {
  const [pathName, setPathName] = useState('');
  const [activeHeading, setActiveHeading] = useState('');

  useEffect(() => {
    const handleHashChange = () => {
      setPathName(window.location.hash);
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHeading(entry.target.id);
          }
        });
      },
      { rootMargin: '0px 0px -50% 0px' }
    );

    const elements = document.querySelectorAll('h2, h3');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const formattedDate = new Date(post._createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });


  // return (  
  //   <article className="min-h-screen bg-background">
  //     {/* Hero Section */}
  //     <div className="w-full bg-[#E3F9BB] py-16">
  //       <div className="container mx-auto px-4  w-fit  max-w-2xl">
  //         <div className="flex flex-col gap-6 max-w-4xl container  justify-start ">
  //           {/* Category & Badge */}
  //           <div className="flex items-center gap-4 ">
  //             <p className="text-sm text-muted-foreground">
  //               {post.category || 'Marketing / Content'}
  //             </p>
  //             {post.isExpertReviewed && (
  //               <Badge variant="secondary" className="bg-background">
  //                 Expert reviewed
  //               </Badge>
  //             )}
  //           </div>

  //           {/* Title */}
  //           <h1 className="text-4xl md:text-5xl font-bold tracking-tight ">
  //             {post.title}
  //           </h1>

  //           {/* Metadata */}
  //           <div className="flex items-center gap-4 text-sm text-muted-foreground ">
  //             <span>{post.author || 'Anonymous'}</span>
  //             {/* <span>{formattedDate}</span> */}
  //             {/* <span>{readingTime} min read</span> */}
  //           </div>
  //         </div>
  //       </div>
  //     </div>

  //     {/* Main Content */}
  //     <div className="container mx-auto px-4 py-12">
  //       <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
  //         {/* Sidebar */}
  //         <aside className="md:col-span-3">
  //           <div className="sticky top-4">

  //             {/* Table of Contents */}
  //             <nav>
  //               <p className="font-medium mb-4">TABLE OF CONTENTS</p>
  //               <ul className="space-y-2 text-sm text-muted-foreground overflow-y-auto">
  //                 {post.headings?.filter((item: any) => item.style === 'h2' || item.style === 'h3').map((item: any, i: number) => {
  //                   const headingLevel = item.style; // e.g., 'h2', 'h3', etc.
  //                   const indentClass =
  //                     headingLevel === 'h3'
  //                       ? 'ml-4'
  //                       : ''; // Add more cases if needed.

  //                   return (
  //                     <li key={i} className={indentClass}>
  //                       <a
  //                         href={`#${slugify(item?.children[0].text)}`}
  //                         className={`hover:text-foreground hover:underline ${activeHeading === slugify(item?.children[0].text)
  //                           ? 'text-foreground text-black underline'
  //                           : 'text-slate-400'
  //                           }`}
  //                       >
  //                         {item?.children[0].text}
  //                       </a>
  //                     </li>
  //                   );
  //                 })}
  //               </ul>
  //             </nav>

  //           </div>
  //         </aside>

  //         {/* Main Content */}
  //         <main className="md:col-span-9">
  //           {post?.mainImage && (
  //             <div className="mb-8">
  //               <Image
  //                 src={builder.image(post.mainImage).url()}
  //                 alt={post?.mainImage?.alt || ''}
  //                 width={800}
  //                 height={400}
  //                 className="rounded-lg"
  //               />
  //             </div>
  //           )}

  //           <div className="prose prose-lg max-w-none">
  //             <p className="lead">{post.description}</p>
  //             {post?.body && <PortableText value={post.body} components={RichTextComponents} />}
  //           </div>
  //         </main>
  //       </div>
  //     </div>
  //   </article>
  // );

  return   ( 
  <article className="min-h-screen ">
    {/* Hero Section */}
    <div className="w-full  py-16 max-w-7xl" >
      <div className=" mx-auto px-4 h-fit">
        <div className="flex flex-col md:flex-row gap-8 items-start justify-space-between">
          <div className="flex flex-col gap-6 max-w-2xl">
            {/* Category & Badge */}
            {/* <div className="flex items-center gap-4">
              <p className="text-sm text-muted-foreground">
                {post.category || 'Marketing / Content'}
              </p>
              {post.isExpertReviewed && (
                <Badge variant="secondary" className="bg-background">
                  Expert reviewed
                </Badge>
              )}
            </div> */}

            {/* Title */}
            <h1 className="text-xl md:text-5xl text-gray-800">
              {post.title}
            </h1>

            {/* Metadata */}
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>{post.author || 'Anonymous'}</span>
              {/* <span>{formattedDate}</span> */}
              {/* <span>{readingTime} min read</span> */}
            </div>
          </div>

          {/* Hero Image */}
          {/* {post?.heroImage && (
            <div className="flex-shrink-0 w-full md:w-1/3">
              <Image
                src={builder.image(post.heroImage).url()}
                alt={post?.heroImage?.alt || ''}
                width={400}
                height={300}
                className="rounded-lg object-cover w-full h-full"
              />
            </div>
          )} */}
           {post?.mainImage && (
            <div className="">
              <Image
                src={builder.image(post.mainImage).url()}
                alt={post?.mainImage?.alt || ''}
                width={1366}
                height={768}
                // height={"400px"}
                className="rounded-lg w-full h-full"
              />
            </div>
          )}
        </div>

      </div>
    </div>

    {/* Main Content */}
    <div className="container mx-auto px-4 py-12">
      <div className="flex w-full flex-col-reverse md:flex-row gap-8 md:justify-between">
        {/* Main Content */}
        <main className="w-full md:w-4/5 pr-16">
          {/* {post?.mainImage && (
            <div className="mb-8">dadsadsd
              <Image
                src={builder.image(post.mainImage).url()}
                alt={post?.mainImage?.alt || ''}
                width={800}
                height={400}
                className="rounded-lg"
              />
            </div>
          )} */}

          <div className="prose prose-lg max-w-none pr-10">
            <p className="lead">{post.description}</p>
            {post?.body && <PortableText value={post.body} components={RichTextComponents} />}
          </div>
        </main>

        {/* Sidebar (Table of Contents) */}
        <aside className="w-full md:w-1/5 ">
          <div className="sticky top-4">
            {/* Table of Contents */}
            <nav className="bg-gray-50 p-8 rounded-lg">
              <p className="font-medium mb-4">TABLE OF CONTENTS</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {post.headings?.filter((item: any) => item.style === 'h2' || item.style === 'h3').map((item: any, i: number) => {
                  const headingLevel = item.style;
                  const indentClass = headingLevel === 'h3' ? 'ml-4' : '';

                  return (
                    <li key={i} className={indentClass}>
                      <a
                        href={`#${slugify(item?.children[0].text)}`}
                        className={`hover:text-foreground hover:underline ${
                          activeHeading === slugify(item?.children[0].text)
                            ? 'text-foreground font-medium underline'
                            : 'text-slate-600'
                        }`}
                      >
                        {item?.children[0].text}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </aside>
      </div>
    </div>
  </article>);
};

export default Post;
