# DevTinder APIs

## authRouter
- POST /signup
- POST /login
- POST /logout

## profileROuter
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

## connectionRequestRouter
- POST /request/send/:status/:userId
- POST /request/review/:status/:requestId

- Status = for send [interested, ignored], for receive[accepted, rejected]

## userRouter
- GET /user/connections
- GET /user/requests/received
- GET /user/feed - Gets you the profiles of other users on platform