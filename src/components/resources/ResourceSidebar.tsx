import React, { useMemo, useState } from 'react'
import { ChevronRight } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { updateFilters } from '@/redux/slice/resources/resource.slice';


export default function ResourceSidebar() {
    const { resourceList, isLoading,filter } = useSelector((state: RootState) => state.resources);
    const {selectedTopic}=filter
    const dispatch=useDispatch();
    const handleCategory = (id: string) => {
        dispatch(updateFilters({ selectedTopic: id }));
    }

    const resourceTypelist = useMemo(() => {
        const resourceTypeList = new Set<string>(["All"]);
        resourceList.forEach((item) => {
            resourceTypeList.add(item.fields.Tags);
        });
        console.log("resourceTypeList::", Array.from(resourceTypeList));
        return Array.from(resourceTypeList);
    }, [resourceList]); 
    
    return (
        <>
            {resourceTypelist?.map((item:any) => {
                return (
                    <div
                        key={item}
                        className={`group py-2 rounded-md pl-4 hover:cursor-pointer font-medium my-2 hover:text-white hover:bg-black  flex justify-between items-center ${selectedTopic === item ? "bg-black text-white" : "bg-transparent text-black"}`}
                        onClick={() => handleCategory(item)}
                    >
                        <div>{item}</div>
                        <ChevronRight className={`text-white opacity-0 group-hover:opacity-100 ${selectedTopic === item ? "text-black opacity-100" : "text-white"}`} />
                    </div>
                )
            })}
        </>
    )
}
