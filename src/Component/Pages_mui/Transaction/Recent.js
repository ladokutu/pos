import React,{ useState,useEffect } from 'react'
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { DataGrid,GridToolbar  } from '@mui/x-data-grid';
import axios from 'axios';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { MoreVert ,Delete,Edit } from '@mui/icons-material';
import {LinearProgress,ListSubheader} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import {Dialog,DialogActions,DialogTitle,DialogContent,Grid,Menu,MenuItem,IconButton,ListItemIcon,Divider,TextField,CssBaseline } from '@mui/material';
import Slide from '@mui/material/Slide';
import Loader from '../Tools/Loader';
import Alerts from '../Tools/Alerts';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import { numberFormat } from "../Tools/FormatNumber";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));
export default function DataTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [openedit, setOpenedit] = useState(false)
  const [pageSize, setPageSize] = useState(10);
  const [value, setValue] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const openbol = Boolean(anchorEl);
  const [alerto, setAlerto] = useState('');
  const [userphone, setUserPhone] = useState('');
  const [detail, setDetail] = useState('');
  const ref = React.useRef(null);
  
	useEffect(() => {
		GetData()
    },[]);
	const GetData = async () => {
		try {
			setLoading(true)
			const user_email = await localStorage.getItem('user_email')
			const user_phone = await localStorage.getItem('user_phone')
			
			const data_body = {
				"user_email": user_email,
				"user_phone": user_phone,
			}
			var api='https://node.ladokutu.info/index.php/Posc/data_recent_transaction';  
			const response = await axios({
				method: 'post',
				data: data_body,
				url: api,
			});
			console.log(response.data)
			setData(response.data)
			setLoading(false)
		} catch (e) {
			console.log(e)
		}
	}
	const handleCloseAlerto = () => {
		setAlerto(false);
	  };
	const search_data = async () => {
		await localStorage.setItem('user_phone', userphone)
		GetData()
	};
	
  return (
    <>
	   <Box sx={{ pb: 7 }} ref={ref}>	
	   <CssBaseline />
	   
			<Grid container
			  spacing={0}
			  direction={{ xs: 'column', md: 'row' }}
			  justifyContent={{ xs: 'flex-end', md: 'flex-end' }}
			  alignItems={{ xs: 'flex-end', md: 'flex-end' }}>
				<Search  onClick={search_data}>
					<SearchIconWrapper >
						<SearchIcon />
					</SearchIconWrapper>
					<StyledInputBase
					  placeholder="Search By Phone"
					  inputProps={{ 'aria-label': 'search' }}
					  name="user_phone" id="user_phone" label="End Time"
					  onChange={(e)=> setUserPhone(e.target.value)}
					/>
				</Search>
			</Grid>
	   
		   <List>
			{data.map((item, index) => (
			  <ListItem button key={index}>
				<ListItemAvatar>
				  <Avatar alt={item.payment_name} src={item.payment_name} />
				</ListItemAvatar>
				<ListItemText primary={numberFormat(item.total_amount)+" "+item.payment_name} secondary={item.status_name} />
				<ListSubheader >{item.createdate}</ListSubheader>
				
			  </ListItem>
			))}
		  </List>
		</Box>
	  
	</>  
    
  );
}
