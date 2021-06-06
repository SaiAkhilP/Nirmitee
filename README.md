# Cloth management API
A simple backend API to authenticate users using Json Web Tokens, authorize routes and perform CRUD operations. 
## Installation

Clone the repository, setup .env file and run the following commands

```
npm install
npm start
```

## Usage
#### User flow
1) Register as an user through the route:\
https://nirmitee-task.herokuapp.com/api/user/signup
2) Sign in to get authorized by using JWT with the route:\
https://nirmitee-task.herokuapp.com/api/user/signin
3) Pass the JWT value in Headers with key 'authtoken', to the authenticated routes:\
[POST] /api/clothes/new : to insert clothes data with image \
[GET] /api/clothes/get : to get list of all clothes in db \
[GET] /api/clothes/get/:id : to get clothes data by _id

#### Admin flow

1) Register as an user through the route:\
https://nirmitee-task.herokuapp.com/api/admin/signup
2) Sign in to get authorized by using JWT with the route:\
https://nirmitee-task.herokuapp.com/api/admin/signin
3) Pass the JWT value in Headers with key 'authtoken', to the authenticated routes:\
[POST] /api/clothes/new : to insert clothes data with image \
[GET] /api/clothes/get : to get list of all clothes in db \
[GET] /api/clothes/get/:id : to get clothes data by _id\
[PUT] /api/clothes/update/:id : to update clothes data by _id\
[DEL] /api/clothes/delete/:id : to delete clothes data by _id\
[GET] /api/admin/users :  to get list of all registered users\
[GET] /api/admin/users/:id : get user by _id\
[PUT] /api/admin/users/:id : update user by id\
[DEL] /api/admin/users/:id : delete user by id


## Deployment
Click [here](https://nirmitee-task.herokuapp.com) for the deployed app on Heroku.
