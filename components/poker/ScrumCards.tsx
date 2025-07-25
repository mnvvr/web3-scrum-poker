'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { CARD_TYPES, CardType, User } from '@/types'

interface ScrumCardsProps {
    cardType: CardType
    selectedValue: number | string | null
    onSelectCard: (value: number | string) => void
    isRevealed: boolean
    votes: Array<{ userId: string; value: number | string }>
    participants: User[]
}

export function ScrumCards({ cardType, selectedValue, onSelectCard, isRevealed, votes, participants }: ScrumCardsProps) {
    const [hoveredCard, setHoveredCard] = useState<number | string | null>(null)
    const [hoveredStat, setHoveredStat] = useState<string | null>(null)
    const cardValues = CARD_TYPES[cardType].values

    const getVoteCount = (value: number | string) => {
        return votes.filter(vote => vote.value === value).length
    }

    const getVotersForValue = (value: number | string) => {
        return votes
            .filter(vote => vote.value === value)
            .map(vote => participants.find(p => p.id === vote.userId))
            .filter(Boolean) as User[]
    }

    const getCardImage = (value: number | string) => {
        if (value === 0) return '/cards/card00.png'
        if (value === 1) return '/cards/card01.png'
        if (value === 2) return '/cards/card02.png'
        if (value === 3) return '/cards/card03.png'
        if (value === 5) return '/cards/card05.png'
        if (value === 8) return '/cards/card08.png'
        if (value === 13) return '/cards/card13.png'
        if (value === 20) return '/cards/card20.png'
        if (value === 40) return '/cards/card40.png'
        if (value === 100) return '/cards/card100.png'
        if (value === '☕') return '/cards/cardbreak.png'
        if (value === '?') return '/cards/cardquestion.png'
        return null
    }

    const getCardColor = (value: number | string) => {
        // For emoji cards, use a special color
        if (typeof value === 'string' && ['👍', '❓', '☕', '💤', '🚀', '🔥', '?'].includes(value)) {
            return 'from-pink-400 to-pink-600'
        }

        // For T-shirt sizes, use green
        if (typeof value === 'string' && ['XS', 'S', 'M', 'L', 'XL', 'XXL', '?'].includes(value)) {
            return 'from-green-400 to-green-600'
        }

        // For numeric values, use different colors based on value
        if (typeof value === 'number') {
            if (value === 0) return 'from-gray-400 to-gray-600'
            if (value <= 3) return 'from-green-400 to-green-600'
            if (value <= 8) return 'from-yellow-400 to-yellow-600'
            if (value <= 21) return 'from-orange-400 to-orange-600'
            if (value <= 55) return 'from-red-400 to-red-600'
            return 'from-purple-400 to-purple-600'
        }

        // Default color for unknown values
        return 'from-blue-400 to-blue-600'
    }

    return (
        <div className="w-full max-w-6xl mx-auto">
            {/* Vote summary when revealed - Moved to top for better visibility */}
            {isRevealed && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8 p-6 bg-white border border-black rounded-lg shadow-lg relative overflow-visible chani-card"
                    style={{
                        boxShadow: '6px 6px 0 rgba(0, 0, 0, 0.15), 12px 12px 0 rgba(0, 0, 0, 0.1)',
                        transform: 'rotate(var(--rotation, 1deg))'
                    }}
                >
                    {/* Distressed background pattern */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white opacity-50"></div>
                    <div className="absolute top-4 right-4 w-8 h-8 text-black/10 font-bold text-lg transform rotate-12">📊</div>
                    <div className="absolute bottom-4 left-4 w-8 h-8 text-black/10 font-bold text-lg transform -rotate-12">🎯</div>

                    <div className="relative z-10">
                        <h3 className="text-xl font-bold text-black mb-6 text-center font-brand">Vote Summary</h3>

                        {/* Quick Stats Row */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 relative z-10">
                            <div
                                className="text-center p-3 bg-gray-50 rounded-lg border border-gray-200 transform hover:rotate-1 transition-transform vintage-paper relative group cursor-pointer"
                                onMouseEnter={() => setHoveredStat('total')}
                                onMouseLeave={() => setHoveredStat(null)}
                            >
                                <div className="text-2xl font-bold text-black mb-1 font-distressed">
                                    {votes.length}
                                </div>
                                <div className="text-gray-600 text-xs font-distressed">Total Votes</div>

                                {/* Hover Widget */}
                                <AnimatePresence>
                                    {hoveredStat === 'total' && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 z-[9999]"
                                        >
                                            <div className="bg-black text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap border border-white/20 font-medium min-w-max shadow-2xl">
                                                <div className="font-bold mb-1">Voters:</div>
                                                <div className="flex flex-wrap gap-1">
                                                    {participants.filter(p => votes.some(v => v.userId === p.id)).map(p => (
                                                        <span key={p.id} className="bg-white/20 px-1 rounded text-xs">
                                                            {p.name}
                                                        </span>
                                                    ))}
                                                </div>
                                                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-black"></div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            <div
                                className="text-center p-3 bg-gray-50 rounded-lg border border-gray-200 transform hover:-rotate-1 transition-transform vintage-paper relative group cursor-pointer"
                                onMouseEnter={() => setHoveredStat('unique')}
                                onMouseLeave={() => setHoveredStat(null)}
                            >
                                <div className="text-2xl font-bold text-black mb-1 font-distressed">
                                    {cardValues.filter(value => getVoteCount(value) > 0).length}
                                </div>
                                <div className="text-gray-600 text-xs font-distressed">Unique Values</div>

                                {/* Hover Widget */}
                                <AnimatePresence>
                                    {hoveredStat === 'unique' && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 z-[9999]"
                                        >
                                            <div className="bg-black text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap border border-white/20 font-medium min-w-max shadow-2xl">
                                                <div className="font-bold mb-1">Unique Values:</div>
                                                <div className="flex flex-wrap gap-1">
                                                    {cardValues.filter(value => getVoteCount(value) > 0).map(value => (
                                                        <span key={value} className="bg-white/20 px-1 rounded text-xs">
                                                            {value}
                                                        </span>
                                                    ))}
                                                </div>
                                                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-black"></div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            <div
                                className="text-center p-3 bg-gray-50 rounded-lg border border-gray-200 transform hover:rotate-1 transition-transform vintage-paper relative group cursor-pointer"
                                onMouseEnter={() => setHoveredStat('most')}
                                onMouseLeave={() => setHoveredStat(null)}
                            >
                                <div className="text-2xl font-bold text-black mb-1 font-distressed">
                                    {Math.max(...cardValues.map(value => getVoteCount(value)))}
                                </div>
                                <div className="text-gray-600 text-xs font-distressed">Most Votes</div>

                                {/* Hover Widget */}
                                <AnimatePresence>
                                    {hoveredStat === 'most' && (() => {
                                        const maxVotes = Math.max(...cardValues.map(value => getVoteCount(value)))
                                        const mostVotedValue = cardValues.find(value => getVoteCount(value) === maxVotes)
                                        const voters = mostVotedValue ? getVotersForValue(mostVotedValue) : []

                                        return (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 10 }}
                                                className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 z-[9999]"
                                            >
                                                <div className="bg-black text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap border border-white/20 font-medium min-w-max shadow-2xl">
                                                    <div className="font-bold mb-1">Most voted: {mostVotedValue}</div>
                                                    <div className="flex flex-wrap gap-1">
                                                        {voters.map(voter => (
                                                            <span key={voter.id} className="bg-white/20 px-1 rounded text-xs">
                                                                {voter.name}
                                                            </span>
                                                        ))}
                                                    </div>
                                                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-black"></div>
                                                </div>
                                            </motion.div>
                                        )
                                    })()}
                                </AnimatePresence>
                            </div>

                            <div
                                className="text-center p-3 bg-gray-50 rounded-lg border border-gray-200 transform hover:-rotate-1 transition-transform vintage-paper relative group cursor-pointer"
                                onMouseEnter={() => setHoveredStat('participation')}
                                onMouseLeave={() => setHoveredStat(null)}
                            >
                                <div className="text-2xl font-bold text-black mb-1 font-distressed">
                                    {votes.length > 0 ? Math.round((votes.length / votes.length) * 100) : 0}%
                                </div>
                                <div className="text-gray-600 text-xs font-distressed">Participation</div>

                                {/* Hover Widget */}
                                <AnimatePresence>
                                    {hoveredStat === 'participation' && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 z-[9999]"
                                        >
                                            <div className="bg-black text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap border border-white/20 font-medium min-w-max shadow-2xl">
                                                <div className="font-bold mb-1">Participants:</div>
                                                <div className="flex flex-wrap gap-1">
                                                    {participants.map(p => {
                                                        const hasVoted = votes.some(v => v.userId === p.id)
                                                        return (
                                                            <span key={p.id} className={`px-1 rounded text-xs ${hasVoted ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                                                                {p.name} {hasVoted ? '✓' : '✗'}
                                                            </span>
                                                        )
                                                    })}
                                                </div>
                                                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-black"></div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* Consensus Analysis */}
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4 relative overflow-hidden vintage-paper z-0">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-100/20 to-transparent"></div>
                            <div className="relative z-10">
                                <h4 className="text-lg font-bold text-blue-800 mb-2 font-brand">Consensus Analysis</h4>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                    <div className="text-center">
                                        <div className="text-blue-600 font-bold font-distressed">
                                            {(() => {
                                                const maxVotes = Math.max(...cardValues.map(value => getVoteCount(value)))
                                                const totalVotes = votes.length
                                                return totalVotes > 0 ? Math.round((maxVotes / totalVotes) * 100) : 0
                                            })()}%
                                        </div>
                                        <div className="text-blue-700 font-distressed">Highest Consensus</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-blue-600 font-bold font-distressed">
                                            {cardValues.filter(value => getVoteCount(value) > 0).length}
                                        </div>
                                        <div className="text-blue-700 font-distressed">Different Opinions</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-blue-600 font-bold font-distressed">
                                            {(() => {
                                                const uniqueVotes = cardValues.filter(value => getVoteCount(value) > 0).length
                                                return uniqueVotes <= 2 ? 'High' : uniqueVotes <= 4 ? 'Medium' : 'Low'
                                            })()}
                                        </div>
                                        <div className="text-blue-700 font-distressed">Team Alignment</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Vote Range Info */}
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 relative overflow-hidden vintage-paper z-0">
                            <div className="absolute inset-0 bg-gradient-to-br from-gray-100/20 to-transparent"></div>
                            <div className="relative z-10">
                                <h4 className="text-lg font-bold text-gray-800 mb-2 font-brand">Vote Range</h4>
                                <div className="flex items-center justify-between text-sm">
                                    <div className="text-center">
                                        <div className="text-gray-600 font-bold font-distressed">
                                            {(() => {
                                                const votedValues = cardValues.filter(value => getVoteCount(value) > 0)
                                                return votedValues.length > 0 ? Math.min(...votedValues.map(v => typeof v === 'number' ? v : 0)) : 0
                                            })()}
                                        </div>
                                        <div className="text-gray-700 font-distressed">Lowest Vote</div>
                                    </div>
                                    <div className="text-gray-400">→</div>
                                    <div className="text-center">
                                        <div className="text-gray-600 font-bold font-distressed">
                                            {(() => {
                                                const votedValues = cardValues.filter(value => getVoteCount(value) > 0)
                                                return votedValues.length > 0 ? Math.max(...votedValues.map(v => typeof v === 'number' ? v : 0)) : 0
                                            })()}
                                        </div>
                                        <div className="text-gray-700 font-distressed">Highest Vote</div>
                                    </div>
                                    <div className="text-gray-400">→</div>
                                    <div className="text-center">
                                        <div className="text-gray-600 font-bold font-distressed">
                                            {(() => {
                                                const votedValues = cardValues.filter(value => getVoteCount(value) > 0)
                                                if (votedValues.length === 0) return 0
                                                const max = Math.max(...votedValues.map(v => typeof v === 'number' ? v : 0))
                                                const min = Math.min(...votedValues.map(v => typeof v === 'number' ? v : 0))
                                                return max - min
                                            })()}
                                        </div>
                                        <div className="text-gray-700 font-distressed">Range</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 max-w-7xl mx-auto">
                <AnimatePresence>
                    {!isRevealed && cardValues.map((value, index) => {
                        const isSelected = selectedValue === value
                        const voteCount = getVoteCount(value)
                        const isVoted = voteCount > 0

                        return (
                            <motion.div
                                key={value}
                                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
                                whileHover={{ scale: 1.05, rotate: 2 }}
                                whileTap={{ scale: 0.95 }}
                                className="relative group"
                            >
                                <button
                                    onClick={() => !isRevealed && onSelectCard(value)}
                                    disabled={isRevealed}
                                    onMouseEnter={() => setHoveredCard(value)}
                                    onMouseLeave={() => setHoveredCard(null)}
                                    className={`
                    w-full aspect-[3/4] rounded-xl border-2 transition-all duration-300
                    relative overflow-hidden shadow-xl
                    ${isSelected
                                            ? 'border-black shadow-2xl shadow-black/40 scale-105 ring-4 ring-green-200'
                                            : 'border-black/30 hover:border-black/60 hover:shadow-2xl hover:shadow-black/30'
                                        }
                    ${isRevealed ? 'cursor-default' : 'cursor-pointer hover:scale-105'}
                    ${isVoted && isRevealed ? 'ring-2 ring-yellow-400 ring-offset-2 ring-offset-white' : ''}
                    
                    /* Background - use image if available, otherwise gradient */
                    ${getCardImage(value) ? 'bg-white' : `bg-gradient-to-br ${getCardColor(value)}`}
                  `}
                                >
                                    {getCardImage(value) ? (
                                        <Image
                                            src={getCardImage(value)!}
                                            alt={`Card ${value}`}
                                            fill
                                            className="object-contain rounded-xl"
                                            unoptimized
                                        />
                                    ) : (
                                        <>
                                            {/* Hand-drawn corner decoration */}
                                            <div className="absolute top-2 left-2 w-5 h-5 text-white/20 font-bold text-sm transform -rotate-12">
                                                ♠
                                            </div>
                                            <div className="absolute bottom-2 right-2 w-5 h-5 text-white/20 font-bold text-sm transform rotate-12">
                                                ♥
                                            </div>

                                            <div className="flex flex-col items-center justify-center h-full p-2 relative z-10">
                                                <span className="text-2xl md:text-3xl font-bold font-distressed text-white">
                                                    {value}
                                                </span>
                                            </div>

                                            {/* Distressed overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-br from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        </>
                                    )}

                                    {isRevealed && isVoted && (
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="absolute -top-2 -right-2 w-7 h-7 bg-yellow-400 rounded-full flex items-center justify-center border-2 border-black shadow-lg"
                                        >
                                            <span className="text-sm font-bold text-black">{voteCount}</span>
                                        </motion.div>
                                    )}
                                </button>

                                {/* Hover tooltip - CHANI style */}
                                <AnimatePresence>
                                    {hoveredCard === value && !isRevealed && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 z-[9999]"
                                        >
                                            <div className="bg-black text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap border border-white/20 font-medium shadow-lg">
                                                Click to select this card
                                                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black"></div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        )
                    })}
                </AnimatePresence>
            </div>
        </div>
    )
} 