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
			className="flex flex-col gap-3 rounded-[14px] border border-indigo-500/15 bg-[linear-gradient(135deg,rgba(99,102,241,0.08),rgba(168,85,247,0.08))] px-4 py-[0.85rem] text-[0.85rem]"
		>
			<div className="flex items-start gap-3">
				<span aria-hidden="true" className="mt-px shrink-0 text-[1.2rem]">
					{tip.icon}
				</span>
				<div className="min-w-0 flex-1">
					<p className="text-[0.85rem] font-semibold text-text">
						{tip.title}
					</p>
					<p className="mt-1 text-[0.8rem] leading-[1.4] text-text-tertiary">
						{tip.text}
					</p>
				</div>
				<button
					type="button"
					onClick={() => setDismissed(true)}
					aria-label="Descartar consejo"
					className="-mt-0.5 shrink-0 cursor-pointer p-0.5 text-base leading-none text-text-tertiary"
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