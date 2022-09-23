import * as React from 'react';
import { styled,makeStyles } from '@mui/material/styles';
import {Box,Paper,BottomNavigation,BottomNavigationAction,Badge,IconButton} from '@mui/material';
import Typography from '@mui/material/Typography';
import CartIcon from "@mui/icons-material/ShoppingCart";
import {Home,Restore,ShoppingCartCheckout,Info} from '@mui/icons-material';
import { useNavigate,Link  } from 'react-router-dom'
import { connect } from 'react-redux';


function Footer(props) {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();
  const amount_cart= props.DataCarts.length;
  
  
  return (
    <Box  sx={{ position: 'fixed',bottom: 0,  left: 0, right: 0}}>
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation 
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction component={Link} to="/" label="Home" icon={<Home />}  />
		  <BottomNavigationAction component={Link} to="/TransactionCart" label="Cart" color="secondary"
			icon={<Badge badgeContent={amount_cart} color="error"><ShoppingCartCheckout /></Badge>}  
		  />
		  <BottomNavigationAction component={Link} to="/TransactionRecent" label="Transaction" icon={<Restore />} />
		 
          
        </BottomNavigation>
      </Paper>
    </Box >
  );
}

const mapStateToProps = (state) => {
  const {DataCarts} = state;
  return {
	DataCarts:DataCarts
  };
};
export default connect( mapStateToProps)(Footer);