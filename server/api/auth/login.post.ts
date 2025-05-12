import { userSchema } from "~/server/models/user.schema";
import bcrypt from "bcryptjs";
import { setAuth } from "~/server/utils/auth";

export default defineEventHandler(async (event) => {
  try {
    const { email, password } = await readBody(event);
    if (!email || !password) {
      return createError({ statusMessage: "Email or password is missing" });
    }
    const user = await userSchema.findOne({ email });
    if (!user) {
      return createError({ statusMessage: "User not found" });
    }

    const matches = bcrypt.compareSync(password, user.password);
    if (!matches) {
      return createError({ statusMessage: "Password is incorrect" });
    }

    // setAuth creates and stores token - let's capture the session data it returns
    const session = await setAuth(event, user.email);

    // Return the token along with the user info
    return {
      loggedIn: true,
      user: user.email as string,
      token: session.data.token, // Return the token from the session
    };
  } catch (error: any) {
    return createError({
      statusCode: error.statusCode || 500,
      statusMessage:
        error.message ||
        error.statusMessage ||
        error.statusText ||
        "Internal Server Error",
    });
  }
});
