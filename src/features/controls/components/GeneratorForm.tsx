import { useEffect, useState } from "react";
import { usePasswordStore } from "@/features/generator/store";
import type { PasswordConfig } from "@/features/generator/types";

export function GeneratorForm() {
	const config = usePasswordStore((state) => state.config);
	const generate = usePasswordStore((state) => state.generate);
	const setStep = usePasswordStore((state) => state.setStep);
	const setConfig = usePasswordStore((state) => state.setConfig);

	const [showAdvanced, setShowAdvanced] = useState(false);

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				setShowAdvanced(false);
			}
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, []);

	const updateOption = <K extends keyof PasswordConfig>(
		key: K,
		value: PasswordConfig[K],
	) => {
		setConfig({ [key]: value });
	};

	const handleGenerate = () => {
		generate();
		setStep(3);
	};

	return (
		<div
			style={{
				borderRadius: "var(--radius-lg)",
				border: "1px solid var(--color-border)",
				background: "var(--color-card)",
				padding: "1.5rem",
				boxShadow: "var(--glass-shadow)",
			}}
		>
			<h2
				style={{
					marginBottom: "1rem",
					fontSize: "1.125rem",
					fontWeight: 600,
					color: "var(--color-text)",
					fontFamily: "var(--font-sans)",
				}}
			>
				Personalizá tu contraseña
			</h2>

			<div style={{ marginBottom: "1.25rem" }}>
				<label
					htmlFor="wordCount"
					style={{
						marginBottom: "0.25rem",
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
						fontSize: "0.875rem",
						fontWeight: 500,
						color: "var(--color-text-secondary)",
						fontFamily: "var(--font-sans)",
					}}
				>
					<span>Cantidad de palabras</span>
					<span
						style={{
							fontWeight: 700,
							color: "var(--color-accent)",
						}}
					>
						{config.wordCount}
					</span>
				</label>
				<input
					id="wordCount"
					type="range"
					min={2}
					max={6}
					step={1}
					value={config.wordCount}
					onChange={(e) => updateOption("wordCount", Number(e.target.value))}
					style={{ width: "100%", cursor: "pointer", accentColor: "var(--color-accent)" }}
				/>
				<div
					style={{
						marginTop: "0.25rem",
						display: "flex",
						justifyContent: "space-between",
						fontSize: "0.75rem",
						color: "var(--color-text-tertiary)",
						fontFamily: "var(--font-sans)",
					}}
				>
					<span>2</span>
					<span>4</span>
					<span>6</span>
				</div>
			</div>

			<div
				style={{
					margin: "1.25rem 0",
					height: "1px",
					background: "var(--color-border)",
				}}
			/>

			<div style={{ marginBottom: "1.25rem" }}>
				<label
					htmlFor="separator"
					style={{
						marginBottom: "0.25rem",
						display: "block",
						fontSize: "0.875rem",
						fontWeight: 500,
						color: "var(--color-text-secondary)",
						fontFamily: "var(--font-sans)",
					}}
				>
					Separador
				</label>
				<select
					id="separator"
					value={config.separator}
					onChange={(e) => updateOption("separator", e.target.value)}
					style={{
						width: "100%",
						borderRadius: "var(--radius-md)",
						border: "1px solid var(--color-border)",
						background: "var(--color-card)",
						color: "var(--color-text)",
						padding: "0.5rem 0.75rem",
						fontSize: "0.875rem",
						fontFamily: "var(--font-sans)",
						cursor: "pointer",
					}}
					onFocus={(e) => {
						e.currentTarget.style.borderColor = "var(--color-border-focus)";
						e.currentTarget.style.boxShadow = "0 0 0 1px var(--color-border-focus)";
					}}
					onBlur={(e) => {
						e.currentTarget.style.borderColor = "var(--color-border)";
						e.currentTarget.style.boxShadow = "none";
					}}
				>
					<option value="-">Guión ( - )</option>
					<option value=".">Punto ( . )</option>
					<option value="_">Guión bajo ( _ )</option>
					<option value=" ">Espacio</option>
				</select>
			</div>

			<div
				style={{
					margin: "1.25rem 0",
					height: "1px",
					background: "var(--color-border)",
				}}
			/>

			<div style={{ marginBottom: "1.5rem" }}>
				<button
					type="button"
					onClick={() => setShowAdvanced(!showAdvanced)}
					style={{
						all: "unset",
						cursor: "pointer",
						marginBottom: "0.75rem",
						fontSize: "0.875rem",
						fontWeight: 600,
						color: "var(--color-accent)",
						fontFamily: "var(--font-sans)",
						transition: "color var(--duration-fast) var(--ease-out)",
					}}
					onMouseEnter={(e) => {
						e.currentTarget.style.color = "var(--color-accent-hover)";
					}}
					onMouseLeave={(e) => {
						e.currentTarget.style.color = "var(--color-accent)";
					}}
				>
					{showAdvanced
						? "Ocultar opciones avanzadas ↑"
						: "Ver opciones avanzadas ↓"}
				</button>

				{showAdvanced && (
					<div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
						<ToggleOption
							id="includeNumbers"
							label="Incluir números"
							description="Agrega un número al final (ej: 42)"
							checked={config.includeNumbers}
							onChange={(val) => updateOption("includeNumbers", val)}
						/>
						<ToggleOption
							id="includeSymbols"
							label="Incluir símbolos"
							description="Agrega un símbolo especial (ej: !)"
							checked={config.includeSymbols}
							onChange={(val) => updateOption("includeSymbols", val)}
						/>
						<ToggleOption
							id="capitalize"
							label="Capitalizar"
							description="Primera letra en mayúscula"
							checked={config.capitalize}
							onChange={(val) => updateOption("capitalize", val)}
						/>
					</div>
				)}
			</div>

			<button
				type="button"
				onClick={handleGenerate}
				style={{
					all: "unset",
					cursor: "pointer",
					width: "100%",
					boxSizing: "border-box",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					borderRadius: "var(--radius-md)",
					background: "var(--gradient-cta)",
					color: "#fff",
					padding: "0.85rem 1rem",
					fontSize: "0.875rem",
					fontWeight: 600,
					fontFamily: "var(--font-sans)",
					transition: "transform var(--duration-fast) var(--ease-out), box-shadow var(--duration-fast) var(--ease-out)",
				}}
				onMouseEnter={(e) => {
					e.currentTarget.style.boxShadow = "0 4px 20px var(--color-pink-glow)";
					e.currentTarget.style.transform = "translateY(-1px)";
				}}
				onMouseLeave={(e) => {
					e.currentTarget.style.boxShadow = "none";
					e.currentTarget.style.transform = "";
				}}
				aria-label="Generar contraseña con las opciones seleccionadas"
			>
				✨ Generar frase mágica
			</button>
		</div>
	);
}

