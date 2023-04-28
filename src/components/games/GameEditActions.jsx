import Button from '../buttons/Button';
import LinkButton from '../buttons/LinkButton';
import ArrowLeftIcon from '../icons/ArrowLeftIcon';
import CloseIcon from '../icons/CloseIcon';
import PlayIcon from '../icons/PlayIcon';
import SaveIcon from '../icons/SaveIcon';
import styles from './GameEditActions.module.css';

const GameEditActions = ({ gameId, isDirty, isSubmitting, clearForm }) => {
	return (
		<div className={styles.actions}>
			<div className={styles.actions__left}>
				<LinkButton to='/games' disabled={isSubmitting}>
					<div className={styles.button__content}>
						<ArrowLeftIcon className={styles.icon} />
						<span>Go back</span>
					</div>
				</LinkButton>
			</div>
			<div className={styles.actions__right}>
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
				</div>
				<div className={styles.buttons}>
					<LinkButton to={`/games/${gameId}/play`} kind='secondary'>
						<div className={styles.button__content}>
							<PlayIcon className={styles.icon} />
							<span>Play</span>
						</div>
					</LinkButton>
				</div>
			</div>
		</div>
	);
};

export default GameEditActions;
