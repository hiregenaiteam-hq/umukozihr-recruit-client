"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { useToast } from "@/hooks/use-toast";
import {
    ProfileHero,
    ProfileTabs,
    AccountOverview,
    UsageStats,
    ProfileSidebar,
    CandidatesHeader,
    CandidatesFilters,
    CandidateCard,
    EmptyCandidatesState
} from "@/components/profile";

interface UserData {
    id: string;
    email: string;
    username: string | null;
    full_name: string | null;
    company: string | null;
    job_title: string | null;
    is_active: boolean;
    is_verified: boolean;
    is_premium: boolean;
    subscription_tier: string;
    monthly_search_limit: number;
    monthly_searches_used: number;
    created_at: string;
}

interface Candidate {
    id: number;
    full_name: string;
    headline: string;
    linkedin_url: string;
    picture_url: string | null;
    primary_professional_email: string | null;
    location_full: string;
    location_country: string;
    active_experience_title: string;
    inferred_skills: string[];
    total_experience_duration_months: number;
    is_working: boolean;
    relevance_score: number;
    skill_match_score: number;
    experience_score: number;
    location_score: number;
    matched_skills: string[];
    missing_skills: string[];
    experience: Array<{
        active_experience: boolean;
        position_title: string;
        company_name: string;
        company_industry: string | null;
        date_from: string;
        date_to: string | null;
        duration_months: number;
    }>;
    education: Array<{
        degree: string;
        institution_name: string;
        date_from_year: number;
        date_to_year: number | null;
    }>;
    certification_details: Array<{
        title: string;
        issuer: string;
        date_from: string;
    }>;
    isBookmarked?: boolean;
    isLiked?: boolean;
    notes?: string;
    lastContacted?: string;
    status?: 'new' | 'contacted' | 'interviewed' | 'hired' | 'rejected';
}

