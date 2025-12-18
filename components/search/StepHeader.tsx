interface StepHeaderProps {
    title: string
    description: string
}

export function StepHeader({ title, description }: StepHeaderProps) {
    return (
        <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">{title}</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">{description}</p>
        </div>
    )
}
