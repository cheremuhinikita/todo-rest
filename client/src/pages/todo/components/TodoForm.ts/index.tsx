import React from 'react';

import Grid from '@material-ui/core/Grid';

import { ButtonSubmit, Form, TextField } from '@components';
import { useForm } from '@core/hooks';
import { createOrUpdateTodoFormSchema, ICreateOrUpdateTodoForm } from '@core/schemes';
import { IBaseFormProps } from '@core/interfaces';

import useStyles from './styled';

type Props = IBaseFormProps<ICreateOrUpdateTodoForm>;

export const TodoForm: React.FC<Props> = ({
	source,
	buttonText,
	confirmQuestion,
	defaultValues,
}) => {
	const classes = useStyles();

	const {
		control,
		handleSubmit,
		formState: { isDisabled, isSubmitting },
	} = useForm<ICreateOrUpdateTodoForm, void>({
		source,
		schema: createOrUpdateTodoFormSchema,
		defaultValues,
	});

	return (
		<Form
			confirmSubmit
			isDisabled={isDisabled}
			confirmQuestion={confirmQuestion}
			onSubmit={handleSubmit()}
			className={classes.form}
		>
			<Grid container spacing={2} justify="flex-end">
				<TextField
					autoFocus
					fullWidth
					id="title"
					label="Название"
					name="title"
					control={control}
				/>
				<TextField
					fullWidth
					id="username"
					label="Описание"
					name="description"
					control={control}
				/>
				<ButtonSubmit
					variant="contained"
					color="primary"
					disabled={isDisabled}
					isLoading={isSubmitting}
					className={classes.submit}
				>
					{buttonText}
				</ButtonSubmit>
			</Grid>
		</Form>
	);
};
