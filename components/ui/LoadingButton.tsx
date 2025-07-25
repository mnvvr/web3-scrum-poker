'use client'

import { motion } from 'framer-motion'
import { LoadingSpinner } from './LoadingSpinner'

interface LoadingButtonProps {
    isLoading: boolean
    children: React.ReactNode
    onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void
    type?: 'button' | 'submit'
    variant?: 'primary' | 'secondary'
    disabled?: boolean
    className?: string
    loadingText?: string
}

export function LoadingButton({
    isLoading,
    children,
    onClick,
    type = 'button',
    variant = 'primary',
    disabled,
    className = '',
    loadingText
}: LoadingButtonProps) {
    const baseClasses = "relative inline-flex items-center justify-center px-6 py-3 font-bold rounded-lg transition-all duration-200 overflow-hidden vintage-btn enhanced-button"

    const variantClasses = {
        primary: "bg-black text-white hover:bg-gray-800",
        secondary: "bg-white text-black border-2 border-black hover:bg-gray-50"
    }

    const isDisabled = isLoading || disabled

    return (
        <motion.button
            type={type}
            onClick={onClick}
            disabled={isDisabled}
            className={`${baseClasses} ${variantClasses[variant]} ${className} ${isDisabled ? 'opacity-70 cursor-not-allowed' : ''
                } focus-ring`}
            whileHover={!isDisabled ? { scale: 1.02 } : {}}
            whileTap={!isDisabled ? { scale: 0.98 } : {}}
            aria-disabled={isDisabled}
            aria-label={isLoading && loadingText ? loadingText : undefined}
        >
            {isLoading && (
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="absolute left-4"
                >
                    <LoadingSpinner size="small" />
                </motion.div>
            )}

            <motion.span
                animate={{
                    x: isLoading ? 12 : 0,
                    opacity: isLoading ? 0.7 : 1
                }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-2"
            >
                {isLoading && loadingText ? loadingText : children}
            </motion.span>
        </motion.button>
    )
}