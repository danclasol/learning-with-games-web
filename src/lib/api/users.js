import { API_URL, API_VERSION } from './api-settings';

const path = 'users';

export const getCurrentUser = async ({ accessToken, signal }) => {
	const request = `${API_URL}/${API_VERSION}/${path}/account`;

	let user;

	try {
		const res = await fetch(
			request,
			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + accessToken
				}
			},
			{ signal }
		);

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

		return {
			game: undefined,
			error: !isAborted ? undefined : { code: 500, message: 'Error server' },
			aborted: isAborted
		};
	}
};
