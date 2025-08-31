const corsOptions = {
  origin: ["veterinariacare.netlify.app"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization", "auth", "x-access-token"],
};

module.exports = corsOptions;
