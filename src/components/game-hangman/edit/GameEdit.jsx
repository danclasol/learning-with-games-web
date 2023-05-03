import { useContext, useRef } from 'react';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { updateGame } from '../../../lib/api/game-hangman';
import { AuthContext } from '../../../lib/context/AuthContext';
import Button from '../../buttons/Button';
import InputText from '../../forms/InputText';
import GameEditActions from '../../game-actions/GameEditActions';
import styles from './GameEdit.module.css';
import WordCardEdit from './WordCardEdit';

const GameEdit = ({ game }) => {
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

	const { fields, append, move, remove } = useFieldArray({
		name: 'words',
		control
	});

	const handleAddWordClick = () => {
		append({ word: '', maxTries: 10 });
	};

	const onCleanInput = nameInput => {
		setValue(nameInput, '', { shouldDirty: true });
	};

	const dragItem = useRef();
	const dragOverItem = useRef();

	const handleDrag = position => {
		dragItem.current = position;
	};

	const handleDropEnter = position => {
		dragOverItem.current = position;
	};

	const handleDropEnd = () => {
		move(dragItem.current, dragOverItem.current);

		dragItem.current = null;
		dragOverItem.current = null;
	};

	return (
		<FormProvider
			register={register}
			watch={watch}
			errors={errors}
			onCleanInput={onCleanInput}
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
								<WordCardEdit
									key={field.id}
									index={index}
									control={control}
									handleDrag={handleDrag}
									handleDropEnter={handleDropEnter}
									handleDropEnd={handleDropEnd}
								/>
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
		game: { ...data, type: 'hangman' }
	});

	if (success) {
		reset({ ...data });
	}
};

export default GameEdit;
