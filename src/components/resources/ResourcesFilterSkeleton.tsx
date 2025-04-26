export function ResourceSidebarSkeleton() {
    return (
        <div className="animate-pulse rounded-md p-2">
            {[...Array(5)].map((_, index) => (
                <div key={index} className="group py-2 rounded-md pl-4 my-2 flex justify-between items-center">
                    <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                    <div className="h-6 w-6 bg-gray-300 rounded-full mr-2"></div>
                </div>
            ))}
        </div>
    )
}

