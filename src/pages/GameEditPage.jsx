import { useParams } from 'react-router-dom';
import Loading from '../components/shared/Loading';
import { useGame } from '../lib/hooks/useGame';

import FindingPairsEdit from '../components/game-finding-pairs/edit/GameEdit';
import HangmanGameEdit from '../components/game-hangman/edit/GameEdit';
import QuizGameEdit from '../components/game-quiz/edit/GameEdit';

const GAMES_TYPE_MAPPER = {
	'finding-pairs': FindingPairsEdit,
	hangman: HangmanGameEdit,
	quiz: QuizGameEdit
};

const GameEditPage = () => {
	const { id } = useParams();

	const { game, loading, error } = useGame({ id });

	if (loading) {
		return <Loading label='Loading...' />;
	}

	// console.log({ error });

	if (error) {
		// if (error === 404)
		return <p>Something went wrong. Please try again later.</p>;
	}

	const GameEditComponent = GAMES_TYPE_MAPPER[game.type];

	return <GameEditComponent game={game} />;
};

export default GameEditPage;
