const express = require("express");

const app = express();

// Handle Auth Middleware for GET, POST, .... requests
app.use("/admin", (req, res, next) => {
    const token = "xyaz";
    const isAuthorized = token === "xyz";
    isAuthorized ? next() : res.status(401).send("Unauthorized Request");
})

app.get("/admin/getAllData", (req, res) => {
    res.send("All data sent");
})

app.delete("admin/deleteAllData", (req, res) => {
    res.send("Delete All data")
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
