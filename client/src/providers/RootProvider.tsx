import React from 'react';

import { IProviderProps } from '@core/interfaces';

import { AuthProvider } from './AuthProvider';
import { ConfirmDialogProvider } from './ConfirmationDialogProvider';

export const RootProvider: React.FC<IProviderProps> = ({ children }) => (
	<AuthProvider>
		<ConfirmDialogProvider>{children}</ConfirmDialogProvider>
	</AuthProvider>
);
