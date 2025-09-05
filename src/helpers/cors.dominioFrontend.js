const corsOptions = {
  origin: ["http://localhost:5177", "vetfrontend.netlify.app"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization", "auth", "x-access-token"],
};

module.exports = corsOptions;
