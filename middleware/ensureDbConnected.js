const mongoose = require("mongoose");
const mongoURL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/devopsproject";

async function reconnectIfNeeded() {
  if (mongoose.connection.readyState === 1 && mongoose.connection.db) {
    return;
  }

  await mongoose.connect(mongoURL, {
    serverSelectionTimeoutMS: 10000,
    socketTimeoutMS: 45000,
  });
}

module.exports = async (req, res, next) => {
  try {
    await reconnectIfNeeded();
    await mongoose.connection.db.admin().ping();
    return next();
  } catch (err) {
    req.flash("error", "Database is temporarily unavailable. Please try again in a moment.");
    return res.redirect("/login");
  }
};