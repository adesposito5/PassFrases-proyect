import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { WizardLayout } from "@/features/generator/components/WizardLayout";
import { usePasswordStore } from "@/features/generator/store";

const BENEFITS = [
	{
		icon: "🔑",
		title: "Fácil de recordar",
		desc: "Frases con sentido, no contraseñas al azar.",
	},
	{
		icon: "🛡️",
		title: "Matemáticamente segura",
		desc: "Alta entropía que resiste ataques de fuerza bruta.",
	},
	{
		icon: "⚡",
		title: "Un clic y listo",
		desc: "Generar, copiar y usar al instante.",
	},
];

export default function WizardStartPage() {
	const navigate = useNavigate();
	const setStep = usePasswordStore((state) => state.setStep);

	useEffect(() => {
		setStep(1);
	}, [setStep]);

	function handleStart() {
		setStep(2);
		navigate("/generator");
	}

	return (
		<WizardLayout>
			<div style={{ textAlign: "center" }}>
				{/* Ícono */}
				<div
					aria-hidden="true"
					style={{
						fontSize: "2.5rem",
						display: "inline-block",
						marginBottom: "0.75rem",
						filter: "drop-shadow(0 0 20px rgba(99,102,241,0.3))",
					}}
				>
					🔐
				</div>

				{/* Título */}
				<h1
					style={{
						fontSize: "1.8rem",
						fontWeight: 800,
						letterSpacing: "-0.03em",
						background: "linear-gradient(135deg, #e2e2f0, #a78bfa)",
						WebkitBackgroundClip: "text",
						WebkitTextFillColor: "transparent",
						backgroundClip: "text",
						marginBottom: "0.4rem",
					}}
				>
					Tu contraseña perfecta
				</h1>

				<p
					style={{
						color: "var(--color-text-secondary)",
						fontSize: "0.95rem",
						marginBottom: "2rem",
					}}
				>
					Fácil de recordar, imposible de adivinar. En 3 simples pasos.
				</p>

				{/* Benefits */}
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						gap: "0.75rem",
						textAlign: "left",
						marginBottom: "2rem",
					}}
				>
					{BENEFITS.map((b) => (
						<div
							key={b.title}
							style={{
								display: "flex",
								alignItems: "flex-start",
								gap: "0.85rem",
								padding: "0.85rem 1rem",
								background: "var(--color-accent-soft)",
								border: "1px solid var(--color-border)",
								borderRadius: "14px",
								transition: `all var(--duration-fast) var(--ease-out)`,
							}}
						>
							{/* Ícono benefit */}
							<div
								aria-hidden="true"
								style={{
									width: "44px",
									height: "44px",
									borderRadius: "12px",
									display: "grid",
									placeItems: "center",
									background: "var(--color-accent-soft)",
									flexShrink: 0,
									fontSize: "1.3rem",
								}}
							>
								{b.icon}
							</div>

							{/* Texto */}
							<div>
								<strong
									style={{
										display: "block",
										fontSize: "0.9rem",
										marginBottom: "0.1rem",
									}}
								>
									{b.title}
								</strong>
								<span
									style={{
										fontSize: "0.8rem",
										color: "var(--color-text-secondary)",
									}}
								>
									{b.desc}
								</span>
							</div>
						</div>
					))}
				</div>

				{/* CTA */}
				<button
					type="button"
					onClick={handleStart}
					aria-label="Comenzar a personalizar tu contraseña"
					style={{
						all: "unset",
						cursor: "pointer",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						gap: "0.5rem",
						width: "fit-content",
						margin: "1.5rem auto 0",
						padding: "1rem 2rem",
						borderRadius: "14px",
						background: "var(--gradient-cta)",
						color: "#fff",
						fontSize: "1.05rem",
						fontWeight: 700,
						fontFamily: "var(--font-sans)",
						transition: `all var(--duration-fast) var(--ease-out)`,
					}}
					onMouseEnter={(e) => {
						(e.currentTarget as HTMLButtonElement).style.transform =
							"translateY(-2px)";
						(e.currentTarget as HTMLButtonElement).style.boxShadow =
							"0 8px 32px rgba(236,72,153,0.35)";
					}}
					onMouseLeave={(e) => {
						(e.currentTarget as HTMLButtonElement).style.transform = "";
						(e.currentTarget as HTMLButtonElement).style.boxShadow = "";
					}}
				>
					Comenzar →
				</button>
			</div>
		</WizardLayout>
	);
}
