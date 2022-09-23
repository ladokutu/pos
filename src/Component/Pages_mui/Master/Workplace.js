import React,{ useState,useEffect } from 'react'
import { DataGrid,GridToolbar  } from '@mui/x-data-grid';
import axios from 'axios';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import {TextField} from '@mui/material';
import { MoreVert ,Delete,Edit } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import LinearProgress from '@mui/material/LinearProgress';
import {Dialog,DialogActions,DialogTitle,DialogContent,Grid,Menu,MenuItem,Divider,ListItemIcon} from '@mui/material';
import Slide from '@mui/material/Slide';
import { useNavigate  } from 'react-router-dom'
import Loader from '../Tools/Loader';
import Alerts from '../Tools/Alerts';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function Workplace() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = React.useState(false)
  const [openedit, setOpenedit] = useState(false)
  const [pageSize, setPageSize] = React.useState(5);
   const navigate = useNavigate();
  
  const [value, setValue] = useState('');
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openbol = Boolean(anchorEl);
  const [alerto, setAlerto] = useState('');
  const [detail, setDetail] = useState('');
  
  useEffect(() => {
		GetData()
    },[]); 
	
  const columns = [
	  { field: 'nomor', headerName: 'No', width: 50 },
	  { field: 'workplace', headerName: 'Workplace Name', width: 450 },
	  { field: 'address', headerName: 'Address', width: 450 },
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
						<MenuItem onClick={()=> navigate("/ms/workplace_location",{state: {id: value}} 
						  )}>Location</MenuItem>
						<Divider/>
						<MenuItem onClick={()=> view_edit_data(value)}>
							<ListItemIcon>
								<Edit fontSize="small" color="warning" />
							</ListItemIcon>Edit
						</MenuItem>
						<MenuItem onClick={()=> deleteselected([value])}>
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
	  //console.log(cellValues.row.id_work);
	  setValue(cellValues.row.id_work)
	  setAnchorEl(event.currentTarget);
	};
	const handleCloseAlerto = () => {
		setAlerto(false);
	  };
  
	const GetData = async () => {
		try {
			setLoading(true)
			const tokendata = await localStorage.getItem('TokenData')
			const headers_data = {
				Authorization: tokendata,
			}
			var api='https://panen.ladokutu.info/index.php/Solution/data_master_workplace';  
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
		
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		let workplace = data.get('workplace')
		let address = data.get('address')
		/*console.log({
		  full_name: full_name,
		  born_place: born_place,
		});
		*/
		setOpen(false)
		setLoading(true)
		try { 
			const tokendata = await localStorage.getItem('TokenData')
				const headers_data = {
					Authorization: tokendata,
				}
            var api='https://panen.ladokutu.info/index.php/Solution/add_data_master_workplace';  
            const data_body = { 
                    'workplace': workplace,
					'address': address,
                }
			const response = await axios({
                  method: 'post',
                  url: api,
				  headers: headers_data,
                  data: data_body
				});
			//console.log(response.data)
			if (response.data.status === 200 ){
				GetData()
			}
				//event.current.reset()
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
			setLoading(false)
            console.log(error)
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
				var api='https://panen.ladokutu.info/index.php/Solution/delete_data_master_workplace';  
				const response = await axios({
					method: 'post',
					headers: headers_data,
					url: api,
					data: selectedid 
				});
				GetData()
				setAlerto({
				  alerto: true,
				  state_msg: response.data.message,
				  state_typ:'success'
				});
				//console.log(selectedid)
				setLoading(false)
			} catch (e) {
				setAlerto({
				  alerto: true,
				  state_msg: 'Data Error',
				  state_typ:'error'
				});
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
				var api='https://panen.ladokutu.info/index.php/Solution/view_data_master_workplace';  
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
		let workplace = data.get('workplace')
		let address = data.get('address')
		setOpenedit(false)
		setLoading(true)
		try { 
			const tokendata = await localStorage.getItem('TokenData')
				const headers_data = {
					Authorization: tokendata,
				}
            var api='https://panen.ladokutu.info/index.php/Solution/edit_data_master_workplace';  
			const data_body = { 
					'id': value,
                    'workplace': workplace,
					'address': address,
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
			 maxWidth='md'
			aria-describedby="alert-dialog-slide-description"
		  >
			<DialogTitle>Add Data</DialogTitle>
			<Box component="form" onSubmit={SimpanData} noValidate sx={{ mt: 1 }}>
			<DialogContent dividers>
					
				<Grid container spacing={1}>
				  
				  <Grid item xs={12}>
					<TextField margin="normal" required fullWidth size="small" name="workplace" id="workplace" label="Workplace Name" autoComplete="workplace" />
				  </Grid>
				  <Grid item xs={12}>
					<TextField margin="normal" required fullWidth size="small" name="address" id="address" label="Address" autoComplete="address" />
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
			 maxWidth='md'
			aria-describedby="alert-dialog-slide-description"
		  >
			<DialogTitle>Add Data</DialogTitle>
			<Box component="form" onSubmit={EditData} noValidate sx={{ mt: 1 }}>
			<DialogContent dividers>
					
				<Grid container spacing={1}>
				 
				  <Grid item xs={12}>
					<TextField margin="normal" required fullWidth size="small" value={detail.workplace}  onChange={ (e) => setDetail({ ...detail, workplace: e.target.value})}   name="workplace" id="workplace" label="Workplace Name"  />
				  </Grid>
				  <Grid item xs={12}>
					<TextField margin="normal" required fullWidth size="small" value={detail.address}  onChange={ (e) => setDetail({ ...detail, address: e.target.value})}   name="address" id="address" label="Address"  />
				  </Grid>
				</Grid>
				
			</DialogContent>
			<DialogActions>
				<Button variant="outlined" onClick={()=> setOpenedit(false)}>Close</Button>
				<Button color="success" variant="contained" type="submit">Save</Button>
			</DialogActions>
			</Box>
		  </Dialog>
	   
    </>
  );
}
