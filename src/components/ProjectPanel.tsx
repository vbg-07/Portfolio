import { type ProjectData } from '../data/portfolioData'
import ArchitectureDiagram from './ArchitectureDiagram'

interface ProjectPanelProps {
    project: ProjectData
    offsetX: number
    offsetY: number
    isClosing: boolean
    onClose: () => void
}

export default function ProjectPanel({ project, offsetX, offsetY, isClosing, onClose }: ProjectPanelProps) {
    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget && !isClosing) onClose()
    }

    const backdropClasses = [
        'proj-backdrop',
        isClosing ? 'proj-backdrop--closing' : '',
    ].filter(Boolean).join(' ')

    const panelClasses = [
        'proj-panel',
        isClosing ? 'proj-panel--closing' : '',
    ].filter(Boolean).join(' ')

    return (
        <div className={backdropClasses} onClick={handleBackdropClick}>
            <div
                className={panelClasses}
                style={{
                    ['--offset-x' as string]: `${offsetX}px`,
                    ['--offset-y' as string]: `${offsetY}px`,
                    ['--accent' as string]: project.color,
                }}
            >
                <button
                    className="proj-panel__close"
                    onClick={() => !isClosing && onClose()}
                    aria-label="Close"
                >
                    ✕
                </button>

                <div className="proj-panel__accent-bar" style={{ background: project.color }} />

                <h3 className="proj-panel__title">{project.title}</h3>
                <p className="proj-panel__desc">{project.description}</p>

                {/* Tech tags */}
                <div className="proj-panel__tags">
                    {project.technologies.map((tech, i) => (
                        <span key={i} className="proj-panel__tag">{tech}</span>
                    ))}
                </div>

                {/* Architecture diagram */}
                <div className="proj-panel__section-label">Architecture</div>
                <ArchitectureDiagram
                    nodes={project.architecture.nodes}
                    connections={project.architecture.connections}
                    color={project.color}
                />

                {/* Links */}
                <div className="proj-panel__links">
                    <a
                        className="proj-panel__link"
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        📦 GitHub
                    </a>
                    {project.liveUrl && (
                        <a
                            className="proj-panel__link"
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            🌐 Live Demo
                        </a>
                    )}
                </div>

                <div className="proj-panel__hint">
                    Press <kbd>ESC</kbd> or click outside to return
                </div>
            </div>
        </div>
    )
}
