// src/features/generator/components/PhraseDisplay.tsx
// Componente visual que muestra la contraseña generada.
// Recibe password como prop — reutilizable por D3, D4 y quien lo necesite.

interface PhraseDisplayProps {
	password: string | null;
}

export function PhraseDisplay({ password }: PhraseDisplayProps) {
	return (
		<div
			style={{
				fontFamily: "var(--font-mono)",
				fontSize: "1.4rem",
				fontWeight: 700,
				letterSpacing: "-0.01em",
				padding: "1.25rem 1.5rem",
				background: "rgba(0,0,0,0.3)",
				border: "1px solid var(--color-border)",
				borderRadius: "14px",
				wordBreak: "break-all",
				lineHeight: 1.5,
				userSelect: "all",
				textAlign: "center",
				color: "var(--color-text)",
				minHeight: "4rem",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			{password ?? "Generando…"}
		</div>
	);
}