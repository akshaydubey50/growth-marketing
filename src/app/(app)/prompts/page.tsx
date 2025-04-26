import PromptLibrary from "@/components/prompt/prompt-library";
import Canonical from "@/components/seo/Canonical";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Growth Marketing ToolsPrompts Library",
  description:
    "Explore our collection of Growth Marketing Toolsprompts to boost your creativity and productivity.",
};

export default function Prompt() {
  const itemsPerPageCount = 12;
  return (
    <>

  <Canonical/>
      <main className=" bg-light-gray ">
        <section className="flex flex-col py-12 
      px-4 space-y-10 place-items-center xl:space-y-14  max-w-screen-2xl mx-auto">
          <div>
            <div className="flex flex-col space-y-4 text-center">
              <p>
                <span
                  className="px-4 py-1 font-semibold bg-white border border-green-500 border-solid rounded-full text-DarkOrange">
                  +150 Growth Marketing ToolsPrompts
                </span>
              </p>
              <h1
                className="mx-auto text-2xl font-semibold leading-9 md:text-4xl md:leading-45 md:max-w-2xl xl:text-7xl xl:max-w-4xl xl:leading-tight">
                <span> Every prompt you need </span>
                <span>to unlock endless ideas.</span>
              </h1>
              <div
                className="max-w-lg px-2 mx-auto text-base text-center md:text-base xl:text-2xl xl:max-w-4xl xl:leading-normal">
                Search, like, bookmark and filter curated content prompts that spark creativity, streamline your planning, and make ideation effortless.
              </div>
            </div>
          </div>

        </section>
      </main>
      <div className="px-4 mx-auto min-w-xs max-w-8xl">
        <PromptLibrary itemsCount={itemsPerPageCount} />
      </div>
    </>
  );
}
