/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import { Nullable } from '@core/types';
import { IAsync } from '@core/interfaces';

export const useAsync = <T>(callback: (...args: any[]) => Promise<T>): IAsync<T> => {
	const [loading, setLoading] = React.useState<boolean>(false);
	const [error, setError] = React.useState<unknown>(null);
	const [data, setData] = React.useState<Nullable<T>>(null);

	const execute = React.useCallback(
		async (...args: any[]) => {
			try {
				setLoading(true);
				const response = await callback(...args);
				setData(response);
			} catch (e) {
				setError(e);
			} finally {
				setLoading(false);
			}
		},
		[callback],
	);

	return { error, data, loading, execute };
};
