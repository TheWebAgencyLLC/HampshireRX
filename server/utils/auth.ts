import { H3Event } from "h3";
import { _useSession } from "~/server/utils/session";
import { verifyToken } from "~/server/utils/jwt";
import { logger } from "@nuxt/kit";
import { JwtPayload } from "jsonwebtoken";

interface AuthError {
  statusCode: number;
  statusText: string;
}

export async function setAuth(event: H3Event, email: string) {
  const token = await createJWT(email);
  return await _useSession(event, token, email);
}

export async function getAuth(event: H3Event) {
  return (await _useSession(event)).data.email;
}

export async function clearAuth(event: H3Event) {
  return (await _useSession(event)).clear();
}

export async function requireAuth(
  event: H3Event,
): Promise<JwtPayload | AuthError | String> {
  try {
    const token = await (await _useSession(event)).data.token;
    if (!token) {
      return createError({
        statusCode: 401,
        statusText: "Unauthorized",
      });
    }
    return verifyToken(token);
  } catch (e: any) {
    console.error(e.StatusText || e.message || e.statusMessage);
    return createError({
      statusCode: 408,
      statusText: e.statusText || e.message,
    });
  }
}
