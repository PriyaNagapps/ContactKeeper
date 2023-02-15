import { useEffect,useState,useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AlertContext from '../../context/alert/alertContext';
import {useAuth,clearAuthError, registerAuth,loadUser} from '../../context/auth/authState';
 
const Register = (props) =>{

  const[authState,authDispatch] =useAuth();
  const alertContext = useContext(AlertContext);
  const {setAlert} = alertContext;
  const {isAuthenticated ,error} = authState;

  useEffect((()=>{
    if(error === 'User already exists'){
      setAlert(error,'danger');
      clearAuthError(authDispatch);
    }
  }),[error,isAuthenticated,props.history,authDispatch,setAlert])

  const[user,setUser] = useState({
    name : '',
    email : '',
    password : '',
    password2 : '',
  })
  
  const {name,email, password, password2} = user;

  //Handle changes in input field
  const onChange = (e) =>{
    setUser({...user,[e.target.name]:e.target.value});
  }

  //Handle Login - Form Submit
  const onSubmit = (e) =>{
    e.preventDefault();
    if((name === '' ) || (email === '' )||( password === '') )
    {
      setAlert('Please fill in the required fields','danger');
    }
    else if(password !== password2)
    {
      setAlert('Password do not match','danger');
    }
    else{
      registerAuth(
        { name,
          email,
          password
        },
        authDispatch
      );
    }
  }

  if(isAuthenticated ){
    //load the user after registration
    return <Navigate to='/'/>;
  }
  return(
    <div className='form-container'>
      <h1>Account 
        <span className='text-primary'> Register </span>
      </h1>
      <form onSubmit={onSubmit} >
        <div className='form-group'>
            <label htmlFor='name'>Name</label>
            <input type='text' id='name' name='name' value ={name}
              onChange={onChange}>
            </input>
          </div>
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
        <div className='form-group'>
          <label htmlFor='password2'>Confirm Password</label>
          <input type='password' id='password2' name='password2' value ={password2}
            onChange={onChange}>
          </input>
        </div>
      <input className='btn btn-primary btn-block' 
            type='submit' onSubmit={onSubmit} value='Register' 
      /> 
      </form>
    </div>
  )
};

export default Register;
