
export interface Principle {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

export interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
}

export interface CardProps {
  label: string;
  value: string;
  subValue?: string;
}

