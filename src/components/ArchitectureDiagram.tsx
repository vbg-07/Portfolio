import { type ArchNode, type ArchConnection } from '../data/portfolioData'

interface ArchitectureDiagramProps {
    nodes: ArchNode[]
    connections: ArchConnection[]
    color: string
}

export default function ArchitectureDiagram({ nodes, connections, color }: ArchitectureDiagramProps) {
    const getNode = (id: string) => nodes.find(n => n.id === id)

    return (
        <div className="arch-diagram">
            <svg viewBox="0 0 100 80" preserveAspectRatio="xMidYMid meet" className="arch-diagram__svg">
                <defs>
                    <marker
                        id="arrowhead"
                        markerWidth="6"
                        markerHeight="4"
                        refX="6"
                        refY="2"
                        orient="auto"
                    >
                        <polygon points="0 0, 6 2, 0 4" fill={color} opacity="0.4" />
                    </marker>
                </defs>

                {/* Connection lines */}
                {connections.map((conn, i) => {
                    const from = getNode(conn.from)
                    const to = getNode(conn.to)
                    if (!from || !to) return null

                    return (
                        <line
                            key={`conn-${i}`}
                            className="arch-diagram__line"
                            x1={from.x}
                            y1={from.y}
                            x2={to.x}
                            y2={to.y}
                            stroke={color}
                            strokeWidth="0.4"
                            strokeOpacity="0.25"
                            markerEnd="url(#arrowhead)"
                            style={{
                                animationDelay: `${i * 0.3}s`,
                            }}
                        />
                    )
                })}

                {/* Nodes */}
                {nodes.map((node, i) => (
                    <g key={node.id} className="arch-diagram__node" style={{ animationDelay: `${i * 0.15}s` }}>
                        <circle
                            cx={node.x}
                            cy={node.y}
                            r="3.5"
                            fill="rgba(255,255,255,0.04)"
                            stroke={color}
                            strokeWidth="0.4"
                            strokeOpacity="0.35"
                        />
                        <text
                            x={node.x}
                            y={node.y + 7}
                            textAnchor="middle"
                            className="arch-diagram__label"
                            fill="currentColor"
                        >
                            {node.label}
                        </text>
                    </g>
                ))}
            </svg>
        </div>
    )
}
