const corsOptions = {
  origin: process.env.FRONTEND_URL_NETLIFY,
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization", "auth", "x-access-token"],
};

module.exports = corsOptions;
