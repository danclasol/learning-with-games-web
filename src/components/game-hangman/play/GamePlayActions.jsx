import { useNavigate } from 'react-router-dom';
import Button from '../../buttons/Button';
import ArrowLeftIcon from '../../icons/ArrowLeftIcon';
import RefreshIcon from '../../icons/RefreshIcon';
import styles from './GamePlayActions.module.css';

const GamePlayActions = ({ resetGame }) => {
	const navigate = useNavigate();

	const handleClicGoBack = () => {
		navigate('/games/');
	};

	return (
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
				<Button onClick={resetGame} kind='secondary'>
					<div className={styles.button__content}>
						<RefreshIcon className={styles.icon} />
						<span>Reset</span>
					</div>
				</Button>
			</div>
		</div>
	);
};

export default GamePlayActions;
