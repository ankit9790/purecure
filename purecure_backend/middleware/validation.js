const Joi = require("joi");

// SIGNUP VALIDATION
exports.signupValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(3).max(100).required(),
    role: Joi.string().optional(), // customer or admin
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({
      message: "Bad request",
      error: error.details[0].message,
    });
  }

  next();
};

// LOGIN VALIDATION
exports.loginValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(3).max(100).required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({
      message: "Bad request",
      error: error.details[0].message,
    });
  }

  next();
};