interface ToggleOptionProps {
	id: string;
	label: string;
	description: string;
	checked: boolean;
	onChange: (value: boolean) => void;
}

function ToggleOption({
	id,
	label,
	description,
	checked,
	onChange,
}: ToggleOptionProps) {
	return (
		<div
			style={{
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
			}}
		>
			<div>
				<label
					htmlFor={id}
					style={{
						cursor: "pointer",
						fontSize: "0.875rem",
						fontWeight: 500,
						color: "var(--color-text-secondary)",
						fontFamily: "var(--font-sans)",
					}}
				>
					{label}
				</label>
				<p
					style={{
						fontSize: "0.75rem",
						color: "var(--color-text-tertiary)",
						fontFamily: "var(--font-sans)",
						marginTop: "2px",
					}}
				>
					{description}
				</p>
			</div>
			<button
				id={id}
				type="button"
				role="switch"
				aria-checked={checked}
				onClick={() => onChange(!checked)}
				style={{
					position: "relative",
					display: "inline-flex",
					height: "1.5rem",
					width: "2.75rem",
					flexShrink: 0,
					alignItems: "center",
					borderRadius: "var(--radius-pill)",
					border: "none",
					cursor: "pointer",
					transition: "background-color var(--duration-fast) var(--ease-out)",
					background: checked ? "var(--color-accent)" : "var(--color-text-tertiary)",
				}}
				onFocus={(e) => {
					e.currentTarget.style.boxShadow = `0 0 0 2px var(--color-surface), 0 0 0 4px var(--color-accent)`;
				}}
				onBlur={(e) => {
					e.currentTarget.style.boxShadow = "none";
				}}
			>
				<span
					style={{
						display: "inline-block",
						height: "1rem",
						width: "1rem",
						borderRadius: "50%",
						background: "#fff",
						boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
						transition: "transform var(--duration-fast) var(--ease-out)",
						transform: checked ? "translateX(1.5rem)" : "translateX(0.25rem)",
					}}
				/>
			</button>
		</div>
	);
}
