import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { createFolder } from '../../lib/api/group-collection';
import { AuthContext } from '../../lib/context/AuthContext';
import Button from '../buttons/Button';
import InputText from '../forms/InputText';
import styles from './FolderCreateForm.module.css';

const FolderCreateForm = ({ groupId, parentId, closeModal, onSuccess }) => {
	const { accessToken } = useContext(AuthContext);

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors, isSubmitting, isValid }
	} = useForm({ defaultValues: { name: '' } });

	const onCleanInput = nameInput => {
		setValue(nameInput, '', { shouldDirty: true });
	};

	return (
		<section className={styles.wrapper}>
			<h3 className={styles.title}>Create New Folder</h3>
			<form
				className={styles.form}
				onSubmit={handleSubmit(async data => {
					await handleSubmitForm({
						accessToken,
						groupId,
						parentId,
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
	groupId,
	parentId,
	data,
	closeModal,
	onSuccess
}) => {
	const success = await createFolder({
		accessToken,
		groupId,
		parentId,
		name: data.name
	});

	if (success) {
		onSuccess();
		closeModal();
	}
};

export default FolderCreateForm;
