// Import required modules.
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// create the Schema for job post
var jobPostSchema = new Schema({
    jobPostedBy: {
        type: String,
        required: true
    },
    jobTitle: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    jobDesc: {
        type: String,
        required: true
    },
     userId: {
        type: String,
        //required: true
    },

    
    companyName: {
        type: String,
        required: true
    },
    file: {
        type: String,
        //required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['Cate 1', 'Cate 2', 'Cate 3']
    },
    date: {
        type: Number,
        required: true
    },
     isWhishList: {
        type: Boolean,
        default: false
        //required: true
    },
    jobId: {
      type: String,
       //required: true,
    },
    created_at: {
        type: Date,
        default: Date.now()
    },

});

// we need to create a model for using schema
var Job = mongoose.model('jobs', jobPostSchema);

// make this available to our jobs in our Node applications
module.exports = Job;


 

