import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LineChart, Line } from 'recharts'
import { motion } from 'framer-motion'

// QuestGage confusion data by concept
const confusionByConcept = [
    { concept: "Newton's Laws", confusion: 78 },
    { concept: 'Momentum', confusion: 45 },
    { concept: 'Energy', confusion: 32 },
    { concept: 'Friction', confusion: 61 },
    { concept: 'Gravity', confusion: 25 },
]

// Real-time confusion timeline
const confusionTimeline = [
    { time: '0:00', confusion: 20 },
    { time: '5:00', confusion: 35 },
    { time: '10:00', confusion: 55 },
    { time: '15:00', confusion: 42 },
    { time: '20:00', confusion: 68 },
    { time: '25:00', confusion: 75 },
    { time: '30:00', confusion: 48 },
]

const getConfusionColor = (value: number) => {
    if (value >= 60) return '#ef4444' // red
    if (value >= 40) return '#f59e0b' // amber
    return '#22c55e' // green
}

const projects = [
    {
        title: 'QuestGage - AI Proctoring System',
        description: 'A React-based proctoring application that uses webcam analysis to detect student confusion and anomalies during exams. Features a real-time teacher dashboard with analytics powered by AWS Rekognition.',
        metrics: ['AWS Rekognition', 'Real-time alerts', 'Free Tier optimized'],
        tags: ['React', 'AWS S3', 'Lambda', 'DynamoDB', 'Rekognition', 'Chart.js'],
        link: 'https://github.com/vbg-07/QuestGage',
        features: [
            'Webcam monitoring with periodic snapshots',
            'Confusion detection via facial expression analysis',
            'Teacher dashboard with concept-based analytics',
            'Dark glassmorphism UI with Aurora background'
        ]
    },
    {
        title: 'Physical Desk Portfolio',
        description: 'An interactive portfolio featuring a top-down engineering workstation aesthetic with zoom-to-object interactions and monochrome theme (Light/Dark).',
        metrics: ['Framer Motion', 'Recharts', 'Responsive design'],
        tags: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
        link: 'https://github.com/vbg-07/Portfolio',
        features: [
            'Interactive desk elements with hover effects',
            'Modal system for expanded content',
            'Mobile-responsive Command Dashboard',
            'Terminal-style contact form'
        ]
    },
]

export default function MonitorContent() {
    return (
        <div className="space-y-8">
            {/* Live Dashboard Section */}
            <section>
                <h3 className="text-xl font-semibold text-gray-200 mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
                    Analytics Dashboard Preview
                </h3>


                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    {[
                        { label: 'Current Role', value: 'SDE', change: 'Aexiz Solutions', positive: true },
                        { label: 'Primary Stack', value: 'AWS', change: 'Cloud Native', positive: true },
                        { label: 'Focus Area', value: 'AI/ML', change: 'Full-Stack', positive: true },
                    ].map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-dark-200 rounded-xl p-4 border border-tech-blue-900/30"
                        >
                            <div className="text-sm text-gray-400">{stat.label}</div>
                            <div className="text-2xl font-bold text-white mt-1">{stat.value}</div>
                            <div className={`text-sm mt-1 ${stat.positive ? 'text-accent-green' : 'text-red-400'}`}>
                                {stat.change}
                            </div>
                        </motion.div>
                    ))}
                </div>
                <p className="text-sm text-gray-500 mb-4">
                    Data from <span className="text-tech-blue-400">QuestGage</span> — AI Proctoring & Engagement Analytics
                </p>

                {/* QuestGage Charts */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-dark-200 rounded-xl p-4 border border-tech-blue-900/30">
                        <h4 className="text-sm font-medium text-gray-400 mb-4">QuestGage: Confusion by Concept</h4>
                        <ResponsiveContainer width="100%" height={200}>
                            <BarChart data={confusionByConcept} layout="vertical">
                                <CartesianGrid strokeDasharray="3 3" stroke="#1a2332" />
                                <XAxis type="number" domain={[0, 100]} stroke="#6b7280" fontSize={12} />
                                <YAxis type="category" dataKey="concept" stroke="#6b7280" fontSize={10} width={80} />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#151c28',
                                        border: '1px solid rgba(0, 212, 255, 0.3)',
                                        borderRadius: '8px',
                                        color: '#e5e7eb',
                                    }}
                                    labelStyle={{ color: '#e5e7eb' }}
                                    itemStyle={{ color: '#e5e7eb' }}
                                    formatter={(value) => [`${value ?? 0}%`, 'Confusion']}
                                />
                                <Bar dataKey="confusion" radius={[0, 4, 4, 0]}>
                                    {confusionByConcept.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={getConfusionColor(entry.confusion)} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="bg-dark-200 rounded-xl p-4 border border-tech-blue-900/30">
                        <h4 className="text-sm font-medium text-gray-400 mb-4">QuestGage: Confusion Over Time</h4>
                        <ResponsiveContainer width="100%" height={200}>
                            <LineChart data={confusionTimeline}>
                                <defs>
                                    <linearGradient id="confusionGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1a2332" />
                                <XAxis dataKey="time" stroke="#6b7280" fontSize={12} />
                                <YAxis domain={[0, 100]} stroke="#6b7280" fontSize={12} />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#151c28',
                                        border: '1px solid rgba(0, 212, 255, 0.3)',
                                        borderRadius: '8px',
                                        color: '#e5e7eb',
                                    }}
                                    labelStyle={{ color: '#e5e7eb' }}
                                    itemStyle={{ color: '#e5e7eb' }}
                                    formatter={(value) => [`${value ?? 0}%`, 'Avg Confusion']}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="confusion"
                                    stroke="#f59e0b"
                                    strokeWidth={2}
                                    dot={{ fill: '#f59e0b', strokeWidth: 2 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </section>

            {/* Projects */}
            <section>
                <h3 className="text-xl font-semibold text-gray-200 mb-4">Featured Projects</h3>
                <div className="space-y-4">
                    {projects.map((project, i) => (
                        <motion.div
                            key={project.title}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 + i * 0.1 }}
                            className="bg-dark-200 rounded-xl p-5 border border-tech-blue-900/30 hover:border-tech-blue-700/50 transition-colors"
                        >
                            <div className="flex items-start justify-between">
                                <h4 className="text-lg font-semibold text-tech-blue-300">{project.title}</h4>
                                <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs text-gray-500 hover:text-tech-blue-400 transition-colors flex items-center gap-1"
                                >
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                    </svg>
                                    GitHub
                                </a>
                            </div>
                            <p className="text-gray-400 mt-2">{project.description}</p>

                            {/* Features */}
                            <ul className="mt-3 space-y-1">
                                {project.features.map((feature, fi) => (
                                    <li key={fi} className="text-sm text-gray-500 flex items-center gap-2">
                                        <span className="text-accent-green">›</span> {feature}
                                    </li>
                                ))}
                            </ul>

                            <div className="flex flex-wrap gap-2 mt-4">
                                {project.tags.map((tag) => (
                                    <span key={tag} className="px-2 py-1 bg-dark-300 text-gray-400 text-xs rounded-md border border-dark-50">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    )
}
