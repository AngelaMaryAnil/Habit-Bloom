import React, { useState, useEffect } from 'react';
import { Quote } from '../types';
import { getQuoteOfTheDay } from '../data/quotes';

const QuoteDisplay: React.FC = () => {
  const [quote, setQuote] = useState<Quote | null>(null);
  
  useEffect(() => {
    setQuote(getQuoteOfTheDay());
  }, []);
  
  if (!quote) return null;
  
  return (
    <div className="mb-8 p-4 bg-indigo-50 dark:bg-gray-800 rounded-lg shadow-sm border border-indigo-100 dark:border-gray-700 transition-colors duration-200">
      <p className="text-gray-700 dark:text-gray-300 italic mb-2 text-center">
        "{quote.text}"
      </p>
      <p className="text-right text-sm text-gray-600 dark:text-gray-400 font-medium">
        — {quote.author}
      </p>
    </div>
  );
};

export default QuoteDisplay;