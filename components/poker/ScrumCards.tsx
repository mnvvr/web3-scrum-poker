'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { createPortal } from 'react-dom'
import { CARD_TYPES, CardType, User } from '@/types'

interface ScrumCardsProps {
    cardType: CardType
    selectedValue: number | string | null
    onSelectCard: (value: number | string) => void
    isRevealed: boolean
    votes: Array<{ userId: string; value: number | string }>
    participants: User[]
    isEditingStory?: boolean
}

export function ScrumCards({ cardType, selectedValue, onSelectCard, isRevealed, votes, participants, isEditingStory = false }: ScrumCardsProps) {
    const [hoveredCard, setHoveredCard] = useState<number | string | null>(null)
    const [hoveredStat, setHoveredStat] = useState<string | null>(null)
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0, cardValue: null as number | string | null, isAbove: false })
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

    const getTooltipContent = (statType: string) => {
        switch (statType) {
            case 'total':
                return {
                    title: 'Total Votes',
                    description: `All ${votes.length} participants have cast their votes in this round.`
                }
            case 'unique':
                return {
                    title: 'Unique Values',
                    description: `${new Set(votes.map(v => v.value)).size} different vote values were chosen, showing the variety of team estimates.`
                }
            case 'highest':
                const highestValue = Math.max(...votes.map(v => typeof v.value === 'number' ? v.value : 0))
                return {
                    title: 'Highest Vote',
                    description: `The highest estimate was ${highestValue}, indicating the most complex or uncertain perspective.`
                }
            case 'lowest':
                const lowestValue = Math.min(...votes.map(v => typeof v.value === 'number' ? v.value : Infinity))
                return {
                    title: 'Lowest Vote',
                    description: `The lowest estimate was ${lowestValue}, suggesting the most optimistic or simple view.`
                }
            default:
                return {
                    title: 'Vote Statistic',
                    description: 'Information about this voting metric.'
                }
        }
    }

    return (
        <>
            <div className="w-full max-w-6xl mx-auto">
                {/* Vote summary when revealed - Moved to top for better visibility */}
                {isRevealed && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8 p-6 bg-white border border-black rounded-lg shadow-[6px_6px_0_rgba(0,0,0,0.15),12px_12px_0_rgba(0,0,0,0.1)] relative overflow-visible chani-card"
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
                                    <div className="text-2xl font-bold text-black font-brand mb-1">{votes.length}</div>
                                    <div className="text-xs text-gray-600 font-distressed">Total Votes</div>

                                    {/* Tooltip for Total Votes */}
                                    {hoveredStat === 'total' && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            className="absolute z-50 bg-black text-white p-3 rounded-lg shadow-lg max-w-xs border border-white/20"
                                            style={{
                                                left: '50%',
                                                top: '-80px',
                                                transform: 'translateX(-50%)'
                                            }}
                                        >
                                            <div>
                                                <div className="font-bold text-sm mb-1 font-brand">{getTooltipContent('total').title}</div>
                                                <div className="text-xs text-gray-300 font-distressed leading-relaxed">{getTooltipContent('total').description}</div>
                                            </div>
                                            {/* Arrow pointing down */}
                                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black"></div>
                                        </motion.div>
                                    )}
                                </div>

                                <div
                                    className="text-center p-3 bg-gray-50 rounded-lg border border-gray-200 transform hover:-rotate-1 transition-transform vintage-paper relative group cursor-pointer"
                                    onMouseEnter={() => setHoveredStat('unique')}
                                    onMouseLeave={() => setHoveredStat(null)}
                                >
                                    <div className="text-2xl font-bold text-black font-brand mb-1">
                                        {new Set(votes.map(v => v.value)).size}
                                    </div>
                                    <div className="text-xs text-gray-600 font-distressed">Unique Values</div>

                                    {/* Tooltip for Unique Values */}
                                    {hoveredStat === 'unique' && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            className="absolute z-50 bg-black text-white p-3 rounded-lg shadow-lg max-w-xs border border-white/20"
                                            style={{
                                                left: '50%',
                                                top: '-80px',
                                                transform: 'translateX(-50%)'
                                            }}
                                        >
                                            <div>
                                                <div className="font-bold text-sm mb-1 font-brand">{getTooltipContent('unique').title}</div>
                                                <div className="text-xs text-gray-300 font-distressed leading-relaxed">{getTooltipContent('unique').description}</div>
                                            </div>
                                            {/* Arrow pointing down */}
                                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black"></div>
                                        </motion.div>
                                    )}
                                </div>

                                <div
                                    className="text-center p-3 bg-gray-50 rounded-lg border border-gray-200 transform hover:rotate-1 transition-transform vintage-paper relative group cursor-pointer"
                                    onMouseEnter={() => setHoveredStat('highest')}
                                    onMouseLeave={() => setHoveredStat(null)}
                                >
                                    <div className="text-2xl font-bold text-black font-brand mb-1">
                                        {Math.max(...votes.map(v => typeof v.value === 'number' ? v.value : 0))}
                                    </div>
                                    <div className="text-xs text-gray-600 font-distressed">Highest Vote</div>

                                    {/* Tooltip for Highest Vote */}
                                    {hoveredStat === 'highest' && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            className="absolute z-50 bg-black text-white p-3 rounded-lg shadow-lg max-w-xs border border-white/20"
                                            style={{
                                                left: '50%',
                                                top: '-80px',
                                                transform: 'translateX(-50%)'
                                            }}
                                        >
                                            <div>
                                                <div className="font-bold text-sm mb-1 font-brand">{getTooltipContent('highest').title}</div>
                                                <div className="text-xs text-gray-300 font-distressed leading-relaxed">{getTooltipContent('highest').description}</div>
                                            </div>
                                            {/* Arrow pointing down */}
                                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black"></div>
                                        </motion.div>
                                    )}
                                </div>

                                <div
                                    className="text-center p-3 bg-gray-50 rounded-lg border border-gray-200 transform hover:-rotate-1 transition-transform vintage-paper relative group cursor-pointer"
                                    onMouseEnter={() => setHoveredStat('lowest')}
                                    onMouseLeave={() => setHoveredStat(null)}
                                >
                                    <div className="text-2xl font-bold text-black font-brand mb-1">
                                        {Math.min(...votes.map(v => typeof v.value === 'number' ? v.value : Infinity))}
                                    </div>
                                    <div className="text-xs text-gray-600 font-distressed">Lowest Vote</div>

                                    {/* Tooltip for Lowest Vote */}
                                    {hoveredStat === 'lowest' && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            className="absolute z-50 bg-black text-white p-3 rounded-lg shadow-lg max-w-xs border border-white/20"
                                            style={{
                                                left: '50%',
                                                top: '-80px',
                                                transform: 'translateX(-50%)'
                                            }}
                                        >
                                            <div>
                                                <div className="font-bold text-sm mb-1 font-brand">{getTooltipContent('lowest').title}</div>
                                                <div className="text-xs text-gray-300 font-distressed leading-relaxed">{getTooltipContent('lowest').description}</div>
                                            </div>
                                            {/* Arrow pointing down */}
                                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black"></div>
                                        </motion.div>
                                    )}
                                </div>
                            </div>

                            {/* Detailed Vote Breakdown */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Consensus Analysis */}
                                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200">
                                    <h4 className="text-lg font-bold text-blue-800 mb-2 font-brand">Consensus Analysis</h4>
                                    <div className="space-y-2">
                                        {Array.from(new Set(votes.map(v => v.value))).map(value => {
                                            const count = getVoteCount(value)
                                            const percentage = (count / votes.length) * 100
                                            return (
                                                <div key={value} className="flex items-center justify-between">
                                                    <span className="text-sm font-medium text-blue-700 font-brand">{value}</span>
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-16 h-2 bg-blue-200 rounded-full overflow-hidden">
                                                            <div
                                                                className="h-full bg-blue-500 rounded-full"
                                                                style={{ width: `${percentage}%` }}
                                                            />
                                                        </div>
                                                        <span className="text-xs text-blue-600 font-brand">{count}</span>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>

                                {/* Vote Range */}
                                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200">
                                    <h4 className="text-lg font-bold text-gray-800 mb-2 font-brand">Vote Range</h4>
                                    <div className="space-y-3">
                                        {Array.from(new Set(votes.map(v => v.value))).sort((a, b) => {
                                            if (typeof a === 'number' && typeof b === 'number') return a - b
                                            return String(a).localeCompare(String(b))
                                        }).map(value => {
                                            const voters = getVotersForValue(value)
                                            return (
                                                <div key={value} className="flex items-center justify-between">
                                                    <span className="text-sm font-medium text-gray-700 font-brand">{value}</span>
                                                    <div className="flex items-center gap-1">
                                                        {voters.map(voter => (
                                                            <div
                                                                key={voter.id}
                                                                className="w-6 h-6 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-white shadow-sm"
                                                                title={voter.name}
                                                            >
                                                                {voter.name.charAt(0).toUpperCase()}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Voting Cards Grid */}
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
                                        onClick={() => !isRevealed && !isEditingStory && onSelectCard(value)}
                                        disabled={isRevealed || isEditingStory}
                                        onMouseEnter={(e) => {
                                            if (!isEditingStory) {
                                                setHoveredCard(value)
                                                const rect = e.currentTarget.getBoundingClientRect()
                                                const isTopHalf = rect.top > 100 // Ekranın üst yarısında mı?

                                                setTooltipPosition({
                                                    x: rect.left + rect.width / 2,
                                                    y: isTopHalf ? rect.top - 20 : rect.bottom + 20, // Üstte veya altta
                                                    cardValue: value,
                                                    isAbove: isTopHalf
                                                })
                                            }
                                        }}
                                        onMouseLeave={() => {
                                            setHoveredCard(null)
                                            setTooltipPosition({ x: 0, y: 0, cardValue: null, isAbove: false })
                                        }}
                                        className={`
                                            w-full aspect-[3/4] rounded-xl border-2 transition-all duration-300
                                            relative overflow-hidden shadow-xl
                                            ${isSelected
                                                ? 'border-black shadow-2xl shadow-black/40 scale-105 ring-4 ring-green-200'
                                                : 'border-black/30 hover:border-black/60 hover:shadow-2xl hover:shadow-black/30'
                                            }
                                            ${isRevealed || isEditingStory ? 'cursor-default opacity-50' : 'cursor-pointer hover:scale-105'}
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
                                </motion.div>
                            )
                        })}
                    </AnimatePresence>
                </div>
            </div>

            {/* Portal Tooltip */}
            {typeof window !== 'undefined' && createPortal(
                <AnimatePresence>
                    {hoveredCard !== null && !isRevealed && !isEditingStory && tooltipPosition.cardValue === hoveredCard && (
                        <div
                            className="fixed pointer-events-none"
                            style={{
                                left: tooltipPosition.x,
                                top: tooltipPosition.y,
                                transform: 'translateX(-50%)',
                                zIndex: 999999
                            }}
                        >
                            <div className="bg-black text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap border border-white/20 font-medium shadow-xl backdrop-blur-sm">
                                Click to select this card
                                <div className={`absolute left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 ${tooltipPosition.isAbove
                                    ? 'top-full border-t-4 border-transparent border-t-black'
                                    : 'bottom-full border-b-4 border-transparent border-b-black'
                                    }`}></div>
                            </div>
                        </div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </>
    )
} 