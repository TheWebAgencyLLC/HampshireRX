import jwt from "jsonwebtoken";

const { mongo } = useRuntimeConfig().auth;

const JWT_SECRET = mongo.secret;

export async function createJWT(email: string) {
  return jwt.sign({ email }, JWT_SECRET, {
    expiresIn: 172800,
  });
}

export function verifyToken(token: string) {
  try {
    // Use the synchronous version for simpler code
    return jwt.verify(token, JWT_SECRET); // Returns the decoded token with user info
  } catch (error) {
    throw createError({ statusCode: 401, statusMessage: "Invalid token" });
  }
}
