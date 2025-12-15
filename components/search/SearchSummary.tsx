import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { useState } from 'react'

interface SearchSummaryProps {
    jobTitles: string[]
    skills: string[]
    expMin: number
    expMax: number
    location: string
    educations: string[]
    industries: string[]
    onEditSection: (section: string) => void
}

export function SearchSummary({
    jobTitles,
    skills,
    expMin,
    expMax,
    location,
    educations,
    industries,
    onEditSection
}: SearchSummaryProps) {
    const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['job-position']))

    const toggleSection = (section: string) => {
        if (expandedSections.has(section)) {
            // If clicking on an already open section, close it
            setExpandedSections(new Set())
        } else {
            // If clicking on a closed section, close all others and open only this one
            setExpandedSections(new Set([section]))
        }
    }

    const sections = [
        {
            id: 'job-position',
            title: 'Job Position',
            content: (
                <div className="space-y-4">
                    {jobTitles.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                            {jobTitles.map((title, index) => (
                                <Badge key={index} variant="secondary" className="bg-umukozi-orange/10 text-umukozi-orange border-umukozi-orange/20">
                                    {title}
                                </Badge>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 italic">No job positions selected</p>
                    )}
                </div>
            )
        },
        {
            id: 'requirements',
            title: 'Requirements',
            content: (
                <div className="space-y-6">
                    <div className="space-y-3">
                        <h4 className="font-semibold text-gray-700">Experience Range</h4>
                        <div className="bg-white rounded-lg p-4 border border-gray-200">
                            <span className="text-lg font-bold text-gray-900">{expMin} - {expMax} years</span>
                            <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
                                <div
                                    className="bg-umukozi-orange h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${((expMax - expMin) / 30) * 100}%` }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <h4 className="font-semibold text-gray-700">Education Levels</h4>
                        {educations.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                                {educations.map((edu, index) => (
                                    <Badge key={index} variant="secondary" className="bg-umukozi-orange/10 text-umukozi-orange border-umukozi-orange/20">
                                        {edu}
                                    </Badge>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 italic">No education requirements</p>
                        )}
                    </div>

                    <div className="space-y-3">
                        <h4 className="font-semibold text-gray-700">Required Skills</h4>
                        {skills.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                                {skills.map((skill, index) => (
                                    <Badge key={index} variant="secondary" className="bg-umukozi-orange/10 text-umukozi-orange border-umukozi-orange/20">
                                        {skill}
                                    </Badge>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 italic">No skills specified</p>
                        )}
                    </div>
                </div>
            )
        },
        {
            id: 'location-industry',
            title: 'Location & Industry',
            content: (
                <div className="space-y-6">
                    <div className="space-y-3">
                        <h4 className="font-semibold text-gray-700">Work Location</h4>
                        <div className="bg-white rounded-lg p-4 border border-gray-200">
                            <span className="font-medium text-gray-900">{location || 'Not specified'}</span>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <h4 className="font-semibold text-gray-700">Industries</h4>
                        {industries.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                                {industries.map((industry, index) => (
                                    <Badge key={index} variant="secondary" className="bg-umukozi-orange/10 text-umukozi-orange border-umukozi-orange/20">
                                        {industry}
                                    </Badge>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 italic">No industries specified</p>
                        )}
                    </div>
                </div>
            )
        }
    ]

    return (
        <div className="space-y-6">
            {sections.map((section) => {
                const isExpanded = expandedSections.has(section.id)

                return (
                    <Card key={section.id} className={`overflow-hidden border border-gray-200 shadow-sm transition-all duration-300 ${isExpanded
                        ? 'shadow-md'
                        : 'hover:shadow-md'
                        }`}>
                        <CardHeader
                            className="cursor-pointer transition-all duration-300 py-6 bg-white hover:bg-gray-50"
                            onClick={() => toggleSection(section.id)}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${isExpanded
                                        ? 'bg-umukozi-orange'
                                        : 'bg-gray-300'
                                        }`}></div>
                                    <CardTitle className="text-xl font-bold text-gray-900">
                                        {section.title}
                                    </CardTitle>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            onEditSection(section.id)
                                        }}
                                        className="text-umukozi-orange hover:text-umukozi-orange hover:bg-umukozi-orange/10 transition-all duration-200"
                                    >
                                        Edit Details
                                    </Button>
                                    <div className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : 'rotate-0'
                                        }`}>
                                        <ChevronDown className="w-5 h-5 text-gray-500" />
                                    </div>
                                </div>
                            </div>
                        </CardHeader>

                        {isExpanded && (
                            <CardContent className="pt-0 pb-6 px-6 bg-gray-50">
                                <div className="space-y-6">
                                    {section.content}
                                </div>
                            </CardContent>
                        )}
                    </Card>
                )
            })}
        </div>
    )
}
