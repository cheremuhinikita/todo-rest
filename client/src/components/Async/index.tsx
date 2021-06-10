import React from 'react';

import { IAsync } from '@core/interfaces';

import { Loader } from '../Loader';

interface IProps<T> extends Omit<IAsync<T>, 'execute'> {
	children: React.ReactNode;
	className?: string;
}

export function Async<T>({ loading, data, children, className }: IProps<T>): React.ReactElement {
	if (data === null && loading) return <Loader size={40} />;

	return <div className={className}>{children}</div>;
}
