import { useNavigate } from 'react-router-dom';
import { prepareCards } from '../../../lib/games/findingPairs';
import Button from '../../buttons/Button';
import ArrowLeftIcon from '../../icons/ArrowLeftIcon';
import RefreshIcon from '../../icons/RefreshIcon';
import Deck from './Deck';
import styles from './GamePlay.module.css';

const GamePlay = ({ game }) => {
	const navigate = useNavigate();
	const pairsSuffled = prepareCards(game?.pairs);

	const handleClickReset = () => {
		navigate(`/games/${game.id}/play`);
	};

	const handleClicGoBack = () => {
		navigate('/games/');
	};

	return (
		<section className={styles.container}>
			<div className={styles.actions}>
				<div className={styles.actions__buttons}>
					<Button onClick={handleClicGoBack}>
						<div className={styles.button__content}>
							<ArrowLeftIcon className={styles.icon} />
							<span>Go back</span>
						</div>
					</Button>
				</div>
				<div className={styles.actions__buttons}>
					<Button onClick={handleClickReset} kind='secondary'>
						<div className={styles.button__content}>
							<RefreshIcon className={styles.icon} />
							<span>Reset</span>
						</div>
					</Button>
				</div>
			</div>

			<h1 className={styles.title}>{game.title}</h1>
			<Deck pairsInit={pairsSuffled} />
		</section>
	);
};

export default GamePlay;
