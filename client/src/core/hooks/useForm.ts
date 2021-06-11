import {
	useForm as useHookForm,
	UnpackNestedValue,
	UseFormProps,
	UseFormReturn,
	FieldValues,
	UseFormStateReturn,
} from 'react-hook-form';
import { SchemaOf } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { handleValidationError } from '@core/utils';

type Handler<T> = (data: T) => void;

interface IUseFormProps<T extends FieldValues = FieldValues, U = Record<string, unknown>>
	extends Omit<UseFormProps<T>, 'resolver'> {
	source: (data: UnpackNestedValue<T>) => Promise<U> | U;
	schema: SchemaOf<T>;
}

interface IFormStateReturn<T> extends UseFormStateReturn<T> {
	isDisabled: boolean;
}

interface IUseFormReturn<T, U> extends Omit<UseFormReturn<T>, 'handleSubmit' | 'formState'> {
	formState: IFormStateReturn<T>;
	handleSubmit: (handler?: Handler<U>) => () => Promise<void>;
}

export const useForm = <T extends FieldValues = FieldValues, U = Record<string, unknown>>({
	schema,
	source,
	mode = 'onChange',
	...props
}: IUseFormProps<T, U>): IUseFormReturn<T, U> => {
	const {
		handleSubmit: submit,
		setError,
		formState: { isDirty, isValid, ...restFormState },
		...results
	} = useHookForm<T>({
		...props,
		mode,
		resolver: yupResolver(schema),
	});

	const isDisabled = !isDirty || !isValid;

	const onSubmit = (handler?: Handler<U>) => {
		return async (data: UnpackNestedValue<T>): Promise<void> => {
			try {
				const result = await source(data);
				if (handler) handler(result);
			} catch (err) {
				handleValidationError(err, setError);
			}
		};
	};

	const handleSubmit = (handler?: Handler<U>) => submit(onSubmit(handler));

	return {
		...results,
		setError,
		handleSubmit,
		formState: {
			isDisabled,
			isDirty,
			isValid,
			...restFormState,
		},
	};
};
