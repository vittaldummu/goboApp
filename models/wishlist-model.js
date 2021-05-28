const mongoose = require("mongoose");
const wishlistSchema = new mongoose.Schema(
  {
    // _id: mongoose.Schema.Types.ObjectId,
   
    userRole: {
      type: String,
       //required: true,
    },
    jobId: {
      type: String,
       required: true,
    },
    jobPostedBy: {
        type: String,
        // required: true
    },
    jobTitle: {
        type: String,
        // required: true
    },
    location: {
        type: String,
        // required: true
    },
    jobDesc: {
        type: String,
        // required: true
    },
     userId: {
        type: String,
        required: true
    },

    
    companyName: {
        type: String,
        // required: true
    },
    file: {
        type: String,
        //required: true
    },
    category: {
        type: String,
        // required: true,
        enum: ['Cate 1', 'Cate 2', 'Cate 3']
    },
    date: {
        type: Number,
        // required: true
    },
    //  isWhishList: {
    //     type: Boolean,
    //     default: false
    //     //required: true
    // },
    created_at: {
        type: Date,
        default: Date.now()
    },
   
   
  });
  


module.exports = mongoose.model("Wishlist", wishlistSchema);
