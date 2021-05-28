const express = require('express')
//const path = require('path');

const Job = require('../models/jobs')
const Apply = require('../models/apply-job-model')


const fs = require('fs');
const upload = require('../middleware/upload');

const Wishlist = require('../models/wishlist-model')


const app = express();
app.use("../uploads", express.static("uploads"));


// export the postUser method


//export the getAllJob method
exports.getAllJob = function (req, res) {

  Job.find({}, function (error, response) {
 // console.log(response)
   for (let i = 0; i < response.length; i++) {
    //console.log(response[i]._id);
    Wishlist.find({},function(error , data)
    {
      for (let j = 0; j < data.length; j++){

        //console.log(data[j].jobId)
        if (response[i]._id == data[j].jobId) {
          console.log()
        console.log("wishlist",data[j].jobId)
         console.log("job",response[i]._id)
      
      //console.log(isWishlist)

     Job.updateOne({_id:response[i]._id}, {isWishlist: true})
 // Job.findByIdAndUpdate(
 //    { _id: response[i]._id },
 //    {
 //       isWishlist:true,
     
 //    }
 //  )
 //  .then(result => {
 //    res.status(201).json({
 //        message: 'wish listUpdate Successfully',
 //        success: true
 //      })
 // })
     // console.log(isWishlist)

    }
    else{
       response[i].isWishlist = false;
       //console.log(response[i].isWishlist)

    }

      }

     // console.log(response)
    });
     return res.status(200).send({ success:true ,message: "Requested Profile", Job:response});


   }
});
}

//export the getUser by id method
exports.getJob = async (req, res) => {
  try {
    const job = await Job.find({ userId: req.query.userId}); // the `await` is very important here!
    console.log(req.params.userId)
    if (!job) {
      return res.status(400).send({ success:false, message: "Could not find job" });
    }
    return res.status(200).send({ success:true ,message: "Requested Profile", Job:job});
  } catch (error) {
    return res.status(400).send({ error: "An error has occurred, unable to get job" });
  }
};


exports.getWislist = async (req, res) => {

   

  try {
    const wishlist = await Wishlist.find({ userId: req.query.userId}); // the `await` is very important here!

    console.log( "adsd",wishlist)

    if (!wishlist) {
      return res.status(400).send({ success:false, message: "Could not find wishlist" });
    }
    return res.status(200).send({ success:true ,message: "Requested wishlist", Wishlist:wishlist});
  } catch (error) {
    return res.status(400).send({ error: "An error has occurred, unable to get wishlist" });
  }
};

exports.getApplaiedJob = async (req, res) => {
  try {
    const applaiedJob = await Apply.find({ userId: req.query.userId}); // the `await` is very important here!
    console.log(req.params.userId)
    if (!applaiedJob) {
      return res.status(400).send({ success:false, message: "You have not applaied for any job"});
    }
    return res.status(200).send({ success:true ,message: "Requested wishlist", ApplaiedJob:applaiedJob});
  } catch (error) {
    return res.status(400).send({ error: "An error has occurred, unable to get ApplaiedJob" });
  }
};








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

exports.applyJobFn = function (req, res) {
  //find the first user form the collection
 // console.log('xxxxx raghav');

 Job.find({_id: req.body.jobId})
     .then(result => {
       if (result) {
         // res.status(201).json({
         //   success: true,
         //   data: result || {}
         // })

  const userVo = new Apply({
  userId:req.body.userId,
  userEmail: req.body.userEmail,
  jobId: req.body.jobId,
    jobPostedBy:result[0].jobPostedBy,
    jobTitle:result[0].jobTitle,
    jobDesc:result[0].jobDesc,
    category:result[0].category,
    location:result[0].location,
    date:result[0].date,
    isWhishList:result[0].isWishlist,
  companyName:result[0].companyName,
  applyDate:new Date(),
  status:true
})
userVo
  .save()
  .then(result => {
    res.status(201).json({
    message: 'Apply job Successfully',
    success: true,
     body:result,
})
  })
  .catch(err => {
    res.status(400).json({
      message: 'Backend Error',
      success: false,
      body: err
    })
  })

       }
     })
     .catch(err => {
       console.log('xxx x xxx', err)
     })
}

//console.log("adsgsd")

exports.create = function (req, res) {



  Job.find({_id: req.body.jobId})
     .then(result => {
        if (result) {
       //   res.status(201).json({
       //     success: true,
       //     data: result || {}
       //   })
           // console.log(result[0])
           // console.log("dsdsd",result[0].userId)
            const wish = new Wishlist({


 
  userId:req.body.userId,
  userRole: req.body.userRole,
  jobId: req.body.jobId,
   jobPostedBy:result[0].jobPostedBy,
    jobTitle:result[0].jobTitle,
    jobDesc:result[0].jobDesc,
    category:result[0].category,
    location:result[0].location,
    date:result[0].date,
    isWhishList:result[0].isWishlist,
  companyName:result[0].companyName,
  created_at: new Date()
  
})
// const _id = wish.jobId
// const j= Job.find({_id: req.body.jobId})
// console.log(_id)
// console.log(j)


wish
  .save()
  .then(result => {
    res.status(201).json({
    message: 'Wishlist created Successfully',
    success: true,
    body: result,
})
    //console.log(result)
  })

  .catch(err => {
    res.status(400).json({
      message: 'Backend Error',
      success: false,
      body: err
    })
  })


       }
     })
     .catch(err => {
       console.log('xxx x xxx', err)
     })
 


}




exports.deleteWishlist = async (req, res) => {
  try {
    const deletedWishlist = await Wishlist.find({ userId: req.query.userId , userRole: req.query.userRole, jobId: req.query.jobId }); // the `await` is very important here!

    if (!deletedWishlist) {
      return res.status(400).send({ message: "Could not delete user" });
    }
    return res.status(200).send({ message: "User deleted successfully", Job: deletedWishlist});
  } catch (error) {
    return res.status(400).send({ error: "An error has occurred, unable to delete user" });
  }
};



