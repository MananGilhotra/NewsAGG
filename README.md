# 📰 NewsAgg — Smart News Aggregator

A full-stack real-time news aggregator built with React, Node.js, Express, MongoDB, and Socket.io. Features a premium dark-themed UI with glassmorphism, smooth animations, and live WebSocket-powered search.

![Tech Stack](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=flat&logo=socket.io&logoColor=white)

---

## ✨ Features

- **REST API**: Full CRUD endpoints for articles
- **Real-Time Search**: WebSocket-powered instant search with Socket.io
- **MongoDB Atlas**: Cloud database with duplicate prevention
- **Premium UI**: Dark theme, glassmorphism, particle animations
- **Responsive Design**: Works on all devices
- **Framer Motion**: Smooth page transitions and scroll animations
- **Category Filtering**: Filter articles by 8 categories
- **Trending Section**: Top articles by view count
- **Skeleton Loaders**: Animated loading states

---

## 🏗️ Project Structure

```
├── backend/
│   ├── config/db.js           # MongoDB connection
│   ├── controllers/           # Route handlers
│   ├── models/Post.js         # Mongoose schema
│   ├── routes/postRoutes.js   # REST API routes
│   ├── services/postService.js # Business logic
│   ├── socket/searchHandler.js # WebSocket handler
│   └── server.js              # Entry point
├── frontend/
│   ├── src/
│   │   ├── components/        # React components
│   │   ├── hooks/useSocket.js # Socket.io hook
│   │   ├── services/api.js    # API client
│   │   └── styles/index.css   # Design system
│   └── index.html
├── .gitignore
└── README.md
```

---

## 🚀 Setup Instructions

### Prerequisites
- Node.js 18+
- MongoDB Atlas account (or local MongoDB)
- npm or yarn

### 1. Clone the repository
```bash
git clone <repository-url>
cd internship_Assignment
```

### 2. Backend Setup
```bash
cd backend
cp .env.example .env
# Edit .env with your MongoDB Atlas URI
npm install
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

The frontend runs on `http://localhost:5173` and the backend on `http://localhost:5000`.

---

## 🔐 Environment Variables

### Backend (`backend/.env`)

| Variable     | Description                  | Example                                      |
|-------------|------------------------------|----------------------------------------------|
| `PORT`       | Server port                  | `5000`                                       |
| `MONGO_URI`  | MongoDB Atlas connection URI | `mongodb+srv://manan:Manan%402005@cluster0.qib5asg.mongodb.net/newsAggregator?retryWrites=true&w=majority&appName=Cluster0` |
| `CLIENT_URL` | Frontend URL (for CORS)      | `http://localhost:5173`                      |

### Frontend (`frontend/.env`)

| Variable           | Description          | Example                    |
|--------------------|----------------------|----------------------------|
| `VITE_API_URL`     | Backend API base URL | `http://localhost:5000/api` |
| `VITE_SOCKET_URL`  | WebSocket server URL | `http://localhost:5000`     |

---

## 📡 API Documentation

### REST Endpoints

| Method | Endpoint              | Description                              |
|--------|-----------------------|------------------------------------------|
| GET    | `/api/posts`          | Get all articles                         |
| GET    | `/api/posts/:id`      | Get single article by ID                 |
| GET    | `/api/posts/trending` | Get top 10 trending articles             |
| GET    | `/api/posts/featured` | Get featured articles                    |
| POST   | `/api/fetch-posts`    | Fetch & store posts from JSONPlaceholder |

### WebSocket Events

| Event           | Direction       | Description                    |
|-----------------|-----------------|--------------------------------|
| `search`        | Client → Server | Send search query string       |
| `searchResults` | Server → Client | Receive filtered results       |

---

## 🌐 Deployment

- **Frontend**: Vercel
- **Backend**: Vercel / Railway / Render

---

## 🛠️ Tech Stack

| Layer      | Technology                    |
|-----------|-------------------------------|
| Frontend  | React, Vite, Framer Motion   |
| Backend   | Node.js, Express             |
| Database  | MongoDB Atlas, Mongoose      |
| Real-Time | Socket.io                    |
| Styling   | Vanilla CSS, Glassmorphism   |

---

## 📝 License

MIT License
