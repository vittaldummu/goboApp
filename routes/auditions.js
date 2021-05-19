//import the required modules
var express = require('express');
var router = express.Router();
var auditionController = require('../controllers/auditioncontrollers');

//api for create audition
//router.route('/audition/createaudition').post(auditionController.postAudition);

//api for getting the all auditions posted
router.route('/audition/getAllaudition').get(auditionController.getAllAudition);

//api for getting the audition data from his id
router.route('/audition/getaudition/:id').get(auditionController.getAudition);

//api for searching the audition data by auditionTitle keyword
router.route('/audition/searchaudition').get(auditionController.searchAudition);

//api for updating the data of the audition
router.route('/audition/updateaudition/:auditionId').put(auditionController.updateAudition);

//api for deleting the audition
router.route('/audition/deleteaudition/:auditionId').delete(auditionController.deleteAudition);


const Audition = require('../models/auditions')

const fs = require('fs');
const upload = require('../middleware/upload');

const app = express();
app.use("../uploads", express.static("uploads"));

const {
    Mongoose
} = require('mongoose')
router.post('/audition/createaudition', upload.single("file"), (req, res)=>  {
  //upload.single("file")
  var audition = new Audition({
    auditionPostedBy: req.body.auditionPostedBy,
    auditionTitle:    req.body.auditionTitle,
    location:    req.body.location,
    auditionDesc:     req.body.auditionDesc,
    companyName: req.body.companyName,
    category: req.body.category,
    date:  req.body.date
  })
  if(req.file){
    audition.file = req.file.path
  }
  console.log(audition)
  audition  
  .save()
  .then((data) => {
  return res.send({
    success: "true",
    message: "Successfully created new audition",
    _id: data._id
    });
  })
  .catch((err) => {
  return res.status(500).send({
    message: err.message || "Some error occurred while creating the audition.",
    });
  });
    
  // end of save method
}); // end of postUser method



//export the router
module.exports = router;
