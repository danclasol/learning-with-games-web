import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { updateGame } from '../../../lib/api/finding-pairs-games';
import Button from '../../buttons/Button';
import InputText from '../../forms/InputText';
import ArrowLeftIcon from '../../icons/ArrowLeftIcon';
import PlayIcon from '../../icons/PlayIcon';
import SaveIcon from '../../icons/TrashIcon copy';
import CardAdd from './CardAdd';
import CardEdit from './CardEdit';
import styles from './GameEdit.module.css';

const GameEdit = ({ game }) => {
	const navigate = useNavigate();

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [addPair, setAddPair] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm({ defaultValues: { title: game?.title } });

	const handleClickPlay = () => {
		navigate(`/games/${game.id}/play`);
	};

	const handleClicGoBack = () => {
		navigate('/games/');
	};

	const handleAddPairClick = () => {
		setAddPair(true);
	};

	const handleCancelAddPairClick = () => {
		setAddPair(false);
	};

	return (
		<section className={styles.content}>
			<div className={styles.actions}>
				<div className={styles.actions__buttons}>
					<Button onClick={handleClicGoBack} disabled={isSubmitting}>
						<div className={styles.button__content}>
							<ArrowLeftIcon className={styles.icon} />
							<span>Go back</span>
						</div>
					</Button>
				</div>
				<div className={styles.actions__buttons}>
					<Button onClick={handleClickPlay} disabled={isSubmitting}>
						<div className={styles.button__content}>
							<SaveIcon className={styles.icon} />
							<span>{`${isSubmitting ? 'Submitting' : 'Save'}`}</span>
						</div>
					</Button>
					<Button
						kind='secondary'
						onClick={handleClickPlay}
						disabled={isSubmitting}
					>
						<div className={styles.button__content}>
							<PlayIcon className={styles.icon} />
							<span>Play</span>
						</div>
					</Button>
				</div>
			</div>
			<div className={styles.game}>
				<div className={styles.game__info}>
					<form
						className={styles.form}
						onSubmit={handleSubmit(data => {
							handleSubmitForm({ id: game.id, data, setIsSubmitting });
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
						<Button disabled={isSubmitting}>
							{isSubmitting ? 'Saving...' : 'Save'}
						</Button>
					</form>
				</div>

				<div className={styles.game__pairs}>
					<div className={styles.game__pairs__actions}>
						<Button onClick={handleAddPairClick}>Add pair</Button>
					</div>
					{addPair && (
						<CardAdd gameId={game.id} closeForm={handleCancelAddPairClick} />
					)}
					<div className={styles.cards}>
						{!game?.pairs ? (
							<p>No pairs created</p>
						) : (
							game?.pairs.map((pair, index) => (
								<CardEdit
									key={index}
									id={pair.id}
									text={pair.text}
									image={pair.image}
									index={index}
									gameId={game.id}
								>
									{pair.value}
								</CardEdit>
							))
						)}
					</div>
				</div>
			</div>
		</section>
	);
};

const handleSubmitForm = async ({ id, data, setIsSubmitting }) => {
	setIsSubmitting(true);

	const success = await updateGame({
		id,
		game: { ...data, type: 'finding-pairs' }
	});

	if (success) {
		setIsSubmitting(false);
	}
};

export default GameEdit;
