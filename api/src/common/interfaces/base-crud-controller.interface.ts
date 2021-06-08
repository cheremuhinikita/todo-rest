/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IBaseCrudController<T> {
	create(...args: any[]): Promise<T>;

	findAll(...args: any[]): Promise<T[]>;

	findOne(...args: any[]): Promise<T>;

	update(...args: any[]): Promise<T>;

	remove(...args: any[]): Promise<true>;
}
