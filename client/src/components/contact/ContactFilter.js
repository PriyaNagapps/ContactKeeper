import React from "react";
import { useContacts,filterContacts,clearFilter } from "../../context/contact/contactState";
const ContactFilter =()=>{

  const contactDispatch = useContacts()[1];
  
  const handleChange =(e)=>{
    e.preventDefault();
    if(e.target.value !==''){
      filterContacts(contactDispatch,e.target.value);
    }
    else{
      console.log("clear filter");
      clearFilter(contactDispatch);
    }

  }
  return(
    <div>
      <form onSubmit={(e)=>e.preventDefault()}>
        <input type='text' placeholder="Filter Contacts..." 
              onChange={handleChange}>
        </input>
      </form>
    </div>
  )
}
export default ContactFilter;