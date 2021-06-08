import React from 'react';

import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { useForm } from '@core/hooks';

import { ButtonSubmit } from '@components';

import { IResetPasswordForm, resetPasswordFormSchema } from '@core/schemes';

import { Button } from '@material-ui/core';
import { useAuthContext } from '@providers';
import useStyles from './styled';

interface IProps {
	handleNext: () => void;
	handlePrev: () => void;
}

export const ResetPassword: React.FC<IProps> = ({ handleNext, handlePrev }) => {
	const classes = useStyles();
	const { email, resetPassword } = useAuthContext();

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<IResetPasswordForm, true>({
		source: resetPassword,
		schema: resetPasswordFormSchema,
		defaultValues: {
			email,
		},
	});

	const onSubmit = (data: true) => {
		if (data) handleNext();
	};

	return (
		<>
			<Typography variant="caption" align="left">
				Сбросьте пароль вашей учетной записи с помощью кода, который пришел вам на e-mail
			</Typography>
			<form noValidate onSubmit={handleSubmit(onSubmit)} className={classes.form}>
				<TextField
					{...register('email')}
					disabled
					fullWidth
					id="email"
					label="E-mail"
					margin="normal"
					variant="outlined"
					defaultValue={email}
				/>
				<TextField
					{...register('passwordChangeCode')}
					fullWidth
					id="passwordChangeCode"
					label="Код"
					margin="normal"
					variant="outlined"
					error={!!errors.passwordChangeCode}
					helperText={errors.passwordChangeCode?.message}
				/>
				<TextField
					{...register('password')}
					fullWidth
					id="password"
					label="Пароль"
					margin="normal"
					variant="outlined"
					error={!!errors.password || !!errors.passwordConfirm}
					helperText={errors.password?.message}
				/>
				<TextField
					{...register('passwordConfirm')}
					fullWidth
					id="passwordConfirm"
					label="Повторите пароль"
					margin="normal"
					variant="outlined"
					error={!!errors.passwordConfirm}
					helperText={errors.passwordConfirm?.message}
				/>
				<div className={classes.buttons}>
					<Button onClick={handlePrev} className={classes.button}>
						Назад
					</Button>
					<ButtonSubmit
						variant="contained"
						color="primary"
						isLoading={isSubmitting}
						className={classes.button}
					>
						Сбросить
					</ButtonSubmit>
				</div>
			</form>
		</>
	);
};
