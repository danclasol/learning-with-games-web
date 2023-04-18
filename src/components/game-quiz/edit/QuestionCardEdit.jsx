import { useFieldArray, useFormContext } from 'react-hook-form';
import { getLetterOptionFromIndex } from '../../../lib/games/quiz';
import { isValidWord } from '../../../lib/utils/regex';
import IconButton from '../../buttons/IconButton';
import InputNumber from '../../forms/InputNumber';
import InputOption from '../../forms/InputOption';
import InputSelect from '../../forms/InputSelect';
import InputText from '../../forms/InputText';
import AddIcon from '../../icons/AddIcon';
import CloseIcon from '../../icons/CloseIcon';
import TrashIcon from '../../icons/TrashIcon';
import styles from './QuestionCardEdit.module.css';

const QuestionCardEdit = ({ index }) => {
	const { register, control, watch, remove, errors } = useFormContext();
	const {
		fields,
		append,
		remove: removeOption
	} = useFieldArray({
		name: `questions[${index}].options`,
		control
	});

	const watchAnswer = watch(`questions.${index}.answer`);
	const errorsEdit = errors?.questions && errors?.questions[index];

	return (
		<div className={styles.card}>
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
					/>
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
										error={errorsEdit?.options[i]?.text?.message}
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
						<span>Add option</span>
					</div>
				</div>
			</div>
			<div className={styles.actions}>
				<IconButton
					icon={TrashIcon}
					filled
					size='large'
					kind='secondary'
					type='button'
					onClick={() => remove(index)}
				/>
			</div>
		</div>
	);
};

export default QuestionCardEdit;
