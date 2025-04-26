'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { ProjectModel } from '../../models/airtable.model'
import { setGroupFilter, setSearchQuery, setSelectedProjectType, setSelectedCategory } from '@/redux/slice/projects/projects.slice'

export default function ProjectFilterSection() {
    const { projectList, searchQuery, selectedCategory, selectedProjectType } = useSelector((state: RootState) => state.projects)
    const dispatch = useDispatch()


    // Combined filter function that handles all filter types
    const applyFilters = useCallback(() => {
        if (!projectList?.length) return

        const filteredProjects = projectList?.filter((project: ProjectModel) => {
            const matchesSearch = !searchQuery ||
                project.fields["Project Title"]?.toLowerCase().includes(searchQuery.toLowerCase())

            const matchesCategory = selectedCategory === 'all' ||
                project.fields.Category?.includes(selectedCategory)

            const matchesProjectType = selectedProjectType === 'all' ||
                project.fields.ProjectType?.toLowerCase() === selectedProjectType.toLowerCase()

            return matchesSearch && matchesCategory && matchesProjectType
        })

        dispatch(setGroupFilter({ groupFilter: filteredProjects }))
    }, [projectList, searchQuery, selectedCategory, selectedProjectType, dispatch])

    // Handle individual filter changes
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearchQuery({searchQuery:e.target.value}))
    }

    const handleCategoryChange = (selectedCategory: string) => {
        dispatch(setSelectedCategory({selectedCategory}))
    }

    const handleProjectTypeChange = (selectedType: string) => {
        dispatch(setSelectedProjectType({selectedProjectType:selectedType}))
    }

    // Apply filters whenever any filter value changes
    useEffect(() => {
        applyFilters()
    }, [searchQuery, selectedCategory, selectedProjectType, applyFilters])

    // Memoized unique categories and project types
    const getProjectCategory = useMemo(() => {
        const categorySet = new Set<string>()
        projectList?.forEach((project) => {
            project.fields?.Category?.forEach(cat => categorySet.add(cat))
        })
        return Array.from(categorySet)
    }, [projectList])

    const getProjectType = useMemo(() => {
        const projectTypeSet = new Set<string>()
        projectList?.forEach((project) => {
            if (project.fields?.ProjectType) {
                projectTypeSet.add(project.fields.ProjectType)
            }
        })
        return Array.from(projectTypeSet)
    }, [projectList])

    return (
        <div className="mb-8 flex flex-col md:flex-row gap-4">
            <Input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={handleSearch}
                className="flex-grow"
            />
            <Select value={selectedCategory} onValueChange={handleCategoryChange}>
                <SelectTrigger className="w-full md:w-[200px]">
                    <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent className='bg-white'>
                    <SelectItem value="all">All Categories</SelectItem>
                    {getProjectCategory?.map((category, index) => (
                        <SelectItem
                            className='hover:bg-gray-200 cursor-pointer'
                            key={index}
                            value={category}
                        >
                            {category}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <Select value={selectedProjectType} onValueChange={handleProjectTypeChange}>
                <SelectTrigger className="w-full md:w-[200px]">
                    <SelectValue placeholder="Project Type" />
                </SelectTrigger>
                <SelectContent className='bg-white'>
                    <SelectItem value="all">All Types</SelectItem>
                    {getProjectType?.map((type, index) => (
                        <SelectItem
                            className='hover:bg-gray-200 cursor-pointer'
                            key={index}
                            value={type}
                        >
                            {type}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}