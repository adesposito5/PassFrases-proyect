import type { ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";
import HistoryPanel from "@/features/generator/components/HistoryPanel";

interface ProvidersProps {
	children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
	return (
		<BrowserRouter>
			{children}
			<HistoryPanel />
		</BrowserRouter>
	);
}
