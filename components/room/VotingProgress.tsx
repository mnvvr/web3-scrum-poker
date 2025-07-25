'use client'

import { motion } from 'framer-motion'
import { Clock, CheckCircle } from 'lucide-react'

interface VotingProgressProps {
    votedCount: number
    totalCount: number
}

export function VotingProgress({ votedCount, totalCount }: VotingProgressProps) {
    const isComplete = votedCount === totalCount

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-4 bg-gray-50 border border-gray-300 rounded-full px-6 py-3 mb-6 relative overflow-hidden vintage-paper"
            style={{
                boxShadow: '2px 2px 0 rgba(0, 0, 0, 0.05)',
                transform: 'rotate(var(--rotation, 1deg))'
            }}
        >
            {/* Distressed overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>

            {isComplete ? (
                <>
                    <CheckCircle className="w-5 h-5 text-green-600 relative z-10" />
                    <span className="text-green-800 font-medium relative z-10 font-distressed">Everyone has voted! Ready to reveal</span>
                </>
            ) : (
                <>
                    <Clock className="w-5 h-5 text-yellow-600 relative z-10" />
                    <span className="text-yellow-800 font-medium relative z-10 font-distressed">
                        {votedCount} of {totalCount} voted
                    </span>
                    <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden relative z-10">
                        <div
                            className="h-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-500"
                            style={{ width: `${(votedCount / totalCount) * 100}%` }}
                        ></div>
                    </div>
                </>
            )}
        </motion.div>
    )
} 