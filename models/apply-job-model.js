const mongoose = require("mongoose");
const jobSchema = new mongoose.Schema(
  {
    // _id: mongoose.Schema.Types.ObjectId,
    userId: {
      type: String,
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
    },
    jobId: {
      type: String,
      required: true,
    },
    applyDate: {
      type: String,
      required: false,
    },
      jobTitle: {
        type: String,
        //required: true
    },
    location: {
        type: String,
        //required: true
    },
    jobDesc: {
        type: String,
        //required: true
    },
    jobPostedBy: {
        type: String,
        //required: true
    },
     companyName: {
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
    status: {
      type: Boolean,
      required: false,
    },
   
  },
  
);

module.exports = mongoose.model("ApplyJob", jobSchema);
