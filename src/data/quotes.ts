import { Quote } from '../types';

export const quotes: Quote[] = [
  {
    text: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.",
    author: "Aristotle"
  },
  {
    text: "Habits are first cobwebs, then cables.",
    author: "Spanish Proverb"
  },
  {
    text: "The secret of getting ahead is getting started.",
    author: "Mark Twain"
  },
  {
    text: "Small habits make big changes.",
    author: "James Clear"
  },
  {
    text: "The journey of a thousand miles begins with one step.",
    author: "Lao Tzu"
  },
  {
    text: "Your habits create your destiny.",
    author: "Unknown"
  },
  {
    text: "Good habits formed at youth make all the difference.",
    author: "Aristotle"
  },
  {
    text: "Change might not be fast and it isn't always easy. But with time and effort, almost any habit can be reshaped.",
    author: "Charles Duhigg"
  },
  {
    text: "Excellence is not a singular act but a habit. You are what you do repeatedly.",
    author: "Shaquille O'Neal"
  },
  {
    text: "Motivation is what gets you started. Habit is what keeps you going.",
    author: "Jim Ryun"
  },
  {
    text: "The chains of habit are too weak to be felt until they are too strong to be broken.",
    author: "Samuel Johnson"
  },
  {
    text: "Successful people are simply those with successful habits.",
    author: "Brian Tracy"
  }
];

/**
 * Get a random quote from the list
 */
export const getRandomQuote = (): Quote => {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
};

/**
 * Get a quote for today (consistent through the day)
 */
export const getQuoteOfTheDay = (): Quote => {
  const today = new Date();
  const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
  const index = dayOfYear % quotes.length;
  return quotes[index];
};