import { useState } from 'react';

export const useFilters = () => {
	const [filters, setFilters] = useState({ search: '', type: '', sortBy: 0 });

	const setSearch = search => {
		setFilters({ ...filters, search });
	};

	const setType = type => {
		setFilters({ ...filters, type });
	};

	const setSortBy = sortBy => {
		setFilters({ ...filters, sortBy });
	};

	const resetFilters = () => {
		setFilters({ search: '', type: '', sortBy: 0 });
	};

	return { filters, setSearch, setType, setSortBy, resetFilters };
};
