import React from 'react';

import { Grid, TextField } from '@material-ui/core';

import { ButtonSubmit, Form } from '@components';
import { useForm } from '@core/hooks';
import { createOrUpdateTodoFormSchema, ICreateOrUpdateTodoForm } from '@core/schemes';
import { IBaseFormProps } from '@core/interfaces';

import useStyles from './styled';

type Props = IBaseFormProps<ICreateOrUpdateTodoForm>;

export const TodoForm: React.FC<Props> = ({ source, defaultValues, buttonText }) => {
	const classes = useStyles();

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors, isSubmitting },
	} = useForm<ICreateOrUpdateTodoForm, void>({
		source,
		schema: createOrUpdateTodoFormSchema,
		defaultValues,
	});

	return (
		<Form onSubmit={handleSubmit()} className={classes.form}>
			<Grid container spacing={2} justify="flex-end">
				<TextField
					{...register('title')}
					autoFocus
					fullWidth
					id="title"
					label="Название"
					variant="outlined"
					value={watch().title}
					error={!!errors.title}
					helperText={errors.title?.message}
				/>
				<TextField
					{...register('description')}
					fullWidth
					id="username"
					label="Описание"
					margin="normal"
					variant="outlined"
					value={watch().description}
					error={!!errors.description}
					helperText={errors.description?.message}
				/>
				<ButtonSubmit
					variant="contained"
					color="primary"
					isLoading={isSubmitting}
					className={classes.submit}
				>
					{buttonText}
				</ButtonSubmit>
			</Grid>
		</Form>
	);
};
