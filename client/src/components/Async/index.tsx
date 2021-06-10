import React from 'react';

import { IAsync } from '@core/interfaces';

import { Loader } from '../Loader';

interface IProps<T> extends IAsync<T> {
	children: React.ReactNode;
	className?: string;
}

export function Async<T>({
	children,
	execute,
	data,
	loading,
	className,
}: IProps<T>): React.ReactElement {
	React.useEffect(() => {
		execute();
	}, []);

	if (data === null && loading) return <Loader size={40} />;

	return <div className={className}>{children}</div>;
}
