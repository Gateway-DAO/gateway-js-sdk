![](https://github.com/Gateway-DAO/network-ui/blob/develop/public/social.png)

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

To setup the gateway client we will authenticate with a bearer-token,api key and wallet private key as follows

```typescript
import { Gateway } from '@gateway-dao/sdk';

const gateway = new Gateway({
  apiKey: 'your-api-key',
  token: 'your-token',
  url: 'https://sandbox.protocol.mygateway.xyz/graphql',
  walletPrivateKey: 'your-private-key', // store this in env file!
});
```

**The wallet private key is not send anywhere and is just used to sign messages on behalf of developer/organization using it. This way we minimize signature errors on protocol and provide smoother developer experience**

**Make sure you add token without Bearer as we add Bearer automatically when you make request. Else it will give you Unauthorized error even if your token is correct**
For example

```typescript
import { Gateway } from '@gateway-dao/sdk';

const gateway = new Gateway({
  apiKey: 'your-api-key',
  token: 'Bearer your-token',
  // wrong will not work just use token: 'your-token'
  url: 'https://sandbox.protocol.mygateway.xyz/graphql',
  walletPrivateKey: 'your-private-key', // store this in env file!
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
  walletPrivateKey: 'your-private-key', // store this in env file!
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

### Creating a Organization

```typescript
import { Gateway } from '@gateway-dao/sdk';

const gateway = new Gateway({
  apiKey: 'your-api-key',
  token: 'your-token',
  url: 'https://sandbox.protocol.mygateway.xyz/graphql',
  walletPrivateKey: 'your-private-key', // store this in env file!
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

## More examples

We have created a separate repository which have more [examples you can access it here](https://github.com/Gateway-DAO/sdk-scripts-example/)

## Error Handling

All the methods throw a validation error if the validation does not match for example:- invalid wallet, invalid uuid for all ids,
Incase of any protocol errors we will throw a custom message which is a string which has all neccessary info regarding error. Make sure to use try catch blocks to handle those.

## License

The Gateway Javascript SDK is licensed under the [MIT License](LICENSE).

## Contributing

If you want to support the active development of the SDK. [Please go through our Contribution guide](docs/CONTRIBUTING.md)

## Code of Conduct

Please read our [Code of Conduct](docs/CODE_OF_CONDUCT.md) before contributing or engaging in discussions.

## Security

If you discover a security vulnerability within this package, please open a ticket on Discord. All security vulnerabilities will be promptly addressed.

## Support

We are always here to help you. Please talk to us on [Discord](https://discord.gg/tgt3KjcHGs) for any queries.

[npm-image]: https://img.shields.io/npm/v/%40gateway-dao%2Fsdk.svg?style=flat
[npm-url]: https://www.npmjs.com/package/@gateway-dao/sdk
[downloads-image]: https://img.shields.io/npm/dm/%40gateway-dao%2Fsdk
[downloads-url]: https://www.npmjs.com/package/@gateway-dao/sdk
[codecov-image]: https://codecov.io/gh/Gateway-DAO/gateway-js-sdk/graph/badge.svg?token=8N92RFGZHI
[codecov-url]: https://codecov.io/gh/Gateway-DAO/gateway-js-sdk
[discord-image]: https://img.shields.io/discord/733027681184251937.svg?style=flat&label=Join%20Community&color=7289DA
[discord-url]: https://discord.gg/tgt3KjcHGs
