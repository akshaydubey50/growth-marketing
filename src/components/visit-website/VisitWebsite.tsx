import React from "react";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import { toKebabCase } from "@/helper/helper";

interface visiWebsite {
  url: string;
  btnText: string;
  openInNewTab?: boolean;
}
export default function VisitWebsite({
  url,
  btnText,
  openInNewTab = true,
}: visiWebsite) {
  return (
    <div className="hover:text-DarkOrange text-white ">
      <Link
        href={toKebabCase(url)}
        target={openInNewTab ? "_blank" : "_self"}
        className=" flex gap-x-2 px-4 md:px-6  py-2 rounded-lg border border-DarkOrange hover:bg-white hover:text-DarkOrange text-cct-White font-semibold bg-DarkOrange items-center text-Title-Small "
      >
        <p>{btnText}</p>
        <p>
          <FiArrowUpRight className="text-2xl " />
        </p>
      </Link>
    </div>
  );
}
