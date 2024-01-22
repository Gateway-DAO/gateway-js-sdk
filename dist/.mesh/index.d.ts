import { GraphQLResolveInfo, SelectionSetNode, FieldNode, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import type { GetMeshOptions } from '@graphql-mesh/runtime';
import type { YamlConfig } from '@graphql-mesh/types';
import { MeshHTTPHandler } from '@graphql-mesh/http';
import { ExecuteMeshFn, SubscribeMeshFn, MeshContext as BaseMeshContext, MeshInstance } from '@graphql-mesh/runtime';
import type { GatewaySdkTypes } from './sources/GatewaySDK/types';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends {
    [key: string]: unknown;
}> = {
    [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<T extends {
    [key: string]: unknown;
}, K extends keyof T> = {
    [_ in K]?: never;
};
export type Incremental<T> = T | {
    [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
};
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
    [P in K]-?: NonNullable<T[P]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: {
        input: string;
        output: string;
    };
    String: {
        input: string;
        output: string;
    };
    Boolean: {
        input: boolean;
        output: boolean;
    };
    Int: {
        input: number;
        output: number;
    };
    Float: {
        input: number;
        output: number;
    };
    Date: {
        input: any;
        output: any;
    };
    DateTime: {
        input: any;
        output: any;
    };
    DateTimeISO: {
        input: any;
        output: any;
    };
    JSON: {
        input: any;
        output: any;
    };
    StringSchema: {
        input: any;
        output: any;
    };
};
export type AddEmailConfirmationInput = {
    code: Scalars['Float']['input'];
    email: Scalars['String']['input'];
};
export type AddEmailInput = {
    email: Scalars['String']['input'];
};
export type AddWalletConfirmationInput = {
    /** Blockchain networks. Default: EVM */
    chain?: Chain;
    primary?: Scalars['Boolean']['input'];
    signature: Scalars['String']['input'];
    wallet: Scalars['String']['input'];
};
export type Application = {
    apiKey: Scalars['String']['output'];
    gatewayFacilitationFee?: Maybe<Scalars['Float']['output']>;
    organization: Organization;
};
/** Application type. Default: Website */
export type ApplicationType = 'APP' | 'WEBSITE';
export type Auth = {
    /** Data of authentication method */
    data?: Maybe<AuthDataType>;
    hash?: Maybe<Scalars['String']['output']>;
    id: Scalars['String']['output'];
    type: AuthType;
    user: User;
    userId?: Maybe<Scalars['String']['output']>;
};
export type AuthDataType = {
    /** Authentication address (ex: example@example.com, 0x0000) */
    address: Scalars['String']['output'];
    /** Chain of the wallet, if it's a crypto wallet */
    chain?: Maybe<Chain>;
    /** Define if authentication method is primary */
    primary?: Maybe<Scalars['Boolean']['output']>;
};
export type AuthInput = {
    data: Scalars['JSON']['input'];
    type: AuthType;
};
/** Blockchain networks. Default: EVM */
export type AuthType = 'EMAIL' | 'GOOGLE' | 'HOT_WALLET' | 'WALLET';
/** Blockchain networks. Default: EVM */
export type Chain = 'EVM' | 'SOL';
export type CreateApplicationInput = {
    /** Application domain */
    domain: Scalars['String']['input'];
    /** Gateway facilitation fee negotiated for this application */
    gatewayFacilitationFee?: InputMaybe<Scalars['Float']['input']>;
    /** Application name */
    name: Scalars['String']['input'];
    /** Application type */
    type?: ApplicationType;
};
export type CreateDataModelInput = {
    /** Users and Orgs who are allowed to issue using this Data Model. Only applicable when SPECIFIC_ID is selected as part of the permissions.  */
    allowedToIssue?: InputMaybe<Array<IdentificationInput>>;
    /** Payment issuer receives every time a proof containing PDA is generated */
    consumptionPrice?: InputMaybe<Scalars['Float']['input']>;
    /** Description of the Data Model */
    description: Scalars['String']['input'];
    /** Data Model Image */
    image?: InputMaybe<Scalars['String']['input']>;
    /** Data Model Information */
    info?: InputMaybe<Scalars['String']['input']>;
    /** If you wish to create through an organization, pass the Gateway Username or ID of the Organization */
    organization?: InputMaybe<OrganizationIdentificationInput>;
    /** Can restrict to organizations only or Specific_IDS within your network. Default is ALL */
    permissions: PermissionType;
    /**
     *
     * An AJV Validator-compatible JSON Schema (draft 07)
     * Schema example:
     * {
     *   type: "object",
     *   properties: {
     *     name: {type: "string", title: "User name"},
     *     age: {type: "number", minimum: 18, title: "User Age"},
     *   },
     *   required: ["name", "age"],
     *   additionalProperties: false,
     * }
     *
     */
    schema: Scalars['StringSchema']['input'];
    /** Tags of the Datamodel (e.g. ["tag1", "tag2", "tag3"]) */
    tags?: Array<Scalars['String']['input']>;
    /** Title of the Data Model */
    title: Scalars['String']['input'];
};
export type CreateEmailNonceInput = {
    email: Scalars['String']['input'];
};
export type CreateEmailNonceOutput = {
    code: Scalars['Int']['output'];
    email: Scalars['String']['output'];
};
export type CreateOrganizationInput = {
    /** Members of the organization */
    admins?: InputMaybe<Array<UserIdentificationInput>>;
    /** Description of the organization */
    description: Scalars['String']['input'];
    /** Image of the organization */
    image?: InputMaybe<Scalars['String']['input']>;
    /** Members of the organization */
    members?: InputMaybe<Array<UserIdentificationInput>>;
    /** Name of the organization */
    name: Scalars['String']['input'];
    /** Username/GatewayID of the organization */
    username: Scalars['String']['input'];
    /** Website of the organization */
    website?: InputMaybe<Scalars['String']['input']>;
};
export type CreatePDAInput = {
    /** PDA Context information based on the selected Data Model */
    claim?: InputMaybe<Scalars['JSON']['input']>;
    /** Datamodel ID */
    dataModelId: Scalars['String']['input'];
    /** PDA Description */
    description: Scalars['String']['input'];
    /** Expiration Date */
    expirationDate?: InputMaybe<Scalars['DateTime']['input']>;
    /** PDA Image */
    image?: InputMaybe<Scalars['String']['input']>;
    /** Issuer Organization */
    organization?: InputMaybe<OrganizationIdentificationInput>;
    /** Owner ID Identification */
    owner?: InputMaybe<UserIdentificationInput>;
    /** PDA Title */
    title: Scalars['String']['input'];
};
export type CreateWalletNonceInput = {
    /** Blockchain networks. Default: EVM */
    chain?: InputMaybe<Chain>;
    wallet: Scalars['String']['input'];
};
export type CreateWalletNonceOutput = {
    message: Scalars['String']['output'];
};
export type DataModel = {
    PDAs: Array<PrivateDataAsset>;
    /** Organizations that can access the Data Model */
    allowedOrganizations?: Maybe<Array<Organization>>;
    /** Users that can access the Data Model */
    allowedUsers?: Maybe<Array<User>>;
    /** Arweave Transaction */
    arweaveUrl: Scalars['String']['output'];
    /** Price for consumption */
    consumptionPrice?: Maybe<Scalars['Float']['output']>;
    /** Date of the last update of the Data Model */
    createdAt: Scalars['DateTime']['output'];
    /** Creator of the Data Model */
    createdBy?: Maybe<User>;
    /** Description of the Datamodel (searcheable) */
    description: Scalars['String']['output'];
    /** Is the Data Model featured? */
    featured?: Maybe<Scalars['Boolean']['output']>;
    group: DataModelGroup;
    id: Scalars['String']['output'];
    /** Data Model image */
    image?: Maybe<Scalars['String']['output']>;
    organization?: Maybe<Organization>;
    /** All encrypted PDAs that use this Data Model */
    pdas: Array<PrivateDataAsset>;
    pdasIssuedCount: Scalars['Float']['output'];
    /** Permission type for the Data Model */
    permissioning?: Maybe<PermissionType>;
    revenueGenerated: Scalars['Float']['output'];
    /**
     *
     * An AJV Validator-compatible JSON Schema (draft 07)
     * Schema example:
     * {
     *   type: "object",
     *   properties: {
     *     name: {type: "string", title: "User name"},
     *     age: {type: "number", minimum: 18, title: "User Age"},
     *   },
     *   required: ["name", "age"],
     *   additionalProperties: false,
     * }
     *
     */
    schema: Scalars['JSON']['output'];
    /** Tags of the Data Model (searcheable) (e.g. ["tag1", "tag2", "tag3"]) */
    tags?: Maybe<Array<Scalars['String']['output']>>;
    /** Title of the Datamodel */
    title: Scalars['String']['output'];
    uniqueIssuersCount: Scalars['Float']['output'];
    /** Is the Data Model verified by Gateway? */
    verified: Scalars['Boolean']['output'];
};
/** Group that contains all versions of a Data Model */
export type DataModelGroup = {
    /** Date of the last update of the Datamodel */
    createdAt: Scalars['DateTime']['output'];
    /** List of versions of Data Models */
    dataModels: Array<DataModel>;
    id: Scalars['String']['output'];
    /** if this Datamodel is official (approved) by Gateway (searcheable) */
    official: Scalars['Boolean']['output'];
};
export type DataModelIssuer = {
    count: Scalars['Float']['output'];
    issuer?: Maybe<IdentifierUnion>;
};
export type DataModelMetadata = {
    creator: Scalars['String']['output'];
    dataModel: Scalars['String']['output'];
    signedBy: Scalars['String']['output'];
};
export type DataModelsMetadata = {
    consumptionPrice: Scalars['JSON']['output'];
    issuedCount: Scalars['JSON']['output'];
    /** List of available tags */
    tags: Array<Scalars['String']['output']>;
};
/** Data Request */
export type DataRequest = {
    arweaveUrl?: Maybe<Scalars['String']['output']>;
    /** Created Date */
    createdAt: Scalars['DateTime']['output'];
    dataRequestTemplate: DataRequestTemplate;
    dataUse: Scalars['String']['output'];
    id: Scalars['String']['output'];
    owner: User;
    proof?: Maybe<Proof>;
    status: DataResourceStatus;
    verifier?: Maybe<User>;
    verifierOrganization?: Maybe<Organization>;
};
export type DataRequestSchemaInput = {
    /** ID of Data Request Template used to generate Data Requests */
    dataRequestTemplateId: Scalars['String']['input'];
    /** Reason for the data request (e.g. 'KYC', 'AML', 'Credit') */
    dataUse: Scalars['String']['input'];
    /** Organization's identifier (e.g. GatewayID, ID) if the user wants to create as Organization. */
    organization?: InputMaybe<OrganizationIdentificationInput>;
    /** Person request is being sent to identifier (owner of PDA). */
    owner: UserIdentificationInput;
};
/** Data Request Template */
export type DataRequestTemplate = {
    arweaveUrl?: Maybe<Scalars['String']['output']>;
    /** Created Date */
    createdAt: Scalars['DateTime']['output'];
    dataModels: Array<DataModel>;
    /** Data Request */
    dataRequests: Array<DataRequest>;
    dataRequestsCount: Scalars['Float']['output'];
    description: Scalars['String']['output'];
    id: Scalars['String']['output'];
    name: Scalars['String']['output'];
    organization?: Maybe<Organization>;
    revenueGenerated: Scalars['Float']['output'];
    /** Schema of Data Request Template */
    schema: Scalars['JSON']['output'];
    /** Tags of the Data Request Template (searcheable) (e.g. ["tag1", "tag2", "tag3"]) */
    tags: Array<Scalars['String']['output']>;
    uniqueVerifiersCount: Scalars['Float']['output'];
    /** User that created the Data Request Template */
    user: User;
};
export type DataRequestTemplateDataModelSchemaInput = {
    /**
     *
     * An AJV Validator-compatible JSON Schema (draft 07)
     * Schema example:
     * {
     *   type: "object",
     *   properties: {
     *     name: {type: "string", title: "User name"},
     *     age: {type: "number", minimum: 18, title: "User Age"},
     *   },
     *   required: ["name", "age"],
     *   additionalProperties: false,
     * }
     *
     */
    claimValidations?: InputMaybe<Scalars['StringSchema']['input']>;
    /** Data Model Id */
    id: Scalars['String']['input'];
    /** Exact issuance date. Format: YYYY/MM/dd */
    issuanceDate?: InputMaybe<Scalars['Date']['input']>;
    /** Range of issuance dates */
    issuanceDateRange?: InputMaybe<RequestIssueanceDateSchemaInput>;
    /** List of issuers. It receives user UUID or GatewayID. */
    issuers?: InputMaybe<Array<Scalars['String']['input']>>;
    /** List of organizations issuers. It receives organization UUID or GatewayID. */
    organizations?: InputMaybe<Array<Scalars['String']['input']>>;
    /** Defines if the Data using this data model is required */
    required?: InputMaybe<Scalars['Boolean']['input']>;
};
export type DataRequestTemplateDataModelSchemaObject = {
    /**
     *
     * An AJV Validator-compatible JSON Schema (draft 07)
     * Schema example:
     * {
     *   type: "object",
     *   properties: {
     *     name: {type: "string", title: "User name"},
     *     age: {type: "number", minimum: 18, title: "User Age"},
     *   },
     *   required: ["name", "age"],
     *   additionalProperties: false,
     * }
     *
     */
    claimValidations?: Maybe<Scalars['StringSchema']['output']>;
    /** Data Model Id */
    id: Scalars['String']['output'];
    /** Exact issuance date. Format: YYYY/MM/dd */
    issuanceDate?: Maybe<Scalars['Date']['output']>;
    /** Range of issuance dates */
    issuanceDateRange?: Maybe<RequestIssueanceDateSchemaObject>;
    /** List of issuers. It receives user UUID or GatewayID. */
    issuers?: Maybe<Array<Scalars['String']['output']>>;
    /** List of organizations issuers. It receives organization UUID or GatewayID. */
    organizations?: Maybe<Array<Scalars['String']['output']>>;
    /** Defines if the Data using this data model is required */
    required?: Maybe<Scalars['Boolean']['output']>;
};
export type DataRequestTemplateVerifier = {
    count: Scalars['Float']['output'];
    verifier?: Maybe<IdentifierUnion>;
};
export type DataRequestTemplatesMetadata = {
    /** List of available tags */
    tags: Array<Scalars['String']['output']>;
};
/** Statuses of Data Requests */
export type DataResourceStatus = 'ACCEPTED' | 'EXPIRED' | 'PENDING' | 'REJECTED';
export type DecryptedPDA = {
    /** PDA Context information */
    claim?: Maybe<Scalars['JSON']['output']>;
    claimArray: Array<PDAClaim>;
    /** Data Model to validate the PDA Claim */
    dataModel: DataModel;
    /** PDA Description */
    description: Scalars['String']['output'];
    /** Expiration Date */
    expirationDate?: Maybe<Scalars['DateTime']['output']>;
    /** PDA Image */
    image?: Maybe<Scalars['String']['output']>;
    /** Issuer of the PDA */
    issuer: User;
    /** Organization that issued the PDA */
    organization?: Maybe<Organization>;
    /** Owner of the PDA */
    owner: User;
    /** Qr Code from PDA */
    qrCode?: Maybe<Scalars['String']['output']>;
    /** PDA Title */
    title: Scalars['String']['output'];
};
export type DecryptedProof = {
    /** Private Data Assets of the Proof */
    PDAs: Array<DecryptedProofPDA>;
    /** Data Models of the Proof */
    dataModels: Array<DataModel>;
    /** Raw Proof Context information */
    raw?: Maybe<Scalars['JSON']['output']>;
};
export type DecryptedProofPDA = {
    /** Proof Context information */
    claim: Scalars['JSON']['output'];
    claimArray: Array<PDAClaim>;
    /** Data Model of the PDA */
    dataModel: DataModel;
    description: Scalars['String']['output'];
    id: Scalars['String']['output'];
    /** Issuance Date */
    issuanceDate?: Maybe<Scalars['DateTime']['output']>;
    /** Issuer of the PDA */
    issuer: User;
    /** Updated Date */
    lastUpdated?: Maybe<Scalars['DateTime']['output']>;
    /** Organization of the PDA */
    organization?: Maybe<Organization>;
    /** Owner of the PDA */
    owner: User;
    title: Scalars['String']['output'];
};
export type ExplorerAnalyticsSchema = {
    dataRequests: Scalars['Int']['output'];
    pdasIssued: Scalars['Int']['output'];
    totalEarnings: Scalars['Float']['output'];
    uniqueIssuers: Scalars['Int']['output'];
};
export type ExplorerTransactionsAnalyticsSchema = {
    dataRequests: Scalars['Int']['output'];
    pdasIssued: Scalars['Int']['output'];
    totalEarnings: Scalars['Float']['output'];
    totalTransactions: Scalars['Int']['output'];
    uniqueIssuers: Scalars['Int']['output'];
};
export type FacilitationFeeInput = {
    /** Maximum value for facilitation fee */
    max?: InputMaybe<Scalars['Float']['input']>;
    /** Minimum value for facilitation fee */
    min?: InputMaybe<Scalars['Float']['input']>;
};
export type FilterDataModelInput = {
    /** Entities that are allowed to issue the data models */
    allowedIssuers?: InputMaybe<Array<IdentificationInput>>;
    /** Data Models with a specific consumption price */
    consumptionPrice?: InputMaybe<FloatRangeDto>;
    /** Data Models that are featured by Gateway */
    featured?: InputMaybe<Scalars['Boolean']['input']>;
    /** Data Models with IDs in this list */
    ids?: InputMaybe<Array<Scalars['String']['input']>>;
    /** Data Models created by a specific organization */
    organization?: InputMaybe<OrganizationIdentificationInput>;
    /** Data Models with a specific permission(s) */
    permissioning?: InputMaybe<Array<PermissionType>>;
    /** Data Models with a specific name */
    search?: InputMaybe<Scalars['String']['input']>;
    /** Data Models with a specific tag */
    tags?: InputMaybe<Array<Scalars['String']['input']>>;
    /** Data Models created by a specific user */
    user?: InputMaybe<UserIdentificationInput>;
};
export type FilterDataRequestInput = {
    /** Data Template IDs */
    dataTemplateIds?: InputMaybe<Array<Scalars['String']['input']>>;
    /** Data Request ID */
    ids?: InputMaybe<Array<Scalars['String']['input']>>;
    /** Data Request Owner */
    owner?: InputMaybe<UserIdentificationInput>;
    /** Data Request Status */
    status?: InputMaybe<DataResourceStatus>;
    /** Data Request Verifier */
    verifier?: InputMaybe<UserIdentificationInput>;
    /** Data Request Verifier Organization */
    verifierOrganization?: InputMaybe<OrganizationIdentificationInput>;
};
export type FilterDataRequestTemplateInput = {
    /** Data Template IDs */
    dataTemplateIds?: InputMaybe<Array<Scalars['String']['input']>>;
    /** Data Request ID */
    ids?: InputMaybe<Array<Scalars['String']['input']>>;
    /** Organization ID */
    organization?: InputMaybe<OrganizationIdentificationInput>;
    search?: InputMaybe<Scalars['String']['input']>;
    tags?: InputMaybe<Array<Scalars['String']['input']>>;
    /** Datamodels created by a specific user */
    user?: InputMaybe<UserIdentificationInput>;
};
export type FilterOrganizationInput = {
    /** Check if organization is verified */
    verified?: InputMaybe<Scalars['Boolean']['input']>;
};
export type FilterPDAInput = {
    /** List of Data Model IDs */
    dataModelIds?: InputMaybe<Array<Scalars['String']['input']>>;
    /** PDA ID */
    ids?: InputMaybe<Array<Scalars['String']['input']>>;
    /** PDA Issuer */
    issuer?: InputMaybe<UserIdentificationInput>;
    /** PDA Organization Issuer */
    organization?: InputMaybe<OrganizationIdentificationInput>;
    /** PDA Owner */
    owner?: InputMaybe<UserIdentificationInput>;
    /** List of PDA tags */
    tags?: InputMaybe<Array<Scalars['String']['input']>>;
};
export type FilterProofInput = {
    /** Data Template IDs */
    dataTemplateIds?: InputMaybe<Array<Scalars['String']['input']>>;
    facilitationFee?: InputMaybe<FacilitationFeeInput>;
    /** Owners that have issued the proofs */
    owners?: InputMaybe<Array<UserIdentificationInput>>;
    /** PDA IDs */
    pdaIds?: InputMaybe<Array<Scalars['String']['input']>>;
};
export type FilterTransactionsInput = {
    showMoneyTxs?: InputMaybe<Scalars['Boolean']['input']>;
    skip?: InputMaybe<Scalars['Int']['input']>;
    take?: InputMaybe<Scalars['Int']['input']>;
};
export type FinancialSummaryOutput = {
    action: FinancialTransactionAction;
    amount: Scalars['Float']['output'];
};
export type FinancialTransaction = {
    action: FinancialTransactionAction;
    createdAt?: Maybe<Scalars['DateTime']['output']>;
    fee: Scalars['Float']['output'];
    from?: Maybe<IdentifierUnion>;
    /** Financial Transaction ID */
    id: Scalars['String']['output'];
    memo?: Maybe<Scalars['JSON']['output']>;
    to?: Maybe<IdentifierUnion>;
    total: Scalars['Float']['output'];
    transaction?: Maybe<Transaction>;
    transactionId?: Maybe<Scalars['String']['output']>;
    type: FinancialTransactionType;
    updatedAt?: Maybe<Scalars['DateTime']['output']>;
    value: Scalars['Float']['output'];
    wallet: Wallet;
};
/** Detail of the financial transaction */
export type FinancialTransactionAction = 'DATAMODEL_CREATE' | 'ISSUER_EARNINGS' | 'MONEY_DEPOSIT' | 'MONEY_WITHDRAW' | 'PDA_ISSUANCE' | 'PDA_STATUS_CHANGE' | 'PDA_UPDATE' | 'PROOF_CREATE' | 'PROOF_STATUS_CHANGE' | 'REQUEST_CREATE' | 'REQUEST_STATUS_CHANGE' | 'REQUEST_TEMPLATE_CREATE' | 'TRANSACTION_FEES';
/** Type of the financial transaction */
export type FinancialTransactionType = 'DEPOSIT' | 'EARNING' | 'EXPENSE' | 'WITHDRAW';
export type FloatRangeDto = {
    max?: InputMaybe<Scalars['Float']['input']>;
    min?: InputMaybe<Scalars['Float']['input']>;
};
export type IdentificationInput = {
    /** Type of the identification */
    type?: InputMaybe<IdentifierType>;
    /** Value of the identification */
    value: Scalars['String']['input'];
};
/** User identifier type, it can be an email or a wallet address. Default: UNKNOWN */
export type IdentifierType = 'EMAIL' | 'EVM' | 'GATEWAY_ID' | 'ORG_ID' | 'SOLANA' | 'USER_ID';
export type IdentifierUnion = Organization | User;
export type LoginEmailInput = {
    code: Scalars['Float']['input'];
    email: Scalars['String']['input'];
};
export type LoginOutput = {
    protocol_id: Scalars['String']['output'];
    refresh_token: Scalars['String']['output'];
    token: Scalars['String']['output'];
    user: User;
};
export type LoginWalletInput = {
    /**
     * Signature of the message generated by the wallet
     *
     * EVM: Hash
     *
     * SOL: Base58 hash
     */
    signature: Scalars['String']['input'];
    wallet: Scalars['String']['input'];
};
export type MemberInput = {
    organization: OrganizationIdentificationInput;
    /** Role of the User in the Organization */
    role?: InputMaybe<OrganizationRole>;
    user: UserIdentificationInput;
};
export type MetadataUnion = DataModelMetadata | OrganizationMetadata | PDAMetadata | ProofMetadata | RequestMetadata | RequestTemplateMetadata | UserMetadata;
export type MigrateAuthInput = {
    authId: Scalars['String']['input'];
    ownerJwt: Scalars['String']['input'];
};
export type Mutation = {
    /** Add email address to your GatewayID */
    addEmail: CreateEmailNonceOutput;
    /** Confirmation of adding email to your Gateway ID. Pass a verification code generated by addEmail beforehand. */
    addEmailConfirmation: SignupConfirmationOutput;
    /** Add a member to an organization */
    addMemberToOrganization: OrganizationAccess;
    /** Add a SOL or EVM wallet to your GatewayID  */
    addWallet: CreateWalletNonceOutput;
    /** Confirmation of adding wallet to your Gateway ID. Sign a nonce generated by addWallet beforehand. */
    addWalletConfirmation: User;
    /** Organization admins can change user role on organization. User must be a member of the organization.  */
    changeMemberRole: OrganizationAccess;
    /** Update the status of PDA. */
    changePDAStatus: PrivateDataAsset;
    createApplication: Application;
    /** Creates a new data model. */
    createDataModel: DataModel;
    createDataRequest: DataRequest;
    createDataRequestTemplate: DataRequestTemplate;
    /** Create a nonce for a email to be used for login. Default Chain is EVM. */
    createEmailNonce: CreateEmailNonceOutput;
    createOrganization: Organization;
    createPDA: PrivateDataAsset;
    createProof: Proof;
    createProofMessage: Scalars['String']['output'];
    /** Create a nonce for a wallet to be used for login. Default Chain is EVM. */
    createWalletNonce: CreateWalletNonceOutput;
    /** Soft Remove user account */
    deleteAccount?: Maybe<Scalars['Boolean']['output']>;
    loginEmail: LoginOutput;
    loginWallet: LoginOutput;
    migrateAuthMethod: Scalars['Boolean']['output'];
    refreshToken: LoginOutput;
    rejectDataRequest: DataRequest;
    removeApplication: Application;
    /** Remove a member from an organization */
    removeMemberFromOrganization: Scalars['Boolean']['output'];
    /** Organization owner can transfer ownership to another user */
    transferOwnership: OrganizationAccess;
    unregisterAuthMethod: Scalars['Boolean']['output'];
    updateMyDisplayName?: Maybe<Scalars['String']['output']>;
    updateMyGatewayId: User;
    updateMyProfilePicture?: Maybe<Scalars['String']['output']>;
    updateNotificationEmail: SignupConfirmationOutput;
    updateOrganization: Organization;
    updatePDA: PrivateDataAsset;
    updateUser: User;
};
export type MutationaddEmailArgs = {
    input: AddEmailInput;
};
export type MutationaddEmailConfirmationArgs = {
    input: AddEmailConfirmationInput;
};
export type MutationaddMemberToOrganizationArgs = {
    input: MemberInput;
};
export type MutationaddWalletArgs = {
    input: CreateWalletNonceInput;
};
export type MutationaddWalletConfirmationArgs = {
    input: AddWalletConfirmationInput;
};
export type MutationchangeMemberRoleArgs = {
    input: MemberInput;
};
export type MutationchangePDAStatusArgs = {
    input: UpdatePDAStatusInput;
};
export type MutationcreateApplicationArgs = {
    input: CreateApplicationInput;
};
export type MutationcreateDataModelArgs = {
    input: CreateDataModelInput;
};
export type MutationcreateDataRequestArgs = {
    input: DataRequestSchemaInput;
};
export type MutationcreateDataRequestTemplateArgs = {
    input: TemplateSchemaInput;
};
export type MutationcreateEmailNonceArgs = {
    input: CreateEmailNonceInput;
};
export type MutationcreateOrganizationArgs = {
    input: CreateOrganizationInput;
};
export type MutationcreatePDAArgs = {
    input: CreatePDAInput;
};
export type MutationcreateProofArgs = {
    claims?: InputMaybe<Scalars['JSON']['input']>;
    requestId?: InputMaybe<Scalars['String']['input']>;
    signature?: InputMaybe<Scalars['String']['input']>;
    verifier?: InputMaybe<IdentificationInput>;
    wallet?: InputMaybe<Scalars['String']['input']>;
};
export type MutationcreateProofMessageArgs = {
    requestId: Scalars['String']['input'];
};
export type MutationcreateWalletNonceArgs = {
    input: CreateWalletNonceInput;
};
export type MutationdeleteAccountArgs = {
    id: Scalars['String']['input'];
};
export type MutationloginEmailArgs = {
    input: LoginEmailInput;
};
export type MutationloginWalletArgs = {
    input: LoginWalletInput;
};
export type MutationmigrateAuthMethodArgs = {
    input: MigrateAuthInput;
};
export type MutationrefreshTokenArgs = {
    input: RefreshTokenInput;
};
export type MutationrejectDataRequestArgs = {
    requestId: Scalars['String']['input'];
};
export type MutationremoveApplicationArgs = {
    id: Scalars['String']['input'];
};
export type MutationremoveMemberFromOrganizationArgs = {
    input: TransferMemberInput;
};
export type MutationtransferOwnershipArgs = {
    input: TransferMemberInput;
};
export type MutationunregisterAuthMethodArgs = {
    input: AuthInput;
};
export type MutationupdateMyDisplayNameArgs = {
    displayName?: InputMaybe<Scalars['String']['input']>;
};
export type MutationupdateMyGatewayIdArgs = {
    gatewayId: Scalars['String']['input'];
};
export type MutationupdateMyProfilePictureArgs = {
    profilePictureUrl?: InputMaybe<Scalars['String']['input']>;
};
export type MutationupdateNotificationEmailArgs = {
    email: Scalars['String']['input'];
};
export type MutationupdateOrganizationArgs = {
    input: UpdateOrganizationInput;
};
export type MutationupdatePDAArgs = {
    input: UpdatePDAInput;
};
export type MutationupdateUserArgs = {
    input: UpdateUserInput;
};
export type Organization = {
    /** Organization users and roles */
    accesses?: Maybe<Array<OrganizationAccess>>;
    /** Arweave URL */
    arweaveUrl?: Maybe<Scalars['String']['output']>;
    /** Created date */
    createdAt: Scalars['DateTime']['output'];
    dataModels?: Maybe<Array<DataModel>>;
    /** Data Request Template */
    dataRequestTemplates: Array<DataRequestTemplate>;
    /** Description of the Organization */
    description: Scalars['String']['output'];
    /** GatewayID of the Organization */
    gatewayId?: Maybe<Scalars['String']['output']>;
    id: Scalars['String']['output'];
    /** Image of the Organization */
    image?: Maybe<Scalars['String']['output']>;
    /** Name of the Organization */
    name: Scalars['String']['output'];
    receivedProofs?: Maybe<Array<Proof>>;
    /** Updated date */
    updatedAt: Scalars['DateTime']['output'];
    /** Username updated date */
    usernameUpdatedAt: Scalars['DateTime']['output'];
    /** Is the organization verified */
    verified: Scalars['Boolean']['output'];
    /** Data Request that I am the Verifier */
    verifierDataRequests: Array<DataRequest>;
    /** Organization account balance */
    walletId?: Maybe<Scalars['String']['output']>;
    website?: Maybe<Scalars['String']['output']>;
};
export type OrganizationAccess = {
    id: Scalars['String']['output'];
    /** User of the Organization */
    organization: Organization;
    /** Role of the User in the Organization */
    role: OrganizationRole;
    /** User of the Organization */
    user: User;
};
export type OrganizationIdentificationInput = {
    /** Type of the identification */
    type: OrganizationIdentifierType;
    /** Value of the identification */
    value: Scalars['String']['input'];
};
/** Organization identifier type, it can be an orgId or a Gateway ID. Default: UNKNOWN */
export type OrganizationIdentifierType = 'GATEWAY_ID' | 'ORG_ID';
export type OrganizationMetadata = {
    organization: Scalars['String']['output'];
    users: Array<Scalars['String']['output']>;
    usersAdmin: Array<Scalars['String']['output']>;
    verified: Scalars['Boolean']['output'];
};
/** User role on a organization */
export type OrganizationRole = 'Admin' | 'Member' | 'Owner';
export type PDAClaim = {
    description?: Maybe<Scalars['String']['output']>;
    label?: Maybe<Scalars['String']['output']>;
    metadata?: Maybe<Scalars['JSON']['output']>;
    property: Scalars['String']['output'];
    type: Scalars['String']['output'];
    value: Scalars['String']['output'];
};
export type PDAMetadata = {
    dataModel: Scalars['String']['output'];
    expirationDate?: Maybe<Scalars['DateTime']['output']>;
    issuer: Scalars['String']['output'];
    pda: Scalars['String']['output'];
    signedBy: Scalars['String']['output'];
    pdametadastatus: PDAStatus;
};
/** Statuses of PDAs */
export type PDAStatus = 'Expired' | 'Revoked' | 'Suspended' | 'Valid';
/** Organizations or IDs that can issue a credential from specific data model */
export type PermissionType = 'ALL' | 'ORGANIZATIONS' | 'SPECIFIC_IDS';
export type PrivateDataAsset = {
    /** Arweave URL */
    arweaveUrl: Scalars['String']['output'];
    /** PDA Claims */
    claimHash: Scalars['JSON']['output'];
    /** Decrypted Data Asset (only available to owner) */
    dataAsset?: Maybe<DecryptedPDA>;
    /** Expiration Date */
    expirationDate?: Maybe<Scalars['DateTime']['output']>;
    /** PDA Hash */
    hash?: Maybe<Scalars['String']['output']>;
    /** PDA ID */
    id: Scalars['String']['output'];
    /** Issuance Date */
    issuanceDate: Scalars['DateTime']['output'];
    /** Hash of PDA Issuer */
    issuerHash?: Maybe<Scalars['String']['output']>;
    /** Updated Date */
    lastUpdated: Scalars['DateTime']['output'];
    /** Hash of the PDA Owner */
    ownerHash?: Maybe<Scalars['String']['output']>;
    status: PDAStatus;
};
export type Proof = {
    /** Arweave URL */
    arweaveUrl: Scalars['String']['output'];
    /** Created Date */
    createdAt: Scalars['DateTime']['output'];
    /** Decrypted Proof Response */
    data?: Maybe<DecryptedProof>;
    /** Data Request */
    dataRequest?: Maybe<DataRequest>;
    /** Facilitation Fee */
    facilitationFee: Scalars['Float']['output'];
    hash: Scalars['String']['output'];
    /** Proof ID */
    id: Scalars['String']['output'];
    /** Recipient User */
    owner: User;
    /** Proof Hash */
    proofHash: Scalars['JSON']['output'];
    status: ProofStatus;
    /** Total Cost */
    totalCost: Scalars['Float']['output'];
    /** Updated Date */
    updatedAt: Scalars['DateTime']['output'];
    /** Verifier user */
    verifier?: Maybe<User>;
    verifierOrganization?: Maybe<Organization>;
};
export type ProofCost = {
    facilitationFee: Scalars['Float']['output'];
    totalCost: Scalars['Float']['output'];
};
export type ProofMetadata = {
    earnings: Scalars['Float']['output'];
    fees: Scalars['Float']['output'];
    owner: Scalars['String']['output'];
    proof: Scalars['String']['output'];
    request?: Maybe<Scalars['String']['output']>;
    status: Scalars['String']['output'];
    verifier: Scalars['String']['output'];
};
/** Proof status type. Default: SYNCED */
export type ProofStatus = 'ACTIVE' | 'OUTDATED' | 'REVOKED';
export type Query = {
    PDA?: Maybe<PrivateDataAsset>;
    PDACount: Scalars['Float']['output'];
    PDAs: Array<PrivateDataAsset>;
    applications: Array<Application>;
    calculateProofCost: ProofCost;
    checkUsernameAvailability: Scalars['Boolean']['output'];
    createDepositLink: Scalars['String']['output'];
    dataModel: DataModel;
    dataModels: Array<DataModel>;
    dataModelsCount: Scalars['Float']['output'];
    dataModelsMetadata: DataModelsMetadata;
    dataRequest: DataRequest;
    dataRequestCount: Scalars['Float']['output'];
    dataRequestStatus: DataResourceStatus;
    dataRequestTemplate?: Maybe<DataRequestTemplate>;
    dataRequestTemplates: Array<DataRequestTemplate>;
    dataRequestTemplatesCount: Scalars['Float']['output'];
    dataRequestTemplatesMetadata: DataRequestTemplatesMetadata;
    dataRequests: Array<DataRequest>;
    financialTransactions: Array<FinancialTransaction>;
    findValidPDAsForRequest: Array<ValidPDAForRequest>;
    generatedFees: Scalars['Float']['output'];
    getExplorerStats: ExplorerAnalyticsSchema;
    getMonthlyUserUsage: UserUsageDto;
    getTotalofIssuersByDataModel: Scalars['Int']['output'];
    getTransactionsExplorerStats: ExplorerTransactionsAnalyticsSchema;
    issuedPDAs: Array<PrivateDataAsset>;
    issuedPDAsCount: Scalars['Float']['output'];
    issuersByDataModel: Array<DataModelIssuer>;
    issuersByDataModelCount: Scalars['Float']['output'];
    me: User;
    myDataModelsCount: Scalars['Float']['output'];
    myDataRequestTemplatesCount: Scalars['Float']['output'];
    myFinancialTransactions: Array<FinancialTransaction>;
    myFinancialTransactionsCount: Scalars['Float']['output'];
    myPDACount: Scalars['Float']['output'];
    myPDAs: Array<PrivateDataAsset>;
    myTransactions: Array<Transaction>;
    myWallet: Wallet;
    organization?: Maybe<Organization>;
    organizations: Array<Organization>;
    proof: Proof;
    proofs: Array<Proof>;
    proofsByPDAIds: Array<Proof>;
    receivedProofs: Array<Proof>;
    receivedProofsCount: Scalars['Float']['output'];
    requestsReceived: Array<DataRequest>;
    requestsReceivedCount: Scalars['Float']['output'];
    requestsSent: Array<DataRequest>;
    requestsSentCount: Scalars['Float']['output'];
    sentProofs: Array<Proof>;
    sentProofsCount: Scalars['Float']['output'];
    templateByDataRequest?: Maybe<DataRequestTemplate>;
    transaction: Transaction;
    transactions: Array<Transaction>;
    transactionsCount: Scalars['Float']['output'];
    user?: Maybe<User>;
    verifiersByDataRequestTemplate: Array<DataRequestTemplateVerifier>;
    verifiersByDataRequestTemplateCount: Scalars['Float']['output'];
};
export type QueryPDAArgs = {
    id: Scalars['String']['input'];
};
export type QueryPDACountArgs = {
    filter?: InputMaybe<FilterPDAInput>;
};
export type QueryPDAsArgs = {
    filter?: InputMaybe<FilterPDAInput>;
    order?: InputMaybe<Scalars['JSON']['input']>;
    skip?: InputMaybe<Scalars['Float']['input']>;
    take?: InputMaybe<Scalars['Float']['input']>;
};
export type QuerycalculateProofCostArgs = {
    requestId: Scalars['String']['input'];
};
export type QuerycheckUsernameAvailabilityArgs = {
    username: Scalars['String']['input'];
};
export type QuerydataModelArgs = {
    id: Scalars['String']['input'];
};
export type QuerydataModelsArgs = {
    filter?: InputMaybe<FilterDataModelInput>;
    order?: InputMaybe<Scalars['JSON']['input']>;
    skip?: InputMaybe<Scalars['Int']['input']>;
    take?: InputMaybe<Scalars['Int']['input']>;
};
export type QuerydataModelsCountArgs = {
    filter?: InputMaybe<FilterDataModelInput>;
};
export type QuerydataRequestArgs = {
    requestId: Scalars['String']['input'];
};
export type QuerydataRequestCountArgs = {
    filter?: InputMaybe<FilterDataRequestInput>;
};
export type QuerydataRequestStatusArgs = {
    requestId: Scalars['String']['input'];
};
export type QuerydataRequestTemplateArgs = {
    id: Scalars['String']['input'];
};
export type QuerydataRequestTemplatesArgs = {
    filter?: InputMaybe<FilterDataRequestTemplateInput>;
    order?: InputMaybe<Scalars['JSON']['input']>;
    skip?: InputMaybe<Scalars['Int']['input']>;
    take?: InputMaybe<Scalars['Float']['input']>;
};
export type QuerydataRequestTemplatesCountArgs = {
    filter?: InputMaybe<FilterDataRequestTemplateInput>;
};
export type QuerydataRequestsArgs = {
    filter?: InputMaybe<FilterDataRequestInput>;
};
export type QueryfinancialTransactionsArgs = {
    identifier: TransactionIdentifierInput;
    skip?: InputMaybe<Scalars['Int']['input']>;
    take?: InputMaybe<Scalars['Int']['input']>;
};
export type QueryfindValidPDAsForRequestArgs = {
    requestId: Scalars['String']['input'];
};
export type QuerygetTotalofIssuersByDataModelArgs = {
    dataModelId: Scalars['String']['input'];
};
export type QueryissuedPDAsArgs = {
    filter?: InputMaybe<FilterPDAInput>;
    order?: InputMaybe<Scalars['JSON']['input']>;
    skip?: InputMaybe<Scalars['Float']['input']>;
    take?: InputMaybe<Scalars['Float']['input']>;
};
export type QueryissuedPDAsCountArgs = {
    filter?: InputMaybe<FilterPDAInput>;
};
export type QueryissuersByDataModelArgs = {
    id: Scalars['String']['input'];
};
export type QueryissuersByDataModelCountArgs = {
    id: Scalars['String']['input'];
};
export type QuerymyDataModelsCountArgs = {
    filter?: InputMaybe<FilterDataModelInput>;
};
export type QuerymyDataRequestTemplatesCountArgs = {
    filter?: InputMaybe<FilterDataRequestTemplateInput>;
};
export type QuerymyFinancialTransactionsArgs = {
    organizationId?: InputMaybe<Scalars['String']['input']>;
    skip?: InputMaybe<Scalars['Int']['input']>;
    take?: InputMaybe<Scalars['Int']['input']>;
};
export type QuerymyFinancialTransactionsCountArgs = {
    organizationId?: InputMaybe<Scalars['String']['input']>;
};
export type QuerymyPDACountArgs = {
    filter?: InputMaybe<FilterPDAInput>;
};
export type QuerymyPDAsArgs = {
    filter?: InputMaybe<FilterPDAInput>;
    order?: InputMaybe<Scalars['JSON']['input']>;
    skip?: InputMaybe<Scalars['Float']['input']>;
    take?: InputMaybe<Scalars['Float']['input']>;
};
export type QuerymyTransactionsArgs = {
    filter?: InputMaybe<FilterTransactionsInput>;
};
export type QuerymyWalletArgs = {
    organizationId?: InputMaybe<Scalars['String']['input']>;
};
export type QueryorganizationArgs = {
    input: OrganizationIdentificationInput;
};
export type QueryorganizationsArgs = {
    filter?: InputMaybe<FilterOrganizationInput>;
    skip?: InputMaybe<Scalars['Float']['input']>;
    take?: InputMaybe<Scalars['Float']['input']>;
};
export type QueryproofArgs = {
    id: Scalars['String']['input'];
};
export type QueryproofsArgs = {
    filter?: InputMaybe<FilterProofInput>;
    order?: InputMaybe<Scalars['JSON']['input']>;
    skip?: InputMaybe<Scalars['Float']['input']>;
    take?: InputMaybe<Scalars['Float']['input']>;
};
export type QueryproofsByPDAIdsArgs = {
    pdaIds: Array<Scalars['String']['input']>;
    skip?: InputMaybe<Scalars['Float']['input']>;
    take?: InputMaybe<Scalars['Float']['input']>;
};
export type QueryreceivedProofsArgs = {
    order?: InputMaybe<Scalars['JSON']['input']>;
    organizationId?: InputMaybe<Scalars['String']['input']>;
    skip?: InputMaybe<Scalars['Float']['input']>;
    take?: InputMaybe<Scalars['Float']['input']>;
};
export type QueryreceivedProofsCountArgs = {
    organizationId?: InputMaybe<Scalars['String']['input']>;
};
export type QueryrequestsReceivedArgs = {
    filter?: InputMaybe<FilterDataRequestInput>;
    order?: InputMaybe<Scalars['JSON']['input']>;
    skip?: InputMaybe<Scalars['Float']['input']>;
    take?: InputMaybe<Scalars['Float']['input']>;
};
export type QueryrequestsReceivedCountArgs = {
    filter?: InputMaybe<FilterDataRequestInput>;
};
export type QueryrequestsSentArgs = {
    filter?: InputMaybe<FilterDataRequestInput>;
    order?: InputMaybe<Scalars['JSON']['input']>;
    skip?: InputMaybe<Scalars['Float']['input']>;
    take?: InputMaybe<Scalars['Float']['input']>;
};
export type QueryrequestsSentCountArgs = {
    filter?: InputMaybe<FilterDataRequestInput>;
};
export type QuerysentProofsArgs = {
    order?: InputMaybe<Scalars['JSON']['input']>;
    skip?: InputMaybe<Scalars['Float']['input']>;
    take?: InputMaybe<Scalars['Float']['input']>;
};
export type QuerytemplateByDataRequestArgs = {
    requestID: Scalars['String']['input'];
};
export type QuerytransactionArgs = {
    id: Scalars['String']['input'];
};
export type QuerytransactionsArgs = {
    filter?: InputMaybe<FilterTransactionsInput>;
};
export type QuerytransactionsCountArgs = {
    showMoneyTxs?: InputMaybe<Scalars['Boolean']['input']>;
};
export type QueryuserArgs = {
    input: UserIdentificationInput;
};
export type QueryverifiersByDataRequestTemplateArgs = {
    id: Scalars['String']['input'];
};
export type QueryverifiersByDataRequestTemplateCountArgs = {
    id: Scalars['String']['input'];
};
export type RefreshTokenInput = {
    refresh_token: Scalars['String']['input'];
};
export type RequestIssueanceDateSchemaInput = {
    after: Scalars['DateTimeISO']['input'];
    before: Scalars['DateTimeISO']['input'];
};
export type RequestIssueanceDateSchemaObject = {
    after: Scalars['DateTimeISO']['output'];
    before: Scalars['DateTimeISO']['output'];
};
export type RequestMetadata = {
    owner: Scalars['String']['output'];
    request: Scalars['String']['output'];
    requestTemplate: Scalars['String']['output'];
    status: Scalars['String']['output'];
    verifier: Scalars['String']['output'];
};
export type RequestTemplateMetadata = {
    creator: Scalars['String']['output'];
    dataModels: Array<Scalars['String']['output']>;
    requestTemplate: Scalars['String']['output'];
    signedBy: Scalars['String']['output'];
};
/** User role */
export type Role = 'Admin' | 'User';
export type SignupConfirmationOutput = {
    user: User;
};
export type TemplateSchemaInput = {
    /** Request Template Data Models */
    dataModels: Array<DataRequestTemplateDataModelSchemaInput>;
    /** Request Template Description */
    description: Scalars['String']['input'];
    /** Organization Id that wants to create the template */
    organization?: InputMaybe<OrganizationIdentificationInput>;
    /** Request Template Tags */
    tags?: InputMaybe<Array<Scalars['String']['input']>>;
    /** Request Template Title */
    title: Scalars['String']['input'];
};
export type Transaction = {
    action: TransactionAction;
    arweaveUrl?: Maybe<Scalars['String']['output']>;
    cost?: Maybe<Scalars['Float']['output']>;
    createdAt?: Maybe<Scalars['DateTime']['output']>;
    financialTransactions: Array<FinancialTransaction>;
    from?: Maybe<IdentifierUnion>;
    /** Transaction ID */
    id: Scalars['String']['output'];
    metadata: MetadataUnion;
    to?: Maybe<IdentifierUnion>;
    updatedAt?: Maybe<Scalars['DateTime']['output']>;
};
/** Detail of the transaction */
export type TransactionAction = 'DATAMODEL_CREATE' | 'ISSUER_EARNINGS' | 'MONEY_DEPOSIT' | 'MONEY_WITHDRAW' | 'ORGANIZATION_CREATE' | 'ORGANIZATION_UPDATE' | 'PDA_ISSUANCE' | 'PDA_STATUS_CHANGE' | 'PDA_UPDATE' | 'PROOF_CREATE' | 'PROOF_STATUS_CHANGE' | 'REQUEST_CREATE' | 'REQUEST_STATUS_CHANGE' | 'REQUEST_TEMPLATE_CREATE' | 'TRANSACTION_FEES' | 'USER_CREATE';
export type TransactionIdentifierInput = {
    id?: InputMaybe<Scalars['String']['input']>;
    type: TransactionIdentifierType;
};
export type TransactionIdentifierType = 'ORGANIZATION' | 'POOL' | 'USER';
export type TransferMemberInput = {
    organization: OrganizationIdentificationInput;
    user: UserIdentificationInput;
};
export type UpdateOrganizationInput = {
    /** Description of the organization */
    description?: InputMaybe<Scalars['String']['input']>;
    id: Scalars['String']['input'];
    /** Image of the organization */
    image?: InputMaybe<Scalars['String']['input']>;
    /** Name of the organization */
    name?: InputMaybe<Scalars['String']['input']>;
    /** Username/GatewayID of the organization */
    username?: InputMaybe<Scalars['String']['input']>;
    /** Website of the organization */
    website?: InputMaybe<Scalars['String']['input']>;
};
export type UpdatePDAInput = {
    /** PDA Context information based on the selected Data Model */
    claim?: InputMaybe<Scalars['JSON']['input']>;
    /** PDA Description */
    description?: InputMaybe<Scalars['String']['input']>;
    id: Scalars['String']['input'];
    /** PDA Image */
    image?: InputMaybe<Scalars['String']['input']>;
    /** PDA Title */
    title?: InputMaybe<Scalars['String']['input']>;
};
export type UpdatePDAStatusInput = {
    /** ID of PDA */
    id: Scalars['String']['input'];
    /** New status of PDA */
    status: PDAStatus;
};
export type UpdateUserInput = {
    /** User display name */
    displayName?: InputMaybe<Scalars['String']['input']>;
    /** User Gateway ID */
    gatewayId?: InputMaybe<Scalars['String']['input']>;
    /** User Profile picture */
    profilePicture?: InputMaybe<Scalars['String']['input']>;
    /** User status */
    roles?: InputMaybe<Array<Role>>;
    /** User status */
    status?: InputMaybe<Scalars['String']['input']>;
};
export type User = {
    /** Organizations and roles of a user */
    accesses?: Maybe<Array<OrganizationAccess>>;
    /** Arweave URL */
    arweaveUrl?: Maybe<Scalars['String']['output']>;
    authentications?: Maybe<Array<Auth>>;
    /** Created date */
    createdAt: Scalars['DateTime']['output'];
    /** Extra credits for credentials issuance. */
    credentialsExtraCredits: Scalars['Float']['output'];
    dataModels?: Maybe<Array<DataModel>>;
    /** Extra credits for dataModels creation. */
    dataModelsExtraCredits: Scalars['Float']['output'];
    /** Data Request Template */
    dataRequestTemplates: Array<DataRequestTemplate>;
    /** User account deleted date */
    deletedAt?: Maybe<Scalars['DateTime']['output']>;
    /** Display name */
    displayName?: Maybe<Scalars['String']['output']>;
    /** User primary email. Used for communication purposes */
    email?: Maybe<Scalars['String']['output']>;
    /** User username */
    gatewayId?: Maybe<Scalars['String']['output']>;
    /** Username updated date */
    gatewayIdLastupdate: Scalars['DateTime']['output'];
    /** GatewayId updated date */
    gatewayIdUpdatedAt?: Maybe<Scalars['DateTime']['output']>;
    hash?: Maybe<Scalars['String']['output']>;
    id: Scalars['String']['output'];
    isCompleted: Scalars['Boolean']['output'];
    issuedPDAs: Array<PrivateDataAsset>;
    issuedProofs?: Maybe<Array<Proof>>;
    /** Profile picture */
    profilePicture?: Maybe<Scalars['String']['output']>;
    receivedPDAs: Array<PrivateDataAsset>;
    receivedProofs: Array<Proof>;
    /** Data Request that I am the Recipient */
    recipientDataRequests: Array<DataRequest>;
    /** User status */
    roles: Array<Role>;
    /** User status */
    status?: Maybe<Scalars['String']['output']>;
    /** Updated date */
    updatedAt: Scalars['DateTime']['output'];
    /** Data Request that I am the Verifier */
    verifierDataRequests: Array<DataRequest>;
    /** User wallet address */
    walletId?: Maybe<Scalars['String']['output']>;
};
export type UserIdentificationInput = {
    /** Type of the identification */
    type: UserIdentifierType;
    /** Value of the identification */
    value: Scalars['String']['input'];
};
/** User identifier type, it can be an email or a wallet address. Default: UNKNOWN */
export type UserIdentifierType = 'EMAIL' | 'EVM' | 'GATEWAY_ID' | 'SOLANA' | 'USER_ID';
export type UserMetadata = {
    user: Scalars['String']['output'];
};
export type UserUsageDto = {
    credentialsUsageAllowedByMonth: Scalars['Int']['output'];
    datamodelsUsageAllowedByMonth: Scalars['Int']['output'];
    monthlyCredentials: Scalars['Int']['output'];
    monthlyDatamodels: Scalars['Int']['output'];
};
export type ValidDataRequested = {
    provided: Scalars['JSON']['output'];
    requested: Scalars['JSON']['output'];
};
export type ValidPDAForRequest = {
    dataModel: DataModel;
    pdas: Array<PrivateDataAsset>;
    required: Scalars['Boolean']['output'];
    schema: DataRequestTemplateDataModelSchemaObject;
    validData?: Maybe<Array<ValidDataRequested>>;
};
export type Wallet = {
    balance: Scalars['Float']['output'];
    moneyIn: Scalars['Float']['output'];
    moneyInSummary: Array<FinancialSummaryOutput>;
    moneyOut: Scalars['Float']['output'];
    moneyOutSummary: Array<FinancialSummaryOutput>;
};
export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;
export type ResolverTypeWrapper<T> = Promise<T> | T;
export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
    resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
    fragment: string;
    resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
    selectionSet: string | ((fieldNode: FieldNode) => SelectionSetNode);
    resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs> | StitchingResolver<TResult, TParent, TContext, TArgs>;
export type ResolverFn<TResult, TParent, TContext, TArgs> = (parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => Promise<TResult> | TResult;
export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;
export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => TResult | Promise<TResult>;
export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
    subscribe: SubscriptionSubscribeFn<{
        [key in TKey]: TResult;
    }, TParent, TContext, TArgs>;
    resolve?: SubscriptionResolveFn<TResult, {
        [key in TKey]: TResult;
    }, TContext, TArgs>;
}
export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
    subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
    resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}
export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> = SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs> | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;
export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> = ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>) | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;
export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (parent: TParent, context: TContext, info: GraphQLResolveInfo) => Maybe<TTypes> | Promise<Maybe<TTypes>>;
export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;
export type NextResolverFn<T> = () => Promise<T>;
export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (next: NextResolverFn<TResult>, parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => TResult | Promise<TResult>;
/** Mapping of union types */
export type ResolversUnionTypes<RefType extends Record<string, unknown>> = ResolversObject<{
    IdentifierUnion: (Organization) | (User);
    MetadataUnion: (DataModelMetadata) | (OrganizationMetadata) | (PDAMetadata) | (ProofMetadata) | (RequestMetadata) | (RequestTemplateMetadata) | (UserMetadata);
}>;
/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
    AddEmailConfirmationInput: AddEmailConfirmationInput;
    AddEmailInput: AddEmailInput;
    AddWalletConfirmationInput: AddWalletConfirmationInput;
    Application: ResolverTypeWrapper<Application>;
    ApplicationType: ApplicationType;
    Auth: ResolverTypeWrapper<Auth>;
    AuthDataType: ResolverTypeWrapper<AuthDataType>;
    AuthInput: AuthInput;
    AuthType: AuthType;
    Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
    Chain: Chain;
    CreateApplicationInput: CreateApplicationInput;
    CreateDataModelInput: CreateDataModelInput;
    CreateEmailNonceInput: CreateEmailNonceInput;
    CreateEmailNonceOutput: ResolverTypeWrapper<CreateEmailNonceOutput>;
    CreateOrganizationInput: CreateOrganizationInput;
    CreatePDAInput: CreatePDAInput;
    CreateWalletNonceInput: CreateWalletNonceInput;
    CreateWalletNonceOutput: ResolverTypeWrapper<CreateWalletNonceOutput>;
    DataModel: ResolverTypeWrapper<DataModel>;
    DataModelGroup: ResolverTypeWrapper<DataModelGroup>;
    DataModelIssuer: ResolverTypeWrapper<Omit<DataModelIssuer, 'issuer'> & {
        issuer?: Maybe<ResolversTypes['IdentifierUnion']>;
    }>;
    DataModelMetadata: ResolverTypeWrapper<DataModelMetadata>;
    DataModelsMetadata: ResolverTypeWrapper<DataModelsMetadata>;
    DataRequest: ResolverTypeWrapper<DataRequest>;
    DataRequestSchemaInput: DataRequestSchemaInput;
    DataRequestTemplate: ResolverTypeWrapper<DataRequestTemplate>;
    DataRequestTemplateDataModelSchemaInput: DataRequestTemplateDataModelSchemaInput;
    DataRequestTemplateDataModelSchemaObject: ResolverTypeWrapper<DataRequestTemplateDataModelSchemaObject>;
    DataRequestTemplateVerifier: ResolverTypeWrapper<Omit<DataRequestTemplateVerifier, 'verifier'> & {
        verifier?: Maybe<ResolversTypes['IdentifierUnion']>;
    }>;
    DataRequestTemplatesMetadata: ResolverTypeWrapper<DataRequestTemplatesMetadata>;
    DataResourceStatus: DataResourceStatus;
    Date: ResolverTypeWrapper<Scalars['Date']['output']>;
    DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
    DateTimeISO: ResolverTypeWrapper<Scalars['DateTimeISO']['output']>;
    DecryptedPDA: ResolverTypeWrapper<DecryptedPDA>;
    DecryptedProof: ResolverTypeWrapper<DecryptedProof>;
    DecryptedProofPDA: ResolverTypeWrapper<DecryptedProofPDA>;
    ExplorerAnalyticsSchema: ResolverTypeWrapper<ExplorerAnalyticsSchema>;
    ExplorerTransactionsAnalyticsSchema: ResolverTypeWrapper<ExplorerTransactionsAnalyticsSchema>;
    FacilitationFeeInput: FacilitationFeeInput;
    FilterDataModelInput: FilterDataModelInput;
    FilterDataRequestInput: FilterDataRequestInput;
    FilterDataRequestTemplateInput: FilterDataRequestTemplateInput;
    FilterOrganizationInput: FilterOrganizationInput;
    FilterPDAInput: FilterPDAInput;
    FilterProofInput: FilterProofInput;
    FilterTransactionsInput: FilterTransactionsInput;
    FinancialSummaryOutput: ResolverTypeWrapper<FinancialSummaryOutput>;
    FinancialTransaction: ResolverTypeWrapper<Omit<FinancialTransaction, 'from' | 'to'> & {
        from?: Maybe<ResolversTypes['IdentifierUnion']>;
        to?: Maybe<ResolversTypes['IdentifierUnion']>;
    }>;
    FinancialTransactionAction: FinancialTransactionAction;
    FinancialTransactionType: FinancialTransactionType;
    Float: ResolverTypeWrapper<Scalars['Float']['output']>;
    FloatRangeDto: FloatRangeDto;
    IdentificationInput: IdentificationInput;
    IdentifierType: IdentifierType;
    IdentifierUnion: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['IdentifierUnion']>;
    Int: ResolverTypeWrapper<Scalars['Int']['output']>;
    JSON: ResolverTypeWrapper<Scalars['JSON']['output']>;
    LoginEmailInput: LoginEmailInput;
    LoginOutput: ResolverTypeWrapper<LoginOutput>;
    LoginWalletInput: LoginWalletInput;
    MemberInput: MemberInput;
    MetadataUnion: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['MetadataUnion']>;
    MigrateAuthInput: MigrateAuthInput;
    Mutation: ResolverTypeWrapper<{}>;
    Organization: ResolverTypeWrapper<Organization>;
    OrganizationAccess: ResolverTypeWrapper<OrganizationAccess>;
    OrganizationIdentificationInput: OrganizationIdentificationInput;
    OrganizationIdentifierType: OrganizationIdentifierType;
    OrganizationMetadata: ResolverTypeWrapper<OrganizationMetadata>;
    OrganizationRole: OrganizationRole;
    PDAClaim: ResolverTypeWrapper<PDAClaim>;
    PDAMetadata: ResolverTypeWrapper<PDAMetadata>;
    PDAStatus: PDAStatus;
    PermissionType: PermissionType;
    PrivateDataAsset: ResolverTypeWrapper<PrivateDataAsset>;
    Proof: ResolverTypeWrapper<Proof>;
    ProofCost: ResolverTypeWrapper<ProofCost>;
    ProofMetadata: ResolverTypeWrapper<ProofMetadata>;
    ProofStatus: ProofStatus;
    Query: ResolverTypeWrapper<{}>;
    RefreshTokenInput: RefreshTokenInput;
    RequestIssueanceDateSchemaInput: RequestIssueanceDateSchemaInput;
    RequestIssueanceDateSchemaObject: ResolverTypeWrapper<RequestIssueanceDateSchemaObject>;
    RequestMetadata: ResolverTypeWrapper<RequestMetadata>;
    RequestTemplateMetadata: ResolverTypeWrapper<RequestTemplateMetadata>;
    Role: Role;
    SignupConfirmationOutput: ResolverTypeWrapper<SignupConfirmationOutput>;
    String: ResolverTypeWrapper<Scalars['String']['output']>;
    StringSchema: ResolverTypeWrapper<Scalars['StringSchema']['output']>;
    TemplateSchemaInput: TemplateSchemaInput;
    Transaction: ResolverTypeWrapper<Omit<Transaction, 'from' | 'metadata' | 'to'> & {
        from?: Maybe<ResolversTypes['IdentifierUnion']>;
        metadata: ResolversTypes['MetadataUnion'];
        to?: Maybe<ResolversTypes['IdentifierUnion']>;
    }>;
    TransactionAction: TransactionAction;
    TransactionIdentifierInput: TransactionIdentifierInput;
    TransactionIdentifierType: TransactionIdentifierType;
    TransferMemberInput: TransferMemberInput;
    UpdateOrganizationInput: UpdateOrganizationInput;
    UpdatePDAInput: UpdatePDAInput;
    UpdatePDAStatusInput: UpdatePDAStatusInput;
    UpdateUserInput: UpdateUserInput;
    User: ResolverTypeWrapper<User>;
    UserIdentificationInput: UserIdentificationInput;
    UserIdentifierType: UserIdentifierType;
    UserMetadata: ResolverTypeWrapper<UserMetadata>;
    UserUsageDto: ResolverTypeWrapper<UserUsageDto>;
    ValidDataRequested: ResolverTypeWrapper<ValidDataRequested>;
    ValidPDAForRequest: ResolverTypeWrapper<ValidPDAForRequest>;
    Wallet: ResolverTypeWrapper<Wallet>;
}>;
/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
    AddEmailConfirmationInput: AddEmailConfirmationInput;
    AddEmailInput: AddEmailInput;
    AddWalletConfirmationInput: AddWalletConfirmationInput;
    Application: Application;
    Auth: Auth;
    AuthDataType: AuthDataType;
    AuthInput: AuthInput;
    Boolean: Scalars['Boolean']['output'];
    CreateApplicationInput: CreateApplicationInput;
    CreateDataModelInput: CreateDataModelInput;
    CreateEmailNonceInput: CreateEmailNonceInput;
    CreateEmailNonceOutput: CreateEmailNonceOutput;
    CreateOrganizationInput: CreateOrganizationInput;
    CreatePDAInput: CreatePDAInput;
    CreateWalletNonceInput: CreateWalletNonceInput;
    CreateWalletNonceOutput: CreateWalletNonceOutput;
    DataModel: DataModel;
    DataModelGroup: DataModelGroup;
    DataModelIssuer: Omit<DataModelIssuer, 'issuer'> & {
        issuer?: Maybe<ResolversParentTypes['IdentifierUnion']>;
    };
    DataModelMetadata: DataModelMetadata;
    DataModelsMetadata: DataModelsMetadata;
    DataRequest: DataRequest;
    DataRequestSchemaInput: DataRequestSchemaInput;
    DataRequestTemplate: DataRequestTemplate;
    DataRequestTemplateDataModelSchemaInput: DataRequestTemplateDataModelSchemaInput;
    DataRequestTemplateDataModelSchemaObject: DataRequestTemplateDataModelSchemaObject;
    DataRequestTemplateVerifier: Omit<DataRequestTemplateVerifier, 'verifier'> & {
        verifier?: Maybe<ResolversParentTypes['IdentifierUnion']>;
    };
    DataRequestTemplatesMetadata: DataRequestTemplatesMetadata;
    Date: Scalars['Date']['output'];
    DateTime: Scalars['DateTime']['output'];
    DateTimeISO: Scalars['DateTimeISO']['output'];
    DecryptedPDA: DecryptedPDA;
    DecryptedProof: DecryptedProof;
    DecryptedProofPDA: DecryptedProofPDA;
    ExplorerAnalyticsSchema: ExplorerAnalyticsSchema;
    ExplorerTransactionsAnalyticsSchema: ExplorerTransactionsAnalyticsSchema;
    FacilitationFeeInput: FacilitationFeeInput;
    FilterDataModelInput: FilterDataModelInput;
    FilterDataRequestInput: FilterDataRequestInput;
    FilterDataRequestTemplateInput: FilterDataRequestTemplateInput;
    FilterOrganizationInput: FilterOrganizationInput;
    FilterPDAInput: FilterPDAInput;
    FilterProofInput: FilterProofInput;
    FilterTransactionsInput: FilterTransactionsInput;
    FinancialSummaryOutput: FinancialSummaryOutput;
    FinancialTransaction: Omit<FinancialTransaction, 'from' | 'to'> & {
        from?: Maybe<ResolversParentTypes['IdentifierUnion']>;
        to?: Maybe<ResolversParentTypes['IdentifierUnion']>;
    };
    Float: Scalars['Float']['output'];
    FloatRangeDto: FloatRangeDto;
    IdentificationInput: IdentificationInput;
    IdentifierUnion: ResolversUnionTypes<ResolversParentTypes>['IdentifierUnion'];
    Int: Scalars['Int']['output'];
    JSON: Scalars['JSON']['output'];
    LoginEmailInput: LoginEmailInput;
    LoginOutput: LoginOutput;
    LoginWalletInput: LoginWalletInput;
    MemberInput: MemberInput;
    MetadataUnion: ResolversUnionTypes<ResolversParentTypes>['MetadataUnion'];
    MigrateAuthInput: MigrateAuthInput;
    Mutation: {};
    Organization: Organization;
    OrganizationAccess: OrganizationAccess;
    OrganizationIdentificationInput: OrganizationIdentificationInput;
    OrganizationMetadata: OrganizationMetadata;
    PDAClaim: PDAClaim;
    PDAMetadata: PDAMetadata;
    PrivateDataAsset: PrivateDataAsset;
    Proof: Proof;
    ProofCost: ProofCost;
    ProofMetadata: ProofMetadata;
    Query: {};
    RefreshTokenInput: RefreshTokenInput;
    RequestIssueanceDateSchemaInput: RequestIssueanceDateSchemaInput;
    RequestIssueanceDateSchemaObject: RequestIssueanceDateSchemaObject;
    RequestMetadata: RequestMetadata;
    RequestTemplateMetadata: RequestTemplateMetadata;
    SignupConfirmationOutput: SignupConfirmationOutput;
    String: Scalars['String']['output'];
    StringSchema: Scalars['StringSchema']['output'];
    TemplateSchemaInput: TemplateSchemaInput;
    Transaction: Omit<Transaction, 'from' | 'metadata' | 'to'> & {
        from?: Maybe<ResolversParentTypes['IdentifierUnion']>;
        metadata: ResolversParentTypes['MetadataUnion'];
        to?: Maybe<ResolversParentTypes['IdentifierUnion']>;
    };
    TransactionIdentifierInput: TransactionIdentifierInput;
    TransferMemberInput: TransferMemberInput;
    UpdateOrganizationInput: UpdateOrganizationInput;
    UpdatePDAInput: UpdatePDAInput;
    UpdatePDAStatusInput: UpdatePDAStatusInput;
    UpdateUserInput: UpdateUserInput;
    User: User;
    UserIdentificationInput: UserIdentificationInput;
    UserMetadata: UserMetadata;
    UserUsageDto: UserUsageDto;
    ValidDataRequested: ValidDataRequested;
    ValidPDAForRequest: ValidPDAForRequest;
    Wallet: Wallet;
}>;
export type ApplicationResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Application'] = ResolversParentTypes['Application']> = ResolversObject<{
    apiKey?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    gatewayFacilitationFee?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
    organization?: Resolver<ResolversTypes['Organization'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;
export type AuthResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Auth'] = ResolversParentTypes['Auth']> = ResolversObject<{
    data?: Resolver<Maybe<ResolversTypes['AuthDataType']>, ParentType, ContextType>;
    hash?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    type?: Resolver<ResolversTypes['AuthType'], ParentType, ContextType>;
    user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
    userId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;
export type AuthDataTypeResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['AuthDataType'] = ResolversParentTypes['AuthDataType']> = ResolversObject<{
    address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    chain?: Resolver<Maybe<ResolversTypes['Chain']>, ParentType, ContextType>;
    primary?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;
export type CreateEmailNonceOutputResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['CreateEmailNonceOutput'] = ResolversParentTypes['CreateEmailNonceOutput']> = ResolversObject<{
    code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;
export type CreateWalletNonceOutputResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['CreateWalletNonceOutput'] = ResolversParentTypes['CreateWalletNonceOutput']> = ResolversObject<{
    message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;
export type DataModelResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['DataModel'] = ResolversParentTypes['DataModel']> = ResolversObject<{
    PDAs?: Resolver<Array<ResolversTypes['PrivateDataAsset']>, ParentType, ContextType>;
    allowedOrganizations?: Resolver<Maybe<Array<ResolversTypes['Organization']>>, ParentType, ContextType>;
    allowedUsers?: Resolver<Maybe<Array<ResolversTypes['User']>>, ParentType, ContextType>;
    arweaveUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    consumptionPrice?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
    createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
    createdBy?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
    description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    featured?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
    group?: Resolver<ResolversTypes['DataModelGroup'], ParentType, ContextType>;
    id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    organization?: Resolver<Maybe<ResolversTypes['Organization']>, ParentType, ContextType>;
    pdas?: Resolver<Array<ResolversTypes['PrivateDataAsset']>, ParentType, ContextType>;
    pdasIssuedCount?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
    permissioning?: Resolver<Maybe<ResolversTypes['PermissionType']>, ParentType, ContextType>;
    revenueGenerated?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
    schema?: Resolver<ResolversTypes['JSON'], ParentType, ContextType>;
    tags?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
    title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    uniqueIssuersCount?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
    verified?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;
export type DataModelGroupResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['DataModelGroup'] = ResolversParentTypes['DataModelGroup']> = ResolversObject<{
    createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
    dataModels?: Resolver<Array<ResolversTypes['DataModel']>, ParentType, ContextType>;
    id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    official?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;
export type DataModelIssuerResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['DataModelIssuer'] = ResolversParentTypes['DataModelIssuer']> = ResolversObject<{
    count?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
    issuer?: Resolver<Maybe<ResolversTypes['IdentifierUnion']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;
export type DataModelMetadataResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['DataModelMetadata'] = ResolversParentTypes['DataModelMetadata']> = ResolversObject<{
    creator?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    dataModel?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    signedBy?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;
export type DataModelsMetadataResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['DataModelsMetadata'] = ResolversParentTypes['DataModelsMetadata']> = ResolversObject<{
    consumptionPrice?: Resolver<ResolversTypes['JSON'], ParentType, ContextType>;
    issuedCount?: Resolver<ResolversTypes['JSON'], ParentType, ContextType>;
    tags?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;
export type DataRequestResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['DataRequest'] = ResolversParentTypes['DataRequest']> = ResolversObject<{
    arweaveUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
    dataRequestTemplate?: Resolver<ResolversTypes['DataRequestTemplate'], ParentType, ContextType>;
    dataUse?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    owner?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
    proof?: Resolver<Maybe<ResolversTypes['Proof']>, ParentType, ContextType>;
    status?: Resolver<ResolversTypes['DataResourceStatus'], ParentType, ContextType>;
    verifier?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
    verifierOrganization?: Resolver<Maybe<ResolversTypes['Organization']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;
export type DataRequestTemplateResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['DataRequestTemplate'] = ResolversParentTypes['DataRequestTemplate']> = ResolversObject<{
    arweaveUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
    dataModels?: Resolver<Array<ResolversTypes['DataModel']>, ParentType, ContextType>;
    dataRequests?: Resolver<Array<ResolversTypes['DataRequest']>, ParentType, ContextType>;
    dataRequestsCount?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
    description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    organization?: Resolver<Maybe<ResolversTypes['Organization']>, ParentType, ContextType>;
    revenueGenerated?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
    schema?: Resolver<ResolversTypes['JSON'], ParentType, ContextType>;
    tags?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
    uniqueVerifiersCount?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
    user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;
export type DataRequestTemplateDataModelSchemaObjectResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['DataRequestTemplateDataModelSchemaObject'] = ResolversParentTypes['DataRequestTemplateDataModelSchemaObject']> = ResolversObject<{
    claimValidations?: Resolver<Maybe<ResolversTypes['StringSchema']>, ParentType, ContextType>;
    id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    issuanceDate?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
    issuanceDateRange?: Resolver<Maybe<ResolversTypes['RequestIssueanceDateSchemaObject']>, ParentType, ContextType>;
    issuers?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
    organizations?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
    required?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;
export type DataRequestTemplateVerifierResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['DataRequestTemplateVerifier'] = ResolversParentTypes['DataRequestTemplateVerifier']> = ResolversObject<{
    count?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
    verifier?: Resolver<Maybe<ResolversTypes['IdentifierUnion']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;
export type DataRequestTemplatesMetadataResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['DataRequestTemplatesMetadata'] = ResolversParentTypes['DataRequestTemplatesMetadata']> = ResolversObject<{
    tags?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;
export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
    name: 'Date';
}
export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
    name: 'DateTime';
}
export interface DateTimeISOScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTimeISO'], any> {
    name: 'DateTimeISO';
}
export type DecryptedPDAResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['DecryptedPDA'] = ResolversParentTypes['DecryptedPDA']> = ResolversObject<{
    claim?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
    claimArray?: Resolver<Array<ResolversTypes['PDAClaim']>, ParentType, ContextType>;
    dataModel?: Resolver<ResolversTypes['DataModel'], ParentType, ContextType>;
    description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    expirationDate?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
    image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    issuer?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
    organization?: Resolver<Maybe<ResolversTypes['Organization']>, ParentType, ContextType>;
    owner?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
    qrCode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;
export type DecryptedProofResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['DecryptedProof'] = ResolversParentTypes['DecryptedProof']> = ResolversObject<{
    PDAs?: Resolver<Array<ResolversTypes['DecryptedProofPDA']>, ParentType, ContextType>;
    dataModels?: Resolver<Array<ResolversTypes['DataModel']>, ParentType, ContextType>;
    raw?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;
export type DecryptedProofPDAResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['DecryptedProofPDA'] = ResolversParentTypes['DecryptedProofPDA']> = ResolversObject<{
    claim?: Resolver<ResolversTypes['JSON'], ParentType, ContextType>;
    claimArray?: Resolver<Array<ResolversTypes['PDAClaim']>, ParentType, ContextType>;
    dataModel?: Resolver<ResolversTypes['DataModel'], ParentType, ContextType>;
    description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    issuanceDate?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
    issuer?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
    lastUpdated?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
    organization?: Resolver<Maybe<ResolversTypes['Organization']>, ParentType, ContextType>;
    owner?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
    title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;
export type ExplorerAnalyticsSchemaResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['ExplorerAnalyticsSchema'] = ResolversParentTypes['ExplorerAnalyticsSchema']> = ResolversObject<{
    dataRequests?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    pdasIssued?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    totalEarnings?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
    uniqueIssuers?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;
export type ExplorerTransactionsAnalyticsSchemaResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['ExplorerTransactionsAnalyticsSchema'] = ResolversParentTypes['ExplorerTransactionsAnalyticsSchema']> = ResolversObject<{
    dataRequests?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    pdasIssued?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    totalEarnings?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
    totalTransactions?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    uniqueIssuers?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;
export type FinancialSummaryOutputResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['FinancialSummaryOutput'] = ResolversParentTypes['FinancialSummaryOutput']> = ResolversObject<{
    action?: Resolver<ResolversTypes['FinancialTransactionAction'], ParentType, ContextType>;
    amount?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;
export type FinancialTransactionResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['FinancialTransaction'] = ResolversParentTypes['FinancialTransaction']> = ResolversObject<{
    action?: Resolver<ResolversTypes['FinancialTransactionAction'], ParentType, ContextType>;
    createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
    fee?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
    from?: Resolver<Maybe<ResolversTypes['IdentifierUnion']>, ParentType, ContextType>;
    id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    memo?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
    to?: Resolver<Maybe<ResolversTypes['IdentifierUnion']>, ParentType, ContextType>;
    total?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
    transaction?: Resolver<Maybe<ResolversTypes['Transaction']>, ParentType, ContextType>;
    transactionId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    type?: Resolver<ResolversTypes['FinancialTransactionType'], ParentType, ContextType>;
    updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
    value?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
    wallet?: Resolver<ResolversTypes['Wallet'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;
export type IdentifierUnionResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['IdentifierUnion'] = ResolversParentTypes['IdentifierUnion']> = ResolversObject<{
    __resolveType: TypeResolveFn<'Organization' | 'User', ParentType, ContextType>;
}>;
export interface JSONScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
    name: 'JSON';
}
export type LoginOutputResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['LoginOutput'] = ResolversParentTypes['LoginOutput']> = ResolversObject<{
    protocol_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    refresh_token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;
export type MetadataUnionResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['MetadataUnion'] = ResolversParentTypes['MetadataUnion']> = ResolversObject<{
    __resolveType: TypeResolveFn<'DataModelMetadata' | 'OrganizationMetadata' | 'PDAMetadata' | 'ProofMetadata' | 'RequestMetadata' | 'RequestTemplateMetadata' | 'UserMetadata', ParentType, ContextType>;
}>;
export type MutationResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
    addEmail?: Resolver<ResolversTypes['CreateEmailNonceOutput'], ParentType, ContextType, RequireFields<MutationaddEmailArgs, 'input'>>;
    addEmailConfirmation?: Resolver<ResolversTypes['SignupConfirmationOutput'], ParentType, ContextType, RequireFields<MutationaddEmailConfirmationArgs, 'input'>>;
    addMemberToOrganization?: Resolver<ResolversTypes['OrganizationAccess'], ParentType, ContextType, RequireFields<MutationaddMemberToOrganizationArgs, 'input'>>;
    addWallet?: Resolver<ResolversTypes['CreateWalletNonceOutput'], ParentType, ContextType, RequireFields<MutationaddWalletArgs, 'input'>>;
    addWalletConfirmation?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationaddWalletConfirmationArgs, 'input'>>;
    changeMemberRole?: Resolver<ResolversTypes['OrganizationAccess'], ParentType, ContextType, RequireFields<MutationchangeMemberRoleArgs, 'input'>>;
    changePDAStatus?: Resolver<ResolversTypes['PrivateDataAsset'], ParentType, ContextType, RequireFields<MutationchangePDAStatusArgs, 'input'>>;
    createApplication?: Resolver<ResolversTypes['Application'], ParentType, ContextType, RequireFields<MutationcreateApplicationArgs, 'input'>>;
    createDataModel?: Resolver<ResolversTypes['DataModel'], ParentType, ContextType, RequireFields<MutationcreateDataModelArgs, 'input'>>;
    createDataRequest?: Resolver<ResolversTypes['DataRequest'], ParentType, ContextType, RequireFields<MutationcreateDataRequestArgs, 'input'>>;
    createDataRequestTemplate?: Resolver<ResolversTypes['DataRequestTemplate'], ParentType, ContextType, RequireFields<MutationcreateDataRequestTemplateArgs, 'input'>>;
    createEmailNonce?: Resolver<ResolversTypes['CreateEmailNonceOutput'], ParentType, ContextType, RequireFields<MutationcreateEmailNonceArgs, 'input'>>;
    createOrganization?: Resolver<ResolversTypes['Organization'], ParentType, ContextType, RequireFields<MutationcreateOrganizationArgs, 'input'>>;
    createPDA?: Resolver<ResolversTypes['PrivateDataAsset'], ParentType, ContextType, RequireFields<MutationcreatePDAArgs, 'input'>>;
    createProof?: Resolver<ResolversTypes['Proof'], ParentType, ContextType, Partial<MutationcreateProofArgs>>;
    createProofMessage?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationcreateProofMessageArgs, 'requestId'>>;
    createWalletNonce?: Resolver<ResolversTypes['CreateWalletNonceOutput'], ParentType, ContextType, RequireFields<MutationcreateWalletNonceArgs, 'input'>>;
    deleteAccount?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationdeleteAccountArgs, 'id'>>;
    loginEmail?: Resolver<ResolversTypes['LoginOutput'], ParentType, ContextType, RequireFields<MutationloginEmailArgs, 'input'>>;
    loginWallet?: Resolver<ResolversTypes['LoginOutput'], ParentType, ContextType, RequireFields<MutationloginWalletArgs, 'input'>>;
    migrateAuthMethod?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationmigrateAuthMethodArgs, 'input'>>;
    refreshToken?: Resolver<ResolversTypes['LoginOutput'], ParentType, ContextType, RequireFields<MutationrefreshTokenArgs, 'input'>>;
    rejectDataRequest?: Resolver<ResolversTypes['DataRequest'], ParentType, ContextType, RequireFields<MutationrejectDataRequestArgs, 'requestId'>>;
    removeApplication?: Resolver<ResolversTypes['Application'], ParentType, ContextType, RequireFields<MutationremoveApplicationArgs, 'id'>>;
    removeMemberFromOrganization?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationremoveMemberFromOrganizationArgs, 'input'>>;
    transferOwnership?: Resolver<ResolversTypes['OrganizationAccess'], ParentType, ContextType, RequireFields<MutationtransferOwnershipArgs, 'input'>>;
    unregisterAuthMethod?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationunregisterAuthMethodArgs, 'input'>>;
    updateMyDisplayName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, Partial<MutationupdateMyDisplayNameArgs>>;
    updateMyGatewayId?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationupdateMyGatewayIdArgs, 'gatewayId'>>;
    updateMyProfilePicture?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, Partial<MutationupdateMyProfilePictureArgs>>;
    updateNotificationEmail?: Resolver<ResolversTypes['SignupConfirmationOutput'], ParentType, ContextType, RequireFields<MutationupdateNotificationEmailArgs, 'email'>>;
    updateOrganization?: Resolver<ResolversTypes['Organization'], ParentType, ContextType, RequireFields<MutationupdateOrganizationArgs, 'input'>>;
    updatePDA?: Resolver<ResolversTypes['PrivateDataAsset'], ParentType, ContextType, RequireFields<MutationupdatePDAArgs, 'input'>>;
    updateUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationupdateUserArgs, 'input'>>;
}>;
export type OrganizationResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Organization'] = ResolversParentTypes['Organization']> = ResolversObject<{
    accesses?: Resolver<Maybe<Array<ResolversTypes['OrganizationAccess']>>, ParentType, ContextType>;
    arweaveUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
    dataModels?: Resolver<Maybe<Array<ResolversTypes['DataModel']>>, ParentType, ContextType>;
    dataRequestTemplates?: Resolver<Array<ResolversTypes['DataRequestTemplate']>, ParentType, ContextType>;
    description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    gatewayId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    receivedProofs?: Resolver<Maybe<Array<ResolversTypes['Proof']>>, ParentType, ContextType>;
    updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
    usernameUpdatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
    verified?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
    verifierDataRequests?: Resolver<Array<ResolversTypes['DataRequest']>, ParentType, ContextType>;
    walletId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    website?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;
export type OrganizationAccessResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['OrganizationAccess'] = ResolversParentTypes['OrganizationAccess']> = ResolversObject<{
    id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    organization?: Resolver<ResolversTypes['Organization'], ParentType, ContextType>;
    role?: Resolver<ResolversTypes['OrganizationRole'], ParentType, ContextType>;
    user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;
export type OrganizationMetadataResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['OrganizationMetadata'] = ResolversParentTypes['OrganizationMetadata']> = ResolversObject<{
    organization?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    users?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
    usersAdmin?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
    verified?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;
export type PDAClaimResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['PDAClaim'] = ResolversParentTypes['PDAClaim']> = ResolversObject<{
    description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    label?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    metadata?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
    property?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;
export type PDAMetadataResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['PDAMetadata'] = ResolversParentTypes['PDAMetadata']> = ResolversObject<{
    dataModel?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    expirationDate?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
    issuer?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    pda?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    signedBy?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    pdametadastatus?: Resolver<ResolversTypes['PDAStatus'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;
export type PrivateDataAssetResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['PrivateDataAsset'] = ResolversParentTypes['PrivateDataAsset']> = ResolversObject<{
    arweaveUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    claimHash?: Resolver<ResolversTypes['JSON'], ParentType, ContextType>;
    dataAsset?: Resolver<Maybe<ResolversTypes['DecryptedPDA']>, ParentType, ContextType>;
    expirationDate?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
    hash?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    issuanceDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
    issuerHash?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    lastUpdated?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
    ownerHash?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    status?: Resolver<ResolversTypes['PDAStatus'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;
export type ProofResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Proof'] = ResolversParentTypes['Proof']> = ResolversObject<{
    arweaveUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
    data?: Resolver<Maybe<ResolversTypes['DecryptedProof']>, ParentType, ContextType>;
    dataRequest?: Resolver<Maybe<ResolversTypes['DataRequest']>, ParentType, ContextType>;
    facilitationFee?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
    hash?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    owner?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
    proofHash?: Resolver<ResolversTypes['JSON'], ParentType, ContextType>;
    status?: Resolver<ResolversTypes['ProofStatus'], ParentType, ContextType>;
    totalCost?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
    updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
    verifier?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
    verifierOrganization?: Resolver<Maybe<ResolversTypes['Organization']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;
export type ProofCostResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['ProofCost'] = ResolversParentTypes['ProofCost']> = ResolversObject<{
    facilitationFee?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
    totalCost?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;
export type ProofMetadataResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['ProofMetadata'] = ResolversParentTypes['ProofMetadata']> = ResolversObject<{
    earnings?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
    fees?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
    owner?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    proof?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    request?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    status?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    verifier?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;
export type QueryResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
    PDA?: Resolver<Maybe<ResolversTypes['PrivateDataAsset']>, ParentType, ContextType, RequireFields<QueryPDAArgs, 'id'>>;
    PDACount?: Resolver<ResolversTypes['Float'], ParentType, ContextType, Partial<QueryPDACountArgs>>;
    PDAs?: Resolver<Array<ResolversTypes['PrivateDataAsset']>, ParentType, ContextType, Partial<QueryPDAsArgs>>;
    applications?: Resolver<Array<ResolversTypes['Application']>, ParentType, ContextType>;
    calculateProofCost?: Resolver<ResolversTypes['ProofCost'], ParentType, ContextType, RequireFields<QuerycalculateProofCostArgs, 'requestId'>>;
    checkUsernameAvailability?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<QuerycheckUsernameAvailabilityArgs, 'username'>>;
    createDepositLink?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    dataModel?: Resolver<ResolversTypes['DataModel'], ParentType, ContextType, RequireFields<QuerydataModelArgs, 'id'>>;
    dataModels?: Resolver<Array<ResolversTypes['DataModel']>, ParentType, ContextType, Partial<QuerydataModelsArgs>>;
    dataModelsCount?: Resolver<ResolversTypes['Float'], ParentType, ContextType, Partial<QuerydataModelsCountArgs>>;
    dataModelsMetadata?: Resolver<ResolversTypes['DataModelsMetadata'], ParentType, ContextType>;
    dataRequest?: Resolver<ResolversTypes['DataRequest'], ParentType, ContextType, RequireFields<QuerydataRequestArgs, 'requestId'>>;
    dataRequestCount?: Resolver<ResolversTypes['Float'], ParentType, ContextType, Partial<QuerydataRequestCountArgs>>;
    dataRequestStatus?: Resolver<ResolversTypes['DataResourceStatus'], ParentType, ContextType, RequireFields<QuerydataRequestStatusArgs, 'requestId'>>;
    dataRequestTemplate?: Resolver<Maybe<ResolversTypes['DataRequestTemplate']>, ParentType, ContextType, RequireFields<QuerydataRequestTemplateArgs, 'id'>>;
    dataRequestTemplates?: Resolver<Array<ResolversTypes['DataRequestTemplate']>, ParentType, ContextType, Partial<QuerydataRequestTemplatesArgs>>;
    dataRequestTemplatesCount?: Resolver<ResolversTypes['Float'], ParentType, ContextType, Partial<QuerydataRequestTemplatesCountArgs>>;
    dataRequestTemplatesMetadata?: Resolver<ResolversTypes['DataRequestTemplatesMetadata'], ParentType, ContextType>;
    dataRequests?: Resolver<Array<ResolversTypes['DataRequest']>, ParentType, ContextType, Partial<QuerydataRequestsArgs>>;
    financialTransactions?: Resolver<Array<ResolversTypes['FinancialTransaction']>, ParentType, ContextType, RequireFields<QueryfinancialTransactionsArgs, 'identifier'>>;
    findValidPDAsForRequest?: Resolver<Array<ResolversTypes['ValidPDAForRequest']>, ParentType, ContextType, RequireFields<QueryfindValidPDAsForRequestArgs, 'requestId'>>;
    generatedFees?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
    getExplorerStats?: Resolver<ResolversTypes['ExplorerAnalyticsSchema'], ParentType, ContextType>;
    getMonthlyUserUsage?: Resolver<ResolversTypes['UserUsageDto'], ParentType, ContextType>;
    getTotalofIssuersByDataModel?: Resolver<ResolversTypes['Int'], ParentType, ContextType, RequireFields<QuerygetTotalofIssuersByDataModelArgs, 'dataModelId'>>;
    getTransactionsExplorerStats?: Resolver<ResolversTypes['ExplorerTransactionsAnalyticsSchema'], ParentType, ContextType>;
    issuedPDAs?: Resolver<Array<ResolversTypes['PrivateDataAsset']>, ParentType, ContextType, Partial<QueryissuedPDAsArgs>>;
    issuedPDAsCount?: Resolver<ResolversTypes['Float'], ParentType, ContextType, Partial<QueryissuedPDAsCountArgs>>;
    issuersByDataModel?: Resolver<Array<ResolversTypes['DataModelIssuer']>, ParentType, ContextType, RequireFields<QueryissuersByDataModelArgs, 'id'>>;
    issuersByDataModelCount?: Resolver<ResolversTypes['Float'], ParentType, ContextType, RequireFields<QueryissuersByDataModelCountArgs, 'id'>>;
    me?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
    myDataModelsCount?: Resolver<ResolversTypes['Float'], ParentType, ContextType, Partial<QuerymyDataModelsCountArgs>>;
    myDataRequestTemplatesCount?: Resolver<ResolversTypes['Float'], ParentType, ContextType, Partial<QuerymyDataRequestTemplatesCountArgs>>;
    myFinancialTransactions?: Resolver<Array<ResolversTypes['FinancialTransaction']>, ParentType, ContextType, Partial<QuerymyFinancialTransactionsArgs>>;
    myFinancialTransactionsCount?: Resolver<ResolversTypes['Float'], ParentType, ContextType, Partial<QuerymyFinancialTransactionsCountArgs>>;
    myPDACount?: Resolver<ResolversTypes['Float'], ParentType, ContextType, Partial<QuerymyPDACountArgs>>;
    myPDAs?: Resolver<Array<ResolversTypes['PrivateDataAsset']>, ParentType, ContextType, Partial<QuerymyPDAsArgs>>;
    myTransactions?: Resolver<Array<ResolversTypes['Transaction']>, ParentType, ContextType, Partial<QuerymyTransactionsArgs>>;
    myWallet?: Resolver<ResolversTypes['Wallet'], ParentType, ContextType, Partial<QuerymyWalletArgs>>;
    organization?: Resolver<Maybe<ResolversTypes['Organization']>, ParentType, ContextType, RequireFields<QueryorganizationArgs, 'input'>>;
    organizations?: Resolver<Array<ResolversTypes['Organization']>, ParentType, ContextType, Partial<QueryorganizationsArgs>>;
    proof?: Resolver<ResolversTypes['Proof'], ParentType, ContextType, RequireFields<QueryproofArgs, 'id'>>;
    proofs?: Resolver<Array<ResolversTypes['Proof']>, ParentType, ContextType, Partial<QueryproofsArgs>>;
    proofsByPDAIds?: Resolver<Array<ResolversTypes['Proof']>, ParentType, ContextType, RequireFields<QueryproofsByPDAIdsArgs, 'pdaIds'>>;
    receivedProofs?: Resolver<Array<ResolversTypes['Proof']>, ParentType, ContextType, Partial<QueryreceivedProofsArgs>>;
    receivedProofsCount?: Resolver<ResolversTypes['Float'], ParentType, ContextType, Partial<QueryreceivedProofsCountArgs>>;
    requestsReceived?: Resolver<Array<ResolversTypes['DataRequest']>, ParentType, ContextType, RequireFields<QueryrequestsReceivedArgs, 'skip' | 'take'>>;
    requestsReceivedCount?: Resolver<ResolversTypes['Float'], ParentType, ContextType, Partial<QueryrequestsReceivedCountArgs>>;
    requestsSent?: Resolver<Array<ResolversTypes['DataRequest']>, ParentType, ContextType, Partial<QueryrequestsSentArgs>>;
    requestsSentCount?: Resolver<ResolversTypes['Float'], ParentType, ContextType, Partial<QueryrequestsSentCountArgs>>;
    sentProofs?: Resolver<Array<ResolversTypes['Proof']>, ParentType, ContextType, Partial<QuerysentProofsArgs>>;
    sentProofsCount?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
    templateByDataRequest?: Resolver<Maybe<ResolversTypes['DataRequestTemplate']>, ParentType, ContextType, RequireFields<QuerytemplateByDataRequestArgs, 'requestID'>>;
    transaction?: Resolver<ResolversTypes['Transaction'], ParentType, ContextType, RequireFields<QuerytransactionArgs, 'id'>>;
    transactions?: Resolver<Array<ResolversTypes['Transaction']>, ParentType, ContextType, Partial<QuerytransactionsArgs>>;
    transactionsCount?: Resolver<ResolversTypes['Float'], ParentType, ContextType, RequireFields<QuerytransactionsCountArgs, 'showMoneyTxs'>>;
    user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryuserArgs, 'input'>>;
    verifiersByDataRequestTemplate?: Resolver<Array<ResolversTypes['DataRequestTemplateVerifier']>, ParentType, ContextType, RequireFields<QueryverifiersByDataRequestTemplateArgs, 'id'>>;
    verifiersByDataRequestTemplateCount?: Resolver<ResolversTypes['Float'], ParentType, ContextType, RequireFields<QueryverifiersByDataRequestTemplateCountArgs, 'id'>>;
}>;
export type RequestIssueanceDateSchemaObjectResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['RequestIssueanceDateSchemaObject'] = ResolversParentTypes['RequestIssueanceDateSchemaObject']> = ResolversObject<{
    after?: Resolver<ResolversTypes['DateTimeISO'], ParentType, ContextType>;
    before?: Resolver<ResolversTypes['DateTimeISO'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;
export type RequestMetadataResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['RequestMetadata'] = ResolversParentTypes['RequestMetadata']> = ResolversObject<{
    owner?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    request?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    requestTemplate?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    status?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    verifier?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;
export type RequestTemplateMetadataResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['RequestTemplateMetadata'] = ResolversParentTypes['RequestTemplateMetadata']> = ResolversObject<{
    creator?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    dataModels?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
    requestTemplate?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    signedBy?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;
export type SignupConfirmationOutputResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['SignupConfirmationOutput'] = ResolversParentTypes['SignupConfirmationOutput']> = ResolversObject<{
    user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;
export interface StringSchemaScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['StringSchema'], any> {
    name: 'StringSchema';
}
export type TransactionResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Transaction'] = ResolversParentTypes['Transaction']> = ResolversObject<{
    action?: Resolver<ResolversTypes['TransactionAction'], ParentType, ContextType>;
    arweaveUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    cost?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
    createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
    financialTransactions?: Resolver<Array<ResolversTypes['FinancialTransaction']>, ParentType, ContextType>;
    from?: Resolver<Maybe<ResolversTypes['IdentifierUnion']>, ParentType, ContextType>;
    id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    metadata?: Resolver<ResolversTypes['MetadataUnion'], ParentType, ContextType>;
    to?: Resolver<Maybe<ResolversTypes['IdentifierUnion']>, ParentType, ContextType>;
    updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;
export type UserResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
    accesses?: Resolver<Maybe<Array<ResolversTypes['OrganizationAccess']>>, ParentType, ContextType>;
    arweaveUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    authentications?: Resolver<Maybe<Array<ResolversTypes['Auth']>>, ParentType, ContextType>;
    createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
    credentialsExtraCredits?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
    dataModels?: Resolver<Maybe<Array<ResolversTypes['DataModel']>>, ParentType, ContextType>;
    dataModelsExtraCredits?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
    dataRequestTemplates?: Resolver<Array<ResolversTypes['DataRequestTemplate']>, ParentType, ContextType>;
    deletedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
    displayName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    gatewayId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    gatewayIdLastupdate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
    gatewayIdUpdatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
    hash?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    isCompleted?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
    issuedPDAs?: Resolver<Array<ResolversTypes['PrivateDataAsset']>, ParentType, ContextType>;
    issuedProofs?: Resolver<Maybe<Array<ResolversTypes['Proof']>>, ParentType, ContextType>;
    profilePicture?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    receivedPDAs?: Resolver<Array<ResolversTypes['PrivateDataAsset']>, ParentType, ContextType>;
    receivedProofs?: Resolver<Array<ResolversTypes['Proof']>, ParentType, ContextType>;
    recipientDataRequests?: Resolver<Array<ResolversTypes['DataRequest']>, ParentType, ContextType>;
    roles?: Resolver<Array<ResolversTypes['Role']>, ParentType, ContextType>;
    status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
    verifierDataRequests?: Resolver<Array<ResolversTypes['DataRequest']>, ParentType, ContextType>;
    walletId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;
export type UserMetadataResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['UserMetadata'] = ResolversParentTypes['UserMetadata']> = ResolversObject<{
    user?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;
export type UserUsageDtoResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['UserUsageDto'] = ResolversParentTypes['UserUsageDto']> = ResolversObject<{
    credentialsUsageAllowedByMonth?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    datamodelsUsageAllowedByMonth?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    monthlyCredentials?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    monthlyDatamodels?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;
export type ValidDataRequestedResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['ValidDataRequested'] = ResolversParentTypes['ValidDataRequested']> = ResolversObject<{
    provided?: Resolver<ResolversTypes['JSON'], ParentType, ContextType>;
    requested?: Resolver<ResolversTypes['JSON'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;
export type ValidPDAForRequestResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['ValidPDAForRequest'] = ResolversParentTypes['ValidPDAForRequest']> = ResolversObject<{
    dataModel?: Resolver<ResolversTypes['DataModel'], ParentType, ContextType>;
    pdas?: Resolver<Array<ResolversTypes['PrivateDataAsset']>, ParentType, ContextType>;
    required?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
    schema?: Resolver<ResolversTypes['DataRequestTemplateDataModelSchemaObject'], ParentType, ContextType>;
    validData?: Resolver<Maybe<Array<ResolversTypes['ValidDataRequested']>>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;
export type WalletResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Wallet'] = ResolversParentTypes['Wallet']> = ResolversObject<{
    balance?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
    moneyIn?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
    moneyInSummary?: Resolver<Array<ResolversTypes['FinancialSummaryOutput']>, ParentType, ContextType>;
    moneyOut?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
    moneyOutSummary?: Resolver<Array<ResolversTypes['FinancialSummaryOutput']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;
export type Resolvers<ContextType = MeshContext> = ResolversObject<{
    Application?: ApplicationResolvers<ContextType>;
    Auth?: AuthResolvers<ContextType>;
    AuthDataType?: AuthDataTypeResolvers<ContextType>;
    CreateEmailNonceOutput?: CreateEmailNonceOutputResolvers<ContextType>;
    CreateWalletNonceOutput?: CreateWalletNonceOutputResolvers<ContextType>;
    DataModel?: DataModelResolvers<ContextType>;
    DataModelGroup?: DataModelGroupResolvers<ContextType>;
    DataModelIssuer?: DataModelIssuerResolvers<ContextType>;
    DataModelMetadata?: DataModelMetadataResolvers<ContextType>;
    DataModelsMetadata?: DataModelsMetadataResolvers<ContextType>;
    DataRequest?: DataRequestResolvers<ContextType>;
    DataRequestTemplate?: DataRequestTemplateResolvers<ContextType>;
    DataRequestTemplateDataModelSchemaObject?: DataRequestTemplateDataModelSchemaObjectResolvers<ContextType>;
    DataRequestTemplateVerifier?: DataRequestTemplateVerifierResolvers<ContextType>;
    DataRequestTemplatesMetadata?: DataRequestTemplatesMetadataResolvers<ContextType>;
    Date?: GraphQLScalarType;
    DateTime?: GraphQLScalarType;
    DateTimeISO?: GraphQLScalarType;
    DecryptedPDA?: DecryptedPDAResolvers<ContextType>;
    DecryptedProof?: DecryptedProofResolvers<ContextType>;
    DecryptedProofPDA?: DecryptedProofPDAResolvers<ContextType>;
    ExplorerAnalyticsSchema?: ExplorerAnalyticsSchemaResolvers<ContextType>;
    ExplorerTransactionsAnalyticsSchema?: ExplorerTransactionsAnalyticsSchemaResolvers<ContextType>;
    FinancialSummaryOutput?: FinancialSummaryOutputResolvers<ContextType>;
    FinancialTransaction?: FinancialTransactionResolvers<ContextType>;
    IdentifierUnion?: IdentifierUnionResolvers<ContextType>;
    JSON?: GraphQLScalarType;
    LoginOutput?: LoginOutputResolvers<ContextType>;
    MetadataUnion?: MetadataUnionResolvers<ContextType>;
    Mutation?: MutationResolvers<ContextType>;
    Organization?: OrganizationResolvers<ContextType>;
    OrganizationAccess?: OrganizationAccessResolvers<ContextType>;
    OrganizationMetadata?: OrganizationMetadataResolvers<ContextType>;
    PDAClaim?: PDAClaimResolvers<ContextType>;
    PDAMetadata?: PDAMetadataResolvers<ContextType>;
    PrivateDataAsset?: PrivateDataAssetResolvers<ContextType>;
    Proof?: ProofResolvers<ContextType>;
    ProofCost?: ProofCostResolvers<ContextType>;
    ProofMetadata?: ProofMetadataResolvers<ContextType>;
    Query?: QueryResolvers<ContextType>;
    RequestIssueanceDateSchemaObject?: RequestIssueanceDateSchemaObjectResolvers<ContextType>;
    RequestMetadata?: RequestMetadataResolvers<ContextType>;
    RequestTemplateMetadata?: RequestTemplateMetadataResolvers<ContextType>;
    SignupConfirmationOutput?: SignupConfirmationOutputResolvers<ContextType>;
    StringSchema?: GraphQLScalarType;
    Transaction?: TransactionResolvers<ContextType>;
    User?: UserResolvers<ContextType>;
    UserMetadata?: UserMetadataResolvers<ContextType>;
    UserUsageDto?: UserUsageDtoResolvers<ContextType>;
    ValidDataRequested?: ValidDataRequestedResolvers<ContextType>;
    ValidPDAForRequest?: ValidPDAForRequestResolvers<ContextType>;
    Wallet?: WalletResolvers<ContextType>;
}>;
export type MeshContext = GatewaySdkTypes.Context & BaseMeshContext;
export declare const rawServeConfig: YamlConfig.Config['serve'];
export declare function getMeshOptions(): Promise<GetMeshOptions>;
export declare function createBuiltMeshHTTPHandler<TServerContext = {}>(): MeshHTTPHandler<TServerContext>;
export declare function getBuiltMesh(): Promise<MeshInstance>;
export declare const execute: ExecuteMeshFn;
export declare const subscribe: SubscribeMeshFn;
export declare function getMeshSDK<TGlobalContext = any, TOperationContext = any>(globalContext?: TGlobalContext): {
    PDA_query(variables: Exact<{
        id: string;
    }>, options?: TOperationContext | undefined): Promise<PDA_queryQuery>;
    PDACount_query(variables?: Exact<{
        filter?: InputMaybe<FilterPDAInput> | undefined;
    }> | undefined, options?: TOperationContext | undefined): Promise<PDACount_queryQuery>;
    PDAs_query(variables?: Exact<{
        filter?: InputMaybe<FilterPDAInput> | undefined;
        order?: any;
        skip?: InputMaybe<number> | undefined;
        take?: InputMaybe<number> | undefined;
    }> | undefined, options?: TOperationContext | undefined): Promise<PDAs_queryQuery>;
    applications_query(variables?: Exact<{
        [key: string]: never;
    }> | undefined, options?: TOperationContext | undefined): Promise<applications_queryQuery>;
    calculateProofCost_query(variables: Exact<{
        requestId: string;
    }>, options?: TOperationContext | undefined): Promise<calculateProofCost_queryQuery>;
    checkUsernameAvailability_query(variables: Exact<{
        username: string;
    }>, options?: TOperationContext | undefined): Promise<checkUsernameAvailability_queryQuery>;
    createDepositLink_query(variables?: Exact<{
        [key: string]: never;
    }> | undefined, options?: TOperationContext | undefined): Promise<createDepositLink_queryQuery>;
    dataModel_query(variables: Exact<{
        id: string;
    }>, options?: TOperationContext | undefined): Promise<dataModel_queryQuery>;
    dataModels_query(variables?: Exact<{
        filter?: InputMaybe<FilterDataModelInput> | undefined;
        order?: any;
        skip?: InputMaybe<number> | undefined;
        take?: InputMaybe<number> | undefined;
    }> | undefined, options?: TOperationContext | undefined): Promise<dataModels_queryQuery>;
    dataModelsCount_query(variables?: Exact<{
        filter?: InputMaybe<FilterDataModelInput> | undefined;
    }> | undefined, options?: TOperationContext | undefined): Promise<dataModelsCount_queryQuery>;
    dataModelsMetadata_query(variables?: Exact<{
        [key: string]: never;
    }> | undefined, options?: TOperationContext | undefined): Promise<dataModelsMetadata_queryQuery>;
    dataRequest_query(variables: Exact<{
        requestId: string;
    }>, options?: TOperationContext | undefined): Promise<dataRequest_queryQuery>;
    dataRequestCount_query(variables?: Exact<{
        filter?: InputMaybe<FilterDataRequestInput> | undefined;
    }> | undefined, options?: TOperationContext | undefined): Promise<dataRequestCount_queryQuery>;
    dataRequestStatus_query(variables: Exact<{
        requestId: string;
    }>, options?: TOperationContext | undefined): Promise<dataRequestStatus_queryQuery>;
    dataRequestTemplate_query(variables: Exact<{
        id: string;
    }>, options?: TOperationContext | undefined): Promise<dataRequestTemplate_queryQuery>;
    dataRequestTemplates_query(variables?: Exact<{
        filter?: InputMaybe<FilterDataRequestTemplateInput> | undefined;
        order?: any;
        skip?: InputMaybe<number> | undefined;
        take?: InputMaybe<number> | undefined;
    }> | undefined, options?: TOperationContext | undefined): Promise<dataRequestTemplates_queryQuery>;
    dataRequestTemplatesCount_query(variables?: Exact<{
        filter?: InputMaybe<FilterDataRequestTemplateInput> | undefined;
    }> | undefined, options?: TOperationContext | undefined): Promise<dataRequestTemplatesCount_queryQuery>;
    dataRequestTemplatesMetadata_query(variables?: Exact<{
        [key: string]: never;
    }> | undefined, options?: TOperationContext | undefined): Promise<dataRequestTemplatesMetadata_queryQuery>;
    dataRequests_query(variables?: Exact<{
        filter?: InputMaybe<FilterDataRequestInput> | undefined;
    }> | undefined, options?: TOperationContext | undefined): Promise<dataRequests_queryQuery>;
    financialTransactions_query(variables: Exact<{
        identifier: TransactionIdentifierInput;
        skip?: InputMaybe<number> | undefined;
        take?: InputMaybe<number> | undefined;
    }>, options?: TOperationContext | undefined): Promise<financialTransactions_queryQuery>;
    findValidPDAsForRequest_query(variables: Exact<{
        requestId: string;
    }>, options?: TOperationContext | undefined): Promise<findValidPDAsForRequest_queryQuery>;
    generatedFees_query(variables?: Exact<{
        [key: string]: never;
    }> | undefined, options?: TOperationContext | undefined): Promise<generatedFees_queryQuery>;
    getExplorerStats_query(variables?: Exact<{
        [key: string]: never;
    }> | undefined, options?: TOperationContext | undefined): Promise<getExplorerStats_queryQuery>;
    getMonthlyUserUsage_query(variables?: Exact<{
        [key: string]: never;
    }> | undefined, options?: TOperationContext | undefined): Promise<getMonthlyUserUsage_queryQuery>;
    getTotalofIssuersByDataModel_query(variables: Exact<{
        dataModelId: string;
    }>, options?: TOperationContext | undefined): Promise<getTotalofIssuersByDataModel_queryQuery>;
    getTransactionsExplorerStats_query(variables?: Exact<{
        [key: string]: never;
    }> | undefined, options?: TOperationContext | undefined): Promise<getTransactionsExplorerStats_queryQuery>;
    issuedPDAs_query(variables?: Exact<{
        filter?: InputMaybe<FilterPDAInput> | undefined;
        order?: any;
        skip?: InputMaybe<number> | undefined;
        take?: InputMaybe<number> | undefined;
    }> | undefined, options?: TOperationContext | undefined): Promise<issuedPDAs_queryQuery>;
    issuedPDAsCount_query(variables?: Exact<{
        filter?: InputMaybe<FilterPDAInput> | undefined;
    }> | undefined, options?: TOperationContext | undefined): Promise<issuedPDAsCount_queryQuery>;
    issuersByDataModel_query(variables: Exact<{
        id: string;
    }>, options?: TOperationContext | undefined): Promise<issuersByDataModel_queryQuery>;
    issuersByDataModelCount_query(variables: Exact<{
        id: string;
    }>, options?: TOperationContext | undefined): Promise<issuersByDataModelCount_queryQuery>;
    me_query(variables?: Exact<{
        [key: string]: never;
    }> | undefined, options?: TOperationContext | undefined): Promise<me_queryQuery>;
    myDataModelsCount_query(variables?: Exact<{
        filter?: InputMaybe<FilterDataModelInput> | undefined;
    }> | undefined, options?: TOperationContext | undefined): Promise<myDataModelsCount_queryQuery>;
    myDataRequestTemplatesCount_query(variables?: Exact<{
        filter?: InputMaybe<FilterDataRequestTemplateInput> | undefined;
    }> | undefined, options?: TOperationContext | undefined): Promise<myDataRequestTemplatesCount_queryQuery>;
    myFinancialTransactions_query(variables?: Exact<{
        organizationId?: InputMaybe<string> | undefined;
        skip?: InputMaybe<number> | undefined;
        take?: InputMaybe<number> | undefined;
    }> | undefined, options?: TOperationContext | undefined): Promise<myFinancialTransactions_queryQuery>;
    myFinancialTransactionsCount_query(variables?: Exact<{
        organizationId?: InputMaybe<string> | undefined;
    }> | undefined, options?: TOperationContext | undefined): Promise<myFinancialTransactionsCount_queryQuery>;
    myPDACount_query(variables?: Exact<{
        filter?: InputMaybe<FilterPDAInput> | undefined;
    }> | undefined, options?: TOperationContext | undefined): Promise<myPDACount_queryQuery>;
    myPDAs_query(variables?: Exact<{
        filter?: InputMaybe<FilterPDAInput> | undefined;
        order?: any;
        skip?: InputMaybe<number> | undefined;
        take?: InputMaybe<number> | undefined;
    }> | undefined, options?: TOperationContext | undefined): Promise<myPDAs_queryQuery>;
    myTransactions_query(variables?: Exact<{
        filter?: InputMaybe<FilterTransactionsInput> | undefined;
    }> | undefined, options?: TOperationContext | undefined): Promise<myTransactions_queryQuery>;
    myWallet_query(variables?: Exact<{
        organizationId?: InputMaybe<string> | undefined;
    }> | undefined, options?: TOperationContext | undefined): Promise<myWallet_queryQuery>;
    organization_query(variables: Exact<{
        input: OrganizationIdentificationInput;
    }>, options?: TOperationContext | undefined): Promise<organization_queryQuery>;
    organizations_query(variables?: Exact<{
        filter?: InputMaybe<FilterOrganizationInput> | undefined;
        skip?: InputMaybe<number> | undefined;
        take?: InputMaybe<number> | undefined;
    }> | undefined, options?: TOperationContext | undefined): Promise<organizations_queryQuery>;
    proof_query(variables: Exact<{
        id: string;
    }>, options?: TOperationContext | undefined): Promise<proof_queryQuery>;
    proofs_query(variables?: Exact<{
        filter?: InputMaybe<FilterProofInput> | undefined;
        order?: any;
        skip?: InputMaybe<number> | undefined;
        take?: InputMaybe<number> | undefined;
    }> | undefined, options?: TOperationContext | undefined): Promise<proofs_queryQuery>;
    proofsByPDAIds_query(variables: Exact<{
        pdaIds: string | string[];
        skip?: InputMaybe<number> | undefined;
        take?: InputMaybe<number> | undefined;
    }>, options?: TOperationContext | undefined): Promise<proofsByPDAIds_queryQuery>;
    receivedProofs_query(variables?: Exact<{
        order?: any;
        organizationId?: InputMaybe<string> | undefined;
        skip?: InputMaybe<number> | undefined;
        take?: InputMaybe<number> | undefined;
    }> | undefined, options?: TOperationContext | undefined): Promise<receivedProofs_queryQuery>;
    receivedProofsCount_query(variables?: Exact<{
        organizationId?: InputMaybe<string> | undefined;
    }> | undefined, options?: TOperationContext | undefined): Promise<receivedProofsCount_queryQuery>;
    requestsReceived_query(variables?: Exact<{
        filter?: InputMaybe<FilterDataRequestInput> | undefined;
        order?: any;
        skip?: InputMaybe<number> | undefined;
        take?: InputMaybe<number> | undefined;
    }> | undefined, options?: TOperationContext | undefined): Promise<requestsReceived_queryQuery>;
    requestsReceivedCount_query(variables?: Exact<{
        filter?: InputMaybe<FilterDataRequestInput> | undefined;
    }> | undefined, options?: TOperationContext | undefined): Promise<requestsReceivedCount_queryQuery>;
    requestsSent_query(variables?: Exact<{
        filter?: InputMaybe<FilterDataRequestInput> | undefined;
        order?: any;
        skip?: InputMaybe<number> | undefined;
        take?: InputMaybe<number> | undefined;
    }> | undefined, options?: TOperationContext | undefined): Promise<requestsSent_queryQuery>;
    requestsSentCount_query(variables?: Exact<{
        filter?: InputMaybe<FilterDataRequestInput> | undefined;
    }> | undefined, options?: TOperationContext | undefined): Promise<requestsSentCount_queryQuery>;
    sentProofs_query(variables?: Exact<{
        order?: any;
        skip?: InputMaybe<number> | undefined;
        take?: InputMaybe<number> | undefined;
    }> | undefined, options?: TOperationContext | undefined): Promise<sentProofs_queryQuery>;
    sentProofsCount_query(variables?: Exact<{
        [key: string]: never;
    }> | undefined, options?: TOperationContext | undefined): Promise<sentProofsCount_queryQuery>;
    templateByDataRequest_query(variables: Exact<{
        requestID: string;
    }>, options?: TOperationContext | undefined): Promise<templateByDataRequest_queryQuery>;
    transaction_query(variables: Exact<{
        id: string;
    }>, options?: TOperationContext | undefined): Promise<transaction_queryQuery>;
    transactions_query(variables?: Exact<{
        filter?: InputMaybe<FilterTransactionsInput> | undefined;
    }> | undefined, options?: TOperationContext | undefined): Promise<transactions_queryQuery>;
    transactionsCount_query(variables?: Exact<{
        showMoneyTxs?: InputMaybe<boolean> | undefined;
    }> | undefined, options?: TOperationContext | undefined): Promise<transactionsCount_queryQuery>;
    user_query(variables: Exact<{
        input: UserIdentificationInput;
    }>, options?: TOperationContext | undefined): Promise<user_queryQuery>;
    verifiersByDataRequestTemplate_query(variables: Exact<{
        id: string;
    }>, options?: TOperationContext | undefined): Promise<verifiersByDataRequestTemplate_queryQuery>;
    verifiersByDataRequestTemplateCount_query(variables: Exact<{
        id: string;
    }>, options?: TOperationContext | undefined): Promise<verifiersByDataRequestTemplateCount_queryQuery>;
    addEmail_mutation(variables: Exact<{
        input: AddEmailInput;
    }>, options?: TOperationContext | undefined): Promise<addEmail_mutationMutation>;
    addEmailConfirmation_mutation(variables: Exact<{
        input: AddEmailConfirmationInput;
    }>, options?: TOperationContext | undefined): Promise<addEmailConfirmation_mutationMutation>;
    addMemberToOrganization_mutation(variables: Exact<{
        input: MemberInput;
    }>, options?: TOperationContext | undefined): Promise<addMemberToOrganization_mutationMutation>;
    addWallet_mutation(variables: Exact<{
        input: CreateWalletNonceInput;
    }>, options?: TOperationContext | undefined): Promise<addWallet_mutationMutation>;
    addWalletConfirmation_mutation(variables: Exact<{
        input: AddWalletConfirmationInput;
    }>, options?: TOperationContext | undefined): Promise<addWalletConfirmation_mutationMutation>;
    changeMemberRole_mutation(variables: Exact<{
        input: MemberInput;
    }>, options?: TOperationContext | undefined): Promise<changeMemberRole_mutationMutation>;
    changePDAStatus_mutation(variables: Exact<{
        input: UpdatePDAStatusInput;
    }>, options?: TOperationContext | undefined): Promise<changePDAStatus_mutationMutation>;
    createApplication_mutation(variables: Exact<{
        input: CreateApplicationInput;
    }>, options?: TOperationContext | undefined): Promise<createApplication_mutationMutation>;
    createDataModel_mutation(variables: Exact<{
        input: CreateDataModelInput;
    }>, options?: TOperationContext | undefined): Promise<createDataModel_mutationMutation>;
    createDataRequest_mutation(variables: Exact<{
        input: DataRequestSchemaInput;
    }>, options?: TOperationContext | undefined): Promise<createDataRequest_mutationMutation>;
    createDataRequestTemplate_mutation(variables: Exact<{
        input: TemplateSchemaInput;
    }>, options?: TOperationContext | undefined): Promise<createDataRequestTemplate_mutationMutation>;
    createEmailNonce_mutation(variables: Exact<{
        input: CreateEmailNonceInput;
    }>, options?: TOperationContext | undefined): Promise<createEmailNonce_mutationMutation>;
    createOrganization_mutation(variables: Exact<{
        input: CreateOrganizationInput;
    }>, options?: TOperationContext | undefined): Promise<createOrganization_mutationMutation>;
    createPDA_mutation(variables: Exact<{
        input: CreatePDAInput;
    }>, options?: TOperationContext | undefined): Promise<createPDA_mutationMutation>;
    createProof_mutation(variables?: Exact<{
        claims?: any;
        requestId?: InputMaybe<string> | undefined;
        signature?: InputMaybe<string> | undefined;
        verifier?: InputMaybe<IdentificationInput> | undefined;
        wallet?: InputMaybe<string> | undefined;
    }> | undefined, options?: TOperationContext | undefined): Promise<createProof_mutationMutation>;
    createProofMessage_mutation(variables: Exact<{
        requestId: string;
    }>, options?: TOperationContext | undefined): Promise<createProofMessage_mutationMutation>;
    createWalletNonce_mutation(variables: Exact<{
        input: CreateWalletNonceInput;
    }>, options?: TOperationContext | undefined): Promise<createWalletNonce_mutationMutation>;
    deleteAccount_mutation(variables: Exact<{
        id: string;
    }>, options?: TOperationContext | undefined): Promise<deleteAccount_mutationMutation>;
    loginEmail_mutation(variables: Exact<{
        input: LoginEmailInput;
    }>, options?: TOperationContext | undefined): Promise<loginEmail_mutationMutation>;
    loginWallet_mutation(variables: Exact<{
        input: LoginWalletInput;
    }>, options?: TOperationContext | undefined): Promise<loginWallet_mutationMutation>;
    migrateAuthMethod_mutation(variables: Exact<{
        input: MigrateAuthInput;
    }>, options?: TOperationContext | undefined): Promise<migrateAuthMethod_mutationMutation>;
    refreshToken_mutation(variables: Exact<{
        input: RefreshTokenInput;
    }>, options?: TOperationContext | undefined): Promise<refreshToken_mutationMutation>;
    rejectDataRequest_mutation(variables: Exact<{
        requestId: string;
    }>, options?: TOperationContext | undefined): Promise<rejectDataRequest_mutationMutation>;
    removeApplication_mutation(variables: Exact<{
        id: string;
    }>, options?: TOperationContext | undefined): Promise<removeApplication_mutationMutation>;
    removeMemberFromOrganization_mutation(variables: Exact<{
        input: TransferMemberInput;
    }>, options?: TOperationContext | undefined): Promise<removeMemberFromOrganization_mutationMutation>;
    transferOwnership_mutation(variables: Exact<{
        input: TransferMemberInput;
    }>, options?: TOperationContext | undefined): Promise<transferOwnership_mutationMutation>;
    unregisterAuthMethod_mutation(variables: Exact<{
        input: AuthInput;
    }>, options?: TOperationContext | undefined): Promise<unregisterAuthMethod_mutationMutation>;
    updateMyDisplayName_mutation(variables?: Exact<{
        displayName?: InputMaybe<string> | undefined;
    }> | undefined, options?: TOperationContext | undefined): Promise<updateMyDisplayName_mutationMutation>;
    updateMyGatewayId_mutation(variables: Exact<{
        gatewayId: string;
    }>, options?: TOperationContext | undefined): Promise<updateMyGatewayId_mutationMutation>;
    updateMyProfilePicture_mutation(variables?: Exact<{
        profilePictureUrl?: InputMaybe<string> | undefined;
    }> | undefined, options?: TOperationContext | undefined): Promise<updateMyProfilePicture_mutationMutation>;
    updateNotificationEmail_mutation(variables: Exact<{
        email: string;
    }>, options?: TOperationContext | undefined): Promise<updateNotificationEmail_mutationMutation>;
    updateOrganization_mutation(variables: Exact<{
        input: UpdateOrganizationInput;
    }>, options?: TOperationContext | undefined): Promise<updateOrganization_mutationMutation>;
    updatePDA_mutation(variables: Exact<{
        input: UpdatePDAInput;
    }>, options?: TOperationContext | undefined): Promise<updatePDA_mutationMutation>;
    updateUser_mutation(variables: Exact<{
        input: UpdateUserInput;
    }>, options?: TOperationContext | undefined): Promise<updateUser_mutationMutation>;
};
export type PDA_queryQueryVariables = Exact<{
    id: Scalars['String']['input'];
}>;
export type PDA_queryQuery = {
    PDA?: Maybe<(Pick<PrivateDataAsset, 'arweaveUrl' | 'claimHash' | 'expirationDate' | 'hash' | 'id' | 'issuanceDate' | 'issuerHash' | 'lastUpdated' | 'ownerHash' | 'status'> & {
        dataAsset?: Maybe<Pick<DecryptedPDA, 'claim' | 'description' | 'expirationDate' | 'image' | 'qrCode' | 'title'>>;
    })>;
};
export type PDACount_queryQueryVariables = Exact<{
    filter?: InputMaybe<FilterPDAInput>;
}>;
export type PDACount_queryQuery = Pick<Query, 'PDACount'>;
export type PDAs_queryQueryVariables = Exact<{
    filter?: InputMaybe<FilterPDAInput>;
    order?: InputMaybe<Scalars['JSON']['input']>;
    skip?: InputMaybe<Scalars['Float']['input']>;
    take?: InputMaybe<Scalars['Float']['input']>;
}>;
export type PDAs_queryQuery = {
    PDAs: Array<(Pick<PrivateDataAsset, 'arweaveUrl' | 'claimHash' | 'expirationDate' | 'hash' | 'id' | 'issuanceDate' | 'issuerHash' | 'lastUpdated' | 'ownerHash' | 'status'> & {
        dataAsset?: Maybe<Pick<DecryptedPDA, 'claim' | 'description' | 'expirationDate' | 'image' | 'qrCode' | 'title'>>;
    })>;
};
export type applications_queryQueryVariables = Exact<{
    [key: string]: never;
}>;
export type applications_queryQuery = {
    applications: Array<(Pick<Application, 'apiKey' | 'gatewayFacilitationFee'> & {
        organization: Pick<Organization, 'arweaveUrl' | 'createdAt' | 'description' | 'gatewayId' | 'id' | 'image' | 'name' | 'updatedAt' | 'usernameUpdatedAt' | 'verified' | 'walletId' | 'website'>;
    })>;
};
export type calculateProofCost_queryQueryVariables = Exact<{
    requestId: Scalars['String']['input'];
}>;
export type calculateProofCost_queryQuery = {
    calculateProofCost: Pick<ProofCost, 'facilitationFee' | 'totalCost'>;
};
export type checkUsernameAvailability_queryQueryVariables = Exact<{
    username: Scalars['String']['input'];
}>;
export type checkUsernameAvailability_queryQuery = Pick<Query, 'checkUsernameAvailability'>;
export type createDepositLink_queryQueryVariables = Exact<{
    [key: string]: never;
}>;
export type createDepositLink_queryQuery = Pick<Query, 'createDepositLink'>;
export type dataModel_queryQueryVariables = Exact<{
    id: Scalars['String']['input'];
}>;
export type dataModel_queryQuery = {
    dataModel: (Pick<DataModel, 'arweaveUrl' | 'consumptionPrice' | 'createdAt' | 'description' | 'featured' | 'id' | 'image' | 'pdasIssuedCount' | 'permissioning' | 'revenueGenerated' | 'schema' | 'tags' | 'title' | 'uniqueIssuersCount' | 'verified'> & {
        PDAs: Array<Pick<PrivateDataAsset, 'arweaveUrl' | 'claimHash' | 'expirationDate' | 'hash' | 'id' | 'issuanceDate' | 'issuerHash' | 'lastUpdated' | 'ownerHash' | 'status'>>;
        allowedOrganizations?: Maybe<Array<Pick<Organization, 'arweaveUrl' | 'createdAt' | 'description' | 'gatewayId' | 'id' | 'image' | 'name' | 'updatedAt' | 'usernameUpdatedAt' | 'verified' | 'walletId' | 'website'>>>;
        allowedUsers?: Maybe<Array<Pick<User, 'arweaveUrl' | 'createdAt' | 'credentialsExtraCredits' | 'dataModelsExtraCredits' | 'deletedAt' | 'displayName' | 'email' | 'gatewayId' | 'gatewayIdLastupdate' | 'gatewayIdUpdatedAt' | 'hash' | 'id' | 'isCompleted' | 'profilePicture' | 'roles' | 'status' | 'updatedAt' | 'walletId'>>>;
        createdBy?: Maybe<Pick<User, 'arweaveUrl' | 'createdAt' | 'credentialsExtraCredits' | 'dataModelsExtraCredits' | 'deletedAt' | 'displayName' | 'email' | 'gatewayId' | 'gatewayIdLastupdate' | 'gatewayIdUpdatedAt' | 'hash' | 'id' | 'isCompleted' | 'profilePicture' | 'roles' | 'status' | 'updatedAt' | 'walletId'>>;
        group: Pick<DataModelGroup, 'createdAt' | 'id' | 'official'>;
        organization?: Maybe<Pick<Organization, 'arweaveUrl' | 'createdAt' | 'description' | 'gatewayId' | 'id' | 'image' | 'name' | 'updatedAt' | 'usernameUpdatedAt' | 'verified' | 'walletId' | 'website'>>;
        pdas: Array<Pick<PrivateDataAsset, 'arweaveUrl' | 'claimHash' | 'expirationDate' | 'hash' | 'id' | 'issuanceDate' | 'issuerHash' | 'lastUpdated' | 'ownerHash' | 'status'>>;
    });
};
export type dataModels_queryQueryVariables = Exact<{
    filter?: InputMaybe<FilterDataModelInput>;
    order?: InputMaybe<Scalars['JSON']['input']>;
    skip?: InputMaybe<Scalars['Int']['input']>;
    take?: InputMaybe<Scalars['Int']['input']>;
}>;
export type dataModels_queryQuery = {
    dataModels: Array<(Pick<DataModel, 'arweaveUrl' | 'consumptionPrice' | 'createdAt' | 'description' | 'featured' | 'id' | 'image' | 'pdasIssuedCount' | 'permissioning' | 'revenueGenerated' | 'schema' | 'tags' | 'title' | 'uniqueIssuersCount' | 'verified'> & {
        PDAs: Array<Pick<PrivateDataAsset, 'arweaveUrl' | 'claimHash' | 'expirationDate' | 'hash' | 'id' | 'issuanceDate' | 'issuerHash' | 'lastUpdated' | 'ownerHash' | 'status'>>;
        allowedOrganizations?: Maybe<Array<Pick<Organization, 'arweaveUrl' | 'createdAt' | 'description' | 'gatewayId' | 'id' | 'image' | 'name' | 'updatedAt' | 'usernameUpdatedAt' | 'verified' | 'walletId' | 'website'>>>;
        allowedUsers?: Maybe<Array<Pick<User, 'arweaveUrl' | 'createdAt' | 'credentialsExtraCredits' | 'dataModelsExtraCredits' | 'deletedAt' | 'displayName' | 'email' | 'gatewayId' | 'gatewayIdLastupdate' | 'gatewayIdUpdatedAt' | 'hash' | 'id' | 'isCompleted' | 'profilePicture' | 'roles' | 'status' | 'updatedAt' | 'walletId'>>>;
        createdBy?: Maybe<Pick<User, 'arweaveUrl' | 'createdAt' | 'credentialsExtraCredits' | 'dataModelsExtraCredits' | 'deletedAt' | 'displayName' | 'email' | 'gatewayId' | 'gatewayIdLastupdate' | 'gatewayIdUpdatedAt' | 'hash' | 'id' | 'isCompleted' | 'profilePicture' | 'roles' | 'status' | 'updatedAt' | 'walletId'>>;
        group: Pick<DataModelGroup, 'createdAt' | 'id' | 'official'>;
        organization?: Maybe<Pick<Organization, 'arweaveUrl' | 'createdAt' | 'description' | 'gatewayId' | 'id' | 'image' | 'name' | 'updatedAt' | 'usernameUpdatedAt' | 'verified' | 'walletId' | 'website'>>;
        pdas: Array<Pick<PrivateDataAsset, 'arweaveUrl' | 'claimHash' | 'expirationDate' | 'hash' | 'id' | 'issuanceDate' | 'issuerHash' | 'lastUpdated' | 'ownerHash' | 'status'>>;
    })>;
};
export type dataModelsCount_queryQueryVariables = Exact<{
    filter?: InputMaybe<FilterDataModelInput>;
}>;
export type dataModelsCount_queryQuery = Pick<Query, 'dataModelsCount'>;
export type dataModelsMetadata_queryQueryVariables = Exact<{
    [key: string]: never;
}>;
export type dataModelsMetadata_queryQuery = {
    dataModelsMetadata: Pick<DataModelsMetadata, 'consumptionPrice' | 'issuedCount' | 'tags'>;
};
export type dataRequest_queryQueryVariables = Exact<{
    requestId: Scalars['String']['input'];
}>;
export type dataRequest_queryQuery = {
    dataRequest: (Pick<DataRequest, 'arweaveUrl' | 'createdAt' | 'dataUse' | 'id' | 'status'> & {
        dataRequestTemplate: Pick<DataRequestTemplate, 'arweaveUrl' | 'createdAt' | 'dataRequestsCount' | 'description' | 'id' | 'name' | 'revenueGenerated' | 'schema' | 'tags' | 'uniqueVerifiersCount'>;
        owner: Pick<User, 'arweaveUrl' | 'createdAt' | 'credentialsExtraCredits' | 'dataModelsExtraCredits' | 'deletedAt' | 'displayName' | 'email' | 'gatewayId' | 'gatewayIdLastupdate' | 'gatewayIdUpdatedAt' | 'hash' | 'id' | 'isCompleted' | 'profilePicture' | 'roles' | 'status' | 'updatedAt' | 'walletId'>;
        proof?: Maybe<Pick<Proof, 'arweaveUrl' | 'createdAt' | 'facilitationFee' | 'hash' | 'id' | 'proofHash' | 'status' | 'totalCost' | 'updatedAt'>>;
        verifier?: Maybe<Pick<User, 'arweaveUrl' | 'createdAt' | 'credentialsExtraCredits' | 'dataModelsExtraCredits' | 'deletedAt' | 'displayName' | 'email' | 'gatewayId' | 'gatewayIdLastupdate' | 'gatewayIdUpdatedAt' | 'hash' | 'id' | 'isCompleted' | 'profilePicture' | 'roles' | 'status' | 'updatedAt' | 'walletId'>>;
        verifierOrganization?: Maybe<Pick<Organization, 'arweaveUrl' | 'createdAt' | 'description' | 'gatewayId' | 'id' | 'image' | 'name' | 'updatedAt' | 'usernameUpdatedAt' | 'verified' | 'walletId' | 'website'>>;
    });
};
export type dataRequestCount_queryQueryVariables = Exact<{
    filter?: InputMaybe<FilterDataRequestInput>;
}>;
export type dataRequestCount_queryQuery = Pick<Query, 'dataRequestCount'>;
export type dataRequestStatus_queryQueryVariables = Exact<{
    requestId: Scalars['String']['input'];
}>;
export type dataRequestStatus_queryQuery = Pick<Query, 'dataRequestStatus'>;
export type dataRequestTemplate_queryQueryVariables = Exact<{
    id: Scalars['String']['input'];
}>;
export type dataRequestTemplate_queryQuery = {
    dataRequestTemplate?: Maybe<(Pick<DataRequestTemplate, 'arweaveUrl' | 'createdAt' | 'dataRequestsCount' | 'description' | 'id' | 'name' | 'revenueGenerated' | 'schema' | 'tags' | 'uniqueVerifiersCount'> & {
        dataModels: Array<Pick<DataModel, 'arweaveUrl' | 'consumptionPrice' | 'createdAt' | 'description' | 'featured' | 'id' | 'image' | 'pdasIssuedCount' | 'permissioning' | 'revenueGenerated' | 'schema' | 'tags' | 'title' | 'uniqueIssuersCount' | 'verified'>>;
        dataRequests: Array<Pick<DataRequest, 'arweaveUrl' | 'createdAt' | 'dataUse' | 'id' | 'status'>>;
        organization?: Maybe<Pick<Organization, 'arweaveUrl' | 'createdAt' | 'description' | 'gatewayId' | 'id' | 'image' | 'name' | 'updatedAt' | 'usernameUpdatedAt' | 'verified' | 'walletId' | 'website'>>;
        user: Pick<User, 'arweaveUrl' | 'createdAt' | 'credentialsExtraCredits' | 'dataModelsExtraCredits' | 'deletedAt' | 'displayName' | 'email' | 'gatewayId' | 'gatewayIdLastupdate' | 'gatewayIdUpdatedAt' | 'hash' | 'id' | 'isCompleted' | 'profilePicture' | 'roles' | 'status' | 'updatedAt' | 'walletId'>;
    })>;
};
export type dataRequestTemplates_queryQueryVariables = Exact<{
    filter?: InputMaybe<FilterDataRequestTemplateInput>;
    order?: InputMaybe<Scalars['JSON']['input']>;
    skip?: InputMaybe<Scalars['Int']['input']>;
    take?: InputMaybe<Scalars['Float']['input']>;
}>;
export type dataRequestTemplates_queryQuery = {
    dataRequestTemplates: Array<(Pick<DataRequestTemplate, 'arweaveUrl' | 'createdAt' | 'dataRequestsCount' | 'description' | 'id' | 'name' | 'revenueGenerated' | 'schema' | 'tags' | 'uniqueVerifiersCount'> & {
        dataModels: Array<Pick<DataModel, 'arweaveUrl' | 'consumptionPrice' | 'createdAt' | 'description' | 'featured' | 'id' | 'image' | 'pdasIssuedCount' | 'permissioning' | 'revenueGenerated' | 'schema' | 'tags' | 'title' | 'uniqueIssuersCount' | 'verified'>>;
        dataRequests: Array<Pick<DataRequest, 'arweaveUrl' | 'createdAt' | 'dataUse' | 'id' | 'status'>>;
        organization?: Maybe<Pick<Organization, 'arweaveUrl' | 'createdAt' | 'description' | 'gatewayId' | 'id' | 'image' | 'name' | 'updatedAt' | 'usernameUpdatedAt' | 'verified' | 'walletId' | 'website'>>;
        user: Pick<User, 'arweaveUrl' | 'createdAt' | 'credentialsExtraCredits' | 'dataModelsExtraCredits' | 'deletedAt' | 'displayName' | 'email' | 'gatewayId' | 'gatewayIdLastupdate' | 'gatewayIdUpdatedAt' | 'hash' | 'id' | 'isCompleted' | 'profilePicture' | 'roles' | 'status' | 'updatedAt' | 'walletId'>;
    })>;
};
export type dataRequestTemplatesCount_queryQueryVariables = Exact<{
    filter?: InputMaybe<FilterDataRequestTemplateInput>;
}>;
export type dataRequestTemplatesCount_queryQuery = Pick<Query, 'dataRequestTemplatesCount'>;
export type dataRequestTemplatesMetadata_queryQueryVariables = Exact<{
    [key: string]: never;
}>;
export type dataRequestTemplatesMetadata_queryQuery = {
    dataRequestTemplatesMetadata: Pick<DataRequestTemplatesMetadata, 'tags'>;
};
export type dataRequests_queryQueryVariables = Exact<{
    filter?: InputMaybe<FilterDataRequestInput>;
}>;
export type dataRequests_queryQuery = {
    dataRequests: Array<(Pick<DataRequest, 'arweaveUrl' | 'createdAt' | 'dataUse' | 'id' | 'status'> & {
        dataRequestTemplate: Pick<DataRequestTemplate, 'arweaveUrl' | 'createdAt' | 'dataRequestsCount' | 'description' | 'id' | 'name' | 'revenueGenerated' | 'schema' | 'tags' | 'uniqueVerifiersCount'>;
        owner: Pick<User, 'arweaveUrl' | 'createdAt' | 'credentialsExtraCredits' | 'dataModelsExtraCredits' | 'deletedAt' | 'displayName' | 'email' | 'gatewayId' | 'gatewayIdLastupdate' | 'gatewayIdUpdatedAt' | 'hash' | 'id' | 'isCompleted' | 'profilePicture' | 'roles' | 'status' | 'updatedAt' | 'walletId'>;
        proof?: Maybe<Pick<Proof, 'arweaveUrl' | 'createdAt' | 'facilitationFee' | 'hash' | 'id' | 'proofHash' | 'status' | 'totalCost' | 'updatedAt'>>;
        verifier?: Maybe<Pick<User, 'arweaveUrl' | 'createdAt' | 'credentialsExtraCredits' | 'dataModelsExtraCredits' | 'deletedAt' | 'displayName' | 'email' | 'gatewayId' | 'gatewayIdLastupdate' | 'gatewayIdUpdatedAt' | 'hash' | 'id' | 'isCompleted' | 'profilePicture' | 'roles' | 'status' | 'updatedAt' | 'walletId'>>;
        verifierOrganization?: Maybe<Pick<Organization, 'arweaveUrl' | 'createdAt' | 'description' | 'gatewayId' | 'id' | 'image' | 'name' | 'updatedAt' | 'usernameUpdatedAt' | 'verified' | 'walletId' | 'website'>>;
    })>;
};
export type financialTransactions_queryQueryVariables = Exact<{
    identifier: TransactionIdentifierInput;
    skip?: InputMaybe<Scalars['Int']['input']>;
    take?: InputMaybe<Scalars['Int']['input']>;
}>;
export type financialTransactions_queryQuery = {
    financialTransactions: Array<(Pick<FinancialTransaction, 'action' | 'createdAt' | 'fee' | 'id' | 'memo' | 'total' | 'transactionId' | 'type' | 'updatedAt' | 'value'> & {
        from?: Maybe<Pick<Organization, 'arweaveUrl' | 'createdAt' | 'description' | 'gatewayId' | 'id' | 'image' | 'name' | 'updatedAt' | 'usernameUpdatedAt' | 'verified' | 'walletId' | 'website'> | Pick<User, 'arweaveUrl' | 'createdAt' | 'credentialsExtraCredits' | 'dataModelsExtraCredits' | 'deletedAt' | 'displayName' | 'email' | 'gatewayId' | 'gatewayIdLastupdate' | 'gatewayIdUpdatedAt' | 'hash' | 'id' | 'isCompleted' | 'profilePicture' | 'roles' | 'status' | 'updatedAt' | 'walletId'>>;
        to?: Maybe<Pick<Organization, 'arweaveUrl' | 'createdAt' | 'description' | 'gatewayId' | 'id' | 'image' | 'name' | 'updatedAt' | 'usernameUpdatedAt' | 'verified' | 'walletId' | 'website'> | Pick<User, 'arweaveUrl' | 'createdAt' | 'credentialsExtraCredits' | 'dataModelsExtraCredits' | 'deletedAt' | 'displayName' | 'email' | 'gatewayId' | 'gatewayIdLastupdate' | 'gatewayIdUpdatedAt' | 'hash' | 'id' | 'isCompleted' | 'profilePicture' | 'roles' | 'status' | 'updatedAt' | 'walletId'>>;
        transaction?: Maybe<Pick<Transaction, 'action' | 'arweaveUrl' | 'cost' | 'createdAt' | 'id' | 'updatedAt'>>;
        wallet: Pick<Wallet, 'balance' | 'moneyIn' | 'moneyOut'>;
    })>;
};
export type findValidPDAsForRequest_queryQueryVariables = Exact<{
    requestId: Scalars['String']['input'];
}>;
export type findValidPDAsForRequest_queryQuery = {
    findValidPDAsForRequest: Array<(Pick<ValidPDAForRequest, 'required'> & {
        dataModel: Pick<DataModel, 'arweaveUrl' | 'consumptionPrice' | 'createdAt' | 'description' | 'featured' | 'id' | 'image' | 'pdasIssuedCount' | 'permissioning' | 'revenueGenerated' | 'schema' | 'tags' | 'title' | 'uniqueIssuersCount' | 'verified'>;
        pdas: Array<Pick<PrivateDataAsset, 'arweaveUrl' | 'claimHash' | 'expirationDate' | 'hash' | 'id' | 'issuanceDate' | 'issuerHash' | 'lastUpdated' | 'ownerHash' | 'status'>>;
        schema: Pick<DataRequestTemplateDataModelSchemaObject, 'claimValidations' | 'id' | 'issuanceDate' | 'issuers' | 'organizations' | 'required'>;
        validData?: Maybe<Array<Pick<ValidDataRequested, 'provided' | 'requested'>>>;
    })>;
};
export type generatedFees_queryQueryVariables = Exact<{
    [key: string]: never;
}>;
export type generatedFees_queryQuery = Pick<Query, 'generatedFees'>;
export type getExplorerStats_queryQueryVariables = Exact<{
    [key: string]: never;
}>;
export type getExplorerStats_queryQuery = {
    getExplorerStats: Pick<ExplorerAnalyticsSchema, 'dataRequests' | 'pdasIssued' | 'totalEarnings' | 'uniqueIssuers'>;
};
export type getMonthlyUserUsage_queryQueryVariables = Exact<{
    [key: string]: never;
}>;
export type getMonthlyUserUsage_queryQuery = {
    getMonthlyUserUsage: Pick<UserUsageDto, 'credentialsUsageAllowedByMonth' | 'datamodelsUsageAllowedByMonth' | 'monthlyCredentials' | 'monthlyDatamodels'>;
};
export type getTotalofIssuersByDataModel_queryQueryVariables = Exact<{
    dataModelId: Scalars['String']['input'];
}>;
export type getTotalofIssuersByDataModel_queryQuery = Pick<Query, 'getTotalofIssuersByDataModel'>;
export type getTransactionsExplorerStats_queryQueryVariables = Exact<{
    [key: string]: never;
}>;
export type getTransactionsExplorerStats_queryQuery = {
    getTransactionsExplorerStats: Pick<ExplorerTransactionsAnalyticsSchema, 'dataRequests' | 'pdasIssued' | 'totalEarnings' | 'totalTransactions' | 'uniqueIssuers'>;
};
export type issuedPDAs_queryQueryVariables = Exact<{
    filter?: InputMaybe<FilterPDAInput>;
    order?: InputMaybe<Scalars['JSON']['input']>;
    skip?: InputMaybe<Scalars['Float']['input']>;
    take?: InputMaybe<Scalars['Float']['input']>;
}>;
export type issuedPDAs_queryQuery = {
    issuedPDAs: Array<(Pick<PrivateDataAsset, 'arweaveUrl' | 'claimHash' | 'expirationDate' | 'hash' | 'id' | 'issuanceDate' | 'issuerHash' | 'lastUpdated' | 'ownerHash' | 'status'> & {
        dataAsset?: Maybe<Pick<DecryptedPDA, 'claim' | 'description' | 'expirationDate' | 'image' | 'qrCode' | 'title'>>;
    })>;
};
export type issuedPDAsCount_queryQueryVariables = Exact<{
    filter?: InputMaybe<FilterPDAInput>;
}>;
export type issuedPDAsCount_queryQuery = Pick<Query, 'issuedPDAsCount'>;
export type issuersByDataModel_queryQueryVariables = Exact<{
    id: Scalars['String']['input'];
}>;
export type issuersByDataModel_queryQuery = {
    issuersByDataModel: Array<(Pick<DataModelIssuer, 'count'> & {
        issuer?: Maybe<Pick<Organization, 'arweaveUrl' | 'createdAt' | 'description' | 'gatewayId' | 'id' | 'image' | 'name' | 'updatedAt' | 'usernameUpdatedAt' | 'verified' | 'walletId' | 'website'> | Pick<User, 'arweaveUrl' | 'createdAt' | 'credentialsExtraCredits' | 'dataModelsExtraCredits' | 'deletedAt' | 'displayName' | 'email' | 'gatewayId' | 'gatewayIdLastupdate' | 'gatewayIdUpdatedAt' | 'hash' | 'id' | 'isCompleted' | 'profilePicture' | 'roles' | 'status' | 'updatedAt' | 'walletId'>>;
    })>;
};
export type issuersByDataModelCount_queryQueryVariables = Exact<{
    id: Scalars['String']['input'];
}>;
export type issuersByDataModelCount_queryQuery = Pick<Query, 'issuersByDataModelCount'>;
export type me_queryQueryVariables = Exact<{
    [key: string]: never;
}>;
export type me_queryQuery = {
    me: (Pick<User, 'arweaveUrl' | 'createdAt' | 'credentialsExtraCredits' | 'dataModelsExtraCredits' | 'deletedAt' | 'displayName' | 'email' | 'gatewayId' | 'gatewayIdLastupdate' | 'gatewayIdUpdatedAt' | 'hash' | 'id' | 'isCompleted' | 'profilePicture' | 'roles' | 'status' | 'updatedAt' | 'walletId'> & {
        accesses?: Maybe<Array<Pick<OrganizationAccess, 'id' | 'role'>>>;
        authentications?: Maybe<Array<Pick<Auth, 'hash' | 'id' | 'type' | 'userId'>>>;
        dataModels?: Maybe<Array<Pick<DataModel, 'arweaveUrl' | 'consumptionPrice' | 'createdAt' | 'description' | 'featured' | 'id' | 'image' | 'pdasIssuedCount' | 'permissioning' | 'revenueGenerated' | 'schema' | 'tags' | 'title' | 'uniqueIssuersCount' | 'verified'>>>;
        dataRequestTemplates: Array<Pick<DataRequestTemplate, 'arweaveUrl' | 'createdAt' | 'dataRequestsCount' | 'description' | 'id' | 'name' | 'revenueGenerated' | 'schema' | 'tags' | 'uniqueVerifiersCount'>>;
        issuedPDAs: Array<Pick<PrivateDataAsset, 'arweaveUrl' | 'claimHash' | 'expirationDate' | 'hash' | 'id' | 'issuanceDate' | 'issuerHash' | 'lastUpdated' | 'ownerHash' | 'status'>>;
        issuedProofs?: Maybe<Array<Pick<Proof, 'arweaveUrl' | 'createdAt' | 'facilitationFee' | 'hash' | 'id' | 'proofHash' | 'status' | 'totalCost' | 'updatedAt'>>>;
        receivedPDAs: Array<Pick<PrivateDataAsset, 'arweaveUrl' | 'claimHash' | 'expirationDate' | 'hash' | 'id' | 'issuanceDate' | 'issuerHash' | 'lastUpdated' | 'ownerHash' | 'status'>>;
        receivedProofs: Array<Pick<Proof, 'arweaveUrl' | 'createdAt' | 'facilitationFee' | 'hash' | 'id' | 'proofHash' | 'status' | 'totalCost' | 'updatedAt'>>;
        recipientDataRequests: Array<Pick<DataRequest, 'arweaveUrl' | 'createdAt' | 'dataUse' | 'id' | 'status'>>;
        verifierDataRequests: Array<Pick<DataRequest, 'arweaveUrl' | 'createdAt' | 'dataUse' | 'id' | 'status'>>;
    });
};
export type myDataModelsCount_queryQueryVariables = Exact<{
    filter?: InputMaybe<FilterDataModelInput>;
}>;
export type myDataModelsCount_queryQuery = Pick<Query, 'myDataModelsCount'>;
export type myDataRequestTemplatesCount_queryQueryVariables = Exact<{
    filter?: InputMaybe<FilterDataRequestTemplateInput>;
}>;
export type myDataRequestTemplatesCount_queryQuery = Pick<Query, 'myDataRequestTemplatesCount'>;
export type myFinancialTransactions_queryQueryVariables = Exact<{
    organizationId?: InputMaybe<Scalars['String']['input']>;
    skip?: InputMaybe<Scalars['Int']['input']>;
    take?: InputMaybe<Scalars['Int']['input']>;
}>;
export type myFinancialTransactions_queryQuery = {
    myFinancialTransactions: Array<(Pick<FinancialTransaction, 'action' | 'createdAt' | 'fee' | 'id' | 'memo' | 'total' | 'transactionId' | 'type' | 'updatedAt' | 'value'> & {
        from?: Maybe<Pick<Organization, 'arweaveUrl' | 'createdAt' | 'description' | 'gatewayId' | 'id' | 'image' | 'name' | 'updatedAt' | 'usernameUpdatedAt' | 'verified' | 'walletId' | 'website'> | Pick<User, 'arweaveUrl' | 'createdAt' | 'credentialsExtraCredits' | 'dataModelsExtraCredits' | 'deletedAt' | 'displayName' | 'email' | 'gatewayId' | 'gatewayIdLastupdate' | 'gatewayIdUpdatedAt' | 'hash' | 'id' | 'isCompleted' | 'profilePicture' | 'roles' | 'status' | 'updatedAt' | 'walletId'>>;
        to?: Maybe<Pick<Organization, 'arweaveUrl' | 'createdAt' | 'description' | 'gatewayId' | 'id' | 'image' | 'name' | 'updatedAt' | 'usernameUpdatedAt' | 'verified' | 'walletId' | 'website'> | Pick<User, 'arweaveUrl' | 'createdAt' | 'credentialsExtraCredits' | 'dataModelsExtraCredits' | 'deletedAt' | 'displayName' | 'email' | 'gatewayId' | 'gatewayIdLastupdate' | 'gatewayIdUpdatedAt' | 'hash' | 'id' | 'isCompleted' | 'profilePicture' | 'roles' | 'status' | 'updatedAt' | 'walletId'>>;
        transaction?: Maybe<Pick<Transaction, 'action' | 'arweaveUrl' | 'cost' | 'createdAt' | 'id' | 'updatedAt'>>;
        wallet: Pick<Wallet, 'balance' | 'moneyIn' | 'moneyOut'>;
    })>;
};
export type myFinancialTransactionsCount_queryQueryVariables = Exact<{
    organizationId?: InputMaybe<Scalars['String']['input']>;
}>;
export type myFinancialTransactionsCount_queryQuery = Pick<Query, 'myFinancialTransactionsCount'>;
export type myPDACount_queryQueryVariables = Exact<{
    filter?: InputMaybe<FilterPDAInput>;
}>;
export type myPDACount_queryQuery = Pick<Query, 'myPDACount'>;
export type myPDAs_queryQueryVariables = Exact<{
    filter?: InputMaybe<FilterPDAInput>;
    order?: InputMaybe<Scalars['JSON']['input']>;
    skip?: InputMaybe<Scalars['Float']['input']>;
    take?: InputMaybe<Scalars['Float']['input']>;
}>;
export type myPDAs_queryQuery = {
    myPDAs: Array<(Pick<PrivateDataAsset, 'arweaveUrl' | 'claimHash' | 'expirationDate' | 'hash' | 'id' | 'issuanceDate' | 'issuerHash' | 'lastUpdated' | 'ownerHash' | 'status'> & {
        dataAsset?: Maybe<Pick<DecryptedPDA, 'claim' | 'description' | 'expirationDate' | 'image' | 'qrCode' | 'title'>>;
    })>;
};
export type myTransactions_queryQueryVariables = Exact<{
    filter?: InputMaybe<FilterTransactionsInput>;
}>;
export type myTransactions_queryQuery = {
    myTransactions: Array<(Pick<Transaction, 'action' | 'arweaveUrl' | 'cost' | 'createdAt' | 'id' | 'updatedAt'> & {
        financialTransactions: Array<Pick<FinancialTransaction, 'action' | 'createdAt' | 'fee' | 'id' | 'memo' | 'total' | 'transactionId' | 'type' | 'updatedAt' | 'value'>>;
        from?: Maybe<Pick<Organization, 'arweaveUrl' | 'createdAt' | 'description' | 'gatewayId' | 'id' | 'image' | 'name' | 'updatedAt' | 'usernameUpdatedAt' | 'verified' | 'walletId' | 'website'> | Pick<User, 'arweaveUrl' | 'createdAt' | 'credentialsExtraCredits' | 'dataModelsExtraCredits' | 'deletedAt' | 'displayName' | 'email' | 'gatewayId' | 'gatewayIdLastupdate' | 'gatewayIdUpdatedAt' | 'hash' | 'id' | 'isCompleted' | 'profilePicture' | 'roles' | 'status' | 'updatedAt' | 'walletId'>>;
        metadata: Pick<DataModelMetadata, 'creator' | 'dataModel' | 'signedBy'> | Pick<OrganizationMetadata, 'organization' | 'users' | 'usersAdmin' | 'verified'> | Pick<PDAMetadata, 'dataModel' | 'expirationDate' | 'issuer' | 'pda' | 'signedBy' | 'pdametadastatus'> | Pick<ProofMetadata, 'earnings' | 'fees' | 'owner' | 'proof' | 'request' | 'status' | 'verifier'> | (Pick<RequestMetadata, 'owner' | 'requestTemplate' | 'status' | 'verifier'> & {
            requestStringNonNull: RequestMetadata['request'];
        }) | Pick<RequestTemplateMetadata, 'creator' | 'dataModels' | 'requestTemplate' | 'signedBy'> | Pick<UserMetadata, 'user'>;
        to?: Maybe<Pick<Organization, 'arweaveUrl' | 'createdAt' | 'description' | 'gatewayId' | 'id' | 'image' | 'name' | 'updatedAt' | 'usernameUpdatedAt' | 'verified' | 'walletId' | 'website'> | Pick<User, 'arweaveUrl' | 'createdAt' | 'credentialsExtraCredits' | 'dataModelsExtraCredits' | 'deletedAt' | 'displayName' | 'email' | 'gatewayId' | 'gatewayIdLastupdate' | 'gatewayIdUpdatedAt' | 'hash' | 'id' | 'isCompleted' | 'profilePicture' | 'roles' | 'status' | 'updatedAt' | 'walletId'>>;
    })>;
};
export type myWallet_queryQueryVariables = Exact<{
    organizationId?: InputMaybe<Scalars['String']['input']>;
}>;
export type myWallet_queryQuery = {
    myWallet: (Pick<Wallet, 'balance' | 'moneyIn' | 'moneyOut'> & {
        moneyInSummary: Array<Pick<FinancialSummaryOutput, 'action' | 'amount'>>;
        moneyOutSummary: Array<Pick<FinancialSummaryOutput, 'action' | 'amount'>>;
    });
};
export type organization_queryQueryVariables = Exact<{
    input: OrganizationIdentificationInput;
}>;
export type organization_queryQuery = {
    organization?: Maybe<(Pick<Organization, 'arweaveUrl' | 'createdAt' | 'description' | 'gatewayId' | 'id' | 'image' | 'name' | 'updatedAt' | 'usernameUpdatedAt' | 'verified' | 'walletId' | 'website'> & {
        accesses?: Maybe<Array<Pick<OrganizationAccess, 'id' | 'role'>>>;
        dataModels?: Maybe<Array<Pick<DataModel, 'arweaveUrl' | 'consumptionPrice' | 'createdAt' | 'description' | 'featured' | 'id' | 'image' | 'pdasIssuedCount' | 'permissioning' | 'revenueGenerated' | 'schema' | 'tags' | 'title' | 'uniqueIssuersCount' | 'verified'>>>;
        dataRequestTemplates: Array<Pick<DataRequestTemplate, 'arweaveUrl' | 'createdAt' | 'dataRequestsCount' | 'description' | 'id' | 'name' | 'revenueGenerated' | 'schema' | 'tags' | 'uniqueVerifiersCount'>>;
        receivedProofs?: Maybe<Array<Pick<Proof, 'arweaveUrl' | 'createdAt' | 'facilitationFee' | 'hash' | 'id' | 'proofHash' | 'status' | 'totalCost' | 'updatedAt'>>>;
        verifierDataRequests: Array<Pick<DataRequest, 'arweaveUrl' | 'createdAt' | 'dataUse' | 'id' | 'status'>>;
    })>;
};
export type organizations_queryQueryVariables = Exact<{
    filter?: InputMaybe<FilterOrganizationInput>;
    skip?: InputMaybe<Scalars['Float']['input']>;
    take?: InputMaybe<Scalars['Float']['input']>;
}>;
export type organizations_queryQuery = {
    organizations: Array<(Pick<Organization, 'arweaveUrl' | 'createdAt' | 'description' | 'gatewayId' | 'id' | 'image' | 'name' | 'updatedAt' | 'usernameUpdatedAt' | 'verified' | 'walletId' | 'website'> & {
        accesses?: Maybe<Array<Pick<OrganizationAccess, 'id' | 'role'>>>;
        dataModels?: Maybe<Array<Pick<DataModel, 'arweaveUrl' | 'consumptionPrice' | 'createdAt' | 'description' | 'featured' | 'id' | 'image' | 'pdasIssuedCount' | 'permissioning' | 'revenueGenerated' | 'schema' | 'tags' | 'title' | 'uniqueIssuersCount' | 'verified'>>>;
        dataRequestTemplates: Array<Pick<DataRequestTemplate, 'arweaveUrl' | 'createdAt' | 'dataRequestsCount' | 'description' | 'id' | 'name' | 'revenueGenerated' | 'schema' | 'tags' | 'uniqueVerifiersCount'>>;
        receivedProofs?: Maybe<Array<Pick<Proof, 'arweaveUrl' | 'createdAt' | 'facilitationFee' | 'hash' | 'id' | 'proofHash' | 'status' | 'totalCost' | 'updatedAt'>>>;
        verifierDataRequests: Array<Pick<DataRequest, 'arweaveUrl' | 'createdAt' | 'dataUse' | 'id' | 'status'>>;
    })>;
};
export type proof_queryQueryVariables = Exact<{
    id: Scalars['String']['input'];
}>;
export type proof_queryQuery = {
    proof: (Pick<Proof, 'arweaveUrl' | 'createdAt' | 'facilitationFee' | 'hash' | 'id' | 'proofHash' | 'status' | 'totalCost' | 'updatedAt'> & {
        data?: Maybe<Pick<DecryptedProof, 'raw'>>;
        dataRequest?: Maybe<Pick<DataRequest, 'arweaveUrl' | 'createdAt' | 'dataUse' | 'id' | 'status'>>;
        owner: Pick<User, 'arweaveUrl' | 'createdAt' | 'credentialsExtraCredits' | 'dataModelsExtraCredits' | 'deletedAt' | 'displayName' | 'email' | 'gatewayId' | 'gatewayIdLastupdate' | 'gatewayIdUpdatedAt' | 'hash' | 'id' | 'isCompleted' | 'profilePicture' | 'roles' | 'status' | 'updatedAt' | 'walletId'>;
        verifier?: Maybe<Pick<User, 'arweaveUrl' | 'createdAt' | 'credentialsExtraCredits' | 'dataModelsExtraCredits' | 'deletedAt' | 'displayName' | 'email' | 'gatewayId' | 'gatewayIdLastupdate' | 'gatewayIdUpdatedAt' | 'hash' | 'id' | 'isCompleted' | 'profilePicture' | 'roles' | 'status' | 'updatedAt' | 'walletId'>>;
        verifierOrganization?: Maybe<Pick<Organization, 'arweaveUrl' | 'createdAt' | 'description' | 'gatewayId' | 'id' | 'image' | 'name' | 'updatedAt' | 'usernameUpdatedAt' | 'verified' | 'walletId' | 'website'>>;
    });
};
export type proofs_queryQueryVariables = Exact<{
    filter?: InputMaybe<FilterProofInput>;
    order?: InputMaybe<Scalars['JSON']['input']>;
    skip?: InputMaybe<Scalars['Float']['input']>;
    take?: InputMaybe<Scalars['Float']['input']>;
}>;
export type proofs_queryQuery = {
    proofs: Array<(Pick<Proof, 'arweaveUrl' | 'createdAt' | 'facilitationFee' | 'hash' | 'id' | 'proofHash' | 'status' | 'totalCost' | 'updatedAt'> & {
        data?: Maybe<Pick<DecryptedProof, 'raw'>>;
        dataRequest?: Maybe<Pick<DataRequest, 'arweaveUrl' | 'createdAt' | 'dataUse' | 'id' | 'status'>>;
        owner: Pick<User, 'arweaveUrl' | 'createdAt' | 'credentialsExtraCredits' | 'dataModelsExtraCredits' | 'deletedAt' | 'displayName' | 'email' | 'gatewayId' | 'gatewayIdLastupdate' | 'gatewayIdUpdatedAt' | 'hash' | 'id' | 'isCompleted' | 'profilePicture' | 'roles' | 'status' | 'updatedAt' | 'walletId'>;
        verifier?: Maybe<Pick<User, 'arweaveUrl' | 'createdAt' | 'credentialsExtraCredits' | 'dataModelsExtraCredits' | 'deletedAt' | 'displayName' | 'email' | 'gatewayId' | 'gatewayIdLastupdate' | 'gatewayIdUpdatedAt' | 'hash' | 'id' | 'isCompleted' | 'profilePicture' | 'roles' | 'status' | 'updatedAt' | 'walletId'>>;
        verifierOrganization?: Maybe<Pick<Organization, 'arweaveUrl' | 'createdAt' | 'description' | 'gatewayId' | 'id' | 'image' | 'name' | 'updatedAt' | 'usernameUpdatedAt' | 'verified' | 'walletId' | 'website'>>;
    })>;
};
export type proofsByPDAIds_queryQueryVariables = Exact<{
    pdaIds: Array<Scalars['String']['input']> | Scalars['String']['input'];
    skip?: InputMaybe<Scalars['Float']['input']>;
    take?: InputMaybe<Scalars['Float']['input']>;
}>;
export type proofsByPDAIds_queryQuery = {
    proofsByPDAIds: Array<(Pick<Proof, 'arweaveUrl' | 'createdAt' | 'facilitationFee' | 'hash' | 'id' | 'proofHash' | 'status' | 'totalCost' | 'updatedAt'> & {
        data?: Maybe<Pick<DecryptedProof, 'raw'>>;
        dataRequest?: Maybe<Pick<DataRequest, 'arweaveUrl' | 'createdAt' | 'dataUse' | 'id' | 'status'>>;
        owner: Pick<User, 'arweaveUrl' | 'createdAt' | 'credentialsExtraCredits' | 'dataModelsExtraCredits' | 'deletedAt' | 'displayName' | 'email' | 'gatewayId' | 'gatewayIdLastupdate' | 'gatewayIdUpdatedAt' | 'hash' | 'id' | 'isCompleted' | 'profilePicture' | 'roles' | 'status' | 'updatedAt' | 'walletId'>;
        verifier?: Maybe<Pick<User, 'arweaveUrl' | 'createdAt' | 'credentialsExtraCredits' | 'dataModelsExtraCredits' | 'deletedAt' | 'displayName' | 'email' | 'gatewayId' | 'gatewayIdLastupdate' | 'gatewayIdUpdatedAt' | 'hash' | 'id' | 'isCompleted' | 'profilePicture' | 'roles' | 'status' | 'updatedAt' | 'walletId'>>;
        verifierOrganization?: Maybe<Pick<Organization, 'arweaveUrl' | 'createdAt' | 'description' | 'gatewayId' | 'id' | 'image' | 'name' | 'updatedAt' | 'usernameUpdatedAt' | 'verified' | 'walletId' | 'website'>>;
    })>;
};
export type receivedProofs_queryQueryVariables = Exact<{
    order?: InputMaybe<Scalars['JSON']['input']>;
    organizationId?: InputMaybe<Scalars['String']['input']>;
    skip?: InputMaybe<Scalars['Float']['input']>;
    take?: InputMaybe<Scalars['Float']['input']>;
}>;
export type receivedProofs_queryQuery = {
    receivedProofs: Array<(Pick<Proof, 'arweaveUrl' | 'createdAt' | 'facilitationFee' | 'hash' | 'id' | 'proofHash' | 'status' | 'totalCost' | 'updatedAt'> & {
        data?: Maybe<Pick<DecryptedProof, 'raw'>>;
        dataRequest?: Maybe<Pick<DataRequest, 'arweaveUrl' | 'createdAt' | 'dataUse' | 'id' | 'status'>>;
        owner: Pick<User, 'arweaveUrl' | 'createdAt' | 'credentialsExtraCredits' | 'dataModelsExtraCredits' | 'deletedAt' | 'displayName' | 'email' | 'gatewayId' | 'gatewayIdLastupdate' | 'gatewayIdUpdatedAt' | 'hash' | 'id' | 'isCompleted' | 'profilePicture' | 'roles' | 'status' | 'updatedAt' | 'walletId'>;
        verifier?: Maybe<Pick<User, 'arweaveUrl' | 'createdAt' | 'credentialsExtraCredits' | 'dataModelsExtraCredits' | 'deletedAt' | 'displayName' | 'email' | 'gatewayId' | 'gatewayIdLastupdate' | 'gatewayIdUpdatedAt' | 'hash' | 'id' | 'isCompleted' | 'profilePicture' | 'roles' | 'status' | 'updatedAt' | 'walletId'>>;
        verifierOrganization?: Maybe<Pick<Organization, 'arweaveUrl' | 'createdAt' | 'description' | 'gatewayId' | 'id' | 'image' | 'name' | 'updatedAt' | 'usernameUpdatedAt' | 'verified' | 'walletId' | 'website'>>;
    })>;
};
export type receivedProofsCount_queryQueryVariables = Exact<{
    organizationId?: InputMaybe<Scalars['String']['input']>;
}>;
export type receivedProofsCount_queryQuery = Pick<Query, 'receivedProofsCount'>;
export type requestsReceived_queryQueryVariables = Exact<{
    filter?: InputMaybe<FilterDataRequestInput>;
    order?: InputMaybe<Scalars['JSON']['input']>;
    skip?: InputMaybe<Scalars['Float']['input']>;
    take?: InputMaybe<Scalars['Float']['input']>;
}>;
export type requestsReceived_queryQuery = {
    requestsReceived: Array<(Pick<DataRequest, 'arweaveUrl' | 'createdAt' | 'dataUse' | 'id' | 'status'> & {
        dataRequestTemplate: Pick<DataRequestTemplate, 'arweaveUrl' | 'createdAt' | 'dataRequestsCount' | 'description' | 'id' | 'name' | 'revenueGenerated' | 'schema' | 'tags' | 'uniqueVerifiersCount'>;
        owner: Pick<User, 'arweaveUrl' | 'createdAt' | 'credentialsExtraCredits' | 'dataModelsExtraCredits' | 'deletedAt' | 'displayName' | 'email' | 'gatewayId' | 'gatewayIdLastupdate' | 'gatewayIdUpdatedAt' | 'hash' | 'id' | 'isCompleted' | 'profilePicture' | 'roles' | 'status' | 'updatedAt' | 'walletId'>;
        proof?: Maybe<Pick<Proof, 'arweaveUrl' | 'createdAt' | 'facilitationFee' | 'hash' | 'id' | 'proofHash' | 'status' | 'totalCost' | 'updatedAt'>>;
        verifier?: Maybe<Pick<User, 'arweaveUrl' | 'createdAt' | 'credentialsExtraCredits' | 'dataModelsExtraCredits' | 'deletedAt' | 'displayName' | 'email' | 'gatewayId' | 'gatewayIdLastupdate' | 'gatewayIdUpdatedAt' | 'hash' | 'id' | 'isCompleted' | 'profilePicture' | 'roles' | 'status' | 'updatedAt' | 'walletId'>>;
        verifierOrganization?: Maybe<Pick<Organization, 'arweaveUrl' | 'createdAt' | 'description' | 'gatewayId' | 'id' | 'image' | 'name' | 'updatedAt' | 'usernameUpdatedAt' | 'verified' | 'walletId' | 'website'>>;
    })>;
};
export type requestsReceivedCount_queryQueryVariables = Exact<{
    filter?: InputMaybe<FilterDataRequestInput>;
}>;
export type requestsReceivedCount_queryQuery = Pick<Query, 'requestsReceivedCount'>;
export type requestsSent_queryQueryVariables = Exact<{
    filter?: InputMaybe<FilterDataRequestInput>;
    order?: InputMaybe<Scalars['JSON']['input']>;
    skip?: InputMaybe<Scalars['Float']['input']>;
    take?: InputMaybe<Scalars['Float']['input']>;
}>;
export type requestsSent_queryQuery = {
    requestsSent: Array<(Pick<DataRequest, 'arweaveUrl' | 'createdAt' | 'dataUse' | 'id' | 'status'> & {
        dataRequestTemplate: Pick<DataRequestTemplate, 'arweaveUrl' | 'createdAt' | 'dataRequestsCount' | 'description' | 'id' | 'name' | 'revenueGenerated' | 'schema' | 'tags' | 'uniqueVerifiersCount'>;
        owner: Pick<User, 'arweaveUrl' | 'createdAt' | 'credentialsExtraCredits' | 'dataModelsExtraCredits' | 'deletedAt' | 'displayName' | 'email' | 'gatewayId' | 'gatewayIdLastupdate' | 'gatewayIdUpdatedAt' | 'hash' | 'id' | 'isCompleted' | 'profilePicture' | 'roles' | 'status' | 'updatedAt' | 'walletId'>;
        proof?: Maybe<Pick<Proof, 'arweaveUrl' | 'createdAt' | 'facilitationFee' | 'hash' | 'id' | 'proofHash' | 'status' | 'totalCost' | 'updatedAt'>>;
        verifier?: Maybe<Pick<User, 'arweaveUrl' | 'createdAt' | 'credentialsExtraCredits' | 'dataModelsExtraCredits' | 'deletedAt' | 'displayName' | 'email' | 'gatewayId' | 'gatewayIdLastupdate' | 'gatewayIdUpdatedAt' | 'hash' | 'id' | 'isCompleted' | 'profilePicture' | 'roles' | 'status' | 'updatedAt' | 'walletId'>>;
        verifierOrganization?: Maybe<Pick<Organization, 'arweaveUrl' | 'createdAt' | 'description' | 'gatewayId' | 'id' | 'image' | 'name' | 'updatedAt' | 'usernameUpdatedAt' | 'verified' | 'walletId' | 'website'>>;
    })>;
};
export type requestsSentCount_queryQueryVariables = Exact<{
    filter?: InputMaybe<FilterDataRequestInput>;
}>;
export type requestsSentCount_queryQuery = Pick<Query, 'requestsSentCount'>;
export type sentProofs_queryQueryVariables = Exact<{
    order?: InputMaybe<Scalars['JSON']['input']>;
    skip?: InputMaybe<Scalars['Float']['input']>;
    take?: InputMaybe<Scalars['Float']['input']>;
}>;
export type sentProofs_queryQuery = {
    sentProofs: Array<(Pick<Proof, 'arweaveUrl' | 'createdAt' | 'facilitationFee' | 'hash' | 'id' | 'proofHash' | 'status' | 'totalCost' | 'updatedAt'> & {
        data?: Maybe<Pick<DecryptedProof, 'raw'>>;
        dataRequest?: Maybe<Pick<DataRequest, 'arweaveUrl' | 'createdAt' | 'dataUse' | 'id' | 'status'>>;
        owner: Pick<User, 'arweaveUrl' | 'createdAt' | 'credentialsExtraCredits' | 'dataModelsExtraCredits' | 'deletedAt' | 'displayName' | 'email' | 'gatewayId' | 'gatewayIdLastupdate' | 'gatewayIdUpdatedAt' | 'hash' | 'id' | 'isCompleted' | 'profilePicture' | 'roles' | 'status' | 'updatedAt' | 'walletId'>;
        verifier?: Maybe<Pick<User, 'arweaveUrl' | 'createdAt' | 'credentialsExtraCredits' | 'dataModelsExtraCredits' | 'deletedAt' | 'displayName' | 'email' | 'gatewayId' | 'gatewayIdLastupdate' | 'gatewayIdUpdatedAt' | 'hash' | 'id' | 'isCompleted' | 'profilePicture' | 'roles' | 'status' | 'updatedAt' | 'walletId'>>;
        verifierOrganization?: Maybe<Pick<Organization, 'arweaveUrl' | 'createdAt' | 'description' | 'gatewayId' | 'id' | 'image' | 'name' | 'updatedAt' | 'usernameUpdatedAt' | 'verified' | 'walletId' | 'website'>>;
    })>;
};
export type sentProofsCount_queryQueryVariables = Exact<{
    [key: string]: never;
}>;
export type sentProofsCount_queryQuery = Pick<Query, 'sentProofsCount'>;
export type templateByDataRequest_queryQueryVariables = Exact<{
    requestID: Scalars['String']['input'];
}>;
export type templateByDataRequest_queryQuery = {
    templateByDataRequest?: Maybe<(Pick<DataRequestTemplate, 'arweaveUrl' | 'createdAt' | 'dataRequestsCount' | 'description' | 'id' | 'name' | 'revenueGenerated' | 'schema' | 'tags' | 'uniqueVerifiersCount'> & {
        dataModels: Array<Pick<DataModel, 'arweaveUrl' | 'consumptionPrice' | 'createdAt' | 'description' | 'featured' | 'id' | 'image' | 'pdasIssuedCount' | 'permissioning' | 'revenueGenerated' | 'schema' | 'tags' | 'title' | 'uniqueIssuersCount' | 'verified'>>;
        dataRequests: Array<Pick<DataRequest, 'arweaveUrl' | 'createdAt' | 'dataUse' | 'id' | 'status'>>;
        organization?: Maybe<Pick<Organization, 'arweaveUrl' | 'createdAt' | 'description' | 'gatewayId' | 'id' | 'image' | 'name' | 'updatedAt' | 'usernameUpdatedAt' | 'verified' | 'walletId' | 'website'>>;
        user: Pick<User, 'arweaveUrl' | 'createdAt' | 'credentialsExtraCredits' | 'dataModelsExtraCredits' | 'deletedAt' | 'displayName' | 'email' | 'gatewayId' | 'gatewayIdLastupdate' | 'gatewayIdUpdatedAt' | 'hash' | 'id' | 'isCompleted' | 'profilePicture' | 'roles' | 'status' | 'updatedAt' | 'walletId'>;
    })>;
};
export type transaction_queryQueryVariables = Exact<{
    id: Scalars['String']['input'];
}>;
export type transaction_queryQuery = {
    transaction: (Pick<Transaction, 'action' | 'arweaveUrl' | 'cost' | 'createdAt' | 'id' | 'updatedAt'> & {
        financialTransactions: Array<Pick<FinancialTransaction, 'action' | 'createdAt' | 'fee' | 'id' | 'memo' | 'total' | 'transactionId' | 'type' | 'updatedAt' | 'value'>>;
        from?: Maybe<Pick<Organization, 'arweaveUrl' | 'createdAt' | 'description' | 'gatewayId' | 'id' | 'image' | 'name' | 'updatedAt' | 'usernameUpdatedAt' | 'verified' | 'walletId' | 'website'> | Pick<User, 'arweaveUrl' | 'createdAt' | 'credentialsExtraCredits' | 'dataModelsExtraCredits' | 'deletedAt' | 'displayName' | 'email' | 'gatewayId' | 'gatewayIdLastupdate' | 'gatewayIdUpdatedAt' | 'hash' | 'id' | 'isCompleted' | 'profilePicture' | 'roles' | 'status' | 'updatedAt' | 'walletId'>>;
        metadata: Pick<DataModelMetadata, 'creator' | 'dataModel' | 'signedBy'> | Pick<OrganizationMetadata, 'organization' | 'users' | 'usersAdmin' | 'verified'> | Pick<PDAMetadata, 'dataModel' | 'expirationDate' | 'issuer' | 'pda' | 'signedBy' | 'pdametadastatus'> | Pick<ProofMetadata, 'earnings' | 'fees' | 'owner' | 'proof' | 'request' | 'status' | 'verifier'> | (Pick<RequestMetadata, 'owner' | 'requestTemplate' | 'status' | 'verifier'> & {
            requestStringNonNull: RequestMetadata['request'];
        }) | Pick<RequestTemplateMetadata, 'creator' | 'dataModels' | 'requestTemplate' | 'signedBy'> | Pick<UserMetadata, 'user'>;
        to?: Maybe<Pick<Organization, 'arweaveUrl' | 'createdAt' | 'description' | 'gatewayId' | 'id' | 'image' | 'name' | 'updatedAt' | 'usernameUpdatedAt' | 'verified' | 'walletId' | 'website'> | Pick<User, 'arweaveUrl' | 'createdAt' | 'credentialsExtraCredits' | 'dataModelsExtraCredits' | 'deletedAt' | 'displayName' | 'email' | 'gatewayId' | 'gatewayIdLastupdate' | 'gatewayIdUpdatedAt' | 'hash' | 'id' | 'isCompleted' | 'profilePicture' | 'roles' | 'status' | 'updatedAt' | 'walletId'>>;
    });
};
export type transactions_queryQueryVariables = Exact<{
    filter?: InputMaybe<FilterTransactionsInput>;
}>;
export type transactions_queryQuery = {
    transactions: Array<(Pick<Transaction, 'action' | 'arweaveUrl' | 'cost' | 'createdAt' | 'id' | 'updatedAt'> & {
        financialTransactions: Array<Pick<FinancialTransaction, 'action' | 'createdAt' | 'fee' | 'id' | 'memo' | 'total' | 'transactionId' | 'type' | 'updatedAt' | 'value'>>;
        from?: Maybe<Pick<Organization, 'arweaveUrl' | 'createdAt' | 'description' | 'gatewayId' | 'id' | 'image' | 'name' | 'updatedAt' | 'usernameUpdatedAt' | 'verified' | 'walletId' | 'website'> | Pick<User, 'arweaveUrl' | 'createdAt' | 'credentialsExtraCredits' | 'dataModelsExtraCredits' | 'deletedAt' | 'displayName' | 'email' | 'gatewayId' | 'gatewayIdLastupdate' | 'gatewayIdUpdatedAt' | 'hash' | 'id' | 'isCompleted' | 'profilePicture' | 'roles' | 'status' | 'updatedAt' | 'walletId'>>;
        metadata: Pick<DataModelMetadata, 'creator' | 'dataModel' | 'signedBy'> | Pick<OrganizationMetadata, 'organization' | 'users' | 'usersAdmin' | 'verified'> | Pick<PDAMetadata, 'dataModel' | 'expirationDate' | 'issuer' | 'pda' | 'signedBy' | 'pdametadastatus'> | Pick<ProofMetadata, 'earnings' | 'fees' | 'owner' | 'proof' | 'request' | 'status' | 'verifier'> | (Pick<RequestMetadata, 'owner' | 'requestTemplate' | 'status' | 'verifier'> & {
            requestStringNonNull: RequestMetadata['request'];
        }) | Pick<RequestTemplateMetadata, 'creator' | 'dataModels' | 'requestTemplate' | 'signedBy'> | Pick<UserMetadata, 'user'>;
        to?: Maybe<Pick<Organization, 'arweaveUrl' | 'createdAt' | 'description' | 'gatewayId' | 'id' | 'image' | 'name' | 'updatedAt' | 'usernameUpdatedAt' | 'verified' | 'walletId' | 'website'> | Pick<User, 'arweaveUrl' | 'createdAt' | 'credentialsExtraCredits' | 'dataModelsExtraCredits' | 'deletedAt' | 'displayName' | 'email' | 'gatewayId' | 'gatewayIdLastupdate' | 'gatewayIdUpdatedAt' | 'hash' | 'id' | 'isCompleted' | 'profilePicture' | 'roles' | 'status' | 'updatedAt' | 'walletId'>>;
    })>;
};
export type transactionsCount_queryQueryVariables = Exact<{
    showMoneyTxs?: InputMaybe<Scalars['Boolean']['input']>;
}>;
export type transactionsCount_queryQuery = Pick<Query, 'transactionsCount'>;
export type user_queryQueryVariables = Exact<{
    input: UserIdentificationInput;
}>;
export type user_queryQuery = {
    user?: Maybe<(Pick<User, 'arweaveUrl' | 'createdAt' | 'credentialsExtraCredits' | 'dataModelsExtraCredits' | 'deletedAt' | 'displayName' | 'email' | 'gatewayId' | 'gatewayIdLastupdate' | 'gatewayIdUpdatedAt' | 'hash' | 'id' | 'isCompleted' | 'profilePicture' | 'roles' | 'status' | 'updatedAt' | 'walletId'> & {
        accesses?: Maybe<Array<Pick<OrganizationAccess, 'id' | 'role'>>>;
        authentications?: Maybe<Array<Pick<Auth, 'hash' | 'id' | 'type' | 'userId'>>>;
        dataModels?: Maybe<Array<Pick<DataModel, 'arweaveUrl' | 'consumptionPrice' | 'createdAt' | 'description' | 'featured' | 'id' | 'image' | 'pdasIssuedCount' | 'permissioning' | 'revenueGenerated' | 'schema' | 'tags' | 'title' | 'uniqueIssuersCount' | 'verified'>>>;
        dataRequestTemplates: Array<Pick<DataRequestTemplate, 'arweaveUrl' | 'createdAt' | 'dataRequestsCount' | 'description' | 'id' | 'name' | 'revenueGenerated' | 'schema' | 'tags' | 'uniqueVerifiersCount'>>;
        issuedPDAs: Array<Pick<PrivateDataAsset, 'arweaveUrl' | 'claimHash' | 'expirationDate' | 'hash' | 'id' | 'issuanceDate' | 'issuerHash' | 'lastUpdated' | 'ownerHash' | 'status'>>;
        issuedProofs?: Maybe<Array<Pick<Proof, 'arweaveUrl' | 'createdAt' | 'facilitationFee' | 'hash' | 'id' | 'proofHash' | 'status' | 'totalCost' | 'updatedAt'>>>;
        receivedPDAs: Array<Pick<PrivateDataAsset, 'arweaveUrl' | 'claimHash' | 'expirationDate' | 'hash' | 'id' | 'issuanceDate' | 'issuerHash' | 'lastUpdated' | 'ownerHash' | 'status'>>;
        receivedProofs: Array<Pick<Proof, 'arweaveUrl' | 'createdAt' | 'facilitationFee' | 'hash' | 'id' | 'proofHash' | 'status' | 'totalCost' | 'updatedAt'>>;
        recipientDataRequests: Array<Pick<DataRequest, 'arweaveUrl' | 'createdAt' | 'dataUse' | 'id' | 'status'>>;
        verifierDataRequests: Array<Pick<DataRequest, 'arweaveUrl' | 'createdAt' | 'dataUse' | 'id' | 'status'>>;
    })>;
};
export type verifiersByDataRequestTemplate_queryQueryVariables = Exact<{
    id: Scalars['String']['input'];
}>;
export type verifiersByDataRequestTemplate_queryQuery = {
    verifiersByDataRequestTemplate: Array<(Pick<DataRequestTemplateVerifier, 'count'> & {
        verifier?: Maybe<Pick<Organization, 'arweaveUrl' | 'createdAt' | 'description' | 'gatewayId' | 'id' | 'image' | 'name' | 'updatedAt' | 'usernameUpdatedAt' | 'verified' | 'walletId' | 'website'> | Pick<User, 'arweaveUrl' | 'createdAt' | 'credentialsExtraCredits' | 'dataModelsExtraCredits' | 'deletedAt' | 'displayName' | 'email' | 'gatewayId' | 'gatewayIdLastupdate' | 'gatewayIdUpdatedAt' | 'hash' | 'id' | 'isCompleted' | 'profilePicture' | 'roles' | 'status' | 'updatedAt' | 'walletId'>>;
    })>;
};
export type verifiersByDataRequestTemplateCount_queryQueryVariables = Exact<{
    id: Scalars['String']['input'];
}>;
export type verifiersByDataRequestTemplateCount_queryQuery = Pick<Query, 'verifiersByDataRequestTemplateCount'>;
export type addEmail_mutationMutationVariables = Exact<{
    input: AddEmailInput;
}>;
export type addEmail_mutationMutation = {
    addEmail: Pick<CreateEmailNonceOutput, 'code' | 'email'>;
};
export type addEmailConfirmation_mutationMutationVariables = Exact<{
    input: AddEmailConfirmationInput;
}>;
export type addEmailConfirmation_mutationMutation = {
    addEmailConfirmation: {
        user: Pick<User, 'arweaveUrl' | 'createdAt' | 'credentialsExtraCredits' | 'dataModelsExtraCredits' | 'deletedAt' | 'displayName' | 'email' | 'gatewayId' | 'gatewayIdLastupdate' | 'gatewayIdUpdatedAt' | 'hash' | 'id' | 'isCompleted' | 'profilePicture' | 'roles' | 'status' | 'updatedAt' | 'walletId'>;
    };
};
export type addMemberToOrganization_mutationMutationVariables = Exact<{
    input: MemberInput;
}>;
export type addMemberToOrganization_mutationMutation = {
    addMemberToOrganization: (Pick<OrganizationAccess, 'id' | 'role'> & {
        organization: Pick<Organization, 'arweaveUrl' | 'createdAt' | 'description' | 'gatewayId' | 'id' | 'image' | 'name' | 'updatedAt' | 'usernameUpdatedAt' | 'verified' | 'walletId' | 'website'>;
        user: Pick<User, 'arweaveUrl' | 'createdAt' | 'credentialsExtraCredits' | 'dataModelsExtraCredits' | 'deletedAt' | 'displayName' | 'email' | 'gatewayId' | 'gatewayIdLastupdate' | 'gatewayIdUpdatedAt' | 'hash' | 'id' | 'isCompleted' | 'profilePicture' | 'roles' | 'status' | 'updatedAt' | 'walletId'>;
    });
};
export type addWallet_mutationMutationVariables = Exact<{
    input: CreateWalletNonceInput;
}>;
export type addWallet_mutationMutation = {
    addWallet: Pick<CreateWalletNonceOutput, 'message'>;
};
export type addWalletConfirmation_mutationMutationVariables = Exact<{
    input: AddWalletConfirmationInput;
}>;
export type addWalletConfirmation_mutationMutation = {
    addWalletConfirmation: (Pick<User, 'arweaveUrl' | 'createdAt' | 'credentialsExtraCredits' | 'dataModelsExtraCredits' | 'deletedAt' | 'displayName' | 'email' | 'gatewayId' | 'gatewayIdLastupdate' | 'gatewayIdUpdatedAt' | 'hash' | 'id' | 'isCompleted' | 'profilePicture' | 'roles' | 'status' | 'updatedAt' | 'walletId'> & {
        accesses?: Maybe<Array<Pick<OrganizationAccess, 'id' | 'role'>>>;
        authentications?: Maybe<Array<Pick<Auth, 'hash' | 'id' | 'type' | 'userId'>>>;
        dataModels?: Maybe<Array<Pick<DataModel, 'arweaveUrl' | 'consumptionPrice' | 'createdAt' | 'description' | 'featured' | 'id' | 'image' | 'pdasIssuedCount' | 'permissioning' | 'revenueGenerated' | 'schema' | 'tags' | 'title' | 'uniqueIssuersCount' | 'verified'>>>;
        dataRequestTemplates: Array<Pick<DataRequestTemplate, 'arweaveUrl' | 'createdAt' | 'dataRequestsCount' | 'description' | 'id' | 'name' | 'revenueGenerated' | 'schema' | 'tags' | 'uniqueVerifiersCount'>>;
        issuedPDAs: Array<Pick<PrivateDataAsset, 'arweaveUrl' | 'claimHash' | 'expirationDate' | 'hash' | 'id' | 'issuanceDate' | 'issuerHash' | 'lastUpdated' | 'ownerHash' | 'status'>>;
        issuedProofs?: Maybe<Array<Pick<Proof, 'arweaveUrl' | 'createdAt' | 'facilitationFee' | 'hash' | 'id' | 'proofHash' | 'status' | 'totalCost' | 'updatedAt'>>>;
        receivedPDAs: Array<Pick<PrivateDataAsset, 'arweaveUrl' | 'claimHash' | 'expirationDate' | 'hash' | 'id' | 'issuanceDate' | 'issuerHash' | 'lastUpdated' | 'ownerHash' | 'status'>>;
        receivedProofs: Array<Pick<Proof, 'arweaveUrl' | 'createdAt' | 'facilitationFee' | 'hash' | 'id' | 'proofHash' | 'status' | 'totalCost' | 'updatedAt'>>;
        recipientDataRequests: Array<Pick<DataRequest, 'arweaveUrl' | 'createdAt' | 'dataUse' | 'id' | 'status'>>;
        verifierDataRequests: Array<Pick<DataRequest, 'arweaveUrl' | 'createdAt' | 'dataUse' | 'id' | 'status'>>;
    });
};
export type changeMemberRole_mutationMutationVariables = Exact<{
    input: MemberInput;
}>;
export type changeMemberRole_mutationMutation = {
    changeMemberRole: (Pick<OrganizationAccess, 'id' | 'role'> & {
        organization: Pick<Organization, 'arweaveUrl' | 'createdAt' | 'description' | 'gatewayId' | 'id' | 'image' | 'name' | 'updatedAt' | 'usernameUpdatedAt' | 'verified' | 'walletId' | 'website'>;
        user: Pick<User, 'arweaveUrl' | 'createdAt' | 'credentialsExtraCredits' | 'dataModelsExtraCredits' | 'deletedAt' | 'displayName' | 'email' | 'gatewayId' | 'gatewayIdLastupdate' | 'gatewayIdUpdatedAt' | 'hash' | 'id' | 'isCompleted' | 'profilePicture' | 'roles' | 'status' | 'updatedAt' | 'walletId'>;
    });
};
export type changePDAStatus_mutationMutationVariables = Exact<{
    input: UpdatePDAStatusInput;
}>;
export type changePDAStatus_mutationMutation = {
    changePDAStatus: (Pick<PrivateDataAsset, 'arweaveUrl' | 'claimHash' | 'expirationDate' | 'hash' | 'id' | 'issuanceDate' | 'issuerHash' | 'lastUpdated' | 'ownerHash' | 'status'> & {
        dataAsset?: Maybe<Pick<DecryptedPDA, 'claim' | 'description' | 'expirationDate' | 'image' | 'qrCode' | 'title'>>;
    });
};
export type createApplication_mutationMutationVariables = Exact<{
    input: CreateApplicationInput;
}>;
export type createApplication_mutationMutation = {
    createApplication: (Pick<Application, 'apiKey' | 'gatewayFacilitationFee'> & {
        organization: Pick<Organization, 'arweaveUrl' | 'createdAt' | 'description' | 'gatewayId' | 'id' | 'image' | 'name' | 'updatedAt' | 'usernameUpdatedAt' | 'verified' | 'walletId' | 'website'>;
    });
};
export type createDataModel_mutationMutationVariables = Exact<{
    input: CreateDataModelInput;
}>;
export type createDataModel_mutationMutation = {
    createDataModel: (Pick<DataModel, 'arweaveUrl' | 'consumptionPrice' | 'createdAt' | 'description' | 'featured' | 'id' | 'image' | 'pdasIssuedCount' | 'permissioning' | 'revenueGenerated' | 'schema' | 'tags' | 'title' | 'uniqueIssuersCount' | 'verified'> & {
        PDAs: Array<Pick<PrivateDataAsset, 'arweaveUrl' | 'claimHash' | 'expirationDate' | 'hash' | 'id' | 'issuanceDate' | 'issuerHash' | 'lastUpdated' | 'ownerHash' | 'status'>>;
        allowedOrganizations?: Maybe<Array<Pick<Organization, 'arweaveUrl' | 'createdAt' | 'description' | 'gatewayId' | 'id' | 'image' | 'name' | 'updatedAt' | 'usernameUpdatedAt' | 'verified' | 'walletId' | 'website'>>>;
        allowedUsers?: Maybe<Array<Pick<User, 'arweaveUrl' | 'createdAt' | 'credentialsExtraCredits' | 'dataModelsExtraCredits' | 'deletedAt' | 'displayName' | 'email' | 'gatewayId' | 'gatewayIdLastupdate' | 'gatewayIdUpdatedAt' | 'hash' | 'id' | 'isCompleted' | 'profilePicture' | 'roles' | 'status' | 'updatedAt' | 'walletId'>>>;
        createdBy?: Maybe<Pick<User, 'arweaveUrl' | 'createdAt' | 'credentialsExtraCredits' | 'dataModelsExtraCredits' | 'deletedAt' | 'displayName' | 'email' | 'gatewayId' | 'gatewayIdLastupdate' | 'gatewayIdUpdatedAt' | 'hash' | 'id' | 'isCompleted' | 'profilePicture' | 'roles' | 'status' | 'updatedAt' | 'walletId'>>;
        group: Pick<DataModelGroup, 'createdAt' | 'id' | 'official'>;
        organization?: Maybe<Pick<Organization, 'arweaveUrl' | 'createdAt' | 'description' | 'gatewayId' | 'id' | 'image' | 'name' | 'updatedAt' | 'usernameUpdatedAt' | 'verified' | 'walletId' | 'website'>>;
        pdas: Array<Pick<PrivateDataAsset, 'arweaveUrl' | 'claimHash' | 'expirationDate' | 'hash' | 'id' | 'issuanceDate' | 'issuerHash' | 'lastUpdated' | 'ownerHash' | 'status'>>;
    });
};
export type createDataRequest_mutationMutationVariables = Exact<{
    input: DataRequestSchemaInput;
}>;
export type createDataRequest_mutationMutation = {
    createDataRequest: (Pick<DataRequest, 'arweaveUrl' | 'createdAt' | 'dataUse' | 'id' | 'status'> & {
        dataRequestTemplate: Pick<DataRequestTemplate, 'arweaveUrl' | 'createdAt' | 'dataRequestsCount' | 'description' | 'id' | 'name' | 'revenueGenerated' | 'schema' | 'tags' | 'uniqueVerifiersCount'>;
        owner: Pick<User, 'arweaveUrl' | 'createdAt' | 'credentialsExtraCredits' | 'dataModelsExtraCredits' | 'deletedAt' | 'displayName' | 'email' | 'gatewayId' | 'gatewayIdLastupdate' | 'gatewayIdUpdatedAt' | 'hash' | 'id' | 'isCompleted' | 'profilePicture' | 'roles' | 'status' | 'updatedAt' | 'walletId'>;
        proof?: Maybe<Pick<Proof, 'arweaveUrl' | 'createdAt' | 'facilitationFee' | 'hash' | 'id' | 'proofHash' | 'status' | 'totalCost' | 'updatedAt'>>;
        verifier?: Maybe<Pick<User, 'arweaveUrl' | 'createdAt' | 'credentialsExtraCredits' | 'dataModelsExtraCredits' | 'deletedAt' | 'displayName' | 'email' | 'gatewayId' | 'gatewayIdLastupdate' | 'gatewayIdUpdatedAt' | 'hash' | 'id' | 'isCompleted' | 'profilePicture' | 'roles' | 'status' | 'updatedAt' | 'walletId'>>;
        verifierOrganization?: Maybe<Pick<Organization, 'arweaveUrl' | 'createdAt' | 'description' | 'gatewayId' | 'id' | 'image' | 'name' | 'updatedAt' | 'usernameUpdatedAt' | 'verified' | 'walletId' | 'website'>>;
    });
};
export type createDataRequestTemplate_mutationMutationVariables = Exact<{
    input: TemplateSchemaInput;
}>;
export type createDataRequestTemplate_mutationMutation = {
    createDataRequestTemplate: (Pick<DataRequestTemplate, 'arweaveUrl' | 'createdAt' | 'dataRequestsCount' | 'description' | 'id' | 'name' | 'revenueGenerated' | 'schema' | 'tags' | 'uniqueVerifiersCount'> & {
        dataModels: Array<Pick<DataModel, 'arweaveUrl' | 'consumptionPrice' | 'createdAt' | 'description' | 'featured' | 'id' | 'image' | 'pdasIssuedCount' | 'permissioning' | 'revenueGenerated' | 'schema' | 'tags' | 'title' | 'uniqueIssuersCount' | 'verified'>>;
        dataRequests: Array<Pick<DataRequest, 'arweaveUrl' | 'createdAt' | 'dataUse' | 'id' | 'status'>>;
        organization?: Maybe<Pick<Organization, 'arweaveUrl' | 'createdAt' | 'description' | 'gatewayId' | 'id' | 'image' | 'name' | 'updatedAt' | 'usernameUpdatedAt' | 'verified' | 'walletId' | 'website'>>;
        user: Pick<User, 'arweaveUrl' | 'createdAt' | 'credentialsExtraCredits' | 'dataModelsExtraCredits' | 'deletedAt' | 'displayName' | 'email' | 'gatewayId' | 'gatewayIdLastupdate' | 'gatewayIdUpdatedAt' | 'hash' | 'id' | 'isCompleted' | 'profilePicture' | 'roles' | 'status' | 'updatedAt' | 'walletId'>;
    });
};
export type createEmailNonce_mutationMutationVariables = Exact<{
    input: CreateEmailNonceInput;
}>;
export type createEmailNonce_mutationMutation = {
    createEmailNonce: Pick<CreateEmailNonceOutput, 'code' | 'email'>;
};
export type createOrganization_mutationMutationVariables = Exact<{
    input: CreateOrganizationInput;
}>;
export type createOrganization_mutationMutation = {
    createOrganization: (Pick<Organization, 'arweaveUrl' | 'createdAt' | 'description' | 'gatewayId' | 'id' | 'image' | 'name' | 'updatedAt' | 'usernameUpdatedAt' | 'verified' | 'walletId' | 'website'> & {
        accesses?: Maybe<Array<Pick<OrganizationAccess, 'id' | 'role'>>>;
        dataModels?: Maybe<Array<Pick<DataModel, 'arweaveUrl' | 'consumptionPrice' | 'createdAt' | 'description' | 'featured' | 'id' | 'image' | 'pdasIssuedCount' | 'permissioning' | 'revenueGenerated' | 'schema' | 'tags' | 'title' | 'uniqueIssuersCount' | 'verified'>>>;
        dataRequestTemplates: Array<Pick<DataRequestTemplate, 'arweaveUrl' | 'createdAt' | 'dataRequestsCount' | 'description' | 'id' | 'name' | 'revenueGenerated' | 'schema' | 'tags' | 'uniqueVerifiersCount'>>;
        receivedProofs?: Maybe<Array<Pick<Proof, 'arweaveUrl' | 'createdAt' | 'facilitationFee' | 'hash' | 'id' | 'proofHash' | 'status' | 'totalCost' | 'updatedAt'>>>;
        verifierDataRequests: Array<Pick<DataRequest, 'arweaveUrl' | 'createdAt' | 'dataUse' | 'id' | 'status'>>;
    });
};
export type createPDA_mutationMutationVariables = Exact<{
    input: CreatePDAInput;
}>;
export type createPDA_mutationMutation = {
    createPDA: (Pick<PrivateDataAsset, 'arweaveUrl' | 'claimHash' | 'expirationDate' | 'hash' | 'id' | 'issuanceDate' | 'issuerHash' | 'lastUpdated' | 'ownerHash' | 'status'> & {
        dataAsset?: Maybe<Pick<DecryptedPDA, 'claim' | 'description' | 'expirationDate' | 'image' | 'qrCode' | 'title'>>;
    });
};
export type createProof_mutationMutationVariables = Exact<{
    claims?: InputMaybe<Scalars['JSON']['input']>;
    requestId?: InputMaybe<Scalars['String']['input']>;
    signature?: InputMaybe<Scalars['String']['input']>;
    verifier?: InputMaybe<IdentificationInput>;
    wallet?: InputMaybe<Scalars['String']['input']>;
}>;
export type createProof_mutationMutation = {
    createProof: (Pick<Proof, 'arweaveUrl' | 'createdAt' | 'facilitationFee' | 'hash' | 'id' | 'proofHash' | 'status' | 'totalCost' | 'updatedAt'> & {
        data?: Maybe<Pick<DecryptedProof, 'raw'>>;
        dataRequest?: Maybe<Pick<DataRequest, 'arweaveUrl' | 'createdAt' | 'dataUse' | 'id' | 'status'>>;
        owner: Pick<User, 'arweaveUrl' | 'createdAt' | 'credentialsExtraCredits' | 'dataModelsExtraCredits' | 'deletedAt' | 'displayName' | 'email' | 'gatewayId' | 'gatewayIdLastupdate' | 'gatewayIdUpdatedAt' | 'hash' | 'id' | 'isCompleted' | 'profilePicture' | 'roles' | 'status' | 'updatedAt' | 'walletId'>;
        verifier?: Maybe<Pick<User, 'arweaveUrl' | 'createdAt' | 'credentialsExtraCredits' | 'dataModelsExtraCredits' | 'deletedAt' | 'displayName' | 'email' | 'gatewayId' | 'gatewayIdLastupdate' | 'gatewayIdUpdatedAt' | 'hash' | 'id' | 'isCompleted' | 'profilePicture' | 'roles' | 'status' | 'updatedAt' | 'walletId'>>;
        verifierOrganization?: Maybe<Pick<Organization, 'arweaveUrl' | 'createdAt' | 'description' | 'gatewayId' | 'id' | 'image' | 'name' | 'updatedAt' | 'usernameUpdatedAt' | 'verified' | 'walletId' | 'website'>>;
    });
};
export type createProofMessage_mutationMutationVariables = Exact<{
    requestId: Scalars['String']['input'];
}>;
export type createProofMessage_mutationMutation = Pick<Mutation, 'createProofMessage'>;
export type createWalletNonce_mutationMutationVariables = Exact<{
    input: CreateWalletNonceInput;
}>;
export type createWalletNonce_mutationMutation = {
    createWalletNonce: Pick<CreateWalletNonceOutput, 'message'>;
};
export type deleteAccount_mutationMutationVariables = Exact<{
    id: Scalars['String']['input'];
}>;
export type deleteAccount_mutationMutation = Pick<Mutation, 'deleteAccount'>;
export type loginEmail_mutationMutationVariables = Exact<{
    input: LoginEmailInput;
}>;
export type loginEmail_mutationMutation = {
    loginEmail: (Pick<LoginOutput, 'protocol_id' | 'refresh_token' | 'token'> & {
        user: Pick<User, 'arweaveUrl' | 'createdAt' | 'credentialsExtraCredits' | 'dataModelsExtraCredits' | 'deletedAt' | 'displayName' | 'email' | 'gatewayId' | 'gatewayIdLastupdate' | 'gatewayIdUpdatedAt' | 'hash' | 'id' | 'isCompleted' | 'profilePicture' | 'roles' | 'status' | 'updatedAt' | 'walletId'>;
    });
};
export type loginWallet_mutationMutationVariables = Exact<{
    input: LoginWalletInput;
}>;
export type loginWallet_mutationMutation = {
    loginWallet: (Pick<LoginOutput, 'protocol_id' | 'refresh_token' | 'token'> & {
        user: Pick<User, 'arweaveUrl' | 'createdAt' | 'credentialsExtraCredits' | 'dataModelsExtraCredits' | 'deletedAt' | 'displayName' | 'email' | 'gatewayId' | 'gatewayIdLastupdate' | 'gatewayIdUpdatedAt' | 'hash' | 'id' | 'isCompleted' | 'profilePicture' | 'roles' | 'status' | 'updatedAt' | 'walletId'>;
    });
};
export type migrateAuthMethod_mutationMutationVariables = Exact<{
    input: MigrateAuthInput;
}>;
export type migrateAuthMethod_mutationMutation = Pick<Mutation, 'migrateAuthMethod'>;
export type refreshToken_mutationMutationVariables = Exact<{
    input: RefreshTokenInput;
}>;
export type refreshToken_mutationMutation = {
    refreshToken: (Pick<LoginOutput, 'protocol_id' | 'refresh_token' | 'token'> & {
        user: Pick<User, 'arweaveUrl' | 'createdAt' | 'credentialsExtraCredits' | 'dataModelsExtraCredits' | 'deletedAt' | 'displayName' | 'email' | 'gatewayId' | 'gatewayIdLastupdate' | 'gatewayIdUpdatedAt' | 'hash' | 'id' | 'isCompleted' | 'profilePicture' | 'roles' | 'status' | 'updatedAt' | 'walletId'>;
    });
};
export type rejectDataRequest_mutationMutationVariables = Exact<{
    requestId: Scalars['String']['input'];
}>;
export type rejectDataRequest_mutationMutation = {
    rejectDataRequest: (Pick<DataRequest, 'arweaveUrl' | 'createdAt' | 'dataUse' | 'id' | 'status'> & {
        dataRequestTemplate: Pick<DataRequestTemplate, 'arweaveUrl' | 'createdAt' | 'dataRequestsCount' | 'description' | 'id' | 'name' | 'revenueGenerated' | 'schema' | 'tags' | 'uniqueVerifiersCount'>;
        owner: Pick<User, 'arweaveUrl' | 'createdAt' | 'credentialsExtraCredits' | 'dataModelsExtraCredits' | 'deletedAt' | 'displayName' | 'email' | 'gatewayId' | 'gatewayIdLastupdate' | 'gatewayIdUpdatedAt' | 'hash' | 'id' | 'isCompleted' | 'profilePicture' | 'roles' | 'status' | 'updatedAt' | 'walletId'>;
        proof?: Maybe<Pick<Proof, 'arweaveUrl' | 'createdAt' | 'facilitationFee' | 'hash' | 'id' | 'proofHash' | 'status' | 'totalCost' | 'updatedAt'>>;
        verifier?: Maybe<Pick<User, 'arweaveUrl' | 'createdAt' | 'credentialsExtraCredits' | 'dataModelsExtraCredits' | 'deletedAt' | 'displayName' | 'email' | 'gatewayId' | 'gatewayIdLastupdate' | 'gatewayIdUpdatedAt' | 'hash' | 'id' | 'isCompleted' | 'profilePicture' | 'roles' | 'status' | 'updatedAt' | 'walletId'>>;
        verifierOrganization?: Maybe<Pick<Organization, 'arweaveUrl' | 'createdAt' | 'description' | 'gatewayId' | 'id' | 'image' | 'name' | 'updatedAt' | 'usernameUpdatedAt' | 'verified' | 'walletId' | 'website'>>;
    });
};
export type removeApplication_mutationMutationVariables = Exact<{
    id: Scalars['String']['input'];
}>;
export type removeApplication_mutationMutation = {
    removeApplication: (Pick<Application, 'apiKey' | 'gatewayFacilitationFee'> & {
        organization: Pick<Organization, 'arweaveUrl' | 'createdAt' | 'description' | 'gatewayId' | 'id' | 'image' | 'name' | 'updatedAt' | 'usernameUpdatedAt' | 'verified' | 'walletId' | 'website'>;
    });
};
export type removeMemberFromOrganization_mutationMutationVariables = Exact<{
    input: TransferMemberInput;
}>;
export type removeMemberFromOrganization_mutationMutation = Pick<Mutation, 'removeMemberFromOrganization'>;
export type transferOwnership_mutationMutationVariables = Exact<{
    input: TransferMemberInput;
}>;
export type transferOwnership_mutationMutation = {
    transferOwnership: (Pick<OrganizationAccess, 'id' | 'role'> & {
        organization: Pick<Organization, 'arweaveUrl' | 'createdAt' | 'description' | 'gatewayId' | 'id' | 'image' | 'name' | 'updatedAt' | 'usernameUpdatedAt' | 'verified' | 'walletId' | 'website'>;
        user: Pick<User, 'arweaveUrl' | 'createdAt' | 'credentialsExtraCredits' | 'dataModelsExtraCredits' | 'deletedAt' | 'displayName' | 'email' | 'gatewayId' | 'gatewayIdLastupdate' | 'gatewayIdUpdatedAt' | 'hash' | 'id' | 'isCompleted' | 'profilePicture' | 'roles' | 'status' | 'updatedAt' | 'walletId'>;
    });
};
export type unregisterAuthMethod_mutationMutationVariables = Exact<{
    input: AuthInput;
}>;
export type unregisterAuthMethod_mutationMutation = Pick<Mutation, 'unregisterAuthMethod'>;
export type updateMyDisplayName_mutationMutationVariables = Exact<{
    displayName?: InputMaybe<Scalars['String']['input']>;
}>;
export type updateMyDisplayName_mutationMutation = Pick<Mutation, 'updateMyDisplayName'>;
export type updateMyGatewayId_mutationMutationVariables = Exact<{
    gatewayId: Scalars['String']['input'];
}>;
export type updateMyGatewayId_mutationMutation = {
    updateMyGatewayId: (Pick<User, 'arweaveUrl' | 'createdAt' | 'credentialsExtraCredits' | 'dataModelsExtraCredits' | 'deletedAt' | 'displayName' | 'email' | 'gatewayId' | 'gatewayIdLastupdate' | 'gatewayIdUpdatedAt' | 'hash' | 'id' | 'isCompleted' | 'profilePicture' | 'roles' | 'status' | 'updatedAt' | 'walletId'> & {
        accesses?: Maybe<Array<Pick<OrganizationAccess, 'id' | 'role'>>>;
        authentications?: Maybe<Array<Pick<Auth, 'hash' | 'id' | 'type' | 'userId'>>>;
        dataModels?: Maybe<Array<Pick<DataModel, 'arweaveUrl' | 'consumptionPrice' | 'createdAt' | 'description' | 'featured' | 'id' | 'image' | 'pdasIssuedCount' | 'permissioning' | 'revenueGenerated' | 'schema' | 'tags' | 'title' | 'uniqueIssuersCount' | 'verified'>>>;
        dataRequestTemplates: Array<Pick<DataRequestTemplate, 'arweaveUrl' | 'createdAt' | 'dataRequestsCount' | 'description' | 'id' | 'name' | 'revenueGenerated' | 'schema' | 'tags' | 'uniqueVerifiersCount'>>;
        issuedPDAs: Array<Pick<PrivateDataAsset, 'arweaveUrl' | 'claimHash' | 'expirationDate' | 'hash' | 'id' | 'issuanceDate' | 'issuerHash' | 'lastUpdated' | 'ownerHash' | 'status'>>;
        issuedProofs?: Maybe<Array<Pick<Proof, 'arweaveUrl' | 'createdAt' | 'facilitationFee' | 'hash' | 'id' | 'proofHash' | 'status' | 'totalCost' | 'updatedAt'>>>;
        receivedPDAs: Array<Pick<PrivateDataAsset, 'arweaveUrl' | 'claimHash' | 'expirationDate' | 'hash' | 'id' | 'issuanceDate' | 'issuerHash' | 'lastUpdated' | 'ownerHash' | 'status'>>;
        receivedProofs: Array<Pick<Proof, 'arweaveUrl' | 'createdAt' | 'facilitationFee' | 'hash' | 'id' | 'proofHash' | 'status' | 'totalCost' | 'updatedAt'>>;
        recipientDataRequests: Array<Pick<DataRequest, 'arweaveUrl' | 'createdAt' | 'dataUse' | 'id' | 'status'>>;
        verifierDataRequests: Array<Pick<DataRequest, 'arweaveUrl' | 'createdAt' | 'dataUse' | 'id' | 'status'>>;
    });
};
export type updateMyProfilePicture_mutationMutationVariables = Exact<{
    profilePictureUrl?: InputMaybe<Scalars['String']['input']>;
}>;
export type updateMyProfilePicture_mutationMutation = Pick<Mutation, 'updateMyProfilePicture'>;
export type updateNotificationEmail_mutationMutationVariables = Exact<{
    email: Scalars['String']['input'];
}>;
export type updateNotificationEmail_mutationMutation = {
    updateNotificationEmail: {
        user: Pick<User, 'arweaveUrl' | 'createdAt' | 'credentialsExtraCredits' | 'dataModelsExtraCredits' | 'deletedAt' | 'displayName' | 'email' | 'gatewayId' | 'gatewayIdLastupdate' | 'gatewayIdUpdatedAt' | 'hash' | 'id' | 'isCompleted' | 'profilePicture' | 'roles' | 'status' | 'updatedAt' | 'walletId'>;
    };
};
export type updateOrganization_mutationMutationVariables = Exact<{
    input: UpdateOrganizationInput;
}>;
export type updateOrganization_mutationMutation = {
    updateOrganization: (Pick<Organization, 'arweaveUrl' | 'createdAt' | 'description' | 'gatewayId' | 'id' | 'image' | 'name' | 'updatedAt' | 'usernameUpdatedAt' | 'verified' | 'walletId' | 'website'> & {
        accesses?: Maybe<Array<Pick<OrganizationAccess, 'id' | 'role'>>>;
        dataModels?: Maybe<Array<Pick<DataModel, 'arweaveUrl' | 'consumptionPrice' | 'createdAt' | 'description' | 'featured' | 'id' | 'image' | 'pdasIssuedCount' | 'permissioning' | 'revenueGenerated' | 'schema' | 'tags' | 'title' | 'uniqueIssuersCount' | 'verified'>>>;
        dataRequestTemplates: Array<Pick<DataRequestTemplate, 'arweaveUrl' | 'createdAt' | 'dataRequestsCount' | 'description' | 'id' | 'name' | 'revenueGenerated' | 'schema' | 'tags' | 'uniqueVerifiersCount'>>;
        receivedProofs?: Maybe<Array<Pick<Proof, 'arweaveUrl' | 'createdAt' | 'facilitationFee' | 'hash' | 'id' | 'proofHash' | 'status' | 'totalCost' | 'updatedAt'>>>;
        verifierDataRequests: Array<Pick<DataRequest, 'arweaveUrl' | 'createdAt' | 'dataUse' | 'id' | 'status'>>;
    });
};
export type updatePDA_mutationMutationVariables = Exact<{
    input: UpdatePDAInput;
}>;
export type updatePDA_mutationMutation = {
    updatePDA: (Pick<PrivateDataAsset, 'arweaveUrl' | 'claimHash' | 'expirationDate' | 'hash' | 'id' | 'issuanceDate' | 'issuerHash' | 'lastUpdated' | 'ownerHash' | 'status'> & {
        dataAsset?: Maybe<Pick<DecryptedPDA, 'claim' | 'description' | 'expirationDate' | 'image' | 'qrCode' | 'title'>>;
    });
};
export type updateUser_mutationMutationVariables = Exact<{
    input: UpdateUserInput;
}>;
export type updateUser_mutationMutation = {
    updateUser: (Pick<User, 'arweaveUrl' | 'createdAt' | 'credentialsExtraCredits' | 'dataModelsExtraCredits' | 'deletedAt' | 'displayName' | 'email' | 'gatewayId' | 'gatewayIdLastupdate' | 'gatewayIdUpdatedAt' | 'hash' | 'id' | 'isCompleted' | 'profilePicture' | 'roles' | 'status' | 'updatedAt' | 'walletId'> & {
        accesses?: Maybe<Array<Pick<OrganizationAccess, 'id' | 'role'>>>;
        authentications?: Maybe<Array<Pick<Auth, 'hash' | 'id' | 'type' | 'userId'>>>;
        dataModels?: Maybe<Array<Pick<DataModel, 'arweaveUrl' | 'consumptionPrice' | 'createdAt' | 'description' | 'featured' | 'id' | 'image' | 'pdasIssuedCount' | 'permissioning' | 'revenueGenerated' | 'schema' | 'tags' | 'title' | 'uniqueIssuersCount' | 'verified'>>>;
        dataRequestTemplates: Array<Pick<DataRequestTemplate, 'arweaveUrl' | 'createdAt' | 'dataRequestsCount' | 'description' | 'id' | 'name' | 'revenueGenerated' | 'schema' | 'tags' | 'uniqueVerifiersCount'>>;
        issuedPDAs: Array<Pick<PrivateDataAsset, 'arweaveUrl' | 'claimHash' | 'expirationDate' | 'hash' | 'id' | 'issuanceDate' | 'issuerHash' | 'lastUpdated' | 'ownerHash' | 'status'>>;
        issuedProofs?: Maybe<Array<Pick<Proof, 'arweaveUrl' | 'createdAt' | 'facilitationFee' | 'hash' | 'id' | 'proofHash' | 'status' | 'totalCost' | 'updatedAt'>>>;
        receivedPDAs: Array<Pick<PrivateDataAsset, 'arweaveUrl' | 'claimHash' | 'expirationDate' | 'hash' | 'id' | 'issuanceDate' | 'issuerHash' | 'lastUpdated' | 'ownerHash' | 'status'>>;
        receivedProofs: Array<Pick<Proof, 'arweaveUrl' | 'createdAt' | 'facilitationFee' | 'hash' | 'id' | 'proofHash' | 'status' | 'totalCost' | 'updatedAt'>>;
        recipientDataRequests: Array<Pick<DataRequest, 'arweaveUrl' | 'createdAt' | 'dataUse' | 'id' | 'status'>>;
        verifierDataRequests: Array<Pick<DataRequest, 'arweaveUrl' | 'createdAt' | 'dataUse' | 'id' | 'status'>>;
    });
};
export declare const PDA_queryDocument: DocumentNode<PDA_queryQuery, Exact<{
    id: Scalars['String']['input'];
}>>;
export declare const PDACount_queryDocument: DocumentNode<PDACount_queryQuery, Exact<{
    filter?: InputMaybe<FilterPDAInput> | undefined;
}>>;
export declare const PDAs_queryDocument: DocumentNode<PDAs_queryQuery, Exact<{
    filter?: InputMaybe<FilterPDAInput> | undefined;
    order?: InputMaybe<Scalars['JSON']['input']>;
    skip?: InputMaybe<number> | undefined;
    take?: InputMaybe<number> | undefined;
}>>;
export declare const applications_queryDocument: DocumentNode<applications_queryQuery, Exact<{
    [key: string]: never;
}>>;
export declare const calculateProofCost_queryDocument: DocumentNode<calculateProofCost_queryQuery, Exact<{
    requestId: Scalars['String']['input'];
}>>;
export declare const checkUsernameAvailability_queryDocument: DocumentNode<checkUsernameAvailability_queryQuery, Exact<{
    username: Scalars['String']['input'];
}>>;
export declare const createDepositLink_queryDocument: DocumentNode<createDepositLink_queryQuery, Exact<{
    [key: string]: never;
}>>;
export declare const dataModel_queryDocument: DocumentNode<dataModel_queryQuery, Exact<{
    id: Scalars['String']['input'];
}>>;
export declare const dataModels_queryDocument: DocumentNode<dataModels_queryQuery, Exact<{
    filter?: InputMaybe<FilterDataModelInput> | undefined;
    order?: InputMaybe<Scalars['JSON']['input']>;
    skip?: InputMaybe<number> | undefined;
    take?: InputMaybe<number> | undefined;
}>>;
export declare const dataModelsCount_queryDocument: DocumentNode<dataModelsCount_queryQuery, Exact<{
    filter?: InputMaybe<FilterDataModelInput> | undefined;
}>>;
export declare const dataModelsMetadata_queryDocument: DocumentNode<dataModelsMetadata_queryQuery, Exact<{
    [key: string]: never;
}>>;
export declare const dataRequest_queryDocument: DocumentNode<dataRequest_queryQuery, Exact<{
    requestId: Scalars['String']['input'];
}>>;
export declare const dataRequestCount_queryDocument: DocumentNode<dataRequestCount_queryQuery, Exact<{
    filter?: InputMaybe<FilterDataRequestInput> | undefined;
}>>;
export declare const dataRequestStatus_queryDocument: DocumentNode<dataRequestStatus_queryQuery, Exact<{
    requestId: Scalars['String']['input'];
}>>;
export declare const dataRequestTemplate_queryDocument: DocumentNode<dataRequestTemplate_queryQuery, Exact<{
    id: Scalars['String']['input'];
}>>;
export declare const dataRequestTemplates_queryDocument: DocumentNode<dataRequestTemplates_queryQuery, Exact<{
    filter?: InputMaybe<FilterDataRequestTemplateInput> | undefined;
    order?: InputMaybe<Scalars['JSON']['input']>;
    skip?: InputMaybe<number> | undefined;
    take?: InputMaybe<number> | undefined;
}>>;
export declare const dataRequestTemplatesCount_queryDocument: DocumentNode<dataRequestTemplatesCount_queryQuery, Exact<{
    filter?: InputMaybe<FilterDataRequestTemplateInput> | undefined;
}>>;
export declare const dataRequestTemplatesMetadata_queryDocument: DocumentNode<dataRequestTemplatesMetadata_queryQuery, Exact<{
    [key: string]: never;
}>>;
export declare const dataRequests_queryDocument: DocumentNode<dataRequests_queryQuery, Exact<{
    filter?: InputMaybe<FilterDataRequestInput> | undefined;
}>>;
export declare const financialTransactions_queryDocument: DocumentNode<financialTransactions_queryQuery, Exact<{
    identifier: TransactionIdentifierInput;
    skip?: InputMaybe<number> | undefined;
    take?: InputMaybe<number> | undefined;
}>>;
export declare const findValidPDAsForRequest_queryDocument: DocumentNode<findValidPDAsForRequest_queryQuery, Exact<{
    requestId: Scalars['String']['input'];
}>>;
export declare const generatedFees_queryDocument: DocumentNode<generatedFees_queryQuery, Exact<{
    [key: string]: never;
}>>;
export declare const getExplorerStats_queryDocument: DocumentNode<getExplorerStats_queryQuery, Exact<{
    [key: string]: never;
}>>;
export declare const getMonthlyUserUsage_queryDocument: DocumentNode<getMonthlyUserUsage_queryQuery, Exact<{
    [key: string]: never;
}>>;
export declare const getTotalofIssuersByDataModel_queryDocument: DocumentNode<getTotalofIssuersByDataModel_queryQuery, Exact<{
    dataModelId: Scalars['String']['input'];
}>>;
export declare const getTransactionsExplorerStats_queryDocument: DocumentNode<getTransactionsExplorerStats_queryQuery, Exact<{
    [key: string]: never;
}>>;
export declare const issuedPDAs_queryDocument: DocumentNode<issuedPDAs_queryQuery, Exact<{
    filter?: InputMaybe<FilterPDAInput> | undefined;
    order?: InputMaybe<Scalars['JSON']['input']>;
    skip?: InputMaybe<number> | undefined;
    take?: InputMaybe<number> | undefined;
}>>;
export declare const issuedPDAsCount_queryDocument: DocumentNode<issuedPDAsCount_queryQuery, Exact<{
    filter?: InputMaybe<FilterPDAInput> | undefined;
}>>;
export declare const issuersByDataModel_queryDocument: DocumentNode<issuersByDataModel_queryQuery, Exact<{
    id: Scalars['String']['input'];
}>>;
export declare const issuersByDataModelCount_queryDocument: DocumentNode<issuersByDataModelCount_queryQuery, Exact<{
    id: Scalars['String']['input'];
}>>;
export declare const me_queryDocument: DocumentNode<me_queryQuery, Exact<{
    [key: string]: never;
}>>;
export declare const myDataModelsCount_queryDocument: DocumentNode<myDataModelsCount_queryQuery, Exact<{
    filter?: InputMaybe<FilterDataModelInput> | undefined;
}>>;
export declare const myDataRequestTemplatesCount_queryDocument: DocumentNode<myDataRequestTemplatesCount_queryQuery, Exact<{
    filter?: InputMaybe<FilterDataRequestTemplateInput> | undefined;
}>>;
export declare const myFinancialTransactions_queryDocument: DocumentNode<myFinancialTransactions_queryQuery, Exact<{
    organizationId?: InputMaybe<string> | undefined;
    skip?: InputMaybe<number> | undefined;
    take?: InputMaybe<number> | undefined;
}>>;
export declare const myFinancialTransactionsCount_queryDocument: DocumentNode<myFinancialTransactionsCount_queryQuery, Exact<{
    organizationId?: InputMaybe<string> | undefined;
}>>;
export declare const myPDACount_queryDocument: DocumentNode<myPDACount_queryQuery, Exact<{
    filter?: InputMaybe<FilterPDAInput> | undefined;
}>>;
export declare const myPDAs_queryDocument: DocumentNode<myPDAs_queryQuery, Exact<{
    filter?: InputMaybe<FilterPDAInput> | undefined;
    order?: InputMaybe<Scalars['JSON']['input']>;
    skip?: InputMaybe<number> | undefined;
    take?: InputMaybe<number> | undefined;
}>>;
export declare const myTransactions_queryDocument: DocumentNode<myTransactions_queryQuery, Exact<{
    filter?: InputMaybe<FilterTransactionsInput> | undefined;
}>>;
export declare const myWallet_queryDocument: DocumentNode<myWallet_queryQuery, Exact<{
    organizationId?: InputMaybe<string> | undefined;
}>>;
export declare const organization_queryDocument: DocumentNode<organization_queryQuery, Exact<{
    input: OrganizationIdentificationInput;
}>>;
export declare const organizations_queryDocument: DocumentNode<organizations_queryQuery, Exact<{
    filter?: InputMaybe<FilterOrganizationInput> | undefined;
    skip?: InputMaybe<number> | undefined;
    take?: InputMaybe<number> | undefined;
}>>;
export declare const proof_queryDocument: DocumentNode<proof_queryQuery, Exact<{
    id: Scalars['String']['input'];
}>>;
export declare const proofs_queryDocument: DocumentNode<proofs_queryQuery, Exact<{
    filter?: InputMaybe<FilterProofInput> | undefined;
    order?: InputMaybe<Scalars['JSON']['input']>;
    skip?: InputMaybe<number> | undefined;
    take?: InputMaybe<number> | undefined;
}>>;
export declare const proofsByPDAIds_queryDocument: DocumentNode<proofsByPDAIds_queryQuery, Exact<{
    pdaIds: Array<Scalars['String']['input']> | Scalars['String']['input'];
    skip?: InputMaybe<number> | undefined;
    take?: InputMaybe<number> | undefined;
}>>;
export declare const receivedProofs_queryDocument: DocumentNode<receivedProofs_queryQuery, Exact<{
    order?: InputMaybe<Scalars['JSON']['input']>;
    organizationId?: InputMaybe<string> | undefined;
    skip?: InputMaybe<number> | undefined;
    take?: InputMaybe<number> | undefined;
}>>;
export declare const receivedProofsCount_queryDocument: DocumentNode<receivedProofsCount_queryQuery, Exact<{
    organizationId?: InputMaybe<string> | undefined;
}>>;
export declare const requestsReceived_queryDocument: DocumentNode<requestsReceived_queryQuery, Exact<{
    filter?: InputMaybe<FilterDataRequestInput> | undefined;
    order?: InputMaybe<Scalars['JSON']['input']>;
    skip?: InputMaybe<number> | undefined;
    take?: InputMaybe<number> | undefined;
}>>;
export declare const requestsReceivedCount_queryDocument: DocumentNode<requestsReceivedCount_queryQuery, Exact<{
    filter?: InputMaybe<FilterDataRequestInput> | undefined;
}>>;
export declare const requestsSent_queryDocument: DocumentNode<requestsSent_queryQuery, Exact<{
    filter?: InputMaybe<FilterDataRequestInput> | undefined;
    order?: InputMaybe<Scalars['JSON']['input']>;
    skip?: InputMaybe<number> | undefined;
    take?: InputMaybe<number> | undefined;
}>>;
export declare const requestsSentCount_queryDocument: DocumentNode<requestsSentCount_queryQuery, Exact<{
    filter?: InputMaybe<FilterDataRequestInput> | undefined;
}>>;
export declare const sentProofs_queryDocument: DocumentNode<sentProofs_queryQuery, Exact<{
    order?: InputMaybe<Scalars['JSON']['input']>;
    skip?: InputMaybe<number> | undefined;
    take?: InputMaybe<number> | undefined;
}>>;
export declare const sentProofsCount_queryDocument: DocumentNode<sentProofsCount_queryQuery, Exact<{
    [key: string]: never;
}>>;
export declare const templateByDataRequest_queryDocument: DocumentNode<templateByDataRequest_queryQuery, Exact<{
    requestID: Scalars['String']['input'];
}>>;
export declare const transaction_queryDocument: DocumentNode<transaction_queryQuery, Exact<{
    id: Scalars['String']['input'];
}>>;
export declare const transactions_queryDocument: DocumentNode<transactions_queryQuery, Exact<{
    filter?: InputMaybe<FilterTransactionsInput> | undefined;
}>>;
export declare const transactionsCount_queryDocument: DocumentNode<transactionsCount_queryQuery, Exact<{
    showMoneyTxs?: InputMaybe<boolean> | undefined;
}>>;
export declare const user_queryDocument: DocumentNode<user_queryQuery, Exact<{
    input: UserIdentificationInput;
}>>;
export declare const verifiersByDataRequestTemplate_queryDocument: DocumentNode<verifiersByDataRequestTemplate_queryQuery, Exact<{
    id: Scalars['String']['input'];
}>>;
export declare const verifiersByDataRequestTemplateCount_queryDocument: DocumentNode<verifiersByDataRequestTemplateCount_queryQuery, Exact<{
    id: Scalars['String']['input'];
}>>;
export declare const addEmail_mutationDocument: DocumentNode<addEmail_mutationMutation, Exact<{
    input: AddEmailInput;
}>>;
export declare const addEmailConfirmation_mutationDocument: DocumentNode<addEmailConfirmation_mutationMutation, Exact<{
    input: AddEmailConfirmationInput;
}>>;
export declare const addMemberToOrganization_mutationDocument: DocumentNode<addMemberToOrganization_mutationMutation, Exact<{
    input: MemberInput;
}>>;
export declare const addWallet_mutationDocument: DocumentNode<addWallet_mutationMutation, Exact<{
    input: CreateWalletNonceInput;
}>>;
export declare const addWalletConfirmation_mutationDocument: DocumentNode<addWalletConfirmation_mutationMutation, Exact<{
    input: AddWalletConfirmationInput;
}>>;
export declare const changeMemberRole_mutationDocument: DocumentNode<changeMemberRole_mutationMutation, Exact<{
    input: MemberInput;
}>>;
export declare const changePDAStatus_mutationDocument: DocumentNode<changePDAStatus_mutationMutation, Exact<{
    input: UpdatePDAStatusInput;
}>>;
export declare const createApplication_mutationDocument: DocumentNode<createApplication_mutationMutation, Exact<{
    input: CreateApplicationInput;
}>>;
export declare const createDataModel_mutationDocument: DocumentNode<createDataModel_mutationMutation, Exact<{
    input: CreateDataModelInput;
}>>;
export declare const createDataRequest_mutationDocument: DocumentNode<createDataRequest_mutationMutation, Exact<{
    input: DataRequestSchemaInput;
}>>;
export declare const createDataRequestTemplate_mutationDocument: DocumentNode<createDataRequestTemplate_mutationMutation, Exact<{
    input: TemplateSchemaInput;
}>>;
export declare const createEmailNonce_mutationDocument: DocumentNode<createEmailNonce_mutationMutation, Exact<{
    input: CreateEmailNonceInput;
}>>;
export declare const createOrganization_mutationDocument: DocumentNode<createOrganization_mutationMutation, Exact<{
    input: CreateOrganizationInput;
}>>;
export declare const createPDA_mutationDocument: DocumentNode<createPDA_mutationMutation, Exact<{
    input: CreatePDAInput;
}>>;
export declare const createProof_mutationDocument: DocumentNode<createProof_mutationMutation, Exact<{
    claims?: InputMaybe<Scalars['JSON']['input']>;
    requestId?: InputMaybe<string> | undefined;
    signature?: InputMaybe<string> | undefined;
    verifier?: InputMaybe<IdentificationInput> | undefined;
    wallet?: InputMaybe<string> | undefined;
}>>;
export declare const createProofMessage_mutationDocument: DocumentNode<createProofMessage_mutationMutation, Exact<{
    requestId: Scalars['String']['input'];
}>>;
export declare const createWalletNonce_mutationDocument: DocumentNode<createWalletNonce_mutationMutation, Exact<{
    input: CreateWalletNonceInput;
}>>;
export declare const deleteAccount_mutationDocument: DocumentNode<deleteAccount_mutationMutation, Exact<{
    id: Scalars['String']['input'];
}>>;
export declare const loginEmail_mutationDocument: DocumentNode<loginEmail_mutationMutation, Exact<{
    input: LoginEmailInput;
}>>;
export declare const loginWallet_mutationDocument: DocumentNode<loginWallet_mutationMutation, Exact<{
    input: LoginWalletInput;
}>>;
export declare const migrateAuthMethod_mutationDocument: DocumentNode<migrateAuthMethod_mutationMutation, Exact<{
    input: MigrateAuthInput;
}>>;
export declare const refreshToken_mutationDocument: DocumentNode<refreshToken_mutationMutation, Exact<{
    input: RefreshTokenInput;
}>>;
export declare const rejectDataRequest_mutationDocument: DocumentNode<rejectDataRequest_mutationMutation, Exact<{
    requestId: Scalars['String']['input'];
}>>;
export declare const removeApplication_mutationDocument: DocumentNode<removeApplication_mutationMutation, Exact<{
    id: Scalars['String']['input'];
}>>;
export declare const removeMemberFromOrganization_mutationDocument: DocumentNode<removeMemberFromOrganization_mutationMutation, Exact<{
    input: TransferMemberInput;
}>>;
export declare const transferOwnership_mutationDocument: DocumentNode<transferOwnership_mutationMutation, Exact<{
    input: TransferMemberInput;
}>>;
export declare const unregisterAuthMethod_mutationDocument: DocumentNode<unregisterAuthMethod_mutationMutation, Exact<{
    input: AuthInput;
}>>;
export declare const updateMyDisplayName_mutationDocument: DocumentNode<updateMyDisplayName_mutationMutation, Exact<{
    displayName?: InputMaybe<string> | undefined;
}>>;
export declare const updateMyGatewayId_mutationDocument: DocumentNode<updateMyGatewayId_mutationMutation, Exact<{
    gatewayId: Scalars['String']['input'];
}>>;
export declare const updateMyProfilePicture_mutationDocument: DocumentNode<updateMyProfilePicture_mutationMutation, Exact<{
    profilePictureUrl?: InputMaybe<string> | undefined;
}>>;
export declare const updateNotificationEmail_mutationDocument: DocumentNode<updateNotificationEmail_mutationMutation, Exact<{
    email: Scalars['String']['input'];
}>>;
export declare const updateOrganization_mutationDocument: DocumentNode<updateOrganization_mutationMutation, Exact<{
    input: UpdateOrganizationInput;
}>>;
export declare const updatePDA_mutationDocument: DocumentNode<updatePDA_mutationMutation, Exact<{
    input: UpdatePDAInput;
}>>;
export declare const updateUser_mutationDocument: DocumentNode<updateUser_mutationMutation, Exact<{
    input: UpdateUserInput;
}>>;
export type Requester<C = {}, E = unknown> = <R, V>(doc: DocumentNode, vars?: V, options?: C) => Promise<R> | AsyncIterable<R>;
export declare function getSdk<C, E>(requester: Requester<C, E>): {
    PDA_query(variables: PDA_queryQueryVariables, options?: C): Promise<PDA_queryQuery>;
    PDACount_query(variables?: PDACount_queryQueryVariables, options?: C): Promise<PDACount_queryQuery>;
    PDAs_query(variables?: PDAs_queryQueryVariables, options?: C): Promise<PDAs_queryQuery>;
    applications_query(variables?: applications_queryQueryVariables, options?: C): Promise<applications_queryQuery>;
    calculateProofCost_query(variables: calculateProofCost_queryQueryVariables, options?: C): Promise<calculateProofCost_queryQuery>;
    checkUsernameAvailability_query(variables: checkUsernameAvailability_queryQueryVariables, options?: C): Promise<checkUsernameAvailability_queryQuery>;
    createDepositLink_query(variables?: createDepositLink_queryQueryVariables, options?: C): Promise<createDepositLink_queryQuery>;
    dataModel_query(variables: dataModel_queryQueryVariables, options?: C): Promise<dataModel_queryQuery>;
    dataModels_query(variables?: dataModels_queryQueryVariables, options?: C): Promise<dataModels_queryQuery>;
    dataModelsCount_query(variables?: dataModelsCount_queryQueryVariables, options?: C): Promise<dataModelsCount_queryQuery>;
    dataModelsMetadata_query(variables?: dataModelsMetadata_queryQueryVariables, options?: C): Promise<dataModelsMetadata_queryQuery>;
    dataRequest_query(variables: dataRequest_queryQueryVariables, options?: C): Promise<dataRequest_queryQuery>;
    dataRequestCount_query(variables?: dataRequestCount_queryQueryVariables, options?: C): Promise<dataRequestCount_queryQuery>;
    dataRequestStatus_query(variables: dataRequestStatus_queryQueryVariables, options?: C): Promise<dataRequestStatus_queryQuery>;
    dataRequestTemplate_query(variables: dataRequestTemplate_queryQueryVariables, options?: C): Promise<dataRequestTemplate_queryQuery>;
    dataRequestTemplates_query(variables?: dataRequestTemplates_queryQueryVariables, options?: C): Promise<dataRequestTemplates_queryQuery>;
    dataRequestTemplatesCount_query(variables?: dataRequestTemplatesCount_queryQueryVariables, options?: C): Promise<dataRequestTemplatesCount_queryQuery>;
    dataRequestTemplatesMetadata_query(variables?: dataRequestTemplatesMetadata_queryQueryVariables, options?: C): Promise<dataRequestTemplatesMetadata_queryQuery>;
    dataRequests_query(variables?: dataRequests_queryQueryVariables, options?: C): Promise<dataRequests_queryQuery>;
    financialTransactions_query(variables: financialTransactions_queryQueryVariables, options?: C): Promise<financialTransactions_queryQuery>;
    findValidPDAsForRequest_query(variables: findValidPDAsForRequest_queryQueryVariables, options?: C): Promise<findValidPDAsForRequest_queryQuery>;
    generatedFees_query(variables?: generatedFees_queryQueryVariables, options?: C): Promise<generatedFees_queryQuery>;
    getExplorerStats_query(variables?: getExplorerStats_queryQueryVariables, options?: C): Promise<getExplorerStats_queryQuery>;
    getMonthlyUserUsage_query(variables?: getMonthlyUserUsage_queryQueryVariables, options?: C): Promise<getMonthlyUserUsage_queryQuery>;
    getTotalofIssuersByDataModel_query(variables: getTotalofIssuersByDataModel_queryQueryVariables, options?: C): Promise<getTotalofIssuersByDataModel_queryQuery>;
    getTransactionsExplorerStats_query(variables?: getTransactionsExplorerStats_queryQueryVariables, options?: C): Promise<getTransactionsExplorerStats_queryQuery>;
    issuedPDAs_query(variables?: issuedPDAs_queryQueryVariables, options?: C): Promise<issuedPDAs_queryQuery>;
    issuedPDAsCount_query(variables?: issuedPDAsCount_queryQueryVariables, options?: C): Promise<issuedPDAsCount_queryQuery>;
    issuersByDataModel_query(variables: issuersByDataModel_queryQueryVariables, options?: C): Promise<issuersByDataModel_queryQuery>;
    issuersByDataModelCount_query(variables: issuersByDataModelCount_queryQueryVariables, options?: C): Promise<issuersByDataModelCount_queryQuery>;
    me_query(variables?: me_queryQueryVariables, options?: C): Promise<me_queryQuery>;
    myDataModelsCount_query(variables?: myDataModelsCount_queryQueryVariables, options?: C): Promise<myDataModelsCount_queryQuery>;
    myDataRequestTemplatesCount_query(variables?: myDataRequestTemplatesCount_queryQueryVariables, options?: C): Promise<myDataRequestTemplatesCount_queryQuery>;
    myFinancialTransactions_query(variables?: myFinancialTransactions_queryQueryVariables, options?: C): Promise<myFinancialTransactions_queryQuery>;
    myFinancialTransactionsCount_query(variables?: myFinancialTransactionsCount_queryQueryVariables, options?: C): Promise<myFinancialTransactionsCount_queryQuery>;
    myPDACount_query(variables?: myPDACount_queryQueryVariables, options?: C): Promise<myPDACount_queryQuery>;
    myPDAs_query(variables?: myPDAs_queryQueryVariables, options?: C): Promise<myPDAs_queryQuery>;
    myTransactions_query(variables?: myTransactions_queryQueryVariables, options?: C): Promise<myTransactions_queryQuery>;
    myWallet_query(variables?: myWallet_queryQueryVariables, options?: C): Promise<myWallet_queryQuery>;
    organization_query(variables: organization_queryQueryVariables, options?: C): Promise<organization_queryQuery>;
    organizations_query(variables?: organizations_queryQueryVariables, options?: C): Promise<organizations_queryQuery>;
    proof_query(variables: proof_queryQueryVariables, options?: C): Promise<proof_queryQuery>;
    proofs_query(variables?: proofs_queryQueryVariables, options?: C): Promise<proofs_queryQuery>;
    proofsByPDAIds_query(variables: proofsByPDAIds_queryQueryVariables, options?: C): Promise<proofsByPDAIds_queryQuery>;
    receivedProofs_query(variables?: receivedProofs_queryQueryVariables, options?: C): Promise<receivedProofs_queryQuery>;
    receivedProofsCount_query(variables?: receivedProofsCount_queryQueryVariables, options?: C): Promise<receivedProofsCount_queryQuery>;
    requestsReceived_query(variables?: requestsReceived_queryQueryVariables, options?: C): Promise<requestsReceived_queryQuery>;
    requestsReceivedCount_query(variables?: requestsReceivedCount_queryQueryVariables, options?: C): Promise<requestsReceivedCount_queryQuery>;
    requestsSent_query(variables?: requestsSent_queryQueryVariables, options?: C): Promise<requestsSent_queryQuery>;
    requestsSentCount_query(variables?: requestsSentCount_queryQueryVariables, options?: C): Promise<requestsSentCount_queryQuery>;
    sentProofs_query(variables?: sentProofs_queryQueryVariables, options?: C): Promise<sentProofs_queryQuery>;
    sentProofsCount_query(variables?: sentProofsCount_queryQueryVariables, options?: C): Promise<sentProofsCount_queryQuery>;
    templateByDataRequest_query(variables: templateByDataRequest_queryQueryVariables, options?: C): Promise<templateByDataRequest_queryQuery>;
    transaction_query(variables: transaction_queryQueryVariables, options?: C): Promise<transaction_queryQuery>;
    transactions_query(variables?: transactions_queryQueryVariables, options?: C): Promise<transactions_queryQuery>;
    transactionsCount_query(variables?: transactionsCount_queryQueryVariables, options?: C): Promise<transactionsCount_queryQuery>;
    user_query(variables: user_queryQueryVariables, options?: C): Promise<user_queryQuery>;
    verifiersByDataRequestTemplate_query(variables: verifiersByDataRequestTemplate_queryQueryVariables, options?: C): Promise<verifiersByDataRequestTemplate_queryQuery>;
    verifiersByDataRequestTemplateCount_query(variables: verifiersByDataRequestTemplateCount_queryQueryVariables, options?: C): Promise<verifiersByDataRequestTemplateCount_queryQuery>;
    addEmail_mutation(variables: addEmail_mutationMutationVariables, options?: C): Promise<addEmail_mutationMutation>;
    addEmailConfirmation_mutation(variables: addEmailConfirmation_mutationMutationVariables, options?: C): Promise<addEmailConfirmation_mutationMutation>;
    addMemberToOrganization_mutation(variables: addMemberToOrganization_mutationMutationVariables, options?: C): Promise<addMemberToOrganization_mutationMutation>;
    addWallet_mutation(variables: addWallet_mutationMutationVariables, options?: C): Promise<addWallet_mutationMutation>;
    addWalletConfirmation_mutation(variables: addWalletConfirmation_mutationMutationVariables, options?: C): Promise<addWalletConfirmation_mutationMutation>;
    changeMemberRole_mutation(variables: changeMemberRole_mutationMutationVariables, options?: C): Promise<changeMemberRole_mutationMutation>;
    changePDAStatus_mutation(variables: changePDAStatus_mutationMutationVariables, options?: C): Promise<changePDAStatus_mutationMutation>;
    createApplication_mutation(variables: createApplication_mutationMutationVariables, options?: C): Promise<createApplication_mutationMutation>;
    createDataModel_mutation(variables: createDataModel_mutationMutationVariables, options?: C): Promise<createDataModel_mutationMutation>;
    createDataRequest_mutation(variables: createDataRequest_mutationMutationVariables, options?: C): Promise<createDataRequest_mutationMutation>;
    createDataRequestTemplate_mutation(variables: createDataRequestTemplate_mutationMutationVariables, options?: C): Promise<createDataRequestTemplate_mutationMutation>;
    createEmailNonce_mutation(variables: createEmailNonce_mutationMutationVariables, options?: C): Promise<createEmailNonce_mutationMutation>;
    createOrganization_mutation(variables: createOrganization_mutationMutationVariables, options?: C): Promise<createOrganization_mutationMutation>;
    createPDA_mutation(variables: createPDA_mutationMutationVariables, options?: C): Promise<createPDA_mutationMutation>;
    createProof_mutation(variables?: createProof_mutationMutationVariables, options?: C): Promise<createProof_mutationMutation>;
    createProofMessage_mutation(variables: createProofMessage_mutationMutationVariables, options?: C): Promise<createProofMessage_mutationMutation>;
    createWalletNonce_mutation(variables: createWalletNonce_mutationMutationVariables, options?: C): Promise<createWalletNonce_mutationMutation>;
    deleteAccount_mutation(variables: deleteAccount_mutationMutationVariables, options?: C): Promise<deleteAccount_mutationMutation>;
    loginEmail_mutation(variables: loginEmail_mutationMutationVariables, options?: C): Promise<loginEmail_mutationMutation>;
    loginWallet_mutation(variables: loginWallet_mutationMutationVariables, options?: C): Promise<loginWallet_mutationMutation>;
    migrateAuthMethod_mutation(variables: migrateAuthMethod_mutationMutationVariables, options?: C): Promise<migrateAuthMethod_mutationMutation>;
    refreshToken_mutation(variables: refreshToken_mutationMutationVariables, options?: C): Promise<refreshToken_mutationMutation>;
    rejectDataRequest_mutation(variables: rejectDataRequest_mutationMutationVariables, options?: C): Promise<rejectDataRequest_mutationMutation>;
    removeApplication_mutation(variables: removeApplication_mutationMutationVariables, options?: C): Promise<removeApplication_mutationMutation>;
    removeMemberFromOrganization_mutation(variables: removeMemberFromOrganization_mutationMutationVariables, options?: C): Promise<removeMemberFromOrganization_mutationMutation>;
    transferOwnership_mutation(variables: transferOwnership_mutationMutationVariables, options?: C): Promise<transferOwnership_mutationMutation>;
    unregisterAuthMethod_mutation(variables: unregisterAuthMethod_mutationMutationVariables, options?: C): Promise<unregisterAuthMethod_mutationMutation>;
    updateMyDisplayName_mutation(variables?: updateMyDisplayName_mutationMutationVariables, options?: C): Promise<updateMyDisplayName_mutationMutation>;
    updateMyGatewayId_mutation(variables: updateMyGatewayId_mutationMutationVariables, options?: C): Promise<updateMyGatewayId_mutationMutation>;
    updateMyProfilePicture_mutation(variables?: updateMyProfilePicture_mutationMutationVariables, options?: C): Promise<updateMyProfilePicture_mutationMutation>;
    updateNotificationEmail_mutation(variables: updateNotificationEmail_mutationMutationVariables, options?: C): Promise<updateNotificationEmail_mutationMutation>;
    updateOrganization_mutation(variables: updateOrganization_mutationMutationVariables, options?: C): Promise<updateOrganization_mutationMutation>;
    updatePDA_mutation(variables: updatePDA_mutationMutationVariables, options?: C): Promise<updatePDA_mutationMutation>;
    updateUser_mutation(variables: updateUser_mutationMutationVariables, options?: C): Promise<updateUser_mutationMutation>;
};
export type Sdk = ReturnType<typeof getSdk>;
