const jwt = require("jsonwebtoken");

module.exports.tokenMaker = (payload) => {
  try {
    const tokenPayload = {
      id: payload.toString(),
    };
    return jwt.sign(tokenPayload, process.env.JWT_SECRET, {
      expiresIn: "5m",
    });
  } catch (err) {
    throw new Error("JWT Creation Failed: ", err.message);
  }
};

module.exports.tokenChecker = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      console.error("JWT expired at:", err.expiredAt);
      return null; 
    }

    if (err.name === "JsonWebTokenError") {
      console.error("JWT error:", err.message);
      return null;
    }

    console.error("JWT Verification Error:", err.message);
    return null;
  }
};
