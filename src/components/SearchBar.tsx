'use client'

import { useState, useEffect } from 'react'
import { Search } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'

interface Option {
  value: string;
  label: string;
}

interface SearchBarProps {
  onSearch: (filters: {
    query: string;
    location: string;
    jobType: string;
  }) => void;
  isLoading?: boolean;
  locations: Option[];
  jobTypes: Option[];
}

export default function SearchBar({ onSearch, isLoading = false, locations = [], jobTypes = [] }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('all')
  const [selectedJobType, setSelectedJobType] = useState('all')
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery)

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery)
    }, 300)

    return () => clearTimeout(timer)
  }, [searchQuery])

  // Handle search updates
  useEffect(() => {
    onSearch({
      query: debouncedSearchQuery,
      location: selectedLocation,
      jobType: selectedJobType,
    })
  }, [debouncedSearchQuery, selectedLocation, selectedJobType])

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center">
      <div className="flex-1">
        <label htmlFor="search-input" className="sr-only">
          Search jobs, companies, or locations
        </label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" aria-hidden="true" />
          <Input
            id="search-input"
            type="text"
            placeholder="Search jobs, companies, or locations"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>
      <Select value={selectedLocation} onValueChange={setSelectedLocation} disabled={isLoading}>
        <SelectTrigger className="w-full md:w-48">
          <SelectValue defaultValue="all">All Locations</SelectValue>
        </SelectTrigger>
        <SelectContent className='bg-white'>
          <SelectItem value="all" className="hover:bg-gray-300 cursor-pointer transition-colors">
            All Locations
          </SelectItem>
          {locations.map((location) => (
            <SelectItem 
              key={location.value} 
              value={location.value}
              className="hover:bg-gray-300 cursor-pointer transition-colors"
            >
              {location.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select value={selectedJobType} onValueChange={setSelectedJobType} disabled={isLoading}>
        <SelectTrigger className="w-full md:w-48">
          <SelectValue defaultValue="all">All Types</SelectValue>
        </SelectTrigger>
        <SelectContent className='bg-white'>
          <SelectItem value="all" className="hover:bg-gray-300 cursor-pointer transition-colors">
            All Types
          </SelectItem>
          {jobTypes.map((type) => (
            <SelectItem 
              key={type.value} 
              value={type.value}
              className="hover:bg-gray-300 cursor-pointer transition-colors"
            >
              {type.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

