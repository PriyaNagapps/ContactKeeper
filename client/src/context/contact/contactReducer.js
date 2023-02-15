import {
  GET_CONTACTS,
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
  CONTACT_ERROR,
  CLEAR_CONTACTS
} from '../types';

const ContactReducer = (state,action) =>{

  switch(action.type){
    case GET_CONTACTS:
          return {...state,Contacts : action.payload };
    
    case ADD_CONTACT:
      return {
              ...state,
               Contacts:[action.payload,...state.Contacts]
               // Contacts:(state.Contacts===null?[action.payload]:[action.payload,...state.Contacts]) 
            };

    case UPDATE_CONTACT:
      return ({...state,
                Contacts:
                  state.Contacts.map((contact)=>
                      contact._id===action.payload._id ? 
                      action.payload : contact)
              });

    case DELETE_CONTACT:
      return ({...state,
                Contacts:state.Contacts.filter((contact) =>
                 contact._id !== action.payload._id )});
    
    case CLEAR_CONTACTS:
      return({...state ,
                Contacts : null,
                Filtered : null,
                Current : null,
                error : null})

    case SET_CURRENT:
      return({...state,Current:action.payload});

    case CLEAR_CURRENT:
      return({...state,Current : null});
      
    case FILTER_CONTACTS:
      return ({...state,
                Filtered : state.Contacts.filter(({name,email})=>{
                          const testString = `${name}${email}`.toLowerCase(); 
                          return testString.includes(action.payload.toLowerCase());
                })
              });
    case CLEAR_FILTER:
      return({...state,Filtered:null});

    case CONTACT_ERROR:
      return({...state,error:action.payload});

    default:
       throw new Error(`Error: Unsupported type : ${action.type}`);
  }

}
export default ContactReducer;