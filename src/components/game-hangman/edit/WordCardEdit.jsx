import { useId } from 'react';
import { useFormContext } from 'react-hook-form';
import { isValidWord } from '../../../lib/utils/regex';
import IconButton from '../../buttons/IconButton';
import InputNumber from '../../forms/InputNumber';
import InputText from '../../forms/InputText';
import MoveIcon from '../../icons/MoveIcon';
import TrashIcon from '../../icons/TrashIcon';
import styles from './WordCardEdit.module.css';

const WordCardEdit = ({ index, toggleIsDraggable }) => {
	const { register, remove, errors, onCleanInput } = useFormContext();
	const cardId = useId();

	const errorsEdit = errors?.words && errors?.words[index];

	return (
		<div id={cardId} className={styles.card}>
			<div className={styles.card__nav}>
				<span className={styles.card__index}>{index + 1}</span>
				<IconButton
					icon={MoveIcon}
					type='button'
					className={styles.icon__move}
					onMouseDown={toggleIsDraggable}
				/>
				<IconButton
					icon={TrashIcon}
					filled
					kind='secondary'
					type='button'
					onClick={() => remove(index)}
				/>
			</div>
			<div className={styles.card__form}>
				<div className={styles.form__fields}>
					<div className={styles.form__field}>
						<InputText
							name={`words.${index}.word`}
							label='Word'
							placeholder='Word'
							register={register}
							validate={{
								required: 'Field required',
								minLength: {
									value: 2,
									message: 'At least 2 characters'
								},
								pattern: {
									value: isValidWord,
									message: 'Invalid characters'
								}
							}}
							error={errorsEdit?.word?.message}
							onClean={() => onCleanInput(`words.${index}.word`)}
						/>
					</div>
					<div className={styles.form__field}>
						<InputNumber
							name={`words.${index}.maxTries`}
							label='Max tries'
							placeholder='Max tries'
							min={1}
							register={register}
							validate={{
								required: 'Field required',
								valueAsNumber: true,
								min: { value: 1, message: 'Min value 1' }
							}}
							error={errorsEdit?.maxTries?.message}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default WordCardEdit;
