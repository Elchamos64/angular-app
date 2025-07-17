var express = require('express');
const sequenceGenerator = require('./sequenceGenerator');
const Contact = require('../models/contact');
var router = express.Router();

// GET all contacts
router.get('/', (req, res, next) => {
  Contact.find()
    .populate('group')
    .populate('group') // optional: get group contact details
    .then(contacts => {
      res.status(200).json({
        message: 'Contacts fetched successfully!',
        contacts: contacts
      });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Fetching contacts failed.',
        error: error
      });
    });
});

// POST new contact
router.post('/', (req, res, next) => {
  const maxContactId = sequenceGenerator.nextId("contacts");

  const contact = new Contact({
    id: maxContactId,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    imageUrl: req.body.imageUrl,
    group: req.body.group || [] // array of ObjectIds, may be empty
  });

  contact.save()
    .then(createdContact => {
      res.status(201).json({
        message: 'Contact added successfully',
        contact: createdContact
      });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Creating contact failed.',
        error: error
      });
    });
});

// PUT update contact
router.put('/:id', (req, res, next) => {
  Contact.findOne({ id: req.params.id })
    .then(contact => {
      if (!contact) {
        return res.status(404).json({ message: 'Contact not found' });
      }
      contact.name = req.body.name;
      contact.email = req.body.email;
      contact.phone = req.body.phone;
      contact.imageUrl = req.body.imageUrl;
      contact.group = req.body.group || [];

      Contact.updateOne({ id: req.params.id }, contact)
        .then(result => {
          res.status(204).json({ message: 'Contact updated successfully' });
        })
        .catch(error => {
          res.status(500).json({
            message: 'Updating contact failed.',
            error: error
          });
        });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Contact not found.',
        error: error
      });
    });
});

// DELETE contact
router.delete('/:id', (req, res, next) => {
  Contact.findOne({ id: req.params.id })
    .then(contact => {
      if (!contact) {
        return res.status(404).json({ message: 'Contact not found' });
      }
      Contact.deleteOne({ id: req.params.id })
        .then(result => {
          res.status(204).json({ message: 'Contact deleted successfully' });
        })
        .catch(error => {
          res.status(500).json({
            message: 'Deleting contact failed.',
            error: error
          });
        });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Contact not found.',
        error: error
      });
    });
});

module.exports = router;
