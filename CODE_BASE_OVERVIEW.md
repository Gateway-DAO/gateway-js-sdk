## Code Base Overview

This section will give you an overview of the SDK codebase. We will also discuss in short the tools we use and the implementation.

- If you want to contribute to the SDK make sure you read this document and the [Contributing Guildelines](https://github.com/Gateway-DAO/javascript-sdk/blob/main/CONTRIBUTING.md) before proceeding.

### Graphql Mesh

- We are using graphql mesh which generates a complete type-safe SDK using our graphql Schema.
- Using this tool we are able to auto generate all of queries and mutations and also providing autocomplete feature for developing applications.

### Top Level Folder Structure

- The src folder has all the classes which a developer will use. The following are the classes which we are using:-

1. Auth Class:- Handles all Authentication related methods.
2. Data Model:- Handles all Data Models related methods.
3. Data Request Templates:- Handles all Data Request Template related methods.
4. Organization:- Handles all Organization related methods.
5. PDA:- Handles all PDA related methods.
6. Proof:- Handles all Proof related methods.
7. Request:- Handles all Requests related methods.
8. User:- Handles all User related methods.
9. Transactions:- Handles all User related methods.

- The utils folder has basic utilities functions like validations to validate all user input.

- The tests folder has all the unit test for the above classes. We are using mocking to mock the SDK.

- We are using prettier and eslint to make sure that code format is maintained. Across all the files.
