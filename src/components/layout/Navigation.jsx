import { Navigate, Route, Routes } from 'react-router-dom';
import GameEditPage from '../../pages/GameEditPage';
import GamePlayPage from '../../pages/GamePlayPage';
import GamesListPage from '../../pages/GamesListPage';
import HomePage from '../../pages/HomePage';

const Navigation = () => {
	return (
		<Routes>
			<Route path='/' element={<HomePage />} />
			<Route path='/games' element={<GamesListPage />} />
			<Route path='/games/:id/edit' element={<GameEditPage />} />
			<Route path='/games/:id/play' element={<GamePlayPage />} />
			<Route path='*' element={<Navigate to='/games' />} />
		</Routes>
	);
};

export default Navigation;
