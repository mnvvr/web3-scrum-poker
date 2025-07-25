'use client'

import { motion } from 'framer-motion'
import { Clock, CheckCircle, Users } from 'lucide-react'

interface VotingProgressProps {
    votedCount: number
    totalCount: number
    isRevealed: boolean
}

export function VotingProgress({ votedCount, totalCount, isRevealed }: VotingProgressProps) {
    const isComplete = votedCount === totalCount
    const progressPercentage = (votedCount / totalCount) * 100

    if (isRevealed) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-3 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg px-4 py-2 shadow-md"
            >
                <motion.div
                    initial={{ rotate: -180, scale: 0 }}
                    animate={{ rotate: 0, scale: 1 }}
                    transition={{ type: "spring", stiffness: 500 }}
                >
                    <CheckCircle className="w-5 h-5 text-green-600" />
                </motion.div>
                <span className="text-green-800 font-medium text-sm font-brand">Votes revealed!</span>
            </motion.div>
        )
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg px-4 py-3 shadow-md"
        >
            {/* Status Icon */}
            <motion.div
                animate={{ rotate: isComplete ? 360 : 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
            >
                {isComplete ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                ) : (
                    <Clock className="w-5 h-5 text-blue-600" />
                )}
            </motion.div>

            {/* Status Text */}
            <div className="flex flex-col">
                <span className="text-blue-800 font-medium text-sm font-brand">
                    {isComplete ? 'Everyone has voted!' : `${votedCount} of ${totalCount} voted`}
                </span>
                <span className="text-blue-600 text-xs font-distressed">
                    {isComplete ? 'Ready to reveal' : 'Waiting for others...'}
                </span>
            </div>

            {/* Progress Bar */}
            <div className="flex items-center gap-2">
                <div className="w-20 h-2 bg-blue-200 rounded-full overflow-hidden shadow-inner">
                    <motion.div
                        className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-green-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${progressPercentage}%` }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    />
                </div>
                <motion.span
                    className="text-blue-600 text-xs font-medium font-brand"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    {Math.round(progressPercentage)}%
                </motion.span>
            </div>

            {/* Participants Icon */}
            <motion.div
                className="flex items-center gap-1 text-blue-600"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400 }}
                title={`${totalCount} participants in this session`}
            >
                <Users className="w-4 h-4" />
                <span className="text-xs font-medium font-brand">{totalCount}</span>
            </motion.div>
        </motion.div>
    )
} 