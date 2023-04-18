import { useContext } from 'react';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { updateGame } from '../../../lib/api/game-quiz';
import { AuthContext } from '../../../lib/context/AuthContext';
import Button from '../../buttons/Button';
import InputText from '../../forms/InputText';
import GameEditActions from '../../games/GameEditActions';
import styles from './GameEdit.module.css';
import QuestionCardEdit from './QuestionCardEdit';

const GameEdit = ({ game }) => {
	const { accessToken } = useContext(AuthContext);
	const {
		register,
		handleSubmit,
		control,
		watch,
		reset,
		formState: { errors, isDirty, isSubmitting }
	} = useForm({
		defaultValues: { title: game?.title, questions: game?.questions }
	});

	const { fields, append, remove } = useFieldArray({
		name: 'questions',
		control
	});

	const handleAddQuestionClick = () => {
		append({ question: '', points: 0, options: [{ text: '' }] });
	};

	return (
		<FormProvider
			register={register}
			control={control}
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
							accessToken,
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

					<div className={styles.questions}>
						<div className={styles.questions__add}>
							<div className={styles.actions}>
								<Button type='button' onClick={handleAddQuestionClick}>
									Add Question
								</Button>
							</div>
						</div>
						<div className={styles.questions__list}>
							{fields.map((field, index) => (
								<QuestionCardEdit key={field.id} index={index} />
							))}
						</div>
					</div>
				</form>
			</section>
		</FormProvider>
	);
};

const handleSubmitForm = async ({ accessToken, id, data, reset }) => {
	const success = await updateGame({
		accessToken,
		id,
		game: { ...data, type: 'quiz' }
	});

	if (success) {
		reset({ ...data });
	}
};

export default GameEdit;
