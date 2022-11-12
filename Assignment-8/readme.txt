Node, Mongo, and Express (No need for UI, you can run the APIs on postman). Use bcrypt for password security.

Create a user which takes 3 parameters full name, email and password. Enforce strong password rule and add validation for email and full name.
API Endpoint:

POST: /user/create – User creation with a meaningful message if the user email or password is invalid)

Update the user details (full name and password only). Email should not get updated at any point. Proper error msg should be thrown if user is not present in the database.
API Endpoint:

PUT: /user/edit – Add validations for full name and password

Delete the user by taking the user's email as input
Api Endpoint:

DELETE: /user/delete

Get all the user's full name, email addresses and passwords stored in the database
API Endpoint:

GET: /user/getAll