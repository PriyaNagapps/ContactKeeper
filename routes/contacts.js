const express = require('express');
const router = express.Router();
const contact = require('../model/Contact');
const auth = require('../middleware/auth');
const {check,validationResult} = require('express-validator');
const Contact = require('../model/Contact');

//@route    GET /api/contacts
//@desc     Get all user contacts
//@access   Private

router.get('/',auth, async(req, res) => {
  try {
    const contact = await Contact.find({user:req.user.id}).sort({date:-1});
    res.json(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
  //console.log('Get all user contacts'); 
});

//@route    POST /api/contacts
//@desc     create new user contact
//@access   Private

router.post('/',
            auth,
            check('name','Name is required').not().isEmpty(),
            async(req, res) => {

  const errors=validationResult(req);
  if(!errors.isEmpty){
    return res.status(400).json({errors:errors.array()});
  }

  const { name, email, phone, contacttype } = req.body;

  try{

    const newContact = new Contact({
      name : name,
      email : email,
      phone : phone,
      contacttype : contacttype,
      user : req.user.id
    });
    const contact = await newContact.save();
    res.json(contact);

  } catch (err) {
      console.error(err.message);
      res.status(500).send('server error');
  }
  //console.log('create new user contact');
});

//@route    PUT /api/contacts/:id
//@desc     update user contact
//@access   Private

router.put('/:id', auth, async (req, res) => {
  
  const{name,email,phone,contacttype} = req.body;

  const contactFields = {};
  if(name) contactFields.name = name;
  if(email) contactFields.email = email;
  if(phone) contactFields.phone = phone;
  if(contacttype) contactFields.contacttype = contacttype;
  //console.log(contactFields);

  try {
    let contact = await Contact.findById(req.params.id);

    
    if(!contact){
      return res.status(404).json({msg :'contact not found'});
    }

    // Make sure user owns contact
    if(contact.user.toString() !== req.user.id){
      return res.status(401).json({msg :'Unauthorised User'});
    }
    
    contact = await Contact.findByIdAndUpdate( req.params.id,
                                               { $set : contactFields },
                                               { new : true }
                                              );
    
    res.json(contact);
    

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }

  //console.log('update user contact');
});

//@route    DELETE /api/contacts/:id
//@desc     delete user contact
//@access   Private

router.delete('/:id', auth, async(req, res) => {

  try {
    let contact = await Contact.findById(req.params.id);

    if(!contact){
      return res.status(404).json({msg :'contact not found'});
    }

    // Make sure user owns contact
    if(contact.user.toString() !== req.user.id){
      return res.status(401).json({msg :'Unauthorised User'});
    }

    await Contact.findByIdAndRemove(req.params.id);
    res.json({ msg: 'Contact removed' });

  } catch(err){
    console.error(err.message);
    res.status(500).send('Server Error');

  }
  //res.send('Delete user contact');
});

module.exports = router;
