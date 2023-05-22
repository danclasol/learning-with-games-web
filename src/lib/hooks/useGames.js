import { useContext, useEffect, useState } from 'react';
import { getUserGames } from '../api/games';
import { AuthContext } from '../context/AuthContext';

export const useGames = ({ groupId, collectionId, filters }) => {
	const { accessToken } = useContext(AuthContext);

	const [games, setGames] = useState({
		data: [],
		count: 0,
		error: false,
		loading: true
	});

	const setData = (newData, newCount) =>
		setGames({
			data: newData,
			count: newCount,
			loading: false,
			error: false
		});

	const setError = () =>
		setGames({ data: [], count: 0, loading: false, error: true });

	const refresh = () => {
		loadGames({
			accessToken,
			groupId,
			collectionId,
			setData,
			setError,
			filters
		});
	};

	useEffect(() => {
		const controller = new AbortController();

		loadGames({
			accessToken,
			groupId,
			collectionId,
			setData,
			setError,
			filters,
			signal: controller.signal
		});

		return () => controller.abort();
	}, [accessToken, groupId, collectionId, filters]);

	return {
		games: games.data,
		count: games.count,
		error: games.error,
		loading: games.loading,
		refresh
	};
};

const loadGames = async ({
	accessToken,
	groupId,
	collectionId,
	setData,
	setError,
	filters,
	signal
}) => {
	const { games, count, aborted, error } = await getUserGames({
		accessToken,
		groupId,
		collectionId,
		filters,
		signal
	});

	if (aborted) return;

	if (games) {
		setData(games, count);
	} else {
		setError(error);
	}
};
