const mongoose = require("mongoose");

const database = mongoose.connect('mongodb+srv://wordsys:wordsys1234@cluster0.3oudl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
  process.env.DB_URL,
  { useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useFindAndModify: false,
    useCreateIndex: true
  },
  (error) => {
    if (!error) {
      console.log("connected to the mongoDB");
    } else {
      console.log("connection to mongoDB failed \n" + error);
    }
  }


module.exports = database;
