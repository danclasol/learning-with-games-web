import { getLetterOptionFromIndex } from '../../lib/games/quiz';
import styles from './InputOption.module.css';

const InputOption = ({
	name,
	index,
	isCorrectOption,
	className,
	register,
	validate,
	error,
	...props
}) => {
	const indexStyles = `${styles.index} ${
		isCorrectOption ? styles['index--correct'] : ''
	}`;

	const inputStyles = `${styles.input} ${
		isCorrectOption ? styles['input--correct'] : ''
	} ${error ? styles.borderError : ''}`;

	return (
		<div className={`${styles.option} ${className || ''}`}>
			<span className={indexStyles}>{getLetterOptionFromIndex(index)}</span>
			<input
				{...props}
				type='text'
				className={inputStyles}
				name={name}
				{...register(name, validate)}
			/>
		</div>
	);
};
export default InputOption;
