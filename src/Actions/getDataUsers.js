import {GET_DATA_USERS, ERROR_DATA_USERS,SET_LOGIN,SET_DATA_USERS} from './types';
import axios from 'axios';

export const getDataUsers = () => async dispatch => {
    try{
        const tokendata = await localStorage.getItem('TokenData')
		const headers_data = {
				Authorization: tokendata,
			}
		var api='https://node.ladokutu.info/index.php/Posc/cek_token';  
		const response = await axios({
				method: 'post',
				headers: headers_data,
				url: api,
			});
        dispatch( {
            type: GET_DATA_USERS,
            payload: response.data
        })
    }
    catch(e){
        dispatch( {
            type: ERROR_DATA_USERS,
            payload: console.log(e),
        })
    }
}

export const setDataLogin = (value) => {
  return (dispatch) => {
    dispatch({
      type: SET_DATA_USERS,
      payload: value
    });
  };
};

export const setLogin = (value) => {
  return (dispatch) => {
    dispatch({
      type: SET_LOGIN,
      payload: value
    });
  };
};



