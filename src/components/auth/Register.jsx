import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { registerRequest } from '../../lib/api/auth';
import Button from '../buttons/Button';
import InputPassword from '../forms/InputPassword';
import InputText from '../forms/InputText';
import ErrorMessage from './ErrorMessage';
import styles from './Register.module.css';

function Register() {
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		setError,
		clearErrors,
		watch,
		formState: { errors, isDirty, isSubmitting }
	} = useForm({
		defaultValues: {
			name: '',
			email: '',
			password: '',
			repeat_password: ''
		}
	});

	const onSubmit = async data => {
		const { error, aborted } = await registerRequest({ ...data });

		if (error) {
			setError('error_register', { type: error.code, message: error.message });
			return;
		}

		if (aborted) return;

		navigate('/login');
	};

	const onError = errors => {
		if (errors.error_register) {
			clearErrors('error_register');
			handleSubmit(onSubmit)();
		}
	};

	return (
		<section className={styles.register}>
			<h2 className={styles.title}>Create account</h2>
			<p className={styles.subtitle}>Fill up the form info</p>

			<form className={styles.form} onSubmit={handleSubmit(onSubmit, onError)}>
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
					/>
				</div>

				<div className={styles.form__field}>
					<InputText
						name='email'
						label='Email'
						placeholder='email'
						register={register}
						validate={{
							required: 'Field required',
							minLength: {
								value: 4,
								message: 'At least 4 characters'
							}
						}}
						error={errors.email?.message}
					/>
				</div>

				<div className={styles.form__field}>
					<InputPassword
						name='password'
						label='Password'
						placeholder='Password'
						register={register}
						validate={{
							required: 'Field required',
							minLength: {
								value: 4,
								message: 'At least 4 characters'
							}
						}}
						error={errors.password?.message}
					/>
				</div>

				<div className={styles.form__field}>
					<InputPassword
						name='repeat_password'
						label='Repeat password'
						placeholder='Repeat password'
						register={register}
						validate={{
							required: 'Field required',
							minLength: {
								value: 4,
								message: 'At least 4 characters'
							},
							validate: value => {
								if (watch('password') !== value) {
									return 'Password dont match';
								}
							}
						}}
						error={errors.repeat_password?.message}
					/>
				</div>

				<div className={styles.actions}>
					<div className={styles.buttons}>
						<Button disabled={isSubmitting || !isDirty}>
							{isSubmitting ? 'Submitting...' : 'Sign in'}
						</Button>
						{errors.error_register && (
							<ErrorMessage error={errors.error_register?.message} />
						)}
					</div>
					<div className={styles.links}>
						<Link to={'/login'} className={styles.link}>
							Already have an account?
						</Link>
					</div>
				</div>
			</form>
		</section>
	);
}

export default Register;
