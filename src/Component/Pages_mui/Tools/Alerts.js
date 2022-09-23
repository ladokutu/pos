import React,{useState} from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const Alerts = (props) => {
	const {alerto,state_msg,state_typ,onClose} = props;
	
	return (
		<Snackbar anchorOrigin={{vertical: "top",horizontal: "center"}}
			open={alerto} autoHideDuration={60000} onClose={onClose}>
			<Alert  severity={state_typ} sx={{ width: '100%' }} onClose={onClose}>
				{state_msg}
			</Alert>
		</Snackbar>
	);
};

export default Alerts;
	