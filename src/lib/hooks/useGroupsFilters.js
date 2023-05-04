import { useState } from 'react';
import { PAGINATION } from '../../constants/pagination';
import { SORT_GROUPS_OPTIONS } from '../../constants/sortGroupsOptions';

export const FILTERS_INITIAL_STATE = {
	search: '',
	sortBy: SORT_GROUPS_OPTIONS.BY_DATE_DESC,
	page: PAGINATION.DEFAULT_PAGE,
	itemsPerPage: PAGINATION.DEFAULT_ITEMS_PER_PAGE
};

export const useGroupFilters = () => {
	const [filters, setFilters] = useState({ ...FILTERS_INITIAL_STATE });

	const setSearch = search => {
		setFilters({ ...filters, search });
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
		setSortBy,
		setPage,
		setItemsPerPage,
		resetFilters
	};
};
