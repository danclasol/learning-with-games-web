import { useParams } from 'react-router-dom';
import Loading from '../components/shared/Loading';
import { useGame } from '../lib/hooks/useGame';

import FindingPairsEdit from '../components/game-finding-pairs/edit/GameEdit';
import HangmanGameEdit from '../components/game-hangman/edit/GameEdit';

const GAMES_TYPE_MAPPER = {
	'finding-pairs': FindingPairsEdit,
	hangman: HangmanGameEdit
};

const GameEditPage = () => {
	const { id } = useParams();

	const { game, loading, error } = useGame({ id });

	if (loading) {
		return <Loading label='Loading...' />;
	}

	if (error) {
		return <p>No existe juego</p>;
	}

	const GameEditComponent = GAMES_TYPE_MAPPER[game.type];

	return <GameEditComponent game={game} />;
};

export default GameEditPage;
