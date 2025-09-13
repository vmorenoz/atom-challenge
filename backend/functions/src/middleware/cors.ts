import cors from 'cors';

// Configure CORS options
const corsOptions = {
  origin: true, // Allow all origins for development - in production, specify your domains
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

export default cors(corsOptions);
