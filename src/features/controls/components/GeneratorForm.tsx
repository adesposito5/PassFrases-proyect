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
		<div className="rounded-(--radius-lg) border border-(--color-border) bg-(--color-card) p-7 shadow-[var(--glass-shadow)]">
			<h2 className="mb-6 font-sans text-lg font-semibold text-(--color-text)">
				Personalizá tu contraseña
			</h2>

			<div className="mb-6">
				<label
					htmlFor="wordCount"
					className="mb-2 flex items-center justify-between font-sans text-sm font-medium text-(--color-text-secondary)"
				>
					<span>Cantidad de palabras</span>
					<span className="font-bold text-(--color-accent)">
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
					className="w-full cursor-pointer accent-(--color-accent)"
				/>
				<div className="mt-2 flex justify-between font-sans text-xs text-(--color-text-tertiary)">
					<span>2</span>
					<span>4</span>
					<span>6</span>
				</div>
			</div>

			<div className="my-6 h-px bg-(--color-border)" />

			<div className="mb-6">
				<label
					htmlFor="separator"
					className="mb-2 block font-sans text-sm font-medium text-(--color-text-secondary)"
				>
					Separador
				</label>
				<select
					id="separator"
					value={config.separator}
					onChange={(e) => updateOption("separator", e.target.value)}
					className="w-full cursor-pointer rounded-(--radius-md) border border-(--color-border) bg-(--color-card) px-3 py-2.5 font-sans text-sm text-(--color-text) transition-[border-color,box-shadow] duration-[var(--duration-fast)] ease-(--ease-out) focus:border-(--color-border-focus) focus:shadow-[0_0_0_1px_var(--color-border-focus)] focus:outline-none"
				>
					<option value="-">Guión ( - )</option>
					<option value=".">Punto ( . )</option>
					<option value="_">Guión bajo ( _ )</option>
					<option value=" ">Espacio</option>
				</select>
			</div>

			<div className="my-6 h-px bg-(--color-border)" />

			<div className="mb-7">
				<button
					type="button"
					onClick={() => setShowAdvanced(!showAdvanced)}
					className="mb-4 cursor-pointer appearance-none border-none bg-transparent p-0 font-sans text-sm font-semibold text-(--color-accent) transition-colors duration-[var(--duration-fast)] ease-(--ease-out) hover:text-(--color-accent-hover)"
				>
					{showAdvanced
						? "Ocultar opciones avanzadas ↑"
						: "Ver opciones avanzadas ↓"}
				</button>

				{showAdvanced && (
					<div className="flex flex-col gap-5">
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
				className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-(--radius-md) border-none bg-[var(--gradient-cta)] px-4 py-4 font-sans text-base font-semibold text-white shadow-[0_0_14px_var(--color-pink-glow),0_2px_10px_var(--color-pink-glow)] transition-[transform,box-shadow] duration-[var(--duration-fast)] ease-(--ease-out) hover:-translate-y-px hover:shadow-[0_0_24px_var(--color-pink-glow),0_4px_20px_var(--color-pink-glow),0_0_6px_var(--color-pink-glow)]"
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
		<div className="flex items-center justify-between">
			<div>
				<label
					htmlFor={id}
					className="cursor-pointer font-sans text-sm font-medium text-(--color-text-secondary)"
				>
					{label}
				</label>
				<p className="mt-0.5 font-sans text-xs text-(--color-text-tertiary)">
					{description}
				</p>
			</div>
			<button
				id={id}
				type="button"
				role="switch"
				aria-checked={checked}
				onClick={() => onChange(!checked)}
				className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-(--radius-pill) border-none transition-colors duration-[var(--duration-fast)] ease-(--ease-out) focus:shadow-[0_0_0_2px_var(--color-surface),0_0_0_4px_var(--color-accent)] focus:outline-none ${
					checked ? "bg-(--color-accent)" : "bg-(--color-text-tertiary)"
				}`}
			>
				<span
					className={`inline-block h-4 w-4 rounded-full bg-white shadow-[0_1px_3px_rgba(0,0,0,0.3)] transition-transform duration-[var(--duration-fast)] ease-(--ease-out) ${
						checked ? "translate-x-6" : "translate-x-1"
					}`}
				/>
			</button>
		</div>
	);
}