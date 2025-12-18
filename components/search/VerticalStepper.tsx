import { CheckCircle } from 'lucide-react'

interface Step {
    id: number
    title: string
    description: string
}

interface VerticalStepperProps {
    steps: Step[]
    currentStep: number
    completedSections?: Set<string>
}

export function VerticalStepper({ steps, currentStep, completedSections = new Set() }: VerticalStepperProps) {
    return (
        <div className="w-64 flex-shrink-0">
            <div className="sticky top-8">
                <div className="relative">
                    {steps.map((step, index) => {
                        const isActive = currentStep === step.id
                        const isCompleted = currentStep > step.id || completedSections.has(step.title.toLowerCase().replace(/\s+/g, '-'))
                        const isLast = index === steps.length - 1

                        return (
                            <div key={step.id} className="flex items-start">
                                <div className="flex flex-col items-center">
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${isCompleted
                                        ? 'bg-umukozi-orange border-umukozi-orange text-white'
                                        : isActive
                                            ? 'bg-umukozi-orange border-umukozi-orange text-white'
                                            : 'bg-white border-gray-300 text-gray-400'
                                        }`}>
                                        {isCompleted ? (
                                            <CheckCircle className="w-6 h-6" />
                                        ) : (
                                            <span className="text-lg font-bold">{step.id}</span>
                                        )}
                                    </div>
                                    {!isLast && (
                                        <div className={`w-0.5 h-16 mt-2 transition-all duration-300 ${isCompleted ? 'bg-umukozi-orange' : 'bg-gray-300'
                                            }`} />
                                    )}
                                </div>
                                <div className="ml-4 mt-1">
                                    <div className={`text-sm font-semibold ${isActive ? 'text-umukozi-orange' : isCompleted ? 'text-umukozi-orange' : 'text-gray-500'
                                        }`}>
                                        {step.title}
                                    </div>
                                    <div className="text-xs text-gray-500 mt-1 max-w-48">
                                        {step.description}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
