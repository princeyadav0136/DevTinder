const express = require("express");

const app = express();

app.use("/user", (req, res, next) => {
    console.log("Handler 1");
    // res.send("Handler 1");
    next();
}, (req, res, next) => {
    console.log("Handler 2");
    res.send("Handler 2");
    // next();
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

// use will match all the HTTP method to /hello
app.use("/hello", (req, res) => {
  res.send("hello hello hello");
});

app.listen(8000, () => {
  console.log("Server is successfully listening on Port 8000 ...");
});
