const Joi = require("joi");

export const avatarUploadSchema = Joi.object({
  // The file object itself
  file: Joi.object({
    // 1. Restrict to specific, safe image MIME types only
    mimetype: Joi.string()
      .valid("image/jpeg", "image/png", "image/webp")
      .required()
      .messages({
        "any.only": "Invalid file type. Only JPEG, PNG, and WebP are allowed.",
      }),

    // 2. Enforce a strict max file size (e.g., 5MB = 5 * 1024 * 1024 bytes)
    size: Joi.number().max(5242880).required().messages({
      "number.max": "File is too large. Maximum size is 5MB.",
    }),

    // 3. Ensure a filename exists (though we will discard it later for security)
    originalname: Joi.string().required(),

    // 4. Ensure the buffer exists (the actual file data)
    buffer: Joi.any().required(),
  }).required(),

  // Optional: Validating additional body parameters sent with the file
  userId: Joi.string()
    .guid({ version: ["uuidv4"] }) // Nhost user IDs are UUIDs
    .required()
    .messages({
      "string.guid": "Invalid User ID format.",
    }),
});
