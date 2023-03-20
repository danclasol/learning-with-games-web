import { useState } from 'react';
import { deletePairFromGame } from '../../../lib/api/finding-pairs-games';
import Button from '../../buttons/Button';
import styles from './FindingPairsGameDeleteForm.module.css';

const FindingPairsGameDeleteForm = ({
	id,
	text,
	gameId,
	closeModal,
	onSuccess
}) => {
	const [isSubmitting, setIsSubmitting] = useState(false);

	return (
		<div className={styles.form}>
			<p className={styles.title}>Remove this card?</p>
			<p className={styles.text}>{text}</p>

			<div className={styles.actions}>
				<Button kind='secondary' onClick={closeModal} disabled={isSubmitting}>
					Cancelar
				</Button>
				<Button
					disabled={isSubmitting}
					onClick={() =>
						handleSubmitForm({
							id,
							gameId,
							setIsSubmitting,
							closeModal,
							onSuccess
						})
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
	gameId,
	setIsSubmitting,
	closeModal,
	onSuccess
}) => {
	setIsSubmitting(true);

	const success = await deletePairFromGame({ id, gameId });

	if (success) {
		// onSuccess();
		closeModal();
	}

	setIsSubmitting(false);
};

export default FindingPairsGameDeleteForm;
