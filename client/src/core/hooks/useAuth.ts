import React from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import { AuthStatus, PageUrls } from '@core/enums';
import {
	MESSAGE_SUCCESS_RECOVERY_PASSWORD,
	MESSAGE_SUCCESS_REGISTER,
	TOKEN_KEY,
} from '@core/constants';
import { authService } from '@core/services';
import { IUserModel } from '@core/models';
import {
	ILoginForm,
	IRecoveryPasswordForm,
	IRegisterForm,
	IResetPasswordForm,
} from '@core/schemes';

interface IUseAuthReturn {
	profile: IUserModel | null;
	authStatus: AuthStatus;
	email: string;
	checkToken: () => Promise<void>;
	login: (data: ILoginForm) => Promise<void>;
	logout: () => void;
	register: (data: IRegisterForm) => Promise<void>;
	recoveryPassword: (data: IRecoveryPasswordForm) => Promise<true>;
	resetPassword: (data: IResetPasswordForm) => Promise<true>;
}

export const useAuth = (): IUseAuthReturn => {
	const history = useHistory();
	const [profile, setProfile] = React.useState<IUserModel | null>(null);
	const [authStatus, setAuthStatus] = React.useState<AuthStatus>(AuthStatus.INITIAL);
	const [email, setEmail] = React.useState<string>('');

	const checkToken = React.useCallback(async () => {
		try {
			const token = window.localStorage.getItem(TOKEN_KEY);

			if (token) {
				const user = await authService.getProfile();
				setProfile(user);
				setAuthStatus(AuthStatus.AUTHORIZED);
			} else {
				setAuthStatus(AuthStatus.UNAUTHORIZED);
			}
		} catch {
			setAuthStatus(AuthStatus.UNAUTHORIZED);
		}
	}, []);

	const login = React.useCallback(async (data: ILoginForm) => {
		try {
			const res = await authService.login(data);
			window.localStorage.setItem(TOKEN_KEY, res.token);

			setProfile(res.profile);
			setAuthStatus(AuthStatus.AUTHORIZED);
		} catch (err) {
			setAuthStatus(AuthStatus.UNAUTHORIZED);
			throw err;
		}
	}, []);

	const register = React.useCallback(async (data: IRegisterForm) => {
		try {
			await authService.register(data);
			history.push(PageUrls.login);
			toast(MESSAGE_SUCCESS_REGISTER);
		} catch (err) {
			throw err;
		}
	}, []);

	const logout = React.useCallback(() => {
		window.localStorage.removeItem(TOKEN_KEY);
		setAuthStatus(AuthStatus.UNAUTHORIZED);
		setProfile(null);
	}, []);

	const recoveryPassword = React.useCallback(async (data: IRecoveryPasswordForm) => {
		try {
			const res = await authService.recoveryPassword(data);
			setEmail(data.email);

			return res;
		} catch (err) {
			throw err;
		}
	}, []);

	const resetPassword = React.useCallback(async (data: IResetPasswordForm) => {
		try {
			const res = await authService.resetPassword(data);
			history.push(PageUrls.login);
			toast(MESSAGE_SUCCESS_RECOVERY_PASSWORD);

			return res;
		} catch (err) {
			throw err;
		}
	}, []);

	return {
		profile,
		authStatus,
		email,
		checkToken,
		login,
		register,
		logout,
		recoveryPassword,
		resetPassword,
	};
};
