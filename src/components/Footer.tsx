import React from 'react';
import { Github, Twitter, Linkedin, Mail, Heart, Star } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 sm:gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-bold">J</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold">JobX.world</h3>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              Explore our collection of real-world system design problems with detailed HLD and LLD solutions.
            </p>
            <div className="flex items-center space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Questions</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Design Perplexity</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Design ChatGPT</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Design ElevenLabs</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Solutions</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">High-Level Design</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Low-Level Design</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Implementation</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-6 sm:mt-8 pt-6 sm:pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-gray-400">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-500" />
              <span>for developers</span>
            </div>
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 text-gray-400 text-sm">
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 text-yellow-500" />
                <span>4.9/5 Rating</span>
              </div>
              <span className="hidden sm:inline">•</span>
              <span>10K+ Users</span>
              <span className="hidden sm:inline">•</span>
              <span>© 2024 JobX.world</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 