import { useState } from 'react';
import IconButton from '../buttons/IconButton';
import InputImage from '../forms/InputImage';
import GroupEditForm from '../group-form/GroupEditForm';
import PencilIcon from '../icons/PencilIcon';
import Modal from '../shared/Modal';
import styles from './GroupEdit.module.css';
import GroupFolderList from './GroupFolderList';

const GroupEdit = ({ group, refresh }) => {
	const { modalContent, closeModal, openEditModal } = useModalGroup({
		id: group.id,
		group,
		refresh
	});

	return (
		<>
			<Modal onClose={closeModal}>{modalContent}</Modal>
			<section className={styles.group}>
				<div className={styles.info}>
					<div className={styles.info__image}>
						<InputImage
							image={group?.image || '/images/group.svg'}
							className={styles.image}
						/>
					</div>

					<div className={styles.info__text}>
						<h2 className={styles.name}>{group.name}</h2>
						<div className={styles.tags}>
							{group.level && (
								<span className={styles.level}>{`${group.level}`}</span>
							)}
							{group.course && (
								<span className={styles.course}>{`${group.course}`}</span>
							)}
						</div>
					</div>
					<div className={styles.actions}>
						<IconButton icon={PencilIcon} filled onClick={openEditModal} />
					</div>
				</div>
				<GroupFolderList
					groupId={group.id}
					foldersInit={group?.collections}
					reset={refresh}
				/>
			</section>
		</>
	);
};

const useModalGroup = ({ id, group, refresh }) => {
	const [modalContent, setModalContent] = useState();

	const closeModal = () => {
		setModalContent();
	};

	const openEditModal = () => {
		setModalContent(
			<GroupEditForm
				closeModal={closeModal}
				refresh={refresh}
				id={id}
				group={group}
			/>
		);
	};

	return {
		modalContent,
		closeModal,
		openEditModal
	};
};

export default GroupEdit;
