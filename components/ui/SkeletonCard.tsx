'use client'

import { motion } from 'framer-motion'

interface SkeletonCardProps {
    className?: string
    variant?: 'default' | 'poker' | 'compact'
}

export function SkeletonCard({ className = '', variant = 'default' }: SkeletonCardProps) {
    const shimmer = {
        initial: { x: '-100%' },
        animate: { x: '100%' },
        transition: {
            repeat: Infinity,
            duration: 1.5,
            ease: 'linear'
        }
    }

    if (variant === 'poker') {
        return (
            <div className={`poker-card bg-white border border-black rounded-lg p-6 shadow-lg relative overflow-hidden ${className}`}>
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white opacity-30"></div>
                
                {/* Shimmer effect */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    {...shimmer}
                />
                
                <div className="relative z-10 space-y-4">
                    {/* Icon placeholder */}
                    <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto animate-pulse" />
                    
                    {/* Title placeholder */}
                    <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto animate-pulse" />
                    
                    {/* Description placeholder */}
                    <div className="space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
                        <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto animate-pulse" />
                    </div>
                </div>
            </div>
        )
    }

    if (variant === 'compact') {
        return (
            <div className={`bg-white border border-gray-200 rounded-lg p-4 shadow-sm relative overflow-hidden ${className}`}>
                {/* Shimmer effect */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    {...shimmer}
                />
                
                <div className="space-y-3">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-200 rounded animate-pulse" />
                        <div className="h-4 bg-gray-200 rounded flex-1 animate-pulse" />
                    </div>
                    <div className="h-3 bg-gray-200 rounded w-2/3 animate-pulse" />
                </div>
            </div>
        )
    }

    return (
        <div className={`bg-white border border-gray-200 rounded-lg p-6 shadow-sm relative overflow-hidden ${className}`}>
            {/* Shimmer effect */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                {...shimmer}
            />
            
            <div className="space-y-4">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-lg animate-pulse" />
                    <div className="flex-1 space-y-2">
                        <div className="h-5 bg-gray-200 rounded w-3/4 animate-pulse" />
                        <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse" />
                    </div>
                </div>
                
                {/* Content */}
                <div className="space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
                    <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse" />
                    <div className="h-4 bg-gray-200 rounded w-4/6 animate-pulse" />
                </div>
                
                {/* Footer */}
                <div className="flex gap-2 pt-2">
                    <div className="h-8 bg-gray-200 rounded w-16 animate-pulse" />
                    <div className="h-8 bg-gray-200 rounded w-16 animate-pulse" />
                    <div className="h-8 bg-gray-200 rounded w-16 animate-pulse" />
                </div>
            </div>
        </div>
    )
}