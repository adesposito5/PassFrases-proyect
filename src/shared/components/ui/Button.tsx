import { cn } from "@/shared/lib/cn";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: Variant;
	size?: Size;
	children: React.ReactNode;
}

export function Button({
	variant = "primary",
	size = "md",
	className,
	disabled,
	children,
	...props
}: ButtonProps) {
	const baseStyles =
		"font-medium rounded transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed";

	const sizeStyles = {
		sm: "px-3 py-1.5 text-sm",
		md: "px-4 py-2 text-base",
		lg: "px-6 py-3 text-lg",
	};

	const variantStyles = {
		primary: "bg-[var(--color-accent)] text-white hover:brightness-110",
		secondary:
			"border border-[var(--color-border)] bg-transparent text-[#e2e2f0] hover:border-[var(--color-accent)]",
		ghost: "bg-transparent text-[#e2e2f0] hover:bg-[var(--color-accent-soft)]",
	};

	return (
		<button
			disabled={disabled}
			className={cn(
				baseStyles,
				sizeStyles[size],
				variantStyles[variant],
				className,
			)}
			{...props}
		>
			{children}
		</button>
	);
}
