import { useNavigate } from 'react-router-dom';
import Button from '../buttons/Button';
import ArrowLeftIcon from '../icons/ArrowLeftIcon';
import CloseIcon from '../icons/CloseIcon';
import PlayIcon from '../icons/PlayIcon';
import SaveIcon from '../icons/SaveIcon';
import styles from './GameEditActions.module.css';

const GameEditActions = ({ gameId, isDirty, isSubmitting, clearForm }) => {
	const navigate = useNavigate();

	return (
		<div className={styles.actions}>
			<div className={styles.actions__buttons}>
				<Button
					onClick={() => {
						navigate(-1);
					}}
					disabled={isSubmitting}
				>
					<div className={styles.button__content}>
						<ArrowLeftIcon className={styles.icon} />
						<span>Go back</span>
					</div>
				</Button>
			</div>
			<div className={styles.actions__buttons}>
				{isDirty && (
					<Button
						disabled={isSubmitting || !isDirty}
						onClick={() => clearForm()}
					>
						<div className={styles.button__content}>
							<CloseIcon className={styles.icon} />
							<span>Reset</span>
						</div>
					</Button>
				)}
				<Button disabled={isSubmitting || !isDirty} type='submit' form='form'>
					<div className={styles.button__content}>
						<SaveIcon className={styles.icon} />
						<span>{`${isSubmitting ? 'Submitting' : 'Save'}`}</span>
					</div>
				</Button>
				<Button
					kind='secondary'
					onClick={() => navigate(`/games/${gameId}/play`)}
					disabled={isSubmitting}
				>
					<div className={styles.button__content}>
						<PlayIcon className={styles.icon} />
						<span>Play</span>
					</div>
				</Button>
			</div>
		</div>
	);
};

export default GameEditActions;
