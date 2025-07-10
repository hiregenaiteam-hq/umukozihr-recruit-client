import { Sparkles } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Sparkles className="w-6 h-6 text-blue-500 mr-2" />
          <span className="text-xl font-bold text-slate-900">HireGen</span>
        </div>
        <Link href="/settings" passHref legacyBehavior>
          <a tabIndex={0} aria-label="Settings" className="focus:outline-none">
            <Avatar className="w-11 h-11 cursor-pointer transition-shadow hover:ring-2 hover:ring-blue-400 focus:ring-2 focus:ring-blue-400">
              <AvatarFallback className="bg-blue-500 text-white font-medium">JD</AvatarFallback>
            </Avatar>
          </a>
        </Link>
      </div>
    </header>
  );
} 