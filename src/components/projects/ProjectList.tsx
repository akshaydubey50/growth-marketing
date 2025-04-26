'use client'

import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProjectsList } from '@/redux/slice/projects/projects.slice'
import { RootState, AppDispatch } from '../../redux/store'
import ProjectCard from './ProjectCard'
import Pagination from '../pagination/Pagination'
import ProjectCardShimmer from './ProjectCardShimmer'

export default function ProjectList({ itemsCount }: { itemsCount: number }) {
    const [currentPage, setCurrentPage] = useState(1)
    const dispatch: AppDispatch = useDispatch()

    // Get the filtered list and loading state from Redux
    const { projectList, isLoading, searchQuery, selectedCategory, selectedProjectType } = useSelector(
        (state: RootState) => state.projects
    )
    const filteredProjects = useSelector((state: RootState) => state.projects.filter.groupFilter)

    // Calculate pagination
    const startIndex = (currentPage - 1) * itemsCount
    const endIndex = startIndex + itemsCount

    // Get current page items using memoization
    const currentPageItems = useMemo(() => {
        console.log("filteredProjects::::::::::", filteredProjects)
        return filteredProjects?.slice(startIndex, endIndex)
    }, [filteredProjects, startIndex, endIndex])

    // Handle page changes
    const handlePageChange = (page: number) => {
        if (page !== currentPage) {
            setCurrentPage(page)
            // Scroll to top when page changes
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }
    }

    // Fetch projects on initial load if needed
    useEffect(() => {
        if (projectList?.length === 0 && !isLoading) {
            dispatch(fetchProjectsList())
        }
    }, [projectList, dispatch, isLoading])

    // Reset to first page when filters change
    useEffect(() => {
        setCurrentPage(1)
    }, [filteredProjects]) // Re-run when filteredProjects change

    

    // Check if no results were found with applied filters
    if (
        (searchQuery?.length > 0 || selectedCategory?.length > 0 || selectedProjectType?.length > 0) &&
        filteredProjects?.length === 0
    ) {
        return (
            <div className="text-center py-8">
                <p className="text-lg text-gray-600">No projects found matching your criteria.</p>
            </div>
        )
    }

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {currentPageItems?.map((project) => (
                    <ProjectCard key={project.id} id={project.id} fields={project.fields} />
                ))}
            </div>

            <div className="flex justify-center mt-8">
                <Pagination
                    itemsCount={itemsCount}
                    currentPage={currentPage}
                    totalItems={filteredProjects.length}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    )
}
