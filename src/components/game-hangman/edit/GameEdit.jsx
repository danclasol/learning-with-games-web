import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../buttons/Button';
import ArrowLeftIcon from '../../icons/ArrowLeftIcon';
import PlayIcon from '../../icons/PlayIcon';
import SaveIcon from '../../icons/SaveIcon';
import styles from './GameEdit.module.css';

const GameEdit = ({ game }) => {
	const navigate = useNavigate();

	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleClickPlay = () => {
		navigate(`/games/${game.id}/play`);
	};

	const handleClicGoBack = () => {
		navigate('/games/');
	};

	return (
		<section className={styles.content}>
			<div className={styles.actions}>
				<div className={styles.actions__buttons}>
					<Button onClick={handleClicGoBack} disabled={isSubmitting}>
						<div className={styles.button__content}>
							<ArrowLeftIcon className={styles.icon} />
							<span>Go back</span>
						</div>
					</Button>
				</div>
				<div className={styles.actions__buttons}>
					<Button onClick={handleClickPlay} disabled={isSubmitting}>
						<div className={styles.button__content}>
							<SaveIcon className={styles.icon} />
							<span>{`${isSubmitting ? 'Submitting' : 'Save'}`}</span>
						</div>
					</Button>
					<Button
						kind='secondary'
						onClick={handleClickPlay}
						disabled={isSubmitting}
					>
						<div className={styles.button__content}>
							<PlayIcon className={styles.icon} />
							<span>Play</span>
						</div>
					</Button>
				</div>
			</div>
			<h2>Edit Hangman</h2>
		</section>
	);
};

export default GameEdit;
