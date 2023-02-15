import React,{useReducer} from 'react';
import { SET_ALERT,REMOVE_ALERT } from '../types';
import AlertContext from './alertContext';
import AlertReducer from './alertReducer';
import { v4 as uuidv4 } from 'uuid';


const AlertState = (props) => {

  const intialState = [];
    
  const [state,dispatch] =useReducer(AlertReducer,intialState);

  const setAlert =(msg,type,timeout=5000)=>{
    const alertID = uuidv4();
    dispatch({
      type : SET_ALERT,
      payload: {msg, type, alertID}
    });

    setTimeout(()=>{
      dispatch({
      type : REMOVE_ALERT,
      payload: alertID
      });
    },timeout )
  }
  return(
  <AlertContext.Provider value={{alerts:state,setAlert}}>
    {props.children}
  </AlertContext.Provider>
  );
};
export default AlertState;
