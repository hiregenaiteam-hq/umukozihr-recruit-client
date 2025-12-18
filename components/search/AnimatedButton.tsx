"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sparkles, Loader2 } from "lucide-react"

interface AnimatedButtonProps {
    onClick: () => void
    disabled?: boolean
    isLoading?: boolean
    children: React.ReactNode
    className?: string
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
    size?: "default" | "sm" | "lg" | "icon"
}

export default function AnimatedButton({
    onClick,
    disabled = false,
    isLoading = false,
    children,
    className = "",
    variant = "default",
    size = "default"
}: AnimatedButtonProps) {
    const [isPressed, setIsPressed] = useState(false)

    const handleMouseDown = () => {
        setIsPressed(true)
    }

    const handleMouseUp = () => {
        setIsPressed(false)
    }

    const handleMouseLeave = () => {
        setIsPressed(false)
    }

    return (
        <Button
            onClick={onClick}
            disabled={disabled || isLoading}
            variant={variant}
            size={size}
            className={`
        relative overflow-hidden transition-all duration-300 ease-out
        ${isPressed ? 'scale-95' : 'scale-100 hover:scale-105'}
        ${isLoading ? 'cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
        >
            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-umukozi-orange/20 to-umukozi-teal/20 opacity-0 transition-opacity duration-300 hover:opacity-100" />

            {/* Sparkle animation */}
            {!isLoading && (
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-1 -left-1 w-2 h-2 bg-white rounded-full animate-ping opacity-75" />
                    <div className="absolute -top-1 -right-1 w-1 h-1 bg-white rounded-full animate-ping opacity-50" style={{ animationDelay: '0.5s' }} />
                    <div className="absolute -bottom-1 -left-1 w-1 h-1 bg-white rounded-full animate-ping opacity-50" style={{ animationDelay: '1s' }} />
                    <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-white rounded-full animate-ping opacity-75" style={{ animationDelay: '1.5s' }} />
                </div>
            )}

            {/* Content */}
            <div className="relative z-10 flex items-center justify-center space-x-2">
                {isLoading ? (
                    <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Searching...</span>
                    </>
                ) : (
                    <>
                        <Sparkles className="w-4 h-4" />
                        {children}
                    </>
                )}
            </div>

            {/* Ripple effect */}
            {isPressed && (
                <div className="absolute inset-0 bg-white/20 rounded-full animate-ping" />
            )}
        </Button>
    )
}
