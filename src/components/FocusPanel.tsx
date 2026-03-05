import { type SectionData } from '../data/portfolioData'

interface FocusPanelProps {
    section: SectionData
    offsetX: number   // px offset from center
    offsetY: number   // px offset from center
    isClosing: boolean
    onClose: () => void
}

export default function FocusPanel({ section, offsetX, offsetY, isClosing, onClose }: FocusPanelProps) {
    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget && !isClosing) onClose()
    }

    const backdropClasses = [
        'focus-backdrop',
        isClosing ? 'focus-backdrop--closing' : '',
    ].filter(Boolean).join(' ')

    const panelClasses = [
        'focus-panel',
        isClosing ? 'focus-panel--closing' : '',
    ].filter(Boolean).join(' ')

    return (
        <div className={backdropClasses} onClick={handleBackdropClick}>
            <div
                className={panelClasses}
                style={{
                    ['--offset-x' as string]: `${offsetX}px`,
                    ['--offset-y' as string]: `${offsetY}px`,
                    ['--accent' as string]: section.planetColor,
                }}
            >
                <button
                    className="focus-panel__close"
                    onClick={() => !isClosing && onClose()}
                    aria-label="Close"
                >
                    ✕
                </button>

                <div
                    className="focus-panel__accent-bar"
                    style={{ background: section.planetColor }}
                />

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
                                {link.icon && <span className="focus-panel__link-icon">{link.icon}</span>}
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
