import React, { useMemo, useState, useEffect } from 'react';
import { questions, Question } from '../data/questions';
import QuestionDetail from './QuestionDetail';
import { Filter, SortAsc, SortDesc } from 'lucide-react';
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
  const [selected, setSelected] = useState<Question | null>(null);
  const [filter, setFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'popular' | 'recent' | 'difficulty'>('popular');

  // Track page view when component mounts
  useEffect(() => {
    ViewTracker.trackPageView('main');
  }, []);

  const filteredAndSortedQuestions = useMemo(() => {
    let filtered = questions;
    
    if (filter !== 'all') {
      filtered = questions.filter(q => q.category === filter);
    }
    
    switch (sortBy) {
      case 'popular':
        return filtered.sort((a, b) => b.views - a.views);
      case 'recent':
        return filtered.sort((a, b) => new Date(b.timeAgo).getTime() - new Date(a.timeAgo).getTime());
      case 'difficulty':
        const difficultyOrder = { 'Easy': 1, 'Medium': 2, 'Hard': 3, 'Expert': 4 };
        return filtered.sort((a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]);
      default:
        return filtered;
    }
  }, [filter, sortBy]);

  const categories = [
    { id: 'all', name: 'All Problems', count: questions.length },
    { id: 'AI/ML Systems', name: 'AI/ML Systems', count: questions.filter(q => q.category === 'AI/ML Systems').length },
  ];

  if (selected) {
    return (
      <main className="flex-1 p-0">
        <QuestionDetail question={selected} onBack={() => setSelected(null)} />
      </main>
    );
  }

  return (
    <main className="flex-1 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Filters and Sorting */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4 sm:mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">Filter:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setFilter(category.id)}
                    className={`px-3 py-1 text-sm rounded-full transition-colors ${
                      filter === category.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category.name} ({category.count})
                  </button>
                ))}
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-1 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="popular">Most Popular</option>
                <option value="recent">Most Recent</option>
                <option value="difficulty">Difficulty</option>
              </select>
            </div>
          </div>
        </div>





        {/* Problems Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredAndSortedQuestions.map((q) => {
            const g = gradients[q.id % gradients.length];
            return (
              <button
                key={q.id}
                onClick={() => setSelected(q)}
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
                    {q.tags.slice(0, 3).map((tag, idx) => (
                      <span key={idx} className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1">
                    {q.companies.slice(0, 2).map((company, idx) => (
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
    </main>
  );
};

export default MainContent;