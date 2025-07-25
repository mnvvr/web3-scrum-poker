'use client'

import { motion } from 'framer-motion'
import { CheckCircle, RefreshCw, Home, LogOut, Share2, Smile } from 'lucide-react'
import { Room } from '@/types'

interface EndSessionProps {
    room: Room
    onStartNewSession: () => void
    onReturnToRoom: () => void
    onExitToHome: () => void
    onDisconnectWallet: () => void
}

export function EndSession({
    room,
    onStartNewSession,
    onReturnToRoom,
    onExitToHome,
    onDisconnectWallet
}: EndSessionProps) {
    const totalStories = room.stories.length
    const completedStories = room.stories.filter(story => story.isRevealed).length
    const avgVotes = room.stories.reduce((sum, story) => sum + story.votes.length, 0) / totalStories || 0

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="card p-8 max-w-2xl w-full text-center"
            >
                {/* Success Icon */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                    <CheckCircle className="w-10 h-10 text-white" />
                </motion.div>

                {/* Completion Message */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mb-8"
                >
                    <h1 className="text-3xl font-bold text-white mb-4">Planning Complete!</h1>
                    <p className="text-xl text-white/70 mb-6">
                        Nice work! You've finished your session.
                    </p>
                </motion.div>

                {/* Session Summary */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="grid md:grid-cols-3 gap-6 mb-8"
                >
                    <div className="text-center">
                        <div className="text-3xl font-bold text-white mb-1">{totalStories}</div>
                        <div className="text-white/60">Total Tasks</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-white mb-1">{completedStories}</div>
                        <div className="text-white/60">Completed</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-white mb-1">{avgVotes.toFixed(1)}</div>
                        <div className="text-white/60">Avg Votes</div>
                    </div>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="space-y-4"
                >
                    <div className="grid md:grid-cols-2 gap-4">
                        <button
                            onClick={onStartNewSession}
                            className="btn-primary flex items-center justify-center gap-2"
                            title="Start a new planning session with the same team"
                        >
                            <RefreshCw className="w-4 h-4" />
                            Start New Session
                        </button>
                        <button
                            onClick={onReturnToRoom}
                            className="btn-secondary flex items-center justify-center gap-2"
                            title="Go back to the current room"
                        >
                            <Home className="w-4 h-4" />
                            Return to Room
                        </button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        <button
                            onClick={onExitToHome}
                            className="btn-secondary flex items-center justify-center gap-2"
                            title="Return to the homepage"
                        >
                            <Home className="w-4 h-4" />
                            Exit to Homepage
                        </button>
                        <button
                            onClick={onDisconnectWallet}
                            className="btn-secondary flex items-center justify-center gap-2"
                            title="Disconnect your Web3 wallet"
                        >
                            <LogOut className="w-4 h-4" />
                            Disconnect Wallet
                        </button>
                    </div>
                </motion.div>

                {/* Bonus Elements */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="mt-8 pt-6 border-t border-white/10"
                >
                    <div className="flex items-center justify-center gap-6 mb-4">
                        <button className="flex items-center gap-2 text-white/60 hover:text-white transition-colors">
                            <Share2 className="w-4 h-4" />
                            Share Summary
                        </button>
                        <button className="flex items-center gap-2 text-white/60 hover:text-white transition-colors">
                            <Smile className="w-4 h-4" />
                            Rate Experience
                        </button>
                    </div>

                    <p className="text-white/40 text-sm">
                        Come back anytime 👋
                    </p>
                </motion.div>
            </motion.div>
        </div>
    )
} 