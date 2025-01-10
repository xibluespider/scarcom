"use client";

import { User as UserIcon } from "lucide-react";

export default function Message({ payload }) {
	return (
		<div className="flex items-start gap-2.5">
			<UserIcon className="border rounded-full p-2 shrink-0" size={35} />
			<div className="leading-1.5 flex w-full flex-col rounded-e-xl rounded-es-xl border py-1 pl-3">
				<span className="text-sm font-semibold">{payload.username}</span>
				<p className="text-sm font-normal">{payload.message}</p>
			</div>
		</div>
	);
}
