import { useEffect,useState,useContext } from 'react';
import AlertContext from '../../context/alert/alertContext';
import {useAuth,loginAuth,clearAuthError} from '../../context/auth/authState';
import { Navigate } from 'react-router-dom';
 
const Login = () =>{

  const[authState,authDispatch] =useAuth();
  const alertContext = useContext(AlertContext);
  const {setAlert} = alertContext;
  const {isAuthenticated ,error} = authState;


  useEffect((()=>{
    if(error === 'Invalid Credentials'){
      setAlert(error,'danger');
      clearAuthError(authDispatch);
    }
  }),[error,isAuthenticated,authDispatch,setAlert])

  const[user,setUser] = useState({
    email : '',
    password : ''
  })
  
  const {email, password} = user;

  //Handle changes in input field
  const onChange = (e) =>{
    setUser({...user,[e.target.name]:e.target.value});
  }

  //Handle Login - Form Submit
  const onSubmit = (e) =>{
    e.preventDefault();
    if((email === '' )||( password === '') )
    {
      setAlert('Please fill in the required fields','danger');
    }
    else{
      loginAuth(
        {
          email,
          password
        },
        authDispatch
      );
    }
  }
  //Navigate to home page after login
  if(isAuthenticated){
    return <Navigate to='/'/>;
  }

  return(
    <div className='form-container'>
      <h1>Account 
        <span className='text-primary'> Login</span>
      </h1>
      <form onSubmit={onSubmit} >
        <div className='form-group'>
          <label htmlFor='email'>Email Address</label>
          <input type='email' id='email' name='email' value ={email}
            onChange={onChange}>
          </input>
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input type='password' id='password' name='password' value ={password}
            onChange={onChange}>
          </input>
        </div>
      <input className='btn btn-primary btn-block' 
            type='submit' onSubmit={onSubmit} value='Login' 
      /> 
      </form>
    </div>
  )
};

export default Login;
