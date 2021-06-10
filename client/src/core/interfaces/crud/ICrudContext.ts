import { TODO_KEY, USERS_KEY } from '@core/constants';
import { useTodo, useUsers } from '@core/hooks';

export interface ICrudContext {
	[USERS_KEY]: ReturnType<typeof useUsers>;
	[TODO_KEY]: ReturnType<typeof useTodo>;
}
