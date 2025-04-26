import Image from 'next/image'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, User, MapPin } from 'lucide-react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { COUNTRY_SHORTCODE } from './utils'


export default function ExpertCard({ expert }: any) {
  console.log("expert", expert)
  const getUserName = (obj: any) => {
    const firstName = obj["First Name"]?.toLowerCase()?.trim();
    const lastName = obj["Last Name"]?.toLowerCase()?.trim();

    if (firstName && lastName) {
      return `${firstName}-${lastName}`;
    } else {
      return "UserCCFYI";
    }
  };

  const { "First Name": firstName, "Last Name": lastName, ExpertType, ProfileImage, "Professional Bio": professionalBio, Verified, Country, Headline, Skills: skills, Username } = expert;

  const defaultImage = <User />

  return (
    <>
      {/* For Large Screen Only */}
      <Link href={`/experts/${Username}`} className='hidden lg:block'>
        <Card className="overflow-hidden hover:shadow-md transition-shadow">
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <div className="flex-shrink-0 mx-auto sm:mx-0">
                <Image
                  src={ProfileImage || defaultImage}
                  alt={`${firstName}${lastName}`}
                  width={60}
                  height={60}
                  className="rounded-full w-12 h-12 sm:w-14 sm:h-14"
                />
              </div>
              <div className="flex-1 min-w-0 space-y-2">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                    <p className="text-base sm:text-lg font-medium text-gray-900">
                      {`${firstName} ${lastName}`}
                      <span className="text-gray-500 sm:ml-2 ml-1 text-sm uppercase">
                        {/* {Country?.slice(0, 2)} */}
                        {COUNTRY_SHORTCODE[Country]}
                      </span>
                    </p>
                    {Verified && (
                      <Badge variant="secondary" className="text-xs bg-green-100 text-orange-700 border-orange-200">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
                  <Badge variant="outline" className="text-xs sm:self-start">
                    {ExpertType}
                  </Badge>
                </div>
                <p className="text-sm sm:text-base text-gray-500 line-clamp-1">
                  {Headline}
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {skills?.slice(0, 3)?.map((skill: any, skillIndex: number) => (
                    <Badge key={skillIndex} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                  {skills?.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{skills.length - 3} Skills
                    </Badge>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 pt-1">
                  {professionalBio}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>

      {/* For Small/medium screen only */}
      <Link href={`/experts/${Username}`} className='block lg:hidden'>
        <Card className="group overflow-hidden transition-all hover:shadow-lg">
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col gap-4">
              {/* Header */}
              <div className="flex items-center gap-3">
                {/* Profile Image */}
                <div className="flex-shrink-0">
                  {ProfileImage ? (
                    <Image
                      src={ProfileImage || "/placeholder.svg"}
                      alt={`${firstName} ${lastName}`}
                      width={56}
                      height={56}
                      className="rounded-full aspect-square object-cover w-14 h-14 ring-2 ring-background shadow-md"
                      priority
                    />
                  ) : (
                    <div className="rounded-full bg-gradient-to-br from-primary/20 to-primary/30 w-14 h-14 flex items-center justify-center ring-2 ring-background shadow-md">
                      <User className="w-8 h-8 text-primary" />
                    </div>
                  )}
                </div>

                {/* Name and Badges */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-base truncate">{`${firstName} ${lastName}`}</h3>
                    {Verified && (
                      <Badge variant="secondary" className="text-xs bg-green-100 text-orange-700 border-orange-200">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <Badge variant="secondary" className="text-xs px-1.5 py-0.5">
                      {ExpertType}
                    </Badge>
                    {COUNTRY_SHORTCODE[Country] && (
                      <div className="flex items-center text-xs text-muted-foreground">
                        <MapPin className="w-3 h-3 mr-1" />
                        {COUNTRY_SHORTCODE[Country]}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-2">
                {/* Headline */}
                {Headline && <p className="text-sm font-medium text-foreground line-clamp-1">{Headline}</p>}

                {/* Bio */}
                {professionalBio && <p className="text-sm text-muted-foreground line-clamp-2">{professionalBio}</p>}

                {/* Skills */}
                {skills?.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {skills.slice(0, 3).map((skill:string, index:number) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="text-xs px-2 py-0.5 bg-primary/5 text-gray-600"
                      >
                        {skill}
                      </Badge>
                    ))}
                    {skills.length > 3 && (
                      <Badge variant="outline" className="text-xs px-2 py-0.5 bg-primary/5 text-gray-600">
                        +{skills.length - 3} skills
                      </Badge>
                    )}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </>

  )
}
