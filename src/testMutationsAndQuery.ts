import {
  Gateway,
  OrganizationIdentifierType,
  UserIdentifierType,
} from './Gateway';

const USER_GATEWAY_ID = 'sid';

function generateRandomString() {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;

  for (let i = 0; i < 10; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

const testMutationsAndQueries = async () => {
  const gatewayInstance = new Gateway({
    apiKey: 'm9Y5ntNcTlwQ2LbRpYr6K_VhxJXuZJ6Q',
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm90b2NvbF9pZCI6Ijk1NWFmYjk3LTBkMGQtNDExNy1iMzYwLTBiMjc5ZGJhNmVmYSIsInByb3RvY29sX2hhc2giOiIyYWJkNmFlYzMyZDBkOTk0NzhjYTM2N2E4MjAzNWRkNjVjZmU4YzhkZWY2MzlhZTllOGZjMGRlMGQwYTZlZDQ2ZmI5MGM3Y2EwNmU1ZjZjNTg0ZDI3ODRkZmQ2ODQwYjUiLCJwcm90b2NvbF93YWxsZXQiOiI2NTY4NTkzMWEzN2YzMDg1ZGM3YzBmYjgiLCJwcm90b2NvbF9zaWduZXIiOiJkYzMyZjM1My01OWM4LTRjYTgtODg2YS1kOTFmNGI0MmU5YjkiLCJhdXRoIjp7ImlkIjoiYWY5YTdmNDQtZTllMS00Mzk5LWI0NDItYjE5NDEwOWU4MzhlIiwidHlwZSI6IldBTExFVCJ9LCJjcnlwdG8iOnsicHVibGljUGVtIjoiLS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS1cclxuTUlJQ0lqQU5CZ2txaGtpRzl3MEJBUUVGQUFPQ0FnOEFNSUlDQ2dLQ0FnRUEydEU3M254QU9TazRUQ0FWeElFSVxyXG5LVGpGazZNS3YrejJvRys4eDBpekY1RndZdDNXWXNQSk9wR2kwclZ4RCtTUTU3eloyLzZZTkgyRjQxRGFBV04zXHJcbkJQdWEyWHlvb09RaFkxL1N5a3pHV3JidWJxRThOQ1lQK3ZyT1A0SjNQMk8vUzc3Z0dFczdxRk92YzBHQlZpc1dcclxuRUY3bk9xNitmVCs5UVNWWDFHTFhUcWpKN2lCMXpDQXJiVjNVZkNGUkR1V3RlRVlIT1BhSUlXamVUZjVVTlFxclxyXG5NNnRQckQyYmE5UkpXcWpHeTU4N0I0NWt0clBtQTUvaXhhY0tWUFoydVhiekV5UWdJRDEzVzI4TkZUa0pMZlE1XHJcbnlsTWNKNkJqM0QrU3U5b29aZ09LYTA5OUw4dWowN3RUWmNaczgvenRnaTVIYUpFeVdsVGFOaTNFd3FDb2FhQTZcclxuTU9uUERGRlRacDZxYW5SN1FERUZHdmdDTE9WU0xYTVdsRVB5am52Zk81SHB5UjFyejBGdDRnTFZmOVBQTEgyTVxyXG40UDJhYmFxRnJ1L2pKNjVBbkxwb3dFbFhqQ0NUamw5TmEvKzZ0K0JTaXA5bWxQblFWVS9GV0pXQ0oyRUN6VHZXXHJcbkF6MDFsMXZoc01Lb1J1Mmw5VzkwblNNNUFQQ3VvU21yM2pHb2JhajZ2ZThEcXVUT1lmRjVnbHhFb0dxQkJFWDRcclxubXkxalpJbVdad3lKZjFHR1RLbFpyd1pQZHFEZU5WSFdYdm1jS2xHczFTUlkyM3ZvRyt0MlYzZ1l0cFpRTkdSeFxyXG5TcDFtTFJIYlRiTW8wMzVkL0hKWTBvZkFYQmo2TEV4R29JdG9Yamk4QWJmalVVamRpWW5jc0NQWjJVZDJvU2RFXHJcbmhKOUkxWW1sQXQvV3Y5Z0ZFRnFaQU9NQ0F3RUFBUT09XHJcbi0tLS0tRU5EIFBVQkxJQyBLRVktLS0tLVxyXG4ifSwidHlwZSI6ImF1dGhfdG9rZW4iLCJpYXQiOjE3MDQ2OTI4MDF9.fNehsLZBIOVcFgLMx01DcKs2F1HR4sIVa7d2QeTVd9o',
    url: 'https://develop.protocol.mygateway.xyz/graphql',
  });
  try {
    // ORGANIZATIONS
    const { createOrganization } =
      await gatewayInstance.organization.createOrganization({
        name: 'Create sample organization',
        description: 'Sample organization description',
        username: generateRandomString(),
      });

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

    const { updateOrganization } =
      await gatewayInstance.organization.updateOrganization({
        id: createOrganization.id,
        description: 'updated description',
      });

    const { organization } = await gatewayInstance.organization.getOrganization(
      OrganizationIdentifierType.ORG_ID,
      createOrganization.id,
    );

    const { organizations } =
      await gatewayInstance.organization.getOrganizations({
        // filter: { verified: true },
      });
    console.log(organizations[0].description, organizations.length);

    console.log('\n \n');

    // PDA
    let obj = {
      dataModelId: '74719072-0268-4c06-84d5-73ba8a4e51fb',
      description: 'Description of the PDA',
      title: 'Favorite Person on Crypto Twitter',
      claim: {
        name: '@gateway_xyz',
        age: 20,
      },
      owner: {
        type: UserIdentifierType.GATEWAY_ID,
        value: USER_GATEWAY_ID,
      },
    };
    const { createPDA } = await gatewayInstance.pda.createPDA(obj);

    const { updatePDA } = await gatewayInstance.pda.updatePDA({
      id: createPDA.id,
      title: 'Changed PDA title',
    });

    const { PDA } = await gatewayInstance.pda.getPDA(createPDA.id);

    const { issuedPDAs } = await gatewayInstance.pda.getIssuedPDAs({
      skip: 0,
      take: 20,
      filter: { dataModelIds: ['74719072-0268-4c06-84d5-73ba8a4e51fb'] },
    });

    await gatewayInstance.pda.getIssuedPDAsCount();

    await gatewayInstance.pda.getPDACount();

    console.log('\n \n');
    // Transactions

    const { transactions } =
      await gatewayInstance.transaction.getTransactions();
    console.log(transactions[0], transactions.length);
    await gatewayInstance.transaction.getTransaction('<-- transaction id -->');

    await gatewayInstance.transaction.getTransactionCount();
  } catch (error) {
    console.log(error);
  }
};

testMutationsAndQueries();
