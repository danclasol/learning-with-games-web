import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { login as loginRequest } from '../../lib/api/auth';
import { AuthContext } from '../../lib/context/AuthContext';
import Button from '../buttons/Button';
import InputText from '../forms/InputText';
import styles from './Login.module.css';

function Login() {
	const { login } = useContext(AuthContext);

	const {
		register,
		handleSubmit,
		setError,
		clearErrors,
		formState: { errors, isDirty, isSubmitting }
	} = useForm({
		criteriaMode: 'all',
		defaultValues: { email: '', password: '' }
	});

	const onSubmit = async data => {
		const { auth, error, aborted } = await loginRequest({ ...data });

		if (error)
			setError('login', { type: 'server', message: 'Bad credentials' });

		if (aborted) return;

		login({ auth });
	};

	const onError = errors => {
		if (errors.login) {
			clearErrors('login');
			handleSubmit(onSubmit)();
		}
	};

	return (
		<section className={styles.login}>
			<h2 className={styles.title}>Welcome</h2>
			<p className={styles.subtitle}>Enter your credentials</p>
			<form className={styles.form} onSubmit={handleSubmit(onSubmit, onError)}>
				<div className={styles.form__field}>
					<InputText
						name='email'
						label='Email'
						placeholder='Email'
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
					<InputText
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

				<div className={styles.actions}>
					<Button disabled={isSubmitting || !isDirty}>
						{isSubmitting ? 'Login...' : 'Login'}
					</Button>
					{errors.login && (
						<span className={styles.error}>{errors.login?.message}</span>
					)}

					<div className={styles.links}>
						<Link to={'/forgot-password'} className={styles.link}>
							Recordar contraseña
						</Link>
						<Link to={'/register'} className={styles.link}>
							Crear cuenta
						</Link>
					</div>
				</div>
			</form>
		</section>
	);
}

const handleSubmitForm = async ({ data, setError, login }) => {
	const { auth, error, aborted } = await loginService({ ...data });

	if (error) setError('login', { type: 'server', message: 'Bad credentials' });

	if (aborted) return;

	login({ auth });
};

export default Login;
