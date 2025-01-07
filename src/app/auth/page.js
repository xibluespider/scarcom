"use client";

import useAuthEvents from "@/hooks/useAuthEvents";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2 as LoadingIcon } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function Page() {
	const {
		handleSignUpFormSubmit,
		signUpRegister,
		signUpErrors,
		handleSignInFormSubmit,
		signInRegister,
		signInErrors,
		isLoading,
	} = useAuthEvents();

	return (
		<div className="grow flex flex-col items-center justify-center">
			<SidebarTrigger className="absolute top-1 left-1" />
			<Tabs defaultValue="signin" className="w-full max-w-[400px] p-2">
				<TabsList className="w-full justify-evenly">
					<TabsTrigger value="signin" className="grow">
						Sign in
					</TabsTrigger>
					<TabsTrigger value="signup" className="grow">
						Sign up
					</TabsTrigger>
				</TabsList>
				<TabsContent value="signin">
					<form onSubmit={handleSignInFormSubmit} method="post">
						<Card>
							<CardHeader>
								<CardTitle>Sign in</CardTitle>
							</CardHeader>
							<CardContent className="space-y-2">
								<div className="space-y-1">
									<Label htmlFor="email">Email</Label>
									<Input
										name="email"
										id="email"
										type="email"
										{...signInRegister("email")}
										autoComplete="username"
										error={signInErrors.email?.message}
									/>
								</div>
								<div className="space-y-1">
									<Label htmlFor="password">Password</Label>
									<Input
										name="password"
										id="password"
										type="password"
										{...signInRegister("password")}
										autoComplete="current-password"
										error={signInErrors.password?.message}
									/>
								</div>
							</CardContent>
							<CardFooter>
								<Button className="grow" type="submit" disabled={isLoading}>
									{isLoading ? <LoadingIcon className="animate-spin" /> : null}
									Sign in
								</Button>
							</CardFooter>
						</Card>
					</form>
				</TabsContent>
				<TabsContent value="signup">
					<form onSubmit={handleSignUpFormSubmit} method="post">
						<Card>
							<CardHeader>
								<CardTitle>Sign up</CardTitle>
							</CardHeader>
							<CardContent className="space-y-2">
								<div className="space-y-1">
									<Label htmlFor="username">Username</Label>
									<Input
										name="username"
										id="username"
										type="text"
										{...signUpRegister("username")}
										autoComplete="username"
										error={signUpErrors.username?.message}
									/>
								</div>
								<div className="space-y-1">
									<Label htmlFor="email">Email</Label>
									<Input
										name="email"
										id="email"
										type="email"
										{...signUpRegister("email")}
										autoComplete="username"
										error={signUpErrors.email?.message}
									/>
								</div>
								<div className="space-y-1">
									<Label htmlFor="password">Password</Label>
									<Input
										name="password"
										id="password"
										type="password"
										{...signUpRegister("password")}
										autoComplete="current-password"
										error={signUpErrors.password?.message}
									/>
								</div>
								<div className="space-y-1">
									<Label htmlFor="confirmPassword">Confirm Password</Label>
									<Input
										name="confirm-password"
										id="confirm-password"
										type="password"
										{...signUpRegister("confirmPassword")}
										autoComplete="current-password"
										error={signUpErrors.confirmPassword?.message}
									/>
								</div>
							</CardContent>
							<CardFooter>
								<Button className="grow" type="submit" disabled={isLoading}>
									{isLoading ? <LoadingIcon className="animate-spin" /> : null}
									Sign up
								</Button>
							</CardFooter>
						</Card>
					</form>
				</TabsContent>
			</Tabs>
		</div>
	);
}
