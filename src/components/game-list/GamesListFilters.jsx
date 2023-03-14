import { useState } from 'react';
import Button from '../buttons/Button';
import InputSearch from '../forms/InputSearch';
import InputSelect from '../forms/InputSelect';
import GameCreateForm from '../game-form/GameCreateForm';
import ArrowSort from '../icons/ArrowSort';
import FilterIcon from '../icons/FilterIcon';
import Modal from '../shared/Modal';
import styles from './GamesListFilters.module.css';

const GamesListFilters = ({ filters, setFilters }) => {
	const { modalContent, closeModal, openCreateModal } = useModalGame();

	const handleSearchChange = ev => {
		const newSearch = ev.target.value;
		setFilters({ ...filters, search: newSearch });
	};

	const cleanSearch = () => {
		setFilters({ ...filters, search: '' });
	};

	const handleTypeChange = ev => {
		const newType = ev.target.value;
		setFilters({ ...filters, type: newType });
	};

	const handleSortByChange = ev => {
		const newSortBy = ev.target.value;
		setFilters({ ...filters, sortBy: newSortBy });
	};

	return (
		<div className={styles.wrapper}>
			<Modal onClose={closeModal}>{modalContent}</Modal>
			<div className={styles.filters}>
				<InputSearch
					value={filters.search}
					placeholder='Buscar...'
					onChange={handleSearchChange}
					onCleanSearch={cleanSearch}
					className={styles.filter}
				/>
				<div className={styles.filter}>
					<FilterIcon className={styles.icon} />
					<InputSelect
						value={filters.type}
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
						value={filters.sortBy}
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

const useModalGame = () => {
	const [modalContent, setModalContent] = useState();

	const closeModal = () => {
		setModalContent();
	};

	const openCreateModal = () => {
		setModalContent(<GameCreateForm closeModal={closeModal} />);
	};

	return {
		modalContent,
		closeModal,
		openCreateModal
	};
};

export default GamesListFilters;
