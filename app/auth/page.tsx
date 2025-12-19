"use client"

import React, { Suspense, useEffect, useMemo, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"
import { Users, Shield, Star, ArrowRight } from "lucide-react"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import SignInForm from "@/components/SignInForm"
import MultiStepRegistration from "@/components/auth/MultiStepRegistration"
import AuthTabSwitcher from "@/components/auth/AuthTabSwitcher"
import VerificationForm from "@/components/VerificationForm"

function AuthContent() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [pendingVerification, setPendingVerification] = useState(false)
  const [verificationEmail, setVerificationEmail] = useState("")
  const [pendingUserId, setPendingUserId] = useState<string | number | null>(null)

  const router = useRouter()
  const params = useSearchParams()
  const nextPath = useMemo(() => params.get("next") || "/search", [params])

  useEffect(() => {
    // any top-level UI effects
  }, [isSignUp])

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop closeOnClick pauseOnHover draggable theme="colored" />

      {pendingVerification ? (
        <div className="w-full flex items-center justify-center p-6">
          <div className="w-full max-w-md">
            <VerificationForm
              email={verificationEmail}
              userId={pendingUserId}
              onVerified={() => {
                setPendingVerification(false)
                setIsSignUp(false)
                setVerificationEmail("")
                setPendingUserId(null)
              }}
              onCancel={() => {
                setPendingVerification(false)
                setVerificationEmail("")
                setPendingUserId(null)
              }}
            />
          </div>
        </div>
      ) : (
        <>
          {/* Left Side - Professional Branding */}
          <div className="hidden lg:flex lg:w-1/2 bg-white overflow-hidden h-screen lg:h-screen lg:sticky lg:top-0 relative">

            {/* Subtle background pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-20 left-20 w-32 h-32 border border-gray-300 rounded-full" />
              <div className="absolute top-40 right-32 w-24 h-24 border border-gray-300 rounded-full" />
              <div className="absolute bottom-32 left-32 w-28 h-28 border border-gray-300 rounded-full" />
              <div className="absolute bottom-20 right-20 w-20 h-20 border border-gray-300 rounded-full" />
            </div>

            <div className="relative z-10 flex flex-col justify-center px-16 py-12 w-full h-full">
              {/* Logo - Top Left of Page */}
              <div className="absolute top-4 left-4 z-50">
                <img
                  src="/logo.png"
                  alt="Umukozi HR Logo"
                  className="w-48 h-16 object-contain rounded-[25%]"
                  key="auth-logo"
                />
              </div>

              {/* Main Content */}
              <div className="space-y-10">
                <div>
                  <h2 className="text-5xl font-light text-slate-900 leading-tight mb-6 tracking-tight font-inter">
                    Find the right talent,{" "}
                    <span className="font-medium text-umukozi-orange">faster</span>
                  </h2>
                  <p className="text-lg text-slate-600 leading-relaxed max-w-md font-inter">
                    Join thousands of companies using our platform to build exceptional teams.
                  </p>
                </div>

                {/* Sweet Benefits */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-1.5 h-1.5 bg-umukozi-orange rounded-full" />
                    <span className="text-slate-600 text-sm font-inter font-normal">Automated end-to-end hiring on autopilot</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-1.5 h-1.5 bg-umukozi-orange rounded-full" />
                    <span className="text-slate-600 text-sm font-inter font-normal">Hire the best candidates for you in hours not weeks</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-1.5 h-1.5 bg-umukozi-orange rounded-full" />
                    <span className="text-slate-600 text-sm font-inter font-normal">Save time and reduce costs</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-1.5 h-1.5 bg-umukozi-orange rounded-full" />
                    <span className="text-slate-600 text-sm font-inter font-normal">Hiring at scale with accuracy, speed and fairness</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-1.5 h-1.5 bg-umukozi-orange rounded-full" />
                    <span className="text-slate-600 text-sm font-inter font-normal">Enterprise-grade compliance and data</span>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Right Side - Clean Auth Form */}
          <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12 relative bg-linear-to-br from-slate-50/50 to-white">
            <div className="w-full max-w-md flex flex-col justify-center">

              {/* Mobile Logo - Only shows on smaller screens */}
              <div className="lg:hidden flex justify-center mb-8">
                <img
                  src="/logo.png"
                  alt="Umukozi HR Logo"
                  className="w-48 h-16 object-contain rounded-[25%]"
                />
              </div>

              {/* Sweet Auth Container */}
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-slate-200/50 p-10 flex flex-col">
                {/* Tab Switcher */}
                <AuthTabSwitcher
                  isSignUp={isSignUp}
                  onToggle={setIsSignUp}
                />

                {/* Form Content */}
                <div className="pt-6">
                  {isSignUp ? (
                    <MultiStepRegistration
                      onSignedUp={({ email, userId }) => {
                        setVerificationEmail(email)
                        setPendingUserId(userId ?? null)
                        setPendingVerification(true)
                      }}
                    />
                  ) : (
                    <SignInForm
                      onSuccess={() => {
                        router.push(nextPath)
                      }}
                      onNotVerified={({ email, userId }) => {
                        setVerificationEmail(email)
                        setPendingUserId(userId ?? null)
                        setPendingVerification(true)
                      }}
                      onSwitchToSignUp={() => setIsSignUp(true)}
                    />
                  )}
                </div>
              </div>

            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default function AuthPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <AuthContent />
    </Suspense>
  )
}