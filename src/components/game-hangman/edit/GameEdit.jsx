import { useContext } from 'react';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { updateGame } from '../../../lib/api/game-hangman';
import { AuthContext } from '../../../lib/context/AuthContext';
import { DragAndDropContextProvider } from '../../../lib/context/DragAndDropContextProvider';
import Button from '../../buttons/Button';
import GameInfo from '../../games/GameInfo';
import AddIcon from '../../icons/AddIcon';
import CloseIcon from '../../icons/CloseIcon';
import SaveIcon from '../../icons/SaveIcon';
import Draggable from '../../shared/Draggable';
import styles from './GameEdit.module.css';
import WordCardEdit from './WordCardEdit';

const GameEdit = ({ game, refresh }) => {
	const { accessToken } = useContext(AuthContext);

	const {
		register,
		handleSubmit,
		control,
		watch,
		setValue,
		reset,
		formState: { errors, isDirty, isSubmitting }
	} = useForm({ defaultValues: { title: game?.title, words: game?.words } });

	const { fields, append, swap, remove } = useFieldArray({
		name: 'words',
		control
	});

	const handleAddWordClick = () => {
		append({ word: '', maxTries: 10 });
	};

	const onCleanInput = nameInput => {
		setValue(nameInput, '', { shouldDirty: true });
	};

	return (
		<section className={styles.container}>
			<GameInfo game={game} refresh={refresh} />

			<div className={styles.words}>
				<FormProvider
					register={register}
					watch={watch}
					errors={errors}
					onCleanInput={onCleanInput}
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
						<div className={styles.actions}>
							<div className={styles.actions__left}>
								<Button type='button' onClick={handleAddWordClick}>
									<AddIcon className={styles.icon} />
									<span>Add Word</span>
								</Button>
							</div>
							<div className={styles.actions__right}>
								<Button
									disabled={isSubmitting || !isDirty}
									type='submit'
									form='form'
								>
									<SaveIcon className={styles.icon} />
									<span>{`${isSubmitting ? 'Submitting' : 'Save'}`}</span>
								</Button>

								<Button
									disabled={isSubmitting || !isDirty}
									kind='secondary'
									onClick={() => reset()}
								>
									<CloseIcon className={styles.icon} />
									<span>Reset</span>
								</Button>
							</div>
						</div>

						<DragAndDropContextProvider swap={swap}>
							<div className={styles.words__list}>
								{fields.map((field, index) => (
									<Draggable key={field.id} index={index} swap={swap}>
										<WordCardEdit index={index} control={control} />
									</Draggable>
								))}
							</div>
						</DragAndDropContextProvider>
					</form>
				</FormProvider>
			</div>
		</section>
	);
};

const handleSubmitForm = async ({ accessToken, id, data, reset }) => {
	const success = await updateGame({
		accessToken,
		id,
		game: { ...data, type: 'hangman' }
	});

	if (success) {
		reset({ ...data });
	}
};

export default GameEdit;
