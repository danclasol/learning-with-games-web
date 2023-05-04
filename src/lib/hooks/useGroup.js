import { useContext, useEffect, useState } from 'react';
import { getGroup } from '../api/groups';
import { AuthContext } from '../context/AuthContext';

export const useGroup = ({ id }) => {
	const { accessToken } = useContext(AuthContext);

	const [group, setGroup] = useState({
		data: undefined,
		error: false,
		loading: true
	});

	const setData = newData => {
		setGroup({ data: newData, loading: false, error: false });
	};

	const setError = () => {
		setGroup({ data: undefined, loading: false, error: true });
	};

	const refresh = () => {
		loadGroup({ accessToken, id, setData, setError });
	};

	useEffect(() => {
		if (!group.loading) return;

		const controller = new AbortController();

		try {
			loadGroup({
				accessToken,
				id,
				setData,
				setError,
				signal: controller.signal
			});

			return () => controller.abort();
		} catch (error) {
			setError(error);
		}
	}, [accessToken, id, group.loading]);

	return {
		group: group.data,
		error: group.error,
		loading: group.loading,
		refresh
	};
};

const loadGroup = async ({ accessToken, id, setData, setError, signal }) => {
	const { group, aborted } = await getGroup({ accessToken, id, signal });

	if (aborted) return;

	if (group) {
		setData(group);
	} else {
		setError();
	}
};
