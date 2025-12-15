"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Search } from "lucide-react";

interface EmptyCandidatesStateProps {
    hasCandidates: boolean;
    onStartSearch: () => void;
}

export default function EmptyCandidatesState({ hasCandidates, onStartSearch }: EmptyCandidatesStateProps) {
    return (
        <Card className="p-12 text-center border-0 shadow-lg bg-gradient-to-br from-slate-50 to-white">
            <div className="w-20 h-20 bg-umukozi-orange/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-10 h-10 text-umukozi-orange" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3 font-inter">
                {hasCandidates ? "No candidates found" : "No candidates yet"}
            </h3>
            <p className="text-slate-600 mb-8 font-inter max-w-md mx-auto">
                {hasCandidates
                    ? "Try adjusting your search or filter criteria to find more candidates."
                    : "Start a search to find candidates for your open positions and build your talent pipeline."
                }
            </p>
            <Button
                onClick={onStartSearch}
                className="bg-umukozi-orange hover:bg-umukozi-orange-dark text-white font-inter shadow-lg"
            >
                <Search className="w-5 h-5 mr-2" />
                Start New Search
            </Button>
        </Card>
    );
}
