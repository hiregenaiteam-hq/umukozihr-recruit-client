import React, { useState, useEffect, useRef, useMemo } from "react"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { X, MapPin, Search } from "lucide-react"
import { useCountries, Country } from "@/hooks/useCountries"
import { useCities } from "@/hooks/useCities"
import { City } from "@/lib/constants/cities"

interface LocationAutocompleteProps {
    value: string
    onChange: (value: string) => void
    placeholder?: string
    label?: string
}

export const LocationAutocomplete: React.FC<LocationAutocompleteProps> = ({
    value,
    onChange,
    placeholder = "Search for a country or city...",
    label = "Work Location"
}) => {
    const [query, setQuery] = useState("")
    const [open, setOpen] = useState(false)
    const [selectedType, setSelectedType] = useState<'country' | 'city' | null>(null)
    const wrapperRef = useRef<HTMLDivElement | null>(null)

    // Use custom hooks
    const { countries, loading: countriesLoading, error: countriesError } = useCountries()
    const { cities, loading: citiesLoading, error: citiesError, fetchCities, clearCities } = useCities()

    // Update query when external value changes
    useEffect(() => {
        setQuery(value)
    }, [value])

    // Combined loading state
    const loading = countriesLoading || citiesLoading


    // Filter countries and cities based on query
    const filteredCountries = useMemo(() => {
        if (!query) return countries
        return countries
            .filter(country =>
                country.name.common.toLowerCase().includes(query.toLowerCase()) ||
                country.name.official.toLowerCase().includes(query.toLowerCase())
            )
    }, [countries, query])

    const filteredCities = useMemo(() => {
        if (!query) return cities
        return cities
            .filter(city =>
                city.name.toLowerCase().includes(query.toLowerCase()) ||
                city.country.toLowerCase().includes(query.toLowerCase())
            )
    }, [cities, query])

    // Close dropdown when clicking outside
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

    const handleCountrySelect = (country: Country) => {
        setSelectedType('country')
        setQuery(country.name.common)
        onChange(country.name.common)
        // Keep dropdown open and fetch cities
        fetchCities(country.name.common)
        // Don't close the dropdown - let user see cities
    }

    const handleCitySelect = (city: City) => {
        setSelectedType('city')
        setQuery(`${city.name}, ${city.country}`)
        onChange(`${city.name}, ${city.country}`)
        setOpen(false)
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setQuery(value)
        onChange(value)
        setOpen(true)
    }

    const clearValue = () => {
        setQuery("")
        onChange("")
        setSelectedType(null)
        clearCities()
    }

    return (
        <div className="space-y-3" ref={wrapperRef}>
            <Label className="text-sm font-semibold text-slate-600">{label}</Label>

            <div className="relative">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        value={query}
                        onChange={handleInputChange}
                        onFocus={() => setOpen(true)}
                        placeholder={placeholder}
                        className="w-full h-16 pl-12 pr-12 text-lg border-2 border-gray-200 rounded-2xl focus:border-umukozi-orange focus:ring-4 focus:ring-umukozi-orange/20 transition-all duration-300 shadow-sm hover:shadow-md hover:border-umukozi-orange/50"
                    />
                    {query && (
                        <button
                            onClick={clearValue}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    )}
                </div>

                {open && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg max-h-96 overflow-y-auto z-[9999]">
                        {loading ? (
                            <div className="p-4 text-center text-gray-500">
                                <div className="w-6 h-6 border-2 border-umukozi-orange/30 border-t-umukozi-orange rounded-full animate-spin mx-auto mb-2"></div>
                                Loading...
                            </div>
                        ) : countriesError ? (
                            <div className="p-4 text-center text-red-500">
                                <div className="text-sm">Failed to load countries. Please try again.</div>
                                <button
                                    onClick={() => window.location.reload()}
                                    className="mt-2 text-umukozi-orange hover:underline"
                                >
                                    Retry
                                </button>
                            </div>
                        ) : (
                            <div className="p-3">
                                {/* Countries Section */}
                                {filteredCountries.length > 0 && (
                                    <div className="mb-4">
                                        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 px-2">
                                            Countries
                                        </div>
                                        {filteredCountries.map((country) => (
                                            <button
                                                key={country.cca3}
                                                onClick={() => handleCountrySelect(country)}
                                                className="w-full text-left p-3 hover:bg-umukozi-orange hover:text-white rounded-md flex items-center gap-3 transition-colors duration-200 group"
                                                type="button"
                                            >
                                                <span className="text-2xl">{country.flag}</span>
                                                <div className="flex-1">
                                                    <div className="font-medium group-hover:text-white transition-colors duration-200">
                                                        {country.name.common}
                                                    </div>
                                                    <div className="text-sm text-gray-500 group-hover:text-white/80 transition-colors duration-200">
                                                        {country.name.official}
                                                    </div>
                                                </div>
                                                <div className="text-xs text-gray-400 group-hover:text-white/60">
                                                    Click to see cities
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                )}

                                {/* Cities Section */}
                                {citiesLoading && selectedType === 'country' && (
                                    <div className="mb-4">
                                        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 px-2">
                                            Loading cities...
                                        </div>
                                        <div className="p-4 text-center text-gray-500">
                                            <div className="w-4 h-4 border-2 border-umukozi-orange/30 border-t-umukozi-orange rounded-full animate-spin mx-auto mb-2"></div>
                                            <div className="text-sm">Fetching cities for selected country</div>
                                        </div>
                                    </div>
                                )}

                                {filteredCities.length > 0 && (
                                    <div>
                                        <div className="flex items-center justify-between mb-2 px-2">
                                            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                                                Cities in {query}
                                            </div>
                                            <button
                                                onClick={() => {
                                                    setSelectedType(null)
                                                    clearCities()
                                                    setQuery("")
                                                }}
                                                className="text-xs text-umukozi-orange hover:text-umukozi-orange-dark transition-colors"
                                                type="button"
                                            >
                                                ← Back to countries
                                            </button>
                                        </div>
                                        {filteredCities.map((city, index) => (
                                            <button
                                                key={`${city.name}-${city.country}-${index}`}
                                                onClick={() => handleCitySelect(city)}
                                                className="w-full text-left p-3 hover:bg-umukozi-orange hover:text-white rounded-md flex items-center gap-3 transition-colors duration-200 group"
                                                type="button"
                                            >
                                                <MapPin className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-200" />
                                                <div className="flex-1">
                                                    <div className="font-medium group-hover:text-white transition-colors duration-200">
                                                        {city.name}
                                                    </div>
                                                    <div className="text-sm text-gray-500 group-hover:text-white/80 transition-colors duration-200">
                                                        {city.country}
                                                        {city.state && `, ${city.state}`}
                                                    </div>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                )}

                                {filteredCountries.length === 0 && filteredCities.length === 0 && !loading && (
                                    <div className="p-4 text-gray-500 text-center">
                                        No locations found
                                    </div>
                                )}

                                {/* Results count indicator */}
                                {(filteredCountries.length > 0 || filteredCities.length > 0) && !loading && (
                                    <div className="px-3 py-2 text-xs text-gray-500 border-t border-gray-100 bg-gray-50">
                                        {filteredCountries.length > 0 && filteredCities.length > 0 && (
                                            <span>
                                                {filteredCountries.length} countries, {filteredCities.length} cities
                                            </span>
                                        )}
                                        {filteredCountries.length > 0 && filteredCities.length === 0 && (
                                            <span>{filteredCountries.length} countries</span>
                                        )}
                                        {filteredCountries.length === 0 && filteredCities.length > 0 && (
                                            <span>{filteredCities.length} cities</span>
                                        )}
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
