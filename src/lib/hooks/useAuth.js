import { useEffect, useState } from 'react';
import { getCurrentUser } from '../api/users';
import {
	deleteStoredAccessToken,
	deleteStoredExpiresIn,
	deleteStoredRefreshToken,
	retrieveStoredAccessToken,
	retrieveStoredExpiresIn,
	retrieveStoredRefreshToken,
	storeAccessToken
} from '../auth/tokenStorage';

export const useAuth = () => {
	const [user, setUser] = useState({});
	const [accessToken, setAccessToken] = useState(retrieveStoredAccessToken);
	const [refreshToken, setRefreshToken] = useState(retrieveStoredRefreshToken);
	const [expiresIn, setExpiresIn] = useState(retrieveStoredExpiresIn);

	const login = ({ auth }) => {
		const { accessToken, user } = auth;

		setAccessToken(accessToken);
		storeAccessToken(accessToken);

		setUser(user);
	};

	const logout = () => {
		setAccessToken(null);
		deleteStoredAccessToken();
		deleteStoredRefreshToken();
		deleteStoredExpiresIn();
	};

	useEffect(() => {
		if (!accessToken) return;

		const controller = new AbortController();

		loadCurrentUser({ accessToken, setUser, signal: controller.signal });

		return () => {
			controller.abort();
		};
	}, [accessToken]);

	return [accessToken, user, login, logout];
};

const loadCurrentUser = async ({ accessToken, setUser, signal }) => {
	const { user, aborted } = await getCurrentUser({ accessToken, signal });

	if (aborted) return;

	if (user) {
		setUser(user);
	}
};
