import { useState, useEffect, useCallback, useRef } from 'react'
import { sections, PLAYER_NAME, PLAYER_TITLE } from '../data/portfolioData'
import SpatialNode from './SpatialNode'
import FocusPanel from './FocusPanel'
import ProjectSystem from './ProjectSystem'

const twinkleStars = [
    { x: 10, y: 12, size: 2, dur: 4 },
    { x: 88, y: 8, size: 1.5, dur: 5.5 },
    { x: 75, y: 82, size: 2.2, dur: 3.8 },
    { x: 22, y: 90, size: 1.8, dur: 6 },
    { x: 60, y: 15, size: 1.6, dur: 4.5 },
    { x: 40, y: 70, size: 2, dur: 5 },
    { x: 95, y: 45, size: 1.4, dur: 7 },
]

const dustParticles = [
    { x: 15, y: 25, size: 2, dur: 28, delay: 0 },
    { x: 72, y: 18, size: 1.5, dur: 35, delay: 4 },
    { x: 85, y: 65, size: 1.8, dur: 32, delay: 8 },
    { x: 30, y: 78, size: 1.2, dur: 38, delay: 12 },
    { x: 55, y: 42, size: 1.6, dur: 30, delay: 6 },
    { x: 8, y: 58, size: 1.4, dur: 40, delay: 16 },
]

