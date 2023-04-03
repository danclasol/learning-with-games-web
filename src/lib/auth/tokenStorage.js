export const storeAccessToken = accessToken => {
	localStorage.setItem('accessToken', accessToken);
};

export const retrieveStoredAccessToken = () => {
	return localStorage.getItem('accessToken');
};

export const deleteStoredAccessToken = () => {
	localStorage.removeItem('accessToken');
};

export const storeRefreshToken = accessToken => {
	localStorage.setItem('refreshToken', accessToken);
};

export const retrieveStoredRefreshToken = () => {
	return localStorage.getItem('refreshToken');
};

export const deleteStoredRefreshToken = () => {
	localStorage.removeItem('refreshToken');
};

export const storeExpiresIn = accessToken => {
	localStorage.setItem('expiresIn', accessToken);
};

export const retrieveStoredExpiresIn = () => {
	return localStorage.getItem('expiresIn');
};

export const deleteStoredExpiresIn = () => {
	localStorage.removeItem('expiresIn');
};
