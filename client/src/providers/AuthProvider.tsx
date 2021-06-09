import React from 'react';

import { IUseAuthReturn, useAuth } from '@core/hooks';
import { IProviderProps } from '@core/interfaces';
import { Nullable } from '@core/types';

const AuthContext = React.createContext<Nullable<IUseAuthReturn>>(null);

AuthContext.displayName = 'Auth';

export const useAuthContext = (): ReturnType<typeof useAuth> => {
	const context = React.useContext(AuthContext);
	if (context === null) throw new Error('useAuthContext must be used within AuthContext.');

	return context;
};

export const AuthProvider: React.FC<IProviderProps> = ({ children }) => (
	<AuthContext.Provider value={useAuth()}>{children}</AuthContext.Provider>
);
