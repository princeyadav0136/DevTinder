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
- GET /user/requests/received
- GET /user/connections
- GET /user/feed - Gets you the profiles of other users on platform

/feed?page=1&limit=10 = .skip(0) & .limit(10) = 1-10
/feed?page=2&limit=10 = .skip(10) & .limit(10) = 11-20