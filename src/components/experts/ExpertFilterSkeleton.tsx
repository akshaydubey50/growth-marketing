import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search } from 'lucide-react'

export function ExpertsFilterSkeleton() {
    return (
        <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">Filters</h2>
            <div className="space-y-8">
                <div>
                    <h3 className="text-sm font-medium mb-3">Skills</h3>
                    <div className="relative mb-4">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <div className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 pl-9 animate-pulse" />
                    </div>
                    <ScrollArea className="h-[180px]">
                        <div className="space-y-2 pr-4">
                            {[...Array(6)].map((_, index) => (
                                <div
                                    key={index}
                                    className="h-6 bg-gray-100 rounded-md animate-pulse"
                                    style={{
                                        width: `${Math.floor(Math.random() * (100 - 60) + 60)}%`
                                    }}
                                />
                            ))}
                        </div>
                    </ScrollArea>
                </div>

                <div>
                    <h3 className="text-sm font-medium mb-3">Countries</h3>
                    <div className="space-y-2">
                        {[...Array(4)].map((_, index) => (
                            <div
                                key={index}
                                className="h-6 bg-gray-100 rounded-md animate-pulse"
                                style={{
                                    width: `${Math.floor(Math.random() * (100 - 60) + 60)}%`
                                }}
                            />
                        ))}
                    </div>
                </div>

                <div>
                    <h3 className="text-sm font-medium mb-3">Expert Type</h3>
                    <div className="space-y-2">
                        {[...Array(3)].map((_, index) => (
                            <div
                                key={index}
                                className="h-6 bg-gray-100 rounded-md animate-pulse"
                                style={{
                                    width: `${Math.floor(Math.random() * (100 - 60) + 60)}%`
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </Card>
    )
}

export function SearchBarSkeleton() {
    return (
        <div className="flex items-center space-x-4 mb-6">
            <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <div className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 pl-9 animate-pulse" />
            </div>
        </div>
    )
}

