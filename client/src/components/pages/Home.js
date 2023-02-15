import React from 'react';
import Contacts from '../contact/Contacts';
import ContactFilter from '../contact/ContactFilter';
import ContactForm from '../contact/ContactForm';

const Home = () => {
return(
  <div className='grid-2'>
    <div>
      <ContactForm/>
    </div>
    <div>
      <ContactFilter/>
      <Contacts />
    </div>
  </div>
);
};

export default Home;