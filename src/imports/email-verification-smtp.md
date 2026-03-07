Create an email verification system using SMTP.

Requirements:

Only four specific email IDs should be allowed to access the system.

Allowed Emails:

ramanilakshmipriya26@gmail.com

rakshanalakshmi.g.cse.2022@snsct.org

ramanesh.k.cse.2022@snsct.org

ravichandran.v.cse.2022@snsct.org

If any other email tries to sign up or log in, show an error message:
"This email is not authorized to access the system."

Signup Process
When a user enters one of the allowed emails and clicks "Sign Up":

Generate a secure random verification token.

Send a verification email using SMTP (Gmail SMTP).

The email must contain a verification link.

Example:
http://localhost:3000/verify-email?token=TOKEN_VALUE

Email Verification
When the user clicks the verification link:

Validate the token.

Mark the email as verified.

Show message:
"Email verified successfully. You can now log in."

Login Restriction
During login:

Check if the email is one of the allowed four emails.

Check if the email is verified.

If not verified:
Return message:
"Please verify your email before logging in."

Email Sending
Use SMTP with Gmail configuration:

Host: smtp.gmail.com
Port: 587
Secure: false

Send the verification email using Nodemailer.

Security

Generate a secure verification token.

Token should expire after 24 hours.

Required Features

Email verification via SMTP

Allowed email restriction (only 4 members)

Verification link system

Login allowed only after email verification