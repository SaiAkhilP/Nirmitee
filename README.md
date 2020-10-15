To run the project, run : 
  > npm install
  > npm start

Inputs are given in JSON

Register User : [POST] localhost:3000/api/user/signup
Logging In:     [POST] localhost:3000/api/user/signin

Protected Routes: Pass generated JWT token after logging in as 'authtoken' through Headers to authorise routes '/api/meeting'
Create a meeting :         [POST] localhost:3000/api/meeting/create
Edit meeting by _id :      [PUT] localhost:3000/api/meeting/edit/:id
Get list of all meetings : [GET] localhost:3000/api/meeting/get
Get meeting by _id :       [GET] localhost:3000/api/meeting/get/:id
