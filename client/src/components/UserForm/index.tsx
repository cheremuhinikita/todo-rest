import React from 'react';

import { FormControl, Grid, InputLabel, TextField } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText';

import { ButtonSubmit } from '@components';
import { useForm } from '@core/hooks';
import { createOrUpdateUserFormSchema, ICreateOrUpdateUserForm } from '@core/schemes';

import MenuItem from '@material-ui/core/MenuItem';
import { Role } from '@core/enums';

import useStyles from './styled';

interface IProps {
	source: (data: ICreateOrUpdateUserForm) => void;
	buttonText: string;
	defaultValues?: Partial<ICreateOrUpdateUserForm>;
}

export const UserForm: React.FC<IProps> = ({ source, defaultValues, buttonText }) => {
	const classes = useStyles();

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors, isSubmitting },
	} = useForm<ICreateOrUpdateUserForm, void>({
		source,
		schema: createOrUpdateUserFormSchema,
		defaultValues,
	});

	return (
		<form noValidate onSubmit={handleSubmit()} className={classes.form}>
			<Grid container spacing={2} justify="flex-end">
				<TextField
					{...register('email')}
					autoFocus
					fullWidth
					id="email"
					label="E-mail"
					autoComplete="email"
					variant="outlined"
					value={watch().email}
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
					value={watch().username}
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
					value={watch().password}
					autoComplete="current-password"
					error={!!errors.password}
					helperText={errors.password?.message}
				/>
				<FormControl
					error={!!errors.role}
					fullWidth
					variant="outlined"
					className={classes.formControl}
				>
					<InputLabel id="demo-simple-select-outlined-label">Age</InputLabel>
					<Select
						{...register('role')}
						labelId="demo-simple-select-outlined-label"
						id="demo-simple-select-outlined"
						value={watch().role}
					>
						<MenuItem value={Role.USER}>Пользователь</MenuItem>
						<MenuItem value={Role.ADMIN}>Админ</MenuItem>
					</Select>
					{errors.role?.message && (
						<FormHelperText>{errors.role?.message}</FormHelperText>
					)}
				</FormControl>
				<Grid justify="flex-end">
					<ButtonSubmit
						variant="contained"
						color="primary"
						isLoading={isSubmitting}
						className={classes.submit}
					>
						{buttonText}
					</ButtonSubmit>
				</Grid>
			</Grid>
		</form>
	);
};
