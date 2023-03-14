import { useState } from 'react';
import { PAGINATION } from '../../constants/pagination';
import { SORT_GAMES_OPTIONS } from '../../constants/sortGamesOptions';

export const FILTERS_INITIAL_STATE = {
	search: '',
	type: '',
	sortBy: SORT_GAMES_OPTIONS.BY_DATE_DESC,
	page: PAGINATION.DEFAULT_PAGE,
	itemsPerPage: PAGINATION.DEFAULT_ITEMS_PER_PAGE
};

export const useFilters = () => {
	const [filters, setFilters] = useState({ ...FILTERS_INITIAL_STATE });

	const setSearch = search => {
		setFilters({ ...filters, search });
	};

	const setType = type => {
		setFilters({ ...filters, type });
	};

	const setSortBy = sortBy => {
		setFilters({ ...filters, sortBy });
	};

	const setPage = page => {
		setFilters({ ...filters, page });
	};

	const setItemsPerPage = itemsPerPage => {
		setFilters({ ...filters, itemsPerPage });
	};

	const resetFilters = () => {
		setFilters({ ...FILTERS_INITIAL_STATE });
	};

	return {
		filters,
		setSearch,
		setType,
		setSortBy,
		setPage,
		setItemsPerPage,
		resetFilters
	};
};
