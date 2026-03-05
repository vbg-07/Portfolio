import { type SectionData } from '../data/portfolioData'

interface SpatialNodeProps {
    section: SectionData
    currentAngle: number
    isHovered: boolean
    isFocused: boolean
    isActive: boolean
    onHover: (id: string | null) => void
    onClick: (id: string) => void
}

export default function SpatialNode({
    section,
    currentAngle,
    isHovered,
    isFocused,
    isActive,
    onHover,
    onClick,
}: SpatialNodeProps) {
    // Hover pulls planet slightly closer
    const effectiveRadius = isHovered ? section.orbitRadius * 0.92 : section.orbitRadius
    // Counter-rotate to keep label upright
    const counterAngle = -currentAngle

    const classNames = [
        'planet',
        isHovered ? 'planet--hovered' : '',
        isActive ? 'planet--active' : '',
        isFocused && !isActive ? 'planet--receded' : '',
    ].filter(Boolean).join(' ')

    return (
        <div
            className={classNames}
            style={{
                transform: `translateX(${effectiveRadius}vmin) rotate(${counterAngle}deg)`,
                ['--planet-color' as string]: section.planetColor,
                ['--planet-size' as string]: `${section.planetSize}px`,
            } as React.CSSProperties}
            onMouseEnter={() => !isFocused && onHover(section.id)}
            onMouseLeave={() => !isFocused && onHover(null)}
            onClick={() => !isFocused && onClick(section.id)}
        >
            <div className="planet__glow" />
            <div className="planet__body" />
            <span className="planet__label">{section.label}</span>
        </div>
    )
}
