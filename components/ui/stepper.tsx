"use client";

import { cn } from "@/lib/utils";
import { Check, LoaderCircle } from "lucide-react";
import * as React from "react";
import { createContext, useContext } from "react";

// Types
type StepperContextValue = {
  activeStep: number;
  orientation: "horizontal" | "vertical";
};

type StepItemContextValue = {
  step: number;
  state: StepState;
  isLoading: boolean;
};

type StepState = "active" | "completed" | "inactive" | "loading";

// Contexts
const StepperContext = createContext<StepperContextValue | undefined>(undefined);
const StepItemContext = createContext<StepItemContextValue | undefined>(undefined);

const useStepper = () => {
  const context = useContext(StepperContext);
  if (!context) {
    throw new Error("useStepper must be used within a Stepper");
  }
  return context;
};

const useStepItem = () => {
  const context = useContext(StepItemContext);
  if (!context) {
    throw new Error("useStepItem must be used within a StepperItem");
  }
  return context;
};

// Components
interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  orientation?: "horizontal" | "vertical";
}

const Stepper = React.forwardRef<HTMLDivElement, StepperProps>(
  ({ value = 0, orientation = "horizontal", className, ...props }, ref) => {
    return (
      <StepperContext.Provider
        value={{
          activeStep: value,
          orientation,
        }}
      >
        <div
          ref={ref}
          className={cn(
            "group/stepper inline-flex data-[orientation=horizontal]:w-full data-[orientation=horizontal]:flex-row data-[orientation=vertical]:flex-col",
            className
          )}
          data-orientation={orientation}
          {...props}
        />
      </StepperContext.Provider>
    );
  }
);
Stepper.displayName = "Stepper";

// StepperItem
interface StepperItemProps extends React.HTMLAttributes<HTMLDivElement> {
  step: number;
  completed?: boolean;
  loading?: boolean;
}

const StepperItem = React.forwardRef<HTMLDivElement, StepperItemProps>(
  ({ step, completed = false, loading = false, className, children, ...props }, ref) => {
    const { activeStep } = useStepper();

    const state: StepState =
      completed || step < activeStep ? "completed" : activeStep === step ? "active" : "inactive";

    const isLoading = loading && step === activeStep;

    return (
      <StepItemContext.Provider value={{ step, state, isLoading }}>
        <div
          ref={ref}
          className={cn(
            "group/step flex items-center group-data-[orientation=horizontal]/stepper:flex-row group-data-[orientation=vertical]/stepper:flex-col",
            className
          )}
          data-state={state}
          {...(isLoading ? { "data-loading": true } : {})}
          {...props}
        >
          {children}
        </div>
      </StepItemContext.Provider>
    );
  }
);
StepperItem.displayName = "StepperItem";

// StepperIndicator
interface StepperIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

const StepperIndicator = React.forwardRef<HTMLDivElement, StepperIndicatorProps>(
  ({ asChild = false, className, children, ...props }, ref) => {
    const { state, step, isLoading } = useStepItem();

    return (
      <div
        ref={ref}
        className={cn(
          "relative flex size-10 shrink-0 items-center justify-center rounded-full text-sm font-medium transition-all duration-300",
          // Inactive state
          "data-[state=inactive]:bg-slate-100 data-[state=inactive]:text-slate-400 data-[state=inactive]:border-2 data-[state=inactive]:border-slate-200",
          // Active state - with glow
          "data-[state=active]:bg-gradient-to-br data-[state=active]:from-orange-500 data-[state=active]:to-orange-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-orange-500/30 data-[state=active]:scale-110",
          // Completed state
          "data-[state=completed]:bg-gradient-to-br data-[state=completed]:from-emerald-500 data-[state=completed]:to-teal-600 data-[state=completed]:text-white data-[state=completed]:shadow-md data-[state=completed]:shadow-emerald-500/20",
          className
        )}
        data-state={state}
        {...props}
      >
        {asChild ? (
          children
        ) : (
          <>
            <span className="transition-all group-data-[loading=true]/step:scale-0 group-data-[state=completed]/step:scale-0 group-data-[loading=true]/step:opacity-0 group-data-[state=completed]/step:opacity-0 group-data-[loading=true]/step:transition-none">
              {children}
            </span>
            <Check
              className="absolute scale-0 opacity-0 transition-all duration-300 group-data-[state=completed]/step:scale-100 group-data-[state=completed]/step:opacity-100"
              size={18}
              strokeWidth={2.5}
              aria-hidden="true"
            />
            {isLoading && (
              <span className="absolute transition-all">
                <LoaderCircle
                  className="animate-spin"
                  size={18}
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </span>
            )}
          </>
        )}
      </div>
    );
  }
);
StepperIndicator.displayName = "StepperIndicator";

// StepperTitle
const StepperTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => {
    const { state } = useStepItem();
    return (
      <h3
        ref={ref}
        className={cn(
          "text-xs font-medium mt-2 transition-colors duration-300",
          state === "completed" && "text-emerald-600",
          state === "active" && "text-orange-600 font-semibold",
          state === "inactive" && "text-slate-400",
          className
        )}
        {...props}
      />
    );
  }
);
StepperTitle.displayName = "StepperTitle";

// StepperSeparator
const StepperSeparator = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { state } = useStepItem();

    return (
      <div
        ref={ref}
        className={cn(
          "mx-2 h-0.5 flex-1 rounded-full transition-all duration-500",
          state === "completed"
            ? "bg-gradient-to-r from-emerald-500 to-teal-500"
            : "bg-slate-200",
          className
        )}
        data-state={state}
        {...props}
      />
    );
  }
);
StepperSeparator.displayName = "StepperSeparator";

export {
  Stepper,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTitle,
  useStepper,
  useStepItem,
};
