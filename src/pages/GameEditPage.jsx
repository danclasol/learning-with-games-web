import { useParams } from 'react-router-dom';
import GameEdit from '../components/game-edit/GameEdit';

const GameEditPage = () => {
	const { id } = useParams();

	return <GameEdit id={id} />;
};

export default GameEditPage;
