import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import { useAuthContext } from '@providers';
import { IRegisterForm, registerFormSchema } from '@core/schemes';
import { useForm } from '@core/hooks';

import { ButtonSubmit, Link } from '@components';

import { PageUrls } from '@core/enums';
import useStyles from './styled';

export const RegisterPage: React.FC<RouteComponentProps> = () => {
	const classes = useStyles();
	const { register: registerAuth } = useAuthContext();

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<IRegisterForm, void>({
		source: registerAuth,
		schema: registerFormSchema,
	});

	return (
		<Container component="main" maxWidth="xs">
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Регистрация
				</Typography>
				<form noValidate onSubmit={handleSubmit()} className={classes.form}>
					<Grid container spacing={2}>
						<TextField
							{...register('email')}
							autoFocus
							fullWidth
							id="email"
							label="E-mail"
							autoComplete="email"
							variant="outlined"
							error={!!errors.email}
							helperText={errors.email?.message}
						/>
						<TextField
							{...register('username')}
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
					</Grid>
					<ButtonSubmit
						fullWidth
						variant="contained"
						color="primary"
						isLoading={isSubmitting}
						className={classes.submit}
					>
						зарегистрироваться
					</ButtonSubmit>
					<Grid container justify="flex-end">
						<Grid item>
							<Link to={PageUrls.login} variant="body2">
								Уже зарегистрированы?
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
		</Container>
	);
};
