const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    contact_des: {
        type: String,
        required: true
    }
}, {
    strict: true,
    versionKey: false,
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" }
  });

const Contact = mongoose.model("Contact", ContactSchema);

module.exports = Contact;