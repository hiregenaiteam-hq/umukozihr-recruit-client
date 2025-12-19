"use client";

import { useState, useEffect, createContext, useContext } from "react";
import OnboardingWizard from "./OnboardingWizard";

interface OnboardingContextType {
  showOnboarding: boolean;
  triggerOnboarding: () => void;
  completeOnboarding: () => void;
}

const OnboardingContext = createContext<OnboardingContextType | null>(null);

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error("useOnboarding must be used within OnboardingProvider");
  }
  return context;
}

const ONBOARDING_KEY = "umukozi_onboarding_complete";
const ONBOARDING_VERSION = "1.0"; // Increment to show onboarding again after major updates

export function OnboardingProvider({ children }: { children: React.ReactNode }) {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [userName, setUserName] = useState<string | undefined>();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Check if user is logged in and hasn't completed onboarding
    const checkOnboardingStatus = () => {
      const onboardingComplete = localStorage.getItem(ONBOARDING_KEY);
      const userData = localStorage.getItem("user_data");
      
      // Only show onboarding to logged-in users who haven't completed it
      if (userData) {
        try {
          const user = JSON.parse(userData);
          setUserName(user.full_name?.split(" ")[0] || user.username);
          
          // Check if onboarding is complete for this version
          if (onboardingComplete !== ONBOARDING_VERSION) {
            // Small delay to let the page load first
            setTimeout(() => {
              setShowOnboarding(true);
            }, 1000);
          }
        } catch (e) {
          // Invalid user data
        }
      }
      setIsReady(true);
    };

    checkOnboardingStatus();

    // Also listen for login events (when user_data is set)
    const handleStorage = (e: StorageEvent) => {
      if (e.key === "user_data" && e.newValue) {
        checkOnboardingStatus();
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const triggerOnboarding = () => {
    setShowOnboarding(true);
  };

  const completeOnboarding = () => {
    localStorage.setItem(ONBOARDING_KEY, ONBOARDING_VERSION);
    setShowOnboarding(false);
  };

  const skipOnboarding = () => {
    localStorage.setItem(ONBOARDING_KEY, ONBOARDING_VERSION);
    setShowOnboarding(false);
  };

  return (
    <OnboardingContext.Provider value={{ showOnboarding, triggerOnboarding, completeOnboarding }}>
      {children}
      {isReady && showOnboarding && (
        <OnboardingWizard
          onComplete={completeOnboarding}
          onSkip={skipOnboarding}
          userName={userName}
        />
      )}
    </OnboardingContext.Provider>
  );
}
