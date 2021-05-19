const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema({
    rate_experience: {
        type: String,
        required: true,
        enum: ["1", "2", "3", "4", "5"]
    },
    comment: {
        type: String,
        required: true
    }
}, {
    strict: true,
    versionKey: false,
    timestamps: { createdAt: "createdAt", 
                  updatedAt: "updatedAt" }
  });

const Feedback = mongoose.model("Feedback", FeedbackSchema);

module.exports = Feedback;