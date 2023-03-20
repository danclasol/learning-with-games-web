import { useForm } from 'react-hook-form';
import IconButton from '../../buttons/IconButton';
import InputText from '../../forms/InputText';
import CloseIcon from '../../icons/CloseIcon';
import SaveIcon from '../../icons/TrashIcon copy';
import styles from './CardAdd.module.css';

const CardAdd = ({ value, text, image, closeForm }) => {
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm({
		defaultValues: { value, text, image }
	});

	const handleCancelClick = () => {
		closeForm();
	};

	return (
		<div className={styles.card}>
			<img className={styles.card__image} src={image || '/images/image.svg'} />

			<form className={styles.form}>
				<div className={styles.form__field}>
					<InputText
						name='text'
						label='Text'
						placeholder='Text'
						register={register}
						error={errors.title?.message}
					/>
				</div>
				<div className={styles.form__field}>
					<InputText
						name='image'
						label='Image'
						placeholder='Image'
						register={register}
						error={errors.title?.message}
					/>
				</div>
			</form>
			<div className={styles.actions}>
				<IconButton icon={SaveIcon} filled size='large'>
					Edit
				</IconButton>
				<IconButton
					icon={CloseIcon}
					filled
					size='large'
					kind='secondary'
					onClick={handleCancelClick}
				>
					Cancel
				</IconButton>
			</div>
		</div>
	);
};

export default CardAdd;
