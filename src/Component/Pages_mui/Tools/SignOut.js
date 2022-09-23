import { useEffect,useState} from 'react'
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import CircularProgress from '@mui/material/CircularProgress';
import { setLogin } from '../../../Actions/getDataUsers';

const Logout = (props) => {
	const navigate = useNavigate();
	const [isActive, setActive] = useState(true);
	useEffect(() => {
		Action();
    },[]);  
	
	
	const Action = async () => {
		try {
			await localStorage.removeItem('TokenData')
			props.setLogin(false)
			//console.log('Logout Success')
			alert('Logout Success')
			setActive(false)
			navigate("/")
		} catch (error) {
			console.log(error)
			setActive(false)
		}
    }
	
	return (
        <Box sx={{ flexGrow: 1 }}>
			<Dialog  open={isActive}>
				<DialogContent>
					<CircularProgress/>
				</DialogContent>
			</Dialog>
		</Box>	
    )
}
const mapStateToProps = (state) => {
  const {logindata} = state;
  return {
	logindata: logindata
  };
};

const mapDispatchToProps = (dispatch) => ({
  setLogin: (value) => dispatch(setLogin(value)),
});
export default connect(mapStateToProps,mapDispatchToProps)(Logout);