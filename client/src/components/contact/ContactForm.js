import React, { useEffect, useState } from "react";
import { addContact, clearCurrent, updateContact, useContacts } from "../../context/contact/contactState";

const intialContact = {
  name:'',
  email:'',
  phone:'',
  contacttype:'Personal'
}

const ContactForm =()=>{

  const[contactState,contactDispatch] = useContacts();
  const {Current} = contactState;

  const[Contact,setContact] = useState(intialContact);

  useEffect(()=>{
    if(Current !==null){
      setContact(Current);
    }
    else{
      setContact(intialContact);
    }
  },[Current])

  const {name, email, phone, contacttype} = Contact;

  const handleChange = (e)=>{
      setContact({...Contact, [e.target.name] : e.target.value});
  }

  const handleSubmit =(e)=>{
    e.preventDefault();
    
    if(Current !== null){
      updateContact(contactDispatch,Contact);
    }
    else{
      addContact(contactDispatch,Contact);
      setContact(intialContact);
    }
    clearAll();
  }

  const clearAll =()=>{
    clearCurrent(contactDispatch);
  }

  return(  
    <form onSubmit={handleSubmit}>
      <h2 className='text-primary'>
        { Current === null ?"Add Contact" : "Edit Contact"}
      </h2>
      <input type='text' name ='name' placeholder="Enter Name" 
        value={name} onChange ={handleChange}
      />
      <input type='text' name ='email' placeholder="Email" 
        value={email} onChange ={handleChange}
      />
      <input type='text' name ='phone' placeholder="Enter phone number"
        value={phone} onChange ={handleChange}
      />
      <input type='radio' name ='contacttype'  value='personal' 
        checked ={contacttype ==='personal'} onChange ={handleChange} 
      />{''}      
      personal{' '}
      <input type='radio' name ='contacttype'  value='professional'
        checked ={contacttype ==='professional'} onChange ={handleChange}
      />{''}
      professional
      <div>
        <button  className='btn btn-primary btn-block' onClick={handleSubmit}>
          {Current === null ? 'Submit' : 'Update' }
        </button>
      </div>
      {Current && (
        <div>
          <button className='btn btn-light btn-block' onClick={clearAll}>
            Clear
          </button>
        </div>
      )}
    </form>
  );
}
export default ContactForm;