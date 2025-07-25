export interface TooltipPosition {
    x: number
    y: number
    isAbove: boolean
    isLeft: boolean
}

export function calculateTooltipPosition(
    element: HTMLElement,
    tooltipWidth: number = 300,
    tooltipHeight: number = 50
): TooltipPosition {
    const rect = element.getBoundingClientRect()
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight

    // Calculate center position
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    // Determine if tooltip should be above or below
    const isAbove = rect.top > tooltipHeight + 20

    // Determine if tooltip should be left or right aligned
    const isLeft = centerX > viewportWidth / 2

    // Calculate final position
    let x: number
    let y: number

    if (isAbove) {
        y = rect.top - tooltipHeight - 10
    } else {
        y = rect.bottom + 10
    }

    if (isLeft) {
        x = Math.max(10, centerX - tooltipWidth / 2)
        // Ensure tooltip doesn't go off the right edge
        if (x + tooltipWidth > viewportWidth - 10) {
            x = viewportWidth - tooltipWidth - 10
        }
    } else {
        x = Math.min(viewportWidth - tooltipWidth - 10, centerX - tooltipWidth / 2)
        // Ensure tooltip doesn't go off the left edge
        if (x < 10) {
            x = 10
        }
    }

    return { x, y, isAbove, isLeft }
}

export function applyTooltipStyles(
    element: HTMLElement,
    position: TooltipPosition,
    tooltipWidth: number = 300,
    tooltipHeight: number = 50
): void {
    const tooltip = element.querySelector('[data-tooltip]') as HTMLElement
    if (!tooltip) return

    // Apply position
    tooltip.style.left = `${position.x}px`
    tooltip.style.top = `${position.y}px`
    tooltip.style.width = `${tooltipWidth}px`
    tooltip.style.minHeight = `${tooltipHeight}px`

    // Apply arrow direction
    const arrow = tooltip.querySelector('[data-tooltip-arrow]') as HTMLElement
    if (arrow) {
        if (position.isAbove) {
            arrow.style.top = '100%'
            arrow.style.borderTopColor = 'rgba(0, 0, 0, 0.95)'
            arrow.style.borderBottomColor = 'transparent'
        } else {
            arrow.style.bottom = '100%'
            arrow.style.borderBottomColor = 'rgba(0, 0, 0, 0.95)'
            arrow.style.borderTopColor = 'transparent'
        }

        if (position.isLeft) {
            arrow.style.left = '20px'
        } else {
            arrow.style.right = '20px'
        }
    }
} 