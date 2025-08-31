const corsOptions = {
  origin: ["https://vetfrontend.netlify.app", "http://localhost:5173"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization", "auth", "x-access-token"],
};

module.exports = corsOptions;
