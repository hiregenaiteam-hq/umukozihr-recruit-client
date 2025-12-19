"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import BrandLogo from "@/components/BrandLogo";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  email: string;
  full_name: string | null;
  username: string | null;
  company: string | null;
  job_title: string | null;
  subscription_tier?: string;
  monthly_search_limit?: number;
  monthly_searches_used?: number;
}

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadUserData = () => {
      try {
        const storedUserData = localStorage.getItem('user_data');
        if (storedUserData) {
          const userData = JSON.parse(storedUserData);
          setUser(userData);
        }
      } catch (error) {
        console.error("Failed to load user data from localStorage:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserData();
  }, []);

  const getUserInitials = (user: User | null) => {
    if (!user) return "U";

    if (user.full_name && user.full_name.trim()) {
      const names = user.full_name.trim().split(" ").filter(name => name.length > 0);
      if (names.length >= 2) {
        return (names[0][0] + names[names.length - 1][0]).toUpperCase();
      }
      if (names.length === 1) {
        return names[0][0].toUpperCase();
      }
    }

    if (user.username && user.username.trim()) {
      return user.username.substring(0, 2).toUpperCase();
    }

    if (user.email && user.email.trim()) {
      return user.email.substring(0, 2).toUpperCase();
    }

    return "U";
  };

  const getTierBadgeColor = (tier?: string) => {
    switch (tier?.toLowerCase()) {
      case "business":
        return "bg-purple-500 text-white";
      case "pro":
        return "bg-blue-500 text-white";
      default:
        return "bg-slate-200 text-slate-700";
    }
  };

  const handleProfileClick = () => {
    // Navigate to user profile page
    router.push('/profile');
  };
  return (
    <header className="bg-linear-to-r from-white via-slate-50/95 to-white backdrop-blur-xl border-b border-slate-200/50 sticky top-0 z-50 shadow-lg shadow-umukozi-orange/5">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <Link href="/search" className="group cursor-pointer transition-all duration-300 hover:scale-105">
          <BrandLogo size="md" />
        </Link>
        <div className="flex items-center gap-4">
          {user?.subscription_tier && (
            <Badge className={`${getTierBadgeColor(user.subscription_tier)} text-xs font-medium`}>
              {user.subscription_tier}
            </Badge>
          )}
          <button
            onClick={handleProfileClick}
            tabIndex={0}
            aria-label="Profile"
            className="focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:ring-offset-2 rounded-full transition-all duration-200"
          >
            <Avatar className="w-12 h-12 cursor-pointer transition-all duration-200 hover:shadow-lg hover:shadow-orange-500/25">
              <AvatarFallback className="bg-linear-to-br from-orange-500 to-teal-500 text-white font-semibold text-sm">
                {isLoading ? "..." : getUserInitials(user)}
              </AvatarFallback>
            </Avatar>
          </button>
        </div>
      </div>
    </header>
  );
} 