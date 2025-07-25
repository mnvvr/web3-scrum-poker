'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

interface Step {
    id: string
    label: string
    description?: string
}

interface ProgressIndicatorProps {
    steps: Step[]
    currentStep: string
    completedSteps: string[]
    className?: string
}

export function ProgressIndicator({ steps, currentStep, completedSteps, className = '' }: ProgressIndicatorProps) {
    const currentIndex = steps.findIndex(step => step.id === currentStep)
    
    return (
        <div className={`w-full ${className}`}>
            <div className="flex items-center justify-between mb-8">
                {steps.map((step, index) => {
                    const isCompleted = completedSteps.includes(step.id)
                    const isCurrent = step.id === currentStep
                    const isPast = index < currentIndex
                    
                    return (
                        <div key={step.id} className="flex flex-col items-center flex-1">
                            {/* Step Circle */}
                            <motion.div
                                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                                    isCompleted || isCurrent
                                        ? 'bg-black text-white border-black'
                                        : 'bg-white text-gray-400 border-gray-300'
                                }`}
                                initial={false}
                                animate={{
                                    scale: isCurrent ? 1.1 : 1,
                                    boxShadow: isCurrent ? '0 0 0 4px rgba(0, 0, 0, 0.1)' : '0 0 0 0px rgba(0, 0, 0, 0.1)'
                                }}
                            >
                                {isCompleted ? (
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                    >
                                        <Check className="w-5 h-5" />
                                    </motion.div>
                                ) : (
                                    <span className="text-sm font-bold">{index + 1}</span>
                                )}
                            </motion.div>
                            
                            {/* Step Label */}
                            <div className="text-center mt-2 max-w-20">
                                <p className={`text-xs font-medium font-distressed ${
                                    isCurrent ? 'text-black' : 'text-gray-500'
                                }`}>
                                    {step.label}
                                </p>
                                {step.description && isCurrent && (
                                    <motion.p
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        className="text-xs text-gray-400 mt-1"
                                    >
                                        {step.description}
                                    </motion.p>
                                )}
                            </div>
                            
                            {/* Connector Line */}
                            {index < steps.length - 1 && (
                                <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200 -z-10">
                                    <motion.div
                                        className="h-full bg-black"
                                        initial={{ width: '0%' }}
                                        animate={{
                                            width: isPast || isCompleted ? '100%' : '0%'
                                        }}
                                        transition={{ duration: 0.5 }}
                                    />
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}