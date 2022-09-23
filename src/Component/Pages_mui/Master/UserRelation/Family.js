import React,{ useState,useEffect } from 'react'
import { DataGrid,GridToolbar  } from '@mui/x-data-grid';
import axios from 'axios';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { MoreVert ,Delete,Edit } from '@mui/icons-material';
import {LinearProgress} from '@mui/material';
import {Dialog,DialogActions,DialogTitle,DialogContent,Grid,Menu,MenuItem,IconButton,ListItemIcon,Divider,TextField} from '@mui/material';
import Slide from '@mui/material/Slide';
import moment from "moment";
import Loader from '../../Tools/Loader';
import Alerts from '../../Tools/Alerts';
import { useLocation } from "react-router-dom";
import {Select,InputLabel,FormControl} from '@mui/material';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DataTable() {
  const [data, setData] = useState([]);
  const newDate = moment(new Date()).format('YYYY-MM-DD')
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [openedit, setOpenedit] = useState(false)
  const [pageSize, setPageSize] = useState(10);
  const [value, setValue] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const openbol = Boolean(anchorEl);
  const [alerto, setAlerto] = useState('');
  const [detail, setDetail] = useState('');
  const location = useLocation();
  const [family, setDataFamily] = useState([]);
  const [gender, setDataGender] = useState([]);
  
  
  const columns = [
	  { field: 'nomor', headerName: 'No', width: 50 },
	  { field: 'name', headerName: 'Name', width: 350 },
	  { field: 'birth_date', headerName: 'Birth Date', width: 200 },
	  { field: 'gender', headerName: 'Gender', width: 200 },
	  { field: 'status_family', headerName: 'Relation', width: 200 },
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
						<Divider/>
						<MenuItem onClick={()=> view_edit_data(value)}>
							<ListItemIcon>
								<Edit fontSize="small" color="warning" />
							</ListItemIcon>Edit
						</MenuItem>
						<MenuItem onClick={()=> deleteselected(value)}>
							<ListItemIcon>
								<Delete fontSize="small" color="error" />
							</ListItemIcon>Delete
						</MenuItem>
					</Menu>
				</>
			  );
			}
	  },
	];
	const handleClick = (event, cellValues) => {
	  //console.log(cellValues.row.id);
	  setValue(cellValues.row.id)
	  setAnchorEl(event.currentTarget);
	};
	
	useEffect(() => {
		//console.log('id :',location.state.id)
		GetData()
		GetDataFamily()
		GetDataGender()
    },[]); 
	const GetData = async () => {
		try {
			setLoading(true)
			const tokendata = await localStorage.getItem('TokenData')
			const headers_data = {
				Authorization: tokendata,
			}
			var api='https://panen.ladokutu.info/index.php/Solution/data_user_family';  
			const response = await axios({
				method: 'post',
				headers: headers_data,
				url: api,
				data: {id : location.state.id }
			});
			
			setData(response.data)
			setLoading(false)
		} catch (e) {
			console.log(e)
		}
	}
	const GetDataFamily = async () => {
		try {
			setLoading(true)
			const tokendata = await localStorage.getItem('TokenData')
			const headers_data = {
				Authorization: tokendata,
			}
			var api='https://panen.ladokutu.info/index.php/Solution/data_master_family';  
			const response = await axios({
				method: 'post',
				headers: headers_data,
				url: api,
			});
			
			setDataFamily(response.data)
			setLoading(false)
		} catch (e) {
			console.log(e)
		}
	}
	const item_family=family.map((item,index) =>(
		<MenuItem value={item.id_status_family}>{item.status_family}</MenuItem>
	))
	const GetDataGender = async () => {
		try {
			setLoading(true)
			const tokendata = await localStorage.getItem('TokenData')
			const headers_data = {
				Authorization: tokendata,
			}
			var api='https://panen.ladokutu.info/index.php/Solution/data_master_gender';  
			const response = await axios({
				method: 'post',
				headers: headers_data,
				url: api,
			});
			//console.log(response.data)
			setDataGender(response.data)
			setLoading(false)
		} catch (e) {
			console.log(e)
		}
	}
	const item_gender=gender.map((item,index) =>(
		<MenuItem value={item.id_gender}>{item.gender}</MenuItem>
	))
	const SimpanData = async (event) => {
		setLoading(true)
		setOpen(false)
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		let name = data.get('name')
		let birth_date = data.get('birth_date')
		let id_status_family = data.get('id_status_family')
		let id_gender = data.get('id_gender')

		try { 
			const tokendata = await localStorage.getItem('TokenData')
				const headers_data = {
					Authorization: tokendata,
				}
            var api='https://panen.ladokutu.info/index.php/Solution/add_data_user_family';  
            const data_body = { 
					'id_user':location.state.id,
                    'name': name,
					'birth_date': birth_date,
					'id_status_family': id_status_family,
					'id_gender': id_gender,
					
                }
			const response = await axios({
                  method: 'post',
                  url: api,
				  headers: headers_data,
                  data: data_body
				});
			if(response.data.status===200){
				GetData()
			}
				setAlerto({
				  alerto: true,
				  state_msg: response.data.message,
				  state_typ:'success'
				});
				//console.log(response.data.message)
			
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
				var api='https://panen.ladokutu.info/index.php/Solution/delete_data_user_family';  
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
	const view_edit_data = async (id) => {
			setAnchorEl(null)
			setLoading(true)
			try {
				const tokendata = await localStorage.getItem('TokenData')
				const headers_data = {
					Authorization: tokendata,
				}
				var api='https://panen.ladokutu.info/index.php/Solution/view_data_user_family';  
				const response = await axios({
					method: 'post',
					headers: headers_data,
					url: api,
					data: {id:id} 
				});
				//console.log(response.data)
				setDetail(response.data)
				setOpenedit(true)
				setLoading(false)
			} catch (e) {
				
				console.log(e)
				setLoading(false)
			}
	};
	const EditData = async (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		let name = data.get('name')
		let birth_date = data.get('birth_date')
		let id_status_family = data.get('id_status_family')
		let id_gender = data.get('id_gender')
		
		setOpenedit(false)
		setLoading(true)
		try { 
			const tokendata = await localStorage.getItem('TokenData')
				const headers_data = {
					Authorization: tokendata,
				}
            var api='https://panen.ladokutu.info/index.php/Solution/edit_data_user_family';  
			const data_body = { 
					'id': value,
                    'name': name,
					'birth_date': birth_date,
					'id_status_family': id_status_family,
					'id_gender': id_gender,
                }
			const response = await axios({
                  method: 'post',
                  url: api,
				  headers: headers_data,
                  data: data_body
				});	
				
				if(response.data.status===200){
					GetData()
				}
			//console.log(response.data)	
			//console.log(data_body)	
			//console.log(detail)	
				setAlerto({
				  alerto: true,
				  state_msg: response.data.message,
				  state_typ:'success'
				});
				
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
			<Button variant="outlined" onClick={()=> setOpen(true)}>Add Data</Button>
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
        <DialogTitle>Add Family</DialogTitle>
		<Box component="form" onSubmit={SimpanData} noValidate >
        <DialogContent dividers>
				
			
			 <Grid container spacing={1}>
			  <Grid item xs={12}>
				<TextField margin="normal" required fullWidth size="small" name="name" id="name" label="Name" autoComplete="name" autoFocus />
			  </Grid>
			  <Grid item xs={6}>
					<TextField margin="normal" size="small" id="birth_date" name="birth_date" label="Birth Date" type="date" defaultValue={newDate} fullWidth />
			  </Grid>
			  
			  <Grid item xs={6}>
					<FormControl fullWidth margin="normal" size="small">
					  <InputLabel id="demo-simple-select-label">Gender</InputLabel>
					  <Select
						labelId="demo-simple-select-label"
						id="id_gender" name="id_gender"
						label="Gender"
					  >
					  {item_gender}
						
					  </Select>
					</FormControl>
				</Grid>
				<Grid item xs={6}>
					<FormControl fullWidth margin="normal" size="small">
					  <InputLabel id="demo-simple-select-label">Status Relation</InputLabel>
					  <Select
						labelId="demo-simple-select-label"
						id="id_status_family" name="id_status_family"
						label="Status Relation" 
					  >
						{item_family}
						
					  </Select>
					</FormControl>
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
        open={openedit}
		onClose={()=> setOpenedit(false)}
        TransitionComponent={Transition}
        
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Edit Data</DialogTitle>
		<Box  component="form"  noValidate sx={{ mt: 1 }} onSubmit={EditData}>
			<DialogContent dividers>

				  <Grid container spacing={1}>
			  <Grid item xs={12}>
				<TextField margin="normal" required fullWidth size="small" value={detail.name}  onChange={ (e) => setDetail({ ...detail, name: e.target.value})} name="name" id="name" label="Name" autoComplete="name" autoFocus />
			  </Grid>
			  <Grid item xs={6}>
					<TextField margin="normal" size="small" id="birth_date" value={detail.birth_date}  onChange={ (e) => setDetail({ ...detail, birth_date: e.target.value})} name="birth_date" label="Birth Date" type="date" defaultValue={newDate} fullWidth />
			  </Grid>
			  
			  <Grid item xs={6}>
					<FormControl fullWidth margin="normal" size="small">
					  <InputLabel id="demo-simple-select-label">Gender</InputLabel>
					  <Select
						labelId="demo-simple-select-label"
						id="id_gender" name="id_gender"
						label="Gender" value={detail.id_gender}  onChange={ (e) => setDetail({ ...detail, id_gender: e.target.value})}
					  >
					  {item_gender}
						
					  </Select>
					</FormControl>
				</Grid>
				<Grid item xs={6}>
					<FormControl fullWidth margin="normal" size="small">
					  <InputLabel id="demo-simple-select-label">Status Relation</InputLabel>
					  <Select
						labelId="demo-simple-select-label"
						id="id_status_family" name="id_status_family"
						label="Status Relation" value={detail.id_status_family}  onChange={ (e) => setDetail({ ...detail, id_status_family: e.target.value})}
					  >
						{item_family}
						
					  </Select>
					</FormControl>
			  </Grid>
			</Grid>
				
			</DialogContent>
			<DialogActions>
				<Button variant="outlined" onClick={()=> setOpenedit(false)}>Close</Button>
				<Button color="success" variant="contained" type="submit" >Save</Button>
			</DialogActions>
		</Box>
      </Dialog>
	  
	</>  
    
  );
}
