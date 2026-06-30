import { useState } from "react";
import { usePasswordStore } from "@/features/generator/store";
import { useFavorites } from "@/features/favorites/hooks/useFavorites";
import { FavoritesPanel } from "@/features/favorites/components/FavoritesPanel";
import { encryptPassword } from "@/services/crypto.service";
import { STRENGTH_CONFIG } from "@/features/generator/types";

function timeAgo(date: number): string {
	const sec = Math.floor((Date.now() - date) / 1000);
	if (sec < 5) return "recién";
	if (sec < 60) return `hace ${sec} seg`;
	const min = Math.floor(sec / 60);
	if (min === 1) return "hace 1 min";
	if (min < 60) return `hace ${min} min`;
	const hrs = Math.floor(min / 60);
	return `hace ${hrs} ${hrs === 1 ? "hora" : "horas"}`;
}

export default function HistoryPanel() {
	const sessionHistory = usePasswordStore((state) => state.sessionHistory);
	const clearHistory = usePasswordStore((state) => state.clearHistory);
	const removeFromHistory = usePasswordStore((state) => state.removeFromHistory);
	const historyOpen = usePasswordStore((state) => state.historyOpen);
	const toggleHistory = usePasswordStore((state) => state.toggleHistory);
	const currentResult = usePasswordStore((state) => state.currentResult);
	const [copiedIndex, setCopiedIndex] = useState<string | null>(null);
	const [view, setView] = useState<"history" | "favorites">("history");

	const { favorites, removeFavorite } = useFavorites();

	async function handleCopy(password: string, id: string) {
		try {
			const encrypted = await encryptPassword(password, password)
			await navigator.clipboard.writeText(encrypted.ciphertext)
			setCopiedIndex(id);
			setTimeout(() => setCopiedIndex(null), 2000);
		} catch {
			setCopiedIndex(null);
		}
	}

	return (
		<>
			<button
				type="button"
				onClick={toggleHistory}
				aria-label="Abrir historial de sesión"
				aria-expanded={historyOpen}
				className="fixed bottom-6 right-6 z-[999] grid h-13 w-13 cursor-pointer place-items-center rounded-full border-none bg-[var(--gradient-cta)] text-lg text-white shadow-[0_4px_24px_var(--color-pink-glow)] transition-[transform,box-shadow] duration-[var(--duration-fast)] ease-(--ease-out) hover:scale-110 hover:shadow-[0_6px_32px_var(--color-pink-glow)]"
			>
				{view === "favorites" ? "⭐" : "🤖"}
				{sessionHistory.length > 0 && view === "history" && (
					<span className="absolute -top-1 -right-1 grid h-5 w-5 place-items-center rounded-full border-2 border-(--color-surface) bg-(--color-pink) font-mono text-[0.65rem] font-bold text-white">
						{sessionHistory.length}
					</span>
				)}
				{favorites.length > 0 && view === "favorites" && (
					<span className="absolute -top-1 -right-1 grid h-5 w-5 place-items-center rounded-full border-2 border-(--color-surface) bg-(--color-pink) font-mono text-[0.65rem] font-bold text-white">
						{favorites.length}
					</span>
				)}
			</button>

			{historyOpen && (
				<div
					className="fixed bottom-22 right-6 z-[1000] flex max-h-[460px] w-[340px] flex-col overflow-hidden rounded-(--radius-lg) border border-(--color-border) bg-[rgba(8,12,28,0.95)] shadow-[0_16px_48px_rgba(0,0,0,0.6)] backdrop-blur-md [animation:fadeIn_var(--duration-normal)_var(--ease-out)]"
					role="dialog"
					aria-label={
						view === "favorites" ? "Favoritos" : "Historial de sesión"
					}
				>
					<div className="flex items-center justify-between border-b border-(--color-border) px-5 py-4">
						<h3 className="flex items-center gap-2 text-[0.85rem] font-bold text-(--color-text)">
							{view === "favorites"
								? "⭐ Favoritos"
								: "🤖 Historial de sesión"}
							<span className="text-[0.7rem] font-medium text-(--color-text-tertiary)">
								({view === "favorites" ? favorites.length : sessionHistory.length})
							</span>
						</h3>
						<div className="flex gap-1.5">
							<button
								type="button"
								onClick={() =>
									setView(view === "favorites" ? "history" : "favorites")
								}
								aria-label={
									view === "favorites"
										? "Ver historial"
										: "Ver favoritos"
								}
								className="cursor-pointer rounded-(--radius-sm) border border-(--color-border) bg-transparent px-2 py-1 text-xs text-(--color-accent)"
							>
								{view === "favorites" ? "🤖 Historial" : "⭐ Favoritos"}
							</button>
							{view === "history" && sessionHistory.length > 0 && (
								<button
									type="button"
									onClick={clearHistory}
									aria-label="Limpiar historial"
									className="cursor-pointer rounded-(--radius-sm) border border-(--color-border) bg-transparent px-2 py-1 text-xs text-(--color-text-tertiary) transition-colors duration-[var(--duration-fast)] ease-(--ease-out) hover:border-(--color-error) hover:text-(--color-error)"
								>
									🗑 Limpiar
								</button>
							)}
							<button
								type="button"
								onClick={toggleHistory}
								aria-label="Cerrar"
								className="cursor-pointer rounded-(--radius-sm) border-none bg-transparent px-2 py-1 text-[1.1rem] text-(--color-text-tertiary) transition-colors duration-[var(--duration-fast)] ease-(--ease-out) hover:bg-(--color-accent-soft) hover:text-(--color-text)"
							>
								✕
							</button>
						</div>
					</div>

					<div className="flex-1 overflow-y-auto px-5 py-3">
						{view === "favorites" ? (
							favorites.length === 0 ? (
								<div className="py-8 text-center text-[0.8rem] text-(--color-text-tertiary)">
									<div className="mb-2 text-2xl">⭐</div>
									<p>No tenés favoritos guardados</p>
								</div>
							) : (
								<FavoritesPanel
									favorites={favorites}
									onRemove={removeFavorite}
								/>
							)
						) : sessionHistory.length === 0 ? (
							<div className="py-8 text-center text-[0.8rem] text-(--color-text-tertiary)">
								<div className="mb-2 text-2xl">📭</div>
								<p>Todavía no generaste ninguna frase</p>
							</div>
						) : (
							<div className="flex flex-col">
								{currentResult?.analysis?.recommendations &&
									currentResult.analysis.recommendations.length > 0 && (
										<div
											style={{
												display: "flex",
												flexDirection: "column",
												gap: "0.75rem",
												marginBottom: "0.75rem",
												padding: "0.85rem 1rem",
												borderRadius: "14px",
												background: "var(--color-accent-soft)",
												border: "1px solid var(--color-border)",
												transition: "all var(--duration-fast) var(--ease-out)",
											}}
										>
											<div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.8rem", fontWeight: 700, color: "var(--color-text)" }}>
												<span style={{ fontSize: "1rem" }}>🛡️</span>
												<span>Recomendaciones</span>
												<span style={{ fontSize: "0.65rem", fontWeight: 500, color: "var(--color-text-tertiary)" }}>
													({currentResult.analysis.recommendations.length})
												</span>
												{currentResult.bits != null && (
													<span style={{ marginLeft: "auto", fontSize: "0.65rem", fontWeight: 500, color: "var(--color-text-tertiary)" }}>
														{currentResult.bits} bits ·{" "}
														<span
															style={{
																fontWeight: 700,
																color:
																	STRENGTH_CONFIG[currentResult.strength ?? "medium"]?.color ?? "var(--color-text)",
															}}
														>
															{STRENGTH_CONFIG[currentResult.strength ?? "medium"]?.label ?? "Media"}
														</span>
													</span>
												)}
											</div>
											<div className="flex flex-col gap-2">
												{currentResult.analysis.recommendations.map((rec) => (
													<div
														key={rec.id}
														style={{
															display: "flex",
															alignItems: "flex-start",
															gap: "0.75rem",
															padding: "0.75rem 1rem",
															borderRadius: "12px",
															background: "var(--color-accent-soft)",
															border: "1px solid var(--color-border)",
															transition: "all var(--duration-fast) var(--ease-out)",
														}}
													>
														<div
															style={{
																width: "36px",
																height: "36px",
																borderRadius: "10px",
																display: "grid",
																placeItems: "center",
																background: "var(--color-accent-soft)",
																flexShrink: 0,
																fontSize: "1rem",
															}}
														>
															{rec.icon === "shield"
																? "🛡️"
																: rec.icon === "warning"
																	? "⚠️"
																	: "ℹ️"}
														</div>
														<div>
															<p
																style={{
																	fontSize: "0.8rem",
																	fontWeight: 700,
																	color: "var(--color-text)",
																	marginBottom: "0.1rem",
																}}
															>
																{rec.title}
															</p>
															{rec.detail && (
																<p
																	style={{
																		fontSize: "0.72rem",
																		color: "var(--color-text-secondary)",
																		lineHeight: 1.4,
																	}}
																>
																	{rec.detail}
																</p>
															)}
														</div>
													</div>
												))}
											</div>
										</div>
									)}
								{sessionHistory.map((entry, i) => (
									<div
										key={entry.id}
										className={`flex items-center gap-2 ${
											i === 0
												? "-mx-2 rounded-(--radius-sm) bg-[rgba(99,102,241,0.04)] px-2 py-2.5"
												: "py-2.5"
										} ${
											i < sessionHistory.length - 1
												? "border-b border-[rgba(99,102,241,0.06)]"
												: ""
										}`}
									>
										<span className="min-w-[1.2rem] font-mono text-[0.65rem] font-bold text-(--color-text-tertiary)">
											#{sessionHistory.length - i}
										</span>

										<span className="flex-1 break-all font-mono text-xs text-(--color-text)">
											{entry.password}
										</span>

										<span className="min-w-[3.5rem] whitespace-nowrap text-right text-[0.6rem] text-(--color-text-tertiary)">
											{timeAgo(entry.timestamp)}
										</span>

										<button
											type="button"
											onClick={() =>
												handleCopy(entry.password, entry.id)
											}
											aria-label={`Copiar frase ${sessionHistory.length - i}`}
											className={`shrink-0 cursor-pointer border-none bg-transparent text-[0.85rem] transition-colors duration-[var(--duration-fast)] ease-(--ease-out) ${
												copiedIndex === entry.id
													? "text-(--color-success)"
													: "text-(--color-text-tertiary)"
											}`}
										>
											{copiedIndex === entry.id ? "✅" : "📋"}
										</button>

										<button
											type="button"
											onClick={() => removeFromHistory(entry.id)}
											aria-label="Eliminar del historial"
											className="shrink-0 cursor-pointer border-none bg-transparent text-xs text-(--color-text-tertiary) transition-colors duration-[var(--duration-fast)] ease-(--ease-out) hover:text-(--color-error)"
										>
											🗑️
										</button>
									</div>
								))}
							</div>
						)}
					</div>

					<div className="border-t border-(--color-border) px-5 py-2.5 text-center text-[0.65rem] text-(--color-text-tertiary)">
						{view === "history"
							? "El historial vive solo en memoria · No se persiste"
							: "Favoritos guardados de forma cifrada · Solo vos podés verlos"}
					</div>
				</div>
			)}
		</>
	);
}
