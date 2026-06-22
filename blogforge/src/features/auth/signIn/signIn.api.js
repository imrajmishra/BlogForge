"use server";

import { createNhostClient } from "@/lib/nhost";
import { signInSchema } from "@/schemas/auth/signIn/signIn.schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";


/**
 * Server Action to handle BlogForge User Registration
 * @param {Object} prevState - Necessary if using React's useActionState / useFormState hook
 * @param {FormData} formData - The native form data object from the frontend HTML form
 */


export async function signInEmailPassword() {
  // 1. Extract raw fields from incoming Form Data
  const rawData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  // 2. Validate data with Joi
  const { error, value } = signInSchema.validate(rawData, {
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
  const { session, error: nhostError } = await nhost.auth.signInEmailPassword({
    email: value.email,
    password: value.password,
  });

  // 5. Handle Nhost backend errors
  if (nhostError) {
    return {
      success: false,
      error: { message: nhostError.message },
      values: rawData,
    };
  }

  // 6. Success Routine: Clear caches
  revalidatePath("/", "layout");

  // 7. Handle Session & Redirects Safely
  if (!session) {
    // If Nhost requires email verification, redirect to a specific notice page
    redirect("/verify-email");
  }

  // If a session exists (email verification is OFF), send them to home
  redirect("/home");
};