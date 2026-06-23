"use server";

import { createNhostClient } from "@/lib/nhost";
import { resetPassSchema } from "@/schemas/user/settings/resetPassword/resetPass.schema";
import { resetPassEmailSchema } from "@/schemas/user/settings/resetPasswordByEmail/resetPassEmail.schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";


/**
 * Server Action to handle BlogForge User Registration
 * @param {Object} prevState - Necessary if using React's useActionState / useFormState hook
 * @param {FormData} formData - The native form data object from the frontend HTML form
 */

// Update password by email link
export async function uploadPassByEmail() {
  // 1. Extract raw fields from incoming Form Data
  const rawData = {
    email: formData.get("email"),
  };

  // 2. Validate data with Joi
  const { error, value } = resetPassEmailSchema.validate(rawData, {
    abortEarly: false,
  });

  if (error) {
    const validationErrors = {};
    error.details.forEach((err) => {
      validationErrors[err.path[0]] = err.message;
    });

    return {
      success: false,
      errors: validationErrors,
      values: rawData,
    };
  }

  // 3. Initialize Nhost client instance on the server
  const nhost = await createNhostClient();

  // 4. Pass clean, sanitized data to Nhost Authentication
  const { error: nhostError } = await nhost.auth.sendPasswordResetEmail({
    email: value.email,
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URI}/reset-password`, // Where they go after clicking the email link
    },
  });

  if (nhostError) {
    return { success: false, errors: { form: nhostError.message } };
  }

  return { success: true, message: "Check your email for the reset link!" };
};


// Update password
export async function uploadPassword() {
  // 1. Extract raw fields from incoming Form Data
  const rawData = {
    newPassword: formData.get("newPassword"),
    confirmPassword: formData.get("confirmPassword"),
  };

  // 2. Validate data with Joi
  const { error, value } = resetPassSchema.validate(rawData, {
    abortEarly: false,
  });

  if (error) {
    const validationErrors = {};
    error.details.forEach((err) => {
      validationErrors[err.path[0]] = err.message;
    });

    return {
      success: false,
      errors: validationErrors,
      values: {},
    };
  }

  // 3. Initialize Nhost client instance on the server
  const nhost = await createNhostClient();

  // 4. Pass clean, sanitized data to Nhost Authentication
  const { error: nhostError } = await nhost.auth.changeUserPassword({
    newPassword: value.newPassword,
  });

  if (nhostError) {
    return { success: false, errors: { form: nhostError.message } };
  }

  return { success: true, message: "Password updated successfully" };
};
