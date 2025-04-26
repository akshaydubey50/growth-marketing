import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Script from "next/script";

import FAQJSON from "@/components/faq/faq.json";
import { FaLinkedin } from 'react-icons/fa6';

export default function FAQ() {
  const schemaString = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Growth Marketing Tools",
    description:
      "Directory of 200+ Growth Marketing Tools designed to streamline your process and enhance productivity.",
    url: "https://www.contentcreation.fyi/",
    mainEntity: FAQJSON.map((item) => ({
      "@type": "Question",
      name: item.title,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.categories
          ? `${item.content} ${item.categories.join(", ")}`
          : item.content,
      },
    })),
  });
  return (
    <>
      <Script id="webpage-faq-schema" type="application/ld+json">
        {schemaString}
      </Script>
      <section className=" max-w-screen-2xl rounded-xl px-4 md:px-8 lg:px-16  py-5 mx-auto  bg-white-200 my-10 ">
        <h2 className="text-center font-semibold text-2xl lg:text-4xl my-4">
          Frequently Ask Questions
        </h2>
        <RenderTwoColAccordion FAQJSON={FAQJSON} />
      </section>
    </>
  );
}

const RenderTwoColAccordion = ({ FAQJSON }:any)=>{
  const midpoint = Math.ceil(FAQJSON.length / 2);
  const leftColumn = FAQJSON.slice(0, midpoint);
  const rightColumn = FAQJSON.slice(midpoint);

const renderAccordion=(items:any)=>(
  <Accordion type="single" collapsible className="w-full  ">
    {items.map((item:any) => (
      <AccordionItem
        key={item.value}
        value={item.value}
        className="py-2 cursor-pointer  px-4 "
      >
        <AccordionTrigger className="hover:no-underline  text-base lg:text-lg font-medium text-left ">
          {item.title}
        </AccordionTrigger>
        {!item.categories && (
          <AccordionContent className="text-sm lg:text-base font-medium text-gray-600">
            {item.content}
          </AccordionContent>
        )}
        {item.categories && (
          <AccordionContent className="text-sm lg:text-base font-medium text-gray-600">
            {item.content}
            <ul className="list-disc pl-6">
              {item.categories.map((list:any, index:any) => (
                <li key={`${index}_${list}`}>{list}</li>
              ))}
            </ul>
          </AccordionContent>
        )}
      </AccordionItem>
    ))}
  </Accordion>
);
return (
  <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-16    ">
    <div>{renderAccordion(leftColumn)}</div>
    <div>{renderAccordion(rightColumn)}</div>
  </div>
)
}