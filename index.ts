import { getMeshSDK } from "./.mesh/index";

async function test() {
  const sdk = getMeshSDK();

  try {
    const { me } = await sdk.me_query();
    console.log(me.createdAt);
  } catch (error) {
    console.log(error);
  }
}
test();
