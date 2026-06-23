"use server";

import { createNhostClient } from "@/lib/nhost";
import { avatarUploadSchema } from "@/schemas/user/profile/updateAvatar/avatar.schema";
import { updateProfileSchema } from "@/schemas/user/profile/updateProfile/Profile.schema";


/**
 * Server Action to handle BlogForge User Registration
 * @param {Object} prevState - Necessary if using React's useActionState / useFormState hook
 * @param {FormData} formData - The native form data object from the frontend HTML form
 */

export async function uploadAvatar() {
   // 1. Extract raw fields from incoming Form Data
     const file = formData.get("file");

     if (!file || typeof file === "string") {
     return { success: false, errors: { file: "Please select a valid image file." } };
     }

     // 2. Map the Next.js File object to match your Joi Schema expectations
     const rawData = {
        file: {
          mimetype: file.type,
          size: file.size,
          originalname: file.name,
          // Convert the file stream to a buffer for Joi validation and server processing
          buffer: Buffer.from(await file.arrayBuffer()), 
        }
     };
   
     // 3. Validate data with Joi
     const { error, value } = avatarUploadSchema.validate(rawData, {
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
       };
     }
   
     // 4. Initialize Nhost client instance on the server
     const nhost = await createNhostClient();
   
     // 5. Pass the original Next.js File object to Nhost Storage
     const { error: nhostError } = await nhost.storage.uploadFiles({
       file: file,
       bucketId: "avatars",
     });
   
     if (nhostError) {
       return { success: false, errors: { form: nhostError.message } };
     }
   
     return { success: true, message: "Avatar uploaded successfully!" };
}


// The GraphQL mutation to update the user's custom fields in the database
// Adjust "update_users_by_pk" if your custom table is named something else, like "profiles"
const UPDATE_PROFILE_MUTATION = `
  mutation UpdateUserProfile(
    $id: uuid!
    $username: String
    $name: String
    $dob: date
    $gender: String
    $bio: String
    $website: String
  ) {
    update_users_by_pk(
      pk_columns: { id: $id },
      _set: {
        username: $username,
        name: $name,
        dob: $dob,
        gender: $gender,
        bio: $bio,
        website: $website
      }
    ) {
      id
    }
  }
`;

export async function uploadProfileDetails(prevState, formData) {
  // 1. Extract raw fields from incoming Form Data
  // We use .get() for each field. If a field isn't in the form, it will safely be null.
  const rawData = {
    username: formData.get("username"),
    name: formData.get("name"),
    dob: formData.get("dob"),
    gender: formData.get("gender"),
    bio: formData.get("bio"),
    website: formData.get("website"),
  };

  // Strip out any null/empty values so we only validate and update what the user ACTUALLY sent
  const dataToValidate = Object.fromEntries(
    Object.entries(rawData).filter(([_, v]) => v != null && v !== ""),
  );

  // 2. Validate data with your Joi schema
  const { error, value } = updateProfileSchema.validate(dataToValidate, {
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
      values: rawData, // Return values so the frontend can repopulate the form inputs
    };
  }

  // 3. Initialize Nhost client instance on the server
  const nhost = await createNhostClient();

  // 4. Ensure the user is actually authenticated before doing database operations
  const session = nhost.auth.getSession();
  const userId = session?.user?.id;

  if (!userId) {
    return {
      success: false,
      errors: { form: "You must be logged in to update your profile." },
    };
  }

  // 5. Send the validated data to Hasura via GraphQL
  try {
    const { data, error: graphqlError } = await nhost.graphql.request(
      UPDATE_PROFILE_MUTATION,
      {
        id: userId,
        ...value, // Spread the cleaned, validated Joi values as GraphQL variables
      },
    );

    if (graphqlError) {
      console.error("GraphQL Update Error:", graphqlError);
      return {
        success: false,
        errors: { form: "Failed to update database. Please try again." },
      };
    }

    return { success: true, message: "Profile updated successfully!" };
  } catch (err) {
    console.error("Unexpected error updating profile:", err);
    return {
      success: false,
      errors: { form: "An unexpected server error occurred." },
    };
  }
}
