import React,{ useEffect } from 'react'
import {  Grid} from '@mui/material';
import { connect } from 'react-redux';
import {getDataUsers} from '../../../Actions/getDataUsers';

import Card_Three from './Card_Three';
import Card_Two from './Card_Two';
import Card_Calendar from './Card_Calendar';

const Content = (props) => {
 
  useEffect(() => {
		props.getDataUsers();
	},[]);
 
  return (
	<Grid container spacing={1}>
		
		<Grid item xs={8} md={8}>
			<Card_Two/>
		</Grid>
		
		
		
		<Grid item xs={4} md={4}>
			<Card_Calendar/>
		</Grid>
		
		<Grid item xs={12} md={12}>
			<Card_Three/>
		</Grid>
	</Grid>
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
export default connect(mapStateToProps, mapDispatchToProps)(Content);