import React,{ useState,useEffect } from 'react'
import { DataGrid,GridToolbar  } from '@mui/x-data-grid';
import axios from 'axios';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { MoreVert,ThumbUp,AttachFile} from '@mui/icons-material';
import {LinearProgress} from '@mui/material';
import {Dialog,DialogActions,DialogContent,Grid,Menu,MenuItem,IconButton,ListItemIcon,Divider,TextField,FormControl,InputLabel,Select,Link} from '@mui/material';
import Slide from '@mui/material/Slide';
import Loader from '../Tools/Loader';
import Alerts from '../Tools/Alerts';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default function Approval_form() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false)
  
  const [openedit, setOpenedit] = useState(false)
  const [pageSize, setPageSize] = useState(10);
  const [value, setValue] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const openbol = Boolean(anchorEl);
  const [alerto, setAlerto] = useState('');
 
  
  const columns = [
	  { field: 'nomor', headerName: 'No', width: 50 },
	  { field: 'request_date', headerName: 'Date', width: 200 },
	  { field: 'full_name', headerName: 'Requestor', width: 200 },
	  { field: 'form_name', headerName: 'Type', width: 200 },
	  { field: 'description', headerName: 'Description', width: 200 },
	  { field: 'status_name', headerName: 'Status', width: 200 },
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
						<MenuItem onClick={()=> view_edit_data(value)}>
							 <ListItemIcon>
								<ThumbUp fontSize="small" color="warning" />
							</ListItemIcon>Approval
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
			var api='https://panen.ladokutu.info/index.php/Solution/data_my_approval_form';  
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
	
  
	const view_edit_data = async (id) => {
			setAnchorEl(null)
			setOpenedit(true)
			console.log(id)
	};
	const EditData = async (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		let id_status = data.get('id_status')
		let note = data.get('note')
		
		setOpenedit(false)
		setLoading(true)
		try { 
			const tokendata = await localStorage.getItem('TokenData')
				const headers_data = {
					Authorization: tokendata,
				}
            var api='https://panen.ladokutu.info/index.php/Solution/edit_data_my_approval_form';  
			const data_body = { 
					'id': value,
                    'id_status': id_status,
					'note': note,
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
        open={openedit}
		onClose={()=> setOpenedit(false)}
        TransitionComponent={Transition}
        maxWidth='sm'
        aria-describedby="alert-dialog-slide-description"
      >
       
		<Box  component="form"  onSubmit={EditData}>
			<DialogContent >
				 
				 <Grid container spacing={1}>
					  <Grid item xs={12}>
						<FormControl fullWidth margin="normal" size="small">
						  <InputLabel id="demo-simple-select-label">Status Approval</InputLabel>
						  <Select required
							labelId="demo-simple-select-label"
							id="id_status" name="id_status"
							label="Approval" 
						  >
							<MenuItem value={'A'}>Approved</MenuItem>
							<MenuItem value={'R'}>Rejected</MenuItem>
						  </Select>
						</FormControl>
					</Grid>
					<Grid item xs={12}>
					<TextField margin="normal" required fullWidth size="small" name="note" id="note" label="Note" />
				</Grid>
				</Grid>
				
			</DialogContent>
			<DialogActions>
				<Button color="success" variant="contained" type="submit" >Submit</Button>
			</DialogActions>
		</Box>
      </Dialog>
	  
	</>  
    
  );
}
