import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import MainContent from './components/MainContent';
import QuestionDetail from './components/QuestionDetail';
import { questions } from './data/questions';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header onMenuClick={() => {}} />
        
        <Routes>
          <Route path="/" element={<MainContent />} />
          {questions.map((question) => (
            <Route
              key={question.id}
              path={`/${question.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')}`}
              element={<QuestionDetail question={question} />}
            />
          ))}
        </Routes>
      </div>
    </Router>
  );
}

export default App;