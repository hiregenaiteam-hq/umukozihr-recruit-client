"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to consolidated profile page
    router.replace("/profile");
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-umukozi-orange border-t-transparent rounded-full animate-spin mx-auto mb-2" />
        <p className="text-sm text-slate-500">Redirecting...</p>
      </div>
    </div>
  );
}
