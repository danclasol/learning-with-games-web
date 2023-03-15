import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { createGame } from '../../lib/api/games';
import Button from '../buttons/Button';
import InputSelect from '../forms/InputSelect';
import InputText from '../forms/InputText';
import styles from './GameCreateForm.module.css';

const GameCreateForm = ({ closeModal, onSuccess }) => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm({ defaultValues: { title: '', type: '' } });

	return (
		<section className={styles.wrapper}>
			<h3 className={styles.title}>Create New Game</h3>

			<form
				className={styles.form}
				onSubmit={handleSubmit(data => {
					handleSubmitForm({ data, setIsSubmitting, closeModal, onSuccess });
				})}
			>
				<div className={styles.form__field}>
					<InputText
						name='title'
						label='Title'
						placeholder='Title'
						register={register}
						error={errors.title?.message}
					/>
				</div>
				<div className={styles.form__field}>
					<InputSelect
						name='type'
						label='Game'
						{...register('type', { required: 'Field required' })}
						error={errors.type?.message}
					>
						<option value=''>Select game...</option>
						<option value='finding-pairs'>Finding Pairs</option>
						<option value='hangman'>Hangman</option>
						<option value='quiz'>Quiz</option>
					</InputSelect>
				</div>

				<div className={styles.actions}>
					<Button disabled={isSubmitting}>
						{isSubmitting ? 'Creating...' : 'Create'}
					</Button>
				</div>
			</form>
		</section>
	);
};

const handleSubmitForm = async ({
	data,
	setIsSubmitting,
	closeModal,
	onSuccess
}) => {
	setIsSubmitting(true);

	const success = await createGame({ game: data });

	if (success) {
		onSuccess();
		closeModal();
	}

	setIsSubmitting(false);
};

export default GameCreateForm;
