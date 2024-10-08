## Code Base Overview

This section will give you an overview of the SDK codebase. We will also discuss in short the tools we use and the implementation.

- If you want to contribute to the SDK make sure you read this document and the [Contributing Guildelines](CONTRIBUTING.md) before proceeding.

### Custom Script to generate sdk from graphql end point

- We don't use graphql mesh anymore instead we have a [custom in-house script](../scripts/generateSDK/generate.js)(heavily inspired from graphql mesh team) which generates a complete type-safe SDK using our graphql Schema.
- Using this script we are able to auto generate all of queries and mutations and also providing autocomplete feature for developing applications.

### Top Level Folder Structure

- The src folder has all the classes which a developer will use. The following are the classes which we are using:-

1. Auth Class:- Handles all Authentication related methods.
2. Data Model:- Handles all Data Models related methods.
3. Organization:- Handles all Organization related methods.
4. PDA:- Handles all PDA related methods.
5. Proof:- Handles all Proof related methods.
6. Request:- Handles all Requests related methods.
7. User:- Handles all User related methods.
8. Transactions:- Handles all User related methods.

- The services folder has all functions related to crypto,wallets, and validation related functions.

- The tests folder has all the unit test for the above classes. We are using mocking to mock the SDK.

- We are using prettier and eslint to make sure that code format is maintained. Across all the files.
