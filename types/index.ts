export interface User {
    id: string
    name: string
    walletAddress?: string
    isGuest: boolean
    isAnonymous?: boolean
    avatar?: string
}

export interface Room {
    id: string
    name: string
    code: string
    cardType: CardType
    maxParticipants: number
    participants: User[]
    stories: Story[]
    currentStoryIndex: number
    isVoting: boolean
    isRevealed: boolean
    createdAt: Date
    createdBy: string
}

export interface Story {
    id: string
    title: string
    description?: string
    reference?: string
    votes: Vote[]
    isRevealed: boolean
    average?: number
    variance?: number
    comments: Comment[]
}

export interface Vote {
    userId: string
    value: number | string
    timestamp: Date
}

export interface Comment {
    id: string
    userId: string
    userName: string
    text: string
    timestamp: Date
}

export type CardType = 'fibonacci' | 'tshirt' | 'powers' | 'sequential' | 'emoji' | 'custom'

export interface CardTypeConfig {
    name: string
    values: (number | string)[]
    description: string
    useCase: string
    icon: string
    color: string
}

export const CARD_TYPES: Record<CardType, CardTypeConfig> = {
    fibonacci: {
        name: 'Fibonacci',
        values: [0, 1, 2, 3, 5, 8, 13, 20, 40, 100, '☕', '?'],
        description: 'Classic Fibonacci sequence for story point estimation',
        useCase: 'Most common. Reflects growing complexity with spaced values.',
        icon: '📊',
        color: 'from-blue-400 to-blue-600'
    },
    tshirt: {
        name: 'T-Shirt Sizes',
        values: ['XS', 'S', 'M', 'L', 'XL', 'XXL', '?'],
        description: 'T-shirt sizing for quick relative estimation',
        useCase: 'Great for abstract size estimation. Friendly for non-technical users.',
        icon: '👕',
        color: 'from-green-400 to-green-600'
    },
    powers: {
        name: 'Powers of Two',
        values: [1, 2, 4, 8, 16, 32, 64, '?'],
        description: 'Exponential scale for complex technical tasks',
        useCase: 'Helps indicate exponential complexity. Used in tech-heavy projects.',
        icon: '⚡',
        color: 'from-purple-400 to-purple-600'
    },
    sequential: {
        name: 'Sequential',
        values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, '?'],
        description: 'Simple linear scale for straightforward estimation',
        useCase: 'Works well for small tasks with clear effort size.',
        icon: '📈',
        color: 'from-orange-400 to-orange-600'
    },
    emoji: {
        name: 'Emoji Signals',
        values: ['👍', '❓', '☕', '💤', '🚀', '🔥', '?'],
        description: 'Emoji-based reactions for quick team feedback',
        useCase: 'Ideal for async teams or quick reactions. Enhances lightweight comms.',
        icon: '😊',
        color: 'from-pink-400 to-pink-600'
    },
    custom: {
        name: 'Custom',
        values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, '?'],
        description: 'Simple 1-10 scale for straightforward estimation',
        useCase: 'Flexible scale that can be adapted to your team\'s needs.',
        icon: '🎯',
        color: 'from-gray-400 to-gray-600'
    }
} 