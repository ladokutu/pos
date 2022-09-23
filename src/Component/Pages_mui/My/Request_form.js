import React,{ useState,useEffect } from 'react'
import { DataGrid,GridToolbar  } from '@mui/x-data-grid';
import axios from 'axios';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import moment from "moment";
import { MoreVert ,Delete,AttachFile } from '@mui/icons-material';
import {LinearProgress} from '@mui/material';
import {Dialog,DialogActions,DialogTitle,DialogContent,Grid,Menu,MenuItem,IconButton,ListItemIcon,Divider,TextField,FormControl,InputLabel,Select,Link } from '@mui/material';
import Slide from '@mui/material/Slide';
import Loader from '../Tools/Loader';
import Alerts from '../Tools/Alerts';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default function Request_form() {
  const [data, setData] = useState([]);
  const [databalance, setDataBalance] = useState([]);
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [openbalance, setOpenBalance] = useState(false) 
  const [pageSize, setPageSize] = useState(10);
  const [value, setValue] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const openbol = Boolean(anchorEl);
  const [alerto, setAlerto] = useState('');
  
  const [dataform, setDataForm] = useState([]);
  const newDate = moment(new Date()).format('YYYY-MM-DD')
  const newTime = moment(new Date()).format('HH:mm:ss')
  
  const columns = [
	  { field: 'nomor', headerName: 'No', width: 50 },
	  { field: 'request_date', headerName: 'Date', width: 200 },
	  { field: 'form_name', headerName: 'Type', width: 200 },
	  { field: 'description', headerName: 'Description', width: 200 },
	  { field: 'full_status', headerName: 'Status', width: 200 },
	  { field: 'id', headerName: 'Action', width: 100,
			renderCell: (cellValues) => {
			  return (
				<>
					<IconButton color="primary" aria-label="More Option" 
							component="span"
							onClick={(event) => {
							handleClick(event, cellValues);
					  }}>
					  <MoreVert />
					</IconButton>
					<Menu
							id="account-menu"
							anchorEl={anchorEl}
							open={openbol}
							onClose={()=> setAnchorEl(null)}
							MenuListProps={{
							  'aria-labelledby': 'basic-button',
							}}
					>	
					
						{cellValues.row.attachment !== '' ? 
							<MenuItem >
							<Link href={cellValues.row.attachment}  underline="none" target="_blank">
								<ListItemIcon>
									<AttachFile fontSize="small"  />
								</ListItemIcon>Attachment
							</Link>
							</MenuItem >
						: null }
						
						<Divider/>
						{cellValues.row.id_status !== 'A' ? 
						<MenuItem onClick={()=> deleteselected(value)}>
							<ListItemIcon>
								<Delete fontSize="small" color="error" />
							</ListItemIcon>Delete
						</MenuItem>
						: null }
					</Menu>
				</>
			  );
			}
	  },
	];
	const columnsbalance = [
	  { field: 'nomor', headerName: 'No', width: 50 },
	  { field: 'form_name', headerName: 'Type', width: 200 },
	  { field: 'start_date', headerName: 'From', width: 100 },
	  { field: 'finish_date', headerName: 'End', width: 100 },
	  { field: 'saldo', headerName: 'Balance', width: 100 },
	];
	const handleClick = (event, cellValues) => {
	  //console.log(cellValues.row.id);
	  setValue(cellValues.row.id)
	  setAnchorEl(event.currentTarget);
	};
	
	useEffect(() => {
		GetData()
		GetDataForm()
		GetDataBalance()
    },[]); 
	const GetData = async () => {
		try {
			setLoading(true)
			const tokendata = await localStorage.getItem('TokenData')
			const headers_data = {
				Authorization: tokendata,
			}
			var api='https://panen.ladokutu.info/index.php/Solution/data_my_request_form';  
			const response = await axios({
				method: 'post',
				headers: headers_data,
				url: api,
				
			});
			
			setData(response.data)
			setLoading(false)
		} catch (e) {
			console.log(e)
		}
	}
	const SimpanData = async (event) => {
		setLoading(true)
		setOpen(false)
		event.preventDefault();
		
		const data = new FormData(event.currentTarget);
		let start_date = data.get('start_date')
		let end_date = data.get('end_date')
		let start_time = data.get('start_time')
		let end_time = data.get('end_time')
		let id_form = data.get('id_form')
		let description = data.get('description')
		let attachment = data.get('attachment')
		
			const formdatas = new FormData();
			formdatas.append('start_date', start_date);
			formdatas.append('end_date', end_date);
			formdatas.append('start_time', start_time);
			formdatas.append('end_time', end_time);
			formdatas.append('id_form', id_form);
			formdatas.append('description', description);
			if(attachment !== ''){
				formdatas.append('attachment',attachment);
			}else{
				formdatas.append('attachment','');  
			}

		try { 
			const tokendata = await localStorage.getItem('TokenData')
				const headers_data = {
					Authorization: tokendata,
					"Content-Type": "multipart/form-data",
				}
            var api='https://panen.ladokutu.info/index.php/Solution/add_data_my_request_form';  
			const response = await axios({
                  method: 'post',
                  url: api,
				  headers: headers_data,
                  data: formdatas
				});
			if(response.data.status===200){
				GetData()
			}
				setAlerto({
				  alerto: true,
				  state_msg: response.data.message,
				  state_typ:'success'
				});
				console.log(response.data.message)
			
			setLoading(false)
        } catch (error) {
			
			setAlerto({
				  alerto: true,
				  state_msg: 'Data Error',
				  state_typ:'error'
				});
            console.log(error)
			setLoading(false)
        }
  };
  const deleteselected = async (selectedid) => {
			setAnchorEl(null)
			setLoading(true)
			try {
				const tokendata = await localStorage.getItem('TokenData')
				const headers_data = {
					Authorization: tokendata,
				}
				var api='https://panen.ladokutu.info/index.php/Solution/delete_data_my_request_form';  
				const response = await axios({
					method: 'post',
					headers: headers_data,
					url: api,
					data: selectedid 
				});
				
				if(response.data.status===200){
					GetData()
				}
				
				//console.log(selectedid)
				setLoading(false)
				setAlerto({
				  alerto: true,
				  state_msg: response.data.message,
				  state_typ:'success'
				});
			} catch (e) {
				setAlerto({
				  alerto: true,
				  state_msg: 'Data Error',
				  state_typ:'error'
				});
				console.log(e)
				setLoading(false)
			}
	};
	const GetDataBalance = async () => {
		try {
			setLoading(true)
			const tokendata = await localStorage.getItem('TokenData')
			const headers_data = {
				Authorization: tokendata,
			}
			var api='https://panen.ladokutu.info/index.php/Solution/data_my_request_balance';  
			const response = await axios({
				method: 'post',
				headers: headers_data,
				url: api,
				
			});
			
			setDataBalance(response.data)
			setLoading(false)
		} catch (e) {
			console.log(e)
		}
	}
	const GetDataForm = async () => {
		try {
			setLoading(true)
			const tokendata = await localStorage.getItem('TokenData')
			const headers_data = {
				Authorization: tokendata,
			}
			var api='https://panen.ladokutu.info/index.php/Solution/data_master_form';  
			const response = await axios({
				method: 'post',
				headers: headers_data,
				url: api,
			});
			
			setDataForm(response.data)
			setLoading(false)
		} catch (e) {
			console.log(e)
		}
	}
	const item_form=dataform.map((item,index) =>(
		<MenuItem value={item.id_form}>{item.form_name}</MenuItem>
	))
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
			<Button variant="outlined" onClick={()=> setOpen(true)}>Add Data</Button><Button variant="contained" onClick={()=> setOpenBalance(true)}>Balance</Button>
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
        maxWidth='sm'
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Add Request</DialogTitle>
		<Box component="form" onSubmit={SimpanData}  >
        <DialogContent dividers>
				
			
			 <Grid container spacing={1}>
				<Grid item xs={6}>
					<TextField margin="normal"  fullWidth size="small" name="start_date" id="start_date" label="Start Date" type="date" defaultValue={newDate} />
				</Grid>
				<Grid item xs={6}>
					<TextField margin="normal"  fullWidth size="small" name="start_time" 
					id="start_time" label="Start Time" type="time" defaultValue={newTime} step="any" 
					InputLabelProps={{
					  shrink: true,
					}}/>
				</Grid>
				<Grid item xs={6}>
					<TextField margin="normal"  fullWidth size="small" name="end_date" id="end_date" label="End Date" type="date" defaultValue={newDate} />
				</Grid>
				
				<Grid item xs={6}>
					<TextField margin="normal"  fullWidth size="small" name="end_time" id="end_time" label="End Time" type="time" defaultValue={newTime}
					step="any" 
					InputLabelProps={{
					  shrink: true,
					}}/>
				</Grid>
				<Grid item xs={6}>
						<FormControl fullWidth margin="normal" size="small">
						  <InputLabel id="demo-simple-select-label">Type</InputLabel>
						  <Select
							labelId="demo-simple-select-label"
							id="id_form" name="id_form"
							label="Type"
						  >
						  {item_form}
							
						  </Select>
						</FormControl>
				</Grid>
				
				<Grid item xs={12}>
					<TextField margin="normal" required fullWidth size="small" name="description" id="description" label="Description" />
				</Grid>
				<Grid item xs={6}>
					<TextField margin="normal"  fullWidth size="small" name="attachment" id="attachment"  type="file"/>
				</Grid>
			</Grid>
			
			
        </DialogContent>
        <DialogActions>
			<Button variant="outlined" onClick={()=> setOpen(false)}>Close</Button>
			<Button color="success" variant="contained" type="submit">Save</Button>
        </DialogActions>
		</Box>
      </Dialog>
	  
	  
	  
	  
	  
	  <Dialog
        open={openbalance}
		onClose={()=> setOpenBalance(false)}
		TransitionComponent={Transition}
        maxWidth="sm"
        fullWidth
        //style={{ zIndex: 0 }}
      >
		<DialogTitle>Balance</DialogTitle>
        <DialogContent  sx={{ height: 200 }}>
         <DataGrid
			loading={loading}
			rows={databalance}
			columns={columnsbalance}
			components={{
				LoadingOverlay: LinearProgress,
			}}
			pageSize={5}
			
		/>
        </DialogContent>
      </Dialog>
	 
	</>  
    
  );
}
