export interface CardLink {
    label: string
    url: string
    icon?: string
}

export interface CardContent {
    title: string
    description: string[]
    links: CardLink[]
}

export interface SectionData {
    id: string
    label: string
    startAngle: number
    orbitRadius: number
    orbitDuration: number   // seconds for one full orbit (30–60)
    planetSize: number
    planetColor: string
    card: CardContent
}

export const PLAYER_NAME = 'VIGNESH'
export const PLAYER_TITLE = 'Software Development Engineer'

export const sections: SectionData[] = [
    {
        id: 'about',
        label: 'About',
        startAngle: 0,
        orbitRadius: 18,
        orbitDuration: 35,
        planetSize: 38,
        planetColor: 'hsl(210, 30%, 55%)',
        card: {
            title: 'About Me',
            description: [
                'Vignesh — Software Development Engineer at Aexiz Solutions.',
                'Passionate about cloud architecture, serverless computing, and building scalable full-stack applications.',
                'Creator of QuestGage, an AI-powered exam proctoring system using AWS Rekognition for real-time confusion detection.',
                'Focused on cost-optimized solutions leveraging AWS Free Tier services.',
            ],
            links: [
                { label: 'GitHub', url: 'https://github.com/vbg-07', icon: '🔗' },
                { label: 'LinkedIn', url: 'https://linkedin.com/in/vbg07', icon: '💼' },
            ],
        },
    },
    {
        id: 'projects',
        label: 'Projects',
        startAngle: 90,
        orbitRadius: 28,
        orbitDuration: 45,
        planetSize: 48,
        planetColor: 'hsl(30, 35%, 55%)',
        card: {
            title: 'Projects',
            description: [
                'QuestGage — AI-powered exam proctoring with real-time confusion detection using AWS Rekognition, Lambda, and DynamoDB.',
                'Teacher analytics dashboard with live monitoring and post-exam reports.',
                'This portfolio — a spatial exploration experience built with React and CSS transforms.',
                'Full-stack projects using React, TypeScript, and AWS serverless.',
            ],
            links: [
                { label: 'QuestGage Repo', url: 'https://github.com/vbg-07/QuestGage', icon: '📦' },
                { label: 'Portfolio Repo', url: 'https://github.com/vbg-07', icon: '🌐' },
            ],
        },
    },
    {
        id: 'skills',
        label: 'Skills',
        startAngle: 200,
        orbitRadius: 36,
        orbitDuration: 55,
        planetSize: 32,
        planetColor: 'hsl(170, 25%, 50%)',
        card: {
            title: 'Skills',
            description: [
                'Cloud: AWS S3, Lambda, Rekognition, DynamoDB, CloudWatch.',
                'Frontend: React, TypeScript, Tailwind CSS, Three.js.',
                'Backend: Node.js, Python, REST APIs, SQL.',
                'Data & Analytics: Chart.js, Recharts, real-time dashboards.',
                'DevOps: Git, CI/CD pipelines, Docker, Nginx.',
            ],
            links: [],
        },
    },
    {
        id: 'contact',
        label: 'Contact',
        startAngle: 310,
        orbitRadius: 44,
        orbitDuration: 60,
        planetSize: 28,
        planetColor: 'hsl(260, 25%, 55%)',
        card: {
            title: 'Contact',
            description: [
                'Open to collaboration and new opportunities — reach out anytime!',
            ],
            links: [
                { label: 'GitHub', url: 'https://github.com/vbg-07', icon: '🔗' },
                { label: 'LinkedIn', url: 'https://linkedin.com/in/vbg07', icon: '💼' },
                { label: 'Email', url: 'mailto:vigneshbg505@gmail.com', icon: '✉️' },
            ],
        },
    },
]
