import { Gateway } from './Gateway';

// const USER_GATEWAY_ID = 'sid';

// function generateRandomString() {
//   let result = '';
//   const characters =
//     'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//   const charactersLength = characters.length;

//   for (let i = 0; i < 10; i++) {
//     result += characters.charAt(Math.floor(Math.random() * charactersLength));
//   }

//   return result;
// }

const testMutationsAndQueries = async () => {
  const gatewayInstance = new Gateway({
    apiKey: 'm9Y5ntNcTlwQ2LbRpYr6K_VhxJXuZJ6Q',
    token: '',
    url: 'https://develop.protocol.mygateway.xyz/graphql',
    logging: true,
  });
  try {
    await gatewayInstance.user.me();

    // await gatewayInstance.user.getSingleUser({
    //   type: UserIdentifierType.GATEWAY_ID,
    //   value: USER_GATEWAY_ID,
    // });

    await gatewayInstance.user.myDataModelsCount();

    // await gatewayInstance.user.myDataRequestTemplatesCount();
    // await gatewayInstance.user.myFinancialTransactions();
    // await gatewayInstance.user.myPDACount();
    // await gatewayInstance.user.myPDAs();
    // await gatewayInstance.user.myWallet();
    // await gatewayInstance.user.updateUser({
    //   profilePicture: 'https://fake-url.com',
    // });

    console.log('\n USER DONE \n');

    // ORGANIZATIONS
    // const { createOrganization } =
    //   await gatewayInstance.organization.createOrganization({
    //     name: 'Create sample organization',
    //     description: 'Sample organization description',
    //     username: generateRandomString(),
    //   });

    // THESE ARE WORKING FINE JUST COMMENTED THEM TO PREVENT ERROR AS THERE IS ONLY 1 USER IN ORG
    // const { addMemberToOrganization } =
    //   await gatewayInstance.organization.addMemberToOrganization({
    //     organization: { type: 'ORG_ID', value: createOrganization.id },
    //     user: { type: 'GATEWAY_ID', value: USER_GATEWAY_ID },
    //     role: 'Member',
    //   });

    // THESE ARE WORKING FINE JUST COMMENTED THEM TO PREVENT ERROR AS THERE IS ONLY 1 USER IN ORG
    // const { changeMemberRole } =
    //   await gatewayInstance.organization.changeMemberRole({
    //     organization: { type: 'ORG_ID', value: createOrganization.id },
    //     user: { type: 'GATEWAY_ID', value: USER_GATEWAY_ID },
    //     role: 'Member',
    //   });

    // THESE ARE WORKING FINE JUST COMMENTED THEM TO PREVENT ERROR AS THERE IS ONLY 1 USER IN ORG
    // const { removeMemberFromOrganization } =
    //   await gatewayInstance.organization.removeMemberFromOrganization({
    //     organization: { type: 'ORG_ID', value: createOrganization.id },
    //     user: { type: 'GATEWAY_ID', value: USER_GATEWAY_ID },
    //   });

    // const { updateOrganization } =
    //   await gatewayInstance.organization.updateOrganization({
    //     id: createOrganization.id,
    //     description: 'updated description',
    //   });

    // const { organization } = await gatewayInstance.organization.getOrganization(
    //   OrganizationIdentifierType.ORG_ID,
    //   createOrganization.id,
    // );

    // const { organizations } =
    //   await gatewayInstance.organization.getOrganizations({
    //     filter: { verified: true },
    //   });

    console.log('\n ORGS DONE \n');
  } catch (error) {
    console.error('error in testing file ', error);
  }
};

testMutationsAndQueries();
