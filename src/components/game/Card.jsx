import styles from './Card.module.css';

const Card = ({ text, image, index, isInactive, isFlipped, onClick }) => {
	const handleClick = () => {
		!isFlipped && !isInactive && onClick(index);
	};

	const styleFrontCard = `${styles.card__front} ${
		isInactive ? styles.inactive : ''
	} ${isFlipped ? styles.flipped : ''}
	`;

	const styleCard = `${styles.card} ${isFlipped ? styles.flipped : ''}`;

	return (
		<div className={styleCard} onClick={handleClick}>
			{isFlipped && (
				<div className={styleFrontCard}>
					<img className={styles.image} src={image} />
					<span className={styles.text}>{text}</span>
				</div>
			)}
			{!isFlipped && (
				<div className={styles.card__back}>
					<div className={styles.index}>
						<span className={styles.text}>{index + 1}</span>
					</div>
				</div>
			)}
		</div>
	);
};

export default Card;
