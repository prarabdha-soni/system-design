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
    !q.title.includes('Top 20 Hard DSA Questions')
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

  const sortedSystemDesignQuestions = useMemo(() => {
    return systemDesignQuestions.sort((a, b) => b.views - a.views);
  }, [systemDesignQuestions]);

  const sortedAiMlQuestions = useMemo(() => {
    return aiMlQuestions.sort((a, b) => b.views - a.views);
  }, [aiMlQuestions]);

  const sortedDsaQuestions = useMemo(() => {
    return dsaQuestions.sort((a, b) => b.views - a.views);
  }, [dsaQuestions]);

  return (
    <main className="flex-1 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8 sm:mb-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Interview Preparation Hub</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Master system design interviews and AI/ML concepts with comprehensive problems and detailed solutions
            </p>
          </div>
        </div>

        {/* System Design Section */}
        <div className="mb-12">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <Server className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">System Design Problems</h2>
              <p className="text-gray-600">Master system design interviews with real-world architecture problems</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {sortedSystemDesignQuestions.map((q: Question) => {
              const g = gradients[q.id % gradients.length];
              return (
                <button
                  key={q.id}
                  onClick={() => navigate(`/${generateSlug(q.title)}`)}
                  className="bg-white rounded-2xl border border-gray-200 hover:shadow-xl hover:-translate-y-0.5 transition-all overflow-hidden text-left group"
                >
                  <div className={`relative h-40 bg-gradient-to-r ${g}`}>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent" />
                    {q.logo && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="h-14 w-14 md:h-16 md:w-16 rounded-full ring-4 ring-white shadow-md overflow-hidden bg-white flex items-center justify-center">
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
                    <div className="absolute bottom-3 left-3 flex items-center space-x-2">
                      <span className="px-2 py-0.5 text-[10px] uppercase tracking-wide bg-white/90 text-gray-800 rounded-full border border-gray-200">{q.difficulty}</span>
                      <span className="px-2 py-0.5 text-[10px] uppercase tracking-wide bg-black/40 text-white rounded-full">{q.timeAgo}</span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className="text-xs px-2 py-1 bg-white/90 text-gray-800 rounded-full font-medium">
                        {q.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-4 pt-6">
                    <h3 className="text-base font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">{q.title}</h3>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">{q.description}</p>
                    <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
                      <span>{q.views.toLocaleString()} views</span>
                      <span>{q.solutions} LLDs</span>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-xs text-gray-500">{q.estimatedTime}</span>
                      <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">{q.interviewLevel}</span>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {q.tags.slice(0, 3).map((tag: string, idx: number) => (
                        <span key={idx} className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="mt-3 flex flex-wrap gap-1">
                      {q.companies.slice(0, 2).map((company: string, idx: number) => (
                        <span key={idx} className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">
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

        {/* AI/ML Questions Section */}
        <div className="mb-12">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-pink-600 rounded-lg flex items-center justify-center">
              <Brain className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">AI/ML Interview Questions</h2>
              <p className="text-gray-600">Prepare for AI/ML interviews with comprehensive Q&A</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {sortedAiMlQuestions.map((q: Question) => {
              const g = gradients[q.id % gradients.length];
              return (
                <button
                  key={q.id}
                  onClick={() => navigate(`/${generateSlug(q.title)}`)}
                  className="bg-white rounded-2xl border border-gray-200 hover:shadow-xl hover:-translate-y-0.5 transition-all overflow-hidden text-left group"
                >
                  <div className={`relative h-40 bg-gradient-to-r ${g}`}>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent" />
                    {q.logo && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="h-14 w-14 md:h-16 md:w-16 rounded-full ring-4 ring-white shadow-md overflow-hidden bg-white flex items-center justify-center">
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
                    <div className="absolute bottom-3 left-3 flex items-center space-x-2">
                      <span className="px-2 py-0.5 text-[10px] uppercase tracking-wide bg-white/90 text-gray-800 rounded-full border border-gray-200">{q.difficulty}</span>
                      <span className="px-2 py-0.5 text-[10px] uppercase tracking-wide bg-black/40 text-white rounded-full">{q.timeAgo}</span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className="text-xs px-2 py-1 bg-white/90 text-gray-800 rounded-full font-medium">
                        {q.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-4 pt-6">
                    <h3 className="text-base font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">{q.title}</h3>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">{q.description}</p>
                    <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
                      <span>{q.views.toLocaleString()} views</span>
                      <span>{q.solutions} Q&As</span>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-xs text-gray-500">{q.estimatedTime}</span>
                      <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">{q.interviewLevel}</span>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {q.tags.slice(0, 3).map((tag: string, idx: number) => (
                        <span key={idx} className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="mt-3 flex flex-wrap gap-1">
                      {q.companies.slice(0, 2).map((company: string, idx: number) => (
                        <span key={idx} className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">
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

        {/* DSA Questions Section */}
        <div className="mb-12">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
              <Code className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">DSA Interview Questions</h2>
              <p className="text-gray-600">Master data structures and algorithms with comprehensive problem sets</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {sortedDsaQuestions.map((q: Question) => {
              const g = gradients[q.id % gradients.length];
              return (
                <button
                  key={q.id}
                  onClick={() => navigate(`/${generateSlug(q.title)}`)}
                  className="bg-white rounded-2xl border border-gray-200 hover:shadow-xl hover:-translate-y-0.5 transition-all overflow-hidden text-left group"
                >
                  <div className={`relative h-40 bg-gradient-to-r ${g}`}>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent" />
                    {q.logo && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="h-14 w-14 md:h-16 md:w-16 rounded-full ring-4 ring-white shadow-md overflow-hidden bg-white flex items-center justify-center">
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
                    <div className="absolute bottom-3 left-3 flex items-center space-x-2">
                      <span className="px-2 py-0.5 text-[10px] uppercase tracking-wide bg-white/90 text-gray-800 rounded-full border border-gray-200">{q.difficulty}</span>
                      <span className="px-2 py-0.5 text-[10px] uppercase tracking-wide bg-black/40 text-white rounded-full">{q.timeAgo}</span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className="text-xs px-2 py-1 bg-white/90 text-gray-800 rounded-full font-medium">
                        {q.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-4 pt-6">
                    <h3 className="text-base font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">{q.title}</h3>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">{q.description}</p>
                    <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
                      <span>{q.views.toLocaleString()} views</span>
                      <span>{q.solutions} Problems</span>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-xs text-gray-500">{q.estimatedTime}</span>
                      <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">{q.interviewLevel}</span>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {q.tags.slice(0, 3).map((tag: string, idx: number) => (
                        <span key={idx} className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="mt-3 flex flex-wrap gap-1">
                      {q.companies.slice(0, 2).map((company: string, idx: number) => (
                        <span key={idx} className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">
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
    </main>
  );
};

export default MainContent;