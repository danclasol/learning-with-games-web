import { useState } from 'react';
import { useDropdown } from '../../lib/hooks/useDropdown';
import IconButton from '../buttons/IconButton';
import FolderDeleteForm from '../group-folder-form/FolderDeleteForm';
import FolderEditForm from '../group-folder-form/FolderEditForm';
import DotsIcon from '../icons/DotsIcon';
import Modal from '../shared/Modal';
import styles from './GroupFolder.module.css';

const GroupFolder = ({ groupId, collectionId, name, reset, openFolder }) => {
	const { showDropdown, dropdownRef, toggleDropdown } = useDropdown();

	const { modalContent, closeModal, openUpdateModal, openDeleteModal } =
		useModal({
			groupId,
			collectionId,
			name,
			reset
		});

	return (
		<>
			<Modal onClose={closeModal}>{modalContent}</Modal>
			<div
				className={styles.card}
				onDoubleClick={() => openFolder({ id: collectionId, name })}
			>
				<img className={styles.image} src='/images/folder.svg' />
				<div className={styles.card__content}>
					<span className={styles.text}>{name}</span>

					<div className={styles.actions}>
						<IconButton icon={DotsIcon} onClick={toggleDropdown} />
					</div>
				</div>
				{showDropdown && (
					<ul
						ref={dropdownRef}
						className={styles.list}
						onClick={toggleDropdown}
					>
						<li className={styles.list__item} onClick={openUpdateModal}>
							Rename
						</li>
						<li className={styles.list__item} onClick={openDeleteModal}>
							Delete
						</li>
					</ul>
				)}
			</div>
		</>
	);
};

const useModal = ({ groupId, collectionId, name, reset }) => {
	const [modalContent, setModalContent] = useState();

	const closeModal = () => {
		setModalContent();
	};

	const openUpdateModal = () => {
		setModalContent(
			<FolderEditForm
				groupId={groupId}
				collectionId={collectionId}
				name={name}
				closeModal={closeModal}
				onSuccess={reset}
			/>
		);
	};

	const openDeleteModal = () => {
		setModalContent(
			<FolderDeleteForm
				groupId={groupId}
				collectionId={collectionId}
				name={name}
				closeModal={closeModal}
				onSuccess={reset}
			/>
		);
	};

	return {
		modalContent,
		closeModal,
		openUpdateModal,
		openDeleteModal
	};
};

export default GroupFolder;
