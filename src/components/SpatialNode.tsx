import { type SectionData } from '../data/portfolioData'

interface SpatialNodeProps {
    section: SectionData
    currentAngle: number
    isHovered: boolean
    isFocused: boolean
    isActive: boolean
    isProjectsCentered: boolean  // projects planet smoothly at center
    onHover: (id: string | null) => void
    onClick: (id: string, e: React.MouseEvent) => void
}

export default function SpatialNode({
    section,
    currentAngle,
    isHovered,
    isFocused,
    isActive,
    isProjectsCentered,
    onHover,
    onClick,
}: SpatialNodeProps) {
    // Projects active: radius→0 brings it to center; hover: slightly closer
    const effectiveRadius = isProjectsCentered
        ? 0
        : isHovered
            ? section.orbitRadius * 0.92
            : section.orbitRadius

    // Counter-rotate to keep label upright
    const counterAngle = -currentAngle

    // Scale up when it becomes the projects center star
    const scale = isProjectsCentered ? 1.35 : 1

    const classNames = [
        'planet',
        isHovered ? 'planet--hovered' : '',
        isActive && !isProjectsCentered ? 'planet--active' : '',
        isProjectsCentered ? 'planet--projects-center' : '',
        isFocused && !isActive ? 'planet--receded' : '',
    ].filter(Boolean).join(' ')

    return (
        <div
            className={classNames}
            style={{
                transform: `translateX(${effectiveRadius}vmin) rotate(${counterAngle}deg) scale(${scale})`,
                ['--planet-color' as string]: section.planetColor,
                ['--planet-size' as string]: `${section.planetSize}px`,
            } as React.CSSProperties}
            onMouseEnter={() => !isFocused && onHover(section.id)}
            onMouseLeave={() => !isFocused && onHover(null)}
            onClick={(e) => !isFocused && onClick(section.id, e)}
        >
            <div className="planet__glow" />
            <div className="planet__body" />
            <span className={`planet__label${isProjectsCentered ? ' planet__label--visible' : ''}`}>{section.label}</span>
        </div>
    )
}
