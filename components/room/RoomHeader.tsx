'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Users, Hash, Copy, Check, Settings, LogOut, ChevronDown } from 'lucide-react'
import { Room, User, CARD_TYPES } from '@/types'
import { AnimatePresence } from 'framer-motion'

interface RoomHeaderProps {
    room: Room
    currentUser: User
    onLeaveRoom: () => void
    onRevealVotes: () => void
    onResetVotes: () => void
    onEndSession?: () => void
    isVoting: boolean
    isRevealed: boolean
    isEditingStory?: boolean
}

export function RoomHeader({
    room,
    currentUser,
    onLeaveRoom,
    onRevealVotes,
    onResetVotes,
    onEndSession,
    isVoting,
    isRevealed,
    isEditingStory = false
}: RoomHeaderProps) {
    const [showParticipants, setShowParticipants] = useState(false)
    const [copied, setCopied] = useState(false)
    const [showTooltip, setShowTooltip] = useState<string | null>(null)
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0, arrowUp: true })

    const copyRoomCode = () => {
        navigator.clipboard.writeText(room.code)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const isRoomCreator = currentUser.id === room.createdBy

    const votedParticipants = room.participants.filter(p =>
        room.stories[room.currentStoryIndex]?.votes.some(v => v.userId === p.id)
    )

    const getParticipantType = (participant: any) => {
        if (participant.isAnonymous) return 'Anonymous'
        if (participant.walletAddress) return 'Wallet'
        if (participant.id === room.createdBy) return 'Scrum Master'
        return 'Guest'
    }

    const getParticipantTypeClass = (participant: any) => {
        if (participant.isAnonymous) return 'participant-type-anonymous'
        if (participant.walletAddress) return 'participant-type-wallet'
        if (participant.id === room.createdBy) return 'participant-type-scrum-master'
        return 'participant-type-guest'
    }

    const handleMouseEnter = (e: React.MouseEvent, tooltipType: string) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const viewportWidth = window.innerWidth
        const viewportHeight = window.innerHeight

        // Calculate initial position
        let x = rect.left + rect.width / 2
        let y = rect.bottom + 10

        // Ensure tooltip doesn't go off-screen horizontally
        const tooltipWidth = 300 // Approximate tooltip width
        if (x + tooltipWidth / 2 > viewportWidth) {
            x = viewportWidth - tooltipWidth / 2 - 10
        } else if (x - tooltipWidth / 2 < 0) {
            x = tooltipWidth / 2 + 10
        }

        // Ensure tooltip doesn't go off-screen vertically
        const tooltipHeight = 60 // Approximate tooltip height
        let arrowUp = true
        if (y + tooltipHeight > viewportHeight) {
            y = rect.top - tooltipHeight - 10
            arrowUp = false
        }

        setTooltipPosition({ x, y, arrowUp })
        setShowTooltip(tooltipType)
    }

    const handleMouseLeave = () => {
        setShowTooltip(null)
    }

    return (
        <div className="bg-white border-b border-gray-200 shadow-sm relative overflow-hidden">
            {/* Subtle gradient background */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 via-white to-purple-50/30"></div>

            <div className="container mx-auto px-4 py-3 relative z-10">
                <div className="flex items-center justify-between">
                    {/* Simplified Room Info */}
                    <div className="flex items-center gap-6">
                        {/* Session Code - Primary Info */}
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-500 font-medium font-distressed">Session</span>
                                <div className="flex items-center gap-2 bg-gradient-to-r from-gray-50 to-blue-50 px-3 py-1 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
                                    <Hash className="w-4 h-4 text-gray-600" />
                                    <span className="font-mono font-bold text-black">{room.code}</span>
                                    <button
                                        onClick={copyRoomCode}
                                        className="text-gray-400 hover:text-black transition-colors hover:scale-110 transform duration-200"
                                        title={copied ? "Room code copied!" : "Copy room code to clipboard"}
                                    >
                                        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Card Type - Secondary Info */}
                        <div className="hidden sm:block" title={`Using ${CARD_TYPES[room.cardType].name} card set for voting`}>
                            <span className="text-sm text-gray-500 font-medium font-distressed">Cards:</span>
                            <span className="ml-2 text-sm font-medium text-black font-brand bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                {CARD_TYPES[room.cardType].name}
                            </span>
                        </div>

                        {/* Participants - Secondary Info */}
                        <div className="hidden md:block relative">
                            <button
                                onClick={() => setShowParticipants(!showParticipants)}
                                className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors p-2 rounded-lg hover:bg-gray-50 hover:shadow-sm cursor-pointer"
                                title={showParticipants ? "Hide participants list" : "View participants and their votes"}
                            >
                                <span className="text-sm text-gray-500 font-medium font-distressed">Team:</span>
                                <span className="text-sm font-medium text-black font-brand">
                                    {room.participants.length} people
                                </span>
                                <ChevronDown className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Simplified Controls */}
                    <div className="flex items-center gap-3">
                        {/* Participants Button - Mobile */}
                        <button
                            onClick={() => setShowParticipants(!showParticipants)}
                            className="md:hidden flex items-center gap-2 text-gray-600 hover:text-black transition-colors p-2 rounded-lg hover:bg-gray-50 hover:shadow-sm"
                            title={showParticipants ? "Hide participants list" : "View participants and their votes"}
                        >
                            <Users className="w-5 h-5" />
                            <span className="text-sm font-medium">{room.participants.length}</span>
                        </button>

                        {/* Room Controls - Only for Creator */}
                        {isRoomCreator && (
                            <div className="flex items-center gap-2">
                                {isVoting && (
                                    <button
                                        onClick={onRevealVotes}
                                        disabled={isEditingStory}
                                        onMouseEnter={(e) => handleMouseEnter(e, 'reveal')}
                                        onMouseLeave={handleMouseLeave}
                                        className={`reveal-votes-btn font-medium py-2 px-4 rounded-lg transition-all duration-300 text-sm font-brand shadow-md hover:shadow-lg transform hover:scale-105 ${isEditingStory
                                            ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                                            : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
                                            }`}
                                    >
                                        Reveal Votes
                                    </button>
                                )}
                                {isRevealed && (
                                    <>
                                        <button
                                            onClick={onResetVotes}
                                            disabled={isEditingStory}
                                            onMouseEnter={(e) => handleMouseEnter(e, 'new')}
                                            onMouseLeave={handleMouseLeave}
                                            className={`header-btn font-medium py-2 px-4 border rounded-lg transition-all duration-300 text-sm font-brand shadow-sm hover:shadow-md transform hover:scale-105 ${isEditingStory
                                                ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                                                : 'bg-white text-black border-gray-300 hover:bg-gray-50 hover:border-gray-400'
                                                }`}
                                        >
                                            New Vote
                                        </button>
                                        {onEndSession && (
                                            <button
                                                onClick={onEndSession}
                                                disabled={isEditingStory}
                                                onMouseEnter={(e) => handleMouseEnter(e, 'end')}
                                                onMouseLeave={handleMouseLeave}
                                                className={`header-btn font-medium py-2 px-4 rounded-lg transition-all duration-300 text-sm font-brand shadow-md hover:shadow-lg transform hover:scale-105 ${isEditingStory
                                                    ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                                                    : 'bg-gradient-to-r from-red-600 to-pink-600 text-white hover:from-red-700 hover:to-pink-700'
                                                    }`}
                                            >
                                                End Session
                                            </button>
                                        )}
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Participants Dropdown - Simplified */}
                <AnimatePresence>
                    {showParticipants && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-4 p-4 bg-gradient-to-br from-gray-50 to-blue-50 border border-gray-200 rounded-lg shadow-lg"
                        >
                            <h3 className="text-black font-bold mb-3 text-sm font-brand">Participants ({room.participants.length})</h3>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                {room.participants.map((participant) => {
                                    const hasVoted = room.stories[room.currentStoryIndex]?.votes.some(
                                        v => v.userId === participant.id
                                    )
                                    const vote = room.stories[room.currentStoryIndex]?.votes.find(
                                        v => v.userId === participant.id
                                    )

                                    return (
                                        <motion.div
                                            key={participant.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className={`p-3 border rounded-lg transition-all duration-300 hover:shadow-md transform hover:scale-105 ${hasVoted && isVoting
                                                ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200'
                                                : hasVoted && isRevealed
                                                    ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200'
                                                    : 'bg-white border-gray-200 hover:border-gray-300'
                                                }`}
                                        >
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="font-medium text-black text-sm font-brand">
                                                    {participant.name}
                                                </span>
                                                <div className="flex items-center gap-1">
                                                    {hasVoted && (isVoting || isRevealed) && (
                                                        <motion.div
                                                            initial={{ scale: 0 }}
                                                            animate={{ scale: 1 }}
                                                            transition={{ type: "spring", stiffness: 500 }}
                                                        >
                                                            <Check className={`w-3 h-3 ${isRevealed ? 'text-yellow-600' : 'text-green-600'}`} />
                                                        </motion.div>
                                                    )}
                                                    <span className={`text-xs px-2 py-1 rounded-full ${getParticipantTypeClass(participant)}`}>
                                                        {getParticipantType(participant)}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Vote Display */}
                                            <div className="flex items-center justify-between">
                                                {hasVoted ? (
                                                    <div className="flex items-center gap-2">
                                                        <motion.div
                                                            className={`w-6 h-5 rounded flex items-center justify-center text-white text-xs font-bold shadow-sm ${isRevealed
                                                                ? 'bg-gradient-to-r from-yellow-500 to-orange-500'
                                                                : 'bg-gradient-to-r from-black to-gray-800'
                                                                }`}
                                                            initial={{ scale: 0 }}
                                                            animate={{ scale: 1 }}
                                                            transition={{ type: "spring", stiffness: 500, delay: 0.1 }}
                                                        >
                                                            {vote?.value}
                                                        </motion.div>
                                                        <span className="text-xs text-gray-600 font-distressed">
                                                            {isRevealed ? 'revealed' : 'points'}
                                                        </span>
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-6 h-5 bg-gray-300 rounded flex items-center justify-center text-gray-500 text-xs font-bold">
                                                            —
                                                        </div>
                                                        <span className="text-xs text-gray-500 font-distressed">
                                                            {isRevealed ? 'no vote' : 'no vote'}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        </motion.div>
                                    )
                                })}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
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
                        {/* Dynamic arrow direction */}
                        <div
                            className={`absolute left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-transparent ${tooltipPosition.arrowUp
                                    ? 'bottom-full border-b-4 border-b-black'
                                    : 'top-full border-t-4 border-t-black'
                                }`}
                        ></div>
                    </div>
                </div>
            )}
        </div>
    )
} 