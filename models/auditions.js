// Import required modules.
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// create the Schema for audition post
var auditionSchema = new Schema({
    auditionPostedBy: {
        type: String,
        required: true
    },
    auditionTitle: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    auditionDesc: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now()
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
    }
});
// we need to create a model for using schema
var Audition = mongoose.model('auditions', auditionSchema);

// make this available to our auditions in our Node applications
module.exports = Audition;
