![](https://github.com/Gateway-DAO/network-ui/blob/develop/public/social.png)

## ⚠️ Warning: Deprecation Notice

**Attention:** This SDK version exclusively supports v2 APIs of the Gateway Protocol. **Immediate action is required** as this SDK package is set to be deprecated on **September 15, 2024**.

### What You Need to Know:
- **Compatibility:** Future updates will not be supported with this SDK version.
- **Action Required:** Migrate to the latest SDK version that supports v3 APIs to maintain compatibility and take advantage of new features and improvements.
- **Deprecation Date:** After **September 15, 2024**, this SDK will no longer receive updates, security patches, or support.

### Resources:
- For detailed migration steps and information on new SDK features, please refer to the [documentation](https://docs.mygateway.xyz/).
- If you encounter any issues or need further assistance, please open an issue in the [Issues](https://github.com/Gateway-DAO/gateway-js-sdk/issues) section.

Ensure you update your integration promptly to avoid disruptions in service. Thank you for your attention to this important matter.




# Gateway Javascript SDK

[![NPM version][npm-image]][npm-url]
[![NPM downloads][downloads-image]][downloads-url]
[![Join Discord][discord-image]][discord-url]
[![Run Eslint & Test cases](https://github.com/Gateway-DAO/gateway-js-sdk/actions/workflows/test.yaml/badge.svg)](https://github.com/Gateway-DAO/gateway-js-sdk/actions/workflows/test.yaml)
[![Coverage Status][codecov-image]][codecov-url]

## Introduction

A TypeScript SDK for the Gateway API. This library is built with TypeScript developers in mind, but it also works with JavaScript.

**Note: Our latest version of sdk works without adding any extra configuration for frontend environments.**

### Features

- Full type information for methods and responses.
- Bearer Token Support
- Supports Node.js 18+.
- Works in frontend environments without adding any extra configuration.

## Installation

### Using npm

```
npm install @gateway-dao/sdk
```

### Using pnpm

```
pnpm add @gateway-dao/sdk
```

### Using yarn

```
yarn add @gateway-dao/sdk
```

## Gateway Client

To setup the gateway client we will authenticate with a bearer-token and a Api key as follows

```typescript
import { Gateway } from '@gateway-dao/sdk';

const gateway = new Gateway({
  apiKey: 'your-api-key',
  token: 'your-token',
  url: 'https://sandbox.protocol.mygateway.xyz/graphql',
});
```

**Make sure you add token without Bearer as we add Bearer automatically when you make request. Else it will give you Unauthorized error even if your token is correct**
For example

```typescript
import { Gateway } from '@gateway-dao/sdk';

const gateway = new Gateway({
  apiKey: 'your-api-key',
  token: 'Bearer your-token',
  // wrong will not work just use token: 'your-token'
  url: 'https://sandbox.protocol.mygateway.xyz/graphql',
});
```

This library supports Bearer Token along with Api Key. Do not share your authentication token with people you don’t trust. This gives the user control over your account and they will be able to manage PDAs (and more) with it. Use environment variables to keep it safe.

## Examples

Make sure to add try catch blocks around methods to catch all the validation and protocol based errors.

### Creating a PDA

```typescript
import { Gateway, UserIdentifierType } from '@gateway-dao/sdk';

const gateway = new Gateway({
  apiKey: 'your-api-key',
  token: 'your-token',
  url: 'https://sandbox.protocol.mygateway.xyz/graphql',
});

async function main() {
  try {
    let obj = {
      dataModelId: 'uuid-here',
      description: 'test',
      title: 'test',
      claim: {
        gatewayUse: 'test',
      },
      owner: {
        type: UserIdentifierType.GATEWAY_ID,
        value: 'test',
      },
    };
    const { createPDA } = await gateway.pda.createPDA(obj);
  } catch (error) {
    console.log(error); // Can log it for degugging
  }
}

main();
```

### Getting a Organization

```typescript
import { Gateway } from '@gateway-dao/sdk';

const gateway = new Gateway({
  apiKey: 'your-api-key',
  token: 'your-token',
  url: 'https://sandbox.protocol.mygateway.xyz/graphql',
});

async function main() {
  try {
    let obj = {
      username: 'test_for_sdk_2',
      name: 'test org sdk 2',
      description: 'test organization',
    };
    const { createOrganization } =
      await gateway.organization.createOrganization(obj);
  } catch (error) {
    console.log(error); // Can log it for degugging
  }
}

main();
```

### Create a Data request template

```typescript
import { Gateway } from '@gateway-dao/sdk';

const gateway = new Gateway({
  apiKey: 'your-api-key',
  token: 'your-token',
  url: 'https://sandbox.protocol.mygateway.xyz/graphql',
});

async function main() {
  try {
    const { createDataRequestTemplate } =
      await gateway.dataRequestTemplate.createDataRequestTemplate({
        title: 'Create Data Request Template Example',
        description: 'Lorem ipsum dolor sit amet.',
        dataModels: [
          {
            id: 'uuid-here',
            required: true,
            claimValidations: {
              type: 'object',
              properties: {
                gatewayUse: {
                  type: 'string',
                },
              },
              required: ['gatewayUse'],
            },
          },
        ],
      });
  } catch (error) {
    console.log(error); // Can log it for degugging
  }
}

main();
```

## Error Handling

All the methods throw a validation error if the validation does not match for example:- invalid wallet, invalid uuid for all ids,
Incase of any protocol errors we will throw a custom message which is a string which has all neccessary info regarding error. Make sure to use try catch blocks to handle those.

## License

The Gateway Javascript SDK is licensed under the [MIT License](https://github.com/Gateway-DAO/javascript-sdk/blob/main/LICENSE.md).

## Contributing

If you want to support the active development of the SDK. [Please go through our Contribution guide](https://github.com/Gateway-DAO/gateway-js-sdk/blob/main/CONTRIBUTING.md)

[npm-image]: https://img.shields.io/npm/v/%40gateway-dao%2Fsdk.svg?style=flat
[npm-url]: https://www.npmjs.com/package/@gateway-dao/sdk
[downloads-image]: https://img.shields.io/npm/dm/%40gateway-dao%2Fsdk
[downloads-url]: https://www.npmjs.com/package/@gateway-dao/sdk
[codecov-image]: https://codecov.io/gh/Gateway-DAO/gateway-js-sdk/graph/badge.svg?token=8N92RFGZHI
[codecov-url]: https://codecov.io/gh/Gateway-DAO/gateway-js-sdk
[discord-image]: https://img.shields.io/discord/733027681184251937.svg?style=flat&label=Join%20Community&color=7289DA
[discord-url]: https://discord.gg/tgt3KjcHGs