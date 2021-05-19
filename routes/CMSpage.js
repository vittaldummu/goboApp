const express = require('express');
const router = express.Router(); 

const Feedback = require("../models/feedback");
const Contact = require("../models/contact");

router.post("/feedback", (req,res) =>{
  if (!req.body.rate_experience || !req.body.comment) {
    return res.status(400).send({
      message: "Required field can not be empty",
    });
  }
  const feedback = new Feedback({
    rate_experience : req.body.rate_experience,
    comment : req.body.comment
  });
  console.log(feedback);
  feedback  
  .save()
  .then((data) => {
    return res.status(200).send({
      comment: data.comment,
      rate_experience : data.rate_experience,
      _id: data._id
    });
  })
  .catch((err) => {
    return res.status(500).send({
      message: err.message || "Some error occurred while creating Feedback form."
    });
  });
});

router.get('/feedback', (req, res) => {
  Feedback.find()
      .then((feedback) => {
        return res.status(200).send({feedback: feedback});
      })
      .catch((err) => {
        return res.status(500).send({
          message: err.message || "Error Occured",
        });
      });
});

router.post("/contactUs", (req,res) =>{
  if (!req.body.email || !req.body.phone || !req.body.contact_des) {
    return res.status(400).send({
      message: "Required field can not be empty",
    });
  }
  const contact = new Contact({
    email : req.body.email,
    phone : req.body.phone,
    contact_des : req.body.contact_des
  });
  console.log(contact);
  contact  
  .save()
  .then((data) => {
    return res.status(200).send({
      email: data.email,
      phone: data.phone,
      contact_des: data.contact_des
    });
  })
  .catch((err) => {
    return res.status(500).send({
      message: err.message || "Some error occurred while creating ContactUs form."
    });
  });
});

router.get('/contactUs', (req, res) => {
  Contact.find()
      .then((contact) => {
        return res.send({contact: contact});
      })
      .catch((err) => {
        return res.status(500).send({
          message: err.message || "Error Occured",
        });
      });
});

module.exports = {
    CMScontroller: router
}