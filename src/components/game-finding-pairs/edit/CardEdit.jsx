import { useState } from 'react';
import IconButton from '../../buttons/IconButton';
import InputText from '../../forms/InputText';
import CloseIcon from '../../icons/CloseIcon';
import PencilIcon from '../../icons/PencilIcon';
import SaveIcon from '../../icons/SaveIcon';
import TrashIcon from '../../icons/TrashIcon';
import styles from './CardEdit.module.css';

const CardEdit = ({
	index,
	register,
	errors,
	trigger,
	watch,
	dirtyFields,
	resetField,
	removePair
}) => {
	const [isEditing, setIsEditing] = useState(false);

	const toggleIsEditing = () => {
		setIsEditing(!isEditing);
	};

	const cancelEditing = () => {
		setIsEditing(!isEditing);

		resetField(`pairs.${index}.text`);
		resetField(`pairs.${index}.image`);
	};

	const handleSavePair = async () => {
		const result = await trigger([
			`pairs.${index}.text`,
			`pairs.${index}.image`
		]);

		if (result) {
			setIsEditing(!isEditing);
		}
	};

	const imageSrc = watch(`pairs.${index}.image`) || '/images/image.svg';

	const isDirty = dirtyFields?.pairs && dirtyFields?.pairs[index];

	return (
		<div className={styles.card}>
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
						error={errors?.[index]?.text?.message}
						disabled={!isEditing}
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
						error={errors?.[index]?.image?.message}
						disabled={!isEditing}
					/>
				</div>
			</div>
			<div className={styles.actions}>
				{!isEditing && (
					<>
						<IconButton
							icon={PencilIcon}
							filled
							size='large'
							onClick={toggleIsEditing}
						/>
						<IconButton
							icon={TrashIcon}
							filled
							size='large'
							kind='secondary'
							type='button'
							onClick={() => removePair(index)}
						/>
					</>
				)}
				{isEditing && (
					<>
						<IconButton
							icon={SaveIcon}
							filled
							size='large'
							type='button'
							onClick={handleSavePair}
							disabled={!isDirty}
						/>
						<IconButton
							icon={CloseIcon}
							filled
							size='large'
							kind='secondary'
							onClick={cancelEditing}
							type='button'
						/>
					</>
				)}
			</div>
		</div>
	);
};

export default CardEdit;
