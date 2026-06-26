import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const WizardStartPage = lazy(
	() => import("@/features/generator/pages/WizardStartPage"),
);
const GeneratorPage = lazy(
	() => import("@/features/generator/pages/GeneratorPage"),
);
const BatchPage = lazy(() => import("@/features/generator/pages/BatchPage"));

const LoadingFallback = (
	<div
		style={{
			display: "flex",
			justifyContent: "center",
			padding: "2rem",
			color: "var(--color-text-secondary)",
		}}
	>
		Cargando…
	</div>
);

export function AppRouter() {
	return (
		<Suspense fallback={LoadingFallback}>
			<Routes>
				<Route path="/" element={<WizardStartPage />} />
				<Route path="/generator" element={<GeneratorPage />} />
				<Route path="/batch" element={<BatchPage />} />
			</Routes>
		</Suspense>
	);
}
