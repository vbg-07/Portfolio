import { useState, useEffect, useCallback, useRef } from 'react'
import { projects, type ProjectData } from '../data/portfolioData'
import ProjectPanel from './ProjectPanel'

interface ProjectSystemProps {
    isClosing: boolean
    onExit: () => void
    satellitesVisible: boolean
}

export default function ProjectSystem({ isClosing, onExit, satellitesVisible }: ProjectSystemProps) {
    const [hoveredId, setHoveredId] = useState<string | null>(null)
    const [focusedProject, setFocusedProject] = useState<ProjectData | null>(null)
    const [isPanelClosing, setIsPanelClosing] = useState(false)
    const [panelOffset, setPanelOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 })

    const anglesRef = useRef<number[]>(projects.map((_p: ProjectData, i: number) => (i * 360) / projects.length))
    const [angles, setAngles] = useState<number[]>(() => projects.map((_p: ProjectData, i: number) => (i * 360) / projects.length))

    const animRef = useRef<number>(0)
    const lastTimeRef = useRef<number>(0)

    // Animation loop for satellite orbits
    useEffect(() => {
        if (!satellitesVisible) return

        const animate = (time: number) => {
            if (lastTimeRef.current === 0) lastTimeRef.current = time
            const delta = (time - lastTimeRef.current) / 1000
            lastTimeRef.current = time

            const newAngles = anglesRef.current.map((angle, i) => {
                const speed = 360 / projects[i].orbitDuration
                let mult = 1
                if (focusedProject) mult = 0.02
                else if (hoveredId === projects[i].id) mult = 0.1
                return angle + speed * delta * mult
            })
            anglesRef.current = newAngles
            setAngles([...newAngles])

            animRef.current = requestAnimationFrame(animate)
        }
        animRef.current = requestAnimationFrame(animate)
        return () => {
            cancelAnimationFrame(animRef.current)
            lastTimeRef.current = 0
        }
    }, [focusedProject, hoveredId, satellitesVisible])

    const handleSatelliteClick = useCallback((project: ProjectData, e: React.MouseEvent) => {
        // Use the satellite's actual screen position
        const satEl = e.currentTarget as HTMLElement
        const rect = satEl.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        const ox = centerX - window.innerWidth / 2
        const oy = centerY - window.innerHeight / 2

        setFocusedProject(project)
        setHoveredId(null)
        setPanelOffset({ x: ox, y: oy })
    }, [])

    const handlePanelClose = useCallback(() => {
        if (isPanelClosing) return
        setIsPanelClosing(true)
        setTimeout(() => {
            setFocusedProject(null)
            setIsPanelClosing(false)
        }, 850)
    }, [isPanelClosing])

    // ESC handling: close panel first, then exit system
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key !== 'Escape') return
            if (focusedProject && !isPanelClosing) {
                handlePanelClose()
            } else if (!focusedProject && !isClosing) {
                onExit()
            }
        }
        window.addEventListener('keydown', handleKey)
        return () => window.removeEventListener('keydown', handleKey)
    }, [focusedProject, isPanelClosing, isClosing, onExit, handlePanelClose])

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target !== e.currentTarget) return
        if (focusedProject && !isPanelClosing) {
            handlePanelClose()
        } else if (!focusedProject && !isClosing) {
            onExit()
        }
    }

    const containerClasses = [
        'project-system',
        satellitesVisible ? 'project-system--satellites-in' : '',
        isClosing ? 'project-system--closing' : '',
        focusedProject ? 'project-system--has-focus' : '',
        hoveredId ? 'project-system--has-hover' : '',
    ].filter(Boolean).join(' ')

    return (
        <div className={containerClasses} onClick={handleBackdropClick}>
            <div className="project-system__inner">
                {/* No center planet — the actual planet from SpatialHub is used */}

                {/* Satellite orbit rings */}
                {satellitesVisible && projects.map(proj => (
                    <div key={`ring-${proj.id}`} className={[
                        'sat-ring',
                        hoveredId === proj.id ? 'sat-ring--hover' : '',
                        focusedProject?.id === proj.id ? 'sat-ring--focus' : '',
                        focusedProject && focusedProject.id !== proj.id ? 'sat-ring--dimmed' : '',
                    ].filter(Boolean).join(' ')} style={{
                        width: `${proj.orbitRadius * 2}vmin`,
                        height: `${proj.orbitRadius * 2}vmin`,
                    }} />
                ))}

                {/* Satellite arms */}
                {satellitesVisible && projects.map((proj, i) => {
                    const isHovered = hoveredId === proj.id
                    const isActive = focusedProject?.id === proj.id
                    const isReceded = focusedProject !== null && !isActive

                    const effectiveRadius = isHovered ? proj.orbitRadius * 0.92 : proj.orbitRadius
                    const counterAngle = -angles[i]

                    const satClasses = [
                        'satellite',
                        isHovered ? 'satellite--hovered' : '',
                        isActive ? 'satellite--active' : '',
                        isReceded ? 'satellite--receded' : '',
                    ].filter(Boolean).join(' ')

                    return (
                        <div key={proj.id} className="sat-arm" style={{ transform: `rotate(${angles[i]}deg)` }}>
                            <div
                                className={satClasses}
                                style={{
                                    transform: `translateX(${effectiveRadius}vmin) rotate(${counterAngle}deg)`,
                                    ['--sat-color' as string]: proj.color,
                                    ['--sat-size' as string]: `${proj.satelliteSize}px`,
                                } as React.CSSProperties}
                                onMouseEnter={() => !focusedProject && setHoveredId(proj.id)}
                                onMouseLeave={() => !focusedProject && setHoveredId(null)}
                                onClick={(e) => {
                                    e.stopPropagation()
                                    if (!focusedProject) handleSatelliteClick(proj, e)
                                }}
                            >
                                <div className="satellite__glow" />
                                <div className="satellite__body" />
                                <span className="satellite__label">{proj.title}</span>
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* Return button */}
            <button className="project-system__back" onClick={(e) => { e.stopPropagation(); onExit() }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
                Return to Orbit
            </button>

            {/* Project detail panel */}
            {focusedProject && (
                <ProjectPanel
                    project={focusedProject}
                    offsetX={panelOffset.x}
                    offsetY={panelOffset.y}
                    isClosing={isPanelClosing}
                    onClose={handlePanelClose}
                />
            )}
        </div>
    )
}
