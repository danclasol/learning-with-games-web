import { useState } from 'react';
import { useGroups } from '../../lib/hooks/useGroups.js';
import { useGroupFilters } from '../../lib/hooks/useGroupsFilters.js';
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
		useGroupFilters();

	const { groups, count, error, loading, refresh } = useGroups({ filters });

	const { modalContent, closeModal, openCreateModal } = useModal({
		refresh
	});

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
					{groups.length !== 0 && (
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

const useModal = ({ refresh }) => {
	const [modalContent, setModalContent] = useState();

	const closeModal = () => {
		setModalContent();
	};

	const openCreateModal = () => {
		setModalContent(
			<GroupCreateForm closeModal={closeModal} onSuccess={refresh} />
		);
	};

	return {
		modalContent,
		closeModal,
		openCreateModal
	};
};

export default GroupsList;
