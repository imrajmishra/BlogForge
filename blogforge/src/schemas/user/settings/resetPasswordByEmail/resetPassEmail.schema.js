import Joi from "joi";

export const resetPassEmailSchema = Joi.object({
  // 1. Email: The only strictly required field
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: true } }) // Validates proper email format (e.g., user@domain.com)
    .required()
    .trim()
    .lowercase() // Standardize the email format before passing it to Nhost
    .messages({
      "string.email": "Please provide a valid email address.",
      "any.required": "Email is required to reset your password.",
    }),

  // 2. Redirect URL (Optional): If you need to tell Nhost where to send the user after clicking the email link
  options: Joi.object({
    redirectTo: Joi.string()
      .uri({ scheme: ["http", "https", "myapp"] }) // Allow web URLs or custom app schemes
      .optional()
      .messages({
        "string.uri":
          "The redirect URL must be a valid web address or app link.",
      }),
  }).optional(),
});

module.exports = { resetPassEmailSchema };
