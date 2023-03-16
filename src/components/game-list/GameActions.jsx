import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDropdown } from '../../lib/hooks/useDropdown';
import IconButton from '../buttons/IconButton';
import GameDeleteForm from '../game-form/GameDeleteForm';
import DotsIcon from '../icons/DotsIcon';
import PencilIcon from '../icons/PencilIcon';
import PlayIcon from '../icons/PlayIcon';
import Modal from '../shared/Modal';
import styles from './GameActions.module.css';

const GameActions = ({ game, reset }) => {
	const navigate = useNavigate();

	const { modalContent, closeModal, openDeleteModal } = useModal({
		game,
		reset
	});

	const { showDropdown, dropdownRef, toggleDropdown } = useDropdown();

	const clickEditHandler = () => {
		navigate(`/games/${game.id}/edit`);
	};

	const clickPlayHandler = () => {
		navigate(`/games/${game.id}/play`);
	};

	const toggleActionsDropdown = ev => {
		ev.stopPropagation();
		toggleDropdown();
	};

	return (
		<>
			<Modal onClose={closeModal}>{modalContent}</Modal>
			<div className={styles.actions}>
				<IconButton
					icon={PencilIcon}
					kind='secondary'
					filled
					onClick={clickEditHandler}
				/>
				<IconButton
					icon={PlayIcon}
					kind='secondary'
					filled
					onClick={clickPlayHandler}
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
					<li className={styles.list__item}>Clone Game</li>
					<li className={styles.list__item} onClick={openDeleteModal}>
						Delete
					</li>
				</ul>
			)}
		</>
	);
};

const useModal = ({ game, reset }) => {
	const [modalContent, setModalContent] = useState();

	const closeModal = () => {
		setModalContent();
	};

	const openDeleteModal = () => {
		setModalContent(
			<GameDeleteForm
				id={game.id}
				title={game.title}
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

export default GameActions;
