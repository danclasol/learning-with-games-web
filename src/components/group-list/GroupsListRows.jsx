import Loading from '../shared/Loading';
import GroupCard from './GroupCard';
import styles from './GroupsListRows.module.css';

const GroupsListRows = ({ groups, error, loading, reset }) => {
	if (error)
		return (
			<p className={styles.text}>
				Something went wrong. Please try again later.
			</p>
		);

	if (loading) return <Loading label='Loading' />;

	if (groups.length === 0)
		return <p className={styles.text}>There are no groups to display</p>;

	return (
		<div className={styles.rows}>
			{groups.map(group => (
				<GroupCard key={group.id} group={group} reset={reset} />
			))}
		</div>
	);
};

export default GroupsListRows;
