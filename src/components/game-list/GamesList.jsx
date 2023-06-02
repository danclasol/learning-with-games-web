import { useState } from 'react';
import { useGames } from '../../lib/hooks/useGames.js';
import { useGamesFilters } from '../../lib/hooks/useGamesFilters.js';
import Button from '../buttons/Button.jsx';
import GameCreateForm from '../game-form/GameCreateForm.jsx';
import GameIcon from '../icons/GameIcon.jsx';
import Modal from '../shared/Modal.jsx';
import styles from './GamesList.module.css';
import GamesFilters from './GamesListFilters.jsx';
import GamesListRows from './GamesListRows.jsx';
import PageSelector from './PageSelector.jsx';

const GamesList = ({ groupId }) => {
	const { filters, setSearch, setType, setSortBy, setPage, resetFilters } =
		useGamesFilters();

	const { games, count, error, loading, refresh } = useGames({
		groupId,
		filters
	});

	const { modalContent, closeModal, openCreateModal } = useModal({
		groupId,
		refresh
	});

	return (
		<>
			<Modal onClose={closeModal}>{modalContent}</Modal>
			<section className={styles.container}>
				<h2 className={styles.title}>Games</h2>
				<div className={styles.games__header}>
					<GamesFilters
						search={filters.search}
						type={filters.type}
						sortBy={filters.sortBy}
						setSearch={setSearch}
						setType={setType}
						setSortBy={setSortBy}
						reset={resetFilters}
						groupId={groupId}
					/>
					<div className={styles.actions}>
						<Button onClick={openCreateModal} icon={GameIcon}>
							Create game
						</Button>
					</div>
				</div>
				<div className={styles.games__list}>
					<GamesListRows
						games={games}
						error={error}
						loading={loading}
						reset={resetFilters}
						groupId={groupId}
					/>
					{games.length !== 0 && (
						<PageSelector
							page={filters.page}
							totalPages={Math.ceil(count / filters.itemsPerPage)}
							setPage={newPage => setPage(newPage)}
						/>
					)}
				</div>
			</section>
		</>
	);
};

const useModal = ({ groupId, collectionId, refresh }) => {
	const [modalContent, setModalContent] = useState();

	const closeModal = () => {
		setModalContent();
	};

	const openCreateModal = () => {
		setModalContent(
			<GameCreateForm
				closeModal={closeModal}
				onSuccess={refresh}
				groupId={groupId}
				collectionId={collectionId}
			/>
		);
	};

	return {
		modalContent,
		closeModal,
		openCreateModal
	};
};

export default GamesList;
