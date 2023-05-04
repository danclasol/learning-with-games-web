import { useContext } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { updateGroup } from '../../lib/api/groups';
import { AuthContext } from '../../lib/context/AuthContext';
import InputText from '../forms/InputText';
import GamesList from '../game-list/GamesList';
import GroupEditActions from '../group-actions/GroupEditActions';
import styles from './GroupEdit.module.css';

const GroupEdit = ({ group }) => {
	const { accessToken } = useContext(AuthContext);
	const {
		register,
		handleSubmit,
		watch,
		setValue,
		reset,
		formState: { errors, isDirty, isSubmitting }
	} = useForm({
		defaultValues: {
			name: group?.name,
			level: group?.level,
			course: group?.course
		}
	});

	const onCleanInput = nameInput => {
		setValue(nameInput, '', { shouldDirty: true });
	};

	return (
		<>
			<section className={styles.container}>
				<GroupEditActions
					groupId={group.id}
					isDirty={isDirty}
					isSubmitting={isSubmitting}
					clearForm={reset}
				/>

				<div className={styles.group}>
					<FormProvider
						register={register}
						watch={watch}
						errors={errors}
						onCleanInput={onCleanInput}
					>
						<form
							id='form'
							className={styles.form}
							onSubmit={handleSubmit(async data => {
								await handleSubmitForm({
									accessToken,
									id: group.id,
									data,
									reset
								});
							})}
						>
							<div className={styles.group__info}>
								<div className={styles.form__fields}>
									<div className={styles.form__field}>
										<InputText
											name='name'
											label='Name'
											placeholder='Name'
											register={register}
											validate={{
												required: 'Field required',
												minLength: {
													value: 4,
													message: 'At least 4 characters'
												}
											}}
											error={errors.name?.message}
											onClean={() => onCleanInput('name')}
										/>
									</div>
									<div className={styles.form__group}>
										<div className={styles.form__group__field}>
											<InputText
												name='level'
												label='Level'
												placeholder='Level'
												register={register}
												validate={{
													minLength: {
														value: 2,
														message: 'At least 2 characters'
													}
												}}
												error={errors.level?.message}
												onClean={() => onCleanInput('level')}
											/>
										</div>
										<div className={styles.form__group__field}>
											<InputText
												name='course'
												label='Course'
												placeholder='Course'
												register={register}
												validate={{
													minLength: {
														value: 4,
														message: 'At least 4 characters'
													}
												}}
												error={errors.course?.message}
												onClean={() => onCleanInput('course')}
											/>
										</div>
									</div>
								</div>
							</div>
						</form>
					</FormProvider>

					<div className={styles.games}>
						<GamesList groupId={group.id} />
					</div>
				</div>
			</section>
		</>
	);
};

const handleSubmitForm = async ({ accessToken, id, data, reset }) => {
	const success = await updateGroup({
		accessToken,
		id,
		group: { ...data }
	});

	if (success) {
		reset({ ...data });
	}
};

export default GroupEdit;
