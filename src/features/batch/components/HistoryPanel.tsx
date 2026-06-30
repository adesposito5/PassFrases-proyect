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
			<style>{`
.history-scroll::-webkit-scrollbar { width: 6px; }
.history-scroll::-webkit-scrollbar-track { background: transparent; }
.history-scroll::-webkit-scrollbar-thumb { background: var(--color-accent-soft); border-radius: 99px; }
.history-scroll::-webkit-scrollbar-thumb:hover { background: var(--color-border); }
.history-scroll { scrollbar-width: thin; scrollbar-color: var(--color-accent-soft) transparent; }
`}</style>
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
					style={{
						position: "fixed",
						bottom: "5.5rem",
						right: "1.5rem",
						zIndex: 1000,
						display: "flex",
						flexDirection: "column",
						maxHeight: "460px",
						width: "340px",
						overflow: "hidden",
						borderRadius: "var(--radius-lg)",
						border: "1px solid var(--color-border)",
						background: "var(--glass-bg)",
						backdropFilter: "blur(24px)",
						WebkitBackdropFilter: "blur(24px)",
						boxShadow: "var(--glass-shadow)",
						animation: "fadeIn var(--duration-normal) var(--ease-out)",
					}}
					role="dialog"
					aria-label={
						view === "favorites" ? "Favoritos" : "Historial de sesión"
					}
				>
					<div
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
							padding: "1rem 1.25rem",
							borderBottom: "1px solid var(--color-border)",
						}}
					>
						<h3
							style={{
								display: "flex",
								alignItems: "center",
								gap: "0.5rem",
								fontSize: "0.85rem",
								fontWeight: 700,
								color: "var(--color-text)",
							}}
						>
							{view === "favorites"
								? "⭐ Favoritos"
								: "🤖 Historial de sesión"}
							<span
								style={{
									fontSize: "0.7rem",
									fontWeight: 500,
									color: "var(--color-text-tertiary)",
								}}
							>
								({view === "favorites" ? favorites.length : sessionHistory.length})
							</span>
						</h3>
						<div style={{ display: "flex", gap: "0.375rem" }}>
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
								style={{
									all: "unset",
									cursor: "pointer",
									padding: "0.25rem 0.5rem",
									borderRadius: "var(--radius-sm)",
									border: "1px solid var(--color-border)",
									fontSize: "0.75rem",
									color: "var(--color-accent)",
									transition: "background var(--duration-fast) var(--ease-out)",
								}}
								onMouseEnter={(e) => {
									e.currentTarget.style.background = "var(--color-accent-soft)";
								}}
								onMouseLeave={(e) => {
									e.currentTarget.style.background = "transparent";
								}}
							>
								{view === "favorites" ? "🤖 Historial" : "⭐ Favoritos"}
							</button>
							{view === "history" && sessionHistory.length > 0 && (
								<button
									type="button"
									onClick={clearHistory}
									aria-label="Limpiar historial"
									style={{
										all: "unset",
										cursor: "pointer",
										padding: "0.25rem 0.5rem",
										borderRadius: "var(--radius-sm)",
										border: "1px solid var(--color-border)",
										fontSize: "0.75rem",
										color: "var(--color-text-tertiary)",
										transition: "all var(--duration-fast) var(--ease-out)",
									}}
									onMouseEnter={(e) => {
										e.currentTarget.style.borderColor = "var(--color-error)";
										e.currentTarget.style.color = "var(--color-error)";
									}}
									onMouseLeave={(e) => {
										e.currentTarget.style.borderColor = "var(--color-border)";
										e.currentTarget.style.color = "var(--color-text-tertiary)";
									}}
								>
									🗑 Limpiar
								</button>
							)}
							<button
								type="button"
								onClick={toggleHistory}
								aria-label="Cerrar"
								style={{
									all: "unset",
									cursor: "pointer",
									padding: "0.25rem 0.5rem",
									borderRadius: "var(--radius-sm)",
									fontSize: "1.1rem",
									color: "var(--color-text-tertiary)",
									transition: "all var(--duration-fast) var(--ease-out)",
								}}
								onMouseEnter={(e) => {
									e.currentTarget.style.background = "var(--color-accent-soft)";
									e.currentTarget.style.color = "var(--color-text)";
								}}
								onMouseLeave={(e) => {
									e.currentTarget.style.background = "transparent";
									e.currentTarget.style.color = "var(--color-text-tertiary)";
								}}
							>
								✕
							</button>
						</div>
					</div>

					<div
						className="history-scroll"
						style={{
							flex: 1,
							overflowY: "auto",
							padding: "0.75rem 1.25rem",
						}}
					>
						{view === "favorites" ? (
							favorites.length === 0 ? (
								<div
									style={{
										padding: "2rem 1rem",
										borderRadius: "14px",
										background: "var(--color-accent-soft)",
										border: "1px solid var(--color-border)",
										textAlign: "center",
										fontSize: "0.8rem",
										color: "var(--color-text-tertiary)",
									}}
								>
									<div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>⭐</div>
									<p>No tenés favoritos guardados</p>
								</div>
							) : (
								<FavoritesPanel
									favorites={favorites}
									onRemove={removeFavorite}
								/>
							)
						) : sessionHistory.length === 0 ? (
							<div
								style={{
									padding: "2rem 1rem",
									borderRadius: "14px",
									background: "var(--color-accent-soft)",
									border: "1px solid var(--color-border)",
									textAlign: "center",
									fontSize: "0.8rem",
									color: "var(--color-text-tertiary)",
								}}
							>
								<div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>📭</div>
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
										style={{
											display: "flex",
											alignItems: "center",
											gap: "0.5rem",
											padding: "0.75rem 1rem",
											borderRadius: "12px",
											background: "var(--color-accent-soft)",
											border: "1px solid var(--color-border)",
											marginBottom: "0.5rem",
											transition: "all var(--duration-fast) var(--ease-out)",
										}}
									>
										<span
											style={{
												minWidth: "1.2rem",
												fontFamily: "var(--font-mono)",
												fontSize: "0.65rem",
												fontWeight: 700,
												color: "var(--color-text-tertiary)",
											}}
										>
											#{sessionHistory.length - i}
										</span>

										<span
											style={{
												flex: 1,
												wordBreak: "break-all",
												fontFamily: "var(--font-mono)",
												fontSize: "0.75rem",
												color: "var(--color-text)",
											}}
										>
											{entry.password}
										</span>

										<span
											style={{
												minWidth: "3.5rem",
												whiteSpace: "nowrap",
												textAlign: "right",
												fontSize: "0.6rem",
												color: "var(--color-text-tertiary)",
											}}
										>
											{timeAgo(entry.timestamp)}
										</span>

										<button
											type="button"
											onClick={() =>
												handleCopy(entry.password, entry.id)
											}
											aria-label={`Copiar frase ${sessionHistory.length - i}`}
											style={{
												all: "unset",
												cursor: "pointer",
												flexShrink: 0,
												fontSize: "0.85rem",
												color:
													copiedIndex === entry.id
														? "var(--color-success)"
														: "var(--color-text-tertiary)",
												transition: "color var(--duration-fast) var(--ease-out)",
											}}
										>
											{copiedIndex === entry.id ? "✅" : "📋"}
										</button>

										<button
											type="button"
											onClick={() => removeFromHistory(entry.id)}
											aria-label="Eliminar del historial"
											style={{
												all: "unset",
												cursor: "pointer",
												flexShrink: 0,
												fontSize: "0.75rem",
												color: "var(--color-text-tertiary)",
												transition: "color var(--duration-fast) var(--ease-out)",
											}}
											onMouseEnter={(e) => {
												e.currentTarget.style.color = "var(--color-error)";
											}}
											onMouseLeave={(e) => {
												e.currentTarget.style.color = "var(--color-text-tertiary)";
											}}
										>
											🗑️
										</button>
									</div>
								))}
							</div>
						)}
					</div>

					<div
						style={{
							padding: "0.625rem 1.25rem",
							borderTop: "1px solid var(--color-border)",
							textAlign: "center",
							fontSize: "0.65rem",
							color: "var(--color-text-tertiary)",
						}}
					>
						{view === "history"
							? "El historial vive solo en memoria · No se persiste"
							: "Favoritos guardados de forma cifrada · Solo vos podés verlos"}
					</div>
				</div>
			)}
		</>
	);
}
