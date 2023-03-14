import { useEffect, useState } from 'react';
import { getUserGames } from '../api/games';

export const useGames = ({ filters }) => {
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

	useEffect(() => {
		const controller = new AbortController();

		loadGames(setData, setError, filters, controller.signal);

		return () => controller.abort();
	}, [filters]);

	return {
		games: games.data,
		count: games.count,
		error: games.error,
		loading: games.loading
	};
};

const loadGames = async (setData, setError, filters, signal) => {
	const { games, count, aborted } = await getUserGames({ filters, signal });

	if (aborted) return;

	if (games) {
		setData(games, count);
	} else {
		setError();
	}
};
