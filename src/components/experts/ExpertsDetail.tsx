import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Globe, Instagram, Languages, Linkedin, MapPin, Share2, Twitter } from 'lucide-react'
import { placeholderImage } from '@/constants/RoutePath'
import { Badge } from '../ui/badge'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store';
import { useCallback, useEffect } from 'react'
import { ExpertModel } from '@/models/airtable.model'

const getUserName = (obj: any) => {
    obj = obj || {};
    const firstName = obj["First Name"];
    const lastName = obj["Last Name"];

    if (firstName && lastName) {
        return `${firstName} ${lastName}`;
    } else {
        return "UserCCFYI";
    }
};

const getProfileImage = (obj: any) => {
    if (obj?.ProfileImage) {
        return obj?.ProfileImage
    }
    else {
        return placeholderImage
    }
}


export default function ExpertsDetail({ expert }: { expert: ExpertModel }) {

    const { fields } = expert

    return (
        <div className="min-h-screen bg-gray-50" >
            {/* Navigation Breadcrumb */}
            < div className="container mx-auto px-4 md:px-8 lg:px-16 py-4" >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0" >
                    <nav className="flex flex-wrap space-x-2 text-sm text-muted-foreground" >
                        <Link href="/" > Home </Link>
                        <span> / </span>
                        < Link href="/experts" > Experts </Link>
                        <span> / </span>
                        < span className="text-foreground" > {getUserName(fields)}</span>
                    </nav>
                    <Button variant="ghost" size="sm" className="text-xs sm:text-sm" >
                        <Share2 className="h-4 w-4 mr-2" />
                        Share this profile
                    </Button>
                </div>
            </div>

            {/* Main Profile Section */}
            <div className="w-full bg-green-50" >
                <div className="container mx-auto px-4 md:px-8 lg:px-16 py-8" >
                    <div className="flex flex-col lg:flex-row justify-between gap-8" >
                        {/* Mobile: Image at the top */}
                        < div className="lg:hidden w-full flex justify-center mb-6" >
                            <div className="relative" >
                                <Image
                                    src={getProfileImage(fields)}
                                    alt={`${getUserName(fields)}`
                                    }
                                    width={200}
                                    height={200}
                                    className="rounded-lg object-cover"
                                />

                            </div>
                        </div>

                        {/* Left Column */}
                        <div className="flex-grow space-y-6" >
                            <div className="flex items-start gap-2" >
                                <Badge variant="outline" className="bg-white text-xs sm:text-sm" >
                                    {expert?.fields?.ExpertType}
                                </Badge>
                            </div>


                            < div className="flex flex-col items-start gap-2" >
                                <h1 className="text-3xl sm:text-4xl font-bold" >
                                    {getUserName(fields)}
                                </h1>
                                {
                                    expert?.fields?.Status === "Verified" && (
                                        <Badge variant="default" className="bg-green-500 text-xs sm:text-sm" > Verified </Badge>
                                    )
                                }
                            </div>

                            <div className="flex items-center text-muted-foreground" >
                                <MapPin className="h-4 w-4 mr-1" />
                                {expert?.fields?.Country}
                            </div>


                            <p className="text-base sm:text-lg" > {expert?.fields?.Headline} </p>

                            <div className="flex flex-col sm:flex-row gap-3" >
                                <Link href={expert?.fields?.Portfolio} target='_blank' className='sm:w-auto w-full  text-center text-white bg-primary rounded-md py-2 px-4'>
                                    Get in touch
                                </Link>
                                <div className="flex gap-2 justify-center sm:justify-start">
                                    {
                                        expert?.fields.LinkedIn && (
                                            <Link href={`${expert?.fields.LinkedIn}`} target="_blank" className='rounded-md border border-solid border-gray-300 cursor-pointer hover:bg-accent inline-flex bg-white py-2 px-3 mb-0 items-center justify-center'>
                                                <Linkedin className="h-4 w-4" />
                                            </Link>
                                        )
                                    }
                                    {
                                        expert?.fields.Twitter && (
                                            <Link href={`${expert?.fields.Twitter}`} target="_blank" className='rounded-md border border-solid border-gray-300 cursor-pointer hover:bg-accent inline-flex bg-white py-2 px-3 mb-0 items-center justify-center'>
                                                <Twitter className="h-4 w-4" />
                                            </Link>
                                        )
                                    }
                                    {
                                        expert?.fields.Portfolio && (
                                            <Link href={`${expert?.fields.Portfolio}`} target="_blank" className='rounded-md border border-solid border-gray-300 cursor-pointer hover:bg-accent inline-flex bg-white py-2 px-3 mb-0 items-center justify-center'>
                                                <Globe className="h-4 w-4" />
                                            </Link>
                                        )
                                    }
                                </div>
                            </div>
                        </div>

                        {/* Desktop: Right Column - Profile Image */}
                        <div className="hidden lg:block relative" >

                            <Image
                                src={getProfileImage(expert?.fields)}
                                alt={`${getUserName(expert?.fields)}`}
                                width={200}
                                height={200}
                                className="rounded-lg object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Skills & Industries Section */}
            <div className="container mx-auto px-4 md:px-8 lg:px-16 py-8 sm:py-12" >
                <div className="max-w-4xl space-y-8" >
                    <div>
                        <h2 className="text-xl sm:text-2xl font-bold mb-4" > Skills </h2>
                        < div className="flex flex-wrap gap-2" >
                            {
                                expert?.fields?.Skills?.map((skill, index) => (
                                    <Badge key={index} variant="secondary" className=" text-xs sm:text-sm" >
                                        {skill}
                                    </Badge>
                                ))
                            }
                        </div>
                    </div>


                </div>
            </div>

            {/* Professional Bio Section */}
            {expert?.fields?.['Professional Bio'] && <div className="container mx-auto px-4 md:px-8 lg:px-16 py-8 sm:py-12 border-t" >
                <div className="max-w-4xl" >
                    <h2 className="text-xl sm:text-2xl font-bold mb-4" > Professional Bio </h2>
                    < div className="prose max-w-none text-sm sm:text-base" >
                        <p className="whitespace-pre-line" > {expert?.fields?.['Professional Bio']} </p>
                    </div>
                </div>
            </div>}

            <div className="container mx-auto px-4 md:px-8 lg:px-16 py-8 sm:py-12" >
                <div className="max-w-4xl space-y-8" >
                    {expert?.fields?.Industry?.length > 0 && (
                        <div>
                            <h2 className="text-xl sm:text-2xl font-bold mb-4" > Industries </h2>
                            <div className="flex flex-wrap gap-2" >
                                {
                                    expert?.fields?.Industry?.map((industry, index) => (
                                        <Badge key={index} variant="outline" className="text-xs sm:text-sm" >
                                            {industry}
                                        </Badge>
                                    ))
                                }
                            </div>
                        </div>
                    )}

                    {/* Tools Section */}
                    {expert?.fields?.Tools?.length > 0 && (<div className="container mx-auto px-4 md:px-8 lg:px-16 py-8 sm:py-12 border-t" >
                        <div className="max-w-4xl" >
                            <h2 className="text-xl sm:text-2xl font-bold mb-4" > Tools </h2>
                            < div className="flex flex-wrap gap-2" >
                                {
                                    expert?.fields?.Tools?.map((tool, index) => (
                                        <Badge key={index} variant="secondary" className="text-xs sm:text-sm" >
                                            {tool}
                                        </Badge>
                                    ))
                                }
                            </div>
                        </div>
                    </div>)}
                </div>
            </div>



            {/* CTA Section */}
            {/* <div className="bg-green-50" >
                <div className="container mx-auto px-4 py-8 sm:py-12" >
                    <div className="max-w-4xl flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0" >
                        <div className="text-center sm:text-left" >
                            <h2 className="text-xl sm:text-2xl font-bold" > Join our expert partnership program </h2>
                            < p className="text-sm sm:text-base text-muted-foreground" > Become a part of our growing network of professionals </p>
                        </div>
                        < Button className="bg-primary w-full sm:w-auto" > Apply now </Button>
                    </div>
                </div>
            </div> */}
        </div>
    )
}