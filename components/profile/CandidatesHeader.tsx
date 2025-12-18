"use client";

import { Button } from "@/components/ui/button";
import { Filter, Grid3X3, List } from "lucide-react";

interface CandidatesHeaderProps {
    totalCandidates: number;
    filteredCandidates: number;
    viewMode: 'grid' | 'list';
    onViewModeChange: (mode: 'grid' | 'list') => void;
    showFilters: boolean;
    onToggleFilters: () => void;
}

export default function CandidatesHeader({
    totalCandidates,
    filteredCandidates,
    viewMode,
    onViewModeChange,
    showFilters,
    onToggleFilters
}: CandidatesHeaderProps) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
                <h2 className="text-3xl font-bold text-slate-900 font-inter">My Candidates</h2>
                <p className="text-slate-600 mt-1 font-inter">
                    {filteredCandidates} of {totalCandidates} candidates
                </p>
            </div>
            <div className="flex items-center gap-3">
                <Button
                    onClick={onToggleFilters}
                    variant="outline"
                    className={`flex items-center gap-2 ${showFilters ? 'bg-umukozi-orange/10 border-umukozi-orange text-umukozi-orange' : ''}`}
                >
                    <Filter className="w-4 h-4" />
                    Filters
                </Button>
                <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden">
                    <Button
                        onClick={() => onViewModeChange('grid')}
                        variant={viewMode === 'grid' ? 'default' : 'ghost'}
                        size="sm"
                        className="rounded-none border-0"
                    >
                        <Grid3X3 className="w-4 h-4" />
                    </Button>
                    <Button
                        onClick={() => onViewModeChange('list')}
                        variant={viewMode === 'list' ? 'default' : 'ghost'}
                        size="sm"
                        className="rounded-none border-0"
                    >
                        <List className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
