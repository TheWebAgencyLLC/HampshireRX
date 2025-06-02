export default defineEventHandler(async (event) => {
  try {
    const headers = getHeaders(event);
    const authorization = headers.authorization;
    return verifyToken(authorization as string);
  } catch (error: any) {
    //console.log(error);
  }
});
