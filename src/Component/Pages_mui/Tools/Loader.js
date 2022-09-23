import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import CircularProgress from '@mui/material/CircularProgress';

const Loader = (props) => {
	const {loading} = props;
	return (
		<Dialog open={loading} >
			<DialogContent>
				<CircularProgress/>
			</DialogContent>
		</Dialog>
	);
};

export default Loader;
	