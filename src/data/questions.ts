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
  {
    id: 3,
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
    id: 4,
    title: 'Multimodal Pretraining – Interview Q&A',
    description: 'Comprehensive guide to multimodal pretraining covering vision encoders, ViT, VQ-VAE, CLIP, and advanced AI architectures',
    difficulty: 'Expert',
    author: 'mlarchitect',
    timeAgo: '5 hours ago',
    views: 634,
    solutions: 4,
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1600&auto=format&fit=crop',
    logo: makeSvg('M', '#8B5CF6'),
    category: 'AI/ML Systems',
    estimatedTime: '40-55 min',
    companies: ['OpenAI', 'Google', 'Meta', 'Microsoft', 'Anthropic'],
    tags: ['AI', 'Multimodal', 'Vision', 'Transformers', 'Pretraining'],
    interviewLevel: 'Senior',
  },
  {
    id: 5,
    title: 'Concurrency and Coroutines – Interview Q&A',
    description: 'Comprehensive guide to Python concurrency covering threading, multiprocessing, asyncio, coroutines, and the Global Interpreter Lock',
    difficulty: 'Hard',
    author: 'pythonarchitect',
    timeAgo: '2 hours ago',
    views: 892,
    solutions: 6,
    image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?q=80&w=1600&auto=format&fit=crop',
    logo: makeSvg('C', '#059669'),
    category: 'Scalable Systems',
    estimatedTime: '35-50 min',
    companies: ['Google', 'Microsoft', 'Amazon', 'Meta', 'Netflix'],
    tags: ['Python', 'Concurrency', 'AsyncIO', 'Threading', 'Multiprocessing'],
    interviewLevel: 'Mid',
  },
  {
    id: 6,
    title: 'Top 20 Asked AI/ML Questions',
    description: 'Comprehensive collection of the most frequently asked AI/ML interview questions covering NumPy, Pandas, Statistics, Machine Learning algorithms, Unsupervised Learning, and Deep Learning fundamentals',
    difficulty: 'Medium',
    author: 'mlinterviewer',
    timeAgo: '1 hour ago',
    views: 1567,
    solutions: 20,
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1600&auto=format&fit=crop',
    logo: makeSvg('A', '#DC2626'),
    category: 'AI/ML Systems',
    estimatedTime: '60-90 min',
    companies: ['Google', 'OpenAI', 'Microsoft', 'Meta', 'Amazon', 'Netflix', 'Uber', 'Airbnb'],
    tags: ['AI', 'Machine Learning', 'NumPy', 'Pandas', 'Statistics', 'Algorithms', 'Deep Learning', 'Interview'],
    interviewLevel: 'Mid',
  },
  {
    id: 7,
    title: 'Top 20 Easy DSA Questions',
    description: 'Build foundations: arrays, strings, hashing, basics of recursion. Essential problems for beginners covering Two Sum, Valid Parentheses, Merge Lists, Kadane\'s Algorithm, and more fundamental concepts.',
    difficulty: 'Easy',
    author: 'dsaexpert',
    timeAgo: '30 minutes ago',
    views: 2341,
    solutions: 20,
    image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?q=80&w=1600&auto=format&fit=crop',
    logo: makeSvg('E', '#10B981'),
    category: 'Scalable Systems',
    estimatedTime: '45-60 min',
    companies: ['Google', 'Microsoft', 'Amazon', 'Meta', 'Apple', 'Netflix', 'Uber', 'Airbnb'],
    tags: ['DSA', 'Arrays', 'Strings', 'Hashing', 'Recursion', 'Linked Lists', 'Stacks', 'Queues'],
    interviewLevel: 'Junior',
  },
  {
    id: 8,
    title: 'Top 20 Medium DSA Questions',
    description: 'Patterns: sliding window, backtracking, binary search, graph BFS/DFS, DP intro. Intermediate problems covering Add Two Numbers, Longest Substring, 3Sum, Group Anagrams, and advanced algorithms.',
    difficulty: 'Medium',
    author: 'dsaexpert',
    timeAgo: '45 minutes ago',
    views: 1987,
    solutions: 20,
    image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?q=80&w=1600&auto=format&fit=crop',
    logo: makeSvg('M', '#F59E0B'),
    category: 'Scalable Systems',
    estimatedTime: '60-75 min',
    companies: ['Google', 'Microsoft', 'Amazon', 'Meta', 'Apple', 'Netflix', 'Uber', 'Airbnb'],
    tags: ['DSA', 'Sliding Window', 'Backtracking', 'Binary Search', 'Graphs', 'Dynamic Programming', 'Topological Sort'],
    interviewLevel: 'Mid',
  },
  {
    id: 9,
    title: 'Top 20 Hard DSA Questions',
    description: 'Trending tough ones: DP on strings, advanced graphs, segment trees, backtracking, system-level search. Advanced problems covering Median of Arrays, Trapping Rain Water, N-Queens, and complex algorithms.',
    difficulty: 'Hard',
    author: 'dsaexpert',
    timeAgo: '1 hour ago',
    views: 1456,
    solutions: 20,
    image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?q=80&w=1600&auto=format&fit=crop',
    logo: makeSvg('H', '#EF4444'),
    category: 'Scalable Systems',
    estimatedTime: '75-90 min',
    companies: ['Google', 'Microsoft', 'Amazon', 'Meta', 'Apple', 'Netflix', 'Uber', 'Airbnb'],
    tags: ['DSA', 'Dynamic Programming', 'Advanced Graphs', 'Segment Trees', 'Backtracking', 'System Design'],
    interviewLevel: 'Senior',
  },

  {
    id: 10,
    title: 'Top August Repos',
    description: '🔥 Top 10 AI GitHub Repositories (2025) - Discover the most trending AI projects including AutoGPT, Stable Diffusion WebUI, LangChain, Dify, and more cutting-edge AI tools and frameworks.',
    difficulty: 'Medium',
    author: 'githubtrends',
    timeAgo: '2 hours ago',
    views: 2156,
    solutions: 10,
    image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=1600&auto=format&fit=crop',
    logo: 'https://logo.clearbit.com/github.com',
    category: 'AI/ML Systems',
    estimatedTime: '20-30 min',
    companies: ['GitHub', 'OpenAI', 'Anthropic', 'Google', 'Meta', 'Microsoft'],
    tags: ['AI', 'GitHub', 'Open Source', 'LLM', 'Machine Learning', 'Trending'],
    interviewLevel: 'Mid',
  },
];