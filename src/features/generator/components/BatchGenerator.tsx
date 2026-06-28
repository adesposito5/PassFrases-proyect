import { useState } from "react";
import { usePasswordStore } from "@/features/generator/store";

export default function BatchGenerator() {
	const batchResults = usePasswordStore((state) => state.batchResults);
	const batchCount = usePasswordStore((state) => state.batchCount);
	const batchWarnings = usePasswordStore((state) => state.batchWarnings);
	const generateBatch = usePasswordStore((state) => state.generateBatch);
	const setBatchCount = usePasswordStore((state) => state.setBatchCount);
	const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
	const [copiedAll, setCopiedAll] = useState(false);

	async function handleCopy(password: string, index: number) {
		try {
			await navigator.clipboard.writeText(password);
			setCopiedIndex(index);
			setTimeout(() => setCopiedIndex(null), 2000);
		} catch {
			setCopiedIndex(null);
		}
	}

	async function handleCopyAll() {
		if (!batchResults) return;
		try {
			await navigator.clipboard.writeText(
				batchResults.results.map((r) => r.password).join("\n"),
			);
			setCopiedAll(true);
			setTimeout(() => setCopiedAll(false), 2000);
		} catch {
			setCopiedAll(false);
		}
	}

	const warnedIndices = new Set(batchWarnings.map((w) => w.index));

	return (
		<div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
			{/* Controls */}
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					gap: "1rem",
				}}
			>
				<div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
					<label
						htmlFor="batchCount"
						style={{
							fontSize: "0.85rem",
							fontWeight: 600,
							color: "var(--color-text)",
						}}
					>
						Cantidad
					</label>
					<div style={{ display: "flex", gap: "0.35rem" }}>
						{[3, 5, 10, 20].map((n) => (
							<button
								type="button"
								key={n}
								onClick={() => setBatchCount(n)}
								style={{
									padding: "0.4rem 0.75rem",
									borderRadius: "var(--radius-sm)",
									border: `1px solid ${batchCount === n ? "var(--color-accent)" : "var(--color-border)"}`,
									background:
										batchCount === n
											? "var(--color-accent-soft)"
											: "transparent",
									color:
										batchCount === n
											? "var(--color-accent)"
											: "var(--color-text-secondary)",
									fontSize: "0.8rem",
									fontWeight: 600,
									cursor: "pointer",
									fontFamily: "var(--font-mono)",
									transition: "transform var(--duration-fast) var(--ease-out), box-shadow var(--duration-fast) var(--ease-out), border-color var(--duration-fast) var(--ease-out), background var(--duration-fast) var(--ease-out)",
								}}
							>
								{n}
							</button>
						))}
					</div>
				</div>

				<button
					type="button"
					onClick={generateBatch}
					style={{
						all: "unset",
						cursor: "pointer",
						display: "flex",
						alignItems: "center",
						gap: "0.4rem",
						padding: "0.65rem 1.25rem",
						borderRadius: "var(--radius-md)",
						background: "var(--gradient-blue)",
						color: "#fff",
						fontSize: "0.9rem",
						fontWeight: 700,
						fontFamily: "var(--font-sans)",
						transition: "transform var(--duration-fast) var(--ease-out), box-shadow var(--duration-fast) var(--ease-out), border-color var(--duration-fast) var(--ease-out), background var(--duration-fast) var(--ease-out)",
						whiteSpace: "nowrap",
					}}
					onMouseEnter={(e) => {
						e.currentTarget.style.transform = "translateY(-1px)";
						e.currentTarget.style.boxShadow = "0 4px 20px rgba(99,102,241,0.3)";
					}}
					onMouseLeave={(e) => {
						e.currentTarget.style.transform = "";
						e.currentTarget.style.boxShadow = "";
					}}
				>
					✨ Generar {batchCount} frases
				</button>
			</div>

			{/* Results */}
			{!batchResults && (
				<div
					style={{
						textAlign: "center",
						padding: "3rem 1rem",
						color: "var(--color-text-tertiary)",
						fontSize: "0.9rem",
					}}
				>
					<div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>📋</div>
					<p>
						Hacé clic en{" "}
						<strong style={{ color: "var(--color-text-secondary)" }}>
							Generar
						</strong>{" "}
						para crear {batchCount} frases
					</p>
				</div>
			)}

			{batchResults && batchResults.results.length > 0 && (
				<>
					{/* Copy all button */}
					<button
						type="button"
						onClick={handleCopyAll}
						style={{
							all: "unset",
							cursor: "pointer",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							gap: "0.4rem",
							padding: "0.55rem",
							borderRadius: "var(--radius-sm)",
							border: "1px solid var(--color-border)",
							color: copiedAll
								? "var(--color-success)"
								: "var(--color-text-secondary)",
							fontSize: "0.8rem",
							fontWeight: 500,
							fontFamily: "var(--font-sans)",
							transition: "transform var(--duration-fast) var(--ease-out), box-shadow var(--duration-fast) var(--ease-out), border-color var(--duration-fast) var(--ease-out), background var(--duration-fast) var(--ease-out)",
						}}
					>
						{copiedAll ? "✅ Copiadas todas" : "📋 Copiar todas"}
					</button>

					{/* Warning banner */}
					{batchWarnings.length > 0 && (
						<div
							style={{
								display: "flex",
								alignItems: "center",
								gap: "0.5rem",
								padding: "0.65rem 1rem",
								borderRadius: "var(--radius-md)",
								background: "rgba(249,115,22,0.08)",
								border: "1px solid rgba(249,115,22,0.2)",
								color: "var(--color-orange)",
								fontSize: "0.8rem",
								fontWeight: 500,
							}}
						>
							<span>⚠️</span>
							<span>
								{batchWarnings.length === 1
									? "1 frase es similar a una del historial"
									: `${batchWarnings.length} frases son similares a frases del historial`}
							</span>
						</div>
					)}

					{/* List */}
					<div
						style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}
					>
						{batchResults.results.map((result, i) => {
							const isWarned = warnedIndices.has(i);
							return (
								<div
									key={`${i}-${result.password}`}
									style={{
										display: "flex",
										alignItems: "center",
										gap: "0.5rem",
										padding: "0.65rem 0.85rem",
										borderRadius: "var(--radius-md)",
										border: `1px solid ${isWarned ? "rgba(249,115,22,0.25)" : "var(--color-border)"}`,
										background: isWarned
											? "rgba(249,115,22,0.04)"
											: "var(--color-accent-soft)",
										transition: "transform var(--duration-fast) var(--ease-out), box-shadow var(--duration-fast) var(--ease-out), border-color var(--duration-fast) var(--ease-out), background var(--duration-fast) var(--ease-out)",
									}}
								>
									{/* Number */}
									<span
										style={{
											fontSize: "0.75rem",
											fontWeight: 700,
											color: "var(--color-text-tertiary)",
											fontFamily: "var(--font-mono)",
											minWidth: "1.5rem",
											textAlign: "right",
										}}
									>
										#{i + 1}
									</span>

									{/* Password */}
									<span
										style={{
											flex: 1,
											fontFamily: "var(--font-mono)",
											fontSize: "0.85rem",
											fontWeight: 600,
											color: "var(--color-text)",
											wordBreak: "break-all",
											userSelect: "all",
										}}
									>
										{result.password}
									</span>

									{/* Copy */}
									<button
										type="button"
										onClick={() => handleCopy(result.password, i)}
										aria-label={`Copiar frase ${i + 1}`}
										style={{
											all: "unset",
											cursor: "pointer",
											fontSize: "1rem",
											padding: "0.2rem 0.4rem",
											borderRadius: "var(--radius-sm)",
											color:
												copiedIndex === i
													? "var(--color-success)"
													: "var(--color-text-tertiary)",
											transition: "transform var(--duration-fast) var(--ease-out), box-shadow var(--duration-fast) var(--ease-out), border-color var(--duration-fast) var(--ease-out), background var(--duration-fast) var(--ease-out)",
											flexShrink: 0,
										}}
									>
										{copiedIndex === i ? "✅" : "📋"}
									</button>

									{/* Warning icon */}
									{isWarned && (
										<span
											style={{ fontSize: "0.9rem", flexShrink: 0 }}
											title="Similar a una frase del historial"
										>
											⚠️
										</span>
									)}
								</div>
							);
						})}
					</div>
				</>
			)}
		</div>
	);
}
