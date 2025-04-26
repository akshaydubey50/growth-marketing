"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function NewsLetterModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 30000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="bg-white border-white text-black rounded-xl w-11/12 md:w-full">
        <DialogHeader>
          <DialogTitle className="font-bold text-2xl pb-3 ">
            Subscribe to our newsletter
          </DialogTitle>
          <DialogDescription className="font-medium text-base">
            <span className="pr-1">Discover the best content creation</span>
            <span className="font-bold">
              tools, news, resources, memes, and jobs
            </span>
            <span className="pl-1">— sent to your inbox every Tuesday</span>
          </DialogDescription>
        </DialogHeader>
        <div className="w-full">
          <iframe
            src="https://embeds.beehiiv.com/c8b47983-58f2-410d-9d69-f10d79908089?slim=true"
            loading="lazy"
            data-test-id="beehiiv-embed"
            height="52"
            scrolling="no"
            className="bg-transparent m-0 rounded-none w-full border-0"
          ></iframe>
        </div>
      </DialogContent>
    </Dialog>
  );
}
