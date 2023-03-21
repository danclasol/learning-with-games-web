import confetti from 'canvas-confetti';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../buttons/Button';
import styles from './FinishedGame.module.css';

const FinishedGame = ({ numberMovs = 0, closeModal, reset }) => {
	const navigate = useNavigate();

	const isWinner = numberMovs !== 0;

	useEffect(() => {
		if (!isWinner) return;

		confetti({
			particleCount: 250,
			spread: 360
		});
	}, []);

	const restart = () => {
		confetti.reset();
		reset();
		closeModal();
	};

	const handleClickGoBack = () => {
		confetti.reset();
		navigate(`/games/`);
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles.container}>
				<h3 className={styles.title}>{`${
					isWinner ? 'Congratulations!!' : 'Game over'
				}`}</h3>
				{isWinner && (
					<div className={styles.stats}>
						<p className={styles.text}>Tries left: {numberMovs}</p>
					</div>
				)}
			</div>
			<div className={styles.actions}>
				<Button onClick={restart}>Restart Game</Button>
				<Button kind='secondary' onClick={handleClickGoBack}>
					Go back
				</Button>
			</div>
		</div>
	);
};

export default FinishedGame;
