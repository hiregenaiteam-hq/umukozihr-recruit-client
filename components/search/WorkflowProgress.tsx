"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface WorkflowStep {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    id: "analyzing",
    title: "Analyzing",
    description: "Understanding your requirements",
    icon: "🔍",
    color: "blue"
  },
  {
    id: "searching",
    title: "Searching",
    description: "Finding relevant candidates",
    icon: "🕵️",
    color: "purple"
  },
  {
    id: "enriching",
    title: "Enriching",
    description: "Gathering detailed profiles",
    icon: "📈",
    color: "orange"
  },
  {
    id: "validating",
    title: "Validating",
    description: "Checking quality and fit",
    icon: "✅",
    color: "green"
  }
];

interface WorkflowProgressProps {
  currentStep: string;
  progress: number;
  message: string;
}

export default function WorkflowProgress({
  currentStep,
  progress,
  message
}: WorkflowProgressProps) {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(currentStep !== "idle" && currentStep !== "complete");
  }, [currentStep]);

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "bg-blue-500 border-blue-500 text-blue-500",
      purple: "bg-purple-500 border-purple-500 text-purple-500",
      orange: "bg-orange-500 border-orange-500 text-orange-500",
      green: "bg-green-500 border-green-500 text-green-500"
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const getActiveStep = () => {
    return WORKFLOW_STEPS.find(step => step.id === currentStep) || WORKFLOW_STEPS[0];
  };

  const activeStep = getActiveStep();

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md px-4"
        >
          <div className="bg-white rounded-xl shadow-xl border border-slate-200 p-4">
            {/* Progress bar */}
            <div className="mb-3">
              <div className="flex justify-between text-xs text-slate-500 mb-1">
                <span>{activeStep.title}</span>
                <span>{Math.round(progress * 100)}%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <motion.div
                  className={`h-2 rounded-full ${getColorClasses(activeStep.color).split(' ')[0]}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${progress * 100}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>
            </div>

            {/* Current step info */}
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${getColorClasses(activeStep.color)} bg-white`}>
                <span className="text-lg">{activeStep.icon}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-900 truncate">
                  {activeStep.title}
                </p>
                <p className="text-xs text-slate-500 truncate">
                  {message || activeStep.description}
                </p>
              </div>
              <div className="w-2 h-2 rounded-full bg-slate-300 animate-pulse" />
            </div>

            {/* Steps overview */}
            <div className="mt-3 pt-3 border-t border-slate-100">
              <div className="flex justify-between">
                {WORKFLOW_STEPS.map((step, index) => {
                  const isActive = step.id === currentStep;
                  const isCompleted = WORKFLOW_STEPS.findIndex(s => s.id === currentStep) > index;
                  
                  return (
                    <div key={step.id} className="flex flex-col items-center flex-1">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs mb-1 ${
                        isCompleted 
                          ? "bg-green-500 text-white" 
                          : isActive 
                            ? `${getColorClasses(step.color).split(' ')[0]} text-white`
                            : "bg-slate-200 text-slate-400"
                      }`}>
                        {isCompleted ? "✓" : step.icon}
                      </div>
                      <div className={`text-xs ${
                        isCompleted 
                          ? "text-green-600" 
                          : isActive 
                            ? "text-slate-900 font-medium"
                            : "text-slate-400"
                      }`}>
                        {step.title}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}