export interface PasswordConfig {
  wordCount: number;
  separator: string;
  includeNumbers: boolean;
  includeSymbols: boolean;
  capitalize: boolean;
}
export interface PasswordResult {
  password: string;
  words: string[];
  phrase: string;
}

export interface SessionEntry {
  id: string;
  password: string;
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