export default function SpatialHub() {
    const [hoveredId, setHoveredId] = useState<string | null>(null)
    const [focusedId, setFocusedId] = useState<string | null>(null)
    const [isClosing, setIsClosing] = useState(false)
    const [activeNodePos, setActiveNodePos] = useState<{ x: number; y: number } | null>(null)

    const anglesRef = useRef<number[]>(sections.map(s => s.startAngle))
    const [angles, setAngles] = useState<number[]>(() => sections.map(s => s.startAngle))

    const [mouseX, setMouseX] = useState(0)
    const [mouseY, setMouseY] = useState(0)
    const targetMouse = useRef({ x: 0, y: 0 })

    const animRef = useRef<number>(0)
    const lastTimeRef = useRef<number>(0)

    const handleFocus = useCallback((id: string) => {
        const idx = sections.findIndex(s => s.id === id)
        if (idx < 0) return
        const section = sections[idx]
        const angle = anglesRef.current[idx]
        const rad = (angle * Math.PI) / 180
        const vmin = Math.min(window.innerWidth, window.innerHeight) / 100
        const offsetX = Math.sin(rad) * section.orbitRadius * vmin
        const offsetY = -Math.cos(rad) * section.orbitRadius * vmin

        setFocusedId(id)
        setHoveredId(null)
        setActiveNodePos({ x: offsetX, y: offsetY })
    }, [])

    const handleClose = useCallback(() => {
        if (isClosing) return
        setIsClosing(true)
        setTimeout(() => {
            setFocusedId(null)
            setActiveNodePos(null)
            setIsClosing(false)
        }, 700)
    }, [isClosing])

    const handleHover = useCallback((id: string | null) => {
        if (!focusedId) setHoveredId(id)
    }, [focusedId])

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && focusedId && !isClosing) handleClose()
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [focusedId, isClosing, handleClose])

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            targetMouse.current = {
                x: (e.clientX / window.innerWidth - 0.5) * 2,
                y: (e.clientY / window.innerHeight - 0.5) * 2,
            }
        }
        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [])

    useEffect(() => {
        let smoothX = 0
        let smoothY = 0

        const animate = (time: number) => {
            if (lastTimeRef.current === 0) lastTimeRef.current = time
            const delta = (time - lastTimeRef.current) / 1000
            lastTimeRef.current = time

            const newAngles = anglesRef.current.map((angle, i) => {
                const speed = 360 / sections[i].orbitDuration
                let mult = 1
                if (focusedId) mult = 0.02
                else if (hoveredId === sections[i].id) mult = 0.1
                return angle + speed * delta * mult
            })
            anglesRef.current = newAngles
            setAngles([...newAngles])

            const lerp = 1 - Math.pow(0.03, delta)
            smoothX += (targetMouse.current.x - smoothX) * lerp
            smoothY += (targetMouse.current.y - smoothY) * lerp
            setMouseX(smoothX)
            setMouseY(smoothY)

            animRef.current = requestAnimationFrame(animate)
        }
        animRef.current = requestAnimationFrame(animate)
        return () => cancelAnimationFrame(animRef.current)
    }, [focusedId, hoveredId])

    const focusedSection = focusedId ? sections.find(s => s.id === focusedId) ?? null : null

    // Scene transform: zoom toward planet on focus, tilt on idle
    let sceneTransform: string
    if (focusedId && !isClosing) {
        const idx = sections.findIndex(s => s.id === focusedId)
        if (idx >= 0) {
            const angle = anglesRef.current[idx]
            const rad = (angle * Math.PI) / 180
            const section = sections[idx]
            const ox = Math.sin(rad) * section.orbitRadius
            const oy = -Math.cos(rad) * section.orbitRadius
            sceneTransform = `scale(1.6) translate(${-ox * 0.5}vmin, ${-oy * 0.5}vmin)`
        } else {
            sceneTransform = `rotateY(${mouseX * 1.2}deg) rotateX(${mouseY * -0.8}deg)`
        }
    } else {
        sceneTransform = `rotateY(${mouseX * 1.2}deg) rotateX(${mouseY * -0.8}deg)`
    }

    const hubClasses = [
        'solar-hub',
        hoveredId ? 'solar-hub--has-hover' : '',
        focusedId ? 'solar-hub--focused' : '',
    ].filter(Boolean).join(' ')

    return (
        <div className={hubClasses}>
            {/* Starfield layers with mouse parallax */}
            <div className="starfield starfield--far" style={{ transform: `translate(${mouseX * 1}px, ${mouseY * 1}px)` }} />
            <div className="starfield starfield--mid" style={{ transform: `translate(${mouseX * 3}px, ${mouseY * 3}px)` }} />
            <div className="starfield starfield--near" style={{ transform: `translate(${mouseX * 6}px, ${mouseY * 6}px)` }} />

            {/* Nebula glow */}
            <div className="nebula-layer" />

            {/* Twinkling stars */}
            {twinkleStars.map((s, i) => (
                <div key={`tw-${i}`} className="twinkle-star" style={{
                    left: `${s.x}%`, top: `${s.y}%`,
                    width: `${s.size}px`, height: `${s.size}px`,
                    animationDuration: `${s.dur}s`,
                }} />
            ))}

            {/* Dust particles */}
            {dustParticles.map((p, i) => (
                <div key={`dust-${i}`} className="dust-particle" style={{
                    left: `${p.x}%`, top: `${p.y}%`,
                    width: `${p.size}px`, height: `${p.size}px`,
                    animationDuration: `${p.dur}s`,
                    animationDelay: `${p.delay}s`,
                }} />
            ))}

            <div className="solar-hub__scene" style={{ transform: sceneTransform }}>
                {/* Orbits: ring + rotating arm + planet */}
                {sections.map((section, i) => {
                    const isThisHovered = hoveredId === section.id
                    const isThisFocused = focusedId === section.id
                    const ringClasses = [
                        'orbit-ring',
                        isThisHovered ? 'orbit-ring--hover' : '',
                        isThisFocused ? 'orbit-ring--focus' : '',
                        focusedId && !isThisFocused ? 'orbit-ring--dimmed' : '',
                    ].filter(Boolean).join(' ')

                    return (
                        <div key={section.id} className="orbit">
                            <div className={ringClasses} style={{
                                width: `${section.orbitRadius * 2}vmin`,
                                height: `${section.orbitRadius * 2}vmin`,
                            }} />
                            <div className="orbit__arm" style={{ transform: `rotate(${angles[i]}deg)` }}>
                                <SpatialNode
                                    section={section}
                                    currentAngle={angles[i]}
                                    isHovered={isThisHovered}
                                    isFocused={!!focusedId}
                                    isActive={isThisFocused}
                                    onHover={handleHover}
                                    onClick={handleFocus}
                                />
                            </div>
                        </div>
                    )
                })}

                {/* Central star */}
                <div className="solar-hub__star" style={{
                    transform: `translate(calc(-50% + ${mouseX * 2}px), calc(-50% + ${mouseY * 2}px))`,
                }}>
                    <div className="star-glow" />
                    <div className="star-glow star-glow--inner" />
                    <h1 className="star-name">{PLAYER_NAME}</h1>
                    <p className="star-title">{PLAYER_TITLE}</p>
                </div>
            </div>

            {focusedSection && activeNodePos && focusedId === 'projects' && (
                <ProjectSystem
                    isClosing={isClosing}
                    onExit={handleClose}
                    planetColor={focusedSection.planetColor}
                />
            )}

            {focusedSection && activeNodePos && focusedId !== 'projects' && (
                <FocusPanel
                    section={focusedSection}
                    offsetX={activeNodePos.x}
                    offsetY={activeNodePos.y}
                    isClosing={isClosing}
                    onClose={handleClose}
                />
            )}
        </div>
    )
}
