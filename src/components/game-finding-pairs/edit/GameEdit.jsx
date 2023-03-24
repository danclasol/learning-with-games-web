import { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { updateGame } from '../../../lib/api/finding-pairs-games';
import Button from '../../buttons/Button';
import InputText from '../../forms/InputText';
import ArrowLeftIcon from '../../icons/ArrowLeftIcon';
import CloseIcon from '../../icons/CloseIcon';
import PlayIcon from '../../icons/PlayIcon';
import SaveIcon from '../../icons/SaveIcon';
import CardAdd from './CardAdd';
import CardEdit from './CardEdit';
import styles from './GameEdit.module.css';

const GameEdit = ({ game }) => {
	const navigate = useNavigate();
	const [addPairForm, setAddPairForm] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors, isDirty, dirtyFields, isSubmitting },
		control,
		getValues,
		trigger,
		watch,
		reset,
		resetField
	} = useForm({ defaultValues: { title: game?.title, pairs: game?.pairs } });

	const { fields, append, remove } = useFieldArray({
		name: 'pairs',
		control
	});

	const handleAddPairClick = () => {
		setAddPairForm(true);
	};

	const handleCancelAddPairClick = () => {
		setAddPairForm(false);
	};

	const addPair = pair => {
		append({ ...pair });
	};

	const removePair = index => {
		remove(index);
	};

	console.log({ dirtyFields });

	return (
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
						<Button disabled={isSubmitting || !isDirty} onClick={() => reset()}>
							<div className={styles.button__content}>
								<CloseIcon className={styles.icon} />
								<span>Reset</span>
							</div>
						</Button>
					)}
					<Button disabled={isSubmitting || !isDirty} type='submit' form='form'>
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
					await handleSubmitForm({ id: game.id, data });
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

				<div className={styles.pairs}>
					<div className={styles.pairs__add}>
						<div className={styles.actions}>
							<Button type='button' onClick={handleAddPairClick}>
								Add pair
							</Button>
						</div>
						{addPairForm && (
							<CardAdd
								closeForm={handleCancelAddPairClick}
								register={register}
								getValues={getValues}
								watch={watch}
								addPair={addPair}
								errors={errors.newpair}
								trigger={trigger}
								resetField={resetField}
								dirtyFields={dirtyFields}
							/>
						)}
					</div>
					<div className={styles.pairs__list}>
						{fields.map((pair, index) => (
							<CardEdit
								key={pair.id}
								index={index}
								text={pair.text}
								image={pair.image}
								register={register}
								error={errors.pairs}
								watch={watch}
								addPair={addPair}
								removePair={removePair}
								errors={errors.pairs}
								trigger={trigger}
								resetField={resetField}
								dirtyFields={dirtyFields}
							>
								{pair.value}
							</CardEdit>
						))}
					</div>
				</div>
			</form>
		</section>
	);
};

const handleSubmitForm = async ({ id, data }) => {
	const success = await updateGame({
		id,
		game: { ...data, type: 'finding-pairs' }
	});
};

export default GameEdit;
