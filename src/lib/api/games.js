import { API_URL, API_VERSION } from './api-settings';

const path = 'games';

export const getUserGames = async ({ search, signal }) => {
	console.log({ search });

	const request = `${API_URL}/${API_VERSION}/${path}`;
	const url = new URL(request);

	if (search) {
		url.searchParams.append('title', search);
	}

	let games;

	try {
		const res = await fetch(
			url,
			{
				headers: {
					'Content-Type': 'application/json'
				}
			},
			{ signal }
		);

		if (res.ok) {
			games = await res.json();
		}

		return {
			games,
			count: res.ok ? res.headers.get('total-count') : 0,
			error: !res.ok,
			aborted: false
		};
	} catch (err) {
		const isAborted = err.name === 'AbortError';

		return {
			games: undefined,
			count: 0,
			error: !isAborted,
			aborted: isAborted
		};
	}
};

export const getGame = gameId => {};
