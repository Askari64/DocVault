import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDB, disconnectDB } from "./config/db.js";
import { clerkMiddleware, clerkClient, getAuth } from "@clerk/express"

const PORT = process.env.PORT || 5000;
const app = express();

//1. Database Connection
connectDB();

//2. CORS Configuration
app.use(cors({
  origin: ["http://127.0.0.1:5173", "http://localhost:5173"]/*We will change this to frontend url */,
  methods: ["GET", "POST", "PATCH", "DELETE"] /*Allowing only these methods */,
  credentials: true /*Allowing cookies */,
}))

// 3. Body Parsing Middleware
app.use(express.json());
app.use(express.urlencoded());

//4. Authentication Middleware (Clerk Middleware will go here)

//5. API Routes will go here
//WIP
// Use `getAuth()` to protect a route based on authentication status
app.get('/protected', clerkMiddleware ,(req, res) => {
  const auth = getAuth(req)

  if (!auth.isAuthenticated) {
    return res.status(401).send('User not authenticated')
  }

  return res.json(auth)
})

app.get('/', (req,res) => {
  res.send('Server running')
})


const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// ---------------------------------------------------------
// Graceful Shutdown & Error Handling
// ---------------------------------------------------------

// Handle Unhandled Promise Rejections
process.on("unhandledRejection", async (error) => {
  console.error(`Unhandled Rejection: ${error}`);
  server.close(async () => {
    await disconnectDB();
    process.exit(1);
  });
});

//Handle Uncaught Exceptions
process.on("uncaughtException", async (error) => {
  console.error(`Unhandled Exception: ${error}`);
  await disconnectDB();
  process.exit(1);
});

// Graceful Shutdown

process.on("SIGTERM", async () => {
  console.log("Terminate Signal recieved. Shutting down gracefully");
  server.close(async () => {
    await disconnectDB();
    process.exit(0);
  });
});