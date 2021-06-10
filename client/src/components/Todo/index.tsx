import React from 'react';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import { ITodoModel } from '@core/models';

type IProps = Omit<ITodoModel, 'id' | 'user'>;

export const Todo: React.FC<IProps> = ({ title, description }) => (
	<ListItem>
		<ListItemText primary={title} secondary={description} />
	</ListItem>
);
