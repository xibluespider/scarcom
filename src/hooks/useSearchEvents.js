import { useState } from "react";

import { toast } from "sonner";

export default function useSearchEvents() {
	const [searchQuery, setSearchQuery] = useState("");
	const [searchResultsIsLoading, setSearchResultsIsLoading] = useState(false);
	const [showSearchResults, setShowSearchResults] = useState(false);
	const [searchResults, setSearchResults] = useState([]);

	const handleSearchQueryChange = (e) => {
		setSearchQuery(e.target.value);
	};

	const handleClearSearchResults = () => {
		setSearchQuery("");
		setSearchResults((prev) => []);
		setShowSearchResults((prev) => false);
	};

	const handleSearchUserFormSubmit = async (e) => {
		setSearchResultsIsLoading((prev) => true);

		e.preventDefault();

		if (!searchQuery) {
			toast("Search query is empty");

			setSearchResults((prev) => []);
			setShowSearchResults((prev) => false);
			setSearchResultsIsLoading((prev) => false);

			return;
		}

		const url = new URL("/api/searchUser/", window.location.origin);
		url.searchParams.append("searchQuery", searchQuery);

		let results = null;
		try {
			let response = await fetch(url);
			response = await response.json();

			if (response.ok) results = await response.data;
			else toast(response.messsage);
		} catch (error) {
			toast("Error. Please try again later.");

			setSearchResults((prev) => "");
			setShowSearchResults((prev) => false);
			setSearchResultsIsLoading((prev) => false);
		}

		console.log(results);
		setSearchResults((prev) => results);
		setShowSearchResults((prev) => true);
		setSearchResultsIsLoading((prev) => false);
	};

	return {
		searchQuery,
		setSearchQuery,
		searchResultsIsLoading,
		setSearchResultsIsLoading,
		showSearchResults,
		setShowSearchResults,
		searchResults,
		setSearchResults,
		handleSearchQueryChange,
		handleClearSearchResults,
		handleSearchUserFormSubmit,
	};
}
