import api from '@core/api';
import { ILoginResponse } from '@core/interfaces';
import { IUserModel } from '@core/models';
import { ILoginForm, IRegisterForm, IResetPasswordForm } from '@core/schemes';
import { IRecoveryPasswordForm } from '@core/schemes/recoveryPasswordForm';

class AuthService {
	public async getProfile(): Promise<IUserModel> {
		const { data } = await api.get<IUserModel>('auth/profile');
		return data;
	}

	public async login(body: ILoginForm): Promise<ILoginResponse> {
		const { data } = await api.post<ILoginResponse>('auth/login', body);
		return data;
	}

	public async register(body: IRegisterForm): Promise<IUserModel> {
		const { data } = await api.post<IUserModel>('auth/register', body);
		return data;
	}

	public async recoveryPassword(body: IRecoveryPasswordForm): Promise<true> {
		const { data } = await api.post<true>('auth/recovery-password', body);
		return data;
	}

	public async resetPassword(body: IResetPasswordForm): Promise<true> {
		const { data } = await api.post<true>('auth/reset-password', body);
		return data;
	}
}

export const authService = new AuthService();
