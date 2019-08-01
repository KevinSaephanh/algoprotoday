const config = {
  production: {
    // Stored inside heroku
    SECRET: process.env.SECRET,
    DATABASE: process.env.MONGODB_URI
  },
  default: {
    SECRET: "SUPERDUPERSECRETKEY",
    DATABASE: "mongodb://localhost:27017/algoDB"
  }
};

exports.get = get = env => {
  return config[env] || config.default;
};
