// Revise 1

- Create a Repository
- Initialize the Repository
- node_modules, package.json, package-lock.json
- What are dependencies
- What is the use of "-g" while npm install
- Difference between caret and tilde (^ vs ~)
- Install Express
- Create a Server
- Listen to Port 3000
- Write Request Handler for /test and /hello
- Install Nodemon and update scripts inside package.json

- Initialize Git 
- .gitignore
- Create a remote repo in github
- Push all code to remote origin

- Play with routes and its extension ex /hello /hello/2 /
- Order of routes matter a lot
- Install PostMan App and make a workspace/collection > test Get Api call
- Write logic to handle GET, POST, PUT, PATCH, DELETE API calls and test them on Postman
- Explore routing and use of ?, +, *, (), and regex in the routes
- Reading the query params  in the routes
- Reading the dynamic routes

- Play with multiple route handler
- next()
- next function and errors along with res.send()
- app.use("/route", rH1, [rH2, rH3], rH4, rH5)
- What is middleware 
- How express JS basically handles requests behind the scenes
- Difference between app.use and app.all
- Write a dummy auth middleware for admin
- Write a dummy auth middleware for all user routes, except /user/login
- Error Handling using app.use()

- Create a free cluster on mongodb official website (Mongo Atlas)
- Install Mongoose Library 
- Connect your application to the database "connection-url"/devTinder
- Call the connectDB function and connect to databse before starting application on server
- Create a userSchema and user model
- Create POST /signup API to add data to the database
- Push some documents using API calls from postman
- Error Handling using try and catch

- Difference b/w json and javascript object
- Add the express.json() middleware to your app
- Make your signup dynamic to receive data from end user