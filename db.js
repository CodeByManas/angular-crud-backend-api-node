const mongoose = require('mongoose');

// Atlas credentials 
const USERNAME = 'Iammanas_97'
const PASSWORD = 'hS2lNTf9IsSgwbZ5'
const DB_NAME = 'secret-db'
// --------------------------------


mongoose.connect(
    `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.82bzrue.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
    //   useFindAndModify: false,
      useUnifiedTopology: true
    }
  ).then(() => {
    console.log("Connected to the cloud DB!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });