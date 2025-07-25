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
    isEditingStory?: boolean
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
    participants,
    isEditingStory = false
}: ScrumCardsSectionProps) {
    return (
        <div className="mb-8">
            {/* Cards Header with Voting Progress */}
            <div className="text-center mb-8">
                {/* Clear State Indicators */}
                <div className="mb-6">
                    {!isRevealed && (
                        <h2 className="text-2xl font-bold text-black mb-2 font-brand">
                            {isVoting ? 'Pick a card to estimate' : 'Voting in progress...'}
                        </h2>
                    )}
                    {isRevealed && (
                        <h2 className="text-2xl font-bold text-green-600 mb-2 font-brand">
                            Votes revealed!
                        </h2>
                    )}

                    <p className="text-gray-600 text-sm font-distressed">
                        {isRevealed
                            ? 'See the results below'
                            : 'Your selection is private until reveal'
                        }
                    </p>
                </div>

                {/* Voting Progress - Always show */}
                <VotingProgress
                    votedCount={votedCount}
                    totalCount={totalCount}
                    isRevealed={isRevealed}
                />
            </div>

            {/* Scrum Cards */}
            <ScrumCards
                cardType={cardType}
                selectedValue={selectedValue}
                onSelectCard={onSelectCard}
                isRevealed={isRevealed}
                votes={votes}
                participants={participants}
                isEditingStory={isEditingStory}
            />
        </div>
    )
} 