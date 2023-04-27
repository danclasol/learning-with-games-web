import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { LIST_GAMES } from '../../constants/games';
import { createGame } from '../../lib/api/games';
import { AuthContext } from '../../lib/context/AuthContext';
import Button from '../buttons/Button';
import InputSelect from '../forms/InputSelect';
import InputText from '../forms/InputText';
import styles from './GameCreateForm.module.css';

const GameCreateForm = ({ closeModal, onSuccess }) => {
	const { accessToken } = useContext(AuthContext);

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors, isSubmitting, isValid }
	} = useForm({ defaultValues: { title: '', type: '' } });

	const onCleanInput = nameInput => {
		setValue(nameInput, '', { shouldDirty: true });
	};

	return (
		<section className={styles.wrapper}>
			<h3 className={styles.title}>Create New Game</h3>

			<form
				className={styles.form}
				onSubmit={handleSubmit(async data => {
					await handleSubmitForm({
						accessToken,
						data,
						closeModal,
						onSuccess
					});
				})}
			>
				<div className={styles.form__field}>
					<InputText
						name='title'
						label='Title'
						placeholder='Title'
						register={register}
						validate={{
							required: 'Field required',
							minLength: {
								value: 4,
								message: 'At least 4 characters'
							}
						}}
						error={errors.title?.message}
						onClean={() => onCleanInput('title')}
					/>
				</div>
				<div className={styles.form__field}>
					<InputSelect
						name='type'
						label='Game'
						register={register}
						validate={{
							required: 'Field required'
						}}
						error={errors.type?.message}
					>
						<option value=''>Select game...</option>
						{LIST_GAMES.map(item => (
							<option key={item.type} value={item.type}>
								{item.name}
							</option>
						))}
					</InputSelect>
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
	data,
	closeModal,
	onSuccess
}) => {
	const success = await createGame({ accessToken, game: data });

	if (success) {
		onSuccess();
		closeModal();
	}
};

export default GameCreateForm;
