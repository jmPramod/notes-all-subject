import Joi from "joi";

const registerValidation = Joi.object({
  user_name: Joi.string().min(3).max(50).required().messages({
    "string.base": "User name must be a string.",
    "string.empty": "User name is required.",
    "string.min": "User name must be at least 3 character long.",
    "string.max": "User name must be at most 50 characters long.",
    "any.required": "User name is required.",
  }),

  user_secondName: Joi.string().min(1).max(50).optional().messages({
    "string.base": "Second name must be a string.",
    "string.min": "Second name must be at least 1 character long.",
    "string.max": "Second name must be at most 50 characters long.",
  }),

  user_email: Joi.string().email().required().messages({
    "string.base": "Email must be a string.",
    "string.email": "Email must be a valid email address.",
    "any.required": "Email is required.",
  }),

  user_phone: Joi.number().min(10).required().messages({
    "string.base": "Phone number must be a number/Bigint.",
    "string.min": "Phone number must be at least 10 characters long.",
    "any.required": "Phone number is required.",
  }),

  user_password: Joi.string().min(6).required().messages({
    "string.base": "Password must be a string.",
    "string.min": "Password must be at least 6 characters long.",
    "any.required": "Password is required.",
  }),

  cloudinaryPublicId: Joi.string().optional(),

  user_address: Joi.string().max(255).optional().messages({
    "string.base": "Address must be a string.",
    "string.max": "Address must be at most 255 characters long.",
  }),
  user_role: Joi.string().valid("admin", "user").optional(),
  user_pinCode: Joi.number().min(5).optional().messages({
    "string.base": "Pin code must be a number.",
    "string.min": "Pin code must be at least 5 characters long.",
  }),
});

export { registerValidation };
