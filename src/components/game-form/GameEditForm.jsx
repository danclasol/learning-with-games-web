import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { LIST_GAMES } from '../../constants/games';
import { updateGame } from '../../lib/api/games';
import { AuthContext } from '../../lib/context/AuthContext';
import { useGroups } from '../../lib/hooks/useGroups';
import Button from '../buttons/Button';
import InputSelect from '../forms/InputSelect';
import InputText from '../forms/InputText';
import Loading from '../shared/Loading';
import styles from './GameEditForm.module.css';

const GameEditForm = ({ id, game, groupId, closeModal, refresh }) => {
	const { accessToken } = useContext(AuthContext);

	const { groups, loading } = useGroups({});
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors, isSubmitting, isValid }
	} = useForm({
		defaultValues: {
			title: game?.title,
			type: game?.type,
			groupId: game?.groupId
		}
	});

	const onCleanInput = nameInput => {
		setValue(nameInput, '', { shouldDirty: true });
	};

	return (
		<section className={styles.wrapper}>
			<h3 className={styles.title}>Edit Game</h3>

			<form
				className={styles.form}
				onSubmit={handleSubmit(async data => {
					await handleSubmitForm({
						accessToken,
						id,
						data,
						closeModal,
						refresh
					});
				})}
			>
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
				<div className={styles.form__field}>
					<InputSelect
						name='type'
						label='Game'
						disabled
						register={register}
						validate={{
							required: 'Field required'
						}}
						error={errors.type?.message}
					>
						<option value=''>Select game...</option>
						{LIST_GAMES.map(item => (
							<option key={item.type} value={item.type}>
								{item.name}
							</option>
						))}
					</InputSelect>
				</div>
				{!groupId && loading && <Loading />}
				{!groupId && !loading && (
					<div className={styles.form__field}>
						<InputSelect
							name='groupId'
							label='Group'
							register={register}
							error={errors.groupId?.message}
						>
							<option value=''>Without group</option>
							{groups.map(item => (
								<option key={item.id} value={item.id}>
									{item.name}
								</option>
							))}
						</InputSelect>
					</div>
				)}
				<div className={styles.actions}>
					<Button disabled={isSubmitting || !isValid}>
						{isSubmitting ? 'Saving...' : 'Save'}
					</Button>
				</div>
			</form>
		</section>
	);
};

const handleSubmitForm = async ({
	accessToken,
	id,
	data,
	closeModal,
	refresh
}) => {
	const success = await updateGame({ accessToken, id, game: data });

	if (success) {
		refresh();
		closeModal();
	}
};

export default GameEditForm;
