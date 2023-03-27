import { API_URL, API_VERSION } from './api-settings';

const path = 'hangman';

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
