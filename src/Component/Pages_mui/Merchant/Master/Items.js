import React,{ useState,useEffect } from 'react'
import { DataGrid,GridToolbar  } from '@mui/x-data-grid';
import axios from 'axios';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { MoreVert ,Delete,Edit } from '@mui/icons-material';
import {LinearProgress} from '@mui/material';
import {Dialog,DialogActions,DialogTitle,DialogContent,Grid,Menu,MenuItem,IconButton,ListItemIcon,Divider,TextField} from '@mui/material';
import Slide from '@mui/material/Slide';
import Loader from '../../Tools/Loader';
import Alerts from '../../Tools/Alerts';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default function Items() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [openedit, setOpenedit] = useState(false)
  const [pageSize, setPageSize] = useState(10);
  const [value, setValue] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const openbol = Boolean(anchorEl);
  const [alerto, setAlerto] = useState('');
  const [detail, setDetail] = useState('');
  
  const columns = [
	  { field: 'nomor', headerName: 'No', width: 50 },
	  { field: 'category_name', headerName: 'Type', width: 200 },
	  { field: 'item_name', headerName: 'Name', width: 550 },
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
		GetData()
    },[]); 
	const GetData = async () => {
		try {
			setLoading(true)
			const tokendata = await localStorage.getItem('TokenData')
			const headers_data = {
				Authorization: tokendata,
			}
			var api='https://node.ladokutu.info/index.php/Posc/master_item_merchant_pos';  
			const response = await axios({
				method: 'post',
				headers: headers_data,
				url: api,
				//withCredentials: true,
			});
			//console.log(response)
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
		let department = data.get('department')
		let id_depart = data.get('id_depart')

		try { 
			const tokendata = await localStorage.getItem('TokenData')
				const headers_data = {
					Authorization: tokendata,
				}
            var api='https://panen.ladokutu.info/index.php/Solution/add_data_master_category_item_merchant_pos';  
            const data_body = { 
                    'id_depart': id_depart,
					'department': department,
					
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
				var api='https://panen.ladokutu.info/index.php/Solution/delete_data_master_category_item_merchant_pos';  
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
				var api='https://panen.ladokutu.info/index.php/Solution/view_data_master_category_item_merchant_pos';  
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
		let id_depart = data.get('id_depart')
		let department = data.get('department')
		
		setOpenedit(false)
		setLoading(true)
		try { 
			const tokendata = await localStorage.getItem('TokenData')
				const headers_data = {
					Authorization: tokendata,
				}
            var api='https://panen.ladokutu.info/index.php/Solution/edit_data_master_category_item_merchant_pos';  
			const data_body = { 
					'id': value,
                    'id_depart': id_depart,
					'department': department,
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
        <DialogTitle>Add Data</DialogTitle>
		<Box component="form" onSubmit={SimpanData}  >
        <DialogContent dividers>
				
			
			 <Grid container spacing={1}>
			  <Grid item xs={12}>
				<TextField margin="normal" required fullWidth size="small" name="id_depart" id="id_depart" label="Code Department" autoComplete="id_depart" autoFocus />
			  </Grid>
			  <Grid item xs={12}>
				<TextField margin="normal" required fullWidth size="small" name="department" id="department" label="Department Name" autoComplete="department" />
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
		<Box  component="form"   sx={{ mt: 1 }} onSubmit={EditData}>
			<DialogContent dividers>

				 <Grid container spacing={1}>
				  <Grid item xs={12}>
					<TextField margin="normal" required fullWidth size="small"  value={detail.id_depart}  onChange={ (e) => setDetail({ ...detail, id_depart: e.target.value})}   name="id_depart" id="id_depart" label="Code Department" autoComplete="id_depart" />
				  </Grid>
				  <Grid item xs={12}>
					<TextField margin="normal" required fullWidth size="small"  value={detail.department} onChange={ (e) => setDetail({ ...detail, department: e.target.value})}  name="department" id="department" label="Department Name" autoComplete="department"/>
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
