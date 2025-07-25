'use client'

import { motion } from 'framer-motion'

interface LoadingSpinnerProps {
    size?: 'small' | 'medium' | 'large'
    className?: string
    text?: string
}

export function LoadingSpinner({ size = 'medium', className = '', text }: LoadingSpinnerProps) {
    const sizeClasses = {
        small: 'w-4 h-4',
        medium: 'w-8 h-8',
        large: 'w-12 h-12'
    }

    return (
        <div className={`flex flex-col items-center justify-center ${className}`}>
            <motion.div
                className={`${sizeClasses[size]} border-2 border-gray-200 border-t-black rounded-full`}
                animate={{ rotate: 360 }}
                transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "linear"
                }}
            />
            {text && (
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-gray-600 text-sm mt-2 font-distressed"
                >
                    {text}
                </motion.p>
            )}
        </div>
    )
}