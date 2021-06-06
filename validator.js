const Joi = require("@hapi/joi");
const jwt = require("jsonwebtoken");

//validate signup details
const signupValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().min(8).required().email(),
    password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
  });
  return schema.validate(data);
};

//validate JWT
const verifyToken = (req, res, next) => {
  const token = req.header("authtoken");
  if (token == null) return res.status(401).json({ error: "Access denied" });
  try {
    const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log("VERIFIED : ", verified.name);

    req.user = verified;
    next();
  }
  catch (err) {
    res.status(400).json({ error: "Invalid" });
  }
};

module.exports = { signupValidation, verifyToken };
