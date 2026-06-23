import Joi from "joi";

// We use a baseline date to ensure users meet a minimum age requirement (e.g., 13 years old)
const cutoffDate = new Date();
cutoffDate.setFullYear(cutoffDate.getFullYear() - 13);

export const updateProfileSchema = Joi.object({
  // 1. Username: Enforce safe characters and length
  username: Joi.string()
    .alphanum() // Letters and numbers only (prevents weird symbols or spaces)
    .min(3)
    .max(30)
    .optional()
    .messages({
      "string.alphanum": "Username must only contain letters and numbers.",
      "string.min": "Username must be at least 3 characters long.",
    }),

  // 2. Name: Trim accidental whitespace
  name: Joi.string()
    .min(2)
    .max(50)
    .trim() // Automatically removes leading/trailing spaces
    .optional(),

  // 3. Date of Birth: Must be a valid date and restrict underage users
  dob: Joi.date()
    .iso() // Enforces standard YYYY-MM-DD format
    .max(cutoffDate) // Fails if the date makes the user younger than 13
    .optional()
    .messages({
      "date.format": "Date of birth must be in YYYY-MM-DD format.",
      "date.max": "You must be at least 13 years old to use this service.",
    }),

  // 4. Gender: Restrict to a predefined list to keep database data clean
  gender: Joi.string()
    .valid("male", "female", "non-binary", "other", "prefer_not_to_say")
    .optional()
    .messages({
      "any.only": "Please select a valid gender option.",
    }),

  // 5. Bio: Allow empty strings if they want to delete their bio
  bio: Joi.string()
    .max(500)
    .allow("", null) // They can clear out their bio
    .optional(),

  // 6. Website/Social Link: Ensure it's an actual URL
  website: Joi.string()
    .uri({ scheme: ["http", "https"] })
    .allow("", null)
    .optional()
    .messages({
      "string.uri":
        "Please provide a valid website URL starting with http or https.",
    }),
})
  // CRITICAL: Ensure the user is actually sending at least one field to update!
  .min(1)
  .messages({
    "object.min": "You must provide at least one field to update.",
  });


