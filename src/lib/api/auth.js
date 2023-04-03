import { API_URL, API_VERSION } from './api-settings';

const path = 'auth';

export const login = async ({ email, password }) => {
	const request = `${API_URL}/${API_VERSION}/${path}/login`;

	let auth;

	try {
		const res = await fetch(request, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email, password })
		});

		if (res.ok) {
			auth = await res.json();
		}

		return {
			auth,
			error: !res.ok,
			aborted: false
		};
	} catch (err) {
		const isAborted = err.name === 'AbortError';

		return {
			auth: undefined,
			error: !isAborted,
			aborted: isAborted
		};
	}
};

export const register = async ({ name, email, password }) => {
	const request = `${API_URL}/${API_VERSION}/${path}/login`;

	let auth;

	try {
		const res = await fetch(request, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ name, email, password })
		});

		if (res.ok) {
			auth = await res.json();
		}

		return {
			auth,
			error: !res.ok,
			aborted: false
		};
	} catch (err) {
		const isAborted = err.name === 'AbortError';

		return {
			auth: undefined,
			error: !isAborted,
			aborted: isAborted
		};
	}
};
