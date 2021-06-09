/* eslint-disable @typescript-eslint/no-explicit-any */
import { Nullable } from '@core/types';

export interface IAsync<T> {
	execute: (...args: any[]) => Promise<void>;
	data: Nullable<T>;
	loading: boolean;
	error: unknown;
}
