import bcrypt from "bcryptjs";

export default defineEventHandler(async (event) => {
  try {
    const { email, password, firstName, lastName, role, address, phone } =
      await readBody(event);
    const hashedPassword = bcrypt.hashSync(password, 10);
    const existingUser = await userSchema.findOne({ email });
    if (existingUser) {
      return createError({
        statusCode: 409,
        message: "User already exists",
      });
    }
    await userSchema.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      role: role || "user",
      address,
      phone,
    });
    return {
      registered: true,
      user: email as string,
    };
  } catch (error: any) {
    return createError({
      statusCode: 501,
      message: error.message,
    });
  }
});
