import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '../../contexts/ThemeContext'

interface CursorPosition {
    x: number
    y: number
}

export function CustomCursor() {
    const [position, setPosition] = useState<CursorPosition>({ x: 0, y: 0 })
    const [isPointer, setIsPointer] = useState(false)
    const [isVisible, setIsVisible] = useState(false)
    const { isLight } = useTheme()

    useEffect(() => {
        const updatePosition = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY })
            setIsVisible(true)
        }

        const updateCursorType = () => {
            const hoveredElement = document.elementFromPoint(position.x, position.y)
            if (hoveredElement) {
                const computedStyle = window.getComputedStyle(hoveredElement)
                const isClickable =
                    computedStyle.cursor === 'pointer' ||
                    hoveredElement.tagName === 'BUTTON' ||
                    hoveredElement.tagName === 'A' ||
                    hoveredElement.closest('button') ||
                    hoveredElement.closest('a')
                setIsPointer(!!isClickable)
            }
        }

        const handleMouseLeave = () => setIsVisible(false)
        const handleMouseEnter = () => setIsVisible(true)

        window.addEventListener('mousemove', updatePosition)
        window.addEventListener('mouseover', updateCursorType)
        document.addEventListener('mouseleave', handleMouseLeave)
        document.addEventListener('mouseenter', handleMouseEnter)

        return () => {
            window.removeEventListener('mousemove', updatePosition)
            window.removeEventListener('mouseover', updateCursorType)
            document.removeEventListener('mouseleave', handleMouseLeave)
            document.removeEventListener('mouseenter', handleMouseEnter)
        }
    }, [position.x, position.y])

    if (!isVisible) return null

    return (
        <>
            {/* Main cursor dot */}
            <motion.div
                className="fixed pointer-events-none z-[9999] mix-blend-difference"
                animate={{
                    x: position.x - 6,
                    y: position.y - 6,
                    scale: isPointer ? 1.5 : 1,
                }}
                transition={{
                    type: 'spring',
                    stiffness: 1500,
                    damping: 35,
                    mass: 0.1,
                }}
            >
                <div
                    className="w-3 h-3 rounded-full"
                    style={{
                        background: isLight
                            ? 'linear-gradient(135deg, #212529, #495057)'
                            : 'linear-gradient(135deg, #ffffff, #adb5bd)',
                        boxShadow: isLight
                            ? '0 0 10px rgba(0, 0, 0, 0.4)'
                            : '0 0 10px rgba(255, 255, 255, 0.4)',
                    }}
                />
            </motion.div>

            {/* Trailing ring */}
            <motion.div
                className="fixed pointer-events-none z-[9998]"
                animate={{
                    x: position.x - 20,
                    y: position.y - 20,
                    scale: isPointer ? 1.4 : 1,
                    opacity: isPointer ? 0.8 : 0.4,
                }}
                transition={{
                    type: 'spring',
                    stiffness: 150,
                    damping: 15,
                    mass: 0.8,
                }}
            >
                <div
                    className="w-10 h-10 rounded-full border"
                    style={{
                        borderColor: isLight ? 'rgba(33, 37, 41, 0.4)' : 'rgba(255, 255, 255, 0.3)',
                        borderWidth: isPointer ? '2px' : '1px',
                    }}
                />
            </motion.div>
        </>
    )
}
