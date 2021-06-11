import React from 'react';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { useForm } from '@core/hooks';

import { ButtonSubmit, Form, TextField } from '@components';

import { IResetPasswordForm, resetPasswordFormSchema } from '@core/schemes';

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
		control,
		handleSubmit,
		formState: { errors, isSubmitting, isDisabled },
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
			<Form
				isDisabled={isDisabled}
				onSubmit={handleSubmit(onSubmit)}
				className={classes.form}
			>
				<TextField
					disabled
					fullWidth
					id="email"
					label="E-mail"
					name="email"
					control={control}
				/>
				<TextField
					autoFocus
					fullWidth
					id="passwordChangeCode"
					label="Код"
					name="passwordChangeCode"
					control={control}
				/>
				<TextField
					fullWidth
					id="password"
					label="Пароль"
					name="password"
					control={control}
					error={!!errors.password || !!errors.passwordConfirm}
				/>
				<TextField
					fullWidth
					id="passwordConfirm"
					label="Повторите пароль"
					name="passwordConfirm"
					control={control}
				/>
				<div className={classes.buttons}>
					<Button onClick={handlePrev} className={classes.button}>
						Назад
					</Button>
					<ButtonSubmit
						variant="contained"
						color="primary"
						disabled={isDisabled}
						isLoading={isSubmitting}
						className={classes.button}
					>
						Сбросить
					</ButtonSubmit>
				</div>
			</Form>
		</>
	);
};
