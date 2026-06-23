import Joi from "joi";

export const resetPassSchema = Joi.object({
  // 1. The New Password: Enforce length and security
  newPassword: Joi.string()
    .min(8) // Industry standard minimum length
    .max(128) // Prevent massive payloads (DoS protection)
    .required()
    .messages({
      "string.min": "Your new password must be at least 8 characters long.",
      "any.required": "A new password is required.",
    }),

  // 2. Confirm Password: Must exactly match 'newPassword'
  confirmPassword: Joi.any().valid(Joi.ref("newPassword")).required().messages({
    "any.only": "The passwords do not match. Please try again.",
    "any.required": "Please confirm your new password.",
  }),
});

module.exports = { resetPassSchema };
