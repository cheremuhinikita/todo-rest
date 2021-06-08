import React from 'react';

import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { useForm } from '@core/hooks';

import { ButtonSubmit } from '@components';

import { IRecoveryPasswordForm, recoveryPasswordFormSchema } from '@core/schemes';
import { useAuthContext } from '@providers';
import useStyles from './styled';

interface IProps {
	handleNext: () => void;
}

export const RecoveryPassword: React.FC<IProps> = ({ handleNext }) => {
	const classes = useStyles();
	const { recoveryPassword } = useAuthContext();

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<IRecoveryPasswordForm, true>({
		source: recoveryPassword,
		schema: recoveryPasswordFormSchema,
	});

	const onSubmit = (data: true) => {
		if (data) handleNext();
	};

	return (
		<>
			<Typography variant="caption" align="left" className={classes.caption}>
				Сообщите нам свой адрес электронной почты, чтобы мы могли отправить вам ссылку для
				сброса
			</Typography>
			<form noValidate onSubmit={handleSubmit(onSubmit)} className={classes.form}>
				<TextField
					{...register('email')}
					fullWidth
					id="email"
					label="E-mail"
					autoComplete="email"
					variant="outlined"
					error={!!errors.email}
					helperText={errors.email?.message}
				/>
				<div className={classes.buttons}>
					<ButtonSubmit
						variant="contained"
						color="primary"
						isLoading={isSubmitting}
						className={classes.button}
					>
						Восстановить
					</ButtonSubmit>
				</div>
			</form>
		</>
	);
};
