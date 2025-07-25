'use client'

import { useEffect, useState } from 'react'

export function useKeyboardNavigation() {
    const [isKeyboardNavigating, setIsKeyboardNavigating] = useState(false)

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Only set keyboard navigation to true on Tab key
            if (e.key === 'Tab') {
                setIsKeyboardNavigating(true)
            }
        }

        const handleMouseDown = () => {
            setIsKeyboardNavigating(false)
        }

        const handlePointerDown = () => {
            setIsKeyboardNavigating(false)
        }

        document.addEventListener('keydown', handleKeyDown)
        document.addEventListener('mousedown', handleMouseDown)
        document.addEventListener('pointerdown', handlePointerDown)

        return () => {
            document.removeEventListener('keydown', handleKeyDown)
            document.removeEventListener('mousedown', handleMouseDown)
            document.removeEventListener('pointerdown', handlePointerDown)
        }
    }, [])

    useEffect(() => {
        if (isKeyboardNavigating) {
            document.body.classList.add('keyboard-nav-active')
        } else {
            document.body.classList.remove('keyboard-nav-active')
        }
    }, [isKeyboardNavigating])

    return isKeyboardNavigating
}

// Hook for handling escape key
export function useEscapeKey(callback: () => void) {
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                callback()
            }
        }

        document.addEventListener('keydown', handleEscape)
        return () => document.removeEventListener('keydown', handleEscape)
    }, [callback])
}

// Hook for handling arrow key navigation in lists
export function useArrowNavigation(
    itemCount: number,
    onSelect?: (index: number) => void
) {
    const [focusedIndex, setFocusedIndex] = useState(0)

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            switch (e.key) {
                case 'ArrowDown':
                    e.preventDefault()
                    setFocusedIndex(prev => (prev + 1) % itemCount)
                    break
                case 'ArrowUp':
                    e.preventDefault()
                    setFocusedIndex(prev => (prev - 1 + itemCount) % itemCount)
                    break
                case 'Enter':
                case ' ':
                    e.preventDefault()
                    onSelect?.(focusedIndex)
                    break
            }
        }

        document.addEventListener('keydown', handleKeyDown)
        return () => document.removeEventListener('keydown', handleKeyDown)
    }, [itemCount, focusedIndex, onSelect])

    return focusedIndex
}