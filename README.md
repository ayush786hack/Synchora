# 🚀 Synchora

Synchora is a real-time video conferencing platform built using React, Node.js, MongoDB, Socket.IO, and WebRTC. It allows users to create and join meetings, communicate through live audio/video streams, and maintain meeting history for future reference.

---

## 🌟 Features

- User Authentication (Register/Login)
- Real-Time Video Conferencing
- WebRTC Peer-to-Peer Communication
- Socket.IO Signaling Server
- Create & Join Meeting Rooms
- Meeting History Tracking
- Secure JWT Authentication
- Responsive User Interface
- MongoDB Database Integration

---

## 🛠 Tech Stack

### Frontend
- React.js
- Vite
- React Router DOM
- Axios
- Socket.IO Client
- WebRTC
- CSS/Tailwind CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Socket.IO

---

# 📂 Project Structure

```bash
synchora
│
├── frontend
│   ├── public
│   │
│   └── src
│       ├── components
│       │
│       ├── pages
│       │   ├── Landing.jsx
│       │   ├── Home.jsx
│       │   ├── VideoMeet.jsx
│       │   ├── History.jsx
│       │
│       ├── context
│       │   └── AuthContext.jsx
│       │
│       ├── utils
│       │
│       ├── App.jsx
│       ├── main.jsx
│       └── index.css
│
├── backend
│   ├── controllers
│   │   ├── authController.js
│   │   ├── meetingController.js
│   │   └── historyController.js
│   │
│   │
│   ├── models
│   │   ├── User.js
│   │   ├── Meeting.js
│   │   └── MeetingHistory.js
│   │
│   ├── routes
│   │
│   │
│   ├── app.js
│   └── .env
│
└── README.md
```

---

# ⚙️ Installation

## 1. Clone Repository

```bash
git clone https://github.com/your-username/synchora.git
cd synchora
```

---

## 2. Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

## 3. Backend Setup

```bash
cd backend

npm install

npm run dev
```

Backend runs on:

```bash
http://localhost:8000
```

---

# 🔑 Environment Variables

Create a `.env` file inside the backend folder:

```env
PORT=8000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

---

# 🗄 Database Models

## User Model

```js
{
  username: String,
  password: String,
  createdAt: Date
}
```

## Meeting Model

```js
{
  roomCode: String,
  host: ObjectId,
  createdAt: Date
}
```

## Meeting History Model

```js
{
  userId: ObjectId,
  meetingCode: String,
  joinedAt: Date
}
```

---

# 🔌 API Endpoints

## Authentication

### Register

```http
POST /api/auth/register
```

### Login

```http
POST /api/auth/login
```

---

## Meetings

### Create Meeting

```http
POST /api/meeting/create
```

### Join Meeting

```http
GET /api/meeting/:roomCode
```

---

## History

### Save Meeting History

```http
POST /api/history/add
```

### Get User History

```http
GET /api/history/user
```

---

# 🎥 WebRTC Workflow

```text
User A
   │
   ▼
Socket.IO Server
   ▲
   │
User B

1. User joins room
2. Offer created
3. Offer sent through Socket.IO
4. Answer received
5. ICE candidates exchanged
6. Peer connection established
7. Audio & Video streams shared
```

---

# 🚀 Future Enhancements

- Screen Sharing
- Group Video Calls
- Chat Messaging
- History
- End-to-End Encryption

---

# 👨‍💻 Author

Ayush Tiwari

B.Tech CSE Student

---



---

## ⭐ If you like this project, give it a star on GitHub!
