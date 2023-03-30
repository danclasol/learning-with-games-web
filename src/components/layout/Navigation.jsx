import { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthContext } from '../../lib/context/AuthContext';
import LoginPage from '../../pages/auth/LoginPage';
import RegisterPage from '../../pages/auth/RegisterPage';
import GameEditPage from '../../pages/GameEditPage';
import GamePlayPage from '../../pages/GamePlayPage';
import GamesListPage from '../../pages/GamesListPage';
import HomePage from '../../pages/HomePage';

const Navigation = ({ authenticated }) => {
	const { accessToken } = useContext(AuthContext);

	if (!accessToken)
		return (
			<Routes>
				<Route path='/login' element={<LoginPage />} />
				<Route path='/register' element={<RegisterPage />} />
				<Route path='*' element={<Navigate to='/login' />} />
			</Routes>
		);

	if (accessToken) {
		return (
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/games' element={<GamesListPage />} />
				<Route path='/games/:id/edit' element={<GameEditPage />} />
				<Route path='/games/:id/play' element={<GamePlayPage />} />
				<Route path='*' element={<Navigate to='/games' />} />
			</Routes>
		);
	}
};

export default Navigation;
