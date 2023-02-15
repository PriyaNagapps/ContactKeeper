import React,{useContext,useReducer} from 'react';
import ContactContext from './contactContext';
import ContactReducer from './contactReducer'
import axios from 'axios';
import {
  GET_CONTACTS,
  ADD_CONTACT,
  DELETE_CONTACT, 
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_CONTACTS,
  CLEAR_FILTER,
  CONTACT_ERROR
} from '../types';

export const useContacts = () =>{
  const {state ,dispatch} = useContext(ContactContext);
  return [state,dispatch];
}

//Get Contacts for authenticated user from database
export const getContacts = async(dispatch)=>{
  
  try {
    const res = await axios.get('/api/contacts');
    dispatch({
      type:GET_CONTACTS,
      payload:res.data
    });   
  } catch (err) {
      dispatch({
        type:CONTACT_ERROR,
        payload:err.response.msg
      });    
  }
 
}
//Add contact to database and update state
export const addContact = async (dispatch,contact) =>{
  try {
    const config ={
      headers : {
        'Content-Type' : 'application/json'
      }
    }
    const res = await axios.post('/api/contacts',contact,config);
    dispatch({
      type:ADD_CONTACT,
      payload:res.data
    });

  } catch (err) {
      dispatch({
        type:CONTACT_ERROR,
        payload:err.response.msg
      });  
  }
}

export const updateContact = async (dispatch,contact) =>{
  try {
    const config ={
      headers : {
        'Content-Type' : 'application/json'
      }
    }
    const res = await axios.put(`/api/contacts/${contact._id}`,contact,config);
    dispatch({
      type:UPDATE_CONTACT,
      payload:res.data
    });    
  } catch (err) {
      dispatch({
        type:CONTACT_ERROR,
        payload:err.response.msg
      });   
  }
}

export const setCurrent = (dispatch,contact) =>{
  dispatch({
              type:SET_CURRENT,
              payload:contact
          });
}

export const clearCurrent = (dispatch) =>{
  dispatch({
              type:CLEAR_CURRENT
          });
}

export const deleteContact = async (dispatch,contact) =>{
  try {
    await axios.delete(`/api/contacts/${contact._id}`);
    dispatch({
      type:DELETE_CONTACT,
      payload:contact
    });
  
  } catch (err) {
      dispatch({
        type:CONTACT_ERROR,
        payload:err.response.msg
      });     
  }
}

export const filterContacts = (dispatch,text) =>{
  dispatch({
    type : FILTER_CONTACTS,
    payload : text
  });
}

export const clearFilter = (dispatch,text) =>{
  dispatch({
    type : CLEAR_FILTER
  });
}

export const clearContacts = (dispatch) =>{
  dispatch({
    type : CLEAR_CONTACTS
  });
}


export const contactError = (dispatch,error) =>{
  dispatch({
    type : CONTACT_ERROR,
    payload : error
  });
}

const ContactState = (props) => {

  const intialState = {
    Contacts : null,
    Current : null,
    Filtered : null,
    error :null
  };
const [state,dispatch] =useReducer(ContactReducer,intialState);
return(
  <ContactContext.Provider value={{state:state,dispatch}}>
    {props.children}
  </ContactContext.Provider>
);
};
export default ContactState;
