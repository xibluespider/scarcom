import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
	return twMerge(clsx(inputs));
}

export function VisibilityWrapper({ isHide, children }) {
	if (isHide) return null;
	return children;
}
