import Joi from "joi";

export const signInSchema = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2 }).trim().lowercase().required().messages({
    "string.email":
      "Please provide a valid email address (e.g., user@domain.com).",
    "any.required": "Email is a required field.",
  }),

  password: Joi.string().min(8).required().messages({
    "string.min": "Password must be at least 8 characters long.",
    "any.required": "Password is required.",
  })
});



