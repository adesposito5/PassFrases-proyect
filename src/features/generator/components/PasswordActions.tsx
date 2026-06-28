import { CopyButton } from "@/features/generator/components/CopyButton";

interface PasswordActionsProps {
	password: string;
	onRegenerate: () => void;
}

export function PasswordActions({ password, onRegenerate }: PasswordActionsProps) {
	return (
		<>
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
				{password ?? "Generando…"}
			</div>

			<div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
				<button
					type="button"
					onClick={onRegenerate}
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
						transition: "transform var(--duration-fast) var(--ease-out), box-shadow var(--duration-fast) var(--ease-out)",
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
				<CopyButton text={password ?? ""} full />
			</div>
		</>
	);
}
