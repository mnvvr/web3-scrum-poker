'use client'

import { motion } from 'framer-motion'
import { Users, Hash, Copy, Check, Settings, LogOut } from 'lucide-react'
import { Room, User, CARD_TYPES } from '@/types'
import { useState } from 'react'
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
}

export function RoomHeader({
    room,
    currentUser,
    onLeaveRoom,
    onRevealVotes,
    onResetVotes,
    onEndSession,
    isVoting,
    isRevealed
}: RoomHeaderProps) {
    const [showParticipants, setShowParticipants] = useState(false)
    const [copied, setCopied] = useState(false)

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

    return (
        <div className="bg-white border-b-2 border-black">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    {/* Room Info */}
                    <div className="flex items-center gap-4">
                        <div>
                            <h1 className="text-2xl font-bold text-black font-brand">Session Code</h1>
                            <div className="flex items-center gap-2 text-gray-600 text-sm">
                                <Hash className="w-4 h-4" />
                                <span className="font-mono">{room.code}</span>
                                <div className="relative group">
                                    <button
                                        onClick={copyRoomCode}
                                        className="flex items-center gap-1 hover:text-black transition-colors"
                                    >
                                        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                    </button>
                                    {/* Copy Tooltip */}
                                    <div className="absolute bottom-full left-0 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-[9999]">
                                        Copy room code
                                        <div className="absolute top-full left-2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-black"></div>
                                    </div>
                                </div>
                            </div>

                            {/* Card Type Info */}
                            <div className="mt-3 flex items-center gap-2">
                                <span className="text-sm text-gray-600 font-distressed">
                                    Card type: {CARD_TYPES[room.cardType].name}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Participants */}
                    <div className="flex items-center gap-4">
                        <div className="relative group">
                            <button
                                onClick={() => setShowParticipants(!showParticipants)}
                                className="flex items-center gap-2 text-black hover:text-gray-600 transition-colors bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg"
                            >
                                <Users className="w-5 h-5" />
                                <span className="font-medium">{room.participants.length} participants</span>
                            </button>
                            {/* Participants Tooltip */}
                            <div className="absolute bottom-full left-0 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-[9999]">
                                View all participants and voting status
                                <div className="absolute top-full left-4 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-black"></div>
                            </div>
                        </div>

                        {/* Room Controls */}
                        {isRoomCreator && (
                            <div className="flex items-center gap-2">
                                {isVoting && (
                                    <div className="relative group">
                                        <button
                                            onClick={onRevealVotes}
                                            className="vintage-btn text-sm py-2 px-4"
                                        >
                                            Reveal Votes
                                        </button>
                                        {/* Reveal Votes Tooltip */}
                                        <div className="absolute bottom-full left-0 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-[9999]">
                                            Show everyone's votes and calculate results
                                            <div className="absolute top-full left-4 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-black"></div>
                                        </div>
                                    </div>
                                )}
                                {isRevealed && (
                                    <>
                                        <div className="relative group">
                                            <button
                                                onClick={onResetVotes}
                                                className="bg-white text-black font-semibold py-2 px-4 border border-black transition-all duration-300 hover:bg-gray-50 text-sm"
                                            >
                                                New Vote
                                            </button>
                                            {/* New Vote Tooltip */}
                                            <div className="absolute bottom-full left-0 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-[9999]">
                                                Start voting on the next story
                                                <div className="absolute top-full left-4 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-black"></div>
                                            </div>
                                        </div>
                                        {onEndSession && (
                                            <div className="relative group">
                                                <button
                                                    onClick={onEndSession}
                                                    className="vintage-btn text-sm py-2 px-4"
                                                >
                                                    End Session
                                                </button>
                                                {/* End Session Tooltip */}
                                                <div className="absolute bottom-full left-0 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-[9999]">
                                                    Close this planning session
                                                    <div className="absolute top-full left-4 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-black"></div>
                                                </div>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Participants Dropdown */}
                <AnimatePresence>
                    {showParticipants && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-4 p-6 bg-white border border-black rounded-lg shadow-lg"
                        >
                            <h3 className="text-black font-bold mb-4 font-brand">Participants ({room.participants.length})</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                {room.participants.map((participant) => {
                                    const hasVoted = room.stories[room.currentStoryIndex]?.votes.some(
                                        v => v.userId === participant.id
                                    )
                                    const vote = room.stories[room.currentStoryIndex]?.votes.find(
                                        v => v.userId === participant.id
                                    )

                                    return (
                                        <div
                                            key={participant.id}
                                            className={`p-3 border rounded-lg transition-all duration-200 ${hasVoted && isVoting
                                                ? 'bg-green-50 border-green-300'
                                                : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                                                }`}
                                        >
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="font-medium text-black">
                                                    {participant.name}
                                                </span>
                                                <div className="flex items-center gap-2">
                                                    {hasVoted && isVoting && (
                                                        <Check className="w-4 h-4 text-green-600" />
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
                                                        <div className="w-8 h-6 bg-black rounded flex items-center justify-center text-white text-xs font-bold">
                                                            {vote?.value}
                                                        </div>
                                                        <span className="text-xs text-gray-600">points</span>
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-8 h-6 bg-gray-300 rounded flex items-center justify-center text-gray-500 text-xs font-bold">
                                                            —
                                                        </div>
                                                        <span className="text-xs text-gray-500">no vote</span>
                                                    </div>
                                                )}
                                            </div>

                                            {participant.isAnonymous && (
                                                <div className="text-xs text-gray-500 mt-1">
                                                    Anonymous participant
                                                </div>
                                            )}
                                        </div>
                                    )
                                })}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
} 