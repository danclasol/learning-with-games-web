import { useContext, useState } from 'react';
import { deleteGame } from '../../lib/api/games';
import { AuthContext } from '../../lib/context/AuthContext';
import Button from '../buttons/Button';
import styles from './GameDeleteForm.module.css';

const GameDeleteForm = ({ id, title, closeModal, onSuccess }) => {
	const { accessToken } = useContext(AuthContext);
	const [isSubmitting, setIsSubmitting] = useState(false);

	return (
		<div className={styles.wrapper}>
			<h3 className={styles.title}>Remove this game?</h3>
			<p className={styles.text}>{title}</p>

			<div className={styles.actions}>
				<Button kind='secondary' onClick={closeModal} disabled={isSubmitting}>
					Cancel
				</Button>
				<Button
					disabled={isSubmitting}
					onClick={() =>
						handleSubmitForm({
							accessToken,
							id,
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
	accessToken,
	id,
	setIsSubmitting,
	closeModal,
	onSuccess
}) => {
	setIsSubmitting(true);

	const success = await deleteGame({ accessToken, id });

	if (success) {
		onSuccess();
		closeModal();
	}

	setIsSubmitting(false);
};

export default GameDeleteForm;
