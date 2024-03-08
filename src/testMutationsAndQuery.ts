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

// transactions
// some minor backend errors in  getRequestsReceived

const testMutationsAndQueries = async () => {
  const gatewayInstance = new Gateway({
    apiKey: 'm9Y5ntNcTlwQ2LbRpYr6K_VhxJXuZJ6Q',
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm90b2NvbF9pZCI6Ijk1NWFmYjk3LTBkMGQtNDExNy1iMzYwLTBiMjc5ZGJhNmVmYSIsInByb3RvY29sX2hhc2giOiIyYWJkNmFlYzMyZDBkOTk0NzhjYTM2N2E4MjAzNWRkNjVjZmU4YzhkZWY2MzlhZTllOGZjMGRlMGQwYTZlZDQ2ZmI5MGM3Y2EwNmU1ZjZjNTg0ZDI3ODRkZmQ2ODQwYjUiLCJwcm90b2NvbF93YWxsZXQiOiI2NTY4NTkzMWEzN2YzMDg1ZGM3YzBmYjgiLCJwcm90b2NvbF9zaWduZXIiOiJkYzMyZjM1My01OWM4LTRjYTgtODg2YS1kOTFmNGI0MmU5YjkiLCJhdXRoIjp7ImlkIjoiYWY5YTdmNDQtZTllMS00Mzk5LWI0NDItYjE5NDEwOWU4MzhlIiwidHlwZSI6IldBTExFVCJ9LCJjcnlwdG8iOnsicHVibGljUGVtIjoiLS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS1cclxuTUlJQ0lqQU5CZ2txaGtpRzl3MEJBUUVGQUFPQ0FnOEFNSUlDQ2dLQ0FnRUEydEU3M254QU9TazRUQ0FWeElFSVxyXG5LVGpGazZNS3YrejJvRys4eDBpekY1RndZdDNXWXNQSk9wR2kwclZ4RCtTUTU3eloyLzZZTkgyRjQxRGFBV04zXHJcbkJQdWEyWHlvb09RaFkxL1N5a3pHV3JidWJxRThOQ1lQK3ZyT1A0SjNQMk8vUzc3Z0dFczdxRk92YzBHQlZpc1dcclxuRUY3bk9xNitmVCs5UVNWWDFHTFhUcWpKN2lCMXpDQXJiVjNVZkNGUkR1V3RlRVlIT1BhSUlXamVUZjVVTlFxclxyXG5NNnRQckQyYmE5UkpXcWpHeTU4N0I0NWt0clBtQTUvaXhhY0tWUFoydVhiekV5UWdJRDEzVzI4TkZUa0pMZlE1XHJcbnlsTWNKNkJqM0QrU3U5b29aZ09LYTA5OUw4dWowN3RUWmNaczgvenRnaTVIYUpFeVdsVGFOaTNFd3FDb2FhQTZcclxuTU9uUERGRlRacDZxYW5SN1FERUZHdmdDTE9WU0xYTVdsRVB5am52Zk81SHB5UjFyejBGdDRnTFZmOVBQTEgyTVxyXG40UDJhYmFxRnJ1L2pKNjVBbkxwb3dFbFhqQ0NUamw5TmEvKzZ0K0JTaXA5bWxQblFWVS9GV0pXQ0oyRUN6VHZXXHJcbkF6MDFsMXZoc01Lb1J1Mmw5VzkwblNNNUFQQ3VvU21yM2pHb2JhajZ2ZThEcXVUT1lmRjVnbHhFb0dxQkJFWDRcclxubXkxalpJbVdad3lKZjFHR1RLbFpyd1pQZHFEZU5WSFdYdm1jS2xHczFTUlkyM3ZvRyt0MlYzZ1l0cFpRTkdSeFxyXG5TcDFtTFJIYlRiTW8wMzVkL0hKWTBvZkFYQmo2TEV4R29JdG9Yamk4QWJmalVVamRpWW5jc0NQWjJVZDJvU2RFXHJcbmhKOUkxWW1sQXQvV3Y5Z0ZFRnFaQU9NQ0F3RUFBUT09XHJcbi0tLS0tRU5EIFBVQkxJQyBLRVktLS0tLVxyXG4ifSwidHlwZSI6ImF1dGhfdG9rZW4iLCJpYXQiOjE3MDQ2OTI4MDF9.fNehsLZBIOVcFgLMx01DcKs2F1HR4sIVa7d2QeTVd9o',
    url: 'https://develop.protocol.mygateway.xyz/graphql',
  });
  try {
    await gatewayInstance.user.me();

    await gatewayInstance.user.getSingleUser({
      type: UserIdentifierType.GATEWAY_ID,
      value: USER_GATEWAY_ID,
    });

    await gatewayInstance.user.myDataModelsCount();

    await gatewayInstance.user.myDataRequestTemplatesCount();
    // await gatewayInstance.user.myFinancialTransactions();
    await gatewayInstance.user.myPDACount();
    await gatewayInstance.user.myPDAs();
    await gatewayInstance.user.myWallet();
    await gatewayInstance.user.updateUser({
      profilePicture: 'https://fake-url.com',
    });

    console.log('\n USER DONE \n');

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
        filter: { verified: true },
      });

    console.log('\n ORGS DONE \n');

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

    // await gatewayInstance.pda.getPDAs();

    const { issuedPDAs } = await gatewayInstance.pda.getIssuedPDAs({
      skip: 0,
      take: 20,
      filter: { dataModelIds: ['74719072-0268-4c06-84d5-73ba8a4e51fb'] },
    });

    await gatewayInstance.pda.getIssuedPDAsCount();

    await gatewayInstance.pda.getPDACount();

    console.log('\n PDAS DONE \n');
    // Transactions

    const { transactions } =
      await gatewayInstance.transaction.getTransactions();
    await gatewayInstance.transaction.getTransaction(
      '65eac486738f5244b8a4a4d3',
    );

    await gatewayInstance.transaction.getTransactionCount();

    console.log('\n TRANSACTIONS DONE \n');

    // Data Models

    const { createDataModel } = await gatewayInstance.dataModel.createDataModel(
      {
        description: 'testing',
        permissions: 'ALL',
        title: 'testing',
        schema: {
          type: 'object',
          default: {},
          title: 'Root Schema',
          required: ['name', 'age'],
          properties: {
            name: {
              type: 'string',
              title: 'name',
            },
            age: {
              type: 'integer',
              title: 'age',
              examples: ['Tell us what your experience was like'],
            },
          },
        },
      },
    );

    await gatewayInstance.dataModel.getDataModel(
      '74719072-0268-4c06-84d5-73ba8a4e51fb',
    );

    await gatewayInstance.dataModel.getDataModels();

    await gatewayInstance.dataModel.getDataModelsCount();

    await gatewayInstance.dataModel.getDataModelsMetaData();

    await gatewayInstance.dataModel.getIssuersByDataModel(
      '74719072-0268-4c06-84d5-73ba8a4e51fb',
    );

    await gatewayInstance.dataModel.getTotalofIssuersByDataModel(
      '74719072-0268-4c06-84d5-73ba8a4e51fb',
    );

    await gatewayInstance.dataModel.getIssuersByDataModelCount(
      '74719072-0268-4c06-84d5-73ba8a4e51fb',
    );

    console.log('\n DATA MODELS DONE \n');
    // Data Requests template
    const { createDataRequestTemplate } =
      await gatewayInstance.dataRequestTemplate.createDataRequestTemplate({
        title: 'Create Data Request Template Example',
        description: 'Lorem ipsum dolor sit amet.',
        dataModels: [
          {
            id: '74719072-0268-4c06-84d5-73ba8a4e51fb',
            required: true,
            claimValidations: {
              type: 'object',
              properties: {
                name: {
                  type: 'string',
                },
                age: {
                  type: 'number',
                },
              },
              required: ['name', 'age'],
            },
          },
        ],
      });

    await gatewayInstance.dataRequestTemplate.getDataRequestTemplate(
      createDataRequestTemplate.id,
    );

    await gatewayInstance.dataRequestTemplate.getDataRequestTemplates({
      filter: { user: { type: 'GATEWAY_ID', value: USER_GATEWAY_ID } },
    });

    await gatewayInstance.dataRequestTemplate.getDataRequestsTemplateCount();

    await gatewayInstance.dataRequestTemplate.getDataRequestsTemplatesMetadata();

    await gatewayInstance.dataRequestTemplate.getVerifiersByDataRequestTemplate(
      createDataRequestTemplate.id,
    );

    await gatewayInstance.dataRequestTemplate.getVerifiersByDataRequestTemplateCount(
      createDataRequestTemplate.id,
    );
    console.log('\n DATA REQUESTS TEMPLATE DONE \n');

    // Data requests
    const { createDataRequest } =
      await gatewayInstance.request.createDataRequest({
        dataRequestTemplateId: createDataRequestTemplate.id,
        dataUse:
          'Web3 is an idea for a new iteration of the World Wide Web which incorporates concepts such as decentralization, blockchain technologies, and token-based economics.',
        owner: { type: 'GATEWAY_ID', value: USER_GATEWAY_ID },
      });

    await gatewayInstance.request.getDataRequest(createDataRequest.id);

    await gatewayInstance.request.getDataRequestCount();

    await gatewayInstance.request.getDataRequestStatus(createDataRequest.id);

    await gatewayInstance.request.getDataRequests({
      dataTemplateIds: [createDataRequest.id],
    });

    // await gatewayInstance.request.getRequestsReceived();

    await gatewayInstance.request.getRequestsSent();

    console.log('\n DATA REQUESTS DONE \n');
    // Proofs

    // await gatewayInstance.proof.getProofs();

    await gatewayInstance.proof.getProofsByPDAIds({
      pdaIds: ['c75a800b-5649-461b-86ab-a4864c6578ee'],
    });

    await gatewayInstance.proof.getReceivedProofs();

    await gatewayInstance.proof.getReceivedProofsCount();

    await gatewayInstance.proof.getSentProofs();

    await gatewayInstance.proof.getSentProofsCount();

    console.log('\n PROOFS DONE \n');
  } catch (error) {
    console.log(error);
  }
};

testMutationsAndQueries();
