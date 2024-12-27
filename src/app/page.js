"use client";

import Image from "next/image";
import AppLogo from "../../public/bird.jpg";

export default function Page() {
	return (
		<div className="grow border rounded-lg m-2 flex flex-col items-center justify-center space-y-3">
			<Image src={AppLogo} alt="AppLogo" className="max-w-[80px] rounded-2xl" />
			<div className="text-xl">kindly select a conversation</div>
		</div>
	);
}
