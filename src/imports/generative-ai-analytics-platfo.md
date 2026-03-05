Create a complete **full-stack Generative AI Analytics Platform** with BOTH a frontend and backend generated as real project files.

The project must include:

• A **React (Vite) frontend** running on **http://localhost:5173**
• A **Node.js + Express backend** running on **http://localhost:3001**
• A **MongoDB database** running locally

The AI must generate **ALL backend files, frontend files, folder structure, and working code**.

Do NOT skip backend generation.

Do NOT use Supabase, Firebase, serverless functions, or cloud backends.

The entire system must run locally.

---

DATABASE

Use MongoDB with this exact URI:

mongodb://localhost:27017/intelliboard

Use **Mongoose** for database interaction.

Two types of data must be stored in MongoDB.

---

USERS COLLECTION

Store authentication data.

Fields:

name
email
password
createdAt

---

DATASETS COLLECTION

Store uploaded CSV dataset information.

Fields:

filename
uploadedAt
columnNames
totalRows
rows (array containing parsed CSV rows)

---

ACCESS CONTROL

Only the following email is allowed to access the platform:

[ramanilakshmipriya26@gmail.com](mailto:ramanilakshmipriya26@gmail.com)

During signup or login the backend must check the email.

If the email is not exactly this value, reject the request with:

status: 403

response:

{
"success": false,
"message": "Access denied. Unauthorized email."
}

Only the authorized email can:

sign up
log in
upload CSV files
access dashboard
use AI chatbot

This validation must be implemented in the backend.

---

BACKEND

Generate a complete Node.js + Express backend.

Backend must run on:

PORT 3001

Use these middleware:

express.json()
cors (allow origin http://localhost:5173)
multer (for CSV file uploads)
csv-parser (for parsing CSV rows)

When MongoDB connects successfully print:

MongoDB Connected Successfully

When the server starts print:

Server running on http://localhost:3001

---

BACKEND FOLDER STRUCTURE

backend/

server.js
.env

config/
db.js

models/
User.js
Dataset.js

controllers/
authController.js
csvController.js
chatController.js

routes/
authRoutes.js
dataRoutes.js

---

BACKEND API ROUTES

GET /test

Return JSON confirming backend is running.

Example response:

{
"message": "Backend running successfully"
}

---

POST /signup

Input fields:

name
email
password

Steps:

Check if email equals:

[ramanilakshmipriya26@gmail.com](mailto:ramanilakshmipriya26@gmail.com)

If not equal → return 403.

If valid → store user in MongoDB Users collection.

Return success JSON.

---

POST /login

Input:

email
password

Check:

Email must equal authorized email.

Validate user credentials using MongoDB.

Return login success response.

---

POST /upload-csv

Upload a CSV dataset file.

Steps:

1 Accept file using multer
2 Parse CSV rows using csv-parser
3 Extract column names
4 Count number of rows
5 Store dataset inside MongoDB DATASETS collection

Save:

filename
uploadedAt
columnNames
totalRows
rows

Return dataset summary JSON.

---

GET /datasets

Return list of datasets stored in MongoDB.

---

POST /chat

AI chatbot endpoint.

Input:

user question related to dataset.

The backend should analyze dataset rows stored in MongoDB and generate insights such as:

dataset summary
column statistics
averages
minimum values
maximum values
trends
anomalies

Return AI response JSON.

---

FRONTEND

Generate a **React (Vite) frontend**.

Frontend must run on:

http://localhost:5173

Frontend must communicate with backend APIs using:

http://localhost:3001

Use **axios or fetch** for API calls.

---

FRONTEND PAGES

Signup Page

Fields:

name
email
password

Send request to:

POST http://localhost:3001/signup

---

Login Page

Fields:

email
password

Send request to:

POST http://localhost:3001/login

---

CSV Upload Page

Allow user to upload CSV dataset.

Send file to:

POST http://localhost:3001/upload-csv

Display dataset summary after upload.

---

Dashboard Page

Dashboard must visualize uploaded dataset.

Charts must represent the uploaded CSV data.

Dashboard components:

total rows card
dataset statistics
dynamic charts
data table

Charts must automatically generate based on numeric columns.

Use chart libraries such as:

Chart.js
or
Recharts

Charts include:

bar chart
line chart
pie chart
table view

Charts must change depending on uploaded CSV dataset.

---

AI CHATBOT PAGE

Create a chatbot interface similar to ChatGPT.

User enters questions about the dataset.

Example questions:

Summarize this dataset
Show average values
Which column has highest values
Find anomalies

Send question to:

POST http://localhost:3001/chat

Display responses as a chat conversation.

---

UI DESIGN

Modern analytics dashboard layout.

Include:

sidebar navigation
dashboard cards
charts
tables
chatbot interface

---

PROJECT OUTPUT

Generate ALL project files.

Backend code files.
Frontend React components.
MongoDB models.
Routes and controllers.
CSV upload logic.
Authentication logic.
Dataset storage logic.
Dashboard visualization components.
AI chatbot interface.

---

PROJECT RUNNING

Backend:

cd backend
npm install
node server.js

Frontend:

cd frontend
npm install
npm run dev

The entire system must run locally without errors and the backend must be fully generated.
