export interface IBaseFormProps<T extends Record<string, string>> {
	source: (data: T) => void;
	buttonText: string;
	defaultValues?: Partial<T>;
}
