"use client";

import {
	User as UserIcon,
	Trash as DeleteIcon,
	Loader2 as LoadingIcon,
} from "lucide-react";

import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuTrigger,
} from "@/components/ui/context-menu";

import { VisibilityWrapper } from "@/lib/utils";

export default function Message({
	payload,
	session,
	onDelete,
	isDeleteLoading,
}) {
	if (payload.isDeleted) return null;
	return (
		<ContextMenu>
			<ContextMenuTrigger>
				<div className="flex items-center gap-2.5">
					<div className="grow flex items-start gap-2.5">
						<UserIcon className="border rounded-full p-2 shrink-0" size={35} />
						<div className="leading-1.5 flex w-full flex-col rounded-e-xl rounded-es-xl border py-1 pl-3">
							<span className="text-sm font-semibold">{payload.username}</span>
							<p className="text-sm font-normal">{payload.message}</p>
						</div>
					</div>
					<ContextMenuContent>
						<VisibilityWrapper
							isHide={
								payload.username !== session?.data?.user?.username ||
								session.status === "loading"
							}
						>
							<VisibilityWrapper isHide={isDeleteLoading}>
								<ContextMenuItem onClick={onDelete}>
									<div className="flex gap-3">
										<DeleteIcon size={15} />
										<div>Delete</div>
									</div>
								</ContextMenuItem>
							</VisibilityWrapper>

							<VisibilityWrapper isHide={!isDeleteLoading}>
								<ContextMenuItem onClick={onDelete} disabled={!isDeleteLoading}>
									<div className="flex gap-3">
										<LoadingIcon size={15} className="animate-spin" />
										<div>Delete</div>
									</div>
								</ContextMenuItem>
							</VisibilityWrapper>
						</VisibilityWrapper>

						<VisibilityWrapper
							isHide={
								payload.username === session?.data?.user?.username ||
								session.status === "loading"
							}
						>
							<ContextMenuItem>You cannot delete this message</ContextMenuItem>
						</VisibilityWrapper>
					</ContextMenuContent>
				</div>
			</ContextMenuTrigger>
		</ContextMenu>
	);
}
