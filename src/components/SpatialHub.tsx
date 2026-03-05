import { useState, useEffect, useCallback, useRef } from 'react'
import { sections, PLAYER_NAME, PLAYER_TITLE } from '../data/portfolioData'
import SpatialNode from './SpatialNode'
import FocusPanel from './FocusPanel'

export default function SpatialHub() {
    const [hoveredId, setHoveredId] = useState<string | null>(null)
    const [focusedId, setFocusedId] = useState<string | null>(null)
    const [orbitalAngle, setOrbitalAngle] = useState(0)
    const [activeNodePos, setActiveNodePos] = useState<{ x: number; y: number } | null>(null)

    // Smoothed mouse parallax
    const [mouseX, setMouseX] = useState(0)
    const [mouseY, setMouseY] = useState(0)
    const targetMouse = useRef({ x: 0, y: 0 })

    // Idle showcase
    const [showcaseIndex, setShowcaseIndex] = useState(-1) // -1 = inactive
    const lastInteractionRef = useRef(Date.now())
    const idleActiveRef = useRef(false)

    const animRef = useRef<number>(0)
    const lastTimeRef = useRef<number>(0)

    const orbitRadius = 28
    const orbitalSpeed = 12
    const IDLE_TIMEOUT = 8000        // 8 seconds before showcase starts
    const SHOWCASE_INTERVAL = 2500   // 2.5s per node highlight

    // Reset idle timer on any interaction
    const resetIdle = useCallback(() => {
        lastInteractionRef.current = Date.now()
        if (idleActiveRef.current) {
            idleActiveRef.current = false
            setShowcaseIndex(-1)
        }
    }, [])

    const handleFocus = useCallback((id: string, nodeX: number, nodeY: number) => {
        resetIdle()
        setFocusedId(id)
        setHoveredId(null)
        setActiveNodePos({ x: nodeX, y: nodeY })
    }, [resetIdle])

    const handleClose = useCallback(() => {
        resetIdle()
        setFocusedId(null)
        setActiveNodePos(null)
    }, [resetIdle])

    const handleHover = useCallback((id: string | null) => {
        resetIdle()
        setHoveredId(id)
    }, [resetIdle])

    // ESC key handling
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            resetIdle()
            if (e.key === 'Escape' && focusedId) {
                handleClose()
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [focusedId, handleClose, resetIdle])

    // Mouse tracking + idle reset on move
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            resetIdle()
            targetMouse.current = {
                x: (e.clientX / window.innerWidth - 0.5) * 2,
                y: (e.clientY / window.innerHeight - 0.5) * 2,
            }
        }
        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [resetIdle])

    // Combined animation loop
    useEffect(() => {
        let smoothX = 0
        let smoothY = 0
        let showcaseTimer = 0

        const animate = (time: number) => {
            if (lastTimeRef.current === 0) {
                lastTimeRef.current = time
            }
            const delta = (time - lastTimeRef.current) / 1000
            lastTimeRef.current = time

            // Orbital motion
            let speedMultiplier = 1
            if (focusedId) {
                speedMultiplier = 0
            } else if (hoveredId) {
                speedMultiplier = 0.15
            }
            setOrbitalAngle(prev => prev + orbitalSpeed * delta * speedMultiplier)

            // Parallax interpolation
            const lerp = 1 - Math.pow(0.02, delta)
            smoothX += (targetMouse.current.x - smoothX) * lerp
            smoothY += (targetMouse.current.y - smoothY) * lerp
            setMouseX(smoothX)
            setMouseY(smoothY)

            // Idle showcase logic
            const timeSinceInteraction = Date.now() - lastInteractionRef.current
            if (!focusedId && !hoveredId && timeSinceInteraction > IDLE_TIMEOUT) {
                if (!idleActiveRef.current) {
                    idleActiveRef.current = true
                    showcaseTimer = 0
                    setShowcaseIndex(0)
                }
                showcaseTimer += delta * 1000
                if (showcaseTimer > SHOWCASE_INTERVAL) {
                    showcaseTimer = 0
                    setShowcaseIndex(prev => (prev + 1) % sections.length)
                }
            }

            animRef.current = requestAnimationFrame(animate)
        }

        animRef.current = requestAnimationFrame(animate)
        return () => cancelAnimationFrame(animRef.current)
    }, [focusedId, hoveredId])

    const focusedSection = focusedId
        ? sections.find(s => s.id === focusedId) ?? null
        : null

    const hubClasses = [
        'spatial-hub',
        hoveredId ? 'spatial-hub--has-hover' : '',
        focusedId ? 'spatial-hub--focused' : '',
    ].filter(Boolean).join(' ')

    const sceneRotateY = mouseX * 2
    const sceneRotateX = mouseY * -1.5

    return (
        <div className={hubClasses} onClick={resetIdle}>
            <div
                className="spatial-hub__scene"
                style={{
                    transform: focusedId
                        ? 'scale(0.88)'
                        : `rotateY(${sceneRotateY}deg) rotateX(${sceneRotateX}deg)`,
                }}
            >
                <div
                    className="spatial-hub__center"
                    style={{
                        transform: `translate(calc(-50% + ${mouseX * 3}px), calc(-50% + ${mouseY * 3}px))`,
                    }}
                >
                    <h1 className="center-name">{PLAYER_NAME}</h1>
                    <p className="center-title">{PLAYER_TITLE}</p>
                </div>

                <div className="spatial-hub__orbit">
                    {sections.map((section, i) => (
                        <SpatialNode
                            key={section.id}
                            section={section}
                            isHovered={hoveredId === section.id}
                            isFocused={!!focusedId}
                            isActive={focusedId === section.id}
                            isShowcased={showcaseIndex === i}
                            onHover={handleHover}
                            onClick={handleFocus}
                            orbitRadius={orbitRadius}
                            orbitalOffset={orbitalAngle}
                            mouseX={mouseX}
                            mouseY={mouseY}
                        />
                    ))}
                </div>
            </div>

            {focusedSection && activeNodePos && (
                <FocusPanel
                    section={focusedSection}
                    originX={activeNodePos.x}
                    originY={activeNodePos.y}
                    onClose={handleClose}
                />
            )}
        </div>
    )
}
