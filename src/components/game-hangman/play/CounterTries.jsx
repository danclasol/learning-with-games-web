import CheckIcon from '../../icons/CheckIcon';
import CloseIcon from '../../icons/CloseIcon';
import styles from './CounterTries.module.css';

const CounterTries = ({ maxTries, tries }) => {
	const triesAux = Array(tries)
		.fill('0')
		.map((_, index) => (
			<div key={index} className={styles.fail}>
				<CloseIcon className={styles.fail__icon} />
			</div>
		));

	const triesLeftAux = Array(maxTries - tries)
		.fill('0')
		.map((_, index) => (
			<div key={index} className={styles.try}>
				<CheckIcon className={styles.try__icon} />
			</div>
		));

	return (
		<div className={styles.wrapper}>
			{triesAux}
			{triesLeftAux}
		</div>
	);
};

export default CounterTries;
