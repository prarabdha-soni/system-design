import React, { useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { questions, Question } from '../data/questions';
import { Filter, SortAsc, SortDesc, Server, Brain, Code } from 'lucide-react';
import ViewTracker from '../utils/viewTracker';

const gradients = [
  'from-indigo-500 to-blue-600',
  'from-rose-500 to-fuchsia-600',
  'from-emerald-500 to-teal-600',
  'from-amber-500 to-orange-600',
  'from-purple-500 to-indigo-600',
  'from-sky-500 to-cyan-600',
];

const MainContent: React.FC = () => {
  const navigate = useNavigate();

  // Track page view when component mounts
  useEffect(() => {
    ViewTracker.trackPageView('main');
  }, []);

  // Helper function to generate URL-friendly slug
  const generateSlug = (title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  };

  // Separate questions into System Design, AI/ML, and DSA categories
  const systemDesignQuestions = questions.filter(q => 
    !q.title.includes('Top 20 Asked AI/ML Questions') && 
    !q.title.includes('Multimodal Pretraining') && 
    !q.title.includes('Concurrency and Coroutines') &&
    !q.title.includes('Top 20 Easy DSA Questions') &&
    !q.title.includes('Top 20 Medium DSA Questions') &&
    !q.title.includes('Top 20 Hard DSA Questions') &&
    !q.title.includes('Top August Repos')
  );
  
  const aiMlQuestions = questions.filter(q => 
    q.title.includes('Top 20 Asked AI/ML Questions') || 
    q.title.includes('Multimodal Pretraining') || 
    q.title.includes('Concurrency and Coroutines')
  );

  const dsaQuestions = questions.filter(q => 
    q.title.includes('Top 20 Easy DSA Questions') ||
    q.title.includes('Top 20 Medium DSA Questions') ||
    q.title.includes('Top 20 Hard DSA Questions')
  );

  const githubReposQuestions = questions.filter(q => 
    q.title.includes('Top August Repos')
  );

  const sortedSystemDesignQuestions = useMemo(() => {
    return systemDesignQuestions.sort((a, b) => {
      // Priority order: Perplexity, ChatGPT, ElevenLabs first, then by views
      const priorityOrder: Record<string, number> = {
        'Design Perplexity (AI-Powered Search Engine)': 1,
        'Design ChatGPT (AI Chat Platform)': 2,
        'Design ElevenLabs (AI Voice Generation)': 3
      };
      
      const aPriority = priorityOrder[a.title] || 999;
      const bPriority = priorityOrder[b.title] || 999;
      
      if (aPriority !== bPriority) {
        return aPriority - bPriority;
      }
      
      // If same priority, sort by views
      return b.views - a.views;
    });
  }, [systemDesignQuestions]);

  const sortedAiMlQuestions = useMemo(() => {
    return aiMlQuestions.sort((a, b) => b.views - a.views);
  }, [aiMlQuestions]);

  const sortedDsaQuestions = useMemo(() => {
    return dsaQuestions.sort((a, b) => b.views - a.views);
  }, [dsaQuestions]);

  const sortedGithubReposQuestions = useMemo(() => {
    return githubReposQuestions.sort((a, b) => b.views - a.views);
  }, [githubReposQuestions]);

  return (
    <main className="flex-1 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-4 sm:mb-6">
          <div className="text-center">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">Interview Preparation Hub</h1>
            <p className="text-sm sm:text-base text-gray-600 max-w-3xl mx-auto">
              Master system design interviews and AI/ML concepts with comprehensive problems and detailed solutions
            </p>
          </div>
        </div>

        {/* System Design Section */}
        <div className="mb-6">
          <div className="flex items-center space-x-2 mb-3">
            <div className="w-5 h-5 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <Server className="h-3 w-3 text-white" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-gray-900">System Design Problems</h2>
              <p className="text-xs text-gray-600">Master system design interviews with real-world architecture problems</p>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <div className="flex space-x-4 pb-4" style={{ minWidth: 'max-content' }}>
              {sortedSystemDesignQuestions.map((q: Question) => {
                const g = gradients[q.id % gradients.length];
                return (
                  <button
                    key={q.id}
                    onClick={() => navigate(`/${generateSlug(q.title)}`)}
                    className="bg-white rounded-xl border border-gray-200 hover:shadow-lg hover:-translate-y-0.5 transition-all overflow-hidden text-left group flex-shrink-0"
                    style={{ width: '280px' }}
                  >
                    <div className={`relative h-32 bg-gradient-to-r ${g}`}>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent" />
                      {q.logo && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="h-10 w-10 rounded-full ring-2 ring-white shadow-md overflow-hidden bg-white flex items-center justify-center">
                            <img
                              src={q.logo}
                              alt="logo"
                              className="h-full w-full object-cover"
                              onError={(e) => {
                                const letter = (q.title[0] || 'A').toUpperCase();
                                const svg = `data:image/svg+xml;utf8,${encodeURIComponent("<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><rect rx='12' width='64' height='64' fill='%231825d9'/><text x='50%' y='52%' dominant-baseline='middle' text-anchor='middle' font-family='system-ui,Segoe UI,Roboto' font-size='32' fill='white'>" + letter + "</text></svg>")}`;
                                (e.target as HTMLImageElement).src = svg;
                              }}
                            />
                          </div>
                        </div>
                      )}
                      <div className="absolute bottom-2 left-2 flex items-center space-x-1">
                        <span className="px-1 py-0.5 text-[8px] uppercase tracking-wide bg-white/90 text-gray-800 rounded-full border border-gray-200">{q.difficulty}</span>
                        <span className="px-1 py-0.5 text-[8px] uppercase tracking-wide bg-black/40 text-white rounded-full">{q.timeAgo}</span>
                      </div>
                      <div className="absolute top-2 right-2">
                        <span className="text-[9px] px-1 py-0.5 bg-white/90 text-gray-800 rounded-full font-medium">
                          {q.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-3">
                      <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors mb-1">{q.title}</h3>
                      <p className="text-xs text-gray-600 line-clamp-2 mb-2">{q.description}</p>
                      <div className="flex items-center justify-between text-[10px] text-gray-500 mb-1">
                        <span>{q.views.toLocaleString()} views</span>
                        <span>{q.solutions} LLDs</span>
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] text-gray-500">{q.estimatedTime}</span>
                        <span className="text-[10px] px-1 py-0.5 bg-blue-100 text-blue-700 rounded-full">{q.interviewLevel}</span>
                      </div>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {q.tags.slice(0, 2).map((tag: string, idx: number) => (
                          <span key={idx} className="text-[9px] px-1 py-0.5 bg-gray-100 text-gray-600 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {q.companies.slice(0, 2).map((company: string, idx: number) => (
                          <span key={idx} className="text-[9px] px-1 py-0.5 bg-green-100 text-green-700 rounded-full">
                            {company}
                          </span>
                        ))}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* AI/ML Questions Section */}
        <div className="mb-6">
          <div className="flex items-center space-x-2 mb-3">
            <div className="w-5 h-5 bg-gradient-to-r from-red-500 to-pink-600 rounded-lg flex items-center justify-center">
              <Brain className="h-3 w-3 text-white" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-gray-900">AI/ML Interview Questions</h2>
              <p className="text-xs text-gray-600">Prepare for AI/ML interviews with comprehensive Q&A</p>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <div className="flex space-x-4 pb-4" style={{ minWidth: 'max-content' }}>
              {sortedAiMlQuestions.map((q: Question) => {
                const g = gradients[q.id % gradients.length];
                return (
                  <button
                    key={q.id}
                    onClick={() => navigate(`/${generateSlug(q.title)}`)}
                    className="bg-white rounded-xl border border-gray-200 hover:shadow-lg hover:-translate-y-0.5 transition-all overflow-hidden text-left group flex-shrink-0"
                    style={{ width: '280px' }}
                  >
                    <div className={`relative h-32 bg-gradient-to-r ${g}`}>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent" />
                      {q.logo && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="h-10 w-10 rounded-full ring-2 ring-white shadow-md overflow-hidden bg-white flex items-center justify-center">
                            <img
                              src={q.logo}
                              alt="logo"
                              className="h-full w-full object-cover"
                              onError={(e) => {
                                const letter = (q.title[0] || 'A').toUpperCase();
                                const svg = `data:image/svg+xml;utf8,${encodeURIComponent("<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><rect rx='12' width='64' height='64' fill='%231825d9'/><text x='50%' y='52%' dominant-baseline='middle' text-anchor='middle' font-family='system-ui,Segoe UI,Roboto' font-size='32' fill='white'>" + letter + "</text></svg>")}`;
                                (e.target as HTMLImageElement).src = svg;
                              }}
                            />
                          </div>
                        </div>
                      )}
                      <div className="absolute bottom-2 left-2 flex items-center space-x-1">
                        <span className="px-1 py-0.5 text-[8px] uppercase tracking-wide bg-white/90 text-gray-800 rounded-full border border-gray-200">{q.difficulty}</span>
                        <span className="px-1 py-0.5 text-[8px] uppercase tracking-wide bg-black/40 text-white rounded-full">{q.timeAgo}</span>
                      </div>
                      <div className="absolute top-2 right-2">
                        <span className="text-[9px] px-1 py-0.5 bg-white/90 text-gray-800 rounded-full font-medium">
                          {q.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-3">
                      <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors mb-1">{q.title}</h3>
                      <p className="text-xs text-gray-600 line-clamp-2 mb-2">{q.description}</p>
                      <div className="flex items-center justify-between text-[10px] text-gray-500 mb-1">
                        <span>{q.views.toLocaleString()} views</span>
                        <span>{q.solutions} Q&As</span>
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] text-gray-500">{q.estimatedTime}</span>
                        <span className="text-[10px] px-1 py-0.5 bg-blue-100 text-blue-700 rounded-full">{q.interviewLevel}</span>
                      </div>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {q.tags.slice(0, 2).map((tag: string, idx: number) => (
                          <span key={idx} className="text-[9px] px-1 py-0.5 bg-gray-100 text-gray-600 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {q.companies.slice(0, 2).map((company: string, idx: number) => (
                          <span key={idx} className="text-[9px] px-1 py-0.5 bg-green-100 text-green-700 rounded-full">
                            {company}
                          </span>
                        ))}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* DSA Questions Section */}
        <div className="mb-6">
          <div className="flex items-center space-x-2 mb-3">
            <div className="w-5 h-5 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
              <Code className="h-3 w-3 text-white" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-gray-900">DSA Interview Questions</h2>
              <p className="text-xs text-gray-600">Master data structures and algorithms with comprehensive problem sets</p>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <div className="flex space-x-4 pb-4" style={{ minWidth: 'max-content' }}>
              {sortedDsaQuestions.map((q: Question) => {
                const g = gradients[q.id % gradients.length];
                return (
                  <button
                    key={q.id}
                    onClick={() => navigate(`/${generateSlug(q.title)}`)}
                    className="bg-white rounded-xl border border-gray-200 hover:shadow-lg hover:-translate-y-0.5 transition-all overflow-hidden text-left group flex-shrink-0"
                    style={{ width: '280px' }}
                  >
                    <div className={`relative h-32 bg-gradient-to-r ${g}`}>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent" />
                      {q.logo && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="h-10 w-10 rounded-full ring-2 ring-white shadow-md overflow-hidden bg-white flex items-center justify-center">
                            <img
                              src={q.logo}
                              alt="logo"
                              className="h-full w-full object-cover"
                              onError={(e) => {
                                const letter = (q.title[0] || 'A').toUpperCase();
                                const svg = `data:image/svg+xml;utf8,${encodeURIComponent("<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><rect rx='12' width='64' height='64' fill='%231825d9'/><text x='50%' y='52%' dominant-baseline='middle' text-anchor='middle' font-family='system-ui,Segoe UI,Roboto' font-size='32' fill='white'>" + letter + "</text></svg>")}`;
                                (e.target as HTMLImageElement).src = svg;
                              }}
                            />
                          </div>
                        </div>
                      )}
                      <div className="absolute bottom-2 left-2 flex items-center space-x-1">
                        <span className="px-1 py-0.5 text-[8px] uppercase tracking-wide bg-white/90 text-gray-800 rounded-full border border-gray-200">{q.difficulty}</span>
                        <span className="px-1 py-0.5 text-[8px] uppercase tracking-wide bg-black/40 text-white rounded-full">{q.timeAgo}</span>
                      </div>
                      <div className="absolute top-2 right-2">
                        <span className="text-[9px] px-1 py-0.5 bg-white/90 text-gray-800 rounded-full font-medium">
                          {q.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-3">
                      <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors mb-1">{q.title}</h3>
                      <p className="text-xs text-gray-600 line-clamp-2 mb-2">{q.description}</p>
                      <div className="flex items-center justify-between text-[10px] text-gray-500 mb-1">
                        <span>{q.views.toLocaleString()} views</span>
                        <span>{q.solutions} Problems</span>
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] text-gray-500">{q.estimatedTime}</span>
                        <span className="text-[10px] px-1 py-0.5 bg-blue-100 text-blue-700 rounded-full">{q.interviewLevel}</span>
                      </div>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {q.tags.slice(0, 2).map((tag: string, idx: number) => (
                          <span key={idx} className="text-[9px] px-1 py-0.5 bg-gray-100 text-gray-600 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {q.companies.slice(0, 2).map((company: string, idx: number) => (
                          <span key={idx} className="text-[9px] px-1 py-0.5 bg-green-100 text-green-700 rounded-full">
                            {company}
                          </span>
                        ))}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Trending GitHub Repos Section */}
        <div className="mb-6">
          <div className="flex items-center space-x-2 mb-3">
            <div className="w-5 h-5 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
              <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-gray-900">Trending GitHub Repos</h2>
              <p className="text-xs text-gray-600">Discover the most popular and trending open-source projects</p>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <div className="flex space-x-4 pb-4" style={{ minWidth: 'max-content' }}>
              {sortedGithubReposQuestions.map((q: Question) => {
                const g = gradients[q.id % gradients.length];
                return (
                  <button
                    key={q.id}
                    onClick={() => navigate(`/${generateSlug(q.title)}`)}
                    className="bg-white rounded-xl border border-gray-200 hover:shadow-lg hover:-translate-y-0.5 transition-all overflow-hidden text-left group flex-shrink-0"
                    style={{ width: '280px' }}
                  >
                    <div className={`relative h-32 bg-gradient-to-r ${g}`}>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent" />
                      {q.logo && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="h-10 w-10 rounded-full ring-2 ring-white shadow-md overflow-hidden bg-white flex items-center justify-center">
                            <img
                              src={q.logo}
                              alt="logo"
                              className="h-full w-full object-cover"
                              onError={(e) => {
                                const letter = (q.title[0] || 'A').toUpperCase();
                                const svg = `data:image/svg+xml;utf8,${encodeURIComponent("<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><rect rx='12' width='64' height='64' fill='%231825d9'/><text x='50%' y='52%' dominant-baseline='middle' text-anchor='middle' font-family='system-ui,Segoe UI,Roboto' font-size='32' fill='white'>" + letter + "</text></svg>")}`;
                                (e.target as HTMLImageElement).src = svg;
                              }}
                            />
                          </div>
                        </div>
                      )}
                      <div className="absolute bottom-2 left-2 flex items-center space-x-1">
                        <span className="px-1 py-0.5 text-[8px] uppercase tracking-wide bg-white/90 text-gray-800 rounded-full border border-gray-200">{q.difficulty}</span>
                        <span className="px-1 py-0.5 text-[8px] uppercase tracking-wide bg-black/40 text-white rounded-full">{q.timeAgo}</span>
                      </div>
                      <div className="absolute top-2 right-2">
                        <span className="text-[9px] px-1 py-0.5 bg-white/90 text-gray-800 rounded-full font-medium">
                          {q.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-3">
                      <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors mb-1">{q.title}</h3>
                      <p className="text-xs text-gray-600 line-clamp-2 mb-2">{q.description}</p>
                      <div className="flex items-center justify-between text-[10px] text-gray-500 mb-1">
                        <span>{q.views.toLocaleString()} views</span>
                        <span>{q.solutions} Repos</span>
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] text-gray-500">{q.estimatedTime}</span>
                        <span className="text-[10px] px-1 py-0.5 bg-purple-100 text-purple-700 rounded-full">{q.interviewLevel}</span>
                      </div>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {q.tags.slice(0, 2).map((tag: string, idx: number) => (
                          <span key={idx} className="text-[9px] px-1 py-0.5 bg-gray-100 text-gray-600 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {q.companies.slice(0, 2).map((company: string, idx: number) => (
                          <span key={idx} className="text-[9px] px-1 py-0.5 bg-purple-100 text-purple-700 rounded-full">
                            {company}
                          </span>
                        ))}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MainContent;