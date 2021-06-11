/* eslint-disable indent */
import React from 'react';
import { Control, Controller, Path } from 'react-hook-form';

import MuiTextField, { OutlinedTextFieldProps } from '@material-ui/core/TextField';

interface IProps<T extends Record<string, string>>
	extends Omit<OutlinedTextFieldProps, 'name' | 'variant'> {
	name: Path<T>;
	control: Control<T>;
}

export const TextField = <T extends Record<string, string>>({
	name,
	control,
	error,
	margin = 'normal',
	...props
}: IProps<T>): React.ReactElement => (
	<Controller
		name={name}
		control={control}
		render={({ field, fieldState: { error: fieldError } }) => (
			<MuiTextField
				{...field}
				{...props}
				variant="outlined"
				margin={margin}
				error={error || !!fieldError}
				helperText={fieldError?.message}
			/>
		)}
	/>
);
