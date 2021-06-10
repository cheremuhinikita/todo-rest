import React from 'react';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import { Block } from '@components';
import { ITodoModel } from '@core/models';
import { IBaseCardProps } from '@core/interfaces';

type IProps = IBaseCardProps<ITodoModel>;

export const Todo: React.FC<IProps> = ({
	model: { title, description },
	component: Component = Block,
}) => (
	<Component>
		<ListItem>
			<ListItemText primary={title} secondary={description} />
		</ListItem>
	</Component>
);
