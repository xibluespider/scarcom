"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

import {
  Info as AboutIcon,
  Loader2 as LoadingIcon,
  LogOutIcon as SignOutIcon,
} from "lucide-react";

import Image from "next/image";
import AppLogo from "../../public/bird.jpg";

import Link from "next/link";

import { useSession } from "next-auth/react";

import useAuthEvents from "@/hooks/useAuthEvents";

export function AppSidebar() {
  const { isLoading, handleSignOutEvent } = useAuthEvents();

  const { isMobile } = useSidebar();

  const session = useSession();
  const statusIsLoading = isLoading || session.status === "loading";

  return (
    <div>
      <SidebarTrigger
        variant="outline"
        className={!isMobile ? "hidden" : "absolute top-1 left-1 size-10"}
      />
      <Sidebar variant="floating" collapsible="icon">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild className="mx-auto mt-1" size="lg">
                    <Link href="/">
                      <Image
                        src={AppLogo}
                        className="size-6 rounded-sm"
                        alt="applogo"
                      />
                      <p>Home</p>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/about">
                  <AboutIcon />
                  <p>About</p>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={handleSignOutEvent}
                className={session.status === "unauthenticated" ? "hidden" : ""}
              >
                <LoadingIcon
                  className={
                    statusIsLoading ? "animate-spin mx-auto" : "hidden"
                  }
                />
                <SignOutIcon className={statusIsLoading ? "hidden" : ""} />
                <p className={statusIsLoading ? "hidden" : ""}>Sign out</p>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    </div>
  );
}
