export interface IBaseFormProps<T extends Record<string, string>> {
	source: (data: T) => Promise<void>;
	buttonText: string;
	confirmQuestion: string;
	defaultValues?: Partial<T>;
}
