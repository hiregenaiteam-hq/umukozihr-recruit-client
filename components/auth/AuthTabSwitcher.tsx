"use client"

import React from "react"

interface AuthTabSwitcherProps {
    isSignUp: boolean
    onToggle: (isSignUp: boolean) => void
}

export default function AuthTabSwitcher({ isSignUp, onToggle }: AuthTabSwitcherProps) {
    return (
        <div className="flex bg-gray-100 rounded-lg p-1 mb-8 relative">
            {/* Animated Background */}
            <div
                className="absolute top-1 left-1 h-10 w-1/2 rounded-md bg-white shadow-sm transition-transform duration-200 ease-out"
                style={{
                    transform: isSignUp ? "translateX(100%)" : "translateX(0%)"
                }}
                aria-hidden="true"
            />

            {/* Sign In Tab */}
            <button
                type="button"
                onClick={() => onToggle(false)}
                className={`flex-1 py-2.5 px-4 rounded-md text-sm font-medium z-10 transition-colors duration-200 ${!isSignUp
                    ? "text-gray-900"
                    : "text-gray-600 hover:text-gray-900"
                    }`}
            >
                Sign In
            </button>

            {/* Sign Up Tab */}
            <button
                type="button"
                onClick={() => onToggle(true)}
                className={`flex-1 py-2.5 px-4 rounded-md text-sm font-medium z-10 transition-colors duration-200 ${isSignUp
                    ? "text-gray-900"
                    : "text-gray-600 hover:text-gray-900"
                    }`}
            >
                Sign Up
            </button>
        </div>
    )
}