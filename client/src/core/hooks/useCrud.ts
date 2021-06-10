/* eslint-disable indent */
import React from 'react';

import { BaseCrudService } from '@core/services';
import { IBaseModel } from '@core/models/IBaseModel';
import { IAsync } from '@core/interfaces';
import { noopFn } from '@core/utils';

import { useConfirmDialogContext } from '@providers';
import { MESSAGE_QUESTION_REMOVE, MESSAGE_QUESTION_UPDATE } from '@core/constants';
import { useAsync } from './useAsync';

interface IUserCrudProps<
	T extends IBaseModel,
	U extends Record<string, string>,
	C extends BaseCrudService<T, U>,
> {
	service: C;
	onCreate?: (data: T) => Promise<void> | void;
	onUpdate?: (data: true) => Promise<void> | void;
	onRemove?: (data: true) => Promise<void> | void;
}

export interface IUseCrudReturn<T extends IBaseModel, U extends Record<string, string>> {
	create: (data: U) => Promise<void>;
	findAll: IAsync<T[]>;
	findOne: IAsync<T>;
	update: (id: number, data: U) => Promise<void>;
	remove: (id: number) => Promise<void>;
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
	const confirmDialog = useConfirmDialogContext();
	const { execute: executeFindAll, ...restFindAll } = useAsync(() => service.findAll());

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

	const findOne = useAsync((id: number) => service.findOne(id));

	const update = React.useCallback(async (id: number, data: U) => {
		try {
			const onAgree = async () => {
				const response = await service.update(id, data);
				await executeFindAll();
				await onUpdate(response);
			};

			confirmDialog(MESSAGE_QUESTION_UPDATE, {
				onAgree,
			});
		} catch (err) {
			throw err;
		}
	}, []);

	const remove = React.useCallback(async (id: number) => {
		try {
			const onAgree = async () => {
				const response = await service.delete(id);
				await executeFindAll();
				await onRemove(response);
			};

			confirmDialog(MESSAGE_QUESTION_REMOVE, {
				onAgree,
			});
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
