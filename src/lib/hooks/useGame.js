import { useEffect, useState } from 'react';
import { getGame } from '../api/games';

export const useGame = ({ id }) => {
	const [game, setGame] = useState({
		data: undefined,
		error: false,
		loading: true
	});

	const setData = newData => {
		setGame({ data: newData, loading: false, error: false });
	};

	const setError = () =>
		setGame({ data: undefined, loading: false, error: true });

	const refresh = () => {
		loadGame({ id, setData, setError });
	};

	useEffect(() => {
		if (!game.loading) return;

		const controller = new AbortController();

		try {
			loadGame({ id, setData, setError, signal: controller.signal });

			return () => controller.abort();
		} catch (error) {
			setError();
		}
	}, [id, game.loading]);

	return {
		game: game.data,
		error: game.error,
		loading: game.loading,
		refresh
	};
};

const loadGame = async ({ id, setData, setError, signal }) => {
	const { game, aborted } = await getGame({ id, signal });

	if (aborted) return;

	if (game) {
		setData(game);
	} else {
		setError();
	}
};
