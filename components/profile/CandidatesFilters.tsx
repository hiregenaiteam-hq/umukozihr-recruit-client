"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface CandidatesFiltersProps {
    searchTerm: string;
    onSearchChange: (term: string) => void;
    statusFilter: string;
    onStatusChange: (status: string) => void;
    showFilters: boolean;
    onClearFilters: () => void;
}

export default function CandidatesFilters({
    searchTerm,
    onSearchChange,
    statusFilter,
    onStatusChange,
    showFilters,
    onClearFilters
}: CandidatesFiltersProps) {
    if (!showFilters) return null;

    return (
        <Card className="p-6 border-0 shadow-lg bg-gradient-to-r from-slate-50 to-white">
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                    <Input
                        placeholder="Search candidates by name, title, or location..."
                        value={searchTerm}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="w-full"
                    />
                </div>
                <div className="flex items-center gap-3">
                    <select
                        value={statusFilter}
                        onChange={(e) => onStatusChange(e.target.value)}
                        className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium bg-white focus:ring-2 focus:ring-umukozi-orange/20 focus:border-umukozi-orange"
                    >
                        <option value="all">All Status</option>
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="interviewed">Interviewed</option>
                        <option value="hired">Hired</option>
                        <option value="rejected">Rejected</option>
                    </select>
                    <Button
                        onClick={onClearFilters}
                        variant="outline"
                        size="sm"
                        className="text-slate-600 hover:text-slate-900"
                    >
                        <X className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </Card>
    );
}
