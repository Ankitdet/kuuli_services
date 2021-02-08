# kuulie_services

Install dependencies

# npm install

Run services locally

# npm run dev

Run services in production

# npm start

Execute the services in Postman or any client application.

# GET http://localhost:5000/token
Body :
{
username : <username>,
password : <password>
}

Response :
{
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQW5raXQiLCJwYXNzd29yZCI6IkRldHJvamEiLCJpYXQiOjE2MTI3NTY4MDgsImV4cCI6MTYxMjc2MDQwOH0.QVHMXAv97HKSx1lIRNh8QO_yLtE1YWkQXw4Xe5yCoDA",
"expiredIn": "1h"
}

# 1. POST http://localhost:5000/user/email

Header : Authorization Bearer <token>
Body :
{
emailAddress:'destination@gmail.com,
name : Name of applicant
}

# Repsonse :

{ success: 'Email successfully sent', status: 200 }
Or
{ failed: 'Failed to send email on destination', status: 500 }

# 2. GET http://localhost:5000/user/download

Header : Authorization Bearer <token>

file will donwload in 'resource'.
