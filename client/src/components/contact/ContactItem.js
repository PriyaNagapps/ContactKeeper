import React from "react";
import PropTypes from 'prop-types';
import { setCurrent, useContacts,deleteContact } from "../../context/contact/contactState";

const ContactItem = ({contactitem}) =>{
  const contactDispatch = useContacts()[1];

  const { name, email, phone, contacttype } = contactitem;

  return(
    <div className = 'card bg-light'>
      <h3 className="text-primary text-left">
        {name}{' '}
        <span 
          style={{float : 'right'}} 
          className={
            'badge '+
            (contacttype === 'professional' ? 'badge-success':'badge-primary')
          }
        >
          {contacttype.charAt(0).toUpperCase() + contacttype.slice(1)}
        </span>
      </h3>
      <ul className="list">
        { email && (
          <li>
             <i className='fas fa-envelope-open' /> {email}
          </li>)
        }
        { phone && (
          <li>
             <i className='fas fa-phone' /> {phone}
          </li>)
        }    
      </ul>
      <p>
        <button className='btn btn-dark btn-sm' 
          onClick={()=>setCurrent(contactDispatch,contactitem)}>
            Edit
        </button>
        <button className='btn btn-danger btn-sm' 
          onClick={()=>deleteContact(contactDispatch,contactitem)}>
            Delete
        </button>
      </p>
    </div>

  )
}
ContactItem.propTypes = {
  contactitem:PropTypes.object.isRequired
};
export default ContactItem;