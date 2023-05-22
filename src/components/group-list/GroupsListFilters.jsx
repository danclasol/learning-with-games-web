import { useState } from 'react';
import Button from '../buttons/Button';
import InputSearch from '../forms/InputSearch';
import SelectSearch from '../forms/SelectSearch';
import GroupCreateForm from '../group-form/GroupCreateForm';
import SortIcon from '../icons/SortIcon';
import Modal from '../shared/Modal';
import styles from './GroupsListFilters.module.css';

const GroupsListFilters = ({ search, sortBy, setSearch, setSortBy, reset }) => {
	const { modalContent, closeModal, openCreateModal } = useModal({
		reset
	});

	const handleSearchChange = ev => {
		setSearch(ev.target.value);
	};

	const cleanSearch = () => {
		setSearch('');
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
					<SortIcon className={styles.icon} />
					<SelectSearch
						value={sortBy}
						className={styles.filter}
						onChange={handleSortByChange}
					>
						<option value='0'>By date asc</option>
						<option value='1'>By date desc</option>
						<option value='2'>By name</option>
					</SelectSearch>
				</div>
			</div>
			<div className={styles.actions}>
				<Button onClick={openCreateModal}>Create group</Button>
			</div>
		</div>
	);
};

const useModal = ({ reset }) => {
	const [modalContent, setModalContent] = useState();

	const closeModal = () => {
		setModalContent();
	};

	const openCreateModal = () => {
		setModalContent(
			<GroupCreateForm closeModal={closeModal} onSuccess={reset} />
		);
	};

	return {
		modalContent,
		closeModal,
		openCreateModal
	};
};

export default GroupsListFilters;
