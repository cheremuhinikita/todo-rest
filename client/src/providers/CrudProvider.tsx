/* eslint-disable func-names */
import React from 'react';

import { IProviderProps } from '@core/interfaces';
import { Nullable } from '@core/types';
import { useUsers } from '@core/hooks';

interface ICrudContext {
	users: typeof useUsers;
}

const CrudContext = React.createContext<Nullable<ICrudContext>>(null);

CrudContext.displayName = 'Crud';

export const useCrudContext = function <T>(callback: (context: ICrudContext) => T): T {
	const context = React.useContext(CrudContext);
	if (context === null) throw new Error('useCrudContext must be used within CrudContext.');

	return callback(context);
};

export const CrudProvider: React.FC<IProviderProps> = ({ children }) => {
	const value = {
		users: useUsers,
	};

	return <CrudContext.Provider value={value}>{children}</CrudContext.Provider>;
};
