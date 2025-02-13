import { useState } from 'react';
import { SORT_GAMES_OPTIONS } from '../../constants/sortGamesOptions';

export const FILTERS_INITIAL_STATE = {
	search: '',
	sortBy: SORT_GAMES_OPTIONS.BY_DATE_DESC
};

export const useFoldersFilters = () => {
	const [filters, setFilters] = useState({ ...FILTERS_INITIAL_STATE });

	const setSearch = search => {
		setFilters({ ...filters, search });
	};

	const setSortBy = sortBy => {
		setFilters({ ...filters, sortBy });
	};

	const resetFilters = () => {
		setFilters({ ...FILTERS_INITIAL_STATE });
	};

	return {
		filters,
		setSearch,
		setSortBy,
		resetFilters
	};
};
