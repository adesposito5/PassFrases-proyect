import wordLists from "@/features/generator/wordLists.json";

const CATEGORY_LABELS: Record<string, string> = {
	animales: "Animales",
	naturaleza: "Naturaleza",
	colores: "Colores",
	lugares: "Lugares",
	verbos: "Verbos",
};

export function CategoryChips() {
	const categories = Object.keys(wordLists);

	return (
		<div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
			{categories.map((cat) => (
				<span
					key={cat}
					style={{
						padding: "0.4rem 0.9rem",
						borderRadius: "99px",
						fontSize: "0.75rem",
						fontWeight: 500,
						background: "var(--color-accent-soft)",
						border: "1px solid var(--color-border)",
						color: "var(--color-text-secondary)",
					}}
				>
					{CATEGORY_LABELS[cat] ?? cat}
				</span>
			))}
		</div>
	);
}
