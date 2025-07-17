var express = require('express');
const { sequenceGenerator } = require('./sequenceGenerator');
const Message = require('../models/message');
var router = express.Router();

// GET all messages
router.get('/', (req, res, next) => {
  Message.find()
    .populate('sender') // optional: to get sender details instead of just ObjectId
    .then(messages => {
      res.status(200).json({
        message: 'Messages fetched successfully!',
        messages: messages
      });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Fetching messages failed.',
        error: error
      });
    });
});

// POST new message
router.post('/', (req, res, next) => {
  // Example assuming sequenceGenerator is used for IDs
  const maxMessageId = sequenceGenerator.nextId("messages");

  const message = new Message({
    id: maxMessageId,
    sender: req.body.sender,
    subject: req.body.subject,    // make sure these match your schema
    msgText: req.body.msgText
  });

  message.save()
    .then(createdMessage => {
      res.status(201).json({
        message: 'Message added successfully',
        messageData: createdMessage
      });
    })
    .catch(error => {
      console.error('Error saving message:', error);  // <-- Log the error
      res.status(500).json({
        message: 'Creating a message failed.',
        error: error
      });
    });
});



// PUT update message
router.put('/:id', (req, res, next) => {
  Message.findOne({ id: req.params.id })
    .then(message => {
      if (!message) {
        return res.status(404).json({ message: 'Message not found' });
      }
      message.subject = req.body.subject;
      message.msgText = req.body.msgText;
      message.sender = req.body.sender;

      Message.updateOne({ id: req.params.id }, message)
        .then(result => {
          res.status(204).json({ message: 'Message updated successfully' });
        })
        .catch(error => {
          res.status(500).json({
            message: 'Updating message failed.',
            error: error
          });
        });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Message not found.',
        error: error
      });
    });
});

// DELETE message
router.delete('/:id', (req, res, next) => {
  Message.findOne({ id: req.params.id })
    .then(message => {
      if (!message) {
        return res.status(404).json({ message: 'Message not found' });
      }
      Message.deleteOne({ id: req.params.id })
        .then(result => {
          res.status(204).json({ message: 'Message deleted successfully' });
        })
        .catch(error => {
          res.status(500).json({
            message: 'Deleting message failed.',
            error: error
          });
        });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Message not found.',
        error: error
      });
    });
});

module.exports = router;
