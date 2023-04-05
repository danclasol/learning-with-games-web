import { API_URL, API_VERSION } from './api-settings';

const path = 'auth';

export const loginRequest = async ({ email, password }) => {
	const request = `${API_URL}/${API_VERSION}/${path}/login`;

	let auth, error;

	try {
		const res = await fetch(request, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email, password })
		});

		auth = await res.json();

		if (!res.ok) {
			error = { code: res.status, message: auth.error };
		}

		return {
			auth,
			error,
			aborted: false
		};
	} catch (err) {
		const isAborted = err.name === 'AbortError';
		const error = isAborted
			? undefined
			: { code: 500, message: 'Error server' };

		return {
			auth: undefined,
			error,
			aborted: isAborted
		};
	}
};

export const registerRequest = async ({ name, email, password }) => {
	const request = `${API_URL}/${API_VERSION}/${path}/register`;

	let auth;
	let error;

	try {
		const res = await fetch(request, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ name, email, password })
		});

		auth = await res.json();

		if (!res.ok) {
			error = { code: res.status, message: auth.error };
		}

		return {
			auth,
			error,
			aborted: false
		};
	} catch (err) {
		const isAborted = err.name === 'AbortError';
		const error = isAborted
			? undefined
			: { code: 500, message: 'Error server' };

		return {
			auth: undefined,
			error,
			aborted: isAborted
		};
	}
};
