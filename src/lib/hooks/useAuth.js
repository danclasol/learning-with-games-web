import { useState } from 'react';

const fakeUser = {
	id: 'f868159d-45f5-4c57-b53b-11f8a8e45aa6',
	username: 'daniel@gmail.com',
	name: 'Daniel',
	avatar: 'https://www.w3schools.com/howto/img_avatar.png'
};

const fakeToken = 'FAKE_TOKEN';

export const useAuth = () => {
	const [user, setUser] = useState(fakeUser);
	const [accessToken, setAccessToken] = useState();
	const [refreshToken, setRefreshToken] = useState();
	const [expiresIn, setExpiresIn] = useState();

	const login = () => {
		setAccessToken('TOKEN');
		setUser(fakeUser);
	};

	const logout = () => {
		setAccessToken(null);
	};

	return [accessToken, user, login, logout];
};
