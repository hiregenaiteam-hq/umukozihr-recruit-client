"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { ClarificationValues } from "@/lib/types"
import { 
  MessageCircle, 
  MapPin, 
  Briefcase, 
  Clock,
  Sparkles,
  ArrowRight,
  X
} from "lucide-react"

interface ClarificationDialogProps {
  isOpen: boolean
  onClose: () => void
  missingFields: string[]
  clarificationPrompt: string
  onSubmit: (values: ClarificationValues) => void
}

const FIELD_CONFIG = {
  job_title: {
    icon: Briefcase,
    label: "Job Title",
    placeholder: "e.g., Software Engineer, Head of Sales, Product Manager",
    examples: ["Software Engineer", "Sales Executive", "Product Manager", "Data Analyst"]
  },
  location: {
    icon: MapPin,
    label: "Location",
    placeholder: "e.g., Ghana, Lagos Nigeria, Remote",
    examples: ["Ghana", "Lagos, Nigeria", "Kenya", "Remote/Global"]
  },
  "experience (years or level)": {
    icon: Clock,
    label: "Experience Level",
    placeholder: "e.g., 5+ years, Senior, Entry-level",
    examples: ["5+ years", "Senior level", "3-5 years", "Entry-level"]
  }
}

export default function ClarificationDialog({
  isOpen,
  onClose,
  missingFields,
  clarificationPrompt,
  onSubmit
}: ClarificationDialogProps) {
  const [values, setValues] = useState<ClarificationValues>({})
  
  if (!isOpen) return null

  const handleSubmit = () => {
    onSubmit(values)
  }

  const canSubmit = () => {
    // Check if at least one value is filled
    return Object.values(values).some(v => v && v.trim().length > 0)
  }

  const getFieldKey = (field: string): keyof ClarificationValues => {
    if (field.includes("job_title")) return "job_title"
    if (field.includes("location")) return "location"
    if (field.includes("experience")) return "experience"
    return "job_title"
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Dialog */}
      <Card className="relative z-10 w-full max-w-2xl mx-4 p-0 overflow-hidden shadow-2xl border-0">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 text-white">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Let's refine your search</h2>
                <p className="text-orange-100 text-sm mt-1">
                  A few more details will help us find better matches
                </p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="text-white/80 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Clarification Message */}
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
              <p className="text-slate-700 text-sm leading-relaxed">
                {clarificationPrompt || "I'd love to help you find the perfect candidate! Please provide a few more details."}
              </p>
            </div>
          </div>

          {/* Input Fields */}
          <div className="space-y-4">
            {missingFields.map((field) => {
              const config = FIELD_CONFIG[field as keyof typeof FIELD_CONFIG] || {
                icon: Briefcase,
                label: field,
                placeholder: `Enter ${field}`,
                examples: []
              }
              const Icon = config.icon
              const fieldKey = getFieldKey(field)

              return (
                <div key={field} className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                    <Icon className="w-4 h-4 text-orange-500" />
                    {config.label}
                  </label>
                  <Input
                    value={values[fieldKey] || ""}
                    onChange={(e) => setValues({ ...values, [fieldKey]: e.target.value })}
                    placeholder={config.placeholder}
                    className="h-12 text-base border-slate-200 focus:border-orange-500 focus:ring-orange-500"
                  />
                  {/* Quick suggestions */}
                  {config.examples.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {config.examples.map((example) => (
                        <button
                          key={example}
                          onClick={() => setValues({ ...values, [fieldKey]: example })}
                          className="px-3 py-1.5 text-xs font-medium rounded-full bg-slate-100 text-slate-600 hover:bg-orange-100 hover:text-orange-700 transition-colors"
                        >
                          {example}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-200 p-6 bg-slate-50 flex items-center justify-between">
          <button
            onClick={onClose}
            className="text-slate-600 hover:text-slate-800 text-sm font-medium transition-colors"
          >
            Cancel
          </button>
          <Button
            onClick={handleSubmit}
            disabled={!canSubmit()}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6"
          >
            Search with Details
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </Card>
    </div>
  )
}
