const corsOptions = {
  origin: ["http://localhost:5173", "vetfrontend.netlify.app"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization", "auth", "x-access-token"],
};

module.exports = corsOptions;
