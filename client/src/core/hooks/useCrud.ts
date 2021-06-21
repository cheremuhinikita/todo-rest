/* eslint-disable indent */
import React from 'react';

import { BaseCrudService } from '@core/services';
import { IBaseModel } from '@core/models/IBaseModel';
import { IAsync } from '@core/interfaces';
import { noopFn } from '@core/utils';

import { useAsync } from './useAsync';

interface IUserCrudProps<
	T extends IBaseModel,
	U extends Record<string, string>,
	C extends BaseCrudService<T, U>,
> {
	service: C;
	onCreate?: (data: T) => Promise<void> | void;
	onUpdate?: (data: T) => Promise<void> | void;
	onRemove?: (data: true) => Promise<void> | void;
}

export interface IUseCrudReturn<T extends IBaseModel, U extends Record<string, string>> {
	create: IAsync<T, [U]>;
	findAll: IAsync<T[]>;
	findOne: IAsync<T, [number]>;
	update: IAsync<T, [number, U]>;
	remove: IAsync<true, [number]>;
}

export const useCrud = <
	T extends IBaseModel,
	U extends Record<string, string>,
	C extends BaseCrudService<T, U>,
>({
	service,
	onCreate = noopFn,
	onUpdate = noopFn,
	onRemove = noopFn,
}: IUserCrudProps<T, U, C>): IUseCrudReturn<T, U> => {
	const { execute: executeFindAll, ...restFindAll } = useAsync(() => service.findAll());

	const create = useAsync((data: U) => service.create(data), {
		onSuccess: async (data: T) => {
			await executeFindAll();
			await onCreate(data);
		},
	});

	const findAll = React.useMemo(
		() => ({ execute: executeFindAll, ...restFindAll }),
		[restFindAll],
	);

	const findOne = useAsync((id: number) => service.findOne(id));

	const update = useAsync((id: number, data: U) => service.update(id, data), {
		onSuccess: async (data: T) => {
			await executeFindAll();
			await onUpdate(data);
		},
	});

	const remove = useAsync((id: number) => service.delete(id), {
		onSuccess: async (data: true) => {
			await executeFindAll();
			await onRemove(data);
		},
	});

	return {
		create,
		findAll,
		findOne,
		update,
		remove,
	};
};
