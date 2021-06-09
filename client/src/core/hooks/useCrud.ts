/* eslint-disable indent */
import React from 'react';

import { BaseCrudService } from '@core/services';
import { IBaseModel } from '@core/models/IBaseModel';
import { IAsync } from '@core/interfaces';
import { noopFn } from '@core/utils';

import { useAsync } from './useAsync';

interface IUserCrudProps<
	T extends IBaseModel,
	U extends Record<string, unknown>,
	C extends BaseCrudService<T, U>,
> {
	service: C;
	onCreate?: (data: T) => Promise<void> | void;
	onUpdate?: (data: true) => Promise<void> | void;
	onRemove?: (data: true) => Promise<void> | void;
}

export interface IUseCrudReturn<T extends IBaseModel, U extends Record<string, unknown>> {
	create: (data: U) => Promise<void>;
	findAll: IAsync<T[]>;
	findOne: IAsync<T>;
	update: (id: string, data: U) => Promise<void>;
	remove: (id: string) => Promise<void>;
}

export const useCrud = <
	T extends IBaseModel,
	U extends Record<string, unknown>,
	C extends BaseCrudService<T, U>,
>({
	service,
	onCreate = noopFn,
	onUpdate = noopFn,
	onRemove = noopFn,
}: IUserCrudProps<T, U, C>): IUseCrudReturn<T, U> => {
	const { execute: executeFindAll, ...restFindAll } = useAsync(() => service.findAll());
	const { execute: executeFindOne, ...restFindOne } = useAsync((id: string) =>
		service.findOne(id),
	);

	const create = React.useCallback(async (data: U) => {
		try {
			const response = await service.create(data);
			await executeFindAll();
			await onCreate(response);
		} catch (err) {
			throw err;
		}
	}, []);

	const findAll = React.useMemo(
		() => ({ execute: executeFindAll, ...restFindAll }),
		[restFindAll],
	);

	const findOne = React.useMemo(
		() => ({ execute: executeFindOne, ...restFindOne }),
		[restFindOne],
	);

	const update = React.useCallback(async (id: string, data: U) => {
		try {
			const response = await service.update(id, data);
			await executeFindAll();
			await onUpdate(response);
		} catch (err) {
			throw err;
		}
	}, []);

	const remove = React.useCallback(async (id: string) => {
		try {
			const response = await service.delete(id);
			await executeFindAll();
			await onRemove(response);
		} catch (err) {
			throw err;
		}
	}, []);

	return {
		create,
		findAll,
		findOne,
		update,
		remove,
	};
};
