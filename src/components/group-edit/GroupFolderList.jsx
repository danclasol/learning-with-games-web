import { useState } from 'react';
import { useGames } from '../../lib/hooks/useGames';
import { useGamesFilters } from '../../lib/hooks/useGamesFilters';
import Button from '../buttons/Button';
import GameCreateForm from '../game-form/GameCreateForm';
import GamesListRows from '../game-list/GamesListRows';
import PageSelector from '../game-list/PageSelector';
import FolderCreateForm from '../group-folder-form/FolderCreateForm';
import FolderAddIcon from '../icons/FolderAddIcon';
import GameIcon from '../icons/GameIcon';
import Modal from '../shared/Modal';
import styles from './GroupFolderList.module.css';
import GroupFolderListRows from './GroupFolderListRows';
import PathFolder from './PathFolder';

const GroupFolderList = ({ groupId, foldersInit = [], reset }) => {
	const [path, setPath] = useState([]);
	const [parentId, setParentId] = useState();
	const { filters, setSearch, setType, setSortBy, setPage, resetFilters } =
		useGamesFilters();

	const {
		games,
		count,
		error,
		loading,
		refresh: refreshGames
	} = useGames({
		groupId,
		collectionId: parentId,
		filters
	});

	const {
		modalContent,
		closeModal,
		openCreateFolderModal,
		openCreateGameModal
	} = useModalFolder({
		groupId,
		parentId,
		reset,
		refreshGames
	});

	const openFolder = ({ id, name }) => {
		const newPath = [...path];
		newPath.push({ id, name });

		setPath(newPath);
		setParentId(id);
	};

	const goToFolder = ({ id }) => {
		const findIndex = path.findIndex(item => item.id === id);
		const newPath = path.slice(0, findIndex + 1);

		setPath(newPath);
		setParentId(id);
	};

	const foldersFiltered = foldersInit.filter(
		item => item.parentId === parentId
	);

	const foldersSorted = [...foldersFiltered].sort((a, b) =>
		a.name.localeCompare(b.name)
	);

	return (
		<>
			<Modal onClose={closeModal}>{modalContent}</Modal>
			<section className={styles.container}>
				<div className={styles.folders}>
					<div className={styles.folders__title}>
						<PathFolder path={path} goToFolder={goToFolder} />
						<div className={styles.folders__actions}>
							<Button onClick={openCreateFolderModal}>
								<FolderAddIcon className={styles.icon} />
								<span>Create Folder</span>
							</Button>
						</div>
					</div>
					<div className={styles.folders__list}>
						<GroupFolderListRows
							folders={foldersSorted}
							openFolder={openFolder}
							groupId={groupId}
							parentId={parentId}
							reset={reset}
						/>
					</div>
				</div>
				<div className={styles.games}>
					<div className={styles.games__title}>
						<h2 className={styles.title}>Games</h2>
						<div className={styles.folders__actions}>
							<Button onClick={openCreateGameModal}>
								<GameIcon className={styles.icon} />
								<span>Create Game</span>
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
				</div>
			</section>
		</>
	);
};

const useModalFolder = ({ groupId, parentId, reset, refreshGames }) => {
	const [modalContent, setModalContent] = useState();

	const closeModal = () => {
		setModalContent();
	};

	const openCreateFolderModal = () => {
		setModalContent(
			<FolderCreateForm
				closeModal={closeModal}
				onSuccess={reset}
				groupId={groupId}
				parentId={parentId}
			/>
		);
	};

	const openCreateGameModal = () => {
		setModalContent(
			<GameCreateForm
				closeModal={closeModal}
				onSuccess={refreshGames}
				groupId={groupId}
				collectionId={parentId}
			/>
		);
	};

	return {
		modalContent,
		closeModal,
		openCreateFolderModal,
		openCreateGameModal
	};
};

export default GroupFolderList;
