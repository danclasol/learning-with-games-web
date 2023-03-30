import styles from './Avatar.module.css';

const Avatar = ({ kind = 'photo', image, name }) => (
	<div className={styles.avatar}>
		<img
			alt='Avatar'
			src={image || '/images/avatar.svg'}
			title={name}
			className={styles.avatar__image}
		/>
		{kind === 'photo_and_name' && (
			<span className={styles.avatar__name}>{name}</span>
		)}
	</div>
);
export default Avatar;
