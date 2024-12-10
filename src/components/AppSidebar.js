"use client";

import {
  LogOutIcon as SignOutIcon,
  Info as AboutIcon,
  Loader2 as LoaderIcon,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";

import Image from "next/image";
import Link from "next/link";

import AppLogo from "../../public/bird.jpg";

import useAuthEvents from "@/hooks/useAuthEvents";

export function AppSidebar() {
  const { isLoading, handleSignOutEvent } = useAuthEvents();

  return (
    <Sidebar variant="floating">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
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
            <SidebarMenuButton onClick={handleSignOutEvent}>
              {isLoading ? (
                <LoaderIcon className="animate-spin" />
              ) : (
                <SignOutIcon />
              )}
              <p>Sign out</p>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
