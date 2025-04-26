
"use client"
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store';
import ProjectCardShimmer from './ProjectCardShimmer';
import ProjectList from './ProjectList';
import ProjectFilterSection from "@/components/projects/FilterSection";


export default function ProjectScreen({ itemsPerPageCount }: { itemsPerPageCount: number }) {
    const { isLoading,searchQuery } = useSelector((state: RootState) => state.projects)
    return (
        <>
            {
                 searchQuery?.length === 0&& isLoading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {Array.from({ length: itemsPerPageCount }, (_, index) => (
                            <ProjectCardShimmer key={index} />
                        ))}
                    </div>
                ) : (
                    <>
                        <ProjectFilterSection />
                        <ProjectList itemsCount={itemsPerPageCount} />
                    </>
                )
            }
        </>
    )
}