export default function UserProfilePage() {
    const [user, setUser] = useState<UserData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'profile' | 'candidates'>('profile');
    const [candidates, setCandidates] = useState<Candidate[]>([]);
    const [filteredCandidates, setFilteredCandidates] = useState<Candidate[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [showFilters, setShowFilters] = useState(false);
    const router = useRouter();
    const { toast } = useToast();

    useEffect(() => {
        const loadUserData = () => {
            try {
                const storedUserData = localStorage.getItem('user_data');
                if (storedUserData) {
                    const userData = JSON.parse(storedUserData);
                    setUser(userData);
                } else {
                    router.push('/auth');
                }
            } catch (error) {
                console.error("Failed to load user data:", error);
                router.push('/auth');
            } finally {
                setIsLoading(false);
            }
        };

        loadUserData();
    }, [router]);

    useEffect(() => {
        const loadCandidates = () => {
            try {
                const storedResults = localStorage.getItem('searchResults');
                if (storedResults) {
                    const searchData = JSON.parse(storedResults);
                    const candidatesWithManagement = searchData.results.map((candidate: Candidate) => ({
                        ...candidate,
                        isBookmarked: false,
                        isLiked: false,
                        notes: '',
                        lastContacted: null,
                        status: 'new' as const
                    }));
                    setCandidates(candidatesWithManagement);
                    setFilteredCandidates(candidatesWithManagement);
                }
            } catch (error) {
                console.error("Failed to load candidates:", error);
            }
        };

        loadCandidates();
    }, []);

    useEffect(() => {
        let filtered = candidates;

        if (searchTerm) {
            filtered = filtered.filter(candidate =>
                candidate.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                candidate.headline.toLowerCase().includes(searchTerm.toLowerCase()) ||
                candidate.active_experience_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                candidate.location_full.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (statusFilter !== 'all') {
            filtered = filtered.filter(candidate => candidate.status === statusFilter);
        }

        setFilteredCandidates(filtered);
    }, [candidates, searchTerm, statusFilter]);

    const handleLogout = () => {
        localStorage.removeItem('user_data');
        localStorage.removeItem('searchResults');
        localStorage.removeItem('searchCriteria');
        document.cookie = 'hg_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        document.cookie = 'access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        document.cookie = 'refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        document.cookie = 'session_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        router.push('/auth');
    };

    const handleBookmark = (candidateId: number) => {
        setCandidates(prev => prev.map(candidate =>
            candidate.id === candidateId
                ? { ...candidate, isBookmarked: !candidate.isBookmarked }
                : candidate
        ));
        toast({
            title: "Bookmark updated",
            description: "Candidate bookmark status has been updated.",
        });
    };

    const handleLike = (candidateId: number) => {
        setCandidates(prev => prev.map(candidate =>
            candidate.id === candidateId
                ? { ...candidate, isLiked: !candidate.isLiked }
                : candidate
        ));
        toast({
            title: "Like updated",
            description: "Candidate like status has been updated.",
        });
    };

    const handleStatusChange = (candidateId: number, newStatus: string) => {
        setCandidates(prev => prev.map(candidate =>
            candidate.id === candidateId
                ? { ...candidate, status: newStatus as any }
                : candidate
        ));
        toast({
            title: "Status updated",
            description: `Candidate status changed to ${newStatus}.`,
        });
    };

    const handleContact = (candidateId: number) => {
        setCandidates(prev => prev.map(candidate =>
            candidate.id === candidateId
                ? { ...candidate, lastContacted: new Date().toISOString(), status: 'contacted' as any }
                : candidate
        ));
        toast({
            title: "Contact initiated",
            description: "You've started a conversation with this candidate.",
        });
    };

    const handleClearFilters = () => {
        setSearchTerm('');
        setStatusFilter('all');
        setShowFilters(false);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-umukozi-orange/10">
                <Navbar />
                <div className="flex items-center justify-center min-h-[60vh]">
                    <div className="text-center">
                        <div className="w-16 h-16 border-4 border-umukozi-orange border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-slate-600 font-inter">Loading your profile...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (!user) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-umukozi-orange/10">
            <Navbar />

            {/* Hero Section */}
            <ProfileHero
                user={user}
                onNewSearch={() => router.push('/search')}
                onEditProfile={() => { }}
                onLogout={handleLogout}
            />

            {/* Tab Navigation */}
            <ProfileTabs
                activeTab={activeTab}
                onTabChange={setActiveTab}
                candidatesCount={candidates.length}
            />

            <main className="max-w-7xl mx-auto px-6 py-8">
                {/* Profile Tab */}
                {activeTab === 'profile' && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-8">
                            <AccountOverview user={user} />
                            <UsageStats user={user} candidatesCount={candidates.length} />
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            <ProfileSidebar
                                user={user}
                                onNewSearch={() => router.push('/search')}
                                onViewCandidates={() => setActiveTab('candidates')}
                                onSettings={() => router.push('/settings')}
                            />
                        </div>
                    </div>
                )}

                {/* Candidates Tab */}
                {activeTab === 'candidates' && (
                    <div className="space-y-6">
                        <CandidatesHeader
                            totalCandidates={candidates.length}
                            filteredCandidates={filteredCandidates.length}
                            viewMode={viewMode}
                            onViewModeChange={setViewMode}
                            showFilters={showFilters}
                            onToggleFilters={() => setShowFilters(!showFilters)}
                        />

                        <CandidatesFilters
                            searchTerm={searchTerm}
                            onSearchChange={setSearchTerm}
                            statusFilter={statusFilter}
                            onStatusChange={setStatusFilter}
                            showFilters={showFilters}
                            onClearFilters={handleClearFilters}
                        />

                        {filteredCandidates.length === 0 ? (
                            <EmptyCandidatesState
                                hasCandidates={candidates.length > 0}
                                onStartSearch={() => router.push('/search')}
                            />
                        ) : (
                            <div className={viewMode === 'grid'
                                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                                : "space-y-4"
                            }>
                                {filteredCandidates.map((candidate) => (
                                    <CandidateCard
                                        key={candidate.id}
                                        candidate={candidate}
                                        viewMode={viewMode}
                                        onBookmark={handleBookmark}
                                        onLike={handleLike}
                                        onStatusChange={handleStatusChange}
                                        onContact={handleContact}
                                        onViewProfile={(id) => router.push(`/profile/${id}`)}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
}