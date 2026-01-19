users


POST
/api/v1/users/
Create User

Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "email": "string",
  "username": "string",
  "password": "stringst",
  "full_name": "string",
  "company": "string",
  "job_title": "string",
  "department": "string",
  "phone": "string"
}
Responses
Code	Description	Links
201	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "id": "string",
  "email": "string",
  "username": "string",
  "full_name": "string",
  "company": "string",
  "job_title": "string",
  "is_active": true,
  "is_verified": true,
  "is_premium": true,
  "subscription_tier": "string",
  "monthly_search_limit": 0,
  "monthly_searches_used": 0,
  "created_at": "2026-01-19T15:32:08.118Z",
  "is_admin": false,
  "admin_role": "string"
}
No links
422	
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
No links

GET
/api/v1/users/users/{user_id}
Get User

Parameters
Try it out
Name	Description
user_id *
string
(path)
user_id
Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "id": "string",
  "email": "string",
  "username": "string",
  "full_name": "string",
  "company": "string",
  "job_title": "string",
  "is_active": true,
  "is_verified": true,
  "is_premium": true,
  "subscription_tier": "string",
  "monthly_search_limit": 0,
  "monthly_searches_used": 0,
  "created_at": "2026-01-19T15:32:08.125Z",
  "is_admin": false,
  "admin_role": "string"
}
No links
422	
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
No links

PUT
/api/v1/users/{user_id}
Update User

Parameters
Try it out
Name	Description
user_id *
string
(path)
user_id
Request body

application/json
Example Value
Schema
{
  "username": "string",
  "full_name": "string",
  "company": "string",
  "job_title": "string",
  "department": "string"
}
Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "id": "string",
  "email": "string",
  "username": "string",
  "full_name": "string",
  "company": "string",
  "job_title": "string",
  "is_active": true,
  "is_verified": true,
  "is_premium": true,
  "subscription_tier": "string",
  "monthly_search_limit": 0,
  "monthly_searches_used": 0,
  "created_at": "2026-01-19T15:32:08.132Z",
  "is_admin": false,
  "admin_role": "string"
}
No links
422	
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
No links

POST
/api/v1/users/reset-password-request
Request Password Reset

Request a password reset by sending an OTP to the user's email.

Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "email": "user@example.com"
}
Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
"string"
No links
422	
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
No links

POST
/api/v1/users/reset-password-verify
Verify Password Reset

Verify the password reset OTP and update the user's password.

Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "email": "user@example.com",
  "otp": "string",
  "current_password": "string",
  "new_password": "stringst",
  "confirm_password": "string"
}
Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
"string"
No links
422	
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
No links

POST
/api/v1/users/create-email-otp
Create Email Otp

Create and send an email verification OTP.

Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "email": "user@example.com"
}
Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
"string"
No links
422	
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
No links

POST
/api/v1/users/verify-email
Verify Email

Verify an email using OTP.

Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "email": "user@example.com",
  "otp": "string"
}
Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
"string"
No links
422	
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
No links

POST
/api/v1/users/resend-verification
Resend Verification

Resend a verification email.

Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "email": "user@example.com"
}
Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
"string"
No links
422	
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
No links

GET
/api/v1/users/by-phone/{phone}
Get User By Phone

Get user and subscription details by phone number.

Parameters
Try it out
Name	Description
phone *
string
(path)
phone
Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
"string"
No links
422	
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
No links
authentications


POST
/api/v1/auths/login
Login

Parameters
Cancel
Reset
No parameters

Request body

application/x-www-form-urlencoded
grant_type
string | (string | null)
pattern: ^password$
password
Send empty value
username *
string
jakingsarchly@gmail.com
password *
string($password)
•••••••••••
scope
string
scope
Send empty value
client_id
string | (string | null)
string
Send empty value
client_secret
string | (string | null)($password)
••••••••
Send empty value
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://sppue2hk7i.eu-west-1.awsapprunner.com/api/v1/auths/login' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d 'grant_type=password&username=jakingsarchly%40gmail.com&password=mynameispo3&scope=&client_id=string&client_secret=********'
Request URL
https://sppue2hk7i.eu-west-1.awsapprunner.com/api/v1/auths/login
Server response
Code	Details
401
Undocumented
Error: Unauthorized

Response body
Download
{
  "message": "Email not verified. A new verification code has been sent to your email.",
  "status": "unauthorized",
  "email": "jakingsarchly@gmail.com"
}
Response headers
 access-control-allow-credentials: true 
 access-control-allow-origin: https://sppue2hk7i.eu-west-1.awsapprunner.com 
 connection: close 
 content-length: 144 
 content-type: application/json 
 date: Mon,19 Jan 2026 13:52:00 GMT 
 server: envoy 
 vary: Origin 
 x-envoy-upstream-service-time: 4500 
 x-process-time: 4.4977452754974365 
Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "id": "string",
  "email": "string",
  "username": "string",
  "full_name": "string",
  "company": "string",
  "job_title": "string",
  "is_active": true,
  "is_verified": true,
  "is_premium": true,
  "subscription_tier": "string",
  "monthly_search_limit": 0,
  "monthly_searches_used": 0,
  "created_at": "2026-01-19T15:32:08.148Z",
  "is_admin": false,
  "admin_role": "string",
  "access_token": "string",
  "refresh_token": "string",
  "token_type": "bearer",
  "session_id": "string"
}
No links
422	
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
No links

POST
/api/v1/auths/logout
Logout


Parameters
Try it out
No parameters

Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
"string"
No links

POST
/api/v1/auths/refresh
Refresh Token

Parameters
Try it out
Name	Description
refresh_token *
string
(query)
refresh_token
Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "id": "string",
  "email": "string",
  "username": "string",
  "full_name": "string",
  "company": "string",
  "job_title": "string",
  "is_active": true,
  "is_verified": true,
  "is_premium": true,
  "subscription_tier": "string",
  "monthly_search_limit": 0,
  "monthly_searches_used": 0,
  "created_at": "2026-01-19T15:32:08.152Z",
  "is_admin": false,
  "admin_role": "string",
  "access_token": "string",
  "refresh_token": "string",
  "token_type": "bearer",
  "session_id": "string"
}
No links
422	
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
No links

GET
/api/v1/auths/me
Read Users Me


Parameters
Try it out
No parameters

Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "id": "string",
  "email": "string",
  "username": "string",
  "full_name": "string",
  "company": "string",
  "job_title": "string",
  "is_active": true,
  "is_verified": true,
  "is_premium": true,
  "subscription_tier": "string",
  "monthly_search_limit": 0,
  "monthly_searches_used": 0,
  "created_at": "2026-01-19T15:32:08.155Z",
  "is_admin": false,
  "admin_role": "string"
}
No links

DELETE
/api/v1/auths/me
Delete Account


Delete the current user's account and all associated data.

Parameters
Try it out
No parameters

Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
"string"