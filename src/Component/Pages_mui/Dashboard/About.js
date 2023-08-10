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

export default function About() {
  const [merchant, setDataMerchant] = useState([]);
  
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
			var api='https://node.ladokutu.info/index.php/Posc/data_merchant';  
			const response = await axios({
				method: 'post',
				url: api,
			});
			
			setDataMerchant(response.data)
			
		} catch (e) {
			console.log(e)
		}
	}
	
  return (
  
	<>
	
		<Box sx={{ pb: 7 }} ref={ref}>
		<CssBaseline />
	
		<Grid
			  container
			  spacing={0} 
			  direction={{ xs: 'column', md: 'row' }}
			  justifyContent={{ xs: 'center', md: 'center' }}
			  alignItems={{ xs: 'center', md: 'center' }}
			>
		<Grid item xs={8}>
			<Card sx={{ maxWidth: 800,m:1 }}>
			  <CardMedia
				component="img"
				height="180"
				sx={{ padding: "1em 1em 0 1em", objectFit: "contain" }}
				image="https://lh3.googleusercontent.com/06B5dK0owtjT3UGVT4icmVU1OwwnsTdN8EnaHU17sWehlRAibrIHzVGb_oGc7sgrlNnn"
				alt="Paella dish"
			  />
			  <CardHeader
				title={"Ladokutu Info"}
				subheader={"Address: Sapta Mulia Center; Jl. Rawa Gelam V Kav.OR-3B Kawasan Industri Pulogadung; Jakarta 13930 "}
			  />
			  <CardContent>
				<Typography sx={{ mb: 1.5 }} color="text.secondary">
					Phone : {"6285156577357"}
				  </Typography>
				<Typography sx={{ mb: 1.5 }} color="text.secondary">
					E-Mail : <Link href={"mailto:support@ladokutu.info"}>support@ladokutu.info</Link>
				</Typography>
				<Typography variant="body2" color="text.secondary">
				  {""}
				</Typography>
			  </CardContent>
			  <CardActions disableSpacing>
				<IconButton aria-label="add to favorites" >
				  <Link href="https://ladokutu.info/privacy.html">Privacy Policies</Link>
				</IconButton>
				<IconButton aria-label="add to favorites">
				  <Link href="https://ladokutu.info/term.html"> Term Of Use</Link>
				 
				</IconButton>
				
			  </CardActions>
			  
			</Card>
		</Grid>
			
		
	  
	</Grid>
		
	</Box>
	</>
  );
}