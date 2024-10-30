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
- API - Get user by email
- API - Get all the users from the database
- Create a delete User API
- Difference b/w PATCH and PUT
- API - Update User
- Explore mongoose doc for update and options 
- API - Update the user data by email

- Explore schemaType options from the documentation
- add required, unique, lowercase, min, minLength, trim
- Add default
- Create a custom validate function for gender
- Improve the DB schema - PUT all appropriate validations on each field in Schema
- Add timestamps to the user schema
- Add API level validation on Patch Request and signup post API
- Add API validation for each field
- Install Validator 
- Explore Validator Library Function and use validator for email, password, url 

- Validate data in signup API
- Install bcrypt library
- Create a passwordHash using bcrypt.hash & save the user with encrypted password
- Create login API
- Compare password and throw errors if email or password is invalid

- Install cookie parser add in middleware
- Send dummy cookie to user
- Create GET /profile api and check if you get the cookie back
- Install jsonwebtoken 
- In login API , after email and pass validation send it back to the user in cookie
- Read the cookies inside your profile API and find the logged in User
- userAuth Middleware
= Add the userAuth Middleware in profile API and a new sendConnectionRequest API
- Set the expiry of JWT token and cookies to 7 days 
- Create userSchema methods to get JWT and validation of password

- Create a List of API's you can think in Dev Tinder
- Group mutiple routes uder respective routers
- Read documentation for express.ROuter
- Create routes folder fr managing auth, profile, request routers
- Create authRouter, profileROuter, requestRouter
- Import these routers in app.js
- Logout API 
- Create /profile/edit api and test ALL API
- Create PATCH /forgotpassword api
- Forgot Password API

- Send Connection Request API
- Read About Compound Indexes