import { useState } from 'react';
import { deleteGame } from '../../lib/api/games';
import Button from '../buttons/Button';
import styles from './GameDeleteForm.module.css';

const GameDeleteForm = ({ id, title, closeModal, onSuccess }) => {
	const [isSubmitting, setIsSubmitting] = useState(false);

	return (
		<div className={styles.form}>
			<p className={styles.text}>Remove this game?</p>
			<p className={styles.title}>{title}</p>

			<div className={styles.actions}>
				<Button kind='secondary' onClick={closeModal} disabled={isSubmitting}>
					Cancelar
				</Button>
				<Button
					disabled={isSubmitting}
					onClick={() =>
						handleSubmitForm({ id, setIsSubmitting, closeModal, onSuccess })
					}
				>
					{isSubmitting ? 'Deleting...' : 'Delete'}
				</Button>
			</div>
		</div>
	);
};

const handleSubmitForm = async ({
	id,
	setIsSubmitting,
	closeModal,
	onSuccess
}) => {
	setIsSubmitting(true);

	const success = await deleteGame({ id });

	if (success) {
		onSuccess();
		closeModal();
	}

	setIsSubmitting(false);
};

export default GameDeleteForm;
