import styles from './Card.module.css';

const Card = ({ text, image, index, isResolved, isFlipped, onClick }) => {
	const handleClick = () => {
		!isFlipped && !isResolved && onClick(index);
	};

	const styleCard = `${styles.card} ${isFlipped ? styles.flipped : ''} `;

	return (
		<div className={styles.wrapper}>
			<div className={styleCard} onClick={handleClick}>
				<div className={`${styles.front} ${isResolved ? styles.resolved : ''}`}>
					<img className={styles.image} src={image} />
					<span className={styles.text}>{text}</span>
				</div>

				<div className={styles.back}>
					<div className={styles.index}>
						<span className={styles.text}>{index + 1}</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Card;
