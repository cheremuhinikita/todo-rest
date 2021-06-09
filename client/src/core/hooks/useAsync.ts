import React from 'react';

import { Nullable } from '@core/types';

export interface Async<T> {
	loading: boolean;
	error: unknown;
	data: Nullable<T>;
}

export const useAsync = <T>(callback: () => Promise<T>): Async<T> => {
	const [loading, setLoading] = React.useState<boolean>(false);
	const [error, setError] = React.useState<unknown>(null);
	const [data, setData] = React.useState<Nullable<T>>(null);

	const execute = React.useCallback(async () => {
		try {
			setLoading(true);
			const response = await callback();
			setData(response);
		} catch (e) {
			setError(e);
		} finally {
			setLoading(false);
		}
	}, [callback]);

	React.useEffect(() => {
		execute();
	}, [callback]);

	return { error, data, loading };
};
