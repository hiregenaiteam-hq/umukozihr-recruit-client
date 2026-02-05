"use client";

import { Search, Users, Database, CheckCircle, Loader2 } from "lucide-react";

interface WorkflowStatus {
  current_step: string;
  step_progress: number;
  step_message: string;
}

interface SearchProgressPanelProps {
  workflowStatus: WorkflowStatus | null;
}

const WORKFLOW_STEPS = [
  { id: "analyzing", label: "Analyzing", icon: Search, description: "Understanding your requirements" },
  { id: "searching", label: "Searching", icon: Users, description: "Finding matching candidates" },
  { id: "enriching", label: "Enriching", icon: Database, description: "Getting detailed profiles" },
  { id: "validating", label: "Validating", icon: CheckCircle, description: "Checking quality and fit" },
];

function getStepIndex(stepId: string | undefined): number {
  if (!stepId) return -1;
  return WORKFLOW_STEPS.findIndex((s) => s.id === stepId);
}

export default function SearchProgressPanel({ workflowStatus }: SearchProgressPanelProps) {
  if (!workflowStatus || workflowStatus.current_step === "idle" || workflowStatus.current_step === "complete") {
    return null;
  }

  const currentIndex = getStepIndex(workflowStatus.current_step);
  const progressPercent = Math.round(workflowStatus.step_progress * 100);

  return (
    <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
          <h3 className="font-semibold text-slate-800">Search in Progress</h3>
        </div>
        <span className="text-sm font-medium text-orange-600">{progressPercent}%</span>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-100 rounded-full h-2 mb-6 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progressPercent}%` }}
        >
          <div className="w-full h-full bg-white/30 animate-pulse" />
        </div>
      </div>

      {/* Step Indicators */}
      <div className="flex justify-between mb-6">
        {WORKFLOW_STEPS.map((step, index) => {
          const isActive = step.id === workflowStatus.current_step;
          const isComplete = currentIndex > index;
          const StepIcon = step.icon;

          return (
            <div key={step.id} className="flex flex-col items-center flex-1">
              {/* Icon Circle */}
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all duration-300 ${
                  isComplete
                    ? "bg-green-500 text-white"
                    : isActive
                    ? "bg-orange-500 text-white animate-pulse"
                    : "bg-slate-100 text-slate-400"
                }`}
              >
                {isComplete ? (
                  <CheckCircle className="w-5 h-5" />
                ) : isActive ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <StepIcon className="w-5 h-5" />
                )}
              </div>

              {/* Label */}
              <span
                className={`text-xs font-medium text-center ${
                  isComplete
                    ? "text-green-600"
                    : isActive
                    ? "text-orange-600"
                    : "text-slate-400"
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Connecting Lines */}
      <div className="relative -mt-[72px] mb-6 mx-5">
        <div className="flex justify-between items-center">
          {WORKFLOW_STEPS.slice(0, -1).map((step, index) => {
            const isComplete = currentIndex > index;
            return (
              <div
                key={`line-${step.id}`}
                className={`flex-1 h-0.5 transition-all duration-300 ${
                  isComplete ? "bg-green-500" : "bg-slate-200"
                }`}
              />
            );
          })}
        </div>
      </div>

      {/* Current Status Message */}
      <div className="text-center p-4 bg-slate-50 rounded-xl">
        <p className="text-sm text-slate-600">{workflowStatus.step_message}</p>
      </div>

      {/* Estimated Time */}
      <div className="text-center mt-4">
        <p className="text-xs text-slate-400">
          Usually takes 30-60 seconds
        </p>
      </div>
    </div>
  );
}
