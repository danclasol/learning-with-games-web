import { useContext, useState } from 'react';
import { deleteFolder } from '../../lib/api/group-collection';
import { AuthContext } from '../../lib/context/AuthContext';
import Button from '../buttons/Button';
import styles from './FolderDeleteForm.module.css';

const FolderDeleteForm = ({
	groupId,
	collectionId,
	name,
	closeModal,
	onSuccess
}) => {
	const { accessToken } = useContext(AuthContext);
	const [isSubmitting, setIsSubmitting] = useState(false);

	return (
		<div className={styles.wrapper}>
			<h3 className={styles.title}>Remove this folder?</h3>
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
							groupId,
							collectionId,
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
	groupId,
	collectionId,
	setIsSubmitting,
	closeModal,
	onSuccess
}) => {
	setIsSubmitting(true);

	const success = await deleteFolder({ accessToken, groupId, collectionId });

	if (success) {
		onSuccess();
		closeModal();
	}

	setIsSubmitting(false);
};

export default FolderDeleteForm;
