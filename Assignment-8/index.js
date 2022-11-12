const { validateEmail, checkPassword } = require("./validations");

const express = require("express"),
      app = express(),
      mongoose = require("mongoose"),
      bcrypt = require("bcrypt"),
      bodyParser = require("body-parser");

const saltRounds = 10;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost/assignment8", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
  name:String,  
  email: String,
  password: String,
  joined: { type: Date, default: Date.now },
});

const User = mongoose.model("user", userSchema);

// Home Page
app.get("/", (req, res) => {
  res.send("Welcome to Assignment 8 - INFO6150.");
});

// Create new user
app.post("/user/create", async (req, res) => {

  try {
    console.log('hola');
    console.log(req.body);
    let user = await User.findOne({ email: req.body.email });
    let passBool, emailBool = false;

    if (user) {
      res.status(400).send({ message: "Email Address already exists." });
    } else {

      if (validateEmail(req.body.email)) {
        // console.log("Proper email address");
        emailBool = true;
      } else {
        emailBool = false;
        res.status(400).send({ message: "Please input email address correctly! " + req.body});
      }

      if (checkPassword(req.body.password) && (req.body.password == req.body.confirm_password)) {
        passBool = true;
        console.log("Password is correct");
      } else {
        passBool = false;
        res.status(400).send({ message: "Please input password correctly!"});
      }

      if (passBool && emailBool) {
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
        const innerResult = await User.create({
          email: req.body.email,
          password: hashedPassword,
          user_type: req.body.user_type
        });
        res.status(201).send(innerResult);
      }   
    }    
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error Occurred!"});
  }

});

// Update user details
app.put("/user/edit", async (req, res) => {

  const user = await User.findOne({email: req.body.email});
  if (user) {
    const passCompare = await bcrypt.compare(req.body.password, user.password);
    if (passCompare) {
        var body = req.body;
        if (body.new_name != undefined && body.new_password != undefined) {
            if (!checkPassword(body.new_password)) {
                res.status(404).send({
                    message: `Invalid password.`
                  });
            }
            const hashedPassword = await bcrypt.hash(req.body.new_password, saltRounds);
            User.findByIdAndUpdate(user._id, { name: req.body.new_name, password: hashedPassword}, { useFindAndModify: false })
            .then(data => {
              if (!data) {
                res.status(404).send({
                  message: `Cannot update name and password with user id=${user._id}. User was not found!`
                });
              } else{
                res.send({ message: "User Name and Password updated successfully." })
              };
            })
            .catch(err => {
              res.status(500).send({
                message: "Error updating User's name and password with id=" + user._id
              });
            });
        }
        else if (body.new_name != undefined) {
            User.findByIdAndUpdate(user._id, { name: req.body.new_name }, { useFindAndModify: false })
            .then(data => {
              if (!data) {
                res.status(404).send({
                  message: `Cannot update name with user id=${user._id}. User was not found!`
                });
              } else{
                res.send({ message: "User Name updated successfully." })
              };
            })
            .catch(err => {
              res.status(500).send({
                message: "Error updating User's name with id=" + user._id
              });
            });
        }
        else if (body.new_password != undefined) {
            const hashedPassword = await bcrypt.hash(req.body.new_password, saltRounds);
            if (!checkPassword(body.new_password)) {
                res.status(404).send({
                    message: `Invalid password.`
                  });
            }
            else 
            User.findByIdAndUpdate(user._id, { name: hashedPassword }, { useFindAndModify: false })
            .then(data => {
              if (!data) {
                res.status(404).send({
                  message: `Cannot update password with user id=${user._id}. User was not found!`
                });
              } else{
                res.send({ message: "User Password updated successfully." })
              };
            })
            .catch(err => {
              res.status(500).send({
                message: "Error updating User's password with id=" + user._id
              });
            });
        }
        else
        res.status(404).send({
            message: `new_name or new_password not found`
          });
    } else {
      res.status(404).send({
        message: `wrong password`
      });
    }
  } else {
    res.status(404).send({
      message: `User was not found! Please check the email address.`
    });
  }
});

// Get all users
app.get("/user/getAll", async (req, res) => {

  User.find({}, function (err, users) {
      users.forEach(user => delete user.password);
      const newResult = users.map(item => {
        return {
          id: item._id,
          email: item.email,
          password: item.password
        }
      })
      res.send(newResult);
  });
  
});

// Delete user
app.delete("/user/delete", async (req, res) => {

  const user = await User.findOne({email: req.body.email});

  if (user) {
      User.findByIdAndDelete(user._id)
        .then(item => {
          if (!item) {
            res.status(404).send({
              message: `Cannot delete User with email=${user.email}. User not found!`
            });
          } else {
            res.send({
              message: `User with email id ${user.email} was deleted successfully!`
            });
          }
        })
        .catch(err => {
          res.status(500).send({
            message: "Could not delete User with email=" + user.email
          });
        });
    }
   else {
    res.status(404).send({
      message: `User was not found! Please check the email address.`
    });
  }
});

// Server config block
app.listen(8081, () => {
  console.log("Server started at port 8081");
});