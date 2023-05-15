import { useEffect, useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { getLetterOptionFromIndex } from '../../../lib/games/quiz';
import { isImageValid } from '../../../lib/utils/images';
import { isValidWord } from '../../../lib/utils/regex';
import IconButton from '../../buttons/IconButton';
import InputNumber from '../../forms/InputNumber';
import InputOption from '../../forms/InputOption';
import InputSelect from '../../forms/InputSelect';
import InputText from '../../forms/InputText';
import AddIcon from '../../icons/AddIcon';
import CloseIcon from '../../icons/CloseIcon';
import ImageIcon from '../../icons/ImageIcon';
import MoveIcon from '../../icons/MoveIcon';
import TrashIcon from '../../icons/TrashIcon';
import ImagePreview from './ImagePreview';
import styles from './QuestionCardEdit.module.css';

const QuestionCardEdit = ({ index, toggleIsDraggable }) => {
	const { register, control, watch, setValue, remove, errors, clearErrors } =
		useFormContext();
	const {
		fields,
		append,
		remove: removeOption
	} = useFieldArray({
		name: `questions[${index}].options`,
		control
	});

	const watchAddMedia = watch(`questions.${index}.image`);
	const [addMedia, setAddMedia] = useState(Boolean(watchAddMedia));

	const watchAnswer = watch(`questions.${index}.answer`);
	const errorsEdit = errors?.questions && errors?.questions[index];

	const handleAddMediaToggle = () => {
		if (addMedia) {
			setValue(`questions.${index}.image`, '', { shouldDirty: true });
		}

		setAddMedia(!addMedia);
		clearErrors(`questions.${index}.image`);
	};

	const handleCleanInput = nameInput => {
		setValue(`questions.${index}.${nameInput}`, '', { shouldDirty: true });
	};

	useEffect(() => {
		if (!watchAddMedia) return;

		setAddMedia(Boolean(watchAddMedia));
	}, [watchAddMedia]);

	return (
		<div className={styles.card}>
			<div className={styles.card__nav}>
				<span className={styles.card__index}>{index + 1}</span>
				<IconButton
					icon={MoveIcon}
					type='button'
					className={styles.icon__move}
					onMouseDown={toggleIsDraggable}
				/>
				<IconButton
					icon={TrashIcon}
					filled
					kind='secondary'
					type='button'
					onClick={() => remove(index)}
				/>
			</div>
			<div className={styles.card__form}>
				<div className={styles.form__fields}>
					<div className={styles.form__field}>
						<InputText
							name={`questions.${index}.question`}
							label='Question'
							placeholder='Question'
							register={register}
							validate={{
								required: 'Field required',
								minLength: {
									value: 2,
									message: 'At least 2 characters'
								},
								pattern: { value: isValidWord, message: 'Invalid characters' }
							}}
							error={errorsEdit?.question?.message}
							onClean={() => handleCleanInput('question')}
						/>
					</div>
					<div className={styles.form__addMedia}>
						{!addMedia && (
							<div className={styles.icon__image}>
								<IconButton
									icon={ImageIcon}
									type='button'
									filled
									onClick={handleAddMediaToggle}
								/>
								<span className={styles.icon__text}>
									{addMedia ? 'Remove image' : 'Add image'}
								</span>
							</div>
						)}
						{addMedia && (
							<div className={styles.form__media}>
								<ImagePreview
									image={watchAddMedia}
									error={errorsEdit?.image?.message}
								/>
								<div className={styles.form__fields}>
									<div className={styles.form__field}>
										<InputText
											name={`questions.${index}.image`}
											label='Image'
											placeholder='Image URL'
											register={register}
											validate={{
												validate: async value => {
													const result = await isImageValid(value);
													return result || 'Invalid image';
												}
											}}
											error={errorsEdit?.image?.message}
											onClean={() => handleCleanInput('image')}
										/>
									</div>
								</div>
								<div className={styles.close}>
									<IconButton
										icon={CloseIcon}
										filled
										kind='secondary'
										size='small'
										onClick={handleAddMediaToggle}
									/>
								</div>
							</div>
						)}
					</div>

					<div className={styles.form__group}>
						<div className={styles.form__group__field}>
							<InputNumber
								name={`questions.${index}.points`}
								label='Points'
								placeholder='Points'
								min={0}
								register={register}
								validate={{
									required: 'Field required',
									valueAsNumber: true,
									min: { value: 0, message: 'Min value 0' }
								}}
								error={errorsEdit?.points?.message}
							/>
						</div>
						<div className={styles.form__group__field}>
							<InputSelect
								name={`questions.${index}.answer`}
								label='Correct Answer'
								register={register}
								validate={{
									required: 'Field required',
									valueAsNumber: true
								}}
								error={errorsEdit?.answer?.message}
							>
								<option value=''></option>
								{fields.map((field, index) => {
									return (
										<option key={field.id} value={index}>
											{`${getLetterOptionFromIndex(index)}`}
										</option>
									);
								})}
							</InputSelect>
						</div>
					</div>
					<div className={styles.form__field__array}>
						<div className={styles.options}>
							<label className={styles.options__label}>Options</label>
							{fields.map((field, i) => {
								return (
									<div key={field.id} className={styles.option}>
										<InputOption
											index={i}
											name={`questions.${index}.options.${i}.text`}
											placeholder={`Option ${i + 1}`}
											register={register}
											validate={{
												required: 'Field required'
											}}
											error={
												errorsEdit?.options &&
												errorsEdit?.options[i]?.text?.message
											}
											isCorrectOption={i === watchAnswer}
										/>
										<div className={styles.option__actions}>
											<IconButton
												type='button'
												icon={CloseIcon}
												filled
												onClick={() => removeOption(i)}
											/>
										</div>
									</div>
								);
							})}
						</div>
						<div className={styles.option__add}>
							<IconButton
								icon={AddIcon}
								filled
								onClick={() => append({ text: '' })}
								type='button'
							/>
							<span className={styles.icon__text}>Add option</span>
						</div>
					</div>
				</div>
				<div className={styles.actions}></div>
			</div>
		</div>
	);
};

export default QuestionCardEdit;
