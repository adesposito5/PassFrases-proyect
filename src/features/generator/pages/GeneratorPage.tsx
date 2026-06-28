import { useEffect } from "react";
import GeneratorPanel from "@/features/generator/components/GeneratorPanel";
import { WizardLayout } from "@/features/controls/components/WizardLayout";
import { usePasswordStore } from "@/features/generator/store";

export default function GeneratorPage() {
	const setStep = usePasswordStore((state) => state.setStep);

	useEffect(() => {
		setStep(2);
	}, [setStep]);

	return (
		<WizardLayout>
			<GeneratorPanel />
		</WizardLayout>
	);
}
