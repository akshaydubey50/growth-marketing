import ProjectFilterSection from "@/components/projects/FilterSection";
import ProjectList from "@/components/projects/ProjectList";
import type { Metadata } from "next";
import { useSelector } from "react-redux";
import { RootState } from '../../../redux/store';
import ProjectCardShimmer from "@/components/projects/ProjectCardShimmer";
import ProjectScreen from "@/components/projects";

export const metadata: Metadata = {
    title: "Growth Marketing ToolsProjects | Freelance Content Opportunities",
    description:
        "Explore freelance content projects for writers, ghostwriters, social media marketers, and content strategists. Find your next opportunity in content creation.",
};

export default function Projects() {
    const itemsPerPageCount = 12;

  
    return (
        <>
            
            <main className=" bg-light-gray ">
                <section className="flex flex-col py-12 
      px-4 space-y-10 place-items-center xl:space-y-14  max-w-screen-2xl mx-auto">
                    <div>
                        <div className="flex flex-col space-y-4 text-center">
                            <p>
                                <span
                                    className="px-4 py-1 font-semibold bg-white border border-green-500 border-solid rounded-full text-DarkOrange">
                                    Curated Growth Marketing ToolsProjects
                                </span>
                            </p>
                            <h1
                                className="mx-auto text-2xl font-semibold leading-9 md:text-4xl md:leading-45 md:max-w-2xl xl:text-7xl xl:max-w-4xl xl:leading-tight">
                                <span> Find exciting content </span>
                                <span>project to work on.</span>
                            </h1>
                            <div
                                className="max-w-lg px-2 mx-auto text-base text-center md:text-base xl:text-2xl xl:max-w-4xl xl:leading-normal">
                               Take on exciting Growth Marketing Toolsprojects that pay well, help you grow your skills, and allow you to build a standout portfolio
                            </div>
                        </div>
                    </div>

                </section>
            </main>

            <div className="px-4 py-8 mx-auto min-w-xs max-w-8xl container">
                <ProjectScreen itemsPerPageCount={itemsPerPageCount} />
            </div>


        </>
    );
}
