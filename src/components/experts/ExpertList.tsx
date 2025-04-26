import ExpertCard from './ExpertCard'
import React, { useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from '../../redux/store';
import { fetchExpertsList } from '@/redux/slice/experts/experts.slice'
import Pagination from '../pagination/Pagination'
import { ExpertModel } from '../../models/airtable.model';
import { ExpertsFilter } from '../../redux/slice/experts/experts.slice';
import ExpertCardSkeleton from './ExpertCardSkeleton';


export default function ExpertList({ itemsCount }: { itemsCount: number }) {
    const [currentPage, setCurrentPage] = useState(1);
    const dispatch: AppDispatch = useDispatch();

    const applyFilters = (experts: ExpertModel[], filters: ExpertsFilter): ExpertModel[] => {
        return experts.filter((expert) => {
            const { selectedSkills, selectedLanguages, selectedExpertTypes, searchQuery, isVerified } = filters;

            const matchesSkills = selectedSkills.length
                ? expert.fields.Skills?.some(skill => selectedSkills.includes(skill))
                : true;

            const matchesLanguages = selectedLanguages?.length
                ? selectedLanguages.includes(expert.fields.Country)
                : true;

            const matchesExpertTypes = selectedExpertTypes?.length
                ? expert.fields.ExpertType?.some((type: any) => selectedExpertTypes.includes(type))
                : true;

            const matchesSearchQuery = searchQuery
                ? expert.fields["First Name"].toLowerCase().includes(searchQuery.toLowerCase()) ||
                expert.fields["Last Name"].toLowerCase().includes(searchQuery.toLowerCase())
                : true;

            // const matchesVerified = isVerified ? expert.fields.Status === "Verified" : true;
            const matchesVerified = (isVerified && expert.fields.Verified === true) || !isVerified;

            console.log("matchesVerified",matchesVerified)

            return matchesSkills && matchesLanguages && matchesExpertTypes && matchesSearchQuery && matchesVerified;
        });
    };


    const { expertsList, filter,isLoading } = useSelector((state: RootState) => state.experts);

    // Apply filters to the expert list
    const filteredExperts = useMemo(() => applyFilters(expertsList, filter), [expertsList, filter]);

    // Pagination logic
    const startIndex = (currentPage - 1) * itemsCount;
    const endIndex = startIndex + itemsCount;

    const currentPageItems = useMemo(() => filteredExperts.slice(startIndex, endIndex), [filteredExperts, startIndex, endIndex]);

    useEffect(() => {
        if (expertsList?.length === 0) {
            dispatch(fetchExpertsList());
        }
    }, [dispatch, expertsList?.length]);

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 gap-6">
                {Array.from({ length: itemsCount }).map((_, index) => (
                    <ExpertCardSkeleton key={index} />
                ))}
            </div>
        );
    }


    if ( currentPageItems?.length === 0) {
        return <div className='text-center font-semibold text-2xl'>No Record found for Experts</div>
    }

    return (
        <div className="grid grid-cols-1 gap-6">
            {currentPageItems?.map((expert, index) => (
                <ExpertCard expert={expert.fields} key={index} />
            ))}
            {
                filteredExperts?.length > 12 && <Pagination
                    currentPage={currentPage}
                    itemsCount={itemsCount}
                    totalItems={filteredExperts?.length}
                    onPageChange={setCurrentPage}
                />
            }
        </div>
    );
}
