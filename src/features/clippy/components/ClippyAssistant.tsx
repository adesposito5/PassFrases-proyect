import { usePasswordStore } from "@/features/generator/store";
import { useFavorites } from "@/features/favorites/hooks/useFavorites";
import { FavoritesPanel } from "@/features/favorites/components/FavoritesPanel";
import { useState, useMemo } from "react";

const TIPS: Record<
	number,
	{ icon: string; title: string; text: string }[]
> = {
	1: [
		{
			icon: "💡",
			title: "¿Qué es un passphrase?",
			text: "Una frase de varias palabras al azar. Fácil de recordar, difícil de adivinar.",
		},
		{
			icon: "🔐",
			title: "Más palabras = más seguro",
			text: "Cada palabra adicional multiplica la entropía. Recomendamos 4 o más.",
		},
	],
	2: [
		{
			icon: "📏",
			title: "Longitud ideal",
			text: "4+ palabras generan suficiente entropía para uso cotidiano (~44+ bits).",
		},
		{
			icon: "🔢",
			title: "Números + símbolos",
			text: "Activar ambas opciones suma ~13 bits extra a tu contraseña.",
		},
	],
	3: [
		{
			icon: "✅",
			title: "Verificá la entropía",
			text: "Buscá al menos 60 bits para cuentas importantes, 80+ para máxima seguridad.",
		},
		{
			icon: "📋",
			title: "Copiá y guardá",
			text: "Usá el botón de copiar y almacená tu frase de forma segura.",
		},
	],
};

function pickTip(
	step: number,
): { icon: string; title: string; text: string } {
	const tips = TIPS[step] ?? TIPS[1];
	const array = new Uint32Array(1);
	crypto.getRandomValues(array);
	return tips[array[0] % tips.length];
}

export function ClippyAssistant() {
	const currentStep = usePasswordStore((state) => state.currentStep);
	const currentResult = usePasswordStore((state) => state.currentResult);
	const historyOpen = usePasswordStore((state) => state.historyOpen);
	const [dismissed, setDismissed] = useState(false);
	const [showAllFavorites, setShowAllFavorites] = useState(false);

	const {
		favorites,
		addFavorite,
		removeFavorite,
	} = useFavorites();

	const tip = useMemo(() => pickTip(currentStep), [currentStep]);

	if (dismissed) return null;

	const shouldSuggestSave =
		currentStep === 3 &&
		currentResult &&
		currentResult.bits >= 80;

	return (
		<div
			role="status"
			style={{
				display: "flex",
				flexDirection: "column",
				gap: "0.75rem",
				padding: "0.85rem 1rem",
				borderRadius: "14px",
				background:
					"linear-gradient(135deg, rgba(99,102,241,0.08), rgba(168,85,247,0.08))",
				border: "1px solid rgba(99,102,241,0.15)",
				fontSize: "0.85rem",
			}}
		>
			<div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
				<span
					aria-hidden="true"
					style={{ fontSize: "1.2rem", flexShrink: 0, marginTop: "1px" }}
				>
					{tip.icon}
				</span>
				<div style={{ flex: 1, minWidth: 0 }}>
					<p
						style={{
							margin: 0,
							fontWeight: 600,
							color: "var(--color-text)",
							fontSize: "0.85rem",
						}}
					>
						{tip.title}
					</p>
					<p
						style={{
							margin: "0.25rem 0 0",
							color: "var(--color-text-tertiary)",
							fontSize: "0.8rem",
							lineHeight: 1.4,
						}}
					>
						{tip.text}
					</p>
				</div>
				<button
					type="button"
					onClick={() => setDismissed(true)}
					aria-label="Descartar consejo"
					style={{
						all: "unset",
						cursor: "pointer",
						flexShrink: 0,
						color: "var(--color-text-tertiary)",
						fontSize: "1rem",
						lineHeight: 1,
						padding: "2px",
						marginTop: "-2px",
					}}
				>
					✕
				</button>
			</div>

			{shouldSuggestSave && (
				<div
					style={{
						display: "flex",
						alignItems: "center",
						gap: "0.5rem",
						padding: "0.5rem 0.75rem",
						borderRadius: "10px",
						background: "rgba(34,197,94,0.08)",
						border: "1px solid rgba(34,197,94,0.15)",
					}}
				>
					<span style={{ fontSize: "1rem" }}>⭐</span>
					<span
						style={{
							flex: 1,
							fontSize: "0.8rem",
							color: "var(--color-text)",
						}}
					>
						¡Contraseña muy fuerte! Guardala como favorita.
					</span>
					<button
						type="button"
						onClick={async () => {
							if (!currentResult) return;
							try {
								await addFavorite(
									currentResult.password,
									currentResult.password,
									{
										bits: currentResult.bits,
										strength: currentResult.strength,
										wordCount: currentResult.words.length,
										label: currentResult.password.length > 30
											? currentResult.password.slice(0, 27) + "..."
											: currentResult.password,
										createdAt: Date.now(),
										updatedAt: Date.now(),
									},
								);
							} catch {
								// silent
							}
						}}
						style={{
							all: "unset",
							cursor: "pointer",
							fontSize: "0.75rem",
							fontWeight: 600,
							color: "var(--color-success)",
							padding: "0.25rem 0.75rem",
							borderRadius: "6px",
							border: "1px solid var(--color-success)",
							transition:
								"background var(--duration-fast) var(--ease-out), color var(--duration-fast) var(--ease-out)",
						}}
						onMouseEnter={(e) => {
							e.currentTarget.style.background = "rgba(34,197,94,0.15)";
						}}
						onMouseLeave={(e) => {
							e.currentTarget.style.background = "transparent";
						}}
					>
						⭐ Guardar
					</button>
				</div>
			)}

			{favorites.length > 0 && !historyOpen && (
				<>
					<FavoritesPanel
						favorites={favorites}
						onRemove={removeFavorite}
						compact
					/>
					{favorites.length > 3 && !showAllFavorites && (
						<button
							type="button"
							onClick={() => setShowAllFavorites(true)}
							style={{
								all: "unset",
								cursor: "pointer",
								fontSize: "0.75rem",
								color: "var(--color-accent)",
								textAlign: "center",
								padding: "0.25rem",
								borderRadius: "6px",
								transition:
									"background var(--duration-fast) var(--ease-out)",
							}}
							onMouseEnter={(e) => {
								e.currentTarget.style.background =
									"rgba(99,102,241,0.08)";
							}}
							onMouseLeave={(e) => {
								e.currentTarget.style.background = "transparent";
							}}
						>
							👁️ Ver todos ({favorites.length})
						</button>
					)}
				</>
			)}
		</div>
	);
}
