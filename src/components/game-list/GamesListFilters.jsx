import { useState } from 'react';
import { LIST_GAMES } from '../../constants/games';
import Button from '../buttons/Button';
import InputSearch from '../forms/InputSearch';
import SelectSearch from '../forms/SelectSearch';
import GameCreateForm from '../game-form/GameCreateForm';
import FilterIcon from '../icons/FilterIcon';
import GameIcon from '../icons/GameIcon';
import SortIcon from '../icons/SortIcon';
import Modal from '../shared/Modal';
import styles from './GamesListFilters.module.css';

const GamesListFilters = ({
	search,
	type,
	sortBy,
	setSearch,
	setType,
	setSortBy,
	reset,
	groupId
}) => {
	const { modalContent, closeModal, openCreateModal } = useModalGame({
		groupId,
		reset
	});

	const handleSearchChange = ev => {
		setSearch(ev.target.value);
	};

	const cleanSearch = () => {
		setSearch('');
	};

	const handleTypeChange = ev => {
		setType(ev.target.value);
	};

	const handleSortByChange = ev => {
		setSortBy(ev.target.value);
	};

	return (
		<div className={styles.wrapper}>
			<Modal onClose={closeModal}>{modalContent}</Modal>
			<div className={styles.filters}>
				<InputSearch
					value={search}
					placeholder='Search...'
					onChange={handleSearchChange}
					onCleanSearch={cleanSearch}
					className={styles.filter}
				/>
				<div className={styles.filter}>
					<FilterIcon className={styles.icon} />
					<SelectSearch
						value={type}
						className={styles.filter}
						onChange={handleTypeChange}
					>
						<option value=''>Filter by game...</option>
						{LIST_GAMES.map(item => (
							<option key={item.type} value={item.type}>
								{item.name}
							</option>
						))}
					</SelectSearch>
				</div>
				<div className={styles.filter}>
					<SortIcon className={styles.icon} />
					<SelectSearch
						value={sortBy}
						className={styles.filter}
						onChange={handleSortByChange}
					>
						<option value='0'>By date asc</option>
						<option value='1'>By date desc</option>
						<option value='2'>By name</option>
						<option value='3'>By game</option>
					</SelectSearch>
				</div>
			</div>

			<div className={styles.actions}>
				<Button onClick={openCreateModal}>
					<GameIcon className={styles.icon} />
					<span>Create game</span>
				</Button>
			</div>
		</div>
	);
};

const useModalGame = ({ groupId, reset }) => {
	const [modalContent, setModalContent] = useState();

	const closeModal = () => {
		setModalContent();
	};

	const openCreateModal = () => {
		setModalContent(
			<GameCreateForm
				closeModal={closeModal}
				onSuccess={reset}
				groupId={groupId}
			/>
		);
	};

	return {
		modalContent,
		closeModal,
		openCreateModal
	};
};

export default GamesListFilters;
