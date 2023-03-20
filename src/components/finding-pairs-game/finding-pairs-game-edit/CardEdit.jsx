import { useState } from 'react';
import { useForm } from 'react-hook-form';
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
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm({
		defaultValues: { id, text, gameId }
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

				<form className={styles.form}>
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
				</form>
				<div className={styles.actions}>
					{!isEditing && (
						<>
							<IconButton
								icon={!isEditing ? PencilIcon : SaveIcon}
								filled
								size='large'
								onClick={toggleIsEditing}
							/>
							<IconButton
								icon={TrashIcon}
								filled
								size='large'
								kind='secondary'
								onClick={openDeleteModal}
							/>
						</>
					)}
					{isEditing && (
						<>
							<IconButton
								icon={!isEditing ? PencilIcon : SaveIcon}
								filled
								size='large'
								onClick={toggleIsEditing}
							/>
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
			</div>
		</>
	);
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
