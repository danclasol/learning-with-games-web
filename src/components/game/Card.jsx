import styles from './Card.module.css';

const Card = ({ text, image, index, isInactive, isFlipped, onClick }) => {
	const handleClick = () => {
		!isFlipped && !isInactive && onClick(index);
	};

	const showCard = isFlipped || isInactive;

	const styleFrontCard = `${styles.card__front} ${
		isInactive ? styles.inactive : ''
	}`;

	return (
		<div className={styles.card} onClick={handleClick}>
			{showCard && (
				<div className={styleFrontCard}>
					<img className={styles.image} src={image} />
					<span className={styles.text}>{text}</span>
				</div>
			)}
			{!showCard && (
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
