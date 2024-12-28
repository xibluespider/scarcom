"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { Globe as GlobeIcon } from "lucide-react";

import UserInfoCard from "./UserInfoCard";

export default function ActivityPanel() {
	const session = useSession();

	return (
		<div className="grow flex flex-col space-y-2">
			<UserInfoCard session={session} className="border rounded-lg p-2" />

			<Button variant="outline" className="justify-start px-3" asChild>
				<Link href="/global">
					<div className="flex flex-row items-center justify-start space-x-3">
						<GlobeIcon size={18} />
						<div className="text-base">Global</div>
					</div>
				</Link>
			</Button>
		</div>
	);
}
