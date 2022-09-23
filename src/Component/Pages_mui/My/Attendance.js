import React,{ useState,useEffect } from 'react'
import { DataGrid,GridToolbar  } from '@mui/x-data-grid';
import axios from 'axios';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import {LinearProgress} from '@mui/material';
import moment from "moment";
import {Dialog,DialogActions,DialogTitle,DialogContent,Grid,TextField} from '@mui/material';
import { DatePicker  } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import Slide from '@mui/material/Slide';
import Loader from '../Tools/Loader';
import Alerts from '../Tools/Alerts';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default function Attendance() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)

  const [pageSize, setPageSize] = useState(10);
 

  const [alerto, setAlerto] = useState('');
 
  const periode = moment(new Date()).format('YYYY-MM');
  const [values, setValues] = React.useState(new Date());
  
  const columns = [
	  
	  { field: 'date_g', headerName: 'Date', width: 200 },
	  { field: 'daysname', headerName: 'Days Name', width: 100 },
	  { field: 'time_in', headerName: 'IN', width: 100 },
	  { field: 'time_out', headerName: 'OUT', width: 100 },
	  { field: 'information', headerName: 'Info', width: 400 },
	];
	
	useEffect(() => {
		GetData(periode)	
	},[periode]); 
	const GetData = async (periode) => {
		try {
			setLoading(true)
			const tokendata = await localStorage.getItem('TokenData')
			const headers_data = {
				Authorization: tokendata,
			}
			var api='https://panen.ladokutu.info/index.php/Solution/data_my_attendance';  
			const response = await axios({
				method: 'post',
				headers: headers_data,
				url: api,
				data: {period:periode}
			});
			
			setData(response.data)
			setLoading(false)
		} catch (e) {
			console.log(e)
		}
	}
	const ChangePeriod = async (event) => {
		setLoading(true)
		setOpen(false)
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		let periode = data.get('periode')
		const period = moment(periode).format('YYYY-MM')
		console.log(period)
		GetData(period)
	};
	const handleChange = (newValue) => {
		//console.log(newValue)
		const period = moment(newValue).format('YYYY-MM')
		setValues(newValue);
		GetData(period)
	  };
	const handleCloseAlerto = () => {
		setAlerto(false);
	  };
	
  return (
    <>
	<Loader loading={loading} />
	<Alerts  alerto={alerto.alerto} state_typ={alerto.state_typ} state_msg={alerto.state_msg} onClose={handleCloseAlerto} />
	<div style={{ height: 500, width: '100%' }}>
	  <Box sx={{ '& button': { m: 1 } }}>
		  <div>
			<Button variant="outlined" onClick={()=> setOpen(true)}>Change Periode</Button>
		  </div>
	  </Box>
      <DataGrid
	    loading={loading}
        rows={data}
        columns={columns}
        components={{
          Toolbar: GridToolbar,
		  LoadingOverlay: LinearProgress,
        }}
		pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[5, 10, 20]}
      />
	</div>  
	  
	  <Dialog
        open={open}
		onClose={()=> setOpen(false)}
        TransitionComponent={Transition}
        
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Change Period</DialogTitle>
		<Box component="form" onSubmit={ChangePeriod}  >
        <DialogContent dividers>
				
			
			 <Grid container spacing={1}>
				
			  <Grid item xs={12}>
				 <LocalizationProvider dateAdapter={AdapterDateFns}>
					<DatePicker 
					  label="Periode"
					  value={values}
					  views={[ "month","year"]}
					  inputFormat="MM/yyyy"
					  onChange={handleChange}
					  renderInput={(params) => <TextField {...params} />}
					/>
				</LocalizationProvider>
			  </Grid>
			</Grid>
			
			
        </DialogContent>
        <DialogActions>
			<Button variant="outlined" onClick={()=> setOpen(false)}>Close</Button>
        </DialogActions>
		</Box>
      </Dialog>
	  
	  
	  
	</>  
    
  );
}
