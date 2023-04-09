import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { loginRequest } from '../../lib/api/auth';
import { AuthContext } from '../../lib/context/AuthContext';
import Button from '../buttons/Button';
import InputPassword from '../forms/InputPassword';
import InputText from '../forms/InputText';
import ErrorMessage from './ErrorMessage';
import styles from './Login.module.css';

function Login() {
	const { login } = useContext(AuthContext);

	const {
		register,
		handleSubmit,
		setError,
		clearErrors,
		formState: { errors, isSubmitting }
	} = useForm({
		defaultValues: { email: '', password: '' }
	});

	const onSubmit = async data => {
		const { auth, error, aborted } = await loginRequest({ ...data });

		if (error) {
			setError('error_login', { type: error.code, message: error.message });
			return;
		}

		if (aborted) return;

		login({ auth });
	};

	const onError = errors => {
		if (errors.error_login) {
			clearErrors('error_login');
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

				<div className={styles.actions}>
					<div className={styles.buttons}>
						<Button disabled={isSubmitting}>
							{isSubmitting ? 'Logging...' : 'Login'}
						</Button>
						{errors.error_login && (
							<ErrorMessage error={errors.error_login?.message} />
						)}
					</div>
					<div className={styles.links}>
						<Link to={'/forgot-password'} className={styles.link}>
							Forgot password?
						</Link>
						<Link to={'/register'} className={styles.link}>
							Create account
						</Link>
					</div>
				</div>
			</form>
		</section>
	);
}

export default Login;
