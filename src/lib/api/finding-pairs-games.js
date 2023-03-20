import { API_URL, API_VERSION } from './api-settings';

const path = 'finding-pairs';

export const updateGame = async ({ id, game }) => {
	const request = `${API_URL}/${API_VERSION}/games/${id}/${path}/`;

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

export const addPairToGame = async ({ id, text, image, gameId }) => {
	const request = `${API_URL}/${API_VERSION}/games/${gameId}/${path}/pairs`;

	try {
		const res = await fetch(request, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ id: text, text, image })
		});

		return res.ok;
	} catch {
		return false;
	}
};

export const udpatePairGame = async ({ id, text, image, gameId }) => {
	const request = `${API_URL}/${API_VERSION}/games/${gameId}/${path}/pairs/${id}`;

	try {
		const res = await fetch(request, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ text, image })
		});

		return res.ok;
	} catch {
		return false;
	}
};

export const deletePairFromGame = async ({ id, gameId }) => {
	const request = `${API_URL}/${API_VERSION}/games/${gameId}/${path}/pairs/${id}`;

	try {
		const res = await fetch(request, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			}
		});

		return res.ok;
	} catch {
		return false;
	}
};
