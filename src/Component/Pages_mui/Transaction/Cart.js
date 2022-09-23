import React,{ useState,useEffect } from 'react'
import { DataGrid,GridToolbar  } from '@mui/x-data-grid';
import axios from 'axios';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { MoreVert ,Delete,Edit,Add,Remove,LocalMall,ShoppingCart } from '@mui/icons-material';
import {LinearProgress,Typography} from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import {Dialog,DialogActions,DialogTitle,DialogContent,Grid,Card,CardHeader,CardContent,CardActions ,Menu,MenuItem,IconButton,ListItemIcon,Divider,TextField,CssBaseline,Stack,Paper } from '@mui/material';
import Slide from '@mui/material/Slide';
import Loader from '../Tools/Loader';
import Alerts from '../Tools/Alerts';
import {List,ListItemSecondaryAction,ListItem,ListItemAvatar,ListItemText} from '@mui/material';
import moment from "moment";
import Avatar from '@mui/material/Avatar';
import { connect } from 'react-redux';
import { numberFormat } from "../Tools/FormatNumber";
import {delDataCart,setDataCart,RemDataCart} from '../../../Actions/DataCart';



const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Cart = (props) => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false)
  const [openedit, setOpenedit] = useState(false)
  const [pageSize, setPageSize] = useState(10);
  const [value, setValue] = useState('cash');
  const [anchorEl, setAnchorEl] = useState(null);
  const openbol = Boolean(anchorEl);
  const [alerto, setAlerto] = useState('');
  const [detail, setDetail] = useState('');
  const ref = React.useRef(null);
  const datenow = moment().format(' dddd , MMMM Do YYYY');
  const [selectedValue, setSelectedValue] = React.useState('cash');
  const [open, setOpen] = useState(false)
  const [open_payment, setOpenPayment] = useState(false)
  const [open_payment_pos, setOpenPaymentPos] = useState(false)
  const [open_qr_payment, setOpenQrPayment] = useState(false)
  const [detail_qr, setDetailQR] = useState('');
  //const { DataCarts } = props;
  
	//console.log(props.logindata)
	
	const result_sum = props.DataCarts.reduce((total, currentValue) => total = total + (currentValue.final_price*currentValue.amount),0);
	
	const handleCloseAlerto = () => {
		setAlerto(false);
	  };
	const SimpanDataUser = async (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		let user_email = data.get('user_email')
		let user_phone = data.get('user_phone')
		await localStorage.setItem('user_email', user_email)
		await localStorage.setItem('user_phone', user_phone)
		setOpen(false)
		setOpenPayment(true)
	}
	const SimpanDataPayment = async (event) => {
		event.preventDefault();
		setLoading(true)
		
		try { 
			const user_email= await localStorage.getItem('user_email')
			const user_phone= await localStorage.getItem('user_phone')
			const data_cart = {
				"data_transaction": [{
						"user_email": user_email,
						"user_phone": user_phone,
						"id_payment": value,
						"total_amount": result_sum,
					}],
				"details": props.DataCarts
			}
			console.log(data_cart)
            var api='https://node.tatamulia.co.id/index.php/Posc/add_data_transaction';  
			const response = await axios({
                  method: 'post',
                  url: api,
                  data: data_cart
				});
			console.log(response.data)
			if (response.data.status === 200){
				setOpenPayment(false)
				props.RemDataCart()
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

	}
	const SimpanDataPaymentPos = async (event) => {
		event.preventDefault();
		setLoading(true)
		
		try { 
			const user_email= await localStorage.getItem('user_email')
			const user_phone= await localStorage.getItem('user_phone')
			const data_cart = {
				"data_transaction": [{
					"user_email": user_email,
					"user_phone": user_phone,
					"id_payment": value,
					"total_amount": result_sum,
				}],
				"details": props.DataCarts
			}
			console.log(data_cart)
            var api='https://node.tatamulia.co.id/index.php/Posc/add_data_transaction_pos';  
			const response = await axios({
                  method: 'post',
                  url: api,
                  data: data_cart
				});
			console.log(response.data)

			if ((response.data.status === 200)&&(value=='cash')){
				setOpenPaymentPos(false)
				props.RemDataCart()
			}else if ((response.data.status === 200)&&(value=='wallet')){
				setOpenPaymentPos(false)
				setDetailQR(response.data.detail_qr)
				props.RemDataCart()
				setOpenQrPayment(true)
			}
				//event.current.reset()
			setAlerto({
				alerto: true,
				state_msg: response.data.message,
				state_typ: response.data.type
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

	}

	const handleChange = (event) => {
		setValue(event.target.value);
	};
  return (
    <>
	   <Loader loading={loading} />
	   <Alerts  alerto={alerto.alerto} state_typ={alerto.state_typ} state_msg={alerto.state_msg} onClose={handleCloseAlerto} />
	   <Box sx={{ pb: 7 }} ref={ref}>	
	   <CssBaseline />
			
				<Grid container
				  spacing={0}
				  direction={{ xs: 'column', md: 'row' }}
				  justifyContent={{ xs: 'center', md: 'center' }}
				  alignItems={{ xs: 'center', md: 'center' }}>
					<Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
						<Card>
						<CardHeader
							title="Shooping Chart"
							subheader={datenow}
						  />
						<CardContent>
						<List >
						{props.DataCarts.map((item, index) => (
						  <ListItem button key={index} 
						  >
							<ListItemSecondaryAction>
								<IconButton edge="end" aria-label="add" onClick={()=>props.setDataCart(++item.amount )}>
								  <Add />
								</IconButton>
								<IconButton edge="end" aria-label="Remove" onClick={()=>props.setDataCart(--item.amount)}>
								  <Remove />
								</IconButton>
								<IconButton edge="end" aria-label="delete" onClick={()=>props.delDataCart(item)} color='error'>
								  <Delete />
								</IconButton>
							</ListItemSecondaryAction>
							<ListItemAvatar>
							  <Avatar alt="Profile Picture" src={item.picture} />
							</ListItemAvatar>
							
							<ListItemText primary={item.item_name} 
								secondary={ numberFormat(item.final_price)+" X  "+item.amount +" = "+numberFormat((item.final_price)*item.amount) } 
							/>
						  </ListItem>
						  
						))}
						</List>
						</CardContent>
						{props.logindata ?
						<CardActions>
							<Grid container justifyContent="center">
								{ result_sum > 0 ?
								<Button variant="outlined" startIcon={<LocalMall />} onClick={()=> setOpenPaymentPos(true)}>
									Check Out
								</Button>
								:null}
								<IconButton sx={{  marginLeft: 'auto' }} aria-label="Let's Shopping">
									 Total : {numberFormat(result_sum)}
								</IconButton>
							</Grid>
						</CardActions>
						:
						<CardActions>
							<Grid container justifyContent="center">
								{ result_sum > 0 ?
								<Button variant="outlined" startIcon={<LocalMall />} onClick={()=> setOpen(true)}>
									Check Out
								</Button>
								:null}
								<IconButton sx={{  marginLeft: 'auto' }} aria-label="Let's Shopping">
									 Total : {numberFormat(result_sum)}
								</IconButton>
							</Grid>
						</CardActions>
						}
						</Card>
					</Grid>
				</Grid>
			<Dialog
				open={open}
				onClose={()=> setOpen(false)}
				TransitionComponent={Transition}
				 maxWidth='md'
				aria-describedby="alert-dialog-slide-description"
			  >
				<DialogTitle>Fill Information</DialogTitle>
				<Box component="form" onSubmit={SimpanDataUser}  sx={{ mt: 1 }}>
				<DialogContent dividers>
						
					<Grid container spacing={1}>
					  
					  <Grid item xs={12}>
						<TextField margin="normal" type="email" required fullWidth size="small" name="user_email" id="user_email" label="E-Mail"  />
					  </Grid>
					  <Grid item xs={12}>
						<TextField margin="normal" type="number" required fullWidth size="small" name="user_phone" id="user_phone" label="Phone" inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />
					  </Grid>
					</Grid>
					
				</DialogContent>
				<DialogActions>
					<Button variant="outlined" onClick={()=> setOpen(false)}>Close</Button>
					<Button color="success" variant="contained" type="submit">Submit</Button>
				</DialogActions>
				</Box>
			  </Dialog>	
			  
			  <Dialog
				open={open_payment}
				onClose={()=> setOpenPayment(false)}
				TransitionComponent={Transition}
				 maxWidth='md'
				aria-describedby="alert-dialog-slide-description"
			  >
				<DialogTitle>Payment Method</DialogTitle>
				<Box component="form" onSubmit={SimpanDataPayment}  sx={{ mt: 1 }}>
				<DialogContent dividers>
						
					<Grid container spacing={1}  >
					  
					  <Grid item xs={12} >
						<Typography gutterBottom variant="h5" component="div" alignItems="center" justifyContent="center">
							Total : {numberFormat(result_sum)}
						</Typography>
					  </Grid>
					  <Grid item xs={12} >
						<Box
							  sx={{
								justifyContent: 'center',  
								display: 'flex',
								flexWrap: 'wrap',
								'& > :not(style)': {
								  m: 1,
								  width: 128,
								  height: 128,
								},
							  }}
						>  
						  <Paper elevation={3} >
							<Stack
							  direction="column"
							  justifyContent="space-between"
							  alignItems="center"
							  spacing={5}
							>
							  <Stack direction="row" spacing={2}>
								<Radio checked={value === 'wallet'} onChange={handleChange} value="wallet"/>
								<Avatar alt="QRIS" src="https://storage.mysooltan.co.id/images/produk/sooltanpay/layanan%20qris.png" sx={{ width: 56, height: 56 }} />
							  </Stack>
							  
							  <Typography align="center">Wallet QRIS</Typography>
							 </Stack>
						  </Paper>
						  <Paper elevation={3} >
							<Stack
							  direction="column"
							  justifyContent="space-between"
							  alignItems="center"
							  spacing={5}
							>
							  <Stack direction="row" spacing={2}>
								<Radio checked={value === 'bank'} onChange={handleChange} value="bank"/>
								<Avatar alt="QRIS" src="https://www.seekpng.com/png/detail/133-1339436_bank-wire-transfer-icon.png" sx={{ width: 56, height: 56 }} />
							  </Stack>
							  <Typography align="center">Bank Transfer</Typography>
							</Stack>
						  </Paper>
						  <Paper elevation={3} >
							<Stack
							  direction="column"
							  justifyContent="space-between"
							  alignItems="center"
							  spacing={5}
							>
							  <Stack direction="row" spacing={2}>
								<Radio checked={value === 'cash'} onChange={handleChange} value="cash"/>
								<Avatar alt="QRIS" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSd2k_3Z9T70C5YN1sKAJfySjO8Ck8p-3iCzg&usqp=CAU" sx={{ width: 56, height: 56 }} />
							  </Stack>
							  <Typography align="center">Cash</Typography>
							</Stack>
						  </Paper>
						</Box>
						
						
					  </Grid>
					  
					</Grid>
					
					
				</DialogContent>
				<DialogActions>
					<Button variant="outlined" onClick={()=> setOpenPayment(false)}>Close</Button>
					<Button color="success" variant="contained" type="submit">Submit</Button>
				</DialogActions>
				</Box>
			</Dialog>	
			<Dialog
				open={open_payment_pos}
				onClose={()=> setOpenPaymentPos(false)}
				TransitionComponent={Transition}
				 maxWidth='md'
				aria-describedby="alert-dialog-slide-description"
			  >
				<DialogTitle>Payment Method </DialogTitle>
				<Box component="form" onSubmit={SimpanDataPaymentPos}  sx={{ mt: 1 }}>
				<DialogContent dividers>
						
					<Grid container spacing={1}  >
					  
					  <Grid item xs={12} >
						<Typography gutterBottom variant="h5" component="div" alignItems="center" justifyContent="center">
							Total : {numberFormat(result_sum)}
						</Typography>
					  </Grid>
					  <Grid item xs={12} >
						<Box
							  sx={{
								justifyContent: 'center',  
								display: 'flex',
								flexWrap: 'wrap',
								'& > :not(style)': {
								  m: 1,
								  width: 128,
								  height: 128,
								},
							  }}
						>  
						  <Paper elevation={3} >
							<Stack
							  direction="column"
							  justifyContent="space-between"
							  alignItems="center"
							  spacing={5}
							>
							  <Stack direction="row" spacing={2}>
								<Radio checked={value === 'wallet'} onChange={handleChange} value="wallet"/>
								<Avatar alt="QRIS" src="https://storage.mysooltan.co.id/images/produk/sooltanpay/layanan%20qris.png" sx={{ width: 56, height: 56 }} />
							  </Stack>
							  
							  <Typography align="center">Wallet QRIS</Typography>
							 </Stack>
						  </Paper>
						  
						  <Paper elevation={3} >
							<Stack
							  direction="column"
							  justifyContent="space-between"
							  alignItems="center"
							  spacing={5}
							>
							  <Stack direction="row" spacing={2}>
								<Radio checked={value === 'cash'} onChange={handleChange} value="cash"/>
								<Avatar alt="QRIS" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSd2k_3Z9T70C5YN1sKAJfySjO8Ck8p-3iCzg&usqp=CAU" sx={{ width: 56, height: 56 }} />
							  </Stack>
							  <Typography align="center">Cash</Typography>
							</Stack>
						  </Paper>
						</Box>
						
						
					  </Grid>
					  
					</Grid>
					
					
				</DialogContent>
				<DialogActions>
					<Button variant="outlined" onClick={()=> setOpenPaymentPos(false)}>Close</Button>
					<Button color="success" variant="contained" type="submit">Submit</Button>
				</DialogActions>
				</Box>
			</Dialog>
			
			
			
			<Dialog
				open={open_qr_payment}
				onClose={()=> setOpenQrPayment(false)}
				TransitionComponent={Transition}
				 maxWidth='md'
				aria-describedby="alert-dialog-slide-description"
			  >
				<DialogTitle>QR Payment </DialogTitle>
				<Box component="form" onSubmit={SimpanDataPaymentPos}  sx={{ mt: 1 }}>
				<DialogContent dividers>
						
					<Grid container spacing={1}  >
					  
					  
					  <Grid item xs={12} >
						<Box
							  sx={{
								justifyContent: 'center',  
								display: 'flex',
								flexWrap: 'wrap',
								'& > :not(style)': {
								  m: 1,
								  width: 128,
								  height: 128,
								},
							  }}
						>  
						<Avatar alt="QRIS" src={"http://node.tatamulia.co.id/include/qrcode/"+detail_qr} sx={{ width: 56, height: 56 }} variant="square" />
						</Box>
						
						
					  </Grid>
					  
					</Grid>
					
					
				</DialogContent>
				<DialogActions>
					<Button variant="outlined" onClick={()=> setOpenQrPayment(false)}>Close</Button>
				</DialogActions>
				</Box>
			</Dialog>
	  </Box>
	  
	  
	  
	</>  
    
  );
}

const mapStateToProps = (state) => {
  const {DataCarts,logindata} = state;
  return {
	DataCarts:DataCarts,
	logindata:logindata,
  };
};
const mapDispatchToProps = (dispatch) => ({
  setDataCart: (value) => dispatch(setDataCart(value)),
  delDataCart: (value) => dispatch(delDataCart(value)),
  RemDataCart: () => dispatch(RemDataCart()),
});
export default connect( mapStateToProps,mapDispatchToProps)(Cart);