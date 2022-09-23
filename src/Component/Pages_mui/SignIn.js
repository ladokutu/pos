import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loader from './Tools/Loader';
import Alerts from './Tools/Alerts';
import { connect } from 'react-redux';
import {getDataUsers,setLogin,setDataLogin} from '../../Actions/getDataUsers';


const theme = createTheme();

const SignIn = (props) => { 
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [alerto, setAlerto] = useState('');
	
	const handleSubmit = async (event) => {
		setLoading(true)
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		let email = data.get('email')
		let password = data.get('password')
		
		/*console.log({
		  email: email,
		  password: password,
		});
		*/
	
		try { 
            var api='https://panen.ladokutu.info/index.php/Posc/login_data';  
            const data = { 
                    'user_email': email,
					'user_password': password
                }
			const response = await axios({
                  method: 'post',
                  url: api,
                  data: data,
				 // withCredentials: true
				});
			//console.log(response.data)
			if (response.data.status === 200 ) {
				props.setLogin(true)
				
				setAlerto({
				  alerto: true,
				  state_msg: response.data.message,
				  state_typ:'success'
				});
				await localStorage.setItem('TokenData', response.data.token)
				props.setDataLogin(response.data)
				setLoading(false)
				navigate("/ds/home")
			}else{
				
				setAlerto({
				  alerto: true,
				  state_msg: response.data.message,
				  state_typ:'error'
				});
				
				setLoading(false)
			}
        } catch (error) {
			
			setAlerto({
				  alerto: true,
				  state_msg: 'Data Error',
				  state_typ:'error'
				});
			setLoading(false)
            console.log(error)
			
        }
	
  };
  const handleCloseAlerto = () => {
    setAlerto(false);
  };
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
		<Alerts  alerto={alerto.alerto} state_typ={alerto.state_typ} state_msg={alerto.state_msg} onClose={handleCloseAlerto} />
        <Loader loading={loading} />
		<Card xs={12}>
				<Box sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				  }}
				>
				  
				  <Avatar sx={{ m: 1 }} src="https://play-lh.googleusercontent.com/7n86QnflUFEfo6W0k_VjnGOeXScHo9lRgCXaJ9yA3WWyZ9E6hIYdX_AJQ5OUJ03VevIL=w240-h480-rw" />
				  <Typography component="h1" variant="h5">
					Sign in
				  </Typography>
				  
				  <CardContent>
				  <Box component="form" onSubmit={handleSubmit}  sx={{ mt: 1 }}>
					<TextField
					  margin="normal"
					  required
					  fullWidth
					  id="email"
					  label="Email Address"
					  name="email"
					  autoComplete="email"
					  autoFocus
					/>
					<TextField
					  margin="normal"
					  required
					  fullWidth
					  name="password"
					  label="Password"
					  type="password"
					  id="password"
					  autoComplete="current-password"
					/>
					<FormControlLabel
					  control={<Checkbox value="remember" color="primary" />}
					  label="Remember me"
					/>
					<Button
					  type="submit"
					  fullWidth
					  variant="contained"
					  sx={{ mt: 3, mb: 2 }}
					>
					  Sign In
					</Button>
					<Grid container>
					  <Grid item xs>
						<Link href="#" variant="body2">
						  Forgot password?
						</Link>
					  </Grid>
					  
					</Grid>
				  </Box>
				  </CardContent>
				</Box>
		</Card>
       
      </Container>
    </ThemeProvider>
  );
}

const mapStateToProps = (state) => {
  const {usersData,logindata} = state;
  return {
    usersData: usersData,
	logindata:logindata,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getDataUsers: () => dispatch(getDataUsers()),
  setLogin: (value) => dispatch(setLogin(value)),
  setDataLogin: (value) => dispatch(setDataLogin(value)),
});
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);