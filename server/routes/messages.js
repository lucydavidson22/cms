// const sequenceGenerator = require('./sequenceGenerator');
// const Message = require('../models/message');

// var express = require('express');
// var router = express.Router();
// module.exports = router;

// router.get("/", (req, res, next) => {
//   Message.find()
//   .then(messages => {
//     if(!messages){
//       return res.status(500).json({
//         message: "Messages were not fetched!"
//       })
//     }
//     return res.status(200).json(messages);
//   });
// });

// router.post('/', (req, res, next) => {
//   const maxMessageId = sequenceGenerator.nextId("messages");

//   const message = new Message({
//     id: maxMessageId,
//     subject: req.body.subject,
//     msgText: req.body.msgText,
//     sender: req.body.sender
//   });

//   message.save()
//     .then(createdMessage => {
//       res.status(201).json({
//         // message: 'Message added successfully',
//         message: createdMessage
//       });
//     })
//     .catch(error => {
//        res.status(500).json({
//           message: 'An error occurred',
//           error: error
//         });
//     });
// });

// router.put('/:id', (req, res, next) => {
//   Message.findOne({ id: req.params.id })
//     .then(message => {
//       // message.name = req.body.name;
//       // message.description = req.body.description;
//       // message.url = req.body.url;
//       message.subject = req.body.subject;
//       message.msgText = req.body.msgText;
//       message.sender = req.body.sender;

//       Message.updateOne({ id: req.params.id }, message)
//         .then(result => {
//           res.status(204).json({
//             message: 'Message updated successfully'
//           })
//         })
//         .catch(error => {
//            res.status(500).json({
//            message: 'An error occurred',
//            error: error
//          });
//         });
//     })
//     .catch(error => {
//       res.status(500).json({
//         message: 'Message not found.',
//         error: { message: 'Message not found'}
//       });
//     });
// });


const sequenceGenerator = require('./sequenceGenerator');
const Message = require('../models/message');

var express = require('express');
var router = express.Router();
module.exports = router;

router.get("/", (req, res, next) => {
  Message.find()
  .then(messages => {
    if(!messages){
      return res.status(500).json({
        message: "Messages were not fetched!"
      })
    }
    return res.status(200).json(messages);
  });
});

router.post('/', (req, res, next) => {
  const maxMessageId = sequenceGenerator.nextId("messages");

  const newMessage = new Message({
    id: maxMessageId,
    subject: req.body.subject,
    msgText: req.body.msgText,
    sender: req.body.sender
  });

  console.log('create message try 3');

  newMessage.save()
    .then(createdMessage => {
      res.status(201).json({
        message: 'Message added successfully',
        newMessage: createdMessage
      });
    })
    .catch(error => {
       res.status(500).json({
          message: 'An error occurred',
          error: error
        });
    });
    console.log('create message try 4');
});

router.put('/:id', (req, res, next) => {
  console.log('create message try 5');
  Message.findOne({ id: req.params.id })
    .then(message => {
      message.subject = req.body.subject;
      message.msgText = req.body.msgText;
      message.sender = req.body.sender;

      Message.updateOne({ id: req.params.id }, message)
        .then(result => {
          res.status(204).json({
            message: 'Message updated successfully'
          })
        })
        .catch(error => {
           res.status(500).json({
           message: 'An error occurred',
           error: error
         });
        });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Message not found.',
        error: { message: 'Message not found'}
      });
    });
});
