import { SORT_GAMES_OPTIONS } from '../../constants/sortGamesOptions';
import { API_URL, API_VERSION } from './api-settings';

const path = 'games';

const SORT_MAPPER = {
	[SORT_GAMES_OPTIONS.BY_DATE_ASC]: ['creationDate', 'asc'],
	[SORT_GAMES_OPTIONS.BY_DATE_DESC]: ['creationDate', 'desc'],
	[SORT_GAMES_OPTIONS.BY_TITLE]: ['title', 'asc'],
	[SORT_GAMES_OPTIONS.BY_TYPE]: ['type', 'asc']
};

export const getUserGames = async ({ filters, signal }) => {
	const request = `${API_URL}/${API_VERSION}/${path}`;
	const url = new URL(request);

	if (filters.page && filters.itemsPerPage) {
		url.searchParams.append('page', filters.page);
		url.searchParams.append('limit', filters.itemsPerPage);
	}

	if (filters.search) {
		url.searchParams.append('title', filters.search);
	}

	if (filters.type) {
		url.searchParams.append('type', filters.type);
	}

	const sortProps = SORT_MAPPER[filters.sortBy];

	if (sortProps) {
		const [sort, order] = sortProps;
		url.searchParams.append('sort', sort);
		url.searchParams.append('order', order);
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

export const getGame = async ({ id, signal }) => {
	const request = `${API_URL}/${API_VERSION}/${path}/${id}`;

	let game;

	try {
		const res = await fetch(
			request,
			{
				headers: {
					'Content-Type': 'application/json'
				}
			},
			{ signal }
		);

		if (res.ok) {
			game = await res.json();
		}

		return {
			game,
			error: !res.ok,
			aborted: false
		};
	} catch (err) {
		const isAborted = err.name === 'AbortError';

		return {
			game: undefined,
			error: !isAborted,
			aborted: isAborted
		};
	}
};

export const createGame = async ({ game }) => {
	const request = `${API_URL}/${API_VERSION}/${path}/`;

	let gameCreated;

	try {
		const res = await fetch(request, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ id: crypto.randomUUID(), ...game })
		});

		if (res.ok) {
			gameCreated = await res.json();
		}

		return gameCreated;
	} catch {
		return gameCreated;
	}
};

export const updateGame = async ({ id, game }) => {
	const request = `${API_URL}/${API_VERSION}/${path}/${id}`;

	try {
		const res = await fetch(request, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(game)
		});

		return res.ok;
	} catch {
		return false;
	}
};

export const deleteGame = async ({ id }) => {
	const request = `${API_URL}/${API_VERSION}/${path}/${id}`;

	try {
		const res = await fetch(request, {
			method: 'DELETE'
		});

		return res.ok;
	} catch {
		return false;
	}
};
