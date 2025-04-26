'use client'

import { useCallback, useEffect, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Search, X, Filter, } from 'lucide-react'
import { Switch } from '@/components/ui/switch'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { updateFilters } from "@/redux/slice/experts/experts.slice"
import { useState } from 'react'
import debounce from 'lodash/debounce'
import { ExpertModel } from '../../models/airtable.model';

export default function ExpertsFilter() {
  // local state
  const [skillSearch, setSkillSearch] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const dispatch = useDispatch()
  const expertList = useSelector((state: RootState) => state.experts.expertsList)
  const filters = useSelector((state: RootState) => state.experts.filter)

  const getSkillList = useMemo(() => {
    const skillList = new Set<string>()
    if (!expertList?.length) return []

    expertList.forEach((expert: ExpertModel) => {
      expert.fields?.Skills?.forEach((skill: string) => {
        skillList.add(skill.trim())
      })
    })
    return Array.from(skillList)
  }, [expertList])

  const getLanguageList = useMemo(() => {
    const languageList = new Set<string>()
    if (!expertList?.length) return []

    expertList.forEach((expert) => {
      if (expert.fields?.Country) {
        languageList.add(expert.fields.Country.trim())
      }
    })
    return Array.from(languageList)
  }, [expertList])

  const getExpertTypeList = useMemo(() => {
    const expertTypeList = new Set<string>()
    if (!expertList?.length) return []

    expertList.forEach((expert) => {
      expert.fields?.ExpertType?.forEach((type: string) => {
        expertTypeList.add(type.trim())
      })
    })
    return Array.from(expertTypeList)
  }, [expertList])

  const filteredSkills = useMemo(() => {
    return getSkillList.filter(skill =>
      skill.toLowerCase().includes(skillSearch.toLowerCase())
    )
  }, [getSkillList, skillSearch])

  const handleSkillToggle = useCallback((skill: string) => {
    const updatedSkills = filters.selectedSkills.includes(skill)
      ? filters.selectedSkills.filter(s => s !== skill)
      : [...filters.selectedSkills, skill]
    dispatch(updateFilters({ selectedSkills: updatedSkills }))
  }, [dispatch, filters.selectedSkills])

  const handleLanguageToggle = useCallback((language: string) => {
    const updatedLanguages = filters.selectedLanguages.includes(language)
      ? filters.selectedLanguages.filter(l => l !== language)
      : [...filters.selectedLanguages, language]
    dispatch(updateFilters({ selectedLanguages: updatedLanguages }))
  }, [dispatch, filters.selectedLanguages])

  const handleExpertTypeToggle = useCallback((type: string) => {
    const updatedTypes = filters.selectedExpertTypes.includes(type)
      ? filters.selectedExpertTypes.filter(t => t !== type)
      : [...filters.selectedExpertTypes, type]
    dispatch(updateFilters({ selectedExpertTypes: updatedTypes }))
  }, [dispatch, filters.selectedExpertTypes])

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const toggleFilters = () => {
    setIsOpen(!isOpen)
    document.body.classList.toggle('filter-open', !isOpen)
  }

  return (
      <>
        {/* Mobile Trigger Button */}
        <div className="fixed bottom-4 right-4 z-50 lg:hidden">
          <button
            onClick={toggleFilters}
          className="rounded-full bg-DarkOrange text-white h-16 w-16 text-center shadow-xl"
          >
          {isOpen ? <X className="mx-auto h-8 w-h-8" /> : <Filter className="mx-auto  h-8 w-h-8" />}
          </button>
        </div>

        {/* Overlay */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={toggleFilters}
          />
        )}

        {/* Filters Container */}
        <div className={`
        fixed lg:sticky lg:top-4 z-50
        h-[85vh] md:h-auto 
        bg-background
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-y-0' : 'translate-y-full'} 
        lg:translate-y-0
        bottom-0 left-0 right-0
        lg:relative
        shadow-xl lg:shadow-none
        rounded-t-2xl lg:rounded-none
      `}>
        <Card className="h-full lg:h-auto rounded-t-2xl lg:rounded-lg lg:border lg:shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between lg:block  p-4 border-b sm:hidden ">
              <CardTitle className="text-lg">Filters</CardTitle>
            <X className="h-5 w-5 cursor-pointer lg:hidden" onClick={toggleFilters} />

            </CardHeader>

          <CardContent className="p-4 lg:p-6 space-y-6 overflow-y-auto">
              <div className="space-y-6">
                {/* Skills Section */}
                <div>
                  <h3 className="text-sm font-medium mb-3">Skills</h3>
                  <div className="relative mb-2">
                    <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4" />
                    <Input
                      placeholder="Search skills..."
                      value={skillSearch}
                      onChange={(e) => setSkillSearch(e.target.value)}
                      className="pl-8 h-9"
                    />
                  </div>
                  <ScrollArea className="h-[120px] sm:h-[180px]">
                    <div className="flex flex-wrap gap-2 pr-4">
                      {filteredSkills.map((skill, index) => (
                        <Badge
                          key={index}
                          variant={filters.selectedSkills.includes(skill) ? "default" : "outline"}
                          className="cursor-pointer"
                          onClick={() => handleSkillToggle(skill)}
                        >
                          {skill}
                          {filters.selectedSkills.includes(skill) && (
                            <X
                              className="ml-1 h-3 w-3"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleSkillToggle(skill)
                              }}
                            />
                          )}
                        </Badge>
                      ))}
                    </div>
                  </ScrollArea>
                </div>

                {/* Countries Section */}
                <div>
                  <h3 className="text-sm font-medium mb-3">Countries</h3>
                  <div className="flex flex-wrap gap-2">
                    {getLanguageList.map((language, index) => (
                      <Badge
                        key={index}
                        variant={filters.selectedLanguages.includes(language) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => handleLanguageToggle(language)}
                      >
                        {language}
                        {filters.selectedLanguages.includes(language) && (
                          <X
                            className="ml-1 h-3 w-3"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleLanguageToggle(language)
                            }}
                          />
                        )}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Expert Type Section */}
                <div>
                  <h3 className="text-sm font-medium mb-3">Expert Type</h3>
                  <div className="space-y-2">
                    {getExpertTypeList.map((type, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Checkbox
                          id={`expert-type-${index}`}
                          checked={filters.selectedExpertTypes.includes(type)}
                          onCheckedChange={() => handleExpertTypeToggle(type)}
                        />
                        <Label htmlFor={`expert-type-${index}`}>{type}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
  </>
  )
}

export const SearchBar = () => {
  const dispatch = useDispatch()
  const filters = useSelector((state: RootState) => state.experts.filter)

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      dispatch(updateFilters({ searchQuery: value }))
    }, 300),
    [dispatch]
  )

  return (
    <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0 mb-6">
      <div className="relative flex-grow">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search experts..."
          className="pl-10"
          onChange={(e) => debouncedSearch(e.target.value)}
        />
      </div>
      <div className="">
        <div className="flex items-center space-x-2">
          <Switch
            id="verified-filter"
            checked={filters.isVerified}
            onCheckedChange={(checked) => dispatch(updateFilters({ isVerified: checked }))}
          />
          <Label htmlFor="verified-filter" className=''>Verified only</Label>
        </div>
      </div>
    </div>
  )
}