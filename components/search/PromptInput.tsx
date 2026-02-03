"use client"

import * as React from "react"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Search, Zap, Clock } from "lucide-react"

interface PromptInputProps {
  value: string
  onChange: (value: string) => void
  deepResearch: boolean
  onDeepResearchChange: (enabled: boolean) => void
  disabled?: boolean
  placeholder?: string
}

const examplePrompts = [
  "Senior Python developer in Kenya with 5+ years experience",
  "Product Manager in Nairobi with fintech background",
  "Full-stack engineer in Lagos with React and Node.js skills",
  "Data Scientist in Ghana with machine learning expertise",
  "DevOps Engineer in East Africa with AWS certification",
]

export function PromptInput({
  value,
  onChange,
  deepResearch,
  onDeepResearchChange,
  disabled = false,
  placeholder = "Describe who you're looking for...\n\nExample: 'Find me a senior software engineer in Kenya with 5+ years of Python experience, preferably with fintech or startup background'",
}: PromptInputProps) {
  const [charCount, setCharCount] = React.useState(0)
  
  React.useEffect(() => {
    setCharCount(value.length)
  }, [value])
  
  const handleExampleClick = (example: string) => {
    if (!disabled) {
      onChange(example)
    }
  }
  
  return (
    <div className="space-y-4">
      <Card className="border-primary/20 bg-linear-to-br from-primary/5 to-transparent">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">AI-Powered Search</CardTitle>
          </div>
          <CardDescription>
            Describe your ideal candidate in natural language. Our AI will extract requirements and find matching profiles.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Prompt textarea */}
          <div className="space-y-2">
            <Label htmlFor="search-prompt" className="text-sm font-medium">
              Your Search Prompt
            </Label>
            <Textarea
              id="search-prompt"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              disabled={disabled}
              rows={6}
              className="resize-none bg-background/50 border-primary/20 focus:border-primary transition-colors"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{charCount} characters</span>
              <span className={charCount < 10 ? "text-destructive" : ""}>
                Min. 10 characters required
              </span>
            </div>
          </div>
          
          {/* Example prompts */}
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">Try an example:</Label>
            <div className="flex flex-wrap gap-2">
              {examplePrompts.slice(0, 3).map((example, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="cursor-pointer hover:bg-primary/10 transition-colors text-xs py-1"
                  onClick={() => handleExampleClick(example)}
                >
                  {example.length > 40 ? `${example.slice(0, 40)}...` : example}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Deep Research Toggle */}
      <Card className="border-amber-500/20">
        <CardContent className="pt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-amber-500/10">
                <Zap className="h-4 w-4 text-amber-500" />
              </div>
              <div>
                <Label htmlFor="deep-research" className="font-medium cursor-pointer">
                  Deep Research Mode
                </Label>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Uses advanced AI research for higher quality results
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {deepResearch && (
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>~2-3min</span>
                </div>
              )}
              <Switch
                id="deep-research"
                checked={deepResearch}
                onCheckedChange={onDeepResearchChange}
                disabled={disabled}
              />
            </div>
          </div>
          
          {deepResearch && (
            <div className="mt-3 p-2 rounded-md bg-amber-500/5 border border-amber-500/10">
              <p className="text-xs text-amber-700 dark:text-amber-300">
                <strong>Note:</strong> Deep research takes longer but provides more comprehensive candidate profiles with detailed background analysis.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Info box */}
      <div className="p-3 rounded-md bg-blue-500/5 border border-blue-500/10">
        <div className="flex items-start gap-2">
          <Search className="h-4 w-4 text-blue-500 mt-0.5 shrink-0" />
          <div className="text-xs text-blue-700 dark:text-blue-300">
            <strong>How it works:</strong>
            <ul className="mt-1 space-y-0.5 list-disc list-inside">
              <li>AI extracts job title, location, skills, and experience from your prompt</li>
              <li>Searches across portfolio sites, personal websites, and professional profiles</li>
              <li>Validates candidates against your requirements</li>
              <li>Scores willingness to join based on your company profile</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PromptInput
