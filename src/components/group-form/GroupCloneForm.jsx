import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { cloneGroup } from '../../lib/api/groups';
import { AuthContext } from '../../lib/context/AuthContext';
import Button from '../buttons/Button';
import InputCheck from '../forms/InputCheck';
import InputText from '../forms/InputText';
import styles from './GroupCloneForm.module.css';

const GroupCloneForm = ({ id, group, closeModal, onSuccess }) => {
	const { accessToken } = useContext(AuthContext);

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors, isSubmitting, isValid }
	} = useForm({
		defaultValues: { name: '', level: group.level, course: group.course }
	});

	const onCleanInput = nameInput => {
		setValue(nameInput, '', { shouldDirty: true });
	};

	return (
		<section className={styles.wrapper}>
			<h3 className={styles.title}>Clone Group</h3>

			<form
				className={styles.form}
				onSubmit={handleSubmit(async data => {
					await handleSubmitForm({
						accessToken,
						id,
						data,
						closeModal,
						onSuccess
					});
				})}
			>
				<div className={styles.form__field}>
					<InputText
						name='name'
						label='Name'
						placeholder='Name'
						register={register}
						validate={{
							required: 'Field required',
							minLength: {
								value: 4,
								message: 'At least 4 characters'
							}
						}}
						error={errors.name?.message}
						onClean={() => onCleanInput('name')}
					/>
				</div>
				<div className={styles.form__field}>
					<InputText
						name='level'
						label='Level'
						placeholder='Level'
						register={register}
						validate={{
							minLength: {
								value: 2,
								message: 'At least 2 characters'
							}
						}}
						error={errors.level?.message}
						onClean={() => onCleanInput('level')}
					/>
				</div>
				<div className={styles.form__field}>
					<InputText
						name='course'
						label='Course'
						placeholder='Course'
						register={register}
						validate={{
							minLength: {
								value: 2,
								message: 'At least 2 characters'
							}
						}}
						error={errors.course?.message}
						onClean={() => onCleanInput('course')}
					/>
				</div>

				<div className={styles.form__field}>
					<InputCheck
						name='cloneGames'
						label='Clone games?'
						defaultChecked
						register={register}
					/>
				</div>
				<div className={styles.actions}>
					<Button disabled={isSubmitting || !isValid}>
						{isSubmitting ? 'Creating...' : 'Create'}
					</Button>
				</div>
			</form>
		</section>
	);
};

const handleSubmitForm = async ({
	accessToken,
	id,
	data,
	closeModal,
	onSuccess
}) => {
	const success = await cloneGroup({
		accessToken,
		id,
		group: data,
		options: { cloneGames: data.cloneGames }
	});

	if (success) {
		onSuccess();
		closeModal();
	}
};

export default GroupCloneForm;
