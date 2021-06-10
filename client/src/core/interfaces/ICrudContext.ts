import { USERS_KEY } from '@core/constants';
import { useUsers } from '@core/hooks';

export interface ICrudContext {
	[USERS_KEY]: ReturnType<typeof useUsers>;
}
