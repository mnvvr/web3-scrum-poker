'use client'

import { ScrumCards } from '../poker/ScrumCards'
import { VotingProgress } from './VotingProgress'
import { Vote, CardType, User } from '@/types'

interface ScrumCardsSectionProps {
    cardType: CardType
    selectedValue: number | string | null
    onSelectCard: (value: number | string) => void
    isRevealed: boolean
    isVoting: boolean
    votes: Vote[]
    votedCount: number
    totalCount: number
    participants: User[]
}

export function ScrumCardsSection({
    cardType,
    selectedValue,
    onSelectCard,
    isRevealed,
    isVoting,
    votes,
    votedCount,
    totalCount,
    participants
}: ScrumCardsSectionProps) {
    return (
        <div className="mb-8">
            {/* Cards Header with Voting Progress */}
            <div className="text-center mb-8">
                {!isRevealed && (
                    <h2 className="text-3xl font-bold text-black mb-4 font-brand transform -rotate-1">Pick a card to estimate</h2>
                )}
                <p className="text-gray-600 mb-6 font-distressed transform rotate-1">
                    {isRevealed ? 'Votes revealed!' : 'Your selection is private until reveal'}
                </p>

                {/* Voting Progress */}
                {isVoting && (
                    <VotingProgress
                        votedCount={votedCount}
                        totalCount={totalCount}
                    />
                )}
            </div>

            {/* Scrum Cards */}
            <ScrumCards
                cardType={cardType}
                selectedValue={selectedValue}
                onSelectCard={onSelectCard}
                isRevealed={isRevealed}
                votes={votes}
                participants={participants}
            />
        </div>
    )
} 