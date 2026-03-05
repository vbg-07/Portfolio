import { type SectionData } from '../data/portfolioData'

interface FocusPanelProps {
    section: SectionData
    originX: number // % position of source node
    originY: number // % position of source node
    onClose: () => void
}

export default function FocusPanel({ section, originX, originY, onClose }: FocusPanelProps) {
    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose()
        }
    }

    return (
        <div
            className="focus-backdrop"
            onClick={handleBackdropClick}
            style={{
                // Panel emerges from the node's position
                ['--origin-x' as string]: `${originX}%`,
                ['--origin-y' as string]: `${originY}%`,
            }}
        >
            <div className="focus-panel">
                <button
                    className="focus-panel__close"
                    onClick={onClose}
                    aria-label="Close"
                >
                    ✕
                </button>

                <div className="focus-panel__icon">{section.icon}</div>
                <h2 className="focus-panel__title">{section.card.title}</h2>
                <div className="focus-panel__divider" />

                <div className="focus-panel__body">
                    {section.card.description.map((text, i) => (
                        <p key={i}>{text}</p>
                    ))}
                </div>

                {section.card.links.length > 0 && (
                    <div className="focus-panel__links">
                        {section.card.links.map((link, i) => (
                            <a
                                key={i}
                                className="focus-panel__link"
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {link.icon && (
                                    <span className="focus-panel__link-icon">{link.icon}</span>
                                )}
                                {link.label}
                            </a>
                        ))}
                    </div>
                )}

                <div className="focus-panel__hint">
                    Press <kbd>ESC</kbd> or click outside to return
                </div>
            </div>
        </div>
    )
}
