import { type SectionData } from '../data/portfolioData'

interface SpatialNodeProps {
    section: SectionData
    isHovered: boolean
    isFocused: boolean
    isActive: boolean
    isShowcased: boolean
    onHover: (id: string | null) => void
    onClick: (id: string, x: number, y: number) => void
    orbitRadius: number
    orbitalOffset: number
    mouseX: number
    mouseY: number
}

export default function SpatialNode({
    section,
    isHovered,
    isFocused,
    isActive,
    isShowcased,
    onHover,
    onClick,
    orbitRadius,
    orbitalOffset,
    mouseX,
    mouseY,
}: SpatialNodeProps) {
    const currentAngle = section.angle + orbitalOffset
    const angleRad = (currentAngle * Math.PI) / 180
    const x = 50 + Math.sin(angleRad) * orbitRadius
    const y = 50 - Math.cos(angleRad) * orbitRadius

    const verticalDrift = Math.sin(angleRad * 0.5) * 3
    const depth = section.depth

    const parallaxX = mouseX * 8
    const parallaxY = mouseY * 8

    const dirX = Math.sin(angleRad)
    const dirY = -Math.cos(angleRad)

    let transform: string
    let opacity: number
    let filter: string

    if (isFocused && isActive) {
        transform = `translate(-50%, -50%) translateZ(80px) scale(1.3)`
        opacity = 0
        filter = 'none'
    } else if (isFocused && !isActive) {
        const pushDistance = 12
        const pushX = dirX * pushDistance
        const pushY = dirY * pushDistance
        transform = `translate(calc(-50% + ${pushX}vw), calc(-50% + ${pushY}vh)) translateZ(${depth - 80}px) scale(0.7)`
        opacity = 0.08
        filter = `blur(5px)`
    } else {
        transform = `translate(calc(-50% + ${parallaxX}px), calc(-50% + ${verticalDrift + parallaxY}px)) translateZ(${depth}px)`
        opacity = 1
        filter = 'none'
    }

    const classNames = [
        'spatial-node',
        isHovered ? 'spatial-node--hovered' : '',
        isFocused && isActive ? 'spatial-node--active' : '',
        isShowcased ? 'spatial-node--showcased' : '',
    ].filter(Boolean).join(' ')

    return (
        <div
            className={classNames}
            style={{
                left: `${x}%`,
                top: `${y}%`,
                transform,
                opacity: isFocused ? opacity : undefined,
                filter: isFocused ? filter : undefined,
            }}
            onMouseEnter={() => onHover(section.id)}
            onMouseLeave={() => onHover(null)}
            onClick={() => onClick(section.id, x, y)}
        >
            <div className="spatial-node__inner">
                <span className="spatial-node__icon">{section.icon}</span>
                <span className="spatial-node__label">{section.label}</span>
            </div>
        </div>
    )
}
