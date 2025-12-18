import { Button } from '@/components/ui/button'
import { ChevronRight, Sparkles } from 'lucide-react'
import AnimatedButton from './AnimatedButton'

interface StepNavigationProps {
    currentStep: number
    totalSteps: number
    canProceed: () => boolean
    isSubmitting: boolean
    onPrevious: () => void
    onNext: () => void
    onSubmit: () => void
}

export function StepNavigation({
    currentStep,
    totalSteps,
    canProceed,
    isSubmitting,
    onPrevious,
    onNext,
    onSubmit
}: StepNavigationProps) {
    return (
        <div className="flex justify-between items-center mt-16 pt-8 border-t border-gray-200">
            <Button
                onClick={onPrevious}
                disabled={currentStep === 1}
                variant="outline"
                className="px-8 py-4 text-lg font-semibold border-2 hover:bg-gray-50 transition-all duration-200"
            >
                ← Previous
            </Button>


            {currentStep < totalSteps ? (
                <Button
                    onClick={onNext}
                    disabled={!canProceed()}
                    className="px-8 py-4 text-lg font-semibold umukozi-btn-clean hover:scale-105 transition-transform duration-200"
                >
                    Next Step
                    <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
            ) : (
                <AnimatedButton
                    onClick={onSubmit}
                    disabled={!canProceed()}
                    isLoading={isSubmitting}
                    className="px-10 py-4 text-xl font-bold umukozi-btn-clean"
                >
                    Find Candidates
                </AnimatedButton>
            )}
        </div>
    )
}
