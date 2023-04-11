const sequenceGenerator = require('./sequenceGenerator');
const Document = require('../models/document');

var express = require('express');
var router = express.Router();
module.exports = router;

router.get("/", (req, res, next) => {
  Document.find()
  .then(documents => {
    if(!documents){
      return res.status(500).json({
        message: "Documents were not fetched!"
      })
    }
    return res.status(200).json(documents);
  });
});

router.post('/', (req, res, next) => {
  console.log('documents posted?');
  const maxDocumentId = sequenceGenerator.nextId("documents");

  const document = new Document({
    id: maxDocumentId,
    name: req.body.name,
    url: req.body.url,
    date: req.body.date,
    clientSponsor: req.body.clientSponsor,
    location: req.body.location,
    publication: req.body.publication,
    category: req.body.category,
    tangibleItems: req.body.tangibleItems,
    description: req.body.description,
    profileStartedBy: req.body.profileStartedBy,
    profileStatus: req.body.profileStatus
  });

  document.save()
    .then(createdDocument => {
      res.status(201).json({
        message: 'Document added successfully',
        document: createdDocument
      });
    })
    .catch(error => {
       res.status(500).json({
          message: 'An error occurred',
          error: error
        });
    });
});

router.put('/:id', (req, res, next) => {
  Document.findOne({ id: req.params.id })
    .then(document => {
      document.name = req.body.name;
      document.url = req.body.url;
      document.date = req.body.date;
      document.clientSponsor = req.body.clientSponsor;
      document.location = req.body.location;
      document.publication = req.body.publication;
      document.category = req.body.category;
      document.tangibleItems = req.body.tangibleItems;
      document.description = req.body.description;
      document.profileStartedBy = req.body.profileStartedBy;
      document.profileStatus = req.body.profileStatus;

      Document.updateOne({ id: req.params.id }, document)
        .then(result => {
          res.status(204).json({
            message: 'Document updated successfully'
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
        message: 'Document not found.',
        error: { document: 'Document not found'}
      });
    });
});

router.delete("/:id", (req, res, next) => {
  Document.findOne({ id: req.params.id })
    .then(document => {
      Document.deleteOne({ id: req.params.id })
        .then(result => {
          res.status(204).json({
            message: "Document deleted successfully"
          });
        })
        .catch(error => {
           res.status(500).json({
           message: 'An error occurred',
           error: error
         });
        })
    })
    .catch(error => {
      res.status(500).json({
        message: 'Document not found.',
        error: { document: 'Document not found'}
      });
    });
});
