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
    icon: React.ReactNode
    angle: number // orbital position in degrees (0 = top, clockwise)
    depth: number // translateZ offset in px (positive = closer to camera)
    card: CardContent
}

export const PLAYER_NAME = 'VIGNESH'
export const PLAYER_TITLE = 'Software Development Engineer'

export const sections: SectionData[] = [
    {
        id: 'about',
        label: 'About',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" >
                <circle cx="12" cy="12" r="10" />
            </svg>
        ),
        angle: 0,
        depth: 30,
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
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" >
                <path d="M12 2L2 22h20L12 2z" />
            </svg>
        ),
        angle: 90,
        depth: -20,
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
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" >
                <path d="M12 2l10 10-10 10L2 12 12 2z" />
            </svg>
        ),
        angle: 180,
        depth: 15,
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
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" >
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            </svg>
        ),
        angle: 270,
        depth: -35,
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
