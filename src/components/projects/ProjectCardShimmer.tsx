import React from 'react'
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function ProjectCardShimmer() {
    return (
            <Card className="h-full flex flex-col overflow-hidden">
                <CardHeader className="pb-2">
                    <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-md animate-shimmer"></div>
                </CardHeader>
                <CardContent className="flex flex-col justify-between flex-grow pt-2">
                    <div className="space-y-2 mb-4">
                        <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-md animate-shimmer"></div>
                        <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-md animate-shimmer w-5/6"></div>
                        <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-md animate-shimmer w-4/6"></div>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-auto">
                        <div className="h-5 w-20 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-full animate-shimmer"></div>
                        <div className="h-5 w-16 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-full animate-shimmer"></div>
                        <div className="h-5 w-24 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-full animate-shimmer"></div>
                    </div>
                  
                </CardContent>
            </Card>
    )
}

