import { useFormContext } from 'react-hook-form';
import { isValidWord } from '../../../lib/utils/regex';
import IconButton from '../../buttons/IconButton';
import InputNumber from '../../forms/InputNumber';
import InputText from '../../forms/InputText';
import TrashIcon from '../../icons/TrashIcon';
import styles from './WordCardEdit.module.css';

const WordCardEdit = ({ index }) => {
	const { register, remove, errors } = useFormContext();

	const errorsEdit = errors?.words && errors?.words[index];
	return (
		<div className={styles.card}>
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
							pattern: { value: isValidWord, message: 'Invalid characters' }
						}}
						error={errorsEdit?.word?.message}
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
			<div className={styles.actions}>
				<IconButton
					icon={TrashIcon}
					filled
					size='large'
					kind='secondary'
					type='button'
					onClick={() => remove(index)}
				/>
			</div>
		</div>
	);
};

export default WordCardEdit;
