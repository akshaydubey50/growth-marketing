"use client";
import React from "react";
import Breadcrumb from "@/components/common/Breadcrumb";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

const page = ({ params: { slug } }: any) => {
  return (
    <div className="h-screen max-w-4xl px-4 pt-10 mx-auto">
      <div className="  flex flex-col mx-auto  space-y-4   pt-[40px] lg:pt-[60px]">
        <div className="container flex items-start max-w-4xl px-4 py-8 mx-auto ">
          <Breadcrumb categories="prompts" currentPageTitle={slug} key={slug} />
        </div>
        <div className="flex flex-row">
          <div className="flex items-center justify-center">
            <div className="text-5xl font-bold">
              Identify Trending Topics in a Niche{" "}
            </div>
          </div>

          <Card className="max-w-xl p-4 mt-10 mb-6">
            {/*  <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle className="text-2xl font-bold">Title</CardTitle>
              </div>
            </CardHeader> */}
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-600 whitespace-pre-line ">
                    Based on the provided focus area, generate a list of 5
                    potential blog topics that would be interesting and relevant
                    to the target audience. Focus Area: focus_area Target
                    Audience: target_audience
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default page;
