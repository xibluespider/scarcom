"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useSearchEvents from "@/hooks/useSearchEvents";

export default function Page() {
	const {
		searchQuery,
		searchResultsIsLoading,
		showSearchResults,
		searchResults,
		handleSearchQueryChange,
		handleSearchFormSubmit,
	} = useSearchEvents();

	const sayHello = async (e) => {
		e.preventDefault();
		let response = await fetch("/api/hello");
		response = await response.json();
		console.log(response);
	};

	const pingSearch = async (e) => {
		e.preventDefault();
		let response = await fetch("/api/searchUser");
		response = await response.json();
		console.log(response);
	};

	const querySearch = async (e) => {
		e.preventDefault();

		console.log(searchQuery);

		const url = new URL("/api/searchUser/", window.location.origin);
		url.searchParams.append("searchQuery", searchQuery);

		let response = await fetch(url);

		response = await response.json();
		console.log(response);
	};

	return (
		<div className="grow border rounded-lg p-2 m-2 flex flex-col justify-center items-center">
			<div className="border border-green-500 rounded-lg p-2 w-[600px] flex flex-col space-y-4">
				<div className="border border-blue-500 rounded-lg p-2">
					Testing Area
				</div>

				<Button onClick={sayHello} className="w-[100px] mx-auto">
					click
				</Button>

				<form className="border rounded-lg" onSubmit={handleSearchFormSubmit}>
					<Input
						value={searchQuery}
						onChange={handleSearchQueryChange}
						type="text"
						name="query"
						placeholder="🔍 Search User"
						className="shrink-0"
					/>
				</form>

				<div className="border border-red-500 p-2 rounded-lg flex flex-col space-y-2">
					<div>{JSON.stringify(searchResults)}</div>
					<div>{JSON.stringify(searchResultsIsLoading)}</div>
					<div>{JSON.stringify(showSearchResults)}</div>
				</div>
			</div>
		</div>
	);
}
