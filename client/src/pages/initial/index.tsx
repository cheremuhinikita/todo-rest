import React from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';

import useStyles from './styled';

export const InitialPage: React.FC = () => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<div className={classes.wrapper}>
				<CircularProgress
					variant="determinate"
					size={60}
					thickness={4}
					value={100}
					className={classes.bottom}
				/>
				<CircularProgress
					disableShrink
					variant="indeterminate"
					size={60}
					thickness={4}
					className={classes.top}
					classes={{
						circle: classes.circle,
					}}
				/>
			</div>
		</div>
	);
};
