"use client"
import JobCard from "@/components/JobCard"
import SearchBar from "@/components/SearchBar"
import SubmitJob from "@/components/SubmitJob"
import { JobModel } from "@/models/airtable.model"
import { useState, useEffect } from "react"
import { Metadata } from 'next'
import { AlertCircle } from 'lucide-react'

// Define the type for Job
interface Job {
  id?: string;
  company: string;
  position: string;
  location: string;
  salary: string;
  logoUrl: string;
  applyUrl: string;
  jobType: string;
  companyLogoUrl: string;
}

interface Option {
  value: string;
  label: string;
}

export default function Page() {
  const [allJobs, setAllJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [locations, setLocations] = useState<Option[]>([]);
  const [jobTypes, setJobTypes] = useState<Option[]>([]);
  const [activeFilters, setActiveFilters] = useState({
    query: '',
    location: '',
    jobType: ''
  });

  useEffect(() => {
    const fetchJobs = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch('/api/jobs');
        const data = await response.json();
        if (data.success) {
          const formattedJobs = data.data.map((job: JobModel) => ({
            id: job.id || '',
            company: job.fields.CompanyName || '',
            position: job.fields.Job_Title || '',
            location: job.fields.Location || '',
            salary: job.fields.Salary || '',
            logoUrl: job.fields.Company_LogoURL || '/placeholder.svg',
            applyUrl: job.fields.ApplyLink || '#',
            jobType: job.fields.JobType || '',
            companyLogoUrl: job.fields.Company_LogoURL || '/placeholder.svg'
          }));

          // Extract unique locations and job types with proper typing
          const uniqueLocations = Array.from(
            new Set(formattedJobs.map((job: Job) => job.location))
          )
            .filter((location): location is string => Boolean(location))
            .sort()
            .map(location => ({
              value: location.toLowerCase(),
              label: location
            }));

          const uniqueJobTypes = Array.from(
            new Set(formattedJobs.map((job: Job) => job.jobType))
          )
            .filter((type): type is string => Boolean(type))
            .sort()
            .map(type => ({
              value: type.toLowerCase(),
              label: type
            }));

          setLocations(uniqueLocations);
          setJobTypes(uniqueJobTypes);
          setAllJobs(formattedJobs);
          setFilteredJobs(formattedJobs);
        } else {
          setError('Failed to fetch jobs. Please try again later.');
        }
      } catch (error) {
        console.error('Error fetching jobs:', error);
        setError('Failed to fetch jobs. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleSearch = ({ query, location, jobType }: { query: string; location: string; jobType: string }) => {
    let filtered = [...allJobs];

    // Filter by search query
    if (query) {
      const searchLower = query.toLowerCase();
      filtered = filtered.filter(job => 
        job.position.toLowerCase().includes(searchLower) ||
        job.company.toLowerCase().includes(searchLower) ||
        job.location.toLowerCase().includes(searchLower)
      );
    }

    // Filter by location
    if (location && location !== 'all') {
      filtered = filtered.filter(job => 
        job.location.toLowerCase() === location.toLowerCase()
      );
    }

    // Filter by job type
    if (jobType && jobType !== 'all') {
      filtered = filtered.filter(job => 
        job.jobType.toLowerCase() === jobType.toLowerCase()
      );
    }

    setActiveFilters({ query, location, jobType });
    setFilteredJobs(filtered);
  };

  const renderContent = () => {
    if (error) {
      return (
        <div className="col-span-full text-center py-12">
          <div className="flex items-center justify-center gap-2 text-red-600 mb-2">
            <AlertCircle className="h-5 w-5" />
            <p className="font-medium">{error}</p>
          </div>
          <button 
            onClick={() => window.location.reload()} 
            className="text-blue-600 hover:underline mt-2"
          >
            Try again
          </button>
        </div>
      );
    }

    if (isLoading) {
      return [...Array(6)].map((_, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
          <div className="h-12 bg-gray-200 rounded-md mb-4"></div>
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded mb-2 w-2/3"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      ));
    }

    if (filteredJobs.length === 0) {
      const hasActiveFilters = activeFilters.query || activeFilters.location !== 'all' || activeFilters.jobType !== 'all';
      return (
        <div className="col-span-full text-center py-12">
          <p className="text-gray-600 text-lg mb-4">
            {hasActiveFilters 
              ? `No jobs found matching your search criteria. Try adjusting your filters.`
              : `No jobs available at the moment. Please check back later.`
            }
          </p>
          {hasActiveFilters && (
            <button 
              onClick={() => handleSearch({ query: '', location: 'all', jobType: 'all' })}
              className="text-blue-600 hover:underline"
            >
              Clear all filters
            </button>
          )}
        </div>
      );
    }

    return filteredJobs.map((job, index) => (
      <JobCard
        key={job.id || index}
        company={job.company || ''}
        position={job.position || ''}
        location={job.location || ''}
        salary={job.salary || ''}
        logoUrl={job.logoUrl || '/placeholder.svg'}
        applyUrl={job.applyUrl || '#'}
        jobType={job.jobType || ''}
      />
    ));
  };

  return (
    <main className="min-h-screen  ">
      <main className=" bg-light-gray ">
        <section className="flex flex-col py-12 
      px-4 space-y-10 place-items-center xl:space-y-14  max-w-screen-2xl mx-auto">
          <div>
            <div className="flex flex-col space-y-4 text-center">
              <p>
                <span
                  className="px-4 py-1 font-semibold bg-white border border-green-500 border-solid rounded-full text-DarkOrange">
                  Growth Marketing ToolsJob Board
                </span>
              </p>
              <h1
                className="mx-auto text-2xl font-semibold leading-9 md:text-4xl md:leading-45 md:max-w-2xl xl:text-7xl xl:max-w-4xl xl:leading-tight">
                <span> Find Content jobs that </span>
                <span>match your skills.</span>
              </h1>
              <div
                className="max-w-lg px-2 mx-auto text-base text-center md:text-base xl:text-2xl xl:max-w-4xl xl:leading-normal">
                Browse a curated list of content jobs tailored to your expertise, with details on role, company, salary, and location.
              </div>
            </div>
          </div>

        </section>
      </main>
      <div className="mx-auto container max-w-screen-2xl px-4 md:px-8 lg:px-16">
     
        <div className="my-8">
          <SubmitJob />
        </div>

        <div className="my-8">
          <SearchBar
            onSearch={handleSearch}
            isLoading={isLoading}
            locations={locations}
            jobTypes={jobTypes}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 my-8">
          {renderContent()}
        </div>

      </div>
     
    </main>
  )
}
