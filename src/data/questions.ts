export interface Question {
  id: number;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert';
  author: string;
  timeAgo: string;
  views: number;
  solutions: number;
  isStarred?: boolean;
  isBookmarked?: boolean;
  image: string;
  logo?: string;
  category: 'Distributed Systems' | 'Database Design' | 'Network Architecture' | 'Microservices' | 'Caching Systems' | 'Load Balancing' | 'AI/ML Systems' | 'Real-time Systems' | 'Scalable Systems' | 'Security Systems';
  estimatedTime: string;
  companies: string[];
  tags: string[];
  interviewLevel: 'Junior' | 'Mid' | 'Senior' | 'Staff' | 'Principal';
}

const makeSvg = (letter: string, color: string) =>
  `data:image/svg+xml;utf8,` +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'>` +
      `<rect rx='12' width='64' height='64' fill='${color}'/>` +
      `<text x='50%' y='52%' dominant-baseline='middle' text-anchor='middle' font-family='system-ui,Segoe UI,Roboto' font-size='32' fill='white'>${letter}</text>` +
    `</svg>`
  );

export const questions: Question[] = [
  {
    id: 1,
    title: 'Design Perplexity (AI-Powered Search Engine)',
    description: 'Build an AI-powered search and answer platform that provides real-time, cited responses to user queries',
    difficulty: 'Expert',
    author: 'aiarchitect',
    timeAgo: '3 hours ago',
    views: 892,
    solutions: 5,
    image: 'https://images.unsplash.com/photo-1517976487492-576ea6b2936d?q=80&w=1600&auto=format&fit=crop',
    logo: 'https://logo.clearbit.com/perplexity.ai',
    category: 'AI/ML Systems',
    estimatedTime: '45-60 min',
    companies: ['Google', 'OpenAI', 'Anthropic', 'Microsoft', 'Meta'],
    tags: ['AI', 'Search', 'LLM', 'Vector Search', 'Real-time'],
    interviewLevel: 'Senior',
  },
  {
    id: 2,
    title: 'Design ElevenLabs (AI Voice Generation)',
    description: 'Design an AI-powered voice generation platform that creates realistic speech from text with multiple voices and languages',
    difficulty: 'Expert',
    author: 'voiceexpert',
    timeAgo: '1 day ago',
    views: 756,
    solutions: 3,
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?q=80&w=1600&auto=format&fit=crop',
    logo: 'https://logo.clearbit.com/elevenlabs.io',
    category: 'AI/ML Systems',
    estimatedTime: '50-65 min',
    companies: ['ElevenLabs', 'OpenAI', 'Google', 'Microsoft', 'Amazon'],
    tags: ['AI', 'Voice Generation', 'Text-to-Speech', 'Real-time', 'Audio Processing'],
    interviewLevel: 'Senior',
  },
  {
    id: 3,
    title: 'Design ChatGPT (AI Chat Platform)',
    description: 'Build a conversational AI platform that handles millions of concurrent chat sessions with real-time responses',
    difficulty: 'Expert',
    author: 'chatexpert',
    timeAgo: '2 days ago',
    views: 1245,
    solutions: 7,
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1600&auto=format&fit=crop',
    logo: 'https://logo.clearbit.com/chat.openai.com',
    category: 'AI/ML Systems',
    estimatedTime: '55-70 min',
    companies: ['OpenAI', 'Anthropic', 'Google', 'Microsoft', 'Meta'],
    tags: ['AI', 'Chat', 'LLM', 'Real-time', 'Conversation'],
    interviewLevel: 'Staff',
  },
];