export interface PasswordConfig {}

export interface PasswordRecommendation {
  id: string
  title: string
  detail: string
  severity: 'low' | 'medium' | 'high'
}

export interface PasswordAnalysis {
  password: string
  recommendations: PasswordRecommendation[]
  entropy: number | null
}

export interface PasswordResult {
  password: string;
  analysis?: PasswordAnalysis
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
