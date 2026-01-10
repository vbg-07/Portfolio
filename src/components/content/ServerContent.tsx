import { motion } from 'framer-motion'

const awsServices = [
    { name: 'S3', description: 'Object storage for exam snapshots', icon: '🗄️', used: true },
    { name: 'Lambda', description: 'Serverless compute for image processing', icon: '⚡', used: true },
    { name: 'Rekognition', description: 'AI facial analysis for confusion detection', icon: '🤖', used: true },
    { name: 'DynamoDB', description: 'NoSQL database for analytics data', icon: '🗃️', used: true },
    { name: 'CloudWatch', description: 'Monitoring and logging', icon: '📊', used: false },
    { name: 'Cognito', description: 'User authentication (recommended)', icon: '🔐', used: false },
    { name: 'API Gateway', description: 'REST API management', icon: '🌐', used: false },
    { name: 'SQS', description: 'Message queuing for async processing', icon: '📨', used: false },
]

const certifications = [
    { name: 'Building with AWS Services', year: 'In Progress', badge: '🏗️' },
    { name: 'Serverless Architecture', year: '2025', badge: '⚡' },
    { name: 'AI/ML on AWS', year: '2025', badge: '🤖' },
]


export default function ServerContent() {
    return (
        <div className="space-y-8">
            {/* QuestGage Architecture */}
            <section>
                <h3 className="text-xl font-semibold text-gray-200 mb-4 flex items-center gap-2">
                    <span className="text-tech-blue-400">⚙️</span>
                    QuestGage - AWS Architecture
                </h3>

                {/* Schematic View */}
                <div className="bg-dark-200 rounded-xl p-6 border border-tech-blue-900/30 blueprint-grid">
                    <div className="flex flex-col items-center gap-4">
                        {/* Student/Teacher */}
                        <div className="flex items-center gap-8">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="px-4 py-2 bg-dark-300 rounded-lg border border-gray-600 text-center"
                            >
                                <div className="text-2xl">👨‍🎓</div>
                                <div className="text-xs text-gray-400">Student</div>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.1 }}
                                className="px-4 py-2 bg-dark-300 rounded-lg border border-gray-600 text-center"
                            >
                                <div className="text-2xl">👩‍🏫</div>
                                <div className="text-xs text-gray-400">Teacher</div>
                            </motion.div>
                        </div>

                        <div className="w-[2px] h-6 bg-tech-blue-500" />

                        {/* React Frontend */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="px-6 py-3 bg-dark-300 rounded-lg border border-tech-blue-500 text-center"
                        >
                            <div className="text-xl">⚛️</div>
                            <div className="text-sm text-tech-blue-400 font-medium">React + Vite</div>
                            <div className="text-xs text-gray-500">Webcam Capture</div>
                        </motion.div>

                        <div className="w-[2px] h-6 bg-tech-blue-500" />

                        {/* AWS Services Row */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="flex gap-4 flex-wrap justify-center"
                        >
                            <div className="px-4 py-3 bg-dark-300 rounded-lg border border-accent-amber/50 text-center relative">
                                <div className="absolute -top-1 -right-1 w-2 h-2 bg-accent-green rounded-full animate-pulse" />
                                <div className="text-xl">🗄️</div>
                                <div className="text-xs text-accent-amber">S3</div>
                                <div className="text-[10px] text-gray-500">Snapshots</div>
                            </div>
                            <div className="px-4 py-3 bg-dark-300 rounded-lg border border-accent-green/50 text-center relative">
                                <div className="absolute -top-1 -right-1 w-2 h-2 bg-accent-green rounded-full animate-pulse" />
                                <div className="text-xl">⚡</div>
                                <div className="text-xs text-accent-green">Lambda</div>
                                <div className="text-[10px] text-gray-500">Trigger</div>
                            </div>
                            <div className="px-4 py-3 bg-dark-300 rounded-lg border border-accent-purple/50 text-center relative">
                                <div className="absolute -top-1 -right-1 w-2 h-2 bg-accent-green rounded-full animate-pulse" />
                                <div className="text-xl">🤖</div>
                                <div className="text-xs text-accent-purple">Rekognition</div>
                                <div className="text-[10px] text-gray-500">AI Analysis</div>
                            </div>
                            <div className="px-4 py-3 bg-dark-300 rounded-lg border border-tech-blue-500/50 text-center relative">
                                <div className="absolute -top-1 -right-1 w-2 h-2 bg-accent-green rounded-full animate-pulse" />
                                <div className="text-xl">🗃️</div>
                                <div className="text-xs text-tech-blue-400">DynamoDB</div>
                                <div className="text-[10px] text-gray-500">Analytics</div>
                            </div>
                        </motion.div>

                        <div className="w-[2px] h-6 bg-tech-blue-500/50" />

                        {/* Dashboard */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="px-6 py-3 bg-dark-300 rounded-lg border border-accent-green/50 text-center"
                        >
                            <div className="text-xl">📊</div>
                            <div className="text-sm text-accent-green font-medium">Teacher Dashboard</div>
                            <div className="text-xs text-gray-500">Real-time Alerts</div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <section>
                <h3 className="text-xl font-semibold text-gray-200 mb-4">AWS Services Expertise</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {awsServices.map((service, i) => (
                        <motion.div
                            key={service.name}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.05 }}
                            className={`bg-dark-200 rounded-lg p-3 border transition-colors group relative ${service.used
                                ? 'border-accent-green/30 hover:border-accent-green/60'
                                : 'border-tech-blue-900/30 hover:border-tech-blue-600/50'
                                }`}
                        >
                            {service.used && (
                                <div className="absolute top-2 right-2 text-[8px] px-1.5 py-0.5 bg-accent-green/20 text-accent-green rounded-full">
                                    Used
                                </div>
                            )}
                            <div className="text-2xl mb-2">{service.icon}</div>
                            <div className="font-medium text-white text-sm">{service.name}</div>
                            <div className="text-xs text-gray-500 mt-1 group-hover:text-gray-400 transition-colors">
                                {service.description}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Learning Path */}
            <section>
                <h3 className="text-xl font-semibold text-gray-200 mb-4">Learning & Certifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {certifications.map((cert, i) => (
                        <motion.div
                            key={cert.name}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + i * 0.1 }}
                            className="flex items-center gap-4 bg-dark-200 rounded-xl p-4 border border-accent-amber/20"
                        >
                            <div className="text-3xl">{cert.badge}</div>
                            <div>
                                <div className="font-medium text-white">{cert.name}</div>
                                <div className="text-sm text-gray-500">{cert.year}</div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    )
}
