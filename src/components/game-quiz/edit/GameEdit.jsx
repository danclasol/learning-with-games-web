import { useContext } from 'react';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { updateGame } from '../../../lib/api/game-quiz';
import { AuthContext } from '../../../lib/context/AuthContext';
import { DragAndDropContextProvider } from '../../../lib/context/DragAndDropContextProvider';
import Button from '../../buttons/Button';
import InputText from '../../forms/InputText';
import GameEditActions from '../../game-actions/GameEditActions';
import Draggable from '../../shared/Draggable';
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
		setValue,
		clearErrors,
		formState: { errors, isDirty, isSubmitting }
	} = useForm({
		defaultValues: { title: game?.title, questions: game?.questions }
	});

	const { fields, append, swap, remove } = useFieldArray({
		name: 'questions',
		control
	});

	const handleAddQuestionClick = () => {
		append({ question: '', points: 0, options: [{ text: '' }] });
	};

	const onCleanInput = nameInput => {
		setValue(nameInput, '', { shouldDirty: true });
	};

	return (
		<FormProvider
			register={register}
			control={control}
			watch={watch}
			setValue={setValue}
			errors={errors}
			clearErrors={clearErrors}
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
						<div className={styles.form__fields}>
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
						<DragAndDropContextProvider swap={swap}>
							<div className={styles.questions__list}>
								{fields.map((field, index) => (
									<Draggable key={field.id} index={index} swap={swap}>
										<QuestionCardEdit index={index} />
									</Draggable>
								))}
							</div>
						</DragAndDropContextProvider>
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
