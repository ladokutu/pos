import React,{ useState,useEffect } from 'react'
import { DataGrid,GridToolbar  } from '@mui/x-data-grid';
import axios from 'axios';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { TextField} from '@mui/material';
import { MoreVert,Delete,Edit,Password,FamilyRestroom,Visibility ,VisibilityOff   } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import LinearProgress from '@mui/material/LinearProgress';
import moment from "moment";
import {Dialog,DialogContent,Grid,Menu,MenuItem} from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';

import { useNavigate  } from 'react-router-dom'
import Slide from '@mui/material/Slide';
import {Select,InputLabel,FormControl,ListItemIcon,Divider,DialogTitle,DialogActions,OutlinedInput,InputAdornment,Checkbox,FormControlLabel } from '@mui/material';
import Loader from '../Tools/Loader';
import Alerts from '../Tools/Alerts';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function DataTable() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = React.useState(false)
  const [openedit, setOpenedit] = useState(false)
  const [openlogin, setOpenLogin] = React.useState(false)
  const [pageSize, setPageSize] = React.useState(5);
  const newDate = moment(new Date()).format('YYYY-MM-DD')
  const [alerto, setAlerto] = useState('');
  const [detail, setDetail] = useState('');
  const [datadept, setDataDepartment] = useState([]);
  const [datapos, setDataPosition] = useState([]);
  const [workplace, setDataWorkplace] = useState([]);
  const [gender, setDataGender] = useState([]);
  const [religion, setDataRelogion] = useState([]);
  const [employee_status, setDataEmployeestatus] = useState([]);
  const [tax_status, setDataTaxStatus] = useState([]);
  const [marital, setDataMarital] = useState([]);
  const [value, setValue] = useState('');
 
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openbol = Boolean(anchorEl);
  
  const [values, setValues] = React.useState({
	type:'new',
    user_email:'',
	password: '',
    showPassword: false,
	id_status:false
  });
  
  useEffect(() => {
		
		GetDataDepartment()
		GetDataPosition()
		GetDataWorkplace()
		GetDataGender()
		GetDataReligion()
		GetDataMarital()
		GetDataTaxStatus()
		GetDataEmployeeStatus()
		GetData()
    },[]); 
  
  const columns = [
	  { field: 'nomor', headerName: 'No', width: 50 },
	  { field: 'id_employee', headerName: 'ID', width: 80 },
	  { field: 'full_name', headerName: 'Full Name', width: 150 },
	  { field: 'position_name', headerName: 'Position', width: 150 },
	  { field: 'department', headerName: 'Department', width: 200 },
	  { field: 'join_date', headerName: 'Join Date', width: 200 },
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
						<MenuItem onClick={()=> view_login_data(value)}>
							<ListItemIcon>
								<Password fontSize="small" color="error" />
							</ListItemIcon>Data Login
						</MenuItem>
						<MenuItem onClick={()=> navigate("/ms/user_family",{state: {id: value}})}>
							<ListItemIcon>
									<FamilyRestroom fontSize="small" color="warning" />
								</ListItemIcon>Family
							</MenuItem>
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
	  console.log(cellValues.row.id_user);
	  setValue(cellValues.row.id_user)
	  setAnchorEl(event.currentTarget);
	};
	const handleChange = (prop) => (event) => {
		setValues({ ...values, [prop]: event.target.value });
	  };
	const handleClickShowPassword = () => {
		setValues({
		  ...values,
		  showPassword: !values.showPassword,
		});
	  };

	  const handleMouseDownPassword = (event) => {
		event.preventDefault();
	  };
  
	const GetData = async () => {
		try {
			setLoading(true)
			const tokendata = await localStorage.getItem('TokenData')
			const headers_data = {
				Authorization: tokendata,
			}
			var api='https://panen.ladokutu.info/index.php/Solution/data_master_user';  
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
		let full_name = data.get('full_name')
		let id_gender = data.get('id_gender')
		let born_place = data.get('born_place')
		let birth_date = data.get('birth_date')
		let id_citizen = data.get('id_citizen')
		let address1 = data.get('address1')
		let address2 = data.get('address2')
		let id_depart = data.get('id_depart')
		let id_religion = data.get('id_religion')
		let id_position = data.get('id_position')
		let id_work = data.get('id_work')
		let id_tax_status = data.get('id_tax_status')
		let id_marital = data.get('id_marital')
		let id_employee_status = data.get('id_employee_status')
		let join_date = data.get('join_date')
		let phone_number1 = data.get('phone_number1')
		let phone_number2 = data.get('phone_number2')
		let id_employee = data.get('id_employee')
		let citizen_number = data.get('citizen_number')
		
		
		/*console.log({
		  full_name: full_name,
		  born_place: born_place,
		});
		*/
		try { 
			const tokendata = await localStorage.getItem('TokenData')
				const headers_data = {
					Authorization: tokendata,
				}
            var api='https://panen.ladokutu.info/index.php/Solution/add_data_detail_user_personal';  
            const data_body = { 
                    'full_name': full_name,
					'id_gender': id_gender,
					'born_place': born_place,
					'birth_date': moment(birth_date).format('YYYY-MM-DD'),
					'join_date': moment(join_date).format('YYYY-MM-DD'),
					'id_citizen': id_citizen,
					'address1': address1,
					'address2': address2,
					'id_depart': id_depart,
					'id_religion': id_religion,
					'id_position': id_position,
					'id_work': id_work,
					'id_tax_status': id_tax_status,
					'id_marital': id_marital,
					'id_employee_status': id_employee_status,
					'phone_number1': phone_number1,
					'phone_number2': phone_number2,
					'id_employee': id_employee,
					'citizen_number': citizen_number,
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
			//console.log(selectedid)
			try {
				const tokendata = await localStorage.getItem('TokenData')
				const headers_data = {
					Authorization: tokendata,
				}
				var api='https://panen.ladokutu.info/index.php/Solution/delete_selected_data_detail_user_personal';  
				const response = await axios({
					method: 'post',
					headers: headers_data,
					url: api,
					data: selectedid 
				});
				if (response.data.status === 200 ){
					GetData()
				}
					//event.current.reset()
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
			}
			setLoading(false)
	};
	const view_login_data = async (id) => {
		setAnchorEl(null)
		setLoading(true)
			try {
				const tokendata = await localStorage.getItem('TokenData')
				const headers_data = {
					Authorization: tokendata,
				}
				var api='https://panen.ladokutu.info/index.php/Solution/view_data_master_user_login';  
				const response = await axios({
					method: 'post',
					headers: headers_data,
					url: api,
					data: {id:id} 
				});
				console.log(response.data)
				if(response.data.id_status === '1'){
					var statusi=true;
				}else{
					statusi=false;
				}
				
				setValues({ ...values,user_email: response.data.user_email,password: response.data.true_password,type:'edit',id_status:statusi });
				setOpenLogin(true)
				setLoading(false)
			} catch (e) {
				setValues({ ...values,user_email: '',password: '',type:'new',id_status:false });
				setOpenLogin(true)
				console.log(e)
				setLoading(false)
			}
		
	}
	const UpdateUserLogin = async (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		let user_email = data.get('user_email')
		let user_password = data.get('user_password')
		
		
		setOpenLogin(false)
		setLoading(true)
		try { 
		
			//console.log(detail.id_depart)
			const tokendata = await localStorage.getItem('TokenData')
				const headers_data = {
					Authorization: tokendata,
				}
            var api='https://panen.ladokutu.info/index.php/Solution/update_data_master_user_login';  
			const data_body = { 
					'id': value,
                    'user_email': user_email,
					'user_password': user_password,
					'type': values.type,
					'id_status': values.id_status,
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
	const view_edit_data = async (id) => {
			setAnchorEl(null)
			setLoading(true)
			try {
				const tokendata = await localStorage.getItem('TokenData')
				const headers_data = {
					Authorization: tokendata,
				}
				var api='https://panen.ladokutu.info/index.php/Solution/view_data_master_user';  
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
		let full_name = data.get('full_name')
		let id_gender = data.get('id_gender')
		let born_place = data.get('born_place')
		let birth_date = data.get('birth_date')
		let id_citizen = data.get('id_citizen')
		let address1 = data.get('address1')
		let address2 = data.get('address2')
		let id_depart = data.get('id_depart')
		let id_religion = data.get('id_religion')
		let id_position = data.get('id_position')
		let id_work = data.get('id_work')
		let id_tax_status = data.get('id_tax_status')
		let id_marital = data.get('id_marital')
		let id_employee_status = data.get('id_employee_status')
		let join_date = data.get('join_date')
		let phone_number1 = data.get('phone_number1')
		let phone_number2 = data.get('phone_number2')
		let id_employee = data.get('id_employee')
		let citizen_number = data.get('citizen_number')
		
		setOpenedit(false)
		setLoading(true)
		try { 
		
			//console.log(detail.id_depart)
			const tokendata = await localStorage.getItem('TokenData')
				const headers_data = {
					Authorization: tokendata,
				}
            var api='https://panen.ladokutu.info/index.php/Solution/edit_data_master_user';  
			const data_body = { 
					'id': value,
                    'full_name': full_name,
					'id_gender': id_gender,
					'born_place': born_place,
					'birth_date': moment(birth_date).format('YYYY-MM-DD'),
					'join_date': moment(join_date).format('YYYY-MM-DD'),
					'id_citizen': id_citizen,
					'address1': address1,
					'address2': address2,
					'id_depart': id_depart,
					'id_religion': id_religion,
					'id_position': id_position,
					'id_work': id_work,
					'id_tax_status': id_tax_status,
					'id_marital': id_marital,
					'id_employee_status': id_employee_status,
					'phone_number1': phone_number1,
					'phone_number2': phone_number2,
					'id_employee': id_employee,
					'citizen_number': citizen_number,
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
	const GetDataDepartment = async () => {
		try {
			setLoading(true)
			const tokendata = await localStorage.getItem('TokenData')
			const headers_data = {
				Authorization: tokendata,
			}
			var api='https://panen.ladokutu.info/index.php/Solution/data_master_department';  
			const response = await axios({
				method: 'post',
				headers: headers_data,
				url: api,
			});
			
			setDataDepartment(response.data)
			setLoading(false)
		} catch (e) {
			console.log(e)
		}
	}
	const item_department=datadept.map((item,index) =>(
		<MenuItem value={item.id_depart}>{item.department}</MenuItem>
	))
	const GetDataPosition = async () => {
		try {
			setLoading(true)
			const tokendata = await localStorage.getItem('TokenData')
			const headers_data = {
				Authorization: tokendata,
			}
			var api='https://panen.ladokutu.info/index.php/Solution/data_master_position';  
			const response = await axios({
				method: 'post',
				headers: headers_data,
				url: api,
			});
			
			setDataPosition(response.data)
			setLoading(false)
		} catch (e) {
			console.log(e)
		}
	}
	const item_position=datapos.map((item,index) =>(
		<MenuItem value={item.id_position}>{item.position_name}</MenuItem>
	))
	const GetDataWorkplace = async () => {
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
			//console.log(response.data)
			setDataWorkplace(response.data)
			setLoading(false)
		} catch (e) {
			console.log(e)
		}
	}
	const item_workplace=workplace.map((item,index) =>(
		<MenuItem value={item.id_work}>{item.workplace}</MenuItem>
	))
	const GetDataReligion = async () => {
		try {
			setLoading(true)
			const tokendata = await localStorage.getItem('TokenData')
			const headers_data = {
				Authorization: tokendata,
			}
			var api='https://panen.ladokutu.info/index.php/Solution/data_master_religion';  
			const response = await axios({
				method: 'post',
				headers: headers_data,
				url: api,
			});
			//console.log(response.data)
			setDataRelogion(response.data)
			setLoading(false)
		} catch (e) {
			console.log(e)
		}
	}
	const item_religion=religion.map((item,index) =>(
		<MenuItem value={item.id_religion}>{item.religion_name}</MenuItem>
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
	const GetDataMarital = async () => {
		try {
			setLoading(true)
			const tokendata = await localStorage.getItem('TokenData')
			const headers_data = {
				Authorization: tokendata,
			}
			var api='https://panen.ladokutu.info/index.php/Solution/data_master_marital';  
			const response = await axios({
				method: 'post',
				headers: headers_data,
				url: api,
			});
			//console.log(response.data)
			setDataMarital(response.data)
			setLoading(false)
		} catch (e) {
			console.log(e)
		}
	}
	const item_marital=marital.map((item,index) =>(
		<MenuItem value={item.id_marital}>{item.marital_status}</MenuItem>
	))
	const GetDataEmployeeStatus = async () => {
		try {
			setLoading(true)
			const tokendata = await localStorage.getItem('TokenData')
			const headers_data = {
				Authorization: tokendata,
			}
			var api='https://panen.ladokutu.info/index.php/Solution/data_master_employee_status';  
			const response = await axios({
				method: 'post',
				headers: headers_data,
				url: api,
			});
			
			setDataEmployeestatus(response.data)
			setLoading(false)
		} catch (e) {
			console.log(e)
		}
	}
	const item_employee_status=employee_status.map((item,index) =>(
		<MenuItem value={item.id_employee_status}>{item.employee_status}</MenuItem>
	))
	const GetDataTaxStatus = async () => {
		try {
			setLoading(true)
			const tokendata = await localStorage.getItem('TokenData')
			const headers_data = {
				Authorization: tokendata,
			}
			var api='https://panen.ladokutu.info/index.php/Solution/data_master_tax_status';  
			const response = await axios({
				method: 'post',
				headers: headers_data,
				url: api,
			});
			
			setDataTaxStatus(response.data)
			setLoading(false)
		} catch (e) {
			console.log(e)
		}
	}
	const item_tax_status=tax_status.map((item,index) =>(
		<MenuItem value={item.id_tax_status}>{item.name_tax_status}</MenuItem>
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
			checkboxSelection
		  />
		</div> 
	
	  <Dialog
	    fullScreen
        open={open}
		onClose={()=> setOpen(false)}
        TransitionComponent={Transition}
        maxWidth='xl' scroll='body'
        aria-describedby="alert-dialog-slide-description"
      >
        <Box component="form" onSubmit={SimpanData}  >
		<AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={()=> setOpen(false)}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Add Data
            </Typography>
            <Button autoFocus color="inherit" type="submit">
              save
            </Button>
          </Toolbar>
        </AppBar>
        <DialogContent >
			<Grid container spacing={1}>
				<Grid item xs={6}>
					<TextField margin="normal" required fullWidth size="small" name="full_name" id="full_name" label="Full Name" autoComplete="full_name" autoFocus />
				</Grid>
				<Grid item xs={3}>
					<TextField margin="normal" required fullWidth size="small" name="id_employee" id="id_employee" label="ID Employee" autoComplete="id_employee"  />
				</Grid>
				<Grid item xs={6}>
					<TextField margin="normal"  fullWidth size="small" name="born_place" id="born_place" label="Birth Place" autoComplete="born_place" />
				</Grid>
				<Grid item xs={3}>
					<TextField margin="normal" size="small" id="birth_date" name="birth_date" label="Birth Date" type="date" defaultValue={newDate} fullWidth />
				</Grid>
				<Grid item xs={3}>
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
					<TextField margin="normal"  fullWidth size="small" name="address1" id="address1" label="Address 1" autoComplete="address1" />
				</Grid>
				
				<Grid item xs={3}>
					<FormControl fullWidth margin="normal" size="small">
					  <InputLabel id="demo-simple-select-label">Department</InputLabel>
					  <Select required
						labelId="demo-simple-select-label"
						id="id_depart" name="id_depart"
						label="Department" 
					  >
						{item_department}
					  </Select>
					</FormControl>
				</Grid>
				<Grid item xs={3}>
					<FormControl fullWidth margin="normal" size="small">
					  <InputLabel id="demo-simple-select-label">Religion</InputLabel>
					  <Select 
						labelId="demo-simple-select-label"
						id="id_religion" name="id_religion"
						label="Religion"
					  >
					  {item_religion}
						
					  </Select>
					</FormControl>
				</Grid>
				<Grid item xs={6}>
					<TextField margin="normal"  fullWidth size="small" name="address2" id="address2" label="Address 2" autoComplete="address2" />
				</Grid>
				<Grid item xs={3}>
					<FormControl fullWidth margin="normal" size="small">
					  <InputLabel id="demo-simple-select-label">Position</InputLabel>
					  <Select required
						labelId="demo-simple-select-label"
						id="id_position" name="id_position"
						label="Position"
					  >
						{item_position}
					  </Select>
					</FormControl>
				</Grid>
				<Grid item xs={3}>
					<FormControl fullWidth margin="normal" size="small">
					  <InputLabel id="demo-simple-select-label">Workplace</InputLabel>
					  <Select required
						labelId="demo-simple-select-label"
						id="id_work" name="id_work"
						label="Workplace"
					  >
						{item_workplace}
						
					  </Select>
					</FormControl>
				</Grid>
				
				<Grid item xs={3}>
					<TextField margin="normal"  fullWidth size="small" name="phone_number1" id="phone_number1" label="Phone" autoComplete="phone_number1" />
				</Grid>
				<Grid item xs={3}>
					<TextField margin="normal"  fullWidth size="small" name="phone_number2" id="phone_number2" label="Mobile Phone" autoComplete="phone_number2" />
				</Grid>
				<Grid item xs={3}>
					<FormControl fullWidth margin="normal" size="small">
					  <InputLabel id="demo-simple-select-label">Citizen</InputLabel>
					  <Select
						labelId="demo-simple-select-label"
						id="id_citizen" name="id_citizen"
						label="Citizen"
					  >
						<MenuItem value={'WNI'}>WNI</MenuItem>
						<MenuItem value={'WNA'}>WNA</MenuItem>
						
					  </Select>
					</FormControl>
				</Grid>
				<Grid item xs={3}>
					<TextField margin="normal"  fullWidth size="small" name="citizen_number" id="citizen_number" label="Citizen Number" autoComplete="citizen_number"  />
				</Grid>
				<Grid item xs={3}>
					<TextField margin="normal" size="small" id="join_date" name="join_date" label="Join Date" type="date" defaultValue={newDate} fullWidth />
				</Grid>
				<Grid item xs={3}>
					<FormControl fullWidth margin="normal" size="small">
					  <InputLabel id="demo-simple-select-label">Tax Status</InputLabel>
					  <Select
						labelId="demo-simple-select-label"
						id="id_tax_status" name="id_tax_status"
						label="Tax Status"
					  >
						{item_tax_status}
						
					  </Select>
					</FormControl>
				</Grid>
				<Grid item xs={3}>
					<FormControl fullWidth margin="normal" size="small">
					  <InputLabel id="demo-simple-select-label">Marital Status</InputLabel>
					  <Select
						labelId="demo-simple-select-label"
						id="id_marital" name="id_marital"
						label="Marital Status"
					  >
						{item_marital}
						
					  </Select>
					</FormControl>
				</Grid>
				<Grid item xs={3}>
					<FormControl fullWidth margin="normal" size="small">
					  <InputLabel id="demo-simple-select-label">Employee Status</InputLabel>
					  <Select
						labelId="demo-simple-select-label"
						id="id_employee_status" name="id_employee_status"
						label="Employee Status"
					  >
						{item_employee_status}
						
					  </Select>
					</FormControl>
				</Grid>
			</Grid>
        </DialogContent>
        
		</Box>
      </Dialog>
	  
	  
	  
	  
	   <Dialog
	    fullScreen
        open={openedit}
		onClose={()=> setOpenedit(false)}
        TransitionComponent={Transition}
        maxWidth='md' scroll='body'
        aria-describedby="alert-dialog-slide-description"
      >
       
		<Box component="form" onSubmit={EditData}  >
		<AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={()=> setOpenedit(false)}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Edit Data
            </Typography>
            <Button autoFocus color="inherit" type="submit">
              save
            </Button>
          </Toolbar>
        </AppBar>
        <DialogContent dividers>
				
			<Grid container spacing={1}>
				<Grid item xs={6}>
					<TextField margin="normal" required fullWidth size="small" value={detail.full_name}  onChange={ (e) => setDetail({ ...detail, full_name: e.target.value})} name="full_name" id="full_name" label="Full Name" autoComplete="full_name" autoFocus />
				</Grid>
				<Grid item xs={3}>
					<TextField margin="normal" required fullWidth size="small" value={detail.id_employee}  onChange={ (e) => setDetail({ ...detail, id_employee: e.target.value})} name="id_employee" id="id_employee" label="ID Employee" autoComplete="id_employee"  />
				</Grid>
				<Grid item xs={6}>
					<TextField margin="normal"  fullWidth size="small" value={detail.born_place}  onChange={ (e) => setDetail({ ...detail, born_place: e.target.value})} name="born_place" id="born_place" label="Birth Place" autoComplete="born_place" />
				</Grid>
				<Grid item xs={3}>
					<TextField margin="normal"  fullWidth value={detail.birth_date}  onChange={ (e) => setDetail({ ...detail, birth_date: e.target.value})} size="small" id="birth_date" name="birth_date" label="Birth Date" type="date" defaultValue={newDate}  />
				</Grid>
				<Grid item xs={3}>
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
					<TextField margin="normal"  fullWidth size="small" value={detail.address1}  onChange={ (e) => setDetail({ ...detail, address1: e.target.value})} name="address1" id="address1" label="Address 1" autoComplete="address1" />
				</Grid>
				
				<Grid item xs={3}>
					<FormControl fullWidth margin="normal" size="small">
					  <InputLabel id="demo-simple-select-label">Department</InputLabel>
					  <Select required
						labelId="demo-simple-select-label"
						id="id_depart" name="id_depart"
						label="Department" value={detail.id_depart}  onChange={ (e) => setDetail({ ...detail, id_depart: e.target.value})}
					  >
						{item_department}
					  </Select>
					</FormControl>
				</Grid>
				<Grid item xs={3}>
					<FormControl fullWidth margin="normal" size="small">
					  <InputLabel id="demo-simple-select-label">Religion</InputLabel>
					  <Select
						labelId="demo-simple-select-label"
						id="id_religion" name="id_religion"
						label="Religion" value={detail.id_religion}  onChange={ (e) => setDetail({ ...detail, id_religion: e.target.value})}
					  >
					  {item_religion}
						
					  </Select>
					</FormControl>
				</Grid>
				<Grid item xs={6}>
					<TextField margin="normal"  fullWidth size="small" value={detail.address2}  onChange={ (e) => setDetail({ ...detail, address2: e.target.value})} name="address2" id="address2" label="Address 2" autoComplete="address2" />
				</Grid>
				<Grid item xs={3}>
					<FormControl fullWidth margin="normal" size="small">
					  <InputLabel id="demo-simple-select-label">Position</InputLabel>
					  <Select required
						labelId="demo-simple-select-label"
						id="id_position" name="id_position"
						label="Position" value={detail.id_position}  onChange={ (e) => setDetail({ ...detail, id_position: e.target.value})}
					  >
						{item_position}
					  </Select>
					</FormControl>
				</Grid>
				<Grid item xs={3}>
					<FormControl fullWidth margin="normal" size="small">
					  <InputLabel id="demo-simple-select-label">Workplace</InputLabel>
					  <Select required
						labelId="demo-simple-select-label"
						id="id_work" name="id_work"
						label="Workplace" value={detail.id_work}  onChange={ (e) => setDetail({ ...detail, id_work: e.target.value})}
					  >
						{item_workplace}
						
					  </Select>
					</FormControl>
				</Grid>
				
				<Grid item xs={3}>
					<TextField margin="normal"  fullWidth size="small" value={detail.phone_number1}  onChange={ (e) => setDetail({ ...detail, phone_number1: e.target.value})}  name="phone_number1" id="phone_number1" label="Phone" autoComplete="phone_number1" />
				</Grid>
				<Grid item xs={3}>
					<TextField margin="normal"  fullWidth size="small" value={detail.phone_number2}  onChange={ (e) => setDetail({ ...detail, phone_number2: e.target.value})} name="phone_number2" id="phone_number2" label="Mobile Phone" autoComplete="phone_number2" />
				</Grid>
				<Grid item xs={3}>
					<FormControl fullWidth margin="normal" size="small">
					  <InputLabel id="demo-simple-select-label">Citizen</InputLabel>
					  <Select
						labelId="demo-simple-select-label"
						id="id_citizen" name="id_citizen"
						label="Citizen" value={detail.id_citizen}  onChange={ (e) => setDetail({ ...detail, id_citizen: e.target.value})}
					  >
						<MenuItem value={'WNI'}>WNI</MenuItem>
						<MenuItem value={'WNA'}>WNA</MenuItem>
						
					  </Select>
					</FormControl>
				</Grid>
				<Grid item xs={3}>
					<TextField margin="normal"  fullWidth size="small" value={detail.citizen_number}  onChange={ (e) => setDetail({ ...detail, citizen_number: e.target.value})} name="citizen_number" id="citizen_number" label="Citizen Number" autoComplete="citizen_number"  />
				</Grid>
				<Grid item xs={3}>
					<TextField margin="normal"  fullWidth size="small" value={detail.join_date}  onChange={ (e) => setDetail({ ...detail, join_date: e.target.value})}   id="join_date"  name="join_date" label="Join Date" type="date" defaultValue={newDate}  />
				</Grid>
				<Grid item xs={3}>
					<FormControl fullWidth margin="normal" size="small">
					  <InputLabel id="demo-simple-select-label">Tax Status</InputLabel>
					  <Select
						labelId="demo-simple-select-label"
						id="id_tax_status" name="id_tax_status"
						label="Tax Status" value={detail.id_tax_status}  onChange={ (e) => setDetail({ ...detail, id_tax_status: e.target.value})}
					  >
						{item_tax_status}
						
					  </Select>
					</FormControl>
				</Grid>
				<Grid item xs={3}>
					<FormControl fullWidth margin="normal" size="small">
					  <InputLabel id="demo-simple-select-label">Marital Status</InputLabel>
					  <Select
						labelId="demo-simple-select-label"
						id="id_marital" name="id_marital"
						label="Marital Status" value={detail.id_marital}  onChange={ (e) => setDetail({ ...detail, id_marital: e.target.value})}
					  >
						{item_marital}
						
					  </Select>
					</FormControl>
				</Grid>
				<Grid item xs={3}>
					<FormControl fullWidth margin="normal" size="small">
					  <InputLabel id="demo-simple-select-label">Employee Status</InputLabel>
					  <Select
						labelId="demo-simple-select-label"
						id="id_employee_status" name="id_employee_status"
						label="Employee Status" value={detail.id_employee_status}  onChange={ (e) => setDetail({ ...detail, id_employee_status: e.target.value})}
					  >
						{item_employee_status}
						
					  </Select>
					</FormControl>
				</Grid>
			</Grid>
        </DialogContent>
       
		</Box>
      </Dialog>
	  
	  
	  <Dialog
        open={openlogin}
		onClose={()=> setOpenLogin(false)}
        TransitionComponent={Transition}
        maxWidth='sm'
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Login Data</DialogTitle>
		<Box component="form" onSubmit={UpdateUserLogin}  >
        <DialogContent dividers>
				
			
			 <Grid container spacing={1}>
				<Grid item xs={12}>
					<TextField margin="normal" required fullWidth value={values.user_email} onChange={handleChange('user_email')} size="small" name="user_email" id="user_email" label="UserName" type='email'/>
				</Grid>
				<Grid item xs={12}>
					<FormControl fullWidth  variant="outlined" size="small">
					  <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
					  <OutlinedInput 
						name="user_password" id="user_password"
						type={values.showPassword ? 'text' : 'password'}
						value={values.password}
						onChange={handleChange('password')}
						endAdornment={
						  <InputAdornment position="end">
							<IconButton
							  aria-label="toggle password visibility"
							  onClick={handleClickShowPassword}
							  onMouseDown={handleMouseDownPassword}
							  edge="end"
							>
							  {values.showPassword ? <VisibilityOff /> : <Visibility />}
							</IconButton>
						  </InputAdornment>
						}
						label="Password"
					  />
					</FormControl>
				</Grid>
				<Grid item xs={6}>
					
					
					
					<FormControlLabel
					  control={<Checkbox checked={values.id_status}
					  onChange={(e) => setValues({ ...values, id_status: e.target.checked})} />}
					  label="Active"
					/>
				</Grid>
			</Grid>
			
			
        </DialogContent>
        <DialogActions>
			<Button variant="outlined" onClick={()=> setOpenLogin(false)}>Close</Button>
			<Button color="success" variant="contained" type="submit">Save</Button>
        </DialogActions>
		</Box>
      </Dialog>
    </>
  );
}
