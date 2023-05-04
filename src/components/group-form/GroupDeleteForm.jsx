import { useContext, useState } from 'react';
import { deleteGroup } from '../../lib/api/groups';
import { AuthContext } from '../../lib/context/AuthContext';
import Button from '../buttons/Button';
import styles from './GroupDeleteForm.module.css';

const GroupDeleteForm = ({ id, name, closeModal, onSuccess }) => {
	const { accessToken } = useContext(AuthContext);
	const [isSubmitting, setIsSubmitting] = useState(false);

	return (
		<div className={styles.wrapper}>
			<h3 className={styles.title}>Remove this group?</h3>
			<p className={styles.text}>{name}</p>

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

	const success = await deleteGroup({ accessToken, id });

	if (success) {
		onSuccess();
		closeModal();
	}

	setIsSubmitting(false);
};

export default GroupDeleteForm;
