import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function JobCard({
  company,
  position,
  location,
  salary,
  logoUrl,
  applyUrl,
  jobType,
}: {
  company: string;
  position: string;
  location: string;
  salary: string;
  logoUrl: string;
  applyUrl: string;
  jobType: string;
}) {
  return (
    <div className="job-card relative rounded-lg border border-gray-200 bg-white p-6">
      <div className="mb-4">
        <Image
          src={logoUrl || "/placeholder.svg"}
          alt={`${company} logo`}
          width={48}
          height={48}
          className="rounded-lg"
        />
      </div>
      <h3 className="mb-1 text-lg font-semibold">{position}</h3>
      <p className="mb-2 text-sm text-gray-600">{company}</p>
      <div className="mb-2 flex items-center justify-between">
        <p className="text-sm text-gray-600">{location}</p>
        {salary !== 'NA' && (
          <p className="text-sm font-medium text-gray-800">{salary}</p>
        )}
      </div>
      <div className="mb-2">
        <Badge variant="secondary" className="text-xs">
          {jobType}
        </Badge>
      </div>
      <div className="apply-button absolute right-4 top-4">
        <Button
          asChild
          variant="outline"
          className="hover:bg-gray-50"
        >
          <a href={applyUrl} target="_blank" rel="noopener noreferrer">
            Apply
          </a>
        </Button>
      </div>
    </div>
  )
}

