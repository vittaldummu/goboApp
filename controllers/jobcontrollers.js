const express = require('express')
//const path = require('path');

const Job = require('../models/jobs')

const fs = require('fs');
const upload = require('../middleware/upload');


const app = express();
app.use("../uploads", express.static("uploads"));


// export the postUser method


//export the getAllJob method
exports.getAllJob = function (req, res) {
  //find the first user form the collection
  Job.find({}, function (error, response) {
    if (error) {
      console.log("In error");
      return res.json(error);
    }
    else {
      console.log("success");
      res.status(200).json({success: true, body:response});
    }
  });
}

//export the getUser by id method
exports.getJob = function (req, res) {
  //find the first user form the collection
  Job.findOne({ _id: req.params.id }, function (error, response) {
    if (error) {
      console.log("In error");
      return res.json(error)
    }
    else {
      console.log("get user by id");
      res.status(200).json({success: true, body:response});
    }
  });
}

// exports.getJob = async (req, res) => {
  
//     //const user=await Admin.findById(req.user)

//     const job = await Job.findById( req.params.Admin_id); // the `await` is very important here!
//   console.log(req.params._id)
//     if (!job) {
//        res.status(400).send({ success:false, message: "Could not find job" });
//     }
//     else{
//     return res.status(200).send({ success:true ,message: "Requested Job", Job:job});
//   }//  catch (error) {
//   //   return res.status(400).send({ error: "An error has occurred, unable to get Job" });
//   // }
// };





//export the searchJob method
exports.searchJob = function(req,res){
  let conditions = {};
  if(req.query.keyword){
    conditions['$or'] = [{"jobTitle": new RegExp(req.query.keyword,"i")}, {"jobDesc": new RegExp(req.query.keyword,"i")}]
  }

  if(req.query.skill){
    var skillkeys = req.query.skill.split(',');
    conditions["keySkills"] =  { $all: skillkeys};
  }

  if(req.query.keyword){
    conditions['$or'] = [{"jobTitle": new RegExp(req.query.keyword,"i")}, {"jobDesc": new RegExp(req.query.keyword,"i")}]
  }


  console.log("conditions",); 
  Job.find(conditions,function(error,response){
      if(error){
        res.json(error);
      }
      else {
        res.status(200).json({success: true, body:response});
      }
  })
}

// export the updateUser method
exports.updateJob = function (req, res) {
  Job.findOneAndUpdate({ _id: req.params.jobId },{ 
    $set: {
      "jobTitle":    req.body.jobTitle,
      "reqExp":      req.body.reqExp,
      "location":    req.body.location,
      "offerSalary": req.body.offerSalary,
      "keySkills":   req.body.keySkills,
      "desiredProf": req.body.desiredProf,
      "jobDesc":     req.body.jobDesc,
      "companyProf": req.body.companyProf,
      "updated_at":  new Date()
    }
  }, function (error, resUser) {
    if (error) {
      console.log("In error");
      return res.json(error);
    }
    else {
      console.log("In job update");
      res.status(200).json({success: true, message: 'Successfully updated job.', body:resUser});
    }
  });
}

//export deleteUser method
exports.deleteJob = function(req, res) {
  Job.findByIdAndDelete({ _id: req.params.id }, function(err, job) {
    if (err) {
      console.log("In error");
      return res.json(err);
    }
    else {
      console.log("In delete");
      res.status(200).json({success: true, message: 'Job successfully deleted.', body:job});
    }
  });
};

// exports.deleteJob = function(req, res) {
//   try {
//     const deletedJob = Job.findByIdAndDelete(req.job);
//     res.json(deletedJob);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

