import React from 'react';
import { Trophy, Target, Clock, CheckCircle } from 'lucide-react';

interface ProgressCardProps {
  completed: number;
  total: number;
  streak: number;
  timeSpent: number;
}

const ProgressCard: React.FC<ProgressCardProps> = ({ completed, total, streak, timeSpent }) => {
  const progress = (completed / total) * 100;
  
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Your Progress</h3>
        <div className="flex items-center space-x-1 text-yellow-600">
          <Trophy className="h-5 w-5" />
          <span className="text-sm font-medium">Level {Math.floor(completed / 3) + 1}</span>
        </div>
      </div>
      
      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Problems Completed</span>
            <span className="text-sm text-gray-600">{completed}/{total}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
            <p className="text-xs text-gray-600">Completed</p>
            <p className="text-lg font-bold text-gray-900">{completed}</p>
          </div>
          
          <div className="text-center">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Target className="h-5 w-5 text-orange-600" />
            </div>
            <p className="text-xs text-gray-600">Streak</p>
            <p className="text-lg font-bold text-gray-900">{streak} days</p>
          </div>
          
          <div className="text-center">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Clock className="h-5 w-5 text-blue-600" />
            </div>
            <p className="text-xs text-gray-600">Time Spent</p>
            <p className="text-lg font-bold text-gray-900">{timeSpent}h</p>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">🎯</span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Next Milestone</p>
              <p className="text-xs text-gray-600">
                {completed < 3 ? 'Complete 3 problems to unlock Expert level' :
                 completed < 6 ? 'Complete 6 problems to unlock Staff level' :
                 'Complete all problems to become a System Design Master!'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressCard; 