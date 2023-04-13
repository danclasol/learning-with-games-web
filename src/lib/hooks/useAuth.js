import { useEffect, useState } from 'react';
import { getCurrentUser } from '../api/users';
import {
	deleteStoredAccessToken,
	deleteStoredExpiresIn,
	deleteStoredRefreshToken,
	retrieveStoredAccessToken,
	storeAccessToken
} from '../auth/tokenStorage';

export const useAuth = () => {
	const [user, setUser] = useState({});
	const [accessToken, setAccessToken] = useState(retrieveStoredAccessToken);
	// const [refreshToken, setRefreshToken] = useState(retrieveStoredRefreshToken);
	// const [expiresIn, setExpiresIn] = useState(retrieveStoredExpiresIn);

	const login = ({ auth }) => {
		if (!auth) return;

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

		if (user?.id) return;

		const controller = new AbortController();

		loadCurrentUser({
			accessToken,
			logout,
			setUser,
			signal: controller.signal
		});

		return () => {
			controller.abort();
		};
	}, [accessToken, user?.id]);

	return [accessToken, user, login, logout];
};

const loadCurrentUser = async ({ accessToken, logout, setUser, signal }) => {
	const { user, aborted, error } = await getCurrentUser({
		accessToken,
		signal
	});

	if (error) logout();

	if (aborted) return;

	if (user) {
		setUser(user);
	}
};
