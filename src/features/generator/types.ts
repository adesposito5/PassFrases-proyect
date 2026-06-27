export interface PasswordConfig {
	wordCount: number;
	separator: string;
	includeNumbers: boolean;
	includeSymbols: boolean;
	capitalize: boolean;
}

export type RecommendationSeverity = 'low' | 'medium' | 'high';
export type RecommendationIcon = 'shield' | 'warning' | 'info' | 'sparkles';
export type RecommendationApplicability =
	| 'length'
	| 'uppercase'
	| 'symbols'
	| 'wordCount'
	| 'repeatedWords'
	| 'repeatCharacters'
	| 'numberSuffix';

export interface PasswordRecommendation {
	id: string;
	title: string;
	detail: string;
	severity: RecommendationSeverity;
	icon: RecommendationIcon;
	applicable: RecommendationApplicability;
}

export interface PasswordAnalysis {
	password: string;
	recommendations: PasswordRecommendation[];
	entropy: number | null;
}

export interface PasswordResult {
	password: string;
	words: string[];
	phrase: string;
	analysis?: PasswordAnalysis;
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
	index: number;
	password: string;
	similarTo: string;
	similarity: number;
}
