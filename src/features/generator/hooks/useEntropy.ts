import { useMemo } from "react";
import { usePasswordStore } from "@/features/generator/store";
import { STRENGTH_CONFIG } from "@/features/generator/types";
import { calculateEntropy, getStrengthLevel } from "@/features/generator/entropy";

export function useEntropy() {
  const config = usePasswordStore((s) => s.config);
  const currentResult = usePasswordStore((s) => s.currentResult);

  return useMemo(() => {
    const password = currentResult?.password;
    const bits = password
      ? calculateEntropy(config, password)
      : calculateEntropy(config);
    const strength = getStrengthLevel(bits);
    const strengthConfig = STRENGTH_CONFIG[strength];

    return { bits, strength, strengthConfig };
  }, [config, currentResult]);
}
