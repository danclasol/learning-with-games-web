import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import Button from '../buttons/Button';
import InputText from '../forms/InputText';
import styles from './Register.module.css';

function Register() {
	const {
		register,
		formState: { errors, isDirty, isSubmitting }
	} = useForm({
		defaultValues: {
			name: '',
			username: '',
			password: '',
			repeat_password: ''
		}
	});

	return (
		<section className={styles.register}>
			<h2 className={styles.title}>Create account</h2>
			<p className={styles.subtitle}>Fill up the form info</p>

			<form className={styles.form}>
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

				<div className={styles.form__field}>
					<InputText
						name='repeat_password'
						label='Repeat password'
						placeholder='Repeat password'
						register={register}
						validate={{
							required: 'Field required',
							minLength: {
								value: 4,
								message: 'At least 4 characters'
							}
						}}
						error={errors.repeat_password?.message}
					/>
				</div>

				<div className={styles.actions}>
					<Button disabled={isSubmitting || !isDirty}>
						{isSubmitting ? 'Login...' : 'Login'}
					</Button>
					<Link to={'/login'} className={styles.link}>
						¿Ya tienes usuario?
					</Link>
				</div>
			</form>
		</section>
	);
}

export default Register;
