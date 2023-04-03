import { API_URL, API_VERSION } from './api-settings';

const path = 'finding-pairs';

export const updateGame = async ({ accessToken, id, game }) => {
	const request = `${API_URL}/${API_VERSION}/games/${id}/${path}/`;

	try {
		const res = await fetch(request, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + accessToken
			},
			body: JSON.stringify(game)
		});

		return res.ok;
	} catch {
		return false;
	}
};
