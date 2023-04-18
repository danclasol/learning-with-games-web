import { useParams } from 'react-router-dom';
import FindingPairsGamePlay from '../components/game-finding-pairs/play/GamePlay';
import HangmanGamePlay from '../components/game-hangman/play/GamePlay';
import QuizPlay from '../components/game-quiz/play/GamePlay';
import Loading from '../components/shared/Loading';
import { useGame } from '../lib/hooks/useGame';

const GAMES_TYPE_MAPPER = {
	'finding-pairs': FindingPairsGamePlay,
	hangman: HangmanGamePlay,
	quiz: QuizPlay
};

const GamePlayPage = () => {
	const { id } = useParams();

	const { game, loading, error } = useGame({ id });

	if (loading) {
		return <Loading label='Loading...' />;
	}

	if (error) {
		return <p>Something went wrong. Please try again later.</p>;
	}

	const GamePlayComponent = GAMES_TYPE_MAPPER[game.type];

	return <GamePlayComponent game={game} />;
};

export default GamePlayPage;
