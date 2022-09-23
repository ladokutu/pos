import React,{ Fragment, useRef, useState } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useNavigate } from 'react-router-dom'
import { useIdleTimer } from 'react-idle-timer'


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function ModalTimeout() {
	const navigate = useNavigate();
	const [open, setOpen] = React.useState(false);
	const cancelButtonRef = useRef(null)
	const [timerId, setTimerID] = useState('');
	const totime = 1000 * 60 * 15
	
	
	const handleOnIdle = event => {
		console.log('user is idle', event)
		console.log('last active', getLastActiveTime())
		console.log('time remaining', getRemainingTime())
		
		setOpen(true)
		const timerId =  setTimeout(() => {
		  navigate("/signout")
		}, 1000 * 60);
		setTimerID(timerId)
	  }
	const handleOnActive = event => {
		//console.log('user is active', event)
		//console.log('time remaining', getRemainingTime())
	  }

	const handleOnAction = event => {
		//console.log('user did something', event)
	  }
	const { getRemainingTime, getLastActiveTime } = useIdleTimer({
		timeout: totime ,
		onIdle: handleOnIdle,
		onActive: handleOnActive,
		onAction: handleOnAction,
		debounce: 500
	  })
	const RefreshTime = () => {
		setOpen(false)
		clearTimeout(timerId);
	}
	
	

   
  return (
    <>
	<div>
      
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        initialFocus={cancelButtonRef}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Idle Activity</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
			Your Application Will Be Log Out on 1 Minutes
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={RefreshTime}>Stay Log In</Button>
        </DialogActions>
      </Dialog>
    </div> 
    </>
  )
}