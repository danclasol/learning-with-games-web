import { useState } from 'react';
import { IMAGES_GAMES_TYPES, getTypeNameGame } from '../../constants/games';
import IconButton from '../buttons/IconButton';
import LinkIconButton from '../buttons/LinkIconButton';
import InputImage from '../forms/InputImage';
import GameEditForm from '../game-form/GameEditForm';
import PencilIcon from '../icons/PencilIcon';
import PlayIcon from '../icons/PlayIcon';
import Modal from '../shared/Modal';
import styles from './GameInfo.module.css';

const GameInfo = ({ game, refresh }) => {
	const { modalContent, closeModal, openEditModal } = useModalGame({
		id: game.id,
		game,
		refresh
	});

	return (
		<>
			<Modal onClose={closeModal}>{modalContent}</Modal>
			<div className={styles.info}>
				<div className={styles.info__image}>
					<InputImage
						image={game.image || IMAGES_GAMES_TYPES[game.type]}
						className={styles.image}
					/>
				</div>

				<div className={styles.info__text}>
					<h2 className={styles.title}>{game.title}</h2>
					<div className={styles.tags}>
						<span className={styles.type}>{getTypeNameGame(game.type)}</span>
						{game?.groupId && (
							<span className={styles.group}>{game?.group}</span>
						)}
					</div>
				</div>
				<div className={styles.actions}>
					<IconButton
						icon={PencilIcon}
						filled
						className={styles.icon__edit}
						onClick={openEditModal}
					/>
					<LinkIconButton
						icon={PlayIcon}
						filled
						kind='secondary'
						className={styles.icon__play}
						to={`/games/${game.id}/play`}
					/>
				</div>
			</div>
		</>
	);
};

const useModalGame = ({ id, game, refresh }) => {
	const [modalContent, setModalContent] = useState();

	const closeModal = () => {
		setModalContent();
	};

	const openEditModal = () => {
		setModalContent(
			<GameEditForm
				closeModal={closeModal}
				refresh={refresh}
				id={id}
				game={game}
			/>
		);
	};

	return {
		modalContent,
		closeModal,
		openEditModal
	};
};

export default GameInfo;
