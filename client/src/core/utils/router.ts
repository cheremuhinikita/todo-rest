import { AxiosResponse } from 'axios';

import { ErrorCodesNumbers, PageUrls } from '@core/enums';
import { IErrorResponse } from '@core/interfaces';

export const makeUrl = (...strings: [PageUrls, ...string[]]): string => strings.join('/');
export const makeParam = (str: string): string => `:${str}`;

export const relocationOnError = (
	response: AxiosResponse<IErrorResponse>,
	code: ErrorCodesNumbers,
): void => {
	if (response?.data.statusCode === code) {
		window.location.href = makeUrl(PageUrls.error, code.toString());
	}
};
