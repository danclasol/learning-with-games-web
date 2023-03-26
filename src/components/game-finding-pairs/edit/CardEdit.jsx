import { useFormContext } from 'react-hook-form';
import IconButton from '../../buttons/IconButton';
import InputText from '../../forms/InputText';
import TrashIcon from '../../icons/TrashIcon';
import styles from './CardEdit.module.css';

const CardEdit = ({ index }) => {
	const { register, watch, trigger, resetField, remove, errors } =
		useFormContext();

	const cancelEditing = () => {
		console.log('cancel', `pairs.${index}.text`, `pairs.${index}.image`);

		resetField(`pairs.${index}.text`);
		resetField(`pairs.${index}.image`);
	};

	const handleSavePair = async () => {
		await trigger([`pairs.${index}.text`, `pairs.${index}.image`]);
	};

	const imageSrc = watch(`pairs.${index}.image`) || '/images/image.svg';

	const errorsEdit = errors?.pairs && errors?.pairs[index];

	return (
		<div className={styles.card}>
			{/* <div>
				<p>{index + 1}</p>
			</div> */}
			<div className={styles.card__image}>
				<img className={styles.image} src={imageSrc} />
			</div>

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
							required: 'Field required'
						}}
						error={errorsEdit?.image?.message}
					/>
				</div>
			</div>
			<div className={styles.actions}>
				{/* <IconButton
					icon={CloseIcon}
					filled
					size='large'
					kind='secondary'
					// onClick={cancelEditing}
					type='button'
				/> */}

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

export default CardEdit;
