import  React,{useEffect} from 'react';
import { Home,Restore,ShoppingCartCheckout,ShoppingCart,Logout,LocalMall,Storefront,Store,Category,Inventory,LocationCity,Padding,Tune,PersonPinCircle,RunCircle,Reorder,PlaylistAddCheck,PlaylistAdd,MonetizationOn,PersonSearch,Person,Badge,ContactPage,Business,AccountBox,InsertInvitation,CalendarMonth,EventAvailable ,ExpandLess ,ExpandMore} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux';
import {setDrawer} from '../../../Actions/getDataButton';
import { Avatar,List,Box,Drawer,ListItemIcon,ListItemText,ListItemButton,ListItem,Divider   } from '@mui/material';
import Collapse from '@mui/material/Collapse';
import ModalTimeout from "./ModalTimeout";
import { styled, alpha,makeStylesmakeStyles } from '@mui/material/styles';


const TemporaryDrawer = (props) => {
  
  const { setDrawer,drawer,logindata } = props;
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [sidebar, setSidebar] = React.useState([]);
  
  useEffect(() => {
		if(props.logindata){
			setSidebar(sidebar_login)
		}else{
			setSidebar(sidebar_nologin)
		}
    },[]); 
  
  const handleDrawerClose = () => {
    setDrawer(false);
  };
  
	const sidebar_nologin = [
	  { name: 'Home', icon : <Home/> ,link: '/', id: 1 ,
		child: []
	  },
	  
	  
	  { name: 'Log In As Merchant', icon : <Storefront/> ,link: '/Login', id: 3 ,
		child: []
	  },
	]	
	const sidebar_login = [
	  { name: 'Home', icon : <Home/> ,link: '/', id: 1 ,
		child: []
	  },
	  { name: 'My Merchant', icon : <Storefront/> ,link: '#', id: 2 ,
		child: [
			{ name: 'Kategory', icon : <Category/> ,link: '/CategoryItem', id:21 },
			{ name: 'Items ', icon : <Inventory/> ,link: '/Items', id:22 },
			{ name: 'Profile ', icon : <Store/> ,link: '/Profile', id:23 },
		]
	  },
	  { name: 'Transaction', icon : <ShoppingCartCheckout/> ,link: '#', id: 3 ,
		child: [
			{ name: 'Pos', icon : <ShoppingCart/> ,link: '/PosMerchant', id:31 },
			{ name: 'Online ', icon : <LocalMall/> ,link: '/TransactionOnline', id:32 },
		]
	  },
	   { name: 'Logout', icon : <Logout/> ,link: '/Logout', id: 1 ,
		child: []
	  },
	]
	const handleClick = (items)  => {
		open[items.id]===true ? setOpen({ [items.id]: false }) : setOpen({ [items.id]: true })
	}
	
	//console.log(logindata)
	
   const menu_sidebar=sidebar.map((items,index) =>{
		
		return(
		<>
			<ListItem key={items.id} disablePadding>
				<ListItemButton onClick={ items.child.length===0 ? () => NavTo(items.link) : () => handleClick(items) }  >
					<ListItemIcon>
						{items.icon}
					</ListItemIcon>
					<ListItemText primary={items.name} />
				</ListItemButton>
			</ListItem>
			<Collapse in={open[items.id]} timeout="auto" unmountOnExit>
				<List component="div" disablePadding>
					{items.child.map((item,index) => (
						<ListItem key={item.id} disablePadding>
							<ListItemButton onClick={() => NavTo(item.link)} sx={{ pl: 4 }}>
								<ListItemIcon>
									{item.icon}
								</ListItemIcon>
							<ListItemText primary={item.name} />
							</ListItemButton>
						</ListItem>
					))} 
				</List>
			</Collapse>
		</>
		);
	  }
	)
	
   const NavTo = (link) => {
		navigate(link)
		setDrawer(false)
	}
  
	
  return (
  
    <div>
	<ModalTimeout/>
	<Box sx={{
			marginTop: 10,
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			
		}}>
      
        <React.Fragment key={'left'}>
          
          <Drawer
            anchor='left'
            open={drawer}
            onClose={handleDrawerClose}
			PaperProps={{
				sx: {
				  backgroundColor: "LemonChiffon"
				}
			  }}
			
          >
            <Box
			  sx={{ width: 250  }}
			  role="presentation"
			>
				<List>
					<ListItem  >
						<ListItemIcon>
							<Avatar alt="Aksez" src="https://play-lh.googleusercontent.com/7n86QnflUFEfo6W0k_VjnGOeXScHo9lRgCXaJ9yA3WWyZ9E6hIYdX_AJQ5OUJ03VevIL=w240-h480-rw" />
						</ListItemIcon>
						<ListItemText primary="Ladokutu"/>
					</ListItem>
					<Divider />
					{menu_sidebar} 
				</List>
			</Box>
          </Drawer>
        </React.Fragment>
     
	</Box>
    </div>
  );
}
const mapStateToProps = (state) => {
  const {drawer,logindata} = state;
  return {
	drawer:drawer,
	logindata: logindata
  };
};

const mapDispatchToProps = (dispatch) => ({
  setDrawer: (value) => dispatch(setDrawer(value)),
});
export default connect(mapStateToProps, mapDispatchToProps)(TemporaryDrawer);
//export default TemporaryDrawer