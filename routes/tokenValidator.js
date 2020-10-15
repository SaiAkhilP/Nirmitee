const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.header("authtoken");
  if (token == null) return res.status(401).json({ error: "Access denied" });
  try {
    const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log(verified);

    req.user = verified;
    next();
  } catch (err) {
    // console.log("Token : ", token);
    // console.log("ERROR : ", err);
    res.status(400).json({ error: "Invalid" });
  }
};
module.exports = verifyToken;
