import React,{ useState,useEffect } from 'react'

import { Avatar,Button, Card, CardContent, CardActions,IconButton,CardHeader, Typography,Collapse } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { red } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import { connect } from 'react-redux';
import {getDataUsers} from '../../../Actions/getDataUsers';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));


const Card_Two = (props) => {
  const [expanded, setExpanded] = useState(false);
  const { usersData } = props;
  
  useEffect(() => {
		props.getDataUsers();
	},[]);
 
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card {...props}>
		<CardHeader
			avatar={
					  <Avatar sx={{ width: 120, height: 120,bgcolor: red[500] }} aria-label="avatar"  src={usersData.detail.photo} /> 
			}
			action={
				<IconButton aria-label="settings">
					<MoreVertIcon />
				</IconButton>
			}	
			title={"Hello, "+usersData.detail.full_name}
			subheader={usersData.detail.nama_company}
		/>
		<CardContent>
			<Typography inline>ID : {usersData.detail.id_employee}</Typography>
			<Typography inline>Name : {usersData.detail.full_name}</Typography>
			<Typography inline>Position : {usersData.detail.position_name}</Typography>
			<Typography inline>Department : {usersData.detail.department}</Typography>
			<Typography inline>Division : {usersData.detail.divisi}</Typography>
			<Typography inline>Company : {usersData.detail.nama_company}</Typography>
		</CardContent>
		<CardActions disableSpacing>
			<Button size="small" color="primary">
				More Details
			</Button>
			<ExpandMore
				expand={expanded}
				onClick={handleExpandClick}
				aria-expanded={expanded}
				aria-label="show more"
			>
				  <ExpandMoreIcon />
			</ExpandMore>
		</CardActions>
			<Collapse in={expanded} timeout="auto" unmountOnExit>
				<CardContent>
				  <Typography inline>E-Mail : {usersData.detail.user_email}</Typography>
				  <Typography inline>Balance</Typography>
				</CardContent>
			</Collapse>
    </Card>
  );
};

const mapStateToProps = (state) => {
  const {usersData} = state;
  return {
    usersData: usersData,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getDataUsers: () => dispatch(getDataUsers()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Card_Two);