"use client"
import { useSelector } from "react-redux"
import ExpertList from "./ExpertList"
import ExpertsFilter, { SearchBar } from "./ExpertsFilter"
import { ExpertsFilterSkeleton, SearchBarSkeleton } from "./ExpertFilterSkeleton"


export default function Home({ itemsCount }: { itemsCount: number }) {
  const { isLoading } = useSelector((state: any) => state.experts)
 
  return (
    <main className=" md:container md:mx-auto px-4 md:px-8 lg:px-16 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="w-full lg:w-1/4">
          {isLoading ? <ExpertsFilterSkeleton /> : <ExpertsFilter />}
        </aside>
        <section className="w-full lg:w-3/4">
          {isLoading ? <SearchBarSkeleton /> : <SearchBar />}
          <ExpertList itemsCount={itemsCount} />
        </section>
      </div>
    </main>
  )
}

