import { IUserModel } from '@core/models';

export interface ILoginResponse {
	token: string;
	profile: IUserModel;
}
