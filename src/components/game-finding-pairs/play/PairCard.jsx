import { FINDING_PAIRS_MODES } from '../../../constants/findingPairsModes';
import styles from './PairCard.module.css';

const PairCard = ({
	text,
	image,
	index,
	mode,
	isResolved,
	isFlipped,
	onClick
}) => {
	const showText =
		!image || mode !== FINDING_PAIRS_MODES.NO_DUPLICATE_IMAGES.type;

	const styleCard = `${styles.card} ${isFlipped ? styles.flipped : ''} `;

	const handleClick = () => {
		!isFlipped && !isResolved && onClick(index);
	};

	return (
		<div className={styles.wrapper}>
			<div className={styleCard} onClick={handleClick}>
				<div className={`${styles.front} ${isResolved ? styles.resolved : ''}`}>
					{image && <img className={styles.image} src={image} />}
					{showText && <span className={styles.text}>{text}</span>}
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

export default PairCard;
