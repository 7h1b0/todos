export default async function notToContainText(receiver, expected) {
  let pass = false;
  try {
    await receiver.waitForFunction(
      expected => {
        if (expected != null) {
          return !document.body.textContent
            .replace(/\s+/g, ' ')
            .includes(expected);
        }
        return false;
      },
      {
        polling: 'raf',
        timeout: 500,
      },
      expected,
    );
    pass = true;
  } catch (error) {
    pass = false;
  }
  return pass;
}
