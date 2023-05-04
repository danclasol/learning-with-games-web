import { formatDateLocale } from '../../lib/utils/dates';
import GroupActions from './GroupActions';
import styles from './GroupCard.module.css';

const GroupCard = ({ group, reset }) => {
	return (
		<div className={styles.card}>
			<img className={styles.image} src='/images/group.svg'></img>

			<div className={styles.card__info}>
				<span className={styles.name}>{group.name}</span>
				{group?.course && (
					<span className={styles.course}>{`Course: ${group.course}`}</span>
				)}
				{group?.level && <span className={styles.level}>{group.level}</span>}
				<span className={styles.date}>
					{formatDateLocale(group.creationDate)}
				</span>
			</div>

			<GroupActions group={group} reset={reset} />
		</div>
	);
};

export default GroupCard;
