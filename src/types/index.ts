export interface Habit {
  id: string;
  title: string;
  description?: string;
  completionData: {
    [date: string]: boolean;
  };
  streak: number;
  category?: string;
}

export interface Quote {
  text: string;
  author: string;
}