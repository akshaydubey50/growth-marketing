"use client";
import React, { useCallback, useEffect, useState, useMemo } from "react";
import { useSearchParams, useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchResourcesList } from "@/redux/slice/resources/resource.slice";
import { ResourceTool } from "./ResourceTool";
import Loader from "../common/Loader/Loader";
import { RootState, AppDispatch } from "@/redux/store";
import Pagination from "../pagination/Pagination";
import { useSession } from "next-auth/react";
import { ResourceModel } from "@/models/airtable.model";
import ResourceSidebar from "./ResourceSidebar";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { ResourceToolSkeleton } from "./ResourceToolSkeleton";
import { ResourceSidebarSkeleton } from "./ResourcesFilterSkeleton";

export default function ResourceList({ itemsCount }: { itemsCount: number }) {

    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const dispatch: AppDispatch = useDispatch();
    const { resourceList, isLoading, filter } = useSelector((state: RootState) => state.resources);

    // Pagination logic
    const startIndex = (currentPage - 1) * itemsCount;
    const endIndex = startIndex + itemsCount;


    const applyFiltereResources = (resourceRecord: ResourceModel[]) => {
        if (filter.selectedTopic === "All") {
            return resourceRecord;
        }
        return resourceRecord?.filter((resourceItem) =>
            resourceItem?.fields.Tags?.toLowerCase().includes(
                filter.selectedTopic.toLowerCase()
            )
        );
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const filteredResources = useMemo(() =>
        applyFiltereResources(resourceList),
        [resourceList, filter.selectedTopic]
    );

    const currentPageItems = useMemo(() =>
        filteredResources?.slice(startIndex, endIndex),
        [filteredResources, startIndex, endIndex]
    );



    useEffect(() => {
        if (resourceList?.length === 0) {
            dispatch(fetchResourcesList());
        }
    }, [resourceList]);



    if (isLoading) {
        return (
            <>
                <div className="grid grid-col-1 md:grid-cols-3 lg:grid-cols-12 gap-10 my-8">
                    <div className="col-span-1 lg:col-span-2">
                        <ResourceSidebarSkeleton />
                    </div>
                    <div className="col-span-1 md:col-span-2 lg:col-span-10">
                        <div className="grid grid-cols-1md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {Array.from({ length: itemsCount }).map((_, index) => (
                                <ResourceToolSkeleton key={index} />
                            ))}
                        </div>
                    </div>
                </div>
            </>
        );
    }

    if (currentPageItems?.length === 0) {
        return <div className='text-center font-semibold text-2xl'>No Record found for Resources</div>
    }


    return (
        <>

            <section className='container mx-auto px-4 py-8 '>
                {currentPageItems && (
                    <div className='grid md:grid-cols-12 gap-8'>
                        {/* Sidebar */}
                        <div className="md:col-span-2">
                            <div className="lg:hidden mb-4">
                                <Button
                                    className="w-full flex items-center justify-between border-black bg-light-gray"
                                    onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                                >
                                    Categories
                                    {isCategoryOpen ? (
                                        <ChevronUp className="w-4 h-4" />
                                    ) : (
                                        <ChevronDown className="w-4 h-4" />
                                    )}
                                </Button>
                                {isCategoryOpen && <ResourceSidebar />}
                            </div>
                            <div className="hidden lg:block">
                                <ResourceSidebar />
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="md:col-span-10">
                            <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                                {currentPageItems?.map((item: ResourceModel) => {
                                    if (!item || !item.id) return null;
                                    return (
                                        <div key={item.id} className="w-full">
                                            <ResourceTool record={item} />
                                        </div>
                                    );
                                })}
                            </main>

                            {filteredResources?.length > itemsCount && <div className="mt-8">
                                <Pagination
                                    itemsCount={itemsCount}
                                    currentPage={currentPage}
                                    totalItems={filteredResources?.length || 0}
                                    onPageChange={handlePageChange}
                                />
                            </div>}
                        </div>
                    </div>
                )}
            </section>


        </>
    );
}

