import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { udpatePairGame } from '../../../lib/api/finding-pairs-games';
import IconButton from '../../buttons/IconButton';
import InputText from '../../forms/InputText';
import CloseIcon from '../../icons/CloseIcon';
import PencilIcon from '../../icons/PencilIcon';
import TrashIcon from '../../icons/TrashIcon';
import SaveIcon from '../../icons/TrashIcon copy';
import Modal from '../../shared/Modal';
import FindingPairsGameDeleteForm from '../finding-pairs-game-form/FindingPairsGameDeleteForm';
import styles from './CardEdit.module.css';

const CardEdit = ({ id, text, image, gameId }) => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm({
		defaultValues: { id, text, image }
	});

	const { modalContent, closeModal, openDeleteModal } = useModal({
		id,
		text,
		gameId
	});

	const [isEditing, setIsEditing] = useState(false);

	const toggleIsEditing = () => {
		setIsEditing(!isEditing);
	};

	return (
		<>
			<Modal onClose={closeModal}>{modalContent}</Modal>
			<div className={styles.card}>
				<img className={styles.card__image} src={image} />

				<form
					className={styles.form}
					onSubmit={handleSubmit(data => {
						handleSubmitForm({ id, data, gameId, setIsSubmitting });
					})}
				>
					<div className={styles.form__fields}>
						<div className={styles.form__field}>
							<InputText
								name='text'
								label='Text'
								placeholder='Text'
								register={register}
								error={errors.title?.message}
								disabled={!isEditing}
							/>
						</div>
						<div className={styles.form__field}>
							<InputText
								name='image'
								label='Image'
								placeholder='Image'
								register={register}
								error={errors.title?.message}
								disabled={!isEditing}
							/>
						</div>
					</div>
					<div className={styles.actions}>
						{!isEditing && (
							<>
								<IconButton
									icon={PencilIcon}
									filled
									size='large'
									disabled={isSubmitting}
									onClick={toggleIsEditing}
								/>
								<IconButton
									icon={TrashIcon}
									filled
									size='large'
									kind='secondary'
									disabled={isSubmitting}
									onClick={openDeleteModal}
								/>
							</>
						)}
						{isEditing && (
							<>
								<IconButton icon={SaveIcon} filled size='large' type='submit' />
								<IconButton
									icon={CloseIcon}
									filled
									size='large'
									kind='secondary'
									onClick={toggleIsEditing}
								/>
							</>
						)}
					</div>
				</form>
			</div>
		</>
	);
};

const handleSubmitForm = async ({ id, data, gameId, setIsSubmitting }) => {
	console.log({ id, data, gameId, setIsSubmitting });

	setIsSubmitting(true);

	const success = await udpatePairGame({
		id,
		gameId,
		...data
	});

	if (success) {
		setIsSubmitting(false);
	}
};

const useModal = ({ id, text, gameId, reset }) => {
	const [modalContent, setModalContent] = useState();

	const closeModal = () => {
		setModalContent();
	};

	const openDeleteModal = () => {
		setModalContent(
			<FindingPairsGameDeleteForm
				id={id}
				gameId={gameId}
				text={text}
				closeModal={closeModal}
				onSuccess={reset}
			/>
		);
	};

	return {
		modalContent,
		closeModal,
		openDeleteModal
	};
};

export default CardEdit;
