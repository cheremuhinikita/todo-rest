import api from '@core/api';
import { IBaseModel } from '@core/models';

export abstract class BaseCrudService<T extends IBaseModel, U> {
	constructor(private readonly route: string) {
		this.route = route;
	}

	public async create(body: U): Promise<T> {
		const { data } = await api.post<T>(this.route, body);
		return data;
	}

	public async findAll(): Promise<T[]> {
		const { data } = await api.get<T[]>(this.route);
		return data;
	}

	public async findOne(id: string): Promise<T> {
		const { data } = await api.get<T>(`${this.route}/${id}`);
		return data;
	}

	public async update(id: string, body: U): Promise<true> {
		const { data } = await api.put<true>(`${this.route}/${id}`, body);
		return data;
	}

	public async delete(id: string): Promise<true> {
		const { data } = await api.delete<true>(`${this.route}/${id}`);
		return data;
	}
}
