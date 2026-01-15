import { motion } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell } from 'recharts'
import { useTheme } from '../contexts/ThemeContext'

// QuestGage-style confusion data by concept
// QuestGage-style confusion data by concept
const confusionData = [
    { concept: 'Newton\'s Laws', confusion: 78, color: '#495057' },
    { concept: 'Momentum', confusion: 45, color: '#adb5bd' },
    { concept: 'Energy', confusion: 32, color: '#dee2e6' },
    { concept: 'Friction', confusion: 61, color: '#adb5bd' },
    { concept: 'Gravity', confusion: 25, color: '#dee2e6' },
]

export default function Monitor() {
    const { isLight } = useTheme()

    return (
        <div className="w-full h-full flex flex-col">
            {/* Monitor frame */}
            <div className={`relative flex-1 rounded-xl border-2 shadow-lg overflow-hidden transition-colors duration-300 ${isLight ? 'bg-gray-200 border-gray-300' : 'bg-dark-200 border-dark-50'
                }`}>
                {/* Screen bezel */}
                <div className={`absolute inset-2 rounded-lg overflow-hidden transition-colors duration-300 ${isLight ? 'bg-gray-100' : 'bg-dark-400'
                    }`}>
                    {/* Screen content */}
                    <div className={`absolute inset-1 rounded-md p-3 transition-colors duration-300 ${isLight ? 'bg-gradient-to-br from-dark-40 to-dark-40' : 'bg-gradient-to-br from-dark-300 to-dark-400'
                        }`}>
                        {/* Dashboard header - QuestGage style */}
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-gray-500 animate-pulse" />
                                <span className={`text-[8px] font-mono uppercase tracking-wider ${isLight ? 'text-dark-50' : 'text-gray-300'}`}>QuestGage Analytics</span>
                            </div>
                            <div className="flex gap-1 items-center">
                                <span className="text-[6px] text-gray-500">LIVE</span>
                                <div className="w-1.5 h-1.5 rounded-full bg-gray-500 animate-pulse" />
                            </div>
                        </div>

                        {/* Confusion by Concept chart */}
                        <div className="h-[55%]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={confusionData} layout="vertical">
                                    <XAxis type="number" hide domain={[0, 100]} />
                                    <YAxis
                                        type="category"
                                        dataKey="concept"
                                        hide
                                        width={0}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: '#151c28',
                                            border: '1px solid rgba(255, 255, 255, 0.1)',
                                            borderRadius: '8px',
                                            fontSize: '10px'
                                        }}
                                        formatter={(value) => [`${value ?? 0}%`, 'Confusion']}
                                    />
                                    <Bar
                                        dataKey="confusion"
                                        radius={[0, 4, 4, 0]}
                                        barSize={8}
                                    >
                                        {confusionData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>

                        {/* QuestGage Stats row */}
                        <div className="flex justify-between mt-2">
                            <motion.div
                                className="text-center"
                                animate={{ opacity: [0.6, 1, 0.6] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                <div className={`text-[6px] ${isLight ? 'text-dark-50' : 'text-gray-500'}`}>STUDENTS</div>
                                <div className={`text-[10px] font-bold ${isLight ? 'text-gray-500' : 'text-gray-300'}`}>24</div>
                            </motion.div>
                            <div className="text-center">
                                <div className={`text-[6px] ${isLight ? 'text-dark-50' : 'text-gray-500'}`}>ALERTS</div>
                                <div className={`text-[10px] font-bold ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>3</div>
                            </div>
                            <div className="text-center">
                                <div className={`text-[6px] ${isLight ? 'text-dark-50' : 'text-gray-500'}`}>AVG CONF</div>
                                <div className={`text-[10px] font-bold ${isLight ? 'text-gray-500' : 'text-gray-300'}`}>48%</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Screen glow */}
                <div className="absolute inset-0 opacity-20 pointer-events-none"
                    style={{
                        background: 'radial-gradient(ellipse at center, rgba(255, 255, 255, 0.1) 0%, transparent 70%)'
                    }}
                />
            </div>

            {/* Monitor stand */}
            <div className="flex flex-col items-center">
                <div className="w-4 h-3 bg-gradient-to-b from-dark-50 to-dark-100" />
                <div className="w-16 h-2 bg-dark-100 rounded-b-lg" />
            </div>
        </div>
    )
}
