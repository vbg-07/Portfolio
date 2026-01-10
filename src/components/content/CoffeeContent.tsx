import { motion } from 'framer-motion'

const skills = [
    { category: 'Cloud (AWS)', items: ['S3', 'Lambda', 'Rekognition', 'DynamoDB', 'CloudWatch'] },
    { category: 'Frontend', items: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vite'] },
    { category: 'Data & Analytics', items: ['Chart.js', 'Recharts', 'Python', 'SQL'] },
]

const timeline = [
    {
        year: '2025',
        role: 'Cloud & Full-Stack Developer',
        company: 'Independent Projects',
        description: 'Building serverless applications with AWS and modern React',
        highlight: true
    },
    {
        year: '2025',
        role: 'QuestGage',
        company: 'Personal Project',
        description: 'AI-powered exam proctoring system with AWS Rekognition & real-time analytics',
        highlight: true
    },
]

export default function CoffeeContent() {
    return (
        <div className="space-y-8">
            {/* Hero section */}
            <section className="text-center">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-tech-blue-500 to-accent-purple flex items-center justify-center text-4xl"
                >
                    ☁️
                </motion.div>
                <h3 className="text-2xl font-bold text-white">Cloud Developer & Builder</h3>
                <p className="text-gray-400 mt-2 max-w-xl mx-auto">
                    Building serverless applications on AWS with React frontends. Passionate about AI/ML integration and real-time analytics.
                </p>
                <div className="flex justify-center gap-4 mt-4">
                    <a
                        href="https://github.com/vbg-07"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-dark-200 rounded-lg border border-tech-blue-900/30 hover:border-tech-blue-600/50 transition-colors"
                    >
                        <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                        <span className="text-sm text-gray-300">vbg-07</span>
                    </a>
                    <a
                        href="https://www.linkedin.com/in/vignesh-b-84545a27b"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-dark-200 rounded-lg border border-tech-blue-900/30 hover:border-blue-500/50 transition-colors"
                    >
                        <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                        <span className="text-sm text-gray-300">LinkedIn</span>
                    </a>
                </div>
            </section>

            {/* My Story */}
            <section>
                <h3 className="text-xl font-semibold text-gray-200 mb-4 flex items-center gap-2">
                    <span className="text-accent-amber">☕</span>
                    What I'm Building
                </h3>
                <div className="bg-dark-200 rounded-xl p-6 border border-tech-blue-900/30">
                    <p className="text-gray-300 leading-relaxed">
                        I'm a developer focused on building <span className="text-tech-blue-400">serverless applications</span> that
                        leverage AWS cloud services. My recent project, <span className="text-accent-green">QuestGage</span>, combines
                        my interests in AI/ML and data analytics.
                    </p>
                    <p className="text-gray-300 leading-relaxed mt-4">
                        QuestGage uses <span className="text-accent-purple">AWS Rekognition</span> to analyze student expressions during
                        exams, detecting confusion and flagging anomalies in real-time. The teacher dashboard provides concept-based
                        analytics to help educators identify which topics need more attention.
                    </p>
                    <p className="text-gray-300 leading-relaxed mt-4">
                        I'm passionate about building cost-optimized solutions — QuestGage was designed entirely within the
                        <span className="text-accent-amber"> AWS Free Tier</span>, using on-demand scaling to minimize costs.
                    </p>
                </div>
            </section>

            {/* Skills */}
            <section>
                <h3 className="text-xl font-semibold text-gray-200 mb-4">Technical Skills</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {skills.map((skillGroup, i) => (
                        <motion.div
                            key={skillGroup.category}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-dark-200 rounded-xl p-4 border border-tech-blue-900/30"
                        >
                            <h4 className="text-sm font-medium text-tech-blue-400 mb-3">{skillGroup.category}</h4>
                            <div className="flex flex-wrap gap-2">
                                {skillGroup.items.map((skill) => (
                                    <span
                                        key={skill}
                                        className="px-2 py-1 bg-dark-300 text-gray-300 text-xs rounded-md border border-dark-50"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Timeline */}
            <section>
                <h3 className="text-xl font-semibold text-gray-200 mb-4">Project Timeline</h3>
                <div className="space-y-4">
                    {timeline.map((item, i) => (
                        <motion.div
                            key={item.role}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 + i * 0.1 }}
                            className="flex gap-4"
                        >
                            <div className="flex flex-col items-center">
                                <div className={`w-3 h-3 rounded-full ${item.highlight ? 'bg-accent-green' : 'bg-tech-blue-500'}`} />
                                {i < timeline.length - 1 && <div className="w-[2px] flex-1 bg-dark-50 mt-2" />}
                            </div>
                            <div className="flex-1 pb-6">
                                <div className="text-sm text-tech-blue-400 font-mono">{item.year}</div>
                                <div className="text-lg font-semibold text-white">{item.role}</div>
                                <div className="text-sm text-accent-purple">{item.company}</div>
                                <div className="text-sm text-gray-400 mt-1">{item.description}</div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    )
}
