import { useNavigate } from "react-router-dom";
import { usePasswordStore } from "@/features/generator/store";
import { GeneratorForm } from "./GeneratorForm";

export default function GeneratorPanel() {
	const currentResult = usePasswordStore((state) => state.currentResult);
	const currentStep = usePasswordStore((state) => state.currentStep);
	const generate = usePasswordStore((state) => state.generate);
	const setStep = usePasswordStore((state) => state.setStep);
	const navigate = useNavigate();

	function handleGenerate() {
		generate();
		setStep(3);
	}

	function handleBackToStep2() {
		setStep(2);
	}

	function handleBackToStart() {
		setStep(1);
		navigate("/");
	}

	/* ═══════════════ STEP 2: PERSONALIZAR ═══════════════ */
	if (currentStep === 2) {
		return (
			<div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
				{/* GeneratorForm de D2 — maneja config y genera al hacer click */}
				<GeneratorForm />

				<button
					onClick={handleBackToStart}
					style={{
						all: "unset",
						cursor: "pointer",
						textAlign: "center",
						marginTop: "0.25rem",
						fontSize: "0.85rem",
						color: "var(--color-text-tertiary)",
						fontFamily: "var(--font-sans)",
						padding: "4px 0",
						transition: "color var(--duration-fast) var(--ease-out)",
					}}
					onMouseEnter={(e) => {
						e.currentTarget.style.color = "var(--color-pink)";
					}}
					onMouseLeave={(e) => {
						e.currentTarget.style.color = "var(--color-text-tertiary)";
					}}
				>
					← Volver a inicio
				</button>
			</div>
		);
	}

	/* ═══════════════ STEP 3: RESULTADO ═══════════════ */
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				gap: "1.25rem",
				textAlign: "center",
			}}
		>
			<div
				style={{
					fontSize: "2.8rem",
					display: "inline-block",
					marginBottom: "0.5rem",
					filter: "drop-shadow(0 0 24px rgba(99,102,241,0.35))",
				}}
			>
				🛡️
			</div>

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
				{currentResult?.password ?? "Generando…"}
			</div>

			<div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
				<button
					onClick={handleGenerate}
					style={{
						all: "unset",
						cursor: "pointer",
						flex: 1,
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						gap: "0.4rem",
						padding: "0.85rem",
						borderRadius: "12px",
						background: "var(--gradient-blue)",
						color: "#fff",
						fontSize: "0.9rem",
						fontWeight: 600,
						fontFamily: "var(--font-sans)",
						transition: "all var(--duration-fast) var(--ease-out)",
					}}
					onMouseEnter={(e) => {
						e.currentTarget.style.boxShadow = "0 4px 20px rgba(99,102,241,0.3)";
						e.currentTarget.style.transform = "translateY(-1px)";
					}}
					onMouseLeave={(e) => {
						e.currentTarget.style.boxShadow = "";
						e.currentTarget.style.transform = "";
					}}
				>
					🔄 Generar nueva
				</button>
			</div>

			<button
				onClick={handleBackToStep2}
				style={{
					all: "unset",
					cursor: "pointer",
					textAlign: "center",
					marginTop: "0.25rem",
					fontSize: "0.85rem",
					color: "var(--color-text-tertiary)",
					fontFamily: "var(--font-sans)",
					padding: "4px 0",
					transition: "color var(--duration-fast) var(--ease-out)",
				}}
				onMouseEnter={(e) => {
					e.currentTarget.style.color = "var(--color-pink)";
				}}
				onMouseLeave={(e) => {
					e.currentTarget.style.color = "var(--color-text-tertiary)";
				}}
			>
				← Personalizar
			</button>
		</div>
	);
}
