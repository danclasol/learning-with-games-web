import IconButton from '../../buttons/IconButton';
import InputText from '../../forms/InputText';
import CloseIcon from '../../icons/CloseIcon';
import SaveIcon from '../../icons/SaveIcon';
import styles from './CardAdd.module.css';

const CardAdd = ({
	register,
	errors,
	watch,
	getValues,
	trigger,
	dirtyFields,
	resetField,
	addPair,
	closeForm
}) => {
	const isDirty = dirtyFields?.newpair;

	const handleCancelClick = () => {
		closeForm();
		resetField('newpair.text');
		resetField('newpair.image');
	};

	const imageSrc = watch('newpair.image') || '/images/image.svg';

	const handleClickSavePair = async () => {
		const result = await trigger(['newpair.text', 'newpair.image']);

		if (result) {
			addPair({
				text: getValues('newpair.text'),
				image: getValues('newpair.image')
			});

			resetField('newpair.text');
			resetField('newpair.image');

			closeForm();
		}
	};

	return (
		<div className={styles.card}>
			<div className={styles.card__image}>
				<img className={styles.image} src={imageSrc} />
			</div>

			<div className={styles.form__fields}>
				<div className={styles.form__field}>
					<InputText
						name='newpair.text'
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
						error={errors?.text?.message}
					/>
				</div>
				<div className={styles.form__field}>
					<InputText
						name='newpair.image'
						label='Image'
						placeholder='Image'
						register={register}
						validate={{
							required: 'Field required'
						}}
						error={errors?.image?.message}
					/>
				</div>
			</div>
			<div className={styles.actions}>
				<IconButton
					icon={SaveIcon}
					filled
					size='large'
					type='button'
					onClick={handleClickSavePair}
					disabled={!isDirty}
				/>
				<IconButton
					icon={CloseIcon}
					filled
					size='large'
					kind='secondary'
					type='button'
					onClick={handleCancelClick}
				/>
			</div>
		</div>
	);
};

export default CardAdd;
