import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { addPairToGame } from '../../../lib/api/finding-pairs-games';
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
		formState: { errors }
	} = useForm({
		defaultValues: { text: '', image: '' }
	});

	const handleCancelClick = () => {
		closeForm();
	};

	return (
		<div className={styles.card}>
			<img className={styles.card__image} src={'/images/image.svg'} />

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
								minLenght: 4
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
								minLenght: 4
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
						disabled={isSubmitting}
					/>
					<IconButton
						icon={CloseIcon}
						filled
						size='large'
						kind='secondary'
						disabled={isSubmitting}
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
