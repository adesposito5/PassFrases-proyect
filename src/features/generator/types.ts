export interface PasswordConfig {
  wordCount: 2 | 3 | 4 | 5 | 6 | 7 | 8;
  separator: '-' | '.' | '_';
  includeNumbers: boolean;
  includeSymbols: boolean;
  capitalize: boolean;
  memorable: boolean;
  category: 'mixed' | 'animals' | 'nature' | 'actions' | 'food' | 'places' | 'colors';
  wordLength: 'short' | 'medium' | 'long';
}

export interface PasswordResult {
  password: string;
  bits: number;
  strength: 'weak' | 'medium' | 'strong' | 'very-strong';
  recommendations: string[];
}

export interface SessionEntry {
  id: string;
  password: string;
  bits: number;
  timestamp: number;
}

export interface BatchResult {
  results: PasswordResult[];
  generatedAt: number;
}

export interface ReuseWarning {
  index: number
  password: string
  similarTo: string
  similarity: number
}

export type StrengthLevel = PasswordResult['strength'];
