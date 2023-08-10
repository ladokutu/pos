import React,{ useState,useEffect } from 'react'
import { styled } from '@mui/material/styles';
import {Card,Grid,Box,CssBaseline,Tooltip,Link } from '@mui/material';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import {Star,Favorite,Share,ShoppingCart} from '@mui/icons-material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios';
import { useNavigate  } from 'react-router-dom'
import Loader from '../Tools/Loader';

export default function DashboardMerchant() {
  const [merchant, setDataMerchant] = useState([]);
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const ref = React.useRef(null);
  const gotoshopping = (id_merchant) => {
    console.log('Lets shoping on ',id_merchant)
	navigate("/ItemMerchant",{state: {id_merchant: id_merchant}} )
  };
  useEffect(() => {
		GetData()
    },[]);
  const GetData = async () => {
		try {
			setLoading(true)
			var api='https://node.ladokutu.info/index.php/Posc/data_merchant';  
			const response = await axios({
				method: 'post',
				url: api,
			});
			
			setDataMerchant(response.data)
			setLoading(false)
		} catch (e) {
			setLoading(false)
			console.log(e)
		}
	}
	
  return (
  
	<>
		<Loader loading={loading} />
		<Box sx={{ pb: 7 }} ref={ref}>
		<CssBaseline />
	
		<Grid
			  container
			  spacing={0}
			  direction={{ xs: 'column', md: 'row' }}
			  justifyContent={{ xs: 'center', md: 'flex-start' }}
			  alignItems={{ xs: 'center', md: 'flex-start' }}
			>
		{ merchant.map((item,index) =>( 
	  
		<Grid item xs={6}>
			<Card sx={{ maxWidth: 600,m:1 }} >
			  <CardMedia
				component="img"
				height="180"
				sx={{ padding: "1em 1em 0 1em", objectFit: "contain" }}
				image={item.profile_picture}
				alt="Paella dish"
			  />
			  <CardHeader
				title={item.merchant_name}
				subheader={"Address: "+item.address}
			  />
			  <CardContent>
				<Typography sx={{ mb: 1.5 }} color="text.secondary">
					Phone : {item.contact_phone}
				  </Typography>
				<Typography sx={{ mb: 1.5 }} color="text.secondary">
					E-Mail : <Link href={"mailto:"+item.contact_mail}>{item.contact_mail}</Link>
				</Typography>
				<Typography variant="body2" color="text.secondary">
				  {item.description}
				</Typography>
			  </CardContent>
			  <CardActions disableSpacing>
				<IconButton aria-label="add to favorites">
				  <Star />
				</IconButton>
				
				<Tooltip title={"Shopping to "+item.merchant_name}>
					<IconButton sx={{  marginLeft: 'auto' }} 
					  onClick={()=>gotoshopping(item.id_merchant)}
					  aria-label="Let's Shopping"
					>
					  <ShoppingCart fontSize="large" />
					</IconButton>
				</Tooltip>
			  </CardActions>
			  
			</Card>
		</Grid>
			
		))}
	  
	</Grid>
		
	</Box>
	</>
  );
}