import type { PasswordAnalysis } from "@/features/generator/types";
import { STRENGTH_CONFIG } from "@/features/generator/types";
import { usePasswordStore } from "@/features/generator/store";

interface RecommendationsPanelProps {
	analysis: PasswordAnalysis;
}

export function RecommendationsPanel({ analysis }: RecommendationsPanelProps) {
	const bits = usePasswordStore((state) => state.currentResult?.bits ?? 0);
	const strength = usePasswordStore((state) => state.currentResult?.strength ?? "medium");
	const strengthInfo = STRENGTH_CONFIG[strength];

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				gap: "1rem",
				padding: "1rem",
				border: "1px solid var(--color-border)",
				borderRadius: "16px",
				background: "rgba(255,255,255,0.04)",
				color: "var(--color-text)",
				textAlign: "left",
			}}
		>
			<div style={{ display: "flex", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap", alignItems: "flex-start" }}>
				<div>
					<p style={{ margin: 0, fontSize: "0.95rem", fontWeight: 700 }}>Análisis de seguridad</p>
					<p style={{ margin: "0.35rem 0 0", fontSize: "0.85rem", color: "var(--color-text-tertiary)" }}>
						{bits} bits de entropía — Nivel <span style={{ color: strengthInfo.color, fontWeight: 700 }}>{strengthInfo.label}</span>
					</p>
				</div>
				<span style={{ padding: "0.45rem 0.75rem", borderRadius: "999px", background: "rgba(34,197,94,0.12)", color: "var(--color-success)", fontSize: "0.8rem", fontWeight: 700, whiteSpace: "nowrap" }}>
					{analysis.recommendations.length} recomendación{analysis.recommendations.length === 1 ? "" : "es"}
				</span>
			</div>

			{analysis.recommendations.length > 0 ? (
				<div style={{ display: "grid", gap: "0.75rem" }}>
					{analysis.recommendations.map((recommendation) => (
						<div
							key={recommendation.id}
							style={{
								padding: "1rem",
								borderRadius: "12px",
								border: "1px solid var(--color-border)",
								background: recommendation.severity === "high"
									? "rgba(239,68,68,0.08)"
									: recommendation.severity === "medium"
										? "rgba(245,158,11,0.08)"
										: "rgba(34,197,94,0.08)",
							}}
						>
							<p style={{ margin: 0, display: "flex", alignItems: "center", gap: "0.5rem", fontWeight: 700, color: "var(--color-text)" }}>
								<span>{recommendation.icon === 'shield' ? '🛡️' : recommendation.icon === 'warning' ? '⚠️' : recommendation.icon === 'info' ? 'ℹ️' : '✨'}</span>
								{recommendation.title}
							</p>
							<p style={{ margin: "0.35rem 0 0", fontSize: "0.9rem", color: "var(--color-text-tertiary)" }}>{recommendation.detail}</p>
						</div>
					))}
				</div>
			) : (
				<div style={{ padding: "1rem", borderRadius: "12px", background: "rgba(34,197,94,0.08)", color: "var(--color-success)", fontWeight: 600 }}>
					¡Excelente! No hay recomendaciones adicionales para esta contraseña.
				</div>
			)}
		</div>
	);
}
