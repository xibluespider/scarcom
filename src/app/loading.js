"use client";

import { Loader2 as LoadingIcon } from "lucide-react";

export default function Page() {
	return (
		<div className="grow border rounded-lg m-2 flex items-center justify-center">
			<LoadingIcon className="animate-spin" size={40} />
		</div>
	);
}