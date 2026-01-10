import { motion } from 'framer-motion'
import { useState } from 'react'

const codeSnippets = [
    {
        title: 'aws/lambda-handler.js',
        language: 'javascript',
        code: `// Lambda function triggered by S3 upload
const AWS = require('aws-sdk');
const rekognition = new AWS.Rekognition();
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  const bucket = event.Records[0].s3.bucket.name;
  const key = event.Records[0].s3.object.key;
  
  // Analyze facial expressions with Rekognition
  const params = {
    Image: {
      S3Object: { Bucket: bucket, Name: key }
    },
    Attributes: ['ALL']
  };
  
  const faces = await rekognition
    .detectFaces(params)
    .promise();
  
  // Check for confusion indicators
  const emotions = faces.FaceDetails?.[0]?.Emotions || [];
  const confused = emotions.find(e => e.Type === 'CONFUSED');
  
  // Store analytics in DynamoDB
  await dynamodb.put({
    TableName: 'QuestGage-Analytics',
    Item: {
      snapshotId: key,
      timestamp: Date.now(),
      confusionScore: confused?.Confidence || 0,
      faceCount: faces.FaceDetails?.length || 0
    }
  }).promise();
  
  return { statusCode: 200 };
};`,
    },
    {
        title: 'react/useWebcam.ts',
        language: 'typescript',
        code: `// Custom hook for webcam snapshot capture
import { useRef, useCallback } from 'react';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

export function useWebcam(examConcept: string) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const captureSnapshot = useCallback(async () => {
    if (!videoRef.current || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const video = videoRef.current;
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    const ctx = canvas.getContext('2d');
    ctx?.drawImage(video, 0, 0);
    
    // Convert to blob for S3 upload
    const blob = await new Promise<Blob>((resolve) =>
      canvas.toBlob(resolve as BlobCallback, 'image/jpeg')
    );
    
    // Upload with concept tag for analytics
    const key = \`exam/\${examConcept}/\${Date.now()}.jpg\`;
    
    await s3Client.send(new PutObjectCommand({
      Bucket: 'questgage-snapshots',
      Key: key,
      Body: blob,
      ContentType: 'image/jpeg'
    }));
    
    return key;
  }, [examConcept]);
  
  return { videoRef, canvasRef, captureSnapshot };
}`,
    },
    {
        title: 'aws/s3-policy.json',
        language: 'json',
        code: `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:GetObject"
      ],
      "Resource": "arn:aws:s3:::questgage-snapshots/*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "rekognition:DetectFaces"
      ],
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "dynamodb:PutItem",
        "dynamodb:Query"
      ],
      "Resource": "arn:aws:dynamodb:*:*:table/QuestGage-*"
    }
  ]
}`,
    },
]

