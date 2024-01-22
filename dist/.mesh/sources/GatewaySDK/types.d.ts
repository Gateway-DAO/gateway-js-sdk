import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';
export declare namespace GatewaySdkTypes {
    type Maybe<T> = T | null;
    type InputMaybe<T> = Maybe<T>;
    type Exact<T extends {
        [key: string]: unknown;
    }> = {
        [K in keyof T]: T[K];
    };
    type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
        [SubKey in K]?: Maybe<T[SubKey]>;
    };
    type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
        [SubKey in K]: Maybe<T[SubKey]>;
    };
    type MakeEmpty<T extends {
        [key: string]: unknown;
    }, K extends keyof T> = {
        [_ in K]?: never;
    };
    type Incremental<T> = T | {
        [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
    };
    /** All built-in and custom scalars, mapped to their actual values */
    type Scalars = {
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
    type AddEmailConfirmationInput = {
        code: Scalars['Float']['input'];
        email: Scalars['String']['input'];
    };
    type AddEmailInput = {
        email: Scalars['String']['input'];
    };
    type AddWalletConfirmationInput = {
        /** Blockchain networks. Default: EVM */
        chain?: Chain;
        primary?: Scalars['Boolean']['input'];
        signature: Scalars['String']['input'];
        wallet: Scalars['String']['input'];
    };
    type Application = {
        apiKey: Scalars['String']['output'];
        gatewayFacilitationFee?: Maybe<Scalars['Float']['output']>;
        organization: Organization;
    };
    /** Application type. Default: Website */
    type ApplicationType = 'APP' | 'WEBSITE';
    type Auth = {
        /** Data of authentication method */
        data?: Maybe<AuthDataType>;
        hash?: Maybe<Scalars['String']['output']>;
        id: Scalars['String']['output'];
        type: AuthType;
        user: User;
        userId?: Maybe<Scalars['String']['output']>;
    };
    type AuthDataType = {
        /** Authentication address (ex: example@example.com, 0x0000) */
        address: Scalars['String']['output'];
        /** Chain of the wallet, if it's a crypto wallet */
        chain?: Maybe<Chain>;
        /** Define if authentication method is primary */
        primary?: Maybe<Scalars['Boolean']['output']>;
    };
    type AuthInput = {
        data: Scalars['JSON']['input'];
        type: AuthType;
    };
    /** Blockchain networks. Default: EVM */
    type AuthType = 'EMAIL' | 'GOOGLE' | 'HOT_WALLET' | 'WALLET';
    /** Blockchain networks. Default: EVM */
    type Chain = 'EVM' | 'SOL';
    type CreateApplicationInput = {
        /** Application domain */
        domain: Scalars['String']['input'];
        /** Gateway facilitation fee negotiated for this application */
        gatewayFacilitationFee?: InputMaybe<Scalars['Float']['input']>;
        /** Application name */
        name: Scalars['String']['input'];
        /** Application type */
        type?: ApplicationType;
    };
    type CreateDataModelInput = {
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
    type CreateEmailNonceInput = {
        email: Scalars['String']['input'];
    };
    type CreateEmailNonceOutput = {
        code: Scalars['Int']['output'];
        email: Scalars['String']['output'];
    };
    type CreateOrganizationInput = {
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
    type CreatePDAInput = {
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
    type CreateWalletNonceInput = {
        /** Blockchain networks. Default: EVM */
        chain?: InputMaybe<Chain>;
        wallet: Scalars['String']['input'];
    };
    type CreateWalletNonceOutput = {
        message: Scalars['String']['output'];
    };
    type DataModel = {
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
    type DataModelGroup = {
        /** Date of the last update of the Datamodel */
        createdAt: Scalars['DateTime']['output'];
        /** List of versions of Data Models */
        dataModels: Array<DataModel>;
        id: Scalars['String']['output'];
        /** if this Datamodel is official (approved) by Gateway (searcheable) */
        official: Scalars['Boolean']['output'];
    };
    type DataModelIssuer = {
        count: Scalars['Float']['output'];
        issuer?: Maybe<IdentifierUnion>;
    };
    type DataModelMetadata = {
        creator: Scalars['String']['output'];
        dataModel: Scalars['String']['output'];
        signedBy: Scalars['String']['output'];
    };
    type DataModelsMetadata = {
        consumptionPrice: Scalars['JSON']['output'];
        issuedCount: Scalars['JSON']['output'];
        /** List of available tags */
        tags: Array<Scalars['String']['output']>;
    };
    /** Data Request */
    type DataRequest = {
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
    type DataRequestSchemaInput = {
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
    type DataRequestTemplate = {
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
    type DataRequestTemplateDataModelSchemaInput = {
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
    type DataRequestTemplateDataModelSchemaObject = {
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
    type DataRequestTemplateVerifier = {
        count: Scalars['Float']['output'];
        verifier?: Maybe<IdentifierUnion>;
    };
    type DataRequestTemplatesMetadata = {
        /** List of available tags */
        tags: Array<Scalars['String']['output']>;
    };
    /** Statuses of Data Requests */
    type DataResourceStatus = 'ACCEPTED' | 'EXPIRED' | 'PENDING' | 'REJECTED';
    type DecryptedPDA = {
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
    type DecryptedProof = {
        /** Private Data Assets of the Proof */
        PDAs: Array<DecryptedProofPDA>;
        /** Data Models of the Proof */
        dataModels: Array<DataModel>;
        /** Raw Proof Context information */
        raw?: Maybe<Scalars['JSON']['output']>;
    };
    type DecryptedProofPDA = {
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
    type ExplorerAnalyticsSchema = {
        dataRequests: Scalars['Int']['output'];
        pdasIssued: Scalars['Int']['output'];
        totalEarnings: Scalars['Float']['output'];
        uniqueIssuers: Scalars['Int']['output'];
    };
    type ExplorerTransactionsAnalyticsSchema = {
        dataRequests: Scalars['Int']['output'];
        pdasIssued: Scalars['Int']['output'];
        totalEarnings: Scalars['Float']['output'];
        totalTransactions: Scalars['Int']['output'];
        uniqueIssuers: Scalars['Int']['output'];
    };
    type FacilitationFeeInput = {
        /** Maximum value for facilitation fee */
        max?: InputMaybe<Scalars['Float']['input']>;
        /** Minimum value for facilitation fee */
        min?: InputMaybe<Scalars['Float']['input']>;
    };
    type FilterDataModelInput = {
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
    type FilterDataRequestInput = {
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
    type FilterDataRequestTemplateInput = {
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
    type FilterOrganizationInput = {
        /** Check if organization is verified */
        verified?: InputMaybe<Scalars['Boolean']['input']>;
    };
    type FilterPDAInput = {
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
    type FilterProofInput = {
        /** Data Template IDs */
        dataTemplateIds?: InputMaybe<Array<Scalars['String']['input']>>;
        facilitationFee?: InputMaybe<FacilitationFeeInput>;
        /** Owners that have issued the proofs */
        owners?: InputMaybe<Array<UserIdentificationInput>>;
        /** PDA IDs */
        pdaIds?: InputMaybe<Array<Scalars['String']['input']>>;
    };
    type FilterTransactionsInput = {
        showMoneyTxs?: InputMaybe<Scalars['Boolean']['input']>;
        skip?: InputMaybe<Scalars['Int']['input']>;
        take?: InputMaybe<Scalars['Int']['input']>;
    };
    type FinancialSummaryOutput = {
        action: FinancialTransactionAction;
        amount: Scalars['Float']['output'];
    };
    type FinancialTransaction = {
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
    type FinancialTransactionAction = 'DATAMODEL_CREATE' | 'ISSUER_EARNINGS' | 'MONEY_DEPOSIT' | 'MONEY_WITHDRAW' | 'PDA_ISSUANCE' | 'PDA_STATUS_CHANGE' | 'PDA_UPDATE' | 'PROOF_CREATE' | 'PROOF_STATUS_CHANGE' | 'REQUEST_CREATE' | 'REQUEST_STATUS_CHANGE' | 'REQUEST_TEMPLATE_CREATE' | 'TRANSACTION_FEES';
    /** Type of the financial transaction */
    type FinancialTransactionType = 'DEPOSIT' | 'EARNING' | 'EXPENSE' | 'WITHDRAW';
    type FloatRangeDto = {
        max?: InputMaybe<Scalars['Float']['input']>;
        min?: InputMaybe<Scalars['Float']['input']>;
    };
    type IdentificationInput = {
        /** Type of the identification */
        type?: InputMaybe<IdentifierType>;
        /** Value of the identification */
        value: Scalars['String']['input'];
    };
    /** User identifier type, it can be an email or a wallet address. Default: UNKNOWN */
    type IdentifierType = 'EMAIL' | 'EVM' | 'GATEWAY_ID' | 'ORG_ID' | 'SOLANA' | 'USER_ID';
    type IdentifierUnion = Organization | User;
    type LoginEmailInput = {
        code: Scalars['Float']['input'];
        email: Scalars['String']['input'];
    };
    type LoginOutput = {
        protocol_id: Scalars['String']['output'];
        refresh_token: Scalars['String']['output'];
        token: Scalars['String']['output'];
        user: User;
    };
    type LoginWalletInput = {
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
    type MemberInput = {
        organization: OrganizationIdentificationInput;
        /** Role of the User in the Organization */
        role?: InputMaybe<OrganizationRole>;
        user: UserIdentificationInput;
    };
    type MetadataUnion = DataModelMetadata | OrganizationMetadata | PDAMetadata | ProofMetadata | RequestMetadata | RequestTemplateMetadata | UserMetadata;
    type MigrateAuthInput = {
        authId: Scalars['String']['input'];
        ownerJwt: Scalars['String']['input'];
    };
    type Mutation = {
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
    type MutationaddEmailArgs = {
        input: AddEmailInput;
    };
    type MutationaddEmailConfirmationArgs = {
        input: AddEmailConfirmationInput;
    };
    type MutationaddMemberToOrganizationArgs = {
        input: MemberInput;
    };
    type MutationaddWalletArgs = {
        input: CreateWalletNonceInput;
    };
    type MutationaddWalletConfirmationArgs = {
        input: AddWalletConfirmationInput;
    };
    type MutationchangeMemberRoleArgs = {
        input: MemberInput;
    };
    type MutationchangePDAStatusArgs = {
        input: UpdatePDAStatusInput;
    };
    type MutationcreateApplicationArgs = {
        input: CreateApplicationInput;
    };
    type MutationcreateDataModelArgs = {
        input: CreateDataModelInput;
    };
    type MutationcreateDataRequestArgs = {
        input: DataRequestSchemaInput;
    };
    type MutationcreateDataRequestTemplateArgs = {
        input: TemplateSchemaInput;
    };
    type MutationcreateEmailNonceArgs = {
        input: CreateEmailNonceInput;
    };
    type MutationcreateOrganizationArgs = {
        input: CreateOrganizationInput;
    };
    type MutationcreatePDAArgs = {
        input: CreatePDAInput;
    };
    type MutationcreateProofArgs = {
        claims?: InputMaybe<Scalars['JSON']['input']>;
        requestId?: InputMaybe<Scalars['String']['input']>;
        signature?: InputMaybe<Scalars['String']['input']>;
        verifier?: InputMaybe<IdentificationInput>;
        wallet?: InputMaybe<Scalars['String']['input']>;
    };
    type MutationcreateProofMessageArgs = {
        requestId: Scalars['String']['input'];
    };
    type MutationcreateWalletNonceArgs = {
        input: CreateWalletNonceInput;
    };
    type MutationdeleteAccountArgs = {
        id: Scalars['String']['input'];
    };
    type MutationloginEmailArgs = {
        input: LoginEmailInput;
    };
    type MutationloginWalletArgs = {
        input: LoginWalletInput;
    };
    type MutationmigrateAuthMethodArgs = {
        input: MigrateAuthInput;
    };
    type MutationrefreshTokenArgs = {
        input: RefreshTokenInput;
    };
    type MutationrejectDataRequestArgs = {
        requestId: Scalars['String']['input'];
    };
    type MutationremoveApplicationArgs = {
        id: Scalars['String']['input'];
    };
    type MutationremoveMemberFromOrganizationArgs = {
        input: TransferMemberInput;
    };
    type MutationtransferOwnershipArgs = {
        input: TransferMemberInput;
    };
    type MutationunregisterAuthMethodArgs = {
        input: AuthInput;
    };
    type MutationupdateMyDisplayNameArgs = {
        displayName?: InputMaybe<Scalars['String']['input']>;
    };
    type MutationupdateMyGatewayIdArgs = {
        gatewayId: Scalars['String']['input'];
    };
    type MutationupdateMyProfilePictureArgs = {
        profilePictureUrl?: InputMaybe<Scalars['String']['input']>;
    };
    type MutationupdateNotificationEmailArgs = {
        email: Scalars['String']['input'];
    };
    type MutationupdateOrganizationArgs = {
        input: UpdateOrganizationInput;
    };
    type MutationupdatePDAArgs = {
        input: UpdatePDAInput;
    };
    type MutationupdateUserArgs = {
        input: UpdateUserInput;
    };
    type Organization = {
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
    type OrganizationAccess = {
        id: Scalars['String']['output'];
        /** User of the Organization */
        organization: Organization;
        /** Role of the User in the Organization */
        role: OrganizationRole;
        /** User of the Organization */
        user: User;
    };
    type OrganizationIdentificationInput = {
        /** Type of the identification */
        type: OrganizationIdentifierType;
        /** Value of the identification */
        value: Scalars['String']['input'];
    };
    /** Organization identifier type, it can be an orgId or a Gateway ID. Default: UNKNOWN */
    type OrganizationIdentifierType = 'GATEWAY_ID' | 'ORG_ID';
    type OrganizationMetadata = {
        organization: Scalars['String']['output'];
        users: Array<Scalars['String']['output']>;
        usersAdmin: Array<Scalars['String']['output']>;
        verified: Scalars['Boolean']['output'];
    };
    /** User role on a organization */
    type OrganizationRole = 'Admin' | 'Member' | 'Owner';
    type PDAClaim = {
        description?: Maybe<Scalars['String']['output']>;
        label?: Maybe<Scalars['String']['output']>;
        metadata?: Maybe<Scalars['JSON']['output']>;
        property: Scalars['String']['output'];
        type: Scalars['String']['output'];
        value: Scalars['String']['output'];
    };
    type PDAMetadata = {
        dataModel: Scalars['String']['output'];
        expirationDate?: Maybe<Scalars['DateTime']['output']>;
        issuer: Scalars['String']['output'];
        pda: Scalars['String']['output'];
        signedBy: Scalars['String']['output'];
        pdametadastatus: PDAStatus;
    };
    /** Statuses of PDAs */
    type PDAStatus = 'Expired' | 'Revoked' | 'Suspended' | 'Valid';
    /** Organizations or IDs that can issue a credential from specific data model */
    type PermissionType = 'ALL' | 'ORGANIZATIONS' | 'SPECIFIC_IDS';
    type PrivateDataAsset = {
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
    type Proof = {
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
    type ProofCost = {
        facilitationFee: Scalars['Float']['output'];
        totalCost: Scalars['Float']['output'];
    };
    type ProofMetadata = {
        earnings: Scalars['Float']['output'];
        fees: Scalars['Float']['output'];
        owner: Scalars['String']['output'];
        proof: Scalars['String']['output'];
        request?: Maybe<Scalars['String']['output']>;
        status: Scalars['String']['output'];
        verifier: Scalars['String']['output'];
    };
    /** Proof status type. Default: SYNCED */
    type ProofStatus = 'ACTIVE' | 'OUTDATED' | 'REVOKED';
    type Query = {
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
    type QueryPDAArgs = {
        id: Scalars['String']['input'];
    };
    type QueryPDACountArgs = {
        filter?: InputMaybe<FilterPDAInput>;
    };
    type QueryPDAsArgs = {
        filter?: InputMaybe<FilterPDAInput>;
        order?: InputMaybe<Scalars['JSON']['input']>;
        skip?: InputMaybe<Scalars['Float']['input']>;
        take?: InputMaybe<Scalars['Float']['input']>;
    };
    type QuerycalculateProofCostArgs = {
        requestId: Scalars['String']['input'];
    };
    type QuerycheckUsernameAvailabilityArgs = {
        username: Scalars['String']['input'];
    };
    type QuerydataModelArgs = {
        id: Scalars['String']['input'];
    };
    type QuerydataModelsArgs = {
        filter?: InputMaybe<FilterDataModelInput>;
        order?: InputMaybe<Scalars['JSON']['input']>;
        skip?: InputMaybe<Scalars['Int']['input']>;
        take?: InputMaybe<Scalars['Int']['input']>;
    };
    type QuerydataModelsCountArgs = {
        filter?: InputMaybe<FilterDataModelInput>;
    };
    type QuerydataRequestArgs = {
        requestId: Scalars['String']['input'];
    };
    type QuerydataRequestCountArgs = {
        filter?: InputMaybe<FilterDataRequestInput>;
    };
    type QuerydataRequestStatusArgs = {
        requestId: Scalars['String']['input'];
    };
    type QuerydataRequestTemplateArgs = {
        id: Scalars['String']['input'];
    };
    type QuerydataRequestTemplatesArgs = {
        filter?: InputMaybe<FilterDataRequestTemplateInput>;
        order?: InputMaybe<Scalars['JSON']['input']>;
        skip?: InputMaybe<Scalars['Int']['input']>;
        take?: InputMaybe<Scalars['Float']['input']>;
    };
    type QuerydataRequestTemplatesCountArgs = {
        filter?: InputMaybe<FilterDataRequestTemplateInput>;
    };
    type QuerydataRequestsArgs = {
        filter?: InputMaybe<FilterDataRequestInput>;
    };
    type QueryfinancialTransactionsArgs = {
        identifier: TransactionIdentifierInput;
        skip?: InputMaybe<Scalars['Int']['input']>;
        take?: InputMaybe<Scalars['Int']['input']>;
    };
    type QueryfindValidPDAsForRequestArgs = {
        requestId: Scalars['String']['input'];
    };
    type QuerygetTotalofIssuersByDataModelArgs = {
        dataModelId: Scalars['String']['input'];
    };
    type QueryissuedPDAsArgs = {
        filter?: InputMaybe<FilterPDAInput>;
        order?: InputMaybe<Scalars['JSON']['input']>;
        skip?: InputMaybe<Scalars['Float']['input']>;
        take?: InputMaybe<Scalars['Float']['input']>;
    };
    type QueryissuedPDAsCountArgs = {
        filter?: InputMaybe<FilterPDAInput>;
    };
    type QueryissuersByDataModelArgs = {
        id: Scalars['String']['input'];
    };
    type QueryissuersByDataModelCountArgs = {
        id: Scalars['String']['input'];
    };
    type QuerymyDataModelsCountArgs = {
        filter?: InputMaybe<FilterDataModelInput>;
    };
    type QuerymyDataRequestTemplatesCountArgs = {
        filter?: InputMaybe<FilterDataRequestTemplateInput>;
    };
    type QuerymyFinancialTransactionsArgs = {
        organizationId?: InputMaybe<Scalars['String']['input']>;
        skip?: InputMaybe<Scalars['Int']['input']>;
        take?: InputMaybe<Scalars['Int']['input']>;
    };
    type QuerymyFinancialTransactionsCountArgs = {
        organizationId?: InputMaybe<Scalars['String']['input']>;
    };
    type QuerymyPDACountArgs = {
        filter?: InputMaybe<FilterPDAInput>;
    };
    type QuerymyPDAsArgs = {
        filter?: InputMaybe<FilterPDAInput>;
        order?: InputMaybe<Scalars['JSON']['input']>;
        skip?: InputMaybe<Scalars['Float']['input']>;
        take?: InputMaybe<Scalars['Float']['input']>;
    };
    type QuerymyTransactionsArgs = {
        filter?: InputMaybe<FilterTransactionsInput>;
    };
    type QuerymyWalletArgs = {
        organizationId?: InputMaybe<Scalars['String']['input']>;
    };
    type QueryorganizationArgs = {
        input: OrganizationIdentificationInput;
    };
    type QueryorganizationsArgs = {
        filter?: InputMaybe<FilterOrganizationInput>;
        skip?: InputMaybe<Scalars['Float']['input']>;
        take?: InputMaybe<Scalars['Float']['input']>;
    };
    type QueryproofArgs = {
        id: Scalars['String']['input'];
    };
    type QueryproofsArgs = {
        filter?: InputMaybe<FilterProofInput>;
        order?: InputMaybe<Scalars['JSON']['input']>;
        skip?: InputMaybe<Scalars['Float']['input']>;
        take?: InputMaybe<Scalars['Float']['input']>;
    };
    type QueryproofsByPDAIdsArgs = {
        pdaIds: Array<Scalars['String']['input']>;
        skip?: InputMaybe<Scalars['Float']['input']>;
        take?: InputMaybe<Scalars['Float']['input']>;
    };
    type QueryreceivedProofsArgs = {
        order?: InputMaybe<Scalars['JSON']['input']>;
        organizationId?: InputMaybe<Scalars['String']['input']>;
        skip?: InputMaybe<Scalars['Float']['input']>;
        take?: InputMaybe<Scalars['Float']['input']>;
    };
    type QueryreceivedProofsCountArgs = {
        organizationId?: InputMaybe<Scalars['String']['input']>;
    };
    type QueryrequestsReceivedArgs = {
        filter?: InputMaybe<FilterDataRequestInput>;
        order?: InputMaybe<Scalars['JSON']['input']>;
        skip?: InputMaybe<Scalars['Float']['input']>;
        take?: InputMaybe<Scalars['Float']['input']>;
    };
    type QueryrequestsReceivedCountArgs = {
        filter?: InputMaybe<FilterDataRequestInput>;
    };
    type QueryrequestsSentArgs = {
        filter?: InputMaybe<FilterDataRequestInput>;
        order?: InputMaybe<Scalars['JSON']['input']>;
        skip?: InputMaybe<Scalars['Float']['input']>;
        take?: InputMaybe<Scalars['Float']['input']>;
    };
    type QueryrequestsSentCountArgs = {
        filter?: InputMaybe<FilterDataRequestInput>;
    };
    type QuerysentProofsArgs = {
        order?: InputMaybe<Scalars['JSON']['input']>;
        skip?: InputMaybe<Scalars['Float']['input']>;
        take?: InputMaybe<Scalars['Float']['input']>;
    };
    type QuerytemplateByDataRequestArgs = {
        requestID: Scalars['String']['input'];
    };
    type QuerytransactionArgs = {
        id: Scalars['String']['input'];
    };
    type QuerytransactionsArgs = {
        filter?: InputMaybe<FilterTransactionsInput>;
    };
    type QuerytransactionsCountArgs = {
        showMoneyTxs?: InputMaybe<Scalars['Boolean']['input']>;
    };
    type QueryuserArgs = {
        input: UserIdentificationInput;
    };
    type QueryverifiersByDataRequestTemplateArgs = {
        id: Scalars['String']['input'];
    };
    type QueryverifiersByDataRequestTemplateCountArgs = {
        id: Scalars['String']['input'];
    };
    type RefreshTokenInput = {
        refresh_token: Scalars['String']['input'];
    };
    type RequestIssueanceDateSchemaInput = {
        after: Scalars['DateTimeISO']['input'];
        before: Scalars['DateTimeISO']['input'];
    };
    type RequestIssueanceDateSchemaObject = {
        after: Scalars['DateTimeISO']['output'];
        before: Scalars['DateTimeISO']['output'];
    };
    type RequestMetadata = {
        owner: Scalars['String']['output'];
        request: Scalars['String']['output'];
        requestTemplate: Scalars['String']['output'];
        status: Scalars['String']['output'];
        verifier: Scalars['String']['output'];
    };
    type RequestTemplateMetadata = {
        creator: Scalars['String']['output'];
        dataModels: Array<Scalars['String']['output']>;
        requestTemplate: Scalars['String']['output'];
        signedBy: Scalars['String']['output'];
    };
    /** User role */
    type Role = 'Admin' | 'User';
    type SignupConfirmationOutput = {
        user: User;
    };
    type TemplateSchemaInput = {
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
    type Transaction = {
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
    type TransactionAction = 'DATAMODEL_CREATE' | 'ISSUER_EARNINGS' | 'MONEY_DEPOSIT' | 'MONEY_WITHDRAW' | 'ORGANIZATION_CREATE' | 'ORGANIZATION_UPDATE' | 'PDA_ISSUANCE' | 'PDA_STATUS_CHANGE' | 'PDA_UPDATE' | 'PROOF_CREATE' | 'PROOF_STATUS_CHANGE' | 'REQUEST_CREATE' | 'REQUEST_STATUS_CHANGE' | 'REQUEST_TEMPLATE_CREATE' | 'TRANSACTION_FEES' | 'USER_CREATE';
    type TransactionIdentifierInput = {
        id?: InputMaybe<Scalars['String']['input']>;
        type: TransactionIdentifierType;
    };
    type TransactionIdentifierType = 'ORGANIZATION' | 'POOL' | 'USER';
    type TransferMemberInput = {
        organization: OrganizationIdentificationInput;
        user: UserIdentificationInput;
    };
    type UpdateOrganizationInput = {
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
    type UpdatePDAInput = {
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
    type UpdatePDAStatusInput = {
        /** ID of PDA */
        id: Scalars['String']['input'];
        /** New status of PDA */
        status: PDAStatus;
    };
    type UpdateUserInput = {
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
    type User = {
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
    type UserIdentificationInput = {
        /** Type of the identification */
        type: UserIdentifierType;
        /** Value of the identification */
        value: Scalars['String']['input'];
    };
    /** User identifier type, it can be an email or a wallet address. Default: UNKNOWN */
    type UserIdentifierType = 'EMAIL' | 'EVM' | 'GATEWAY_ID' | 'SOLANA' | 'USER_ID';
    type UserMetadata = {
        user: Scalars['String']['output'];
    };
    type UserUsageDto = {
        credentialsUsageAllowedByMonth: Scalars['Int']['output'];
        datamodelsUsageAllowedByMonth: Scalars['Int']['output'];
        monthlyCredentials: Scalars['Int']['output'];
        monthlyDatamodels: Scalars['Int']['output'];
    };
    type ValidDataRequested = {
        provided: Scalars['JSON']['output'];
        requested: Scalars['JSON']['output'];
    };
    type ValidPDAForRequest = {
        dataModel: DataModel;
        pdas: Array<PrivateDataAsset>;
        required: Scalars['Boolean']['output'];
        schema: DataRequestTemplateDataModelSchemaObject;
        validData?: Maybe<Array<ValidDataRequested>>;
    };
    type Wallet = {
        balance: Scalars['Float']['output'];
        moneyIn: Scalars['Float']['output'];
        moneyInSummary: Array<FinancialSummaryOutput>;
        moneyOut: Scalars['Float']['output'];
        moneyOutSummary: Array<FinancialSummaryOutput>;
    };
    type QuerySdk = {
        /** null **/
        PDA: InContextSdkMethod<Query['PDA'], QueryPDAArgs, MeshContext>;
        /** null **/
        PDACount: InContextSdkMethod<Query['PDACount'], QueryPDACountArgs, MeshContext>;
        /** null **/
        PDAs: InContextSdkMethod<Query['PDAs'], QueryPDAsArgs, MeshContext>;
        /** null **/
        applications: InContextSdkMethod<Query['applications'], {}, MeshContext>;
        /** null **/
        calculateProofCost: InContextSdkMethod<Query['calculateProofCost'], QuerycalculateProofCostArgs, MeshContext>;
        /** null **/
        checkUsernameAvailability: InContextSdkMethod<Query['checkUsernameAvailability'], QuerycheckUsernameAvailabilityArgs, MeshContext>;
        /** null **/
        createDepositLink: InContextSdkMethod<Query['createDepositLink'], {}, MeshContext>;
        /** null **/
        dataModel: InContextSdkMethod<Query['dataModel'], QuerydataModelArgs, MeshContext>;
        /** null **/
        dataModels: InContextSdkMethod<Query['dataModels'], QuerydataModelsArgs, MeshContext>;
        /** null **/
        dataModelsCount: InContextSdkMethod<Query['dataModelsCount'], QuerydataModelsCountArgs, MeshContext>;
        /** null **/
        dataModelsMetadata: InContextSdkMethod<Query['dataModelsMetadata'], {}, MeshContext>;
        /** null **/
        dataRequest: InContextSdkMethod<Query['dataRequest'], QuerydataRequestArgs, MeshContext>;
        /** null **/
        dataRequestCount: InContextSdkMethod<Query['dataRequestCount'], QuerydataRequestCountArgs, MeshContext>;
        /** null **/
        dataRequestStatus: InContextSdkMethod<Query['dataRequestStatus'], QuerydataRequestStatusArgs, MeshContext>;
        /** null **/
        dataRequestTemplate: InContextSdkMethod<Query['dataRequestTemplate'], QuerydataRequestTemplateArgs, MeshContext>;
        /** null **/
        dataRequestTemplates: InContextSdkMethod<Query['dataRequestTemplates'], QuerydataRequestTemplatesArgs, MeshContext>;
        /** null **/
        dataRequestTemplatesCount: InContextSdkMethod<Query['dataRequestTemplatesCount'], QuerydataRequestTemplatesCountArgs, MeshContext>;
        /** null **/
        dataRequestTemplatesMetadata: InContextSdkMethod<Query['dataRequestTemplatesMetadata'], {}, MeshContext>;
        /** null **/
        dataRequests: InContextSdkMethod<Query['dataRequests'], QuerydataRequestsArgs, MeshContext>;
        /** null **/
        financialTransactions: InContextSdkMethod<Query['financialTransactions'], QueryfinancialTransactionsArgs, MeshContext>;
        /** null **/
        findValidPDAsForRequest: InContextSdkMethod<Query['findValidPDAsForRequest'], QueryfindValidPDAsForRequestArgs, MeshContext>;
        /** null **/
        generatedFees: InContextSdkMethod<Query['generatedFees'], {}, MeshContext>;
        /** null **/
        getExplorerStats: InContextSdkMethod<Query['getExplorerStats'], {}, MeshContext>;
        /** null **/
        getMonthlyUserUsage: InContextSdkMethod<Query['getMonthlyUserUsage'], {}, MeshContext>;
        /** null **/
        getTotalofIssuersByDataModel: InContextSdkMethod<Query['getTotalofIssuersByDataModel'], QuerygetTotalofIssuersByDataModelArgs, MeshContext>;
        /** null **/
        getTransactionsExplorerStats: InContextSdkMethod<Query['getTransactionsExplorerStats'], {}, MeshContext>;
        /** null **/
        issuedPDAs: InContextSdkMethod<Query['issuedPDAs'], QueryissuedPDAsArgs, MeshContext>;
        /** null **/
        issuedPDAsCount: InContextSdkMethod<Query['issuedPDAsCount'], QueryissuedPDAsCountArgs, MeshContext>;
        /** null **/
        issuersByDataModel: InContextSdkMethod<Query['issuersByDataModel'], QueryissuersByDataModelArgs, MeshContext>;
        /** null **/
        issuersByDataModelCount: InContextSdkMethod<Query['issuersByDataModelCount'], QueryissuersByDataModelCountArgs, MeshContext>;
        /** null **/
        me: InContextSdkMethod<Query['me'], {}, MeshContext>;
        /** null **/
        myDataModelsCount: InContextSdkMethod<Query['myDataModelsCount'], QuerymyDataModelsCountArgs, MeshContext>;
        /** null **/
        myDataRequestTemplatesCount: InContextSdkMethod<Query['myDataRequestTemplatesCount'], QuerymyDataRequestTemplatesCountArgs, MeshContext>;
        /** null **/
        myFinancialTransactions: InContextSdkMethod<Query['myFinancialTransactions'], QuerymyFinancialTransactionsArgs, MeshContext>;
        /** null **/
        myFinancialTransactionsCount: InContextSdkMethod<Query['myFinancialTransactionsCount'], QuerymyFinancialTransactionsCountArgs, MeshContext>;
        /** null **/
        myPDACount: InContextSdkMethod<Query['myPDACount'], QuerymyPDACountArgs, MeshContext>;
        /** null **/
        myPDAs: InContextSdkMethod<Query['myPDAs'], QuerymyPDAsArgs, MeshContext>;
        /** null **/
        myTransactions: InContextSdkMethod<Query['myTransactions'], QuerymyTransactionsArgs, MeshContext>;
        /** null **/
        myWallet: InContextSdkMethod<Query['myWallet'], QuerymyWalletArgs, MeshContext>;
        /** null **/
        organization: InContextSdkMethod<Query['organization'], QueryorganizationArgs, MeshContext>;
        /** null **/
        organizations: InContextSdkMethod<Query['organizations'], QueryorganizationsArgs, MeshContext>;
        /** null **/
        proof: InContextSdkMethod<Query['proof'], QueryproofArgs, MeshContext>;
        /** null **/
        proofs: InContextSdkMethod<Query['proofs'], QueryproofsArgs, MeshContext>;
        /** null **/
        proofsByPDAIds: InContextSdkMethod<Query['proofsByPDAIds'], QueryproofsByPDAIdsArgs, MeshContext>;
        /** null **/
        receivedProofs: InContextSdkMethod<Query['receivedProofs'], QueryreceivedProofsArgs, MeshContext>;
        /** null **/
        receivedProofsCount: InContextSdkMethod<Query['receivedProofsCount'], QueryreceivedProofsCountArgs, MeshContext>;
        /** null **/
        requestsReceived: InContextSdkMethod<Query['requestsReceived'], QueryrequestsReceivedArgs, MeshContext>;
        /** null **/
        requestsReceivedCount: InContextSdkMethod<Query['requestsReceivedCount'], QueryrequestsReceivedCountArgs, MeshContext>;
        /** null **/
        requestsSent: InContextSdkMethod<Query['requestsSent'], QueryrequestsSentArgs, MeshContext>;
        /** null **/
        requestsSentCount: InContextSdkMethod<Query['requestsSentCount'], QueryrequestsSentCountArgs, MeshContext>;
        /** null **/
        sentProofs: InContextSdkMethod<Query['sentProofs'], QuerysentProofsArgs, MeshContext>;
        /** null **/
        sentProofsCount: InContextSdkMethod<Query['sentProofsCount'], {}, MeshContext>;
        /** null **/
        templateByDataRequest: InContextSdkMethod<Query['templateByDataRequest'], QuerytemplateByDataRequestArgs, MeshContext>;
        /** null **/
        transaction: InContextSdkMethod<Query['transaction'], QuerytransactionArgs, MeshContext>;
        /** null **/
        transactions: InContextSdkMethod<Query['transactions'], QuerytransactionsArgs, MeshContext>;
        /** null **/
        transactionsCount: InContextSdkMethod<Query['transactionsCount'], QuerytransactionsCountArgs, MeshContext>;
        /** null **/
        user: InContextSdkMethod<Query['user'], QueryuserArgs, MeshContext>;
        /** null **/
        verifiersByDataRequestTemplate: InContextSdkMethod<Query['verifiersByDataRequestTemplate'], QueryverifiersByDataRequestTemplateArgs, MeshContext>;
        /** null **/
        verifiersByDataRequestTemplateCount: InContextSdkMethod<Query['verifiersByDataRequestTemplateCount'], QueryverifiersByDataRequestTemplateCountArgs, MeshContext>;
    };
    type MutationSdk = {
        /** Add email address to your GatewayID **/
        addEmail: InContextSdkMethod<Mutation['addEmail'], MutationaddEmailArgs, MeshContext>;
        /** Confirmation of adding email to your Gateway ID. Pass a verification code generated by addEmail beforehand. **/
        addEmailConfirmation: InContextSdkMethod<Mutation['addEmailConfirmation'], MutationaddEmailConfirmationArgs, MeshContext>;
        /** Add a member to an organization **/
        addMemberToOrganization: InContextSdkMethod<Mutation['addMemberToOrganization'], MutationaddMemberToOrganizationArgs, MeshContext>;
        /** Add a SOL or EVM wallet to your GatewayID  **/
        addWallet: InContextSdkMethod<Mutation['addWallet'], MutationaddWalletArgs, MeshContext>;
        /** Confirmation of adding wallet to your Gateway ID. Sign a nonce generated by addWallet beforehand. **/
        addWalletConfirmation: InContextSdkMethod<Mutation['addWalletConfirmation'], MutationaddWalletConfirmationArgs, MeshContext>;
        /** Organization admins can change user role on organization. User must be a member of the organization.  **/
        changeMemberRole: InContextSdkMethod<Mutation['changeMemberRole'], MutationchangeMemberRoleArgs, MeshContext>;
        /** Update the status of PDA. **/
        changePDAStatus: InContextSdkMethod<Mutation['changePDAStatus'], MutationchangePDAStatusArgs, MeshContext>;
        /** null **/
        createApplication: InContextSdkMethod<Mutation['createApplication'], MutationcreateApplicationArgs, MeshContext>;
        /** Creates a new data model. **/
        createDataModel: InContextSdkMethod<Mutation['createDataModel'], MutationcreateDataModelArgs, MeshContext>;
        /** null **/
        createDataRequest: InContextSdkMethod<Mutation['createDataRequest'], MutationcreateDataRequestArgs, MeshContext>;
        /** null **/
        createDataRequestTemplate: InContextSdkMethod<Mutation['createDataRequestTemplate'], MutationcreateDataRequestTemplateArgs, MeshContext>;
        /** Create a nonce for a email to be used for login. Default Chain is EVM. **/
        createEmailNonce: InContextSdkMethod<Mutation['createEmailNonce'], MutationcreateEmailNonceArgs, MeshContext>;
        /** null **/
        createOrganization: InContextSdkMethod<Mutation['createOrganization'], MutationcreateOrganizationArgs, MeshContext>;
        /** null **/
        createPDA: InContextSdkMethod<Mutation['createPDA'], MutationcreatePDAArgs, MeshContext>;
        /** null **/
        createProof: InContextSdkMethod<Mutation['createProof'], MutationcreateProofArgs, MeshContext>;
        /** null **/
        createProofMessage: InContextSdkMethod<Mutation['createProofMessage'], MutationcreateProofMessageArgs, MeshContext>;
        /** Create a nonce for a wallet to be used for login. Default Chain is EVM. **/
        createWalletNonce: InContextSdkMethod<Mutation['createWalletNonce'], MutationcreateWalletNonceArgs, MeshContext>;
        /** Soft Remove user account **/
        deleteAccount: InContextSdkMethod<Mutation['deleteAccount'], MutationdeleteAccountArgs, MeshContext>;
        /** null **/
        loginEmail: InContextSdkMethod<Mutation['loginEmail'], MutationloginEmailArgs, MeshContext>;
        /** null **/
        loginWallet: InContextSdkMethod<Mutation['loginWallet'], MutationloginWalletArgs, MeshContext>;
        /** null **/
        migrateAuthMethod: InContextSdkMethod<Mutation['migrateAuthMethod'], MutationmigrateAuthMethodArgs, MeshContext>;
        /** null **/
        refreshToken: InContextSdkMethod<Mutation['refreshToken'], MutationrefreshTokenArgs, MeshContext>;
        /** null **/
        rejectDataRequest: InContextSdkMethod<Mutation['rejectDataRequest'], MutationrejectDataRequestArgs, MeshContext>;
        /** null **/
        removeApplication: InContextSdkMethod<Mutation['removeApplication'], MutationremoveApplicationArgs, MeshContext>;
        /** Remove a member from an organization **/
        removeMemberFromOrganization: InContextSdkMethod<Mutation['removeMemberFromOrganization'], MutationremoveMemberFromOrganizationArgs, MeshContext>;
        /** Organization owner can transfer ownership to another user **/
        transferOwnership: InContextSdkMethod<Mutation['transferOwnership'], MutationtransferOwnershipArgs, MeshContext>;
        /** null **/
        unregisterAuthMethod: InContextSdkMethod<Mutation['unregisterAuthMethod'], MutationunregisterAuthMethodArgs, MeshContext>;
        /** null **/
        updateMyDisplayName: InContextSdkMethod<Mutation['updateMyDisplayName'], MutationupdateMyDisplayNameArgs, MeshContext>;
        /** null **/
        updateMyGatewayId: InContextSdkMethod<Mutation['updateMyGatewayId'], MutationupdateMyGatewayIdArgs, MeshContext>;
        /** null **/
        updateMyProfilePicture: InContextSdkMethod<Mutation['updateMyProfilePicture'], MutationupdateMyProfilePictureArgs, MeshContext>;
        /** null **/
        updateNotificationEmail: InContextSdkMethod<Mutation['updateNotificationEmail'], MutationupdateNotificationEmailArgs, MeshContext>;
        /** null **/
        updateOrganization: InContextSdkMethod<Mutation['updateOrganization'], MutationupdateOrganizationArgs, MeshContext>;
        /** null **/
        updatePDA: InContextSdkMethod<Mutation['updatePDA'], MutationupdatePDAArgs, MeshContext>;
        /** null **/
        updateUser: InContextSdkMethod<Mutation['updateUser'], MutationupdateUserArgs, MeshContext>;
    };
    type SubscriptionSdk = {};
    type Context = {
        ["GatewaySDK"]: {
            Query: QuerySdk;
            Mutation: MutationSdk;
            Subscription: SubscriptionSdk;
        };
    };
}
