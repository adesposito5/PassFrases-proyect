export interface PasswordConfig {}

export interface PasswordResult {
  password: string;
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