export default function BlueprintsContent() {
    const [activeTab, setActiveTab] = useState(0)

    return (
        <div className="space-y-6">
            {/* Intro */}
            <section>
                <p className="text-gray-400">
                    Code samples from <span className="text-tech-blue-400">QuestGage</span> - showcasing AWS Lambda triggers,
                    React webcam handling, and IAM policies for serverless architecture.
                </p>
            </section>

            {/* Code Viewer */}
            <section>
                <h3 className="text-xl font-semibold text-gray-200 mb-4 flex items-center gap-2">
                    <span className="text-sky-400">📄</span>
                    Code Samples
                </h3>

                {/* Tabs */}
                <div className="flex gap-2 mb-4 flex-wrap">
                    {codeSnippets.map((snippet, i) => (
                        <motion.button
                            key={snippet.title}
                            onClick={() => setActiveTab(i)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`px-4 py-2 rounded-lg text-sm font-mono transition-colors ${activeTab === i
                                    ? 'bg-tech-blue-500/20 text-tech-blue-400 border border-tech-blue-500/50'
                                    : 'bg-dark-200 text-gray-400 border border-dark-50 hover:border-tech-blue-800/50'
                                }`}
                        >
                            {snippet.title}
                        </motion.button>
                    ))}
                </div>

                {/* Code block */}
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-dark-300 rounded-xl border border-tech-blue-900/30 overflow-hidden"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between px-4 py-2 bg-dark-200 border-b border-dark-50">
                        <div className="flex items-center gap-2">
                            <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                            </div>
                            <span className="text-xs text-gray-500 font-mono">{codeSnippets[activeTab].title}</span>
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigator.clipboard.writeText(codeSnippets[activeTab].code)}
                            className="text-xs text-gray-500 hover:text-tech-blue-400 transition-colors"
                        >
                            📋 Copy
                        </motion.button>
                    </div>

                    {/* Code */}
                    <pre className="p-4 overflow-x-auto text-sm font-mono text-gray-300 leading-relaxed max-h-80">
                        <code>
                            {codeSnippets[activeTab].code.split('\n').map((line, i) => (
                                <div key={i} className="flex">
                                    <span className="text-gray-600 w-8 flex-shrink-0 text-right pr-4 select-none">
                                        {i + 1}
                                    </span>
                                    <span className="flex-1">
                                        {highlightSyntax(line, codeSnippets[activeTab].language)}
                                    </span>
                                </div>
                            ))}
                        </code>
                    </pre>
                </motion.div>
            </section>

            {/* Architecture Patterns */}
            <section>
                <h3 className="text-xl font-semibold text-gray-200 mb-4">Architecture Patterns Used</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                        { name: 'Event-Driven Processing', desc: 'S3 triggers Lambda on snapshot upload', icon: '⚡' },
                        { name: 'Serverless AI', desc: 'Rekognition for facial analysis without ML infra', icon: '🤖' },
                        { name: 'Real-time Dashboard', desc: 'DynamoDB streams for live teacher updates', icon: '📊' },
                        { name: 'Cost Optimization', desc: 'On-demand scaling within AWS Free Tier', icon: '💰' },
                    ].map((pattern, i) => (
                        <motion.div
                            key={pattern.name}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 + i * 0.1 }}
                            className="flex items-start gap-3 bg-dark-200 rounded-lg p-4 border border-tech-blue-900/30"
                        >
                            <span className="text-2xl">{pattern.icon}</span>
                            <div>
                                <div className="font-medium text-white">{pattern.name}</div>
                                <div className="text-sm text-gray-500">{pattern.desc}</div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* GitHub Link */}
            <section className="text-center pt-4 border-t border-dark-50">
                <a
                    href="https://github.com/vbg-07/QuestGage"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-dark-200 rounded-lg border border-tech-blue-900/30 hover:border-tech-blue-600/50 transition-colors"
                >
                    <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    <span className="text-gray-300">View Full Source on GitHub</span>
                </a>
            </section>
        </div>
    )
}

// Simple syntax highlighting
function highlightSyntax(line: string, _language: string) {
    const keywords = ['const', 'let', 'var', 'function', 'async', 'await', 'return', 'import', 'export', 'from', 'if', 'else', 'new', 'interface', 'type', 'Effect', 'Action', 'Resource', 'Version', 'Statement']
    const strings = /"[^"]*"|'[^']*'|`[^`]*`/g
    const comments = /\/\/.*/g

    let highlighted = line

    // Highlight comments
    highlighted = highlighted.replace(comments, (match) =>
        `<span class="text-gray-500">${match}</span>`
    )

    // Highlight strings
    highlighted = highlighted.replace(strings, (match) =>
        `<span class="text-accent-green">${match}</span>`
    )

    // Highlight keywords
    keywords.forEach(keyword => {
        const regex = new RegExp(`\\b${keyword}\\b`, 'g')
        highlighted = highlighted.replace(regex, `<span class="text-accent-purple">${keyword}</span>`)
    })

    return <span dangerouslySetInnerHTML={{ __html: highlighted }} />
}
