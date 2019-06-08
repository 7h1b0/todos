export default async function toContainSelector(receiver, expected) {
  let pass = false;
  try {
    await receiver.waitForSelector(expected);
    pass = true;
  } catch (error) {
    pass = false;
  }
  return pass;
}
