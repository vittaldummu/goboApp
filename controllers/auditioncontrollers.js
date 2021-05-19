const express = require('express')

const Audition = require('../models/auditions')

const fs = require('fs');
const upload = require('../middleware/upload');

const app = express();
app.use("../uploads", express.static("uploads"));


// export the postUser method
 // end of postUser method

//export the getAllAudition method
exports.getAllAudition = function (req, res) {
  //find the first user form the collection
  Audition.find({}, function (error, response) {
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
exports.getAudition = function (req, res) {
  //find the first user form the collection
  Audition.findOne({ _id: req.params.id }, function (error, response) {
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




//export the searchAudition method
exports.searchAudition = function(req,res){
  let conditions = {};
  if(req.query.keyword){
    conditions['$or'] = [{"AuditionTitle": new RegExp(req.query.keyword,"i")}, {"AuditionDesc": new RegExp(req.query.keyword,"i")}]
  }

  if(req.query.skill){
    var skillkeys = req.query.skill.split(',');
    conditions["keySkills"] =  { $all: skillkeys};
  }

  if(req.query.keyword){
    conditions['$or'] = [{"AuditionTitle": new RegExp(req.query.keyword,"i")}, {"AuditionDesc": new RegExp(req.query.keyword,"i")}]
  }


  console.log("conditions",); 
  Audition.find(conditions,function(error,response){
      if(error){
        res.json(error);
      }
      else {
        res.status(200).json({success: true, body:response});
      }
  })
}

// export the updateUser method
exports.updateAudition = function (req, res) {
  Audition.findOneAndUpdate({ _id: req.params.AuditionId },{ 
    $set: {
      "phoneNumber":    req.body.phoneNumber,
      "email":      req.body.email,
      "location":    req.body.location,
      
      "updated_at":  new Date()
    }
  }, function (error, resUser) {
    if (error) {
      console.log("In error");
      return res.json(error);
    }
    else {
      console.log("In Audition update");
      res.status(200).json({success: true, message: 'Successfully updated Audition.', body:resUser});
    }
  });
}

//export deleteUser method
exports.deleteAudition = function(req, res) {
  Audition.remove({ _id: req.params.auditionId }, function(err, Audition) {
    if (err) {
      console.log("In error");
      return res.json(err);
    }
    else {
      console.log("In delete");
      res.status(200).json({success: true, message: 'Audition successfully deleted.', body:audition});
    }
  });
};