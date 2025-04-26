import Resource from "@/components/resources";
import * as RoutePath from "@/constants/RoutePath";
import { useRouter } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Growth Marketing ToolsResources",
  description:
    "Explore the  best Growth Marketing Toolsresources - blogs,  courses, books, ebooks, and more to improve your skills and stay ahead of trends.",
};
import Canonical from "@/components/seo/Canonical";
export default function Resources() {

  return (
    <>
      <Canonical />
      <main className=" bg-light-gray ">
        <section className="flex flex-col py-12 
      px-4 space-y-10 place-items-center xl:space-y-14  max-w-screen-2xl mx-auto">
          <div>
            <div className="flex flex-col space-y-4 text-center">
              <p>
                <span
                  className="px-4 py-1 font-semibold bg-white border border-green-500 border-solid rounded-full text-DarkOrange">
                  50+ Growth Marketing ToolsResources
                </span>
              </p>
              <h1
                className="mx-auto text-2xl font-semibold leading-9 md:text-4xl md:leading-45 md:max-w-2xl xl:text-7xl xl:max-w-4xl xl:leading-tight">
                <span> The resources to master </span>
                <span>content creation</span>
              </h1>
              <div
                className="max-w-lg px-2 mx-auto text-base text-center md:text-base xl:text-2xl xl:max-w-4xl xl:leading-normal">
                Explore the  best Growth Marketing Toolsresources - blogs,  courses, books, ebooks, and more to improve your skills and stay ahead of trends.
              </div>
            </div>
          </div>

        </section>
      </main>
        <Resource />
    </>
  );
}
