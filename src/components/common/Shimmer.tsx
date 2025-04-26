import { AiOutlineHeart } from "react-icons/ai";
import { BsBookmarkFill, BsBookmark } from "react-icons/bs";
import { MdVerified } from "react-icons/md";
import VisitWebsite from "../visit-website/VisitWebsite";

export default function Shimmer() {
    return (
        <>
            <div
                className="flex flex-col max-w-sm border border-black border-solid shadow-2xl rounded-2xl"
            >
                <section className="w-full border-b border-black border-solid">
                    <div
                        // loading="lazy"
                        /*    width="1280"
                        height="720" */
                        // decoding="async"
                        // data-nimg="1"
                        className="w-[1280] h-[720] rounded-t-2xl object-cover"
                    />
                </section>

                <section className="h-full px-5 bg-light-gray pt-7 rounded-b-2xl">
                    <div className="flex flex-col justify-between h-full">
                        <div className="">
                            <div className="flex flex-row justify-between flex-1 pb-4">
                                <div className="flex items-center gap-x-2">
                                    <div
                                        className="w-40 h-6 px-8 font-bold bg-gray-400 text-Title-Medium md:text-Title-Large "
                                    ></div>
                                </div>
                            </div>
                        </div>
                        <div className="">
                            <div className="text-Description">
                                <p>Description</p>
                            </div>
                        </div>
                        <div className="tool-btn-section pb-7">
                            <p
                                className="px-5 py-1 my-6 font-medium bg-white border border-black border-solid rounded-full text-tags"
                            >
                                Tags
                            </p>
                            <div
                                className="flex items-center justify-between text-white text-Title-Medium"
                            >
                                <VisitWebsite url="" btnText="" />
                                <button title="Bookmark" type="button">
                                    <BsBookmark className="text-3xl text-black" />
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}