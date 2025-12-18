"use client"

import React, { useState } from "react"

interface AnimatedFormFieldProps {
    children: React.ReactNode
    className?: string
}

export default function AnimatedFormField({ children, className = "" }: AnimatedFormFieldProps) {
    const [isFocused, setIsFocused] = useState(false)

    return (
        <div
            className={`
        relative transition-all duration-500 ease-out
        hover:scale-[1.02] hover:shadow-lg
        ${className}
      `}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
        >
            {/* Animated border */}
            <div
                className={`
          absolute inset-0 rounded-2xl bg-gradient-to-r from-umukozi-orange/20 to-umukozi-teal/20
          transition-opacity duration-300 ease-out
          ${isFocused ? 'opacity-100' : 'opacity-0'}
        `}
            />

            {/* Content */}
            <div className="relative z-0">
                {children}
            </div>
        </div>
    )
}
