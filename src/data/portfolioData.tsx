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
    orbitDuration: number
    planetSize: number
    planetColor: string
    card: CardContent
}

/* ── Project System ── */

export interface ArchNode {
    id: string
    label: string
    x: number   // 0–100 percentage
    y: number   // 0–100 percentage
}

export interface ArchConnection {
    from: string
    to: string
}

export interface ProjectData {
    id: string
    title: string
    description: string
    technologies: string[]
    githubUrl: string
    liveUrl?: string
    orbitRadius: number
    orbitDuration: number
    satelliteSize: number
    color: string
    architecture: {
        nodes: ArchNode[]
        connections: ArchConnection[]
    }
}

export const PLAYER_NAME = 'VIGNESH'
export const PLAYER_TITLE = 'Software Development Engineer'

export const projects: ProjectData[] = [
    {
        id: 'questgage',
        title: 'QuestGage',
        description: 'AI-powered exam proctoring system that uses webcam analysis to detect student confusion and anomalies during exams. Features a real-time teacher dashboard with analytics and per-question timing insights.',
        technologies: ['React', 'Vite', 'Tailwind CSS', 'AWS S3', 'AWS Lambda', 'AWS Rekognition', 'DynamoDB', 'Chart.js'],
        githubUrl: 'https://github.com/vbg-07/QuestGage',
        orbitRadius: 14,
        orbitDuration: 28,
        satelliteSize: 18,
        color: 'hsl(200, 45%, 55%)',
        architecture: {
            nodes: [
                { id: 'webcam', label: 'Webcam', x: 8, y: 50 },
                { id: 's3', label: 'S3', x: 30, y: 30 },
                { id: 'lambda', label: 'Lambda', x: 52, y: 50 },
                { id: 'rekognition', label: 'Rekognition', x: 52, y: 15 },
                { id: 'dynamo', label: 'DynamoDB', x: 75, y: 30 },
                { id: 'dashboard', label: 'Dashboard', x: 92, y: 50 },
            ],
            connections: [
                { from: 'webcam', to: 's3' },
                { from: 's3', to: 'lambda' },
                { from: 'lambda', to: 'rekognition' },
                { from: 'lambda', to: 'dynamo' },
                { from: 'dynamo', to: 'dashboard' },
            ],
        },
    },
    {
        id: 'pipeline-configs',
        title: 'Pipeline Configs',
        description: 'Full-stack web application for learning Docker, GitHub Actions CI/CD pipelines, and Kubernetes deployments. Includes a React frontend and Node.js backend with automated build, test, and deploy workflows.',
        technologies: ['React', 'Node.js', 'Docker', 'Kubernetes', 'GitHub Actions', 'Docker Compose'],
        githubUrl: 'https://github.com/vbg-07/Pipeline-Configs',
        orbitRadius: 22,
        orbitDuration: 36,
        satelliteSize: 15,
        color: 'hsl(145, 35%, 50%)',
        architecture: {
            nodes: [
                { id: 'git', label: 'GitHub', x: 8, y: 50 },
                { id: 'actions', label: 'Actions', x: 30, y: 30 },
                { id: 'docker', label: 'Docker', x: 52, y: 50 },
                { id: 'k8s', label: 'K8s', x: 75, y: 30 },
                { id: 'frontend', label: 'Frontend', x: 92, y: 35 },
                { id: 'backend', label: 'Backend', x: 92, y: 65 },
            ],
            connections: [
                { from: 'git', to: 'actions' },
                { from: 'actions', to: 'docker' },
                { from: 'docker', to: 'k8s' },
                { from: 'k8s', to: 'frontend' },
                { from: 'k8s', to: 'backend' },
            ],
        },
    },
    {
        id: 'portfolio',
        title: 'Portfolio',
        description: 'This solar-system portfolio — a spatial exploration experience built with React, TypeScript, and CSS transforms. Features orbital motion, parallax depth, and cinematic transitions.',
        technologies: ['React', 'TypeScript', 'Vite', 'CSS Transforms', 'HTML Canvas'],
        githubUrl: 'https://github.com/vbg-07/Portfolio',
        orbitRadius: 10,
        orbitDuration: 22,
        satelliteSize: 12,
        color: 'hsl(35, 40%, 55%)',
        architecture: {
            nodes: [
                { id: 'react', label: 'React', x: 8, y: 50 },
                { id: 'components', label: 'Components', x: 32, y: 30 },
                { id: 'css', label: 'CSS Engine', x: 55, y: 50 },
                { id: 'animations', label: 'Animations', x: 78, y: 30 },
                { id: 'browser', label: 'Browser', x: 92, y: 50 },
            ],
            connections: [
                { from: 'react', to: 'components' },
                { from: 'components', to: 'css' },
                { from: 'css', to: 'animations' },
                { from: 'animations', to: 'browser' },
            ],
        },
    },
    {
        id: 'hybrid-rag',
        title: 'Hybrid RAG',
        description: 'High-Performance Local Retrieval-Augmented Generation optimized for scientific document retrieval. Features vector-first hybrid retrieval using ChromaDB and local LLMs without GPU requirements.',
        technologies: ['Python', 'ChromaDB', 'FastEmbed', 'Ollama', 'BM25'],
        githubUrl: 'https://github.com/vbg-07/hybrid-rag',
        orbitRadius: 18,
        orbitDuration: 32,
        satelliteSize: 16,
        color: 'hsl(280, 45%, 60%)',
        architecture: {
            nodes: [
                { id: 'query', label: 'Query', x: 8, y: 50 },
                { id: 'embed', label: 'FastEmbed', x: 28, y: 50 },
                { id: 'vector', label: 'ChromaDB', x: 55, y: 35 },
                { id: 'bm25', label: 'BM25', x: 55, y: 65 },
                { id: 'llm', label: 'Ollama', x: 88, y: 50 },
            ],
            connections: [
                { from: 'query', to: 'embed' },
                { from: 'embed', to: 'vector' },
                { from: 'embed', to: 'bm25' },
                { from: 'vector', to: 'llm' },
                { from: 'bm25', to: 'llm' },
            ],
        },
    },
]

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
            description: [],
            links: [],
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
