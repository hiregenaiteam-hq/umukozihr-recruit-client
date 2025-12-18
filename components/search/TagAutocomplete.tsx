import React, { useMemo, useState, useRef, useEffect } from "react"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"

interface TagAutocompleteProps {
    label: string
    placeholder?: string
    suggestions: readonly string[]
    selected: string[]
    setSelected: (vals: string[]) => void
    emptyMessage?: string
}

// Fuzzy filter function
function fuzzyFilter(suggestions: readonly string[], query: string): string[] {
    if (!query) return suggestions.slice(0, 8)

    const lowerQuery = query.toLowerCase()
    return suggestions
        .filter(s => s.toLowerCase().includes(lowerQuery))
        .slice(0, 8)
}

// Remove duplicates
function uniq<T>(arr: T[]): T[] {
    return Array.from(new Set(arr))
}

export const TagAutocomplete: React.FC<TagAutocompleteProps> = ({
    label,
    placeholder,
    suggestions,
    selected,
    setSelected,
    emptyMessage = "No results",
}) => {
    const [query, setQuery] = useState("")
    const [open, setOpen] = useState(false)
    const filtered = useMemo(() => fuzzyFilter(suggestions, query), [suggestions, query])
    const inputRef = useRef<HTMLInputElement | null>(null)
    const wrapperRef = useRef<HTMLDivElement | null>(null)

    // open when there's input
    useEffect(() => {
        if (query) setOpen(true)
    }, [query])

    // close when clicking outside
    useEffect(() => {
        const onDocClick = (e: MouseEvent) => {
            if (!wrapperRef.current) return
            if (!(e.target instanceof Node)) return
            if (!wrapperRef.current.contains(e.target)) {
                setOpen(false)
            }
        }

        document.addEventListener("mousedown", onDocClick)
        return () => document.removeEventListener("mousedown", onDocClick)
    }, [])

    const onSelect = (value: string) => {
        setSelected(uniq([...selected, value]))
        setQuery("")
        setOpen(false)
        inputRef.current?.focus()
    }

    const onRemove = (value: string) => {
        setSelected(selected.filter((p) => p !== value))
    }

    return (
        <div className="group relative" ref={wrapperRef}>
            <Label className="text-sm font-medium text-slate-700 mb-3 block">
                {label}
            </Label>

            <div className="min-h-[70px] bg-white border border-gray-200 rounded-2xl p-6 flex flex-col gap-4 focus-within:border-umukozi-orange focus-within:ring-4 focus-within:ring-umukozi-orange/20 transition-all duration-300 shadow-sm hover:shadow-md">
                <div className="flex flex-wrap gap-2">
                    {selected.map((s) => (
                        <Badge
                            key={s}
                            variant="secondary"
                            className="flex items-center gap-2 px-3 py-1 bg-umukozi-orange/10 text-umukozi-orange border border-umukozi-orange/20 rounded-md"
                        >
                            <span className="text-sm font-semibold">{s}</span>
                            <button
                                aria-label={`Remove ${s}`}
                                onClick={() => onRemove(s)}
                                className="w-4 h-4 rounded-full flex items-center justify-center hover:bg-umukozi-orange/20"
                                type="button"
                            >
                                <X className="w-3 h-3 text-umukozi-orange hover:text-white transition-colors duration-200" />
                            </button>
                        </Badge>
                    ))}

                    <input
                        ref={inputRef}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onFocus={() => setOpen(true)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && query.trim()) {
                                const match = suggestions.find((s) => s.toLowerCase() === query.trim().toLowerCase())
                                onSelect(match || query.trim())
                                e.preventDefault()
                            }
                            if (e.key === "Escape") setOpen(false)
                        }}
                        placeholder={selected.length === 0 ? placeholder : "Add more..."}
                        className="bg-transparent outline-none flex-1 min-w-[120px] text-gray-700 placeholder:text-gray-400"
                        aria-label={label}
                        type="text"
                    />
                </div>

                {open && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto z-[9999]">
                        {filtered.length === 0 ? (
                            <div className="p-4 text-gray-500 text-center">{emptyMessage}</div>
                        ) : (
                            <div className="p-3">
                                {filtered.slice(0, 8).map((s) => (
                                    <button
                                        key={s}
                                        onClick={() => onSelect(s)}
                                        className="w-full text-left p-3 hover:bg-umukozi-orange hover:text-white rounded-md flex items-center gap-3 transition-colors duration-200"
                                        type="button"
                                    >
                                        <span className="hover:text-white transition-colors duration-200">{s}</span>
                                    </button>
                                ))}
                                {filtered.length > 8 && (
                                    <div className="p-3 text-sm text-gray-500 text-center border-t border-gray-100">
                                        Showing 8 of {filtered.length} results
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}
