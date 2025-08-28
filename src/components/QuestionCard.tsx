import React from 'react';
import { FileText, Eye, Code } from 'lucide-react';

interface Question {
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
}

interface QuestionCardProps {
  question: Question;
  onQuestionClick: (question: Question) => void;
}

const difficultyColors = {
  Easy: 'bg-green-100 text-green-800',
  Medium: 'bg-yellow-100 text-yellow-800',
  Hard: 'bg-red-100 text-red-800',
  Expert: 'bg-purple-100 text-purple-800',
};

const QuestionCard: React.FC<QuestionCardProps> = ({ question, onQuestionClick }) => {
  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 mb-2">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <FileText className="h-4 w-4 text-blue-600" />
              <h3 
                className="text-base sm:text-lg font-semibold text-gray-900 hover:text-blue-600 cursor-pointer transition-colors"
                onClick={() => onQuestionClick(question)}
              >
                {question.title}
              </h3>
            </div>
            <span className={`px-2 py-1 rounded-full text-xs font-medium w-fit ${difficultyColors[question.difficulty]}`}>
              {question.difficulty}
            </span>
          </div>
          
          <p className="text-gray-600 mb-4 line-clamp-2 text-sm sm:text-base">
            {question.description}
          </p>
          
          <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <span>by</span>
              <span className="text-blue-600 hover:text-blue-700 cursor-pointer">
                {question.author}
              </span>
            </div>
            <span className="hidden sm:inline">{question.timeAgo}</span>
            <div className="flex items-center space-x-1">
              <Eye className="h-4 w-4" />
              <span>{formatNumber(question.views)} views</span>
            </div>
            <div className="flex items-center space-x-1">
              <Code className="h-4 w-4" />
              <span>{question.solutions} LLDs</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;