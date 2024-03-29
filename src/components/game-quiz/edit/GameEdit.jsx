import { useContext } from 'react';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { updateGame } from '../../../lib/api/game-quiz';
import { AuthContext } from '../../../lib/context/AuthContext';
import { DragAndDropContextProvider } from '../../../lib/context/DragAndDropContextProvider';
import Button from '../../buttons/Button';
import GameInfo from '../../games/GameInfo';
import AddIcon from '../../icons/AddIcon';
import CloseIcon from '../../icons/CloseIcon';
import SaveIcon from '../../icons/SaveIcon';
import Draggable from '../../shared/Draggable';
import styles from './GameEdit.module.css';
import QuestionCardEdit from './QuestionCardEdit';

const GameEdit = ({ game, refresh }) => {
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

	return (
		<section className={styles.container}>
			<GameInfo game={game} refresh={refresh} />

			<div className={styles.edit}>
				<div className={styles.edit__actions}>
					<div className={styles.actions__buttons}>
						<Button
							disabled={isSubmitting || !isDirty}
							type='submit'
							form='form'
							icon={SaveIcon}
						>
							{`${isSubmitting ? 'Submitting' : 'Save'}`}
						</Button>
					</div>
					<div className={styles.actions__buttons}>
						<Button
							disabled={isSubmitting || !isDirty}
							kind='secondary'
							onClick={() => reset()}
							icon={CloseIcon}
						>
							Reset
						</Button>
					</div>
				</div>

				<div className={styles.questions}>
					<FormProvider
						register={register}
						control={control}
						watch={watch}
						setValue={setValue}
						errors={errors}
						clearErrors={clearErrors}
						remove={remove}
					>
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
							<div className={styles.list}>
								<div className={styles.questions__actions}>
									<div className={styles.actions__buttons}>
										<Button
											type='button'
											onClick={handleAddQuestionClick}
											icon={AddIcon}
										>
											Add Question
										</Button>
									</div>
								</div>
								<DragAndDropContextProvider swap={swap}>
									<div className={styles.questions__list}>
										{fields.map((field, index) => (
											<Draggable
												key={field.id}
												index={index}
												swap={swap}
												item={QuestionCardEdit}
											/>
										))}
									</div>
								</DragAndDropContextProvider>
							</div>
						</form>
					</FormProvider>
				</div>
			</div>
		</section>
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
