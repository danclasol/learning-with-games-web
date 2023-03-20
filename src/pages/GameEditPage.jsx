import { useParams } from 'react-router-dom';
import GameEdit from '../components/finding-pairs-game/finding-pairs-game-edit/GameEdit';
import Loading from '../components/shared/Loading';
import { useGame } from '../lib/hooks/useGame';

const GameEditPage = () => {
	const { id } = useParams();

	const { game, loading, error } = useGame({ id });

	if (loading) {
		return <Loading label='Loading...' />;
	}

	if (error) {
		return <p>No existe juego</p>;
	}

	return <GameEdit game={game} />;
};

export default GameEditPage;
