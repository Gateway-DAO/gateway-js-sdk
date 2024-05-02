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
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm90b2NvbF9pZCI6IjNmOGUxZDUwLWQ2OWYtNGFkNS1iYjI2LWNiZDI3YmQ1M2UxOCIsInByb3RvY29sX2hhc2giOiI0MDIyMDU4MThjYWMxMDljZWJkNzE4ZDZlZTE5YzcyMWViNWU2N2JlMmNkODg2NTljMzZiMjYwMzMwNzhlNzI3ZjhmZjcwYzNkOTU5YjI3ZWNkZWRmNTA2NzI3NjZlODciLCJwcm90b2NvbF93YWxsZXQiOiI2NjE3NmYyMTQ1MzMwMjQyODZhMDdjNjIiLCJwcm90b2NvbF9zaWduZXIiOiJkOWM4NWJmMi1iZTMyLTRmZDQtYjU4MS1hZWM3YmIyYmU2ZmEiLCJhdXRoIjp7ImlkIjoiMzkyMWU5ZWMtNDRmZS00NDhmLWFjNWMtNjdjZWQxNGFjMjI0IiwidHlwZSI6IldBTExFVCJ9LCJjcnlwdG8iOnsicHVibGljUGVtIjoiLS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS1cclxuTUlJQ0lqQU5CZ2txaGtpRzl3MEJBUUVGQUFPQ0FnOEFNSUlDQ2dLQ0FnRUFwTWErMXZmblhCa2owNmdiVUk3clxyXG5IeW1kS3FiSEJwa0RQbUx4SHlHL0VWWEx4N3dKaVA2OHpyOGJlcjloMGdWMWQ4ZGVIdlpBRVJGWXZXbTdIakVrXHJcblNpdE9RdEI0Vm1RajBrTjFWa2VldGN1VU90ZURFVEFlRjhZa3F2cVpLS2hQN1RZV3BCQkQyRVpybHIyWUhINlVcclxuY2FZbmhuRGtnWkZhQnZ3bFRUOTNOTkJmVGwrSlJIb25OaFNhNGdneFdUT296Nmh4aVA1K25GMGJpTHpRa1hNU1xyXG5PMmNHd1NIdCtFVlFMNDViOEd4MDE2QzY4MGJkSEdXcEE0bGQrVmtEZkVmNWRSMDZuK1ZaWWxBZFcrZURrWURyXHJcbmFWMjdIZWxYSXhiWFRidW90aXlsbU5SYzJZU24rMWpaWFBreXkyTDk3Q3hjQTlsRjBvS255WFFKSEpOS0NtcFRcclxubDVYOHovdjV0eGYzM3NOMHRoZ1d4QjU4aFJTcUFtQnExbnRJZVkvNUpna24zelhLREFQM3FnNGtFdXRDNWRDTVxyXG5QZ1J6MTBVMmtJVHRVbHdxTXpLbUszaG5mbHF2MVljaTZyb010a1ZqVGM3M2FOTWswYUxwVTVhejBGd3d2R3F4XHJcbmF1S1lqcXFlTG5sdGduVTZiL0pvd2Yvckx3WitEQ0FMTmRGYzBmaFlJUG9Lc3dHOGdwMHVwNG5OV2diMUMrZ2JcclxuWEQ2T1piTnFacDFlMUhWdGVSU21nT3BWQ2huTm4rVW5rK0Rta3c0cVNoamVnQkpnaEM0d2YrT25IU1Jqek9iK1xyXG5pQ25ObnhFK21xdDlDcmw2NjIxbmFzSmpTWTZaazVLeVBQRk9YaUJkVkR6c3Jobkw4Ym5WbXRCWGtpcFZXMDZvXHJcblQ2M1pyVjBtajJKWEZxNTh1dFhlemtVQ0F3RUFBUT09XHJcbi0tLS0tRU5EIFBVQkxJQyBLRVktLS0tLVxyXG4ifSwidHlwZSI6ImF1dGhfdG9rZW4iLCJpYXQiOjE3MTQwNTQ4MDV9.Lce0NCBvjuLD3uYy1O7tkP0cuSvNzFdWdTccIVP6IFQ',
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
