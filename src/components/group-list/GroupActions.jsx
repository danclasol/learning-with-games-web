import { useState } from 'react';
import { useDropdown } from '../../lib/hooks/useDropdown';
import IconButton from '../buttons/IconButton';
import LinkIconButton from '../buttons/LinkIconButton';
import GroupCloneForm from '../group-form/GroupCloneForm';
import GroupDeleteForm from '../group-form/GroupDeleteForm';
import DotsIcon from '../icons/DotsIcon';
import PencilIcon from '../icons/PencilIcon';
import Modal from '../shared/Modal';
import styles from './GroupActions.module.css';

const GroupActions = ({ group, reset }) => {
	const { modalContent, closeModal, openCloneModal, openDeleteModal } =
		useModal({
			group,
			reset
		});

	const { showDropdown, dropdownRef, toggleDropdown } = useDropdown();

	const toggleActionsDropdown = ev => {
		ev.stopPropagation();
		toggleDropdown();
	};

	return (
		<>
			<Modal onClose={closeModal}>{modalContent}</Modal>
			<div className={styles.actions}>
				<LinkIconButton
					icon={PencilIcon}
					kind='secondary'
					filled
					to={`/groups/${group.id}`}
				/>
				<IconButton
					icon={DotsIcon}
					kind='secondary'
					filled
					onClick={toggleActionsDropdown}
				/>
			</div>
			{showDropdown && (
				<ul
					ref={dropdownRef}
					className={styles.list}
					onClick={toggleActionsDropdown}
				>
					<li className={styles.list__item} onClick={openCloneModal}>
						Clone
					</li>
					<li className={styles.list__item} onClick={openDeleteModal}>
						Delete
					</li>
				</ul>
			)}
		</>
	);
};

const useModal = ({ group, reset }) => {
	const [modalContent, setModalContent] = useState();

	const closeModal = () => {
		setModalContent();
	};

	const openCloneModal = () => {
		setModalContent(
			<GroupCloneForm
				id={group.id}
				group={group}
				closeModal={closeModal}
				onSuccess={reset}
			/>
		);
	};

	const openDeleteModal = () => {
		setModalContent(
			<GroupDeleteForm
				id={group.id}
				name={group.name}
				closeModal={closeModal}
				onSuccess={reset}
			/>
		);
	};

	return {
		modalContent,
		closeModal,
		openCloneModal,
		openDeleteModal
	};
};

export default GroupActions;
