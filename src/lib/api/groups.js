import { SORT_GROUPS_OPTIONS } from '../../constants/sortGroupsOptions';
import { API_URL, API_VERSION } from './api-settings';

const path = 'groups';

const SORT_MAPPER = {
	[SORT_GROUPS_OPTIONS.BY_DATE_ASC]: ['creationDate', 'asc'],
	[SORT_GROUPS_OPTIONS.BY_DATE_DESC]: ['creationDate', 'desc'],
	[SORT_GROUPS_OPTIONS.BY_TITLE]: ['title', 'asc']
};

export const getUserGroups = async ({ accessToken, filters, signal }) => {
	const request = `${API_URL}/${API_VERSION}/${path}`;
	const url = new URL(request);

	if (filters.page && filters.itemsPerPage) {
		url.searchParams.append('page', filters.page);
		url.searchParams.append('limit', filters.itemsPerPage);
	}

	if (filters.search) {
		url.searchParams.append('name', filters.search);
	}

	const sortProps = SORT_MAPPER[filters.sortBy];

	if (sortProps) {
		const [sort, order] = sortProps;
		url.searchParams.append('sort', sort);
		url.searchParams.append('order', order);
	}

	let groups;

	try {
		const res = await fetch(
			url,
			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + accessToken
				}
			},
			{ signal }
		);

		if (res.ok) {
			groups = await res.json();
		}

		return {
			groups,
			count: res.ok ? res.headers.get('total-count') : 0,
			error: !res.ok,
			aborted: false
		};
	} catch (err) {
		const isAborted = err.name === 'AbortError';
		const error = isAborted
			? undefined
			: { code: 500, message: 'Error server' };

		return {
			games: undefined,
			count: 0,
			error,
			aborted: isAborted
		};
	}
};

export const getGroup = async ({ accessToken, id, signal }) => {
	const request = `${API_URL}/${API_VERSION}/${path}/${id}`;

	let group;

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
			group = await res.json();
		}

		return {
			group,
			error: !res.ok,
			aborted: false
		};
	} catch (err) {
		const isAborted = err.name === 'AbortError';
		const error = isAborted
			? undefined
			: { code: 500, message: 'Error server' };

		return {
			group: undefined,
			error,
			aborted: isAborted
		};
	}
};

export const createGroup = async ({ accessToken, group }) => {
	const request = `${API_URL}/${API_VERSION}/${path}/`;

	let groupCreated;

	try {
		const res = await fetch(request, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + accessToken
			},
			body: JSON.stringify({ id: crypto.randomUUID(), ...group })
		});

		if (res.ok) {
			groupCreated = await res.json();
		}

		return groupCreated;
	} catch {
		return groupCreated;
	}
};

export const cloneGroup = async ({ accessToken, id, group }) => {
	const request = `${API_URL}/${API_VERSION}/${path}/${id}/clone`;

	let groupCreated;

	try {
		const res = await fetch(request, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + accessToken
			},
			body: JSON.stringify({ idOld: id, idNew: crypto.randomUUID(), ...group })
		});

		if (res.ok) {
			groupCreated = await res.json();
		}

		return groupCreated;
	} catch {
		return groupCreated;
	}
};

export const updateGroup = async ({ accessToken, id, group }) => {
	const request = `${API_URL}/${API_VERSION}/${path}/${id}`;

	try {
		const res = await fetch(request, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + accessToken
			},
			body: JSON.stringify(group)
		});

		return res.ok;
	} catch {
		return false;
	}
};

export const deleteGroup = async ({ accessToken, id }) => {
	const request = `${API_URL}/${API_VERSION}/${path}/${id}`;

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
