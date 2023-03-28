import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { updateGame } from '../../../lib/api/game-hangman';
import Button from '../../buttons/Button';
import InputText from '../../forms/InputText';
import GameEditActions from '../../games/GameEditActions';
import styles from './GameEdit.module.css';
import WordCardEdit from './WordCardEdit';

const GameEdit = ({ game }) => {
	const {
		register,
		handleSubmit,
		control,
		watch,
		reset,
		formState: { errors, isDirty, isSubmitting }
	} = useForm({ defaultValues: { title: game?.title, words: game?.words } });

	const { fields, prepend, remove } = useFieldArray({
		name: 'words',
		control
	});

	const handleAddWordClick = () => {
		prepend({ word: '', maxTries: 10 });
	};

	return (
		<FormProvider
			register={register}
			watch={watch}
			errors={errors}
			remove={remove}
		>
			<section className={styles.container}>
				<GameEditActions
					gameId={game.id}
					isDirty={isDirty}
					isSubmitting={isSubmitting}
					clearForm={reset}
				/>

				<form
					id='form'
					className={styles.form}
					onSubmit={handleSubmit(async data => {
						await handleSubmitForm({
							id: game.id,
							data,
							reset
						});
					})}
				>
					<div className={styles.game__info}>
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
							/>
						</div>
					</div>

					<div className={styles.words}>
						<div className={styles.words__add}>
							<div className={styles.actions}>
								<Button type='button' onClick={handleAddWordClick}>
									Add word
								</Button>
							</div>
						</div>
						<div className={styles.words__list}>
							{fields.map((field, index) => (
								<WordCardEdit key={field.id} index={index} control={control} />
							))}
						</div>
					</div>
				</form>
			</section>
		</FormProvider>
	);
};

const handleSubmitForm = async ({ id, data, reset }) => {
	const success = await updateGame({
		id,
		game: { ...data, type: 'hangman' }
	});

	if (success) {
		reset({ ...data });
	}
};

export default GameEdit;
