import { createPortal } from "react-dom";
import type { PasswordAnalysis } from "@/features/generator/types";
import { usePasswordStore } from "@/features/generator/store";

interface RecommendationsPanelProps {
	analysis: PasswordAnalysis;
}

function iconDisplay(icon: string): string {
	switch (icon) {
		case 'shield': return '🛡️';
		case 'warning': return '⚠️';
		case 'info': return 'ℹ️';
		default: return '✨';
	}
}

export function RecommendationsPanel({ analysis }: RecommendationsPanelProps) {
	const historyOpen = usePasswordStore((state) => state.historyOpen);
	const toggleHistory = usePasswordStore((state) => state.toggleHistory);
	const hasRecs = analysis.recommendations.length > 0;

	if (!hasRecs || historyOpen) return null;

	return createPortal(
		<>
			{analysis.recommendations.map((rec, i) => (
				<button
					key={rec.id}
					type="button"
					onClick={toggleHistory}
					aria-label={`Abrir recomendación: ${rec.title}`}
					style={{
						all: "unset",
						cursor: "pointer",
						position: "fixed",
						bottom: `calc(1.5rem + 60px + ${i * 44}px)`,
						right: "1.5rem",
						display: "flex",
						alignItems: "center",
						gap: "0.4rem",
						padding: "0.45rem 0.85rem",
						borderRadius: "99px",
						background: "var(--gradient-cta)",
						color: "#fff",
						fontSize: "0.8rem",
						fontWeight: 600,
						fontFamily: "var(--font-sans)",
						boxShadow: "0 4px 24px var(--color-pink-glow)",
						zIndex: 998,
						whiteSpace: "nowrap",
						transition:
							"transform var(--duration-fast) var(--ease-out), box-shadow var(--duration-fast) var(--ease-out)",
					}}
					onMouseEnter={(e) => {
						e.currentTarget.style.transform = "scale(1.05)";
						e.currentTarget.style.boxShadow =
							"0 6px 32px var(--color-pink-glow)";
					}}
					onMouseLeave={(e) => {
						e.currentTarget.style.transform = "";
						e.currentTarget.style.boxShadow = "";
					}}
				>
					<span style={{ fontSize: "1rem", lineHeight: 1 }}>
						{iconDisplay(rec.icon)}
					</span>
					<span>{rec.title}</span>
				</button>
			))}
		</>,
		document.body,
	);
}
