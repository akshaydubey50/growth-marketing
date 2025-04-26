export function ResourceToolSkeleton() {
    return (
        <div className="col-span-1 shadow-lg w-full border-black border bg-light-gray rounded-2xl animate-pulse">
            <section className="flex flex-col h-full p-6">
                <div className="flex flex-col h-full">
                    <div className="mb-4 h-14">
                        <div className="h-8 bg-gray-300 rounded w-3/4"></div>
                    </div>
                    <div className="flex-grow mb-4">
                        <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                        <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                        <div className="h-4 bg-gray-300 rounded w-4/6 mt-2"></div>
                    </div>
                    <div className="mt-auto space-y-4">
                        <div className="h-6 bg-gray-300 rounded-full w-1/3"></div>
                        <div className="flex items-center justify-between">
                            <div className="h-10 bg-gray-300 rounded w-1/3"></div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

