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

const AuthReducer = (state,action) =>{

  switch (action.type){
    case USER_LOADED:
      return{
        ...state,
        user:action.payload,
        isAuthenticated:true,
        loading:false,
        error:null
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return{
          ...state,
          ...action.payload,
          isAuthenticated:true,
          loading:false,
          error:null
        };
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case AUTH_ERROR:
    case LOGOUT:
      return{
        ...state,
        token:null,
        isAuthenticated:false,
        user : null,
        loading:false,
        error : action.payload
      };
    case CLEAR_ERRORS:
      return{
        ...state,
        error : null
      };

    default:
      return state;
  }
}
export default AuthReducer;