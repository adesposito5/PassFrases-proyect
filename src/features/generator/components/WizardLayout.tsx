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
				background: "var(--color-surface)",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				padding: "2rem 1rem",
			}}
		>
			<div style={{ width: "100%", maxWidth: "520px" }}>
				<StepProgress />
				<div
					style={{
						background: "var(--color-card)",
						border: "1px solid var(--color-border)",
						borderRadius: "var(--radius-card)",
						padding: "2rem",
					}}
				>
					{children}
				</div>
			</div>
		</div>
	);
}
