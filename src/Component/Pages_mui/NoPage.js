import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import { useNavigate,useLocation} from 'react-router-dom'
import Loader from './Tools/Loader';
import { useAuth } from "./Tools/useAuth";
import { connect } from 'react-redux';
import {getDataUsers} from '../../Actions/getDataUsers';

const NoPage = (props) => {
  const navigate = useNavigate();
  const location = useLocation()
  const auth = useAuth();
  
  useEffect(() => {
		CheckData()
		props.getDataUsers();
    },[]); 
  const CheckData = () => {
		auth.then(data => {

			if((data.status === 200 )){
				navigate(location.pathname)
			}else {
				navigate("/")
			}
		})
	}
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <Loader loading={true} />
	 
       
    </Box>
  );
}
const mapStateToProps = (state) => {
  const {usersData} = state;
  return {
    usersData: usersData,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getDataUsers: () => dispatch(getDataUsers()),
});
export default connect(mapStateToProps, mapDispatchToProps)(NoPage);