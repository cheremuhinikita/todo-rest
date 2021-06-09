import { IUserModel } from '@core/models';
import { ICreateOrUpdateUserForm } from '@core/schemes';
import { UsersService, usersService } from '@core/services';

import { IUseCrudReturn, useCrud } from './useCrud';

export const useUsers = (): IUseCrudReturn<IUserModel, ICreateOrUpdateUserForm> =>
	useCrud<IUserModel, ICreateOrUpdateUserForm, UsersService>({
		service: usersService,
	});
