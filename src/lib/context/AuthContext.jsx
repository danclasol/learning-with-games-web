import { createContext } from 'react';
import { useAuth } from '../hooks/useAuth';

export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
	const [accessToken, user, login, logout] = useAuth();

	return (
		<AuthContext.Provider
			value={{
				accessToken,
				user,
				login,
				logout
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}
