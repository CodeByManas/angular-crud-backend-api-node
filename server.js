const express = require("express");
const cors = require("cors");
const { urlencoded } = require("express");
const app = express();
const funct = require("./model"); // linked database schema file
const PORT = 8080;
require("./db"); // linked database connection file
const jwt = require('jsonwebtoken');
// var cookieParser = require('cookie-parser');



let corsOption = {
  origin: "http://localhost:4200",
};

app.use(cors(corsOption));
app.use(express.json());
app.use(urlencoded({ extended: true }));
// app.use(express.localstorage());
// app.use(cookieParser(config.cookieSecret))

// GET ALL USERS
app.get("/get", async (req, res) => {
  // res.json({'Message': 'Hello from server'});

  const getAllUsers = await funct.userData.find({});
  try {
    res.status(200).send(getAllUsers);
  } catch (err) {
    res.status(500).send(err);
  }
});

// GET A PARTICULAR USER BY ID
app.get("/get/:id", async (req, res) => {
  let userEnterId = req.params.id;
  let result = await funct.userData.findById({ _id: userEnterId });
  try {
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

// CREATE A NEW USER
app.post("/post", async (req, res) => {
  try {
    // validation with existing data
    let enteredContact = req.body.contact;
    let enteredEmail = req.body.email;
    let result1 = await funct.userData.findOne({ contact: enteredContact });
    let result2 = await funct.userData.findOne({ email: enteredEmail });

    if (result1 && result2) {
      res
        .status(400)
        .send("Entered email & contact are already exists in database");
    } else if (result1) {
      res.status(400).send("Entered contact is already exists in database");
    } else if (result2) {
      res.status(400).send("Entered email is already exists in database");
    } else {
      const newUser = new funct.userData({
        name: req.body.name,
        contact: req.body.contact,
        email: req.body.email,
        dob: req.body.dob,
        gender: req.body.gender,
        maritalstatus: req.body.maritalstatus,
        address: req.body.address,
      });
      await newUser.save();
      res.status(201).send(newUser);
    }
  } catch (err) {
    res.status(400).send(err);
  }
});



// post login credentials
app.post("/register", async (req, res) => {
  try {
    // get user entered email and password
    let enteredEmail = req.body.email;
    let enteredPassword = req.body.cpwd;
    //  store if its already there in database
    let isEmail = await funct.loginCredential.findOne({ email: enteredEmail });
    let ispassword = await funct.loginCredential.findOne({
      password: enteredPassword,
    });


    // check the condition
    if (isEmail && ispassword) {
      res
        .status(400)
        .send("Entered email & password are already exists in database");
    } else if (isEmail) {
      res
        .status(400)
        .send("Entered email is already exists in database.Choose another");
    } else if (ispassword) {
      res
        .status(400)
        .send("Entered password is already exists in database.Choose another");
    } else {
      // let tfortoken = jwt.sign({
      //   exp: Math.floor(Date.now() / 1000) + (60 * 60),
      //   data: 'foobar'
      // }, 'secret');
      // console.log(tfortoken, 'got a token');

      const loginCredential = new funct.loginCredential({
        name: req.body.name,
        contact: req.body.contact,
        email: req.body.email,
        password: req.body.cpwd,
        token: tfortoken
      });
      await loginCredential.save();
      res.status(200).send(loginCredential);
    }
  } catch (err) {
    // res.status(500).send(err);
    res.json({ Message: err });
  }
});





// get individual login credentials
app.get("/get-login/:email/:password", async (req, res) => {
  try {
    let enteredEmail = req.params.email;
    let enteredPassword = req.params.password;
    let isEmail = await funct.loginCredential.findOne({
      email: enteredEmail,
    });
    let isPassword = await funct.loginCredential.findOne({
      password: enteredPassword,
    });

    if(!isEmail && !isPassword){
      res
        .status(400)
        .send("Entered email & password are not found");
    }else if(!isEmail){
      res
        .status(400)
        .send("Entered email is wrong");
    }else if(!isPassword){
      res
        .status(400)
        .send("Entered password is wrong");
    }else{
      res.status(200).send(isEmail);      
    }
    
  } catch (err) {
    // res.status(500).send(err);
    res.json({ Message: err });
  }
});

// _____________________________

app.put("/update/" || "/update", async (req, res) => {
  res.json({ Message: "There must be an unique ID to update record." });
});

// UPDATE A USER BY ID
app.put("/update/:id", async (req, res) => {
  try {
    let userEnterId = req.params.id;
    await funct.userData.updateOne(
      { _id: userEnterId },
      {
        $set: {
          name: req.body.name,
          contact: req.body.contact,
          email: req.body.email,
          dob: req.body.dob,
          gender: req.body.gender,
          maritalstatus: req.body.maritalstatus,
          address: req.body.address,
        },
      }
    );
    // res.send('data has been updated successfully.')
    res.json({ Message: "Record has been updated successfully" });
  } catch (err) {
    res.send(err || "Record not updated...");
  }
});

// DELETE A USER
app.delete("/delete/:id", async (req, res) => {
  let _id = req.params.id;
  // let result = await userModel.deleteOne({_id});
  let result = await funct.userData.deleteOne({ _id }); // object destructuring
  try {
    res.json({ Message: "data has been deleted successfully" });
    console.log(`Below record has been deleted successfully ${result}`);
  } catch (err) {
    res.status(500).send(err || "something went wrong");
  }
});

// run server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});




//435796574
