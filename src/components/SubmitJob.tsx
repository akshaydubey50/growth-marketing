import { ArrowUpRight } from 'lucide-react'

export default function SubmitJob() {
  return (
    <a
      href="#"
      className="group flex items-center justify-between rounded-lg border border-gray-200 bg-white p-6 transition-all hover:border-gray-300"
    >
      <div>
        <h3 className="mb-1 text-lg font-semibold">Submit a job listing</h3>
        <p className="text-sm text-gray-600">Get your role featured on our job board</p>
      </div>
      <ArrowUpRight className="h-5 w-5 text-gray-400 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
    </a>
  )
}

