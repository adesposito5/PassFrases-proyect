import { useMemo } from "react";
import { usePasswordStore } from "@/features/generator/store";
import { STRENGTH_CONFIG } from "@/features/generator/types";
import { calculateEntropy, getStrengthLevel } from "@/features/generator/utils";

export function useEntropy() {
	const config = usePasswordStore((s) => s.config);

	return useMemo(() => {
		const bits = calculateEntropy(config);
		const strength = getStrengthLevel(bits);
		const strengthConfig = STRENGTH_CONFIG[strength];

		return { bits, strength, strengthConfig };
	}, [config]);
}
