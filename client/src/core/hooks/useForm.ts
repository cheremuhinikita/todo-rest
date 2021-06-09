import {
	useForm as useHookForm,
	UnpackNestedValue,
	UseFormProps,
	UseFormReturn,
	FieldValues,
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

interface IUseFormReturn<T, U> extends Omit<UseFormReturn<T>, 'handleSubmit'> {
	handleSubmit: (handler?: Handler<U>) => () => Promise<void>;
}

export const useForm = <T extends FieldValues = FieldValues, U = Record<string, unknown>>({
	schema,
	source,
	...props
}: IUseFormProps<T, U>): IUseFormReturn<T, U> => {
	const {
		handleSubmit: submit,
		setError,
		...results
	} = useHookForm<T>({
		...props,
		resolver: yupResolver(schema),
	});

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
	};
};
