import {ADD_DATA_CARTS,DEL_DATA_CARTS,SET_DATA_CARTS,DEL_ALL_DATA_CARTS} from './types';



export const addDataCart = (value) => {
  return (dispatch) => {
    dispatch({
      type: ADD_DATA_CARTS,
      payload: value
    });
  };
};

export const delDataCart = (value) => {
  return (dispatch) => {
    dispatch({
      type: 'DEL_DATA_CARTS',
      payload: value,
    });
  };
};

export const setDataCart = (value) => {
  return (dispatch) => {
    dispatch({
      type: 'SET_DATA_CARTS',
      payload: value,
    });
  };
};

export const RemDataCart = () => {
  return (dispatch) => {
    dispatch({
      type: 'DEL_ALL_DATA_CARTS',
    });
  };
};