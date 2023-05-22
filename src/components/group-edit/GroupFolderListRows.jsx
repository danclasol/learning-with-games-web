import Loading from '../shared/Loading';
import GroupFolder from './GroupFolder';
import styles from './GroupFolderListRows.module.css';

const GroupFolderListRows = ({
	folders,
	parentId,
	groupId,
	error,
	loading,
	reset,
	openFolder
}) => {
	if (error)
		return (
			<p className={styles.text}>
				Something went wrong. Please try again later.
			</p>
		);

	if (loading) return <Loading label='Loading' />;

	if (folders.length === 0)
		return (
			<p className={styles.text}>
				{!parentId ? 'There are not folders created' : 'This folder is empty'}
			</p>
		);

	return (
		<div className={styles.rows}>
			{folders.map(folder => (
				<GroupFolder
					key={folder.id}
					groupId={groupId}
					collectionId={folder.id}
					name={folder.name}
					openFolder={openFolder}
					reset={reset}
				/>
			))}
		</div>
	);
};

export default GroupFolderListRows;
