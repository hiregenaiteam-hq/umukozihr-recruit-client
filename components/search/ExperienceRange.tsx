import React, { useState, useEffect } from "react"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Plus, Minus } from "lucide-react"
import { EXPERIENCE_PRESETS, EXPERIENCE_RANGE } from "@/lib/constants"

interface ExperienceRangeProps {
    min: number
    max: number
    onMinChange: (value: number) => void
    onMaxChange: (value: number) => void
}

export const ExperienceRange: React.FC<ExperienceRangeProps> = ({
    min,
    max,
    onMinChange,
    onMaxChange
}) => {
    const [minInput, setMinInput] = useState(min.toString())
    const [maxInput, setMaxInput] = useState(max.toString())

    // Update input values when props change
    useEffect(() => {
        setMinInput(min.toString())
    }, [min])

    useEffect(() => {
        setMaxInput(max.toString())
    }, [max])
    const handleMinChange = (value: number) => {
        const newMin = Math.min(value, max)
        onMinChange(newMin)
    }

    const handleMaxChange = (value: number) => {
        const newMax = Math.max(value, min)
        onMaxChange(newMax)
    }

    const handleMinInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setMinInput(value)

        if (value === '') {
            return // Allow empty input temporarily
        }

        const numValue = Number(value)
        if (!isNaN(numValue) && numValue >= EXPERIENCE_RANGE.MIN && numValue <= EXPERIENCE_RANGE.MAX) {
            handleMinChange(numValue)
        }
    }

    const handleMaxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setMaxInput(value)

        if (value === '') {
            return // Allow empty input temporarily
        }

        const numValue = Number(value)
        if (!isNaN(numValue) && numValue >= EXPERIENCE_RANGE.MIN && numValue <= EXPERIENCE_RANGE.MAX) {
            handleMaxChange(numValue)
        }
    }

    const handleMinBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const value = e.target.value
        if (value === '' || isNaN(Number(value)) || Number(value) < EXPERIENCE_RANGE.MIN) {
            setMinInput(min.toString())
        }
    }

    const handleMaxBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const value = e.target.value
        if (value === '' || isNaN(Number(value)) || Number(value) < EXPERIENCE_RANGE.MIN) {
            setMaxInput(max.toString())
        }
    }

    return (
        <div className="space-y-6">
            <Label className="text-sm font-semibold text-slate-700 flex items-center gap-3">
                <TrendingUp className="w-5 h-5" />
                Experience Range
                <Badge variant="secondary" className="bg-umukozi-orange/10 text-umukozi-orange border-umukozi-orange/20">
                    {min} - {max} years
                </Badge>
            </Label>

            <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="space-y-8">
                    {/* Visual Range Display */}
                    <div className="relative">
                        <div className="flex justify-between text-sm text-slate-500 mb-3">
                            <span className="font-medium">{EXPERIENCE_RANGE.MIN} years</span>
                            <span className="font-medium">{EXPERIENCE_RANGE.MAX}+ years</span>
                        </div>
                        <div className="relative h-3 bg-slate-200 rounded-full shadow-inner">
                            <div
                                className="absolute h-3 bg-umukozi-orange rounded-full transition-all duration-500 shadow-sm"
                                style={{
                                    left: `${(min / EXPERIENCE_RANGE.MAX) * 100}%`,
                                    width: `${((max - min) / EXPERIENCE_RANGE.MAX) * 100}%`
                                }}
                            />
                        </div>
                        <div className="flex justify-between mt-4 text-sm text-slate-700">
                            <span className="font-bold bg-white px-3 py-1 rounded-lg shadow-sm">{min} years</span>
                            <span className="font-bold bg-white px-3 py-1 rounded-lg shadow-sm">{max} years</span>
                        </div>
                    </div>

                    {/* Input Controls */}
                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-3">
                            <Label className="text-sm font-semibold text-slate-600">Minimum</Label>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => handleMinChange(Math.max(EXPERIENCE_RANGE.MIN, min - 1))}
                                    className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center hover:bg-umukozi-orange hover:border-umukozi-orange transition-all duration-200 hover:scale-105 group"
                                    type="button"
                                >
                                    <Minus className="w-5 h-5 text-slate-500 group-hover:text-white transition-colors duration-200" />
                                </button>
                                <input
                                    type="number"
                                    min={EXPERIENCE_RANGE.MIN}
                                    max={EXPERIENCE_RANGE.MAX}
                                    value={minInput}
                                    onChange={handleMinInputChange}
                                    onBlur={handleMinBlur}
                                    className="w-28 px-4 py-4 text-center border-2 border-slate-200 rounded-2xl text-lg font-bold focus:outline-none focus:ring-4 focus:ring-umukozi-orange/20 focus:border-umukozi-orange shadow-sm hover:shadow-md transition-all duration-200"
                                />
                                <button
                                    onClick={() => handleMinChange(Math.min(EXPERIENCE_RANGE.MAX, min + 1))}
                                    className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center hover:bg-umukozi-orange hover:border-umukozi-orange transition-all duration-200 hover:scale-105 group"
                                    type="button"
                                >
                                    <Plus className="w-5 h-5 text-slate-500 group-hover:text-white transition-colors duration-200" />
                                </button>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <Label className="text-sm font-semibold text-slate-600">Maximum</Label>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => handleMaxChange(Math.max(EXPERIENCE_RANGE.MIN, max - 1))}
                                    className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center hover:bg-umukozi-orange hover:border-umukozi-orange transition-all duration-200 hover:scale-105 group"
                                    type="button"
                                >
                                    <Minus className="w-5 h-5 text-slate-500 group-hover:text-white transition-colors duration-200" />
                                </button>
                                <input
                                    type="number"
                                    min={EXPERIENCE_RANGE.MIN}
                                    max={EXPERIENCE_RANGE.MAX}
                                    value={maxInput}
                                    onChange={handleMaxInputChange}
                                    onBlur={handleMaxBlur}
                                    className="w-28 px-4 py-4 text-center border-2 border-umukozi-orange rounded-2xl text-lg font-bold focus:outline-none focus:ring-4 focus:ring-umukozi-orange/20 focus:border-umukozi-orange shadow-sm hover:shadow-md transition-all duration-200"
                                />
                                <button
                                    onClick={() => handleMaxChange(Math.min(EXPERIENCE_RANGE.MAX, max + 1))}
                                    className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center hover:bg-umukozi-orange hover:border-umukozi-orange transition-all duration-200 hover:scale-105 group"
                                    type="button"
                                >
                                    <Plus className="w-5 h-5 text-slate-500 group-hover:text-white transition-colors duration-200" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Quick Presets */}
                    <div className="space-y-3">
                        <Label className="text-sm font-semibold text-slate-600">Quick Presets</Label>
                        <div className="flex gap-3">
                            {EXPERIENCE_PRESETS.map((preset) => (
                                <button
                                    key={preset.label}
                                    onClick={() => {
                                        onMinChange(preset.min)
                                        onMaxChange(preset.max)
                                    }}
                                    className="px-5 py-3 text-sm font-bold text-white umukozi-btn-clean rounded-xl transition-all duration-300 hover:shadow-md flex-1"
                                    type="button"
                                >
                                    {preset.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
