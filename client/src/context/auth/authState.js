import React,{useContext,useEffect,useReducer} from 'react';
import AuthContext from './authContext';
import AuthReducer from './authReducer';
import axios from 'axios';
import SetAuthToken from '../../utils/setauthtoken';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS
} from '../types';
 
export const useAuth = () =>{
  const {state ,dispatch} = useContext(AuthContext);
  return [state,dispatch];
}

//Load user details
export const loadUser = async (dispatch) =>{
  try {
    const res = await axios.get('/api/auth');
    dispatch({
      type : USER_LOADED,
      payload : res.data
    });
    
  } catch (err) {

      dispatch({
        type : AUTH_ERROR,
        payload : err.response.data.msg
      });     
  }
}

// Register new user 
export const registerAuth = async(formdata,dispatch) =>{
  try {
    const res = await axios.post('/api/users',formdata);

    dispatch({
      type : REGISTER_SUCCESS,
      payload : res.data
    });

  } catch (err) {
    dispatch({
      type : REGISTER_FAIL,
      payload : err.response.data.msg
    });  
  }
}

// Register new user 
export const loginAuth = async(formdata,dispatch) =>{
  try {
    const res = await axios.post('/api/auth',formdata);

    dispatch({
      type : LOGIN_SUCCESS,
      payload : res.data
    });

    //load the user after registration
//    loadUser(dispatch);

  } catch (err) {
    dispatch({
      type : LOGIN_FAIL,
      payload : err.response.data.msg
    });  
  }
}

//Logout User
export const logoutAuth = (dispatch) => {
  dispatch({
    type : LOGOUT,
  });  
}
export const authError = (dispatch,error) =>{
  dispatch({
    type : AUTH_ERROR,
    payload : error
  });
}
export const clearAuthError = (dispatch) =>{
  dispatch({
    type : CLEAR_ERRORS,
  });
}

const AuthState = (props) => {

  const intialState = {
    token : localStorage.getItem ('token'),
    isAuthenticated : (localStorage.getItem ('token') ? true:null),
    user : null,
    loading : true,
    error :null
  };
const [state,dispatch] =useReducer(AuthReducer,intialState);

//set token while loading app
SetAuthToken(state.token)

//load user when app is starting
if(state.loading && state.token){
  //console.log("loading user firsttime");
  loadUser(dispatch);
}
/*validate state.token frequently and
  update state,headers and localstorage accordingly */
  
useEffect(()=>{
  SetAuthToken(state.token)
  if(state.token){
    loadUser(dispatch);
  }
},[state.token]);

return(
  <AuthContext.Provider value={{state:state,dispatch}}>
    {props.children}
  </AuthContext.Provider>
);
};
export default AuthState;
