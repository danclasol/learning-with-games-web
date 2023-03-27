import { useFormContext } from 'react-hook-form';
import { isImageValid } from '../../../lib/utils/images';
import IconButton from '../../buttons/IconButton';
import InputText from '../../forms/InputText';
import TrashIcon from '../../icons/TrashIcon';
import styles from './PairCardEdit.module.css';
import PairCardImage from './PairCardImage';

const PairCardEdit = ({ index }) => {
	const { register, watch, remove, errors } = useFormContext();

	const errorsEdit = errors?.pairs && errors?.pairs[index];

	return (
		<div className={styles.card}>
			<PairCardImage
				image={watch(`pairs.${index}.image`)}
				error={errorsEdit?.image?.message}
			/>

			<div className={styles.form__fields}>
				<div className={styles.form__field}>
					<InputText
						name={`pairs.${index}.text`}
						label='Text'
						placeholder='Text'
						register={register}
						validate={{
							required: 'Field required',
							minLength: {
								value: 2,
								message: 'At least 2 characters'
							}
						}}
						error={errorsEdit?.text?.message}
					/>
				</div>
				<div className={styles.form__field}>
					<InputText
						name={`pairs.${index}.image`}
						label='Image'
						placeholder='Image'
						register={register}
						validate={{
							required: 'Field required',
							validate: async value => {
								const result = await isImageValid(value);
								return result || 'Invalid image';
							}
						}}
						error={errorsEdit?.image?.message}
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

export default PairCardEdit;
