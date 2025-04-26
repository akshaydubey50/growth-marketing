import NotFound from "@/app/not-found";
import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About - Growth Marketing Tools",
};

export default function AboutUs() {
  return (
    <>
      <main className="max-w-7xl mx-auto">
        <div className="flex flex-col justify-center items-center space-y-4">
          <h1 className="text-center font-semibold text-5xl">About</h1>
          <p> We are a small passionate team.</p>
        </div>
        <div className="flex flex-col space-y-4">
          <h2>Who We Are</h2>
          <p>
            Growth Marketing Tools (contentcreation.fyi) is your go-to resource
            for Growth Marketing Toolstools.
          </p>
          <p>
            Our team of content creators, marketers, and tech experts is
            dedicated to simplifying your Growth Marketing Toolsprocess.
          </p>
        </div>
        <div className="flex flex-col space-y-4">
          <h2>Our Mission</h2>
          <p>
            To provide a comprehensive, user-friendly directory of content
            creation tools.
          </p>
          <p>
            We help you find, evaluate, and use the best tools, so you can focus
            on creating outstanding content.
          </p>
        </div>
        <div className="flex flex-col space-y-4">
          <h2>Our Vision</h2>
          <p>
            To establish Growth Marketing Tools as the leading platform for
            Growth Marketing Toolsresources.
          </p>
        </div>
      </main>
    </>
  );
}
