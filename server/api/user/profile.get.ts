export default defineEventHandler(async (event) => {
  const payload = await requireAuth(event);
  //@ts-ignore
  if (payload === 408) {
    return false;
  }
  const email = (await _useSession(event)).data.email;
  return await userSchema.findOne({ email });
});
