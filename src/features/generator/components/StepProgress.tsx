import { usePasswordStore } from "@/features/generator/store";
import { cn } from "@/shared/lib/cn";

const steps = [
	{ number: 1, label: "Inicio" },
	{ number: 2, label: "Personalizar" },
	{ number: 3, label: "Resultado" },
];

export function StepProgress() {
	const currentStep = usePasswordStore((state) => state.currentStep);

	return (
		<div
			style={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				width: "100%",
				padding: "1.5rem 0",
			}}
		>
			{steps.map((step, index) => (
				<div
					key={step.number}
					style={{ display: "flex", alignItems: "center" }}
				>
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							gap: "0.5rem",
						}}
					>
						<div
							className={cn("step-circle")}
							style={{
								width: "2.5rem",
								height: "2.5rem",
								borderRadius: "50%",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								fontWeight: 600,
								fontSize: "0.9rem",
								background:
									currentStep === step.number
										? "var(--color-accent)"
										: currentStep > step.number
											? "rgba(99,102,241,0.6)"
											: "transparent",
								border:
									currentStep < step.number
										? "1px solid var(--color-border)"
										: "none",
								color:
									currentStep >= step.number ? "white" : "var(--color-border)",
							}}
						>
							{step.number}
						</div>
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
							}}
						>
							<span
								style={{
									fontSize: "0.8rem",
									color:
										currentStep === step.number
											? "white"
											: "var(--color-border)",
									fontWeight: currentStep === step.number ? 600 : 400,
								}}
							>
								{step.label}
							</span>
							{currentStep === step.number && (
								<div
									style={{
										height: "2px",
										width: "100%",
										background: "var(--color-pink)",
										borderRadius: "99px",
										marginTop: "2px",
									}}
								/>
							)}
						</div>
					</div>
					{index < steps.length - 1 && (
						<div
							style={{
								width: "4rem",
								height: "1px",
								background: "var(--color-border)",
								margin: "0 0.5rem",
								marginBottom: "1.5rem",
							}}
						/>
					)}
				</div>
			))}
		</div>
	);
}
