import * as React from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import {Badge,Tooltip} from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';



import {Notifications,Info} from '@mui/icons-material';
import MoreIcon from '@mui/icons-material/MoreVert';



import { useNavigate  } from 'react-router-dom'
import { connect } from 'react-redux';
import {setDrawer} from '../../../Actions/getDataButton';

/*
import { styled,alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import MailIcon from '@mui/icons-material/Mail';
import AccountCircle from '@mui/icons-material/AccountCircle';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArchiveIcon from '@mui/icons-material/Archive';
import Paper from '@mui/material/Paper';
*/
/*
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
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
*/




function PrimarySearchAppBar(props) {
  //const [value, setValue] = React.useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  //const ref = React.useRef(null);
  //const amount_cart= props.DataCarts.length;
  const navigate = useNavigate();
  const { setDrawer,drawer } = props;
  /*const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  */

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  const handleDrawerOpen = () => {
    setDrawer(true);
	//console.log(drawer)  
  };
  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      
      <Tooltip title="Show Transaction">
      <MenuItem onClick={ ()=>navigate("/TransactionRecent" )}>
        <IconButton 
            size="large"
            aria-label="show Cart"
            color="inherit"
        >
            <Badge  color="error">
				<Notifications />
            </Badge>
        </IconButton>
        <p>Notification</p>
      </MenuItem>
	  </Tooltip>
	  
	  <Tooltip title="About">
      <MenuItem onClick={ ()=>navigate("/About" )}>
        <IconButton 
            size="large"
            aria-label="show Cart"
            color="inherit"
        >
            <Badge  color="error">
				<Info />
            </Badge>
        </IconButton>
        <p>Info</p>
      </MenuItem>
	  </Tooltip>
	  
    </Menu>
  );

  return (
	
    <Box sx={{ flexGrow: 1,m:9  }}>
      <AppBar position="fixed" >
        <Toolbar>
		  <IconButton onClick={handleDrawerOpen}
			edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            POS System
          </Typography>
          
          <Box sx={{ flexGrow: 1, }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Tooltip title="Show Transaction">
            <IconButton onClick={ ()=>navigate("/TransactionRecent" )}
              size="large"
              aria-label="Show Cart"
              color="inherit"
			  
            >
              <Badge  color="error">
                <Notifications />
              </Badge>
            </IconButton>
			</Tooltip>
            <Tooltip title="About">
            <IconButton onClick={ ()=>navigate("/About" )}
              size="large"
              aria-label="About"
              color="inherit"
            >
              <Badge  color="error">
                <Info />
              </Badge>
            </IconButton>
			</Tooltip>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
			
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
			
          </Box>
        </Toolbar>
      </AppBar>
	  {renderMobileMenu}
      {renderMenu}
      
    </Box>
  );
}
const mapStateToProps = (state) => {
  const {DataCarts,drawer} = state;
  return {
	DataCarts:DataCarts,
	drawer:drawer
  };
};
const mapDispatchToProps = (dispatch) => ({
  setDrawer: (value) => dispatch(setDrawer(value)),
});
export default connect(mapStateToProps, mapDispatchToProps)(PrimarySearchAppBar);