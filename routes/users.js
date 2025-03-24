const express = require('express');
const router = express.Router();


let users = [
    {
        firstName: "John",
        lastName: "wick",
        email:"johnwick@gmail.com",
        DOB:"22-01-1990",
    },
    {
        firstName: "John",
        lastName: "smith",
        email:"johnsmith@gmail.com",
        DOB:"21-07-1983",
    },
    {
        firstName: "Joyal",
        lastName: "white",
        email:"joyalwhite@gmail.com",
        DOB:"21-03-1989",
    },
];

// GET request: Retrieve all users
router.get("/",(req,res)=>{
  res.send(JSON.stringify({users}, null, 4));
});

// GET by specific ID request: Retrieve a single user with email ID
router.get("/:email",(req,res)=>{
  const email = req.params.email;
  let filtered_user = users.filter((u) => u.email === email);
  res.send(filtered_user);
});

router.get("/lastName/:lastName", (req, res) => {
    const lname = req.params.lastName;
    let filtered_lname = users.filter((u) => u.lastName === lname);
    res.send(filtered_lname);
})

function getDateFromString(strDate) {
    let [dd,mm,yyyy] = strDate.split('-');
    return new Date(yyyy + "/" + mm + "/" + dd);
}
router.get("/sort", (req, res) => {
    let sorted_users = users.sort(function(a,b) {
        let d1 = getDateFromString(a.DOB);
        let d2 = getDateFromString(b.DOB);
        return d1 - d2;
    });
    res.send(sorted_users);
})

// POST request: Create a new user
router.post("/",(req,res)=>{
    users.push({
        "firstName" : req.query.firstName,
        "lastName" : req.query.lastName,
        "email" : req.query.email,
        "DOB" : req.query.DOB
    });
  res.send("The user " + req.query.firstName + " has been added!");
});


// PUT request: Update the details of a user by email ID
router.put("/:email", (req, res) => {
    const email = req.params.email;
    let filtered_users = users.filter((u) => u.email === email);

    if(filtered_users.length > 0) {
        let filtered_user = filtered_users[0];
        let dob = req.query.DOB;
        if(dob) {
            filtered_user.DOB = dob;
        }
        let fname = req.query.firstName;
        if(fname) {
            filtered_user.firstName = fname;
        }
        let lName = req.query.lastName;
        if(lName) {
            filtered_user.lastName = lName;
        }
        users = users.filter((u) => u.email != email);
        users.push(filtered_user);
        res.send(`User with the email ${email} has been updated`);
    }
    else {
        res.send("Unable to find user!");
    }
  res.send()
});


// DELETE request: Delete a user by email ID
router.delete("/:email", (req, res) => {
  // Copy the code here
  const email = req.params.email;
  users = users.filter((u) => u.email != email);
  res.send(`User with the email ${email} has been deleted`);
});

module.exports=router;
