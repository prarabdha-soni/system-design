import React from 'react';
import { FileText, Globe, Database, Network, Layers, Zap, BarChart3, Star, Clock, CheckSquare } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const categories = [
  { name: 'All Questions', count: 142, icon: FileText, active: true },
  { name: 'Distributed Systems', count: 45, icon: Globe },
  { name: 'Database Design', count: 32, icon: Database },
  { name: 'Network Architecture', count: 28, icon: Network },
  { name: 'Microservices', count: 38, icon: Layers },
  { name: 'Caching Systems', count: 24, icon: Zap },
  { name: 'Load Balancing', count: 19, icon: BarChart3 },
];

const quickAccess = [
  { name: 'Favorites', icon: Star },
  { name: 'Recently Viewed', icon: Clock },
  { name: 'My LLDs', icon: CheckSquare },
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:transform-none
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="h-full overflow-y-auto py-4 sm:py-6">
          <div className="px-3 sm:px-4 mb-4 sm:mb-6">
            <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Categories</h2>
          </div>
          
          <nav className="space-y-1 px-2 sm:px-2">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.name}
                  className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-colors ${
                    category.active
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="h-4 w-4" />
                    <span>{category.name}</span>
                  </div>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                    {category.count}
                  </span>
                </button>
              );
            })}
          </nav>

          <div className="mt-6 sm:mt-8 px-3 sm:px-4">
            <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Quick Access</h2>
          </div>
          
          <nav className="mt-4 space-y-1 px-2 sm:px-2">
            {quickAccess.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.name}
                  className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;