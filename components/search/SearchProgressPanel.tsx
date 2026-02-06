"use client";

import { Search, Users, Sparkles, CheckCircle, Loader2 } from "lucide-react";
import {
  Stepper,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTitle,
} from "@/components/ui/stepper";
import { cn } from "@/lib/utils";

interface WorkflowStatus {
  current_step: string;
  step_progress: number;
  step_message: string;
}

interface SearchProgressPanelProps {
  workflowStatus: WorkflowStatus | null;
}

const WORKFLOW_STEPS = [
  { id: "analyzing", label: "Analyzing", icon: Search },
  { id: "searching", label: "Searching", icon: Users },
  { id: "enriching", label: "Enriching", icon: Sparkles },
  { id: "validating", label: "Validating", icon: CheckCircle },
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
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white via-slate-50/50 to-orange-50/30 p-6 border border-slate-200/60 shadow-xl shadow-slate-200/40 backdrop-blur-sm">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-transparent to-teal-500/5 animate-pulse" />
      
      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px]" />
      
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-orange-500 rounded-full animate-ping opacity-30" />
              <div className="relative w-3 h-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full shadow-lg shadow-orange-500/50" />
            </div>
            <h3 className="font-semibold text-slate-800 text-lg tracking-tight">Search in Progress</h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
              {progressPercent}%
            </span>
          </div>
        </div>

        {/* Progress Bar - Premium style */}
        <div className="relative mb-8">
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-orange-500 via-orange-400 to-teal-500 rounded-full transition-all duration-700 ease-out relative"
              style={{ width: `${progressPercent}%` }}
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
            </div>
          </div>
          {/* Glow effect under progress */}
          <div 
            className="absolute -bottom-1 left-0 h-2 bg-gradient-to-r from-orange-500/30 to-teal-500/30 blur-md rounded-full transition-all duration-700"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Step Indicators - Using Stepper */}
        <Stepper value={currentIndex + 1} className="justify-between mb-8">
          {WORKFLOW_STEPS.map((step, index) => {
            const isActive = step.id === workflowStatus.current_step;
            const isComplete = currentIndex > index;
            const StepIcon = step.icon;

            return (
              <StepperItem
                key={step.id}
                step={index + 1}
                completed={isComplete}
                loading={isActive}
                className="flex-1 flex flex-col items-center"
              >
                <div className="flex items-center w-full">
                  <StepperIndicator className="relative">
                    {isActive ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : !isComplete ? (
                      <StepIcon className="w-5 h-5" />
                    ) : null}
                    
                    {/* Pulse ring for active step */}
                    {isActive && (
                      <div className="absolute inset-0 rounded-full border-2 border-orange-400 animate-ping opacity-40" />
                    )}
                  </StepperIndicator>
                  
                  {/* Separator - only between steps */}
                  {index < WORKFLOW_STEPS.length - 1 && (
                    <StepperSeparator />
                  )}
                </div>
                
                <StepperTitle>{step.label}</StepperTitle>
              </StepperItem>
            );
          })}
        </Stepper>

        {/* Current Status Message - Glassmorphism card */}
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-slate-50/80 to-white/80 backdrop-blur-sm border border-slate-200/50 p-4">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-teal-500/5" />
          <div className="relative flex items-center gap-3">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-100 to-orange-50 flex items-center justify-center">
                <Loader2 className="w-4 h-4 text-orange-600 animate-spin" />
              </div>
            </div>
            <p className="text-sm text-slate-700 font-medium">{workflowStatus.step_message}</p>
          </div>
        </div>

        {/* Estimated Time */}
        <div className="text-center mt-4">
          <p className="text-xs text-slate-400 flex items-center justify-center gap-1.5">
            <span className="inline-block w-1 h-1 bg-slate-300 rounded-full" />
            Usually takes 30-60 seconds
            <span className="inline-block w-1 h-1 bg-slate-300 rounded-full" />
          </p>
        </div>
      </div>
    </div>
  );
}
