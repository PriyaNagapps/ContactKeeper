import React, { Fragment, useEffect } from "react";
import {useContacts,getContacts} from '../../context/contact/contactState';
import ContactItem from './ContactItem';
import Spinner from "../layout/Spinner";

const Contacts =() =>{

  const [contactState,contactDispatch] = useContacts();
  const {Contacts,Filtered} = contactState;

  useEffect(() =>{
    getContacts(contactDispatch);
    //eslint-disable-next-line
  },[]);
  
  if(Contacts !== null && Contacts.length===0){
    return(<h4>Please add Contact</h4>)
  }
  
  return( 
    <Fragment> 
      {Contacts !== null ? (
            (Filtered !== null ?
              Filtered.map((contactitem) =>
                ( <ContactItem  
                    key={contactitem._id} 
                    contactitem={contactitem}/>
                )) :
              Contacts.map((contactitem) =>
                ( <ContactItem  
                    key={contactitem._id} 
                    contactitem={contactitem}/>
                ))
      )): (<Spinner/>)                  
      }
    </Fragment>
  )
}
export default Contacts;