import { useFormContext } from 'react-hook-form';
import { isImageValid } from '../../../lib/utils/images';
import IconButton from '../../buttons/IconButton';
import InputText from '../../forms/InputText';
import MoveIcon from '../../icons/MoveIcon';
import TrashIcon from '../../icons/TrashIcon';
import ImagePreview from './ImagePreview';
import styles from './PairCardEdit.module.css';

const PairCardEdit = ({ index, toggleIsDraggable }) => {
	const { register, watch, remove, errors, onCleanInput } = useFormContext();

	const errorsEdit = errors?.pairs && errors?.pairs[index];

	return (
		<div className={styles.card}>
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
				<ImagePreview
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
							onClean={() => onCleanInput(`pairs.${index}.text`)}
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
							onClean={() => onCleanInput(`pairs.${index}.image`)}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PairCardEdit;
