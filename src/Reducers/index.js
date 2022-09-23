const initialState = {
  usersData:[],
  DataCarts:[],
  logindata: false,
  drawer: false,
};

const reducers = (state = initialState, action) => {
  switch (action.type) {
	case 'GET_DATA_USERS':
      return {
            ...state,
            usersData:action.payload,
        }
	case 'SET_DATA_USERS':
      return {
            ...state,
            usersData : action.payload,
        }
	case 'SET_LOGIN':
      return {
            ...state,
            logindata : action.payload,
        }
	case 'SET_DRAWER':
      return {
            ...state,
            drawer : action.payload,
        }
	case 'ADD_DATA_CARTS':
      return Object.assign({}, state, {
        DataCarts: [...state.DataCarts, action.payload],
      });
	case 'DEL_DATA_CARTS':
      let newDataCarts =
        state.DataCarts.filter((PostData) => {
        return action.payload !== PostData;
      });
      return Object.assign({}, state, {
        DataCarts: newDataCarts,
      }); 
	case 'SET_DATA_CARTS':
      let updateDataCarts = state.DataCarts.filter((PostData) => {
		if(PostData.amount>0) {
			return [{...PostData, amount: action.payload }]
		}else{
			return action.payload !== PostData.amount;
		}
				
      });
      return Object.assign({}, state, {
        DataCarts: updateDataCarts,
      });  
	case 'DEL_ALL_DATA_CARTS':
      return {
            ...state,
            DataCarts : [],
        }

	default:
      return state;
  }
};



export default reducers;