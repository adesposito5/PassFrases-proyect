export interface PasswordConfig {
  wordCount: 2 | 3 | 4 | 5 | 6;
  separator: '-' | '.' | '_';
  includeNumbers: boolean;
  includeSymbols: boolean;
  capitalize: boolean;
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

export type StrengthLevel = PasswordResult['strength'];
