'use client'

import { useKeyboardNavigation } from '@/hooks/useKeyboardNavigation'

interface KeyboardNavigationProviderProps {
    children: React.ReactNode
}

export function KeyboardNavigationProvider({ children }: KeyboardNavigationProviderProps) {
    useKeyboardNavigation()

    return (
        <>
            {/* Skip to main content link for screen readers */}
            <a 
                href="#main-content" 
                className="skip-link focus-ring"
                tabIndex={0}
            >
                Skip to main content
            </a>
            
            <div id="main-content" tabIndex={-1}>
                {children}
            </div>
        </>
    )
}