"use client";

import Image from "next/image";

interface BrandLogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
}

export default function BrandLogo({ 
  size = "md", 
  showText = true,
  className = "" 
}: BrandLogoProps) {
  const sizes = {
    sm: { icon: 32, text: "text-lg", subtext: "text-xs" },
    md: { icon: 48, text: "text-2xl", subtext: "text-sm" },
    lg: { icon: 64, text: "text-3xl", subtext: "text-base" },
  };

  const config = sizes[size];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Circular Logo Icon */}
      <div 
        className="relative rounded-full overflow-hidden bg-white shadow-md flex-shrink-0"
        style={{ width: config.icon, height: config.icon }}
      >
        <Image
          src="/umukozi-logo.png"
          alt="UmukoziHR Icon"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Text */}
      {showText && (
        <div className="flex flex-col leading-tight">
          <span className={`font-semibold text-slate-800 ${config.text} tracking-tight`}>
            UmukoziHR
          </span>
          <span className={`font-medium text-umukozi-orange ${config.subtext}`}>
            Recruit
          </span>
        </div>
      )}
    </div>
  );
}
