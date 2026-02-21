# AI Resume Builder - Backend API

## 📁 Folder Structure

```
backend/
├── config/
│   └── database.js       # MongoDB connection
├── controllers/
│   └── resumeController.js  # Resume business logic
├── models/
│   └── Resume.js         # Resume schema
├── routes/
│   └── resumeRoutes.js   # API routes
├── .env                  # Environment variables
├── .gitignore
├── package.json
└── server.js             # Main server file
```

## 🚀 Getting Started

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the backend directory with:

```
MONGODB_URI=mongodb://localhost:27017/ai-resume-builder
PORT=5000
NODE_ENV=development
```

Or use MongoDB Atlas:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ai-resume-builder
```

### 3. Start the Server

```bash
# Development mode with auto-restart
npm run dev

# Production mode
npm start
```

Server will run on `http://localhost:5000`

## 📡 API Endpoints

### 1. Create Resume
**POST** `/api/resume`

Request Body:
```json
{
  "title": "My Resume",
  "resumeData": {
    "personalInfo": { ... },
    "experience": [ ... ],
    "education": [ ... ]
  }
}
```

Response:
```json
{
  "success": true,
  "message": "Resume created successfully",
  "data": {
    "_id": "...",
    "title": "My Resume",
    "resumeData": { ... },
    "isPublic": false,
    "createdAt": "2026-02-21T..."
  }
}
```

### 2. Get Resume by ID
**GET** `/api/resume/:id`

Response:
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "title": "My Resume",
    "resumeData": { ... },
    "isPublic": false,
    "createdAt": "2026-02-21T..."
  }
}
```

### 3. Toggle Public Status
**PATCH** `/api/resume/:id/toggle-public`

Response:
```json
{
  "success": true,
  "message": "Resume is now public",
  "data": {
    "_id": "...",
    "isPublic": true,
    ...
  }
}
```

## 🗄️ Database Schema

**Resume Model:**
```javascript
{
  title: String (required),
  resumeData: Object (required),
  isPublic: Boolean (default: false),
  createdAt: Date (default: Date.now)
}
```

## 🔧 Technologies Used

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **CORS** - Cross-Origin Resource Sharing
- **dotenv** - Environment variables management

## 📝 Notes

- Make sure MongoDB is running locally or you have access to MongoDB Atlas
- The server uses CORS to allow requests from the frontend
- All responses follow a consistent format with `success`, `message`, and `data` fields
