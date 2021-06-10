import { ITodoModel } from './ITodoModel';
import { IUserModel } from './IUserModel';

export * from './IBaseModel';

export * from './IUserModel';
export * from './ITodoModel';

export type Models = IUserModel | ITodoModel;
