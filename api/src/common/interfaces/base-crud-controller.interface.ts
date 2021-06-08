export interface IBaseCrudController<T> {
	create(...args: unknown[]): Promise<T>;

	findAll(...args: unknown[]): Promise<T[]>;

	findOne(...args: unknown[]): Promise<T>;

	update(...args: unknown[]): Promise<T>;

	remove(...args: unknown[]): Promise<true>;
}
