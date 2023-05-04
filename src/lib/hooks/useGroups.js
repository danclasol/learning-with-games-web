import { useContext, useEffect, useState } from 'react';
import { getUserGroups } from '../api/groups';
import { AuthContext } from '../context/AuthContext';

export const useGroups = ({ filters }) => {
	const { accessToken } = useContext(AuthContext);

	const [groups, setGroups] = useState({
		data: [],
		count: 0,
		error: false,
		loading: true
	});

	const setData = (newData, newCount) =>
		setGroups({
			data: newData,
			count: newCount,
			loading: false,
			error: false
		});

	const setError = () =>
		setGroups({ data: [], count: 0, loading: false, error: true });

	useEffect(() => {
		const controller = new AbortController();

		loadGroups({
			accessToken,
			setData,
			setError,
			filters,
			signal: controller.signal
		});

		return () => controller.abort();
	}, [accessToken, filters]);

	return {
		groups: groups.data,
		count: groups.count,
		error: groups.error,
		loading: groups.loading
	};
};

const loadGroups = async ({
	accessToken,
	setData,
	setError,
	filters,
	signal
}) => {
	const { groups, count, aborted, error } = await getUserGroups({
		accessToken,
		filters,
		signal
	});

	if (aborted) return;

	if (groups) {
		setData(groups, count);
	} else {
		setError(error);
	}
};
