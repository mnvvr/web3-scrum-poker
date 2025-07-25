'use client'

import { motion } from 'framer-motion'
import { SkeletonCard } from './SkeletonCard'

export function HomepageSkeleton() {
    return (
        <div className="min-h-screen bg-white relative overflow-hidden">
            {/* Background Texture */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white opacity-30"></div>

            {/* Banner Skeleton */}
            <div className="bg-black text-white py-3 overflow-hidden relative z-10">
                <div className="h-6 bg-gray-700 rounded w-3/4 mx-auto animate-pulse"></div>
            </div>

            {/* Hero Section Skeleton */}
            <section className="relative z-10 py-20 px-4">
                <div className="max-w-6xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-8"
                    >
                        {/* Title skeleton */}
                        <div className="space-y-4">
                            <div className="h-16 bg-gray-200 rounded w-3/4 mx-auto animate-pulse"></div>
                            <div className="h-6 bg-gray-200 rounded w-2/3 mx-auto animate-pulse"></div>
                            <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto animate-pulse"></div>
                        </div>

                        {/* Buttons skeleton */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <div className="h-14 bg-gray-200 rounded-lg w-40 animate-pulse"></div>
                            <div className="h-14 bg-gray-200 rounded-lg w-40 animate-pulse"></div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* How it Works Skeleton */}
            <section className="py-20 px-4 relative z-10">
                <div className="max-w-6xl mx-auto">
                    {/* Section title */}
                    <div className="text-center mb-16 space-y-4">
                        <div className="h-10 bg-gray-200 rounded w-1/3 mx-auto animate-pulse"></div>
                        <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto animate-pulse"></div>
                    </div>

                    {/* Cards grid */}
                    <div className="grid md:grid-cols-3 gap-8">
                        {[1, 2, 3].map((i) => (
                            <SkeletonCard key={i} variant="poker" />
                        ))}
                    </div>
                </div>
            </section>

            {/* Card Types Skeleton */}
            <section className="py-20 px-4 relative z-10 bg-gray-50">
                <div className="max-w-6xl mx-auto">
                    {/* Section title */}
                    <div className="text-center mb-16 space-y-4">
                        <div className="h-10 bg-gray-200 rounded w-1/2 mx-auto animate-pulse"></div>
                        <div className="h-6 bg-gray-200 rounded w-1/3 mx-auto animate-pulse"></div>
                    </div>

                    {/* Cards grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <SkeletonCard key={i} variant="compact" />
                        ))}
                    </div>
                </div>
            </section>

            {/* Web3 Benefits Skeleton */}
            <section className="py-20 px-4 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <div className="h-10 bg-gray-200 rounded w-2/3 mx-auto animate-pulse"></div>
                            <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto animate-pulse"></div>
                            <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto animate-pulse"></div>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8 mt-12">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="text-center space-y-4">
                                    <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto animate-pulse"></div>
                                    <div className="h-6 bg-gray-200 rounded w-2/3 mx-auto animate-pulse"></div>
                                    <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}