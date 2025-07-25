'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Eye, RotateCcw, X, Users, Settings } from 'lucide-react'
import { User } from '@/types'

interface RoomHeaderProps {
    roomCode: string
    participants: User[]
    isRevealed: boolean
    onRevealVotes: () => void
    onNewVote: () => void
    onEndSession: () => void
    isEditingStory: boolean
}

export function RoomHeader({ roomCode, participants, isRevealed, onRevealVotes, onNewVote, onEndSession, isEditingStory }: RoomHeaderProps) {
    const [showTooltip, setShowTooltip] = useState<string | null>(null)
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 })

    const handleMouseEnter = (e: React.MouseEvent, tooltipType: string) => {
        const rect = e.currentTarget.getBoundingClientRect()
        setTooltipPosition({
            x: rect.left + rect.width / 2,
            y: rect.bottom + 10
        })
        setShowTooltip(tooltipType)
    }

    const handleMouseLeave = () => {
        setShowTooltip(null)
    }

    return (
        <div className="relative">
            <div className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
                <div className="flex items-center justify-between max-w-7xl mx-auto">
                    {/* Left side - Room info */}
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-lg">
                                🃏
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-black font-brand">Planning Room</h1>
                                <p className="text-sm text-gray-600 font-distressed">Code: <span className="font-mono font-bold text-black">{roomCode}</span></p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 text-gray-600">
                            <Users className="w-4 h-4" />
                            <span className="text-sm font-distressed">{participants.length} participants</span>
                        </div>
                    </div>

                    {/* Right side - Actions */}
                    <div className="flex items-center gap-3">
                        {/* Reveal Votes Button */}
                        <button
                            onClick={onRevealVotes}
                            disabled={isRevealed || isEditingStory}
                            onMouseEnter={(e) => handleMouseEnter(e, 'reveal')}
                            onMouseLeave={handleMouseLeave}
                            className={`
                                reveal-votes-btn header-btn inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-200
                                ${isRevealed || isEditingStory
                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    : 'bg-black text-white hover:bg-gray-800 hover:scale-105 shadow-lg'
                                }
                            `}
                        >
                            <Eye className="w-4 h-4" />
                            Reveal Votes
                        </button>

                        {/* New Vote Button */}
                        <button
                            onClick={onNewVote}
                            disabled={!isRevealed || isEditingStory}
                            onMouseEnter={(e) => handleMouseEnter(e, 'new')}
                            onMouseLeave={handleMouseLeave}
                            className={`
                                header-btn inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-200
                                ${!isRevealed || isEditingStory
                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    : 'bg-green-600 text-white hover:bg-green-700 hover:scale-105 shadow-lg'
                                }
                            `}
                        >
                            <RotateCcw className="w-4 h-4" />
                            New Vote
                        </button>

                        {/* End Session Button */}
                        <button
                            onClick={onEndSession}
                            disabled={isEditingStory}
                            onMouseEnter={(e) => handleMouseEnter(e, 'end')}
                            onMouseLeave={handleMouseLeave}
                            className={`
                                header-btn inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-200
                                ${isEditingStory
                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    : 'bg-red-600 text-white hover:bg-red-700 hover:scale-105 shadow-lg'
                                }
                            `}
                        >
                            <X className="w-4 h-4" />
                            End Session
                        </button>
                    </div>
                </div>
            </div>

            {/* Custom Tooltip */}
            {showTooltip && (
                <div
                    className="fixed pointer-events-none z-[2147483647]"
                    style={{
                        left: tooltipPosition.x,
                        top: tooltipPosition.y,
                        transform: 'translateX(-50%)'
                    }}
                >
                    <div className="bg-black text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap border border-white/20 font-medium shadow-xl backdrop-blur-sm">
                        {showTooltip === 'reveal' && (isEditingStory ? "Please finish editing the task first" : "Show all team votes and calculate the final estimate")}
                        {showTooltip === 'new' && (isEditingStory ? "Please finish editing the task first" : "Start a new voting round")}
                        {showTooltip === 'end' && (isEditingStory ? "Please finish editing the task first" : "End the current session")}
                        <div className="absolute left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 top-full border-t-4 border-transparent border-t-black"></div>
                    </div>
                </div>
            )}
        </div>
    )
} 