import Joi from "joi";

export const signupSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .trim()
    .lowercase()
    .required()
    .messages({
      "string.email": "Please provide a valid email address.",
      "any.required": "Email is a required field.",
    }),

  password: Joi.string().min(8).required().messages({
    "string.min": "Password must be at least 8 characters long.",
    "any.required": "Password is required.",
  }),

  // 1. Strict Username for URLs (e.g., "alex_smith99" -> no spaces allowed!)
  username: Joi.string()
    .trim()
    .lowercase() // Forces usernames to lowercase for consistent routing
    .pattern(/^[a-z0-9_-]+$/) // Only lowercase letters, numbers, underscores, and hyphens
    .min(3)
    .max(20)
    .required()
    .messages({
      "string.pattern.base":
        "Username can only contain lowercase letters, numbers, underscores (_), and hyphens (-). No spaces allowed.",
      "string.min": "Username must be at least 3 characters long.",
      "any.required": "Username is required.",
    }),

  // 2. Friendly Display Name (e.g., "Alex Smith")
  displayName: Joi.string()
    .trim()
    .pattern(/^[a-zA-Z0-9 _-]+$/)
    .min(2)
    .max(30)
    .required()
    .messages({
      "string.pattern.base":
        "Display name can contain letters, numbers, spaces, underscores, and hyphens.",
      "string.min": "Display name must be at least 2 characters.",
      "any.required": "Display name is required.",
    }),
});
