'use client'

import { motion } from 'framer-motion'
import { AlertCircle } from 'lucide-react'

interface FormErrorProps {
    error: string | null | undefined
    className?: string
}

export function FormError({ error, className = '' }: FormErrorProps) {
    if (!error) return null

    return (
        <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className={`flex items-center gap-2 text-red-600 text-sm mt-2 ${className}`}
        >
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span className="font-distressed">{error}</span>
        </motion.div>
    )
}

interface FormFieldProps {
    label: string
    error?: string | undefined
    required?: boolean
    children: React.ReactNode
    className?: string
}

export function FormField({ label, error, required, children, className = '' }: FormFieldProps) {
    return (
        <div className={`group ${className}`}>
            <label className="block text-black mb-3 text-lg font-medium group-hover:text-black transition-colors font-brand">
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </label>
            {children}
            <FormError error={error} />
        </div>
    )
}