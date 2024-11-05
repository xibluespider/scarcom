import { useState } from "react";
import { toast } from "sonner";

export default function useSearchEvents() {
	const [searchQuery, setSearchQuery] = useState("");
	const [searchResultsIsLoading, setSearchResultsIsLoading] = useState(false);
	const [showSearchResults, setShowSearchResults] = useState(false);
	const [searchResults, setSearchResults] = useState();

	const handleSearchQueryChange = (e) => {
		setSearchQuery(e.target.value);
	};

	const handleClearSearchResults = () => {
		setSearchQuery("");
		setShowSearchResults((prev) => false);
	};

	const handleSearchFormSubmit = async (e) => {
		setSearchResultsIsLoading((prev) => true);

		e.preventDefault();

		if (!searchQuery) return;

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
		handleSearchFormSubmit,
	};
}
