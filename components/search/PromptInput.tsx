"use client"

import * as React from "react"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Search, Zap, Clock, Settings2, Globe, Cpu, RefreshCw } from "lucide-react"

// Search options type
export interface SearchOptions {
  searchType: "auto" | "neural" | "keyword"
  sourceCategory: "personal site" | "github" | "company" | "linkedin"
  useLivecrawl: boolean
}

interface PromptInputProps {
  value: string
  onChange: (value: string) => void
  deepResearch: boolean
  onDeepResearchChange: (enabled: boolean) => void
  searchOptions: SearchOptions
  onSearchOptionsChange: (options: SearchOptions) => void
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

const searchTypeOptions = [
  { value: "auto", label: "Auto", description: "AI chooses best method" },
  { value: "neural", label: "Neural", description: "Semantic understanding" },
  { value: "keyword", label: "Keyword", description: "Exact matching" },
] as const

const sourceCategoryOptions = [
  { value: "personal site", label: "Portfolios", description: "Personal websites & portfolios" },
  { value: "github", label: "GitHub", description: "Developer profiles" },
  { value: "linkedin", label: "LinkedIn", description: "Professional profiles" },
  { value: "company", label: "Company", description: "Company pages" },
] as const

export function PromptInput({
  value,
  onChange,
  deepResearch,
  onDeepResearchChange,
  searchOptions,
  onSearchOptionsChange,
  disabled = false,
  placeholder = "Describe who you're looking for...\n\nExample: 'Find me a senior software engineer in Kenya with 5+ years of Python experience, preferably with fintech or startup background'",
}: PromptInputProps) {
  const [charCount, setCharCount] = React.useState(0)
  const [showAdvanced, setShowAdvanced] = React.useState(false)
  
  React.useEffect(() => {
    setCharCount(value.length)
  }, [value])
  
  const handleExampleClick = (example: string) => {
    if (!disabled) {
      onChange(example)
    }
  }
  
  const updateOption = <K extends keyof SearchOptions>(key: K, val: SearchOptions[K]) => {
    onSearchOptionsChange({ ...searchOptions, [key]: val })
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
      
      {/* Search Settings */}
      <Card className="border-slate-200">
        <CardContent className="pt-4">
          {/* Toggle Advanced Settings */}
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center justify-between w-full text-left"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-slate-100">
                <Settings2 className="h-4 w-4 text-slate-600" />
              </div>
              <div>
                <Label className="font-medium cursor-pointer">Search Settings</Label>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Customize how we find candidates
                </p>
              </div>
            </div>
            <span className="text-xs text-slate-500">
              {showAdvanced ? "Hide" : "Show"}
            </span>
          </button>
          
          {showAdvanced && (
            <div className="mt-4 pt-4 border-t border-slate-100 space-y-4">
              {/* Search Type */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Cpu className="h-3.5 w-3.5 text-slate-500" />
                  <Label className="text-sm">Search Method</Label>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {searchTypeOptions.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => updateOption("searchType", opt.value)}
                      disabled={disabled}
                      className={`p-2 rounded-lg border text-left transition-all ${
                        searchOptions.searchType === opt.value
                          ? "border-umukozi-orange bg-umukozi-orange/5"
                          : "border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <div className="text-xs font-medium">{opt.label}</div>
                      <div className="text-[10px] text-muted-foreground">{opt.description}</div>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Source Category */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Globe className="h-3.5 w-3.5 text-slate-500" />
                  <Label className="text-sm">Source Type</Label>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {sourceCategoryOptions.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => updateOption("sourceCategory", opt.value)}
                      disabled={disabled}
                      className={`p-2 rounded-lg border text-left transition-all ${
                        searchOptions.sourceCategory === opt.value
                          ? "border-umukozi-orange bg-umukozi-orange/5"
                          : "border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <div className="text-xs font-medium">{opt.label}</div>
                      <div className="text-[10px] text-muted-foreground">{opt.description}</div>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Fresh Results Toggle */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <RefreshCw className="h-3.5 w-3.5 text-slate-500" />
                  <div>
                    <Label className="text-sm">Fresh Results</Label>
                    <p className="text-[10px] text-muted-foreground">Get the latest profiles (slower)</p>
                  </div>
                </div>
                <Switch
                  checked={searchOptions.useLivecrawl}
                  onCheckedChange={(v) => updateOption("useLivecrawl", v)}
                  disabled={disabled}
                />
              </div>
            </div>
          )}
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
