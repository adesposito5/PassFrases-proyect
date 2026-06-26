import { cn } from "@/shared/lib/cn";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
	children: React.ReactNode;
}

export function Card({ children, className, ...props }: CardProps) {
	return (
		<div
			className={cn(
				"rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-card)] p-6",
				className,
			)}
			{...props}
		>
			{children}
		</div>
	);
}
