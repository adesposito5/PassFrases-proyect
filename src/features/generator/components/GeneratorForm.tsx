// src/features/generator/components/GeneratorForm.tsx

import { useState } from "react";

// ─── 1. TIPO LOCAL (Aislado de types.ts para no romper el trabajo de I1) ───
export interface PasswordOptions {
	wordCount: number;
	separator: string;
	includeNumbers: boolean;
	includeSymbols: boolean;
	capitalize: boolean;
}

// ─── 2. Valores por defecto ──────────────────────────────────────────────────
const DEFAULT_OPTIONS: PasswordOptions = {
	wordCount: 4,
	separator: "-",
	includeNumbers: true,
	includeSymbols: false,
	capitalize: true,
};

// ─── 3. Componente Principal ─────────────────────────────────────────────────
export function GeneratorForm() {
	// Estado LOCAL: Maneja las opciones en este componente
	const [options, setOptions] = useState<PasswordOptions>(DEFAULT_OPTIONS);

	// Helper para actualizar opciones sin mutar el estado directamente
	const updateOption = <K extends keyof PasswordOptions>(
		key: K,
		value: PasswordOptions[K],
	) => {
		setOptions((prev) => ({ ...prev, [key]: value }));
	};

	// Handler temporal hasta que I1 adapte el store de Zustand
	const handleGenerate = () => {
		// TODO (Fase 3): Conectar con store.generate(options) cuando I1 lo habilite
	};

	return (
		<div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
			<h2 className="mb-4 text-lg font-semibold text-gray-800">
				Personalizá tu contraseña
			</h2>

			{/* ── SLIDER: Cantidad de palabras ── */}
			<div className="mb-5">
				<label
					htmlFor="wordCount"
					className="mb-1 flex items-center justify-between text-sm font-medium text-gray-700"
				>
					<span>Cantidad de palabras</span>
					<span className="font-bold text-indigo-600">{options.wordCount}</span>
				</label>
				<input
					id="wordCount"
					type="range"
					min={2}
					max={6}
					step={1}
					value={options.wordCount}
					onChange={(e) => updateOption("wordCount", Number(e.target.value))}
					className="h-2 w-full cursor-pointer accent-indigo-500"
				/>
				<div className="mt-1 flex justify-between text-xs text-gray-400">
					<span>2</span>
					<span>4</span>
					<span>6</span>
				</div>
			</div>

			<div className="my-5 h-px bg-gray-200" />

			{/* ── SELECT: Separador ── */}
			<div className="mb-5">
				<label
					htmlFor="separator"
					className="mb-1 block text-sm font-medium text-gray-700"
				>
					Separador
				</label>
				<select
					id="separator"
					value={options.separator}
					onChange={(e) => updateOption("separator", e.target.value)}
					className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
				>
					<option value="-">Guión ( - )</option>
					<option value=".">Punto ( . )</option>
					<option value="_">Guión bajo ( _ )</option>
					<option value=" ">Espacio</option>
				</select>
			</div>

			<div className="my-5 h-px bg-gray-200" />

			{/* ── TOGGLES: Opciones booleanas ── */}
			<div className="mb-6 space-y-3">
				<ToggleOption
					id="includeNumbers"
					label="Incluir números"
					description="Agrega un número al final (ej: 42)"
					checked={options.includeNumbers}
					onChange={(val) => updateOption("includeNumbers", val)}
				/>
				<ToggleOption
					id="includeSymbols"
					label="Incluir símbolos"
					description="Agrega un símbolo especial (ej: !)"
					checked={options.includeSymbols}
					onChange={(val) => updateOption("includeSymbols", val)}
				/>
				<ToggleOption
					id="capitalize"
					label="Capitalizar"
					description="Primera letra de cada palabra en mayúscula"
					checked={options.capitalize}
					onChange={(val) => updateOption("capitalize", val)}
				/>
			</div>

			{/* ── BOTÓN: Generar ── */}
			<button
				type="button"
				onClick={handleGenerate}
				className="w-full rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-700"
				aria-label="Generar contraseña con las opciones seleccionadas"
			>
				✨ Generar frase mágica
			</button>
		</div>
	);
}

// ─── 4. Subcomponente reutilizable para cada toggle ──────────────────────────
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
					className="cursor-pointer text-sm font-medium text-gray-700"
				>
					{label}
				</label>
				<p className="text-xs text-gray-400">{description}</p>
			</div>
			<button
				id={id}
				type="button"
				role="switch"
				aria-checked={checked}
				onClick={() => onChange(!checked)}
				className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
					checked ? "bg-indigo-600" : "bg-gray-200"
				}`}
			>
				<span
					className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
						checked ? "translate-x-6" : "translate-x-1"
					}`}
				/>
			</button>
		</div>
	);
}
