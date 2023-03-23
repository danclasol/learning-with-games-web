import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { isImageValid } from '../../../lib/utils/images';
import IconButton from '../../buttons/IconButton';
import InputText from '../../forms/InputText';
import CloseIcon from '../../icons/CloseIcon';
import SaveIcon from '../../icons/SaveIcon';
import styles from './CardAdd.module.css';

const CardAdd = ({ gameId, closeForm }) => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors, isDirty }
	} = useForm({
		defaultValues: { text: '', image: '' }
	});

	const handleCancelClick = () => {
		closeForm();
	};

	const imageSrc = watch('image') || '/images/image.svg';

	return (
		<div className={styles.card}>
			<div className={styles.card__image}>
				<img className={styles.image} src={imageSrc} />
			</div>

			<form
				className={styles.form}
				onSubmit={handleSubmit(data => {
					handleSubmitForm({
						data,
						gameId,
						setIsSubmitting,
						closeForm
					});
				})}
			>
				<div className={styles.form__fields}>
					<div className={styles.form__field}>
						<InputText
							name='text'
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
							error={errors.text?.message}
						/>
					</div>
					<div className={styles.form__field}>
						<InputText
							name='image'
							label='Image'
							placeholder='Image'
							register={register}
							validate={{
								required: 'Field required',
								validate: isImageValid
							}}
							error={errors.image?.message}
						/>
					</div>
				</div>
				<div className={styles.actions}>
					<IconButton
						icon={SaveIcon}
						filled
						size='large'
						disabled={isSubmitting || !isDirty}
					/>
					<IconButton
						icon={CloseIcon}
						filled
						size='large'
						kind='secondary'
						disabled={isSubmitting}
						type='button'
						onClick={handleCancelClick}
					/>
				</div>
			</form>
		</div>
	);
};

const handleSubmitForm = async ({
	data,
	gameId,
	setIsSubmitting,
	closeForm
}) => {
	setIsSubmitting(true);

	const success = await addPairToGame({ gameId, ...data });

	if (success) {
		closeForm();
	}

	setIsSubmitting(false);
};

export default CardAdd;
