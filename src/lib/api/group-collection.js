import { API_URL, API_VERSION } from './api-settings';

const path = 'groups';

export const createFolder = async ({
	accessToken,
	groupId,
	parentId,
	name
}) => {
	const request = `${API_URL}/${API_VERSION}/${path}/${groupId}/folders`;

	let groupCreated;

	try {
		const res = await fetch(request, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + accessToken
			},
			body: JSON.stringify({ id: crypto.randomUUID(), name, parentId })
		});

		if (res.ok) {
			groupCreated = await res.json();
		}

		return groupCreated;
	} catch {
		return groupCreated;
	}
};

export const updateFolder = async ({
	accessToken,
	groupId,
	name,
	collectionId
}) => {
	const request = `${API_URL}/${API_VERSION}/${path}/${groupId}/folders/${collectionId}`;

	try {
		const res = await fetch(request, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + accessToken
			},
			body: JSON.stringify({ name })
		});

		return res.ok;
	} catch {
		return false;
	}
};

export const deleteFolder = async ({ accessToken, groupId, collectionId }) => {
	const request = `${API_URL}/${API_VERSION}/${path}/${groupId}/folders/${collectionId}`;

	try {
		const res = await fetch(request, {
			method: 'DELETE',
			headers: {
				Authorization: 'Bearer ' + accessToken
			}
		});

		return res.ok;
	} catch {
		return false;
	}
};
