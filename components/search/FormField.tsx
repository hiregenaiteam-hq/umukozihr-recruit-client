import { Label } from '@/components/ui/label'
import { ReactNode } from 'react'

interface FormFieldProps {
    label: string
    children: ReactNode
}

export function FormField({ label, children }: FormFieldProps) {
    return (
        <div className="space-y-5">
            <Label className="text-lg font-bold text-gray-900">{label}</Label>
            <div className="relative">
                {children}
            </div>
        </div>
    )
}
