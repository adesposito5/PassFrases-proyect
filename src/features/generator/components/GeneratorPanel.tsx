import { useNavigate } from "react-router-dom";
import { GeneratorForm } from "@/features/controls/components/GeneratorForm";
import { usePasswordStore } from "@/features/generator/store";
import { EntropyMeter } from "@/features/generator/components/EntropyMeter";
import { FunStats } from "@/features/generator/components/FunStats";
import { PasswordActions } from "@/features/generator/components/PasswordActions";
import { RecommendationsPanel } from "@/features/generator/components/RecommendationsPanel";
import { CategoryChips } from "@/features/generator/components/CategoryChips";
import { ClippyAssistant } from "@/features/clippy/components/ClippyAssistant";

export default function GeneratorPanel() {
const currentResult = usePasswordStore((state) => state.currentResult);
const currentStep = usePasswordStore((state) => state.currentStep);
const config = usePasswordStore((state) => state.config);
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

if (currentStep === 2) {
return (
<div style={{ textAlign: "center" }}>
<div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
<ClippyAssistant />
<GeneratorForm />
<CategoryChips />

<button
					type="button"
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
</div>
);
}

return (
<div style={{ textAlign: "center" }}>
<div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
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

<ClippyAssistant />

		<PasswordActions
				password={currentResult?.password ?? ""}
				bits={currentResult?.bits ?? 0}
				strength={currentResult?.strength ?? "medium"}
				wordCount={config.wordCount}
				onRegenerate={handleGenerate}
			/>

{currentResult && (
<>
<EntropyMeter bits={currentResult.bits} />
<FunStats
wordCount={config.wordCount}
bits={currentResult.bits}
hasNumbers={config.includeNumbers}
hasSymbols={config.includeSymbols}
/>
</>
)}

{currentResult?.analysis ? (
<RecommendationsPanel analysis={currentResult.analysis} />
) : null}

<button
					type="button"
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
</div>
);
}
