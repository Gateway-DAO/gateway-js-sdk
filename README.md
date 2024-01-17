![](https://github.com/Gateway-DAO/network-ui/blob/develop/public/social.png)

# Gateway Javascript SDK

[![NPM version][npm-image]][npm-url]
[![NPM downloads][downloads-image]][downloads-url]
[![Join Discord][discord-image]][discord-url]
[![Build status][travis-image]][test-passing]
[![Coverage Status][codecov-image]][codecov-url]

## Introduction

A TypeScript SDK for the Gateway API. This library is built with TypeScript developers in mind, but it also works with JavaScript.

**Note: This SDK is in beta and is not ready for production**

### Features

- Full type information for methods and responses.
- Bearer Token Support
- Supports Node.js 14+.

## Installing

```
pnpm add @gateway/sdk
```

## Gateway Client

To setup the gateway client we will authenticate with a bearer-token and a Api key as follows

```typescript
import { Gateway } from '@gateway/sdk';

const gateway = new Gateway({
  apiKey: 'your-api-key',
  token: 'your-token',
  url: '',
});
```

This library supports Bearer Token along with Api Key. Do not share your authentication token with people you don’t trust. This gives the user control over your account and they will be able to manage PDAs (and more) with it. Use environment variables to keep it safe.

## Examples

Make sure to add try catch blocks around methods to catch all the validation and protocol based errors.

### Creating a PDA

```typescript
import { Gateway, UserIdentifierType } from '@gateway/sdk';

const gateway = new Gateway({ apiKey: 'your-api-key', token: 'your-token' });

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
import { Gateway } from '@gateway/sdk';

const gateway = new Gateway({ apiKey: 'your-api-key', token: 'your-token' });

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
import { Gateway } from '@gateway/sdk';

const gateway = new Gateway({ apiKey: 'your-api-key', token: 'your-token' });

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
Incase of any protocol errors we will throw a custom message which is a string which has all neccessary info regarding error.

## License

The Gateway Javascript SDK is licensed under the [MIT License](https://github.com/Gateway-DAO/javascript-sdk/blob/master/LICENSE).

## Contributing

If you want to support the active development of the SDK [Please talk to us on Discord](https://discord.gg/tgt3KjcHGs).Before contributing!.

### 🔧 Installation

1. Clone this repo

   ```sh
   git clone https://github.com/Gateway-DAO/javascript-sdk
   ```

2. Install dependencies using pnpm

   ```sh
   pnpm i
   ```

3. Create the sdk using graphql mesh(it should give .mesh folder with sdk in it)

   ```sh
   pnpm mesh build
   ```

4. Run test command to test sdk using jest

   ```sh
   pnpm test
   ```

[npm-image]: https://img.shields.io/npm/v/docusign-esign.svg?style=flat
[npm-url]: https://npmjs.org/package/@Gateway-dao-js-sdk
[downloads-image]: https://img.shields.io/npm/dm/docusign-esign.svg?style=flat
[downloads-url]: https://npmjs.org/package/docusign-esign
[codecov-image]: https://codecov.io/gh/Gateway-DAO/gateway-js-sdk/graph/badge.svg?token=8N92RFGZHI
[codecov-url]: https://codecov.io/gh/Gateway-DAO/gateway-js-sdk
[discord-image]: https://img.shields.io/discord/733027681184251937.svg?style=flat&label=Join%20Community&color=7289DA
[discord-url]: https://discord.gg/tgt3KjcHGs
[github-url]: https://github.com/Gateway-DAO/javascript-sdk
[test-passing]: https://github.com/fedora-infra/fedora-messaging/actions/workflows/main.yml/badge.svg?branch=develop
