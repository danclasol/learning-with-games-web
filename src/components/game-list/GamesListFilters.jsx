import { useState } from 'react';
import Button from '../buttons/Button';
import InputSearch from '../forms/InputSearch';
import InputSelect from '../forms/InputSelect';
import GameCreateForm from '../game-form/GameCreateForm';
import ArrowSort from '../icons/ArrowSort';
import FilterIcon from '../icons/FilterIcon';
import Modal from '../shared/Modal';
import styles from './GamesListFilters.module.css';

const GamesListFilters = ({
	search,
	type,
	sortBy,
	setSearch,
	setType,
	setSortBy,
	reset
}) => {
	const { modalContent, closeModal, openCreateModal } = useModalGame({
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
					placeholder='Buscar...'
					onChange={handleSearchChange}
					onCleanSearch={cleanSearch}
					className={styles.filter}
				/>
				<div className={styles.filter}>
					<FilterIcon className={styles.icon} />
					<InputSelect
						value={type}
						className={styles.filter}
						onChange={handleTypeChange}
					>
						<option value=''>Filtrar por tipo...</option>
						<option value='finding-pairs'>Finding Pairs</option>
						<option value='hangman'>Hangman</option>
						<option value='quiz'>Quiz</option>
					</InputSelect>
				</div>
				<div className={styles.filter}>
					<ArrowSort className={styles.icon} />
					<InputSelect
						value={sortBy}
						className={styles.filter}
						onChange={handleSortByChange}
					>
						<option value='0'>Fecha DESC</option>
						<option value='1'>Fecha ASC</option>
						<option value='2'>Nombre</option>
						<option value='3'>Tipo</option>
					</InputSelect>
				</div>
			</div>
			<div className={styles.actions}>
				<Button onClick={openCreateModal}>Create game</Button>
			</div>
		</div>
	);
};

const useModalGame = ({ reset }) => {
	const [modalContent, setModalContent] = useState();

	const closeModal = () => {
		setModalContent();
	};

	const openCreateModal = () => {
		setModalContent(
			<GameCreateForm closeModal={closeModal} onSuccess={reset} />
		);
	};

	return {
		modalContent,
		closeModal,
		openCreateModal
	};
};

export default GamesListFilters;
