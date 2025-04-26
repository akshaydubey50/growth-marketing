'use client'

import Image from "next/image";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

export default function NewsLetter() {
    return (
        <Card className="max-w-screen-2xl mx-auto my-4 sm:my-6 md:my-8 border-0 ">
            <CardContent className="bg-[#2bb656] rounded-3xl shadow-lg p-6 sm:p-8 md:p-10 lg:p-12">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-8 lg:gap-12">
                    <div className="w-full md:w-2/3 space-y-4 sm:space-y-6">
                        <h3 className="font-semibold text-2xl sm:text-3xl lg:text-4xl text-white text-center md:text-left leading-tight">
                            Subscribe to our newsletter
                        </h3>
                        <p className="text-white text-sm sm:text-base text-center md:text-left max-w-2xl">
                            Discover the best Growth Marketing Toolstools, news, resources, memes, and jobs — sent to your inbox every Tuesday.
                        </p>
                        <div className="w-full max-w-md mx-auto md:mx-0">
                            <iframe 
                                src="https://embeds.beehiiv.com/c8b47983-58f2-410d-9d69-f10d79908089?slim=true" 
                                data-test-id="beehiiv-embed" 
                                height="52" 
                                frameBorder="0" 
                                scrolling="no"
                                className="bg-transparent m-0 rounded-none w-full"
                            ></iframe>
                        </div>
                    </div>
                    <div className="w-full md:w-1/3 flex justify-center md:justify-end mt-6 md:mt-0">
                        <Image
                            src="https://www.coldemail.fyi/cta-home.svg"
                            width={200}
                            height={200}
                            alt="Newsletter illustration"
                            className="w-40 h-40 sm:w-48 sm:h-48 lg:w-56 lg:h-56 object-contain"
                        />
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}