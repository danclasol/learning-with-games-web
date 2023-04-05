import { API_URL, API_VERSION } from './api-settings';

const path = 'users';

export const getCurrentUser = async ({ accessToken }) => {
	const request = `${API_URL}/${API_VERSION}/${path}/account`;

	let user;

	try {
		const res = await fetch(request, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + accessToken
			}
		});

		if (res.ok) {
			user = await res.json();
		}

		return {
			user,
			error: !res.ok,
			aborted: false
		};
	} catch (err) {
		const isAborted = err.name === 'AbortError';
		const error = isAborted
			? undefined
			: { code: 500, message: 'Error server' };

		return {
			game: undefined,
			error,
			aborted: isAborted
		};
	}
};
