import { IUser } from "~/types/user";
import { requireAuth } from "~/server/utils/auth";
import { JwtPayload } from "jsonwebtoken";
// Add missing import for userSchema

export default defineEventHandler(async (event) => {
  try {
    // Destructure and validate body
    const body = await readBody(event);
    const { email, firstName, lastName, address, DOB, phone } = body;

    if (!email) {
      return createError({
        statusCode: 400,
        statusMessage: "Email is required",
      });
    }

    // Authenticate request
    const session = (await requireAuth(event)) as JwtPayload;

    // Security check: Only allow users to modify their own data unless they're an admin
    if (email !== session.email) {
      // Get the authenticated user to check if they're an admin
      const authUser = (await userSchema.findOne({
        email: session.email,
      })) as IUser;

      if (authUser?.role !== "admin") {
        return createError({
          statusCode: 403,
          statusMessage:
            "You don't have permission to modify other users' data",
        });
      }
    }

    // Verify that target user exists
    const userExists = await userSchema.exists({ email });
    if (!userExists) {
      throw createError({
        statusCode: 404,
        statusMessage: "User not found",
      });
    }

    // Use findOneAndUpdate for better performance
    const updatedUser = await userSchema.findOneAndUpdate(
      { email },
      { firstName, lastName, address, DOB, phone },
      { new: true }, // Return the updated document
    );

    // Return consistent response format
    return {
      success: true,
      message: "User updated successfully",
      data: {
        email: updatedUser?.email,
        firstName: updatedUser?.firstName,
        lastName: updatedUser?.lastName,
      },
    };
  } catch (error: any) {
    // Consistent error handling
    const statusCode = error.statusCode || 500;
    const message = error.statusMessage || error.message || "An error occurred";

    throw createError({
      statusCode,
      statusMessage: message,
    });
  }
});
