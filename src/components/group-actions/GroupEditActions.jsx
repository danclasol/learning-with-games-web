import Button from '../buttons/Button';
import LinkButton from '../buttons/LinkButton';
import ArrowLeftIcon from '../icons/ArrowLeftIcon';
import CloseIcon from '../icons/CloseIcon';
import SaveIcon from '../icons/SaveIcon';
import styles from './GroupEditActions.module.css';

const GroupEditActions = ({ groupId, isDirty, isSubmitting, clearForm }) => {
	return (
		<div className={styles.actions}>
			<div className={styles.actions__left}>
				<LinkButton to={-1} disabled={isSubmitting}>
					<ArrowLeftIcon className={styles.icon} />
					<span>Go back</span>
				</LinkButton>
			</div>
			<div className={styles.actions__right}>
				<div className={styles.actions__buttons}>
					{isDirty && (
						<Button
							disabled={isSubmitting || !isDirty}
							onClick={() => clearForm()}
						>
							<CloseIcon className={styles.icon} />
							<span>Reset</span>
						</Button>
					)}
					<Button disabled={isSubmitting || !isDirty} type='submit' form='form'>
						<SaveIcon className={styles.icon} />
						<span>{`${isSubmitting ? 'Submitting' : 'Save'}`}</span>
					</Button>
				</div>
			</div>
		</div>
	);
};

export default GroupEditActions;
