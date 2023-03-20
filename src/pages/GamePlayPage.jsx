import { useParams } from 'react-router-dom';
import GamePlay from '../components/finding-pairs-game/finding-pairs-game-play/GamePlay';

const GamePlayPage = () => {
	const { id } = useParams();

	return <GamePlay id={id} />;
};

export default GamePlayPage;
