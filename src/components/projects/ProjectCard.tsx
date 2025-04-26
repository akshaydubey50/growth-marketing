import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

interface ProjectCardProps {
    "Project Title": string;
    Status: string;
    Category: string[];
    Budget: string;
    Deadline: string;
    "Project Description": string;
    ProjectType: string;
    ProjectURL: string;
}

interface ProjectData {
    id: string;
    fields: ProjectCardProps;
}

export default function ProjectCard({ fields }: ProjectData) {
    return (
        <Card className="h-full flex flex-col hover:shadow-md transition-shadow">
            <Link href={fields?.ProjectURL} target="_blank" rel="noopener noreferrer" className="flex flex-col h-full">
                <CardHeader className="pb-2">
                    <CardTitle className="text-lg  line-clamp-1">{fields["Project Title"]}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col justify-between flex-grow pt-2">
                    <p className="text-sm text-muted-foreground mb-4  line-clamp-3">
                        {fields["Project Description"]}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-auto">
                        {fields?.Category?.map((category, index) => (
                            <Badge
                                key={index}
                                className="text-xs bg-green-100 text-orange-700 hover:bg-green-200"
                            >
                                {category}
                            </Badge>
                        ))}
                        <Badge variant="outline" className="text-xs">{fields?.ProjectType}</Badge>
                        <Badge variant="secondary" className="text-xs">{fields?.Budget}</Badge>
                    </div>
                </CardContent>
            </Link>
        </Card>
    )
}

