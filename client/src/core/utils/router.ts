/* eslint-disable indent */
import { AxiosResponse } from 'axios';

import { ErrorCodesNumbers, PageUrls } from '@core/enums';
import { IErrorResponse } from '@core/interfaces';

interface Location {
	pathname: string;
}

export const makeUrl = (...strings: string[]): string => strings.join('/');
export const makeParam = (str: string): string => `:${str}`;
export const makeUrlModal =
	(...strings: string[]) =>
	(location: Location): string =>
		makeUrl(location.pathname, ...strings);

export const relocationOnError = (
	response: AxiosResponse<IErrorResponse>,
	code: ErrorCodesNumbers,
): void => {
	if (response?.data.statusCode === code) {
		window.location.href = makeUrl(PageUrls.error, code.toString());
	}
};
