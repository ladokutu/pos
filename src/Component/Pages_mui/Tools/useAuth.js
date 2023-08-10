import axios from 'axios';
import { useState } from "react";

export const useAuth =  () => {
	
	const [auth, setAuth] = useState( async () => {

		try {
			const tokendata = await localStorage.getItem('TokenData')
			const headers_data = {
				Authorization: tokendata
			}
			var api='https://node.ladokutu.info/index.php/Posc/cek_token';  
			const response = await axios({
				method: 'post',
				headers: headers_data,
				url: api,
				//withCredentials: true,
				
			});
			return response.data
		} catch (e) {
			return e
		}
	});
	return auth
}


 