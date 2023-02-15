import axios from 'axios';

const SetAuthToken =(token) =>{
  if(token){
    axios.defaults.headers.common['x-auth-token'] = token;
    localStorage.setItem('token',token);
//    console.log("set in header token - ",axios.defaults.headers.common['x-auth-token']);
  }
  else{
    delete axios.defaults.headers.common['x-auth-token'];
    localStorage.removeItem('token');
  }
}

export default SetAuthToken;