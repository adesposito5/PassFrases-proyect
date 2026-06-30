import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { WizardLayout } from "@/features/controls/components/WizardLayout";
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
			<div className="text-center">
				{/* Ícono */}
				<div
					aria-hidden="true"
					className="mb-3 inline-block text-[2.5rem] drop-shadow-[0_0_20px_rgba(99,102,241,0.3)]"
				>
					🔐
				</div>

				{/* Título */}
				<h1 className="mb-[0.4rem] bg-[linear-gradient(135deg,#e2e2f0,#a78bfa)] bg-clip-text text-[1.8rem] font-extrabold tracking-[-0.03em] text-transparent">
					Tu contraseña perfecta
				</h1>

				<p className="mb-8 text-[0.95rem] text-text-secondary">
					Fácil de recordar, imposible de adivinar. En 3 simples pasos.
				</p>

				{/* Benefits */}
				<div className="mb-8 flex flex-col gap-3 text-left">
					{BENEFITS.map((b) => (
						<div
							key={b.title}
							className="flex items-start gap-[0.85rem] rounded-[14px] border border-border bg-accent-soft px-4 py-[0.85rem] transition-all duration-150 ease-out"
						>
							{/* Ícono benefit */}
							<div
								aria-hidden="true"
								className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent-soft text-[1.3rem]"
							>
								{b.icon}
							</div>

							{/* Texto */}
							<div>
								<strong className="mb-[0.1rem] block text-[0.9rem]">
									{b.title}
								</strong>
								<span className="text-[0.8rem] text-text-secondary">
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
					className="mx-auto mt-6 flex w-fit items-center justify-center gap-2 rounded-[14px] bg-[image:var(--gradient-cta)] px-8 py-4 font-sans text-[1.05rem] font-bold text-white transition-all duration-150 ease-out hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(236,72,153,0.35)]"
				>
					Comenzar →
				</button>
			</div>
		</WizardLayout>
	);
}