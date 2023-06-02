import { useState } from 'react';
import { useGamesFilters } from '../../lib/hooks/useGamesFilters.js';
import { useGroups } from '../../lib/hooks/useGroups.js';
import Button from '../buttons/Button.jsx';
import PageSelector from '../game-list/PageSelector.jsx';
import GroupCreateForm from '../group-form/GroupCreateForm.jsx';
import GroupIcon from '../icons/GroupIcon.jsx';
import Modal from '../shared/Modal.jsx';
import styles from './GroupsList.module.css';
import GroupsListFilters from './GroupsListFilters.jsx';
import GroupsListRows from './GroupsListRows.jsx';

const GroupsList = () => {
	const { filters, setSearch, setType, setSortBy, setPage, resetFilters } =
		useGamesFilters();

	const { modalContent, closeModal, openCreateModal } = useModal({
		reset: resetFilters
	});

	const { groups, count, error, loading } = useGroups({ filters });

	return (
		<>
			<Modal onClose={closeModal}>{modalContent}</Modal>
			<section className={styles.container}>
				<h2 className={styles.title}>Groups</h2>
				<div className={styles.groups__header}>
					<GroupsListFilters
						search={filters.search}
						type={filters.type}
						sortBy={filters.sortBy}
						setSearch={setSearch}
						setType={setType}
						setSortBy={setSortBy}
						reset={resetFilters}
					/>
					<div className={styles.actions}>
						<Button onClick={openCreateModal} icon={GroupIcon}>
							Create group
						</Button>
					</div>
				</div>
				<div className={styles.groups__list}>
					<GroupsListRows
						groups={groups}
						error={error}
						loading={loading}
						reset={resetFilters}
					/>
					<PageSelector
						page={filters.page}
						totalPages={Math.ceil(count / filters.itemsPerPage)}
						setPage={newPage => setPage(newPage)}
					/>
				</div>
			</section>
		</>
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

export default GroupsList;
