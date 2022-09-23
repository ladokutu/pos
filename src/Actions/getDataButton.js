import {SET_DRAWER} from './types';

export const setDrawer = (value) => {
  return (dispatch) => {
    dispatch({
      type: SET_DRAWER,
      payload: value
    });
  };
};



