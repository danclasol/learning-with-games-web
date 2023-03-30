import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../lib/context/AuthContext';
import Button from '../buttons/Button';
import InputText from '../forms/InputText';

import styles from './Login.module.css';

function Login() {
	const { login } = useContext(AuthContext);

	const {
		register,
		formState: { errors, isDirty, isSubmitting }
	} = useForm({ defaultValues: { email: '', password: '' } });

	return (
		<section className={styles.login}>
			<h2 className={styles.title}>Welcome</h2>
			<p className={styles.subtitle}>Enter your credentials</p>
			<form className={styles.form}>
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
					<Button disabled={isSubmitting || !isDirty} onClick={login}>
						{isSubmitting ? 'Login...' : 'Login'}
					</Button>

					<Link to={'/forgot-password'} className={styles.link}>
						Recordar contraseña
					</Link>
					<Link to={'/register'} className={styles.link}>
						Crear cuenta
					</Link>
				</div>
			</form>
		</section>
	);
}

export default Login;
