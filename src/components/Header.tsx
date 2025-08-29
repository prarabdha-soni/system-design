import React, { useState, useEffect } from 'react';
import { Menu, Star, TrendingUp, Target, Award, Eye } from 'lucide-react';
import { questions } from '../data/questions';
import ViewTracker from '../utils/viewTracker';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const [totalViews, setTotalViews] = useState(0);

  useEffect(() => {
    // Get real total views from ViewTracker
    const realTotalViews = ViewTracker.getTotalViews();
    setTotalViews(realTotalViews);

    // Set up interval to refresh view count (every 5 seconds)
    const interval = setInterval(() => {
      const updatedViews = ViewTracker.getTotalViews();
      setTotalViews(updatedViews);
    }, 5000);

    return () => clearInterval(interval);
  }, []);
  
  return (
    <>
      <header className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
            >
              <Menu className="h-5 w-5" />
            </button>
            
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-bold">J</span>
              </div>
              <h1 className="text-lg sm:text-xl font-bold text-gray-900">JobX.world</h1>
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center mx-2 sm:mx-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-white border-2 border-gray-300 text-gray-800 px-4 py-2 rounded-lg shadow-sm">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                <span className="font-medium text-sm sm:text-base tracking-wide">TRENDING INTERVIEW QUESTIONS</span>
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
              </div>
              <div className="flex items-center space-x-2 bg-white border border-gray-300 text-gray-700 px-3 py-2 rounded-lg">
                <Eye className="h-4 w-4 text-gray-600" />
                <span className="font-medium text-sm">{totalViews.toLocaleString()} Views</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-600">
              <Star className="h-4 w-4 text-yellow-500" />
              <span>4.9/5</span>
            </div>
            <div className="hidden lg:flex items-center space-x-2 text-sm text-gray-600">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <span>10K+ Users</span>
            </div>
          </div>
        </div>
      </header>


    </>
  );
};

export default Header;