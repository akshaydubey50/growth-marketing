import { Card, CardContent } from "@/components/ui/card"

export default function ExpertCardSkeleton() {
    return (
        <Card className="overflow-hidden">
            <CardContent className="p-6">
                <div className="flex items-start space-x-6">
                    <div className="w-[60px] h-[60px] rounded-full bg-gray-200 animate-pulse" />
                    <div className="flex-1 min-w-0 space-y-3">
                        <div className="flex justify-between items-start">
                            <div className="flex items-center space-x-2">
                                <div className="h-6 w-40 bg-gray-200 rounded animate-pulse" />
                                <div className="h-5 w-16 bg-gray-200 rounded animate-pulse" />
                            </div>
                            <div className="h-5 w-20 bg-gray-200 rounded animate-pulse" />
                        </div>
                        <div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse" />
                        <div className="flex flex-wrap gap-2">
                            {[...Array(5)].map((_, index) => (
                                <div key={index} className="h-5 w-16 bg-gray-200 rounded animate-pulse" />
                            ))}
                        </div>
                        <div className="space-y-2">
                            <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                            <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse" />
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

