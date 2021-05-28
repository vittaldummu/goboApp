// //import the required modules
 var express = require('express');
 var router = express.Router();

 const jobController = require("../controllers/jobcontrollers");

// router.route('/job/createJob').post(jobController.postJob);

//api for getting the all jobs posted
router.route('/job/getAllJob').get(jobController.getAllJob);

//api for getting the job data from his id
router.route('/job/getJob/userId').get(jobController.getJob);

router.route('/getWishlist/userId').get(jobController.getWislist);

router.route('/getApplaiedJob/userId').get(jobController.getApplaiedJob);


//api for searching the job data by JobTitle keyword
router.route('/job/searchJob').get(jobController.searchJob);

//api for updating the data of the job
router.route('/job/updateJob/:jobId').put(jobController.updateJob);

router.delete('/deleteWishlist', jobController.deleteWishlist);

//api for deleting the job
router.route('/job/deleteJob/:jobId').delete(jobController.deleteJob);

router.post("/job/applyJob", jobController.applyJobFn);

router.post("/wishlist/createWishlist", jobController.create)

// // const Job = require('../models/jobs')

// // const fs = require('fs');
// // const upload = require('../middleware/upload');

// // const app = express();
// // app.use("../uploads", express.static("uploads"));

// // const {
// //     Mongoose
// // } = require('mongoose')

// // // export the postUser method
// // router.post('/job/createJob', upload.single("file"), (req, res)=>  {
// //   upload.single("file")
// //   var job = new Job({
// //     jobPostedBy: req.body.jobPostedBy,
// //     jobTitle:    req.body.jobTitle,
// //     location:    req.body.location,
// //     jobDesc:     req.body.jobDesc,
// //     companyName: req.body.companyName,
// //     category: req.body.category,
// //     date:  new Date()
// //   })
// //   if(req.file){
// //     job.file = req.file.path
// //   }
// //   console.log(req.file.path)
// //   job  
// //   .save()
// //   .then((data) => {
// //   return res.send({
// //     success: "true",
// //     message: "Successfully created new job",
// //     _id: data._id
// //     });
// //   })
// //   .catch((err) => {
// //   return res.status(500).send({
// //     message: err.message || "Some error occurred while creating the Job.",
// //     });
// //   });
    
// //   // end of save method
// // }); // end of postUser method



// //export the router
// module.exports = router;

const Job = require('../models/jobs')

const fs = require('fs');
const upload = require('../middleware/upload');

const app = express();
app.use("../uploads", express.static("uploads"));

const {
    Mongoose
} = require('mongoose')

//export the postUser method

//export the postUser method
router.post('/job/createJob', upload.single("file"), (req, res)=>  {
  //upload.single("file")
   //console.log('xxxxx raghav',req.body);
  var job = new Job({
    jobPostedBy: req.body.jobPostedBy,
    jobTitle:    req.body.jobTitle,
    location:    req.body.location,
    jobDesc:     req.body.jobDesc,
    companyName: req.body.companyName,
    category: req.body.category,
    userId:req.body.userId,  
    //file:req.body.file,
    date:  req.body.date,
  	//isWishlist:false
  })
  if(req.file){
    job.file = req.file.path
  }
  //console.log
  job  
  .save()
  .then((data) => {
  	console.log(data)
  return res.send({

    success: "true",
    message: "Successfully created new job",
    _id: data._id,

    //date:data.date
    });
  })
  .catch((err) => {
  return res.status(500).send({
    message:  "Some error occurred while creating the Job."
    });
  });
    
  // end of save method
}); // end of postUser method





 module.exports = router;