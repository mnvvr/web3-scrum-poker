import { nanoid } from 'nanoid'
import { User, Room, Story } from '@/types'

export function generateRoomCode(): string {
    return nanoid(6).toUpperCase()
}

export function generateRandomName(): string {
    const adjectives = ['Swift', 'Bright', 'Clever', 'Bold', 'Wise', 'Quick', 'Smart', 'Sharp', 'Agile', 'Nimble', 'Dynamic', 'Vibrant']
    const animals = ['Fox', 'Wolf', 'Eagle', 'Lion', 'Bear', 'Tiger', 'Hawk', 'Owl', 'Koala', 'Panda', 'Dragon', 'Phoenix']
    const randomNum = Math.floor(Math.random() * 100)

    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)]
    const animal = animals[Math.floor(Math.random() * animals.length)]

    return `${adjective}${animal}${randomNum}`
}

export function createUser(name: string, walletAddress?: string): User {
    // Handle different name scenarios
    let displayName = name
    let isAnonymous = false

    if (name === 'Anonymous') {
        displayName = 'Anonymous User'
        isAnonymous = true
    } else if (!name && walletAddress) {
        // If no name provided but wallet address exists, use shortened address
        displayName = `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
    } else if (!name) {
        // Generate random name for guests
        displayName = generateRandomName()
    }

    return {
        id: nanoid(),
        name: displayName,
        walletAddress,
        isGuest: !walletAddress,
        isAnonymous,
        avatar: walletAddress ? `https://api.dicebear.com/7.x/identicon/svg?seed=${walletAddress}` : undefined
    }
}

export function createRoom(
    name: string,
    cardType: string,
    maxParticipants: number,
    createdBy: string
): Room {
    return {
        id: nanoid(),
        name,
        code: generateRoomCode(),
        cardType: cardType as any,
        maxParticipants,
        participants: [],
        stories: [],
        currentStoryIndex: 0,
        isVoting: false,
        isRevealed: false,
        createdAt: new Date(),
        createdBy
    }
}

export function createStory(title: string, description?: string): Story {
    return {
        id: nanoid(),
        title,
        description,
        votes: [],
        isRevealed: false,
        comments: []
    }
}

export function calculateVoteStats(votes: Array<{ value: number | string }>) {
    const numericVotes = votes
        .filter(vote => typeof vote.value === 'number')
        .map(vote => vote.value as number)

    if (numericVotes.length === 0) {
        return { average: null, variance: null }
    }

    const average = numericVotes.reduce((sum, vote) => sum + vote, 0) / numericVotes.length
    const variance = numericVotes.reduce((sum, vote) => sum + Math.pow(vote - average, 2), 0) / numericVotes.length

    return { average, variance }
}

export function formatAddress(address: string): string {
    if (!address) return ''
    return `${address.slice(0, 6)}...${address.slice(-4)}`
}

export function isValidRoomCode(code: string): boolean {
    return /^[A-Z0-9]{6}$/.test(code)
} 