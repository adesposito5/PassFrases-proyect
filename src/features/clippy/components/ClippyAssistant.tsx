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

	async function handleSave() {
		if (!currentResult) return;
		const now = Date.now();
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
					createdAt: now,
					updatedAt: now,
				},
			);
		} catch {
			// silent
		}
	}

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
				background: "var(--color-accent-soft)",
				border: "1px solid var(--color-border)",
				fontSize: "0.85rem",
				transition: "color, background-color, border-color var(--duration-fast) var(--ease-out)",
			}}
		>
			<div style={{ display: "flex", alignItems: "flex-start", gap: "0.85rem" }}>
				<div
					aria-hidden="true"
					style={{
						width: "44px",
						height: "44px",
						borderRadius: "12px",
						display: "grid",
						placeItems: "center",
						background: "var(--color-accent-soft)",
						flexShrink: 0,
						fontSize: "1.3rem",
					}}
				>
					{tip.icon}
				</div>
				<div>
					<strong
						style={{
							display: "block",
							fontSize: "0.9rem",
							marginBottom: "0.1rem",
						}}
					>
						{tip.title}
					</strong>
					<span
						style={{
							fontSize: "0.8rem",
							color: "var(--color-text-secondary)",
						}}
					>
						{tip.text}
					</span>
				</div>
				<button
					type="button"
					onClick={() => setDismissed(true)}
					aria-label="Descartar consejo"
					style={{
						all: "unset",
						cursor: "pointer",
						flexShrink: 0,
						fontSize: "1rem",
						lineHeight: 1,
						color: "var(--color-text-tertiary)",
						padding: "2px",
						marginTop: "-2px",
					}}
				>
					✕
				</button>
			</div>

			{shouldSuggestSave && (
				<div className="flex items-center gap-2 rounded-[10px] border border-success/[0.15] bg-success/[0.08] px-3 py-2">
					<span className="text-base">⭐</span>
					<span className="flex-1 text-[0.8rem] text-text">
						¡Contraseña muy fuerte! Guardala como favorita.
					</span>
					<button
						type="button"
						onClick={handleSave}
						className="cursor-pointer rounded-md border border-success px-3 py-1 text-[0.75rem] font-semibold text-success transition-colors duration-150 ease-out hover:bg-success/[0.15]"
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
							className="cursor-pointer rounded-md p-1 text-center text-[0.75rem] text-accent transition-colors duration-150 ease-out hover:bg-accent-soft"
						>
							👁️ Ver todos ({favorites.length})
						</button>
					)}
				</>
			)}
		</div>
	);
}