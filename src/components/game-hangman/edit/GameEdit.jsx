import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { updateGame } from '../../../lib/api/game-hangman';
import Button from '../../buttons/Button';
import InputText from '../../forms/InputText';
import ArrowLeftIcon from '../../icons/ArrowLeftIcon';
import CloseIcon from '../../icons/CloseIcon';
import PlayIcon from '../../icons/PlayIcon';
import SaveIcon from '../../icons/SaveIcon';
import styles from './GameEdit.module.css';
import WordCardEdit from './WordCardEdit';

const GameEdit = ({ game }) => {
	const navigate = useNavigate();

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
				<div className={styles.actions}>
					<div className={styles.actions__buttons}>
						<Button
							onClick={() => {
								navigate('/games/');
							}}
							disabled={isSubmitting}
						>
							<div className={styles.button__content}>
								<ArrowLeftIcon className={styles.icon} />
								<span>Go back</span>
							</div>
						</Button>
					</div>
					<div className={styles.actions__buttons}>
						{isDirty && (
							<Button
								disabled={isSubmitting || !isDirty}
								onClick={() => reset()}
							>
								<div className={styles.button__content}>
									<CloseIcon className={styles.icon} />
									<span>Reset</span>
								</div>
							</Button>
						)}
						<Button
							disabled={isSubmitting || !isDirty}
							type='submit'
							form='form'
						>
							<div className={styles.button__content}>
								<SaveIcon className={styles.icon} />
								<span>{`${isSubmitting ? 'Submitting' : 'Save'}`}</span>
							</div>
						</Button>
						<Button
							kind='secondary'
							onClick={() => {
								navigate(`/games/${game.id}/play`);
							}}
							disabled={isSubmitting}
						>
							<div className={styles.button__content}>
								<PlayIcon className={styles.icon} />
								<span>Play</span>
							</div>
						</Button>
					</div>
				</div>

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
