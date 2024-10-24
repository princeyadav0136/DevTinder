const express = require("express");
const { adminAuth, userAuth } = require("./middlewares/auth");

const app = express();

// Handle Auth Middleware for GET, POST, .... requests
app.use("/admin", adminAuth);

app.get("/admin/getAllData", (req, res) => {
  res.send("All data sent");
});

app.delete("/admin/deleteAllData", (req, res) => {
  res.send("Delete All data");
});

app.get("/user", userAuth, (req,res) => {
    res.send("User Data called")
})

// // This will only handle GET call to /user
// app.get("/user", (req, res) => {
//   res.send({ firstName: "Prince", secondName: "Yadav" });
// });

// //This will only handle POST call to /user
// app.post("/user", (req, res) => {
//   console.log("Saving data to db");
//   res.send("Data saved successfully");
// });

// //this will only handle delete to /user
// app.delete("/user", (req, res) => {
//   res.send("Deleted Successfully");
// });

// // use will match all the HTTP method to /hello
// app.use("/hello", (req, res) => {
//   res.send("hello hello hello");
// });

app.listen(8000, () => {
  console.log("Server is successfully listening on Port 8000 ...");
});
