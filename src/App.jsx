import Game from './components/game/Game.jsx';
import GAME_DATA from './game_data.json';

const App = () => {
	const games = GAME_DATA;

	return (
		<main>
			<Game game={games[0]} />
		</main>
	);
};

export default App;
