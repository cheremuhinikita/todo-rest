import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import { useAuthContext } from '@providers';
import { ILoginForm, loginFormSchema } from '@core/schemes';

import { ButtonSubmit, Link } from '@components';
import { PageUrls } from '@core/enums';
import { useForm } from '@core/hooks';

import useStyles from './styled';

export const LoginPage: React.FC<RouteComponentProps> = () => {
	const classes = useStyles();
	const { login } = useAuthContext();

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<ILoginForm, void>({
		source: login,
		schema: loginFormSchema,
	});

	return (
		<Container component="main" maxWidth="xs">
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Вход
				</Typography>
				<form noValidate onSubmit={handleSubmit()} className={classes.form}>
					<TextField
						{...register('username')}
						autoFocus
						fullWidth
						id="username"
						label="Имя пользователя"
						margin="normal"
						variant="outlined"
						error={!!errors.username}
						helperText={errors.username?.message}
					/>
					<TextField
						{...register('password')}
						fullWidth
						id="password"
						type="password"
						label="Пароль"
						margin="normal"
						variant="outlined"
						autoComplete="current-password"
						error={!!errors.password}
						helperText={errors.password?.message}
					/>
					<ButtonSubmit
						fullWidth
						variant="contained"
						color="primary"
						isLoading={isSubmitting}
						className={classes.submit}
					>
						Войти
					</ButtonSubmit>
					<Grid container>
						<Grid item xs>
							<Link to={PageUrls.recoveryPassword} variant="body2">
								Забыли пароль?
							</Link>
						</Grid>
						<Grid item>
							<Link to={PageUrls.register} variant="body2">
								Еще не зарегистрированы?
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
		</Container>
	);
};
