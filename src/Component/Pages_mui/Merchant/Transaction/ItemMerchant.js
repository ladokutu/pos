import React,{ useState,useEffect } from 'react'
import { styled,theme,alpha } from '@mui/material/styles';
import {Card,Grid,Tooltip,Stack} from '@mui/material';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import {Collapse,CssBaseline,List,Badge,InputBase} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import {Star,Favorite,LocalOffer,AddShoppingCart,ShoppingCartCheckout} from '@mui/icons-material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios';
import Box from '@mui/material/Box';
import { useLocation } from "react-router-dom";
import { numberFormat } from "../../Tools/FormatNumber";
import { connect } from 'react-redux';
import SearchIcon from '@mui/icons-material/Search';
import {addDataCart} from '../../../../Actions/DataCart';
import Loader from '../../Tools/Loader';


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

const MerchantItem = (props) => {
  const [loading, setLoading] = useState(false)
  const [itemmerchant, setDataItemMerchant] = useState([]);
  const [data, setData] = useState([]);
  const location = useLocation();
  const [searchText, setSearchText] = useState("");
  const ref = React.useRef(null);
  const excludeColumns = ["id", "id_merchant","id_item"];
  //const id_merchant = "MC-0001";
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
			var api='https://node.tatamulia.co.id/index.php/Posc/data_item_merchant_pos';  
			const response = await axios({
				method: 'post',
				url: api,
				headers: headers_data,
			});
			
			setDataItemMerchant(response.data)
			setLoading(false)
			setData(response.data)
		} catch (e) {
			console.log(e)
		}
	}
	const addshoopingcart = async (id_item,id_merchant) => {
		try {
			console.log('Add Item',id_item,id_merchant)
			var api='https://node.tatamulia.co.id/index.php/Posc/data_detail_item_merchant';  
			const response = await axios({
				method: 'post',
				url: api,
				data: {id_item:id_item,id_merchant : id_merchant }
				//data: {id_item:id_item,id_merchant : id_merchant }
			});
			props.addDataCart(response.data)
			console.log(response.data)
			
		} catch (e) {
			console.log(e)
		}
		
	};
	const handleChange = value => {
		setSearchText(value);
		filterData(value);
	  };
	const filterData = (value) => {
		const lowercasedValue = value.toLowerCase().trim();
		//console.log(lowercasedValue)
		//const result = lowercasedValue ? lowercasedValue.toString() : '';
		if (lowercasedValue === ""){
			setData(itemmerchant);
		}else {
		  const filteredData = itemmerchant.filter(item => {
			return Object.keys(item).some(key =>{
			  const items = item[key] ? item[key].toString() : '';
			  return excludeColumns.includes(key) ? false : items.toLowerCase().includes(lowercasedValue)
			});
		  });
		  setData(filteredData);
		}
	  }
  return (
	<>
		<Loader loading={loading} />
		<Box sx={{ pb: 7 }} ref={ref}>
		<CssBaseline />
			<Grid container
			  spacing={0}
			  direction={{ xs: 'column', md: 'row' }}
			  justifyContent={{ xs: 'flex-end', md: 'flex-end' }}
			  alignItems={{ xs: 'flex-end', md: 'flex-end' }}>
				<Search  >
					<SearchIconWrapper >
						<SearchIcon />
					</SearchIconWrapper>
					<StyledInputBase
					  placeholder="Search Item"
					  inputProps={{ 'aria-label': 'search' }}
					  name="user_phone" id="user_phone" label="End Time"
					  onChange={(e)=> handleChange(e.target.value)}
					/>
				</Search>
			</Grid>
			<Grid
			  container
			  spacing={0}
			  direction={{ xs: 'column', md: 'row' }}
			  justifyContent={{ xs: 'center', md: 'flex-start' }}
			  alignItems={{ xs: 'center', md: 'flex-start' }}
			>
			{ data.map((item,index) =>( 
		  
			<Grid item xs={3}>
				<Card sx={{ maxWidth: 400,m:1 }}>
				  <CardMedia 
					component="img"
					height="150"
					image={item.picture}
					alt={item.item_name}
					sx={{ padding: "1em 1em 0 1em", objectFit: "contain" }}
				  />
				  <CardHeader
					
					title={item.item_name}
					subheader={item.merchant_type}
				  />
				  <CardContent>
					<Typography variant="body2" color="text.secondary">
					  {item.description}
					</Typography>
				  </CardContent>
				  <CardActions disableSpacing >
					<Tooltip title="Add to Cart">
						<IconButton aria-label="share" onClick={()=>addshoopingcart(item.id_item,item.id_merchant)}>
						  
							<AddShoppingCart />
						 
						</IconButton>
					</Tooltip>
					<IconButton sx={{  marginLeft: 'auto' }}
					  
					  aria-label="Let's Shopping"
					>
					  <LocalOffer />  {numberFormat(item.final_price)}
					 
					</IconButton>
				  </CardActions>
				  
				</Card>
			</Grid>
				
			))}
		  
		</Grid>
		
	</Box>
	</>
  );
}
const mapStateToProps = (state) => {
  const {DataCarts} = state;
  return {
	DataCarts:DataCarts
  };
};

const mapDispatchToProps = (dispatch) => ({
 
  addDataCart: (value) => dispatch(addDataCart(value)),
});
export default connect(mapStateToProps, mapDispatchToProps)(MerchantItem);