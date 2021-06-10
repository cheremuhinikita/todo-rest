/* eslint-disable func-names */
import React from 'react';

import { IProviderProps, ICrudContext } from '@core/interfaces';
import { Nullable } from '@core/types';
import { useUsers } from '@core/hooks';
import { USERS_KEY } from '@core/constants';

const CrudContext = React.createContext<Nullable<ICrudContext>>(null);

CrudContext.displayName = 'Crud';

export const useCrudContext = function <T>(callback: (context: ICrudContext) => T): T {
	const context = React.useContext(CrudContext);
	if (context === null) throw new Error('useCrudContext must be used within CrudContext.');

	return callback(context);
};

export const CrudProvider: React.FC<IProviderProps> = ({ children }) => {
	const users = useUsers();

	const value = {
		[USERS_KEY]: users,
	};

	return <CrudContext.Provider value={value}>{children}</CrudContext.Provider>;
};
