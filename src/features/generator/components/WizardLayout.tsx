import type { ReactNode } from "react";
import { StepProgress } from "./StepProgress";

interface WizardLayoutProps {
	children: ReactNode;
}

export function WizardLayout({ children }: WizardLayoutProps) {
	return (
		<div
			style={{
				minHeight: "100vh",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				padding: "2rem 1rem",
			}}
		>
			<div style={{ width: "100%", maxWidth: "520px" }}>
				<StepProgress />
				<div
					className="glass-card"
					style={{
						background: "var(--color-card)",
						border: "1px solid var(--color-border)",
						borderRadius: "var(--radius-xl)",
						padding: "2.5rem",
						backdropFilter: "blur(24px)",
						WebkitBackdropFilter: "blur(24px)",
						boxShadow: "var(--glass-shadow)",
					}}
				>
					{children}
				</div>
			</div>
		</div>
	);
}
