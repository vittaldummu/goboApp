const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const Admin = require("../models/adminModel");
const MASTER_KEY = "vittal";
const { registerValidation, loginValidation } = require("../middleware/validation");


// signup
exports.signUp = async (req, res, next) => {
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const emailExist = await Admin.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send({success:false ,message: "email  already exist as  " +  emailExist.userRole});

  try {
    const newAdmin = await createAdmin(req);
    const savedAdmin = await newAdmin.save(); 
    return res.status(200).send({ success:true, message: "User created successfully!", user: savedAdmin  });
  } catch (error) {
    return res.status(400).send(error);
  }
};

// login
exports.logIn = async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);


  const foundAdmin = await Admin.findOne({email:req.body.email});
   if(!foundAdmin) return res.status(400).send({ success:false , message: "Email is not registerd  " });


   

    const isMatch = await bcrypt.compareSync(req.body.password, foundAdmin.password);
    if (!isMatch) return res.status(400).send({ success:false, message: "invalid password" });


  try 
  {
   
   //const isUserMatch = await compareSync(req.body.userRole, foundAdmin.userRole);
    if (req.body.userRole !== foundAdmin.userRole) {
    	return res.status(400).send({ success:false, message: "userRole not matched" });	 
    }

  
    const token = await jwt.sign({ id: foundAdmin._id }, MASTER_KEY);
  //return res.redirect("/dashboard",)
    res.json({success:true , token,
      foundAdmin:{
       _id:foundAdmin._id,
        firstName:foundAdmin.firstName,
        lastName:foundAdmin.lastName,
        userRole:foundAdmin.userRole,
        email:foundAdmin.email,
        //password:foundAdmin.password,
        phone:foundAdmin.phone
     


    }
})

    
     //return res.status(200).header("admin-token", token).send({ message: "login successfully!","admin-token": token  });
  
  } catch (error) {
    return res.status(400).send(error);
  }

};



// exports.logIn = async (req, res) => {
//   const { error } = loginValidation(req.body);
//   if (error) return res.status(400).send(error.details[0].message);

//   const foundAdmin = await Admin.findOne({ email: req.body.email }); //returns the first document that matches the query criteria or null
//   if (!foundAdmin) return res.status(400).send({ message: "Email is not found" });

//   try {
//     const isMatch = await bcrypt.compareSync(req.body.password, foundAdmin.password);
//     if (!isMatch) return res.status(400).send({ message: "invalid password" });

//     // create and assign jwt
//     const token = await jwt.sign({ _id: foundAdmin._id }, MASTER_KEY);
    
//     return res.status(200).header("admin-token", token).send({ "admin-token": token });
//   } catch (error) {
//     return res.status(400).send(error);
//   }
// };



// Login
// router.post("/login", async (req, res) => {
// try {
// const { email, password } = req.body;
// // validate
// if (!email || !password)
// return res.status(400).json({ msg: "Not all fields have been entered." });
// const foundAdmin = await Admin.findOne({ email: email });
// if (!foundAdmin)
// return res
// .status(400)
// .json({ msg: "No account with this email has been registered." });
// const isMatch = await bcrypt.compare(password, foundAdmin.password);
// if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });
// const token = jwt.sign({ id: foundAdmin._id }, process.env.MASTER_KEY);
// res.json({
// token,
// foundAdmin: {
// id: foundAdmin._id,

// },
// });
// } catch (err) {
// res.status(500).json({ error: err.message });
// }
// });


// Update admin
exports.updateAdmin = async (req, res) => {
  try {

    req.body.password = await bcrypt.hashSync(req.body.password, 10); //encrypt the password before updating
    const updatedAdmin = await Admin.findByIdAndUpdate(req.params.userId, { $set: req.body }, { new: true });

    if (!updatedAdmin) {
      return res.status(400).send({ message: "Could not update user" });
    }
    return res.status(200).send({ message: "User updated successfully", updatedUser});

  } catch (error) {
    return res.status(400).send({ error: "An error has occurred, unable to update user" });
  }
};

// Delete user
exports.deleteAdmin = async (req, res) => {
  try {
    const deletedAdmin = await Admin.findByIdAndDelete({ _id: req.body._id}); // the `await` is very important here!

    if (!deletedAdmin) {
      return res.status(400).send({ message: "Could not delete user" });
    }
    return res.status(200).send({ message: "User deleted successfully", Admin: deletedAdmin});
  } catch (error) {
    return res.status(400).send({ error: "An error has occurred, unable to delete user" });
  }
};


exports.getUser = async (req, res) => {
  try {
    const user = await Admin.findById({ _id: req.body._id}); // the `await` is very important here!

    if (!user) {
      return res.status(400).send({ success:false, message: "Could not find user" });
    }
    return res.status(200).send({ success:true ,message: "Requested Profile", User:user});
  } catch (error) {
    return res.status(400).send({ error: "An error has occurred, unable to get user" });
  }
};

exports.data = async (req, res) => {
  return res.json({
    posts: {
      title: "Admin Authentication",
      discription: "random data you can access because you\'re authenticated",
    },
  });
};

exports.getAllUser = function (req, res) {
  //find the first user form the collection
  Admin.find({}, function (error, response) {
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


async function createAdmin(req) {
  const hashPassword = await bcrypt.hashSync(req.body.password, 10);
  return new Admin({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    userRole: req.body.userRole,
    email: req.body.email,
    password: hashPassword,
    phone: req.body.phone,
    is_profile_updated: req.body.is_profile_updated
  });
}


