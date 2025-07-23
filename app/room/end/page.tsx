'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { CheckCircle, RefreshCw, Home, LogOut, Share2, Smile } from 'lucide-react'
import toast from 'react-hot-toast'

export default function EndSessionPage() {
    const router = useRouter()
    const [isSharing, setIsSharing] = useState(false)

    // Mock session data
    const sessionData = {
        totalStories: 5,
        completedStories: 5,
        avgVotes: 4.2,
        duration: '45 minutes',
        participants: 6
    }

    const handleStartNewSession = () => {
        router.push('/room/create?mode=guest')
    }

    const handleReturnToHome = () => {
        router.push('/')
    }

    const handleShareSummary = async () => {
        setIsSharing(true)

        // Simulate sharing
        await new Promise(resolve => setTimeout(resolve, 1000))

        setIsSharing(false)
        toast.success('Session summary shared!')
    }

    const handleRateExperience = () => {
        toast.success('Thank you for your feedback!')
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="card p-8 max-w-2xl w-full text-center"
            >
                <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-white" />
                </div>

                <h1 className="text-3xl font-bold text-white mb-4">Planning Complete!</h1>
                <p className="text-xl text-white/70 mb-8">
                    Nice work! You've finished your session.
                </p>

                {/* Session Summary */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white/5 rounded-lg p-4">
                        <div className="text-2xl font-bold text-white">{sessionData.totalStories}</div>
                        <div className="text-white/60 text-sm">Total Tasks</div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-4">
                        <div className="text-2xl font-bold text-white">{sessionData.completedStories}</div>
                        <div className="text-white/60 text-sm">Completed</div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-4">
                        <div className="text-2xl font-bold text-white">{sessionData.avgVotes}</div>
                        <div className="text-white/60 text-sm">Avg Votes</div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-4">
                        <div className="text-2xl font-bold text-white">{sessionData.participants}</div>
                        <div className="text-white/60 text-sm">Participants</div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    <button
                        onClick={handleStartNewSession}
                        className="btn-primary flex items-center justify-center gap-2"
                    >
                        <RefreshCw className="w-5 h-5" />
                        Start New Session
                    </button>

                    <button
                        onClick={handleReturnToHome}
                        className="btn-secondary flex items-center justify-center gap-2"
                    >
                        <Home className="w-5 h-5" />
                        Return to Homepage
                    </button>
                </div>

                {/* Bonus Actions */}
                <div className="flex justify-center gap-4 mb-6">
                    <button
                        onClick={handleShareSummary}
                        disabled={isSharing}
                        className="flex items-center gap-2 text-white/60 hover:text-white transition-colors disabled:opacity-50"
                    >
                        <Share2 className="w-4 h-4" />
                        {isSharing ? 'Sharing...' : 'Share Summary'}
                    </button>

                    <button
                        onClick={handleRateExperience}
                        className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
                    >
                        <Smile className="w-4 h-4" />
                        Rate Experience
                    </button>
                </div>

                <p className="text-white/40 text-sm">
                    Come back anytime 👋
                </p>
            </motion.div>
        </div>
    )
} 