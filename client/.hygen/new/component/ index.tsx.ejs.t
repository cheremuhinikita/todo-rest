---
to: <%= path %>/index.tsx
---
import React from 'react';

import useStyles from './styled';

interface IProps {}

export const <%= component_name %>: React.FC<IProps> = () => {
	const classes = useStyles();

	return <div className={classes.root} />;
};
