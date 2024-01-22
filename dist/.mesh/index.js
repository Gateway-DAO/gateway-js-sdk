"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.proofs_queryDocument = exports.proof_queryDocument = exports.organizations_queryDocument = exports.organization_queryDocument = exports.myWallet_queryDocument = exports.myTransactions_queryDocument = exports.myPDAs_queryDocument = exports.myPDACount_queryDocument = exports.myFinancialTransactionsCount_queryDocument = exports.myFinancialTransactions_queryDocument = exports.myDataRequestTemplatesCount_queryDocument = exports.myDataModelsCount_queryDocument = exports.me_queryDocument = exports.issuersByDataModelCount_queryDocument = exports.issuersByDataModel_queryDocument = exports.issuedPDAsCount_queryDocument = exports.issuedPDAs_queryDocument = exports.getTransactionsExplorerStats_queryDocument = exports.getTotalofIssuersByDataModel_queryDocument = exports.getMonthlyUserUsage_queryDocument = exports.getExplorerStats_queryDocument = exports.generatedFees_queryDocument = exports.findValidPDAsForRequest_queryDocument = exports.financialTransactions_queryDocument = exports.dataRequests_queryDocument = exports.dataRequestTemplatesMetadata_queryDocument = exports.dataRequestTemplatesCount_queryDocument = exports.dataRequestTemplates_queryDocument = exports.dataRequestTemplate_queryDocument = exports.dataRequestStatus_queryDocument = exports.dataRequestCount_queryDocument = exports.dataRequest_queryDocument = exports.dataModelsMetadata_queryDocument = exports.dataModelsCount_queryDocument = exports.dataModels_queryDocument = exports.dataModel_queryDocument = exports.createDepositLink_queryDocument = exports.checkUsernameAvailability_queryDocument = exports.calculateProofCost_queryDocument = exports.applications_queryDocument = exports.PDAs_queryDocument = exports.PDACount_queryDocument = exports.PDA_queryDocument = exports.getMeshSDK = exports.subscribe = exports.execute = exports.getBuiltMesh = exports.createBuiltMeshHTTPHandler = exports.getMeshOptions = exports.rawServeConfig = void 0;
exports.updateUser_mutationDocument = exports.updatePDA_mutationDocument = exports.updateOrganization_mutationDocument = exports.updateNotificationEmail_mutationDocument = exports.updateMyProfilePicture_mutationDocument = exports.updateMyGatewayId_mutationDocument = exports.updateMyDisplayName_mutationDocument = exports.unregisterAuthMethod_mutationDocument = exports.transferOwnership_mutationDocument = exports.removeMemberFromOrganization_mutationDocument = exports.removeApplication_mutationDocument = exports.rejectDataRequest_mutationDocument = exports.refreshToken_mutationDocument = exports.migrateAuthMethod_mutationDocument = exports.loginWallet_mutationDocument = exports.loginEmail_mutationDocument = exports.deleteAccount_mutationDocument = exports.createWalletNonce_mutationDocument = exports.createProofMessage_mutationDocument = exports.createProof_mutationDocument = exports.createPDA_mutationDocument = exports.createOrganization_mutationDocument = exports.createEmailNonce_mutationDocument = exports.createDataRequestTemplate_mutationDocument = exports.createDataRequest_mutationDocument = exports.createDataModel_mutationDocument = exports.createApplication_mutationDocument = exports.changePDAStatus_mutationDocument = exports.changeMemberRole_mutationDocument = exports.addWalletConfirmation_mutationDocument = exports.addWallet_mutationDocument = exports.addMemberToOrganization_mutationDocument = exports.addEmailConfirmation_mutationDocument = exports.addEmail_mutationDocument = exports.verifiersByDataRequestTemplateCount_queryDocument = exports.verifiersByDataRequestTemplate_queryDocument = exports.user_queryDocument = exports.transactionsCount_queryDocument = exports.transactions_queryDocument = exports.transaction_queryDocument = exports.templateByDataRequest_queryDocument = exports.sentProofsCount_queryDocument = exports.sentProofs_queryDocument = exports.requestsSentCount_queryDocument = exports.requestsSent_queryDocument = exports.requestsReceivedCount_queryDocument = exports.requestsReceived_queryDocument = exports.receivedProofsCount_queryDocument = exports.receivedProofs_queryDocument = exports.proofsByPDAIds_queryDocument = void 0;
exports.getSdk = void 0;
const utils_1 = require("@graphql-mesh/utils");
const utils_2 = require("@graphql-mesh/utils");
const utils_3 = require("@graphql-mesh/utils");
const cache_localforage_1 = __importDefault(require("@graphql-mesh/cache-localforage"));
const custom_fetch_js_1 = __importDefault(require("../custom-fetch.js"));
const graphql_1 = __importDefault(require("@graphql-mesh/graphql"));
const transform_rename_1 = __importDefault(require("@graphql-mesh/transform-rename"));
const merger_bare_1 = __importDefault(require("@graphql-mesh/merger-bare"));
const http_1 = require("@graphql-mesh/http");
const runtime_1 = require("@graphql-mesh/runtime");
const store_1 = require("@graphql-mesh/store");
const cross_helpers_1 = require("@graphql-mesh/cross-helpers");
const importedModule$0 = __importStar(require("./sources/GatewaySDK/introspectionSchema"));
const baseDir = cross_helpers_1.path.join(typeof __dirname === 'string' ? __dirname : '/', '..');
const importFn = (moduleId) => {
    const relativeModuleId = (cross_helpers_1.path.isAbsolute(moduleId) ? cross_helpers_1.path.relative(baseDir, moduleId) : moduleId).split('\\').join('/').replace(baseDir + '/', '');
    switch (relativeModuleId) {
        case ".mesh/sources/GatewaySDK/introspectionSchema":
            return Promise.resolve(importedModule$0);
        default:
            return Promise.reject(new Error(`Cannot find module '${relativeModuleId}'.`));
    }
};
const rootStore = new store_1.MeshStore('.mesh', new store_1.FsStoreStorageAdapter({
    cwd: baseDir,
    importFn,
    fileType: "ts",
}), {
    readonly: true,
    validate: false
});
exports.rawServeConfig = undefined;
function getMeshOptions() {
    return __awaiter(this, void 0, void 0, function* () {
        const pubsub = new utils_2.PubSub();
        const sourcesStore = rootStore.child('sources');
        const logger = new utils_3.DefaultLogger("🕸️  Mesh");
        const cache = new cache_localforage_1.default(Object.assign(Object.assign({}, {}), { importFn, store: rootStore.child('cache'), pubsub,
            logger }));
        const sources = [];
        const transforms = [];
        const additionalEnvelopPlugins = [];
        const gatewaySdkTransforms = [];
        const additionalTypeDefs = [];
        const gatewaySdkHandler = new graphql_1.default({
            name: "GatewaySDK",
            config: { "endpoint": "https://develop.protocol.mygateway.xyz/graphql" },
            baseDir,
            cache,
            pubsub,
            store: sourcesStore.child("GatewaySDK"),
            logger: logger.child("GatewaySDK"),
            importFn,
        });
        gatewaySdkTransforms[0] = new transform_rename_1.default({
            apiName: "GatewaySDK",
            config: { "mode": "bare", "renames": [{ "from": { "type": "PDAMetadata", "field": "status" }, "to": { "type": "PDAMetadata", "field": "pdametadastatus" } }] },
            baseDir,
            cache,
            pubsub,
            importFn,
            logger,
        });
        sources[0] = {
            name: 'GatewaySDK',
            handler: gatewaySdkHandler,
            transforms: gatewaySdkTransforms
        };
        const additionalResolvers = [];
        const merger = new merger_bare_1.default({
            cache,
            pubsub,
            logger: logger.child('bareMerger'),
            store: rootStore.child('bareMerger')
        });
        return {
            sources,
            transforms,
            additionalTypeDefs,
            additionalResolvers,
            cache,
            pubsub,
            merger,
            logger,
            additionalEnvelopPlugins,
            get documents() {
                return [];
            },
            fetchFn: custom_fetch_js_1.default,
        };
    });
}
exports.getMeshOptions = getMeshOptions;
function createBuiltMeshHTTPHandler() {
    return (0, http_1.createMeshHTTPHandler)({
        baseDir,
        getBuiltMesh: getBuiltMesh,
        rawServeConfig: undefined,
    });
}
exports.createBuiltMeshHTTPHandler = createBuiltMeshHTTPHandler;
let meshInstance$;
function getBuiltMesh() {
    if (meshInstance$ == null) {
        meshInstance$ = getMeshOptions().then(meshOptions => (0, runtime_1.getMesh)(meshOptions)).then(mesh => {
            const id = mesh.pubsub.subscribe('destroy', () => {
                meshInstance$ = undefined;
                mesh.pubsub.unsubscribe(id);
            });
            return mesh;
        });
    }
    return meshInstance$;
}
exports.getBuiltMesh = getBuiltMesh;
const execute = (...args) => getBuiltMesh().then(({ execute }) => execute(...args));
exports.execute = execute;
const subscribe = (...args) => getBuiltMesh().then(({ subscribe }) => subscribe(...args));
exports.subscribe = subscribe;
function getMeshSDK(globalContext) {
    const sdkRequester$ = getBuiltMesh().then(({ sdkRequesterFactory }) => sdkRequesterFactory(globalContext));
    return getSdk((...args) => sdkRequester$.then(sdkRequester => sdkRequester(...args)));
}
exports.getMeshSDK = getMeshSDK;
exports.PDA_queryDocument = (0, utils_1.gql) `
    query PDA_query($id: String!) {
  PDA(id: $id) {
    arweaveUrl
    claimHash
    dataAsset {
      claim
      description
      expirationDate
      image
      qrCode
      title
    }
    expirationDate
    hash
    id
    issuanceDate
    issuerHash
    lastUpdated
    ownerHash
    status
  }
}
    `;
exports.PDACount_queryDocument = (0, utils_1.gql) `
    query PDACount_query($filter: FilterPDAInput) {
  PDACount(filter: $filter)
}
    `;
exports.PDAs_queryDocument = (0, utils_1.gql) `
    query PDAs_query($filter: FilterPDAInput, $order: JSON, $skip: Float, $take: Float) {
  PDAs(filter: $filter, order: $order, skip: $skip, take: $take) {
    arweaveUrl
    claimHash
    dataAsset {
      claim
      description
      expirationDate
      image
      qrCode
      title
    }
    expirationDate
    hash
    id
    issuanceDate
    issuerHash
    lastUpdated
    ownerHash
    status
  }
}
    `;
exports.applications_queryDocument = (0, utils_1.gql) `
    query applications_query {
  applications {
    apiKey
    gatewayFacilitationFee
    organization {
      arweaveUrl
      createdAt
      description
      gatewayId
      id
      image
      name
      updatedAt
      usernameUpdatedAt
      verified
      walletId
      website
    }
  }
}
    `;
exports.calculateProofCost_queryDocument = (0, utils_1.gql) `
    query calculateProofCost_query($requestId: String!) {
  calculateProofCost(requestId: $requestId) {
    facilitationFee
    totalCost
  }
}
    `;
exports.checkUsernameAvailability_queryDocument = (0, utils_1.gql) `
    query checkUsernameAvailability_query($username: String!) {
  checkUsernameAvailability(username: $username)
}
    `;
exports.createDepositLink_queryDocument = (0, utils_1.gql) `
    query createDepositLink_query {
  createDepositLink
}
    `;
exports.dataModel_queryDocument = (0, utils_1.gql) `
    query dataModel_query($id: String!) {
  dataModel(id: $id) {
    PDAs {
      arweaveUrl
      claimHash
      expirationDate
      hash
      id
      issuanceDate
      issuerHash
      lastUpdated
      ownerHash
      status
    }
    allowedOrganizations {
      arweaveUrl
      createdAt
      description
      gatewayId
      id
      image
      name
      updatedAt
      usernameUpdatedAt
      verified
      walletId
      website
    }
    allowedUsers {
      arweaveUrl
      createdAt
      credentialsExtraCredits
      dataModelsExtraCredits
      deletedAt
      displayName
      email
      gatewayId
      gatewayIdLastupdate
      gatewayIdUpdatedAt
      hash
      id
      isCompleted
      profilePicture
      roles
      status
      updatedAt
      walletId
    }
    arweaveUrl
    consumptionPrice
    createdAt
    createdBy {
      arweaveUrl
      createdAt
      credentialsExtraCredits
      dataModelsExtraCredits
      deletedAt
      displayName
      email
      gatewayId
      gatewayIdLastupdate
      gatewayIdUpdatedAt
      hash
      id
      isCompleted
      profilePicture
      roles
      status
      updatedAt
      walletId
    }
    description
    featured
    group {
      createdAt
      id
      official
    }
    id
    image
    organization {
      arweaveUrl
      createdAt
      description
      gatewayId
      id
      image
      name
      updatedAt
      usernameUpdatedAt
      verified
      walletId
      website
    }
    pdas {
      arweaveUrl
      claimHash
      expirationDate
      hash
      id
      issuanceDate
      issuerHash
      lastUpdated
      ownerHash
      status
    }
    pdasIssuedCount
    permissioning
    revenueGenerated
    schema
    tags
    title
    uniqueIssuersCount
    verified
  }
}
    `;
exports.dataModels_queryDocument = (0, utils_1.gql) `
    query dataModels_query($filter: FilterDataModelInput, $order: JSON, $skip: Int, $take: Int) {
  dataModels(filter: $filter, order: $order, skip: $skip, take: $take) {
    PDAs {
      arweaveUrl
      claimHash
      expirationDate
      hash
      id
      issuanceDate
      issuerHash
      lastUpdated
      ownerHash
      status
    }
    allowedOrganizations {
      arweaveUrl
      createdAt
      description
      gatewayId
      id
      image
      name
      updatedAt
      usernameUpdatedAt
      verified
      walletId
      website
    }
    allowedUsers {
      arweaveUrl
      createdAt
      credentialsExtraCredits
      dataModelsExtraCredits
      deletedAt
      displayName
      email
      gatewayId
      gatewayIdLastupdate
      gatewayIdUpdatedAt
      hash
      id
      isCompleted
      profilePicture
      roles
      status
      updatedAt
      walletId
    }
    arweaveUrl
    consumptionPrice
    createdAt
    createdBy {
      arweaveUrl
      createdAt
      credentialsExtraCredits
      dataModelsExtraCredits
      deletedAt
      displayName
      email
      gatewayId
      gatewayIdLastupdate
      gatewayIdUpdatedAt
      hash
      id
      isCompleted
      profilePicture
      roles
      status
      updatedAt
      walletId
    }
    description
    featured
    group {
      createdAt
      id
      official
    }
    id
    image
    organization {
      arweaveUrl
      createdAt
      description
      gatewayId
      id
      image
      name
      updatedAt
      usernameUpdatedAt
      verified
      walletId
      website
    }
    pdas {
      arweaveUrl
      claimHash
      expirationDate
      hash
      id
      issuanceDate
      issuerHash
      lastUpdated
      ownerHash
      status
    }
    pdasIssuedCount
    permissioning
    revenueGenerated
    schema
    tags
    title
    uniqueIssuersCount
    verified
  }
}
    `;
exports.dataModelsCount_queryDocument = (0, utils_1.gql) `
    query dataModelsCount_query($filter: FilterDataModelInput) {
  dataModelsCount(filter: $filter)
}
    `;
exports.dataModelsMetadata_queryDocument = (0, utils_1.gql) `
    query dataModelsMetadata_query {
  dataModelsMetadata {
    consumptionPrice
    issuedCount
    tags
  }
}
    `;
exports.dataRequest_queryDocument = (0, utils_1.gql) `
    query dataRequest_query($requestId: String!) {
  dataRequest(requestId: $requestId) {
    arweaveUrl
    createdAt
    dataRequestTemplate {
      arweaveUrl
      createdAt
      dataRequestsCount
      description
      id
      name
      revenueGenerated
      schema
      tags
      uniqueVerifiersCount
    }
    dataUse
    id
    owner {
      arweaveUrl
      createdAt
      credentialsExtraCredits
      dataModelsExtraCredits
      deletedAt
      displayName
      email
      gatewayId
      gatewayIdLastupdate
      gatewayIdUpdatedAt
      hash
      id
      isCompleted
      profilePicture
      roles
      status
      updatedAt
      walletId
    }
    proof {
      arweaveUrl
      createdAt
      facilitationFee
      hash
      id
      proofHash
      status
      totalCost
      updatedAt
    }
    status
    verifier {
      arweaveUrl
      createdAt
      credentialsExtraCredits
      dataModelsExtraCredits
      deletedAt
      displayName
      email
      gatewayId
      gatewayIdLastupdate
      gatewayIdUpdatedAt
      hash
      id
      isCompleted
      profilePicture
      roles
      status
      updatedAt
      walletId
    }
    verifierOrganization {
      arweaveUrl
      createdAt
      description
      gatewayId
      id
      image
      name
      updatedAt
      usernameUpdatedAt
      verified
      walletId
      website
    }
  }
}
    `;
exports.dataRequestCount_queryDocument = (0, utils_1.gql) `
    query dataRequestCount_query($filter: FilterDataRequestInput) {
  dataRequestCount(filter: $filter)
}
    `;
exports.dataRequestStatus_queryDocument = (0, utils_1.gql) `
    query dataRequestStatus_query($requestId: String!) {
  dataRequestStatus(requestId: $requestId)
}
    `;
exports.dataRequestTemplate_queryDocument = (0, utils_1.gql) `
    query dataRequestTemplate_query($id: String!) {
  dataRequestTemplate(id: $id) {
    arweaveUrl
    createdAt
    dataModels {
      arweaveUrl
      consumptionPrice
      createdAt
      description
      featured
      id
      image
      pdasIssuedCount
      permissioning
      revenueGenerated
      schema
      tags
      title
      uniqueIssuersCount
      verified
    }
    dataRequests {
      arweaveUrl
      createdAt
      dataUse
      id
      status
    }
    dataRequestsCount
    description
    id
    name
    organization {
      arweaveUrl
      createdAt
      description
      gatewayId
      id
      image
      name
      updatedAt
      usernameUpdatedAt
      verified
      walletId
      website
    }
    revenueGenerated
    schema
    tags
    uniqueVerifiersCount
    user {
      arweaveUrl
      createdAt
      credentialsExtraCredits
      dataModelsExtraCredits
      deletedAt
      displayName
      email
      gatewayId
      gatewayIdLastupdate
      gatewayIdUpdatedAt
      hash
      id
      isCompleted
      profilePicture
      roles
      status
      updatedAt
      walletId
    }
  }
}
    `;
exports.dataRequestTemplates_queryDocument = (0, utils_1.gql) `
    query dataRequestTemplates_query($filter: FilterDataRequestTemplateInput, $order: JSON, $skip: Int, $take: Float) {
  dataRequestTemplates(filter: $filter, order: $order, skip: $skip, take: $take) {
    arweaveUrl
    createdAt
    dataModels {
      arweaveUrl
      consumptionPrice
      createdAt
      description
      featured
      id
      image
      pdasIssuedCount
      permissioning
      revenueGenerated
      schema
      tags
      title
      uniqueIssuersCount
      verified
    }
    dataRequests {
      arweaveUrl
      createdAt
      dataUse
      id
      status
    }
    dataRequestsCount
    description
    id
    name
    organization {
      arweaveUrl
      createdAt
      description
      gatewayId
      id
      image
      name
      updatedAt
      usernameUpdatedAt
      verified
      walletId
      website
    }
    revenueGenerated
    schema
    tags
    uniqueVerifiersCount
    user {
      arweaveUrl
      createdAt
      credentialsExtraCredits
      dataModelsExtraCredits
      deletedAt
      displayName
      email
      gatewayId
      gatewayIdLastupdate
      gatewayIdUpdatedAt
      hash
      id
      isCompleted
      profilePicture
      roles
      status
      updatedAt
      walletId
    }
  }
}
    `;
exports.dataRequestTemplatesCount_queryDocument = (0, utils_1.gql) `
    query dataRequestTemplatesCount_query($filter: FilterDataRequestTemplateInput) {
  dataRequestTemplatesCount(filter: $filter)
}
    `;
exports.dataRequestTemplatesMetadata_queryDocument = (0, utils_1.gql) `
    query dataRequestTemplatesMetadata_query {
  dataRequestTemplatesMetadata {
    tags
  }
}
    `;
exports.dataRequests_queryDocument = (0, utils_1.gql) `
    query dataRequests_query($filter: FilterDataRequestInput) {
  dataRequests(filter: $filter) {
    arweaveUrl
    createdAt
    dataRequestTemplate {
      arweaveUrl
      createdAt
      dataRequestsCount
      description
      id
      name
      revenueGenerated
      schema
      tags
      uniqueVerifiersCount
    }
    dataUse
    id
    owner {
      arweaveUrl
      createdAt
      credentialsExtraCredits
      dataModelsExtraCredits
      deletedAt
      displayName
      email
      gatewayId
      gatewayIdLastupdate
      gatewayIdUpdatedAt
      hash
      id
      isCompleted
      profilePicture
      roles
      status
      updatedAt
      walletId
    }
    proof {
      arweaveUrl
      createdAt
      facilitationFee
      hash
      id
      proofHash
      status
      totalCost
      updatedAt
    }
    status
    verifier {
      arweaveUrl
      createdAt
      credentialsExtraCredits
      dataModelsExtraCredits
      deletedAt
      displayName
      email
      gatewayId
      gatewayIdLastupdate
      gatewayIdUpdatedAt
      hash
      id
      isCompleted
      profilePicture
      roles
      status
      updatedAt
      walletId
    }
    verifierOrganization {
      arweaveUrl
      createdAt
      description
      gatewayId
      id
      image
      name
      updatedAt
      usernameUpdatedAt
      verified
      walletId
      website
    }
  }
}
    `;
exports.financialTransactions_queryDocument = (0, utils_1.gql) `
    query financialTransactions_query($identifier: TransactionIdentifierInput!, $skip: Int, $take: Int) {
  financialTransactions(identifier: $identifier, skip: $skip, take: $take) {
    action
    createdAt
    fee
    from {
      ... on Organization {
        arweaveUrl
        createdAt
        description
        gatewayId
        id
        image
        name
        updatedAt
        usernameUpdatedAt
        verified
        walletId
        website
      }
      ... on User {
        arweaveUrl
        createdAt
        credentialsExtraCredits
        dataModelsExtraCredits
        deletedAt
        displayName
        email
        gatewayId
        gatewayIdLastupdate
        gatewayIdUpdatedAt
        hash
        id
        isCompleted
        profilePicture
        roles
        status
        updatedAt
        walletId
      }
    }
    id
    memo
    to {
      ... on Organization {
        arweaveUrl
        createdAt
        description
        gatewayId
        id
        image
        name
        updatedAt
        usernameUpdatedAt
        verified
        walletId
        website
      }
      ... on User {
        arweaveUrl
        createdAt
        credentialsExtraCredits
        dataModelsExtraCredits
        deletedAt
        displayName
        email
        gatewayId
        gatewayIdLastupdate
        gatewayIdUpdatedAt
        hash
        id
        isCompleted
        profilePicture
        roles
        status
        updatedAt
        walletId
      }
    }
    total
    transaction {
      action
      arweaveUrl
      cost
      createdAt
      id
      updatedAt
    }
    transactionId
    type
    updatedAt
    value
    wallet {
      balance
      moneyIn
      moneyOut
    }
  }
}
    `;
exports.findValidPDAsForRequest_queryDocument = (0, utils_1.gql) `
    query findValidPDAsForRequest_query($requestId: String!) {
  findValidPDAsForRequest(requestId: $requestId) {
    dataModel {
      arweaveUrl
      consumptionPrice
      createdAt
      description
      featured
      id
      image
      pdasIssuedCount
      permissioning
      revenueGenerated
      schema
      tags
      title
      uniqueIssuersCount
      verified
    }
    pdas {
      arweaveUrl
      claimHash
      expirationDate
      hash
      id
      issuanceDate
      issuerHash
      lastUpdated
      ownerHash
      status
    }
    required
    schema {
      claimValidations
      id
      issuanceDate
      issuers
      organizations
      required
    }
    validData {
      provided
      requested
    }
  }
}
    `;
exports.generatedFees_queryDocument = (0, utils_1.gql) `
    query generatedFees_query {
  generatedFees
}
    `;
exports.getExplorerStats_queryDocument = (0, utils_1.gql) `
    query getExplorerStats_query {
  getExplorerStats {
    dataRequests
    pdasIssued
    totalEarnings
    uniqueIssuers
  }
}
    `;
exports.getMonthlyUserUsage_queryDocument = (0, utils_1.gql) `
    query getMonthlyUserUsage_query {
  getMonthlyUserUsage {
    credentialsUsageAllowedByMonth
    datamodelsUsageAllowedByMonth
    monthlyCredentials
    monthlyDatamodels
  }
}
    `;
exports.getTotalofIssuersByDataModel_queryDocument = (0, utils_1.gql) `
    query getTotalofIssuersByDataModel_query($dataModelId: String!) {
  getTotalofIssuersByDataModel(dataModelId: $dataModelId)
}
    `;
exports.getTransactionsExplorerStats_queryDocument = (0, utils_1.gql) `
    query getTransactionsExplorerStats_query {
  getTransactionsExplorerStats {
    dataRequests
    pdasIssued
    totalEarnings
    totalTransactions
    uniqueIssuers
  }
}
    `;
exports.issuedPDAs_queryDocument = (0, utils_1.gql) `
    query issuedPDAs_query($filter: FilterPDAInput, $order: JSON, $skip: Float, $take: Float) {
  issuedPDAs(filter: $filter, order: $order, skip: $skip, take: $take) {
    arweaveUrl
    claimHash
    dataAsset {
      claim
      description
      expirationDate
      image
      qrCode
      title
    }
    expirationDate
    hash
    id
    issuanceDate
    issuerHash
    lastUpdated
    ownerHash
    status
  }
}
    `;
exports.issuedPDAsCount_queryDocument = (0, utils_1.gql) `
    query issuedPDAsCount_query($filter: FilterPDAInput) {
  issuedPDAsCount(filter: $filter)
}
    `;
exports.issuersByDataModel_queryDocument = (0, utils_1.gql) `
    query issuersByDataModel_query($id: String!) {
  issuersByDataModel(id: $id) {
    count
    issuer {
      ... on Organization {
        arweaveUrl
        createdAt
        description
        gatewayId
        id
        image
        name
        updatedAt
        usernameUpdatedAt
        verified
        walletId
        website
      }
      ... on User {
        arweaveUrl
        createdAt
        credentialsExtraCredits
        dataModelsExtraCredits
        deletedAt
        displayName
        email
        gatewayId
        gatewayIdLastupdate
        gatewayIdUpdatedAt
        hash
        id
        isCompleted
        profilePicture
        roles
        status
        updatedAt
        walletId
      }
    }
  }
}
    `;
exports.issuersByDataModelCount_queryDocument = (0, utils_1.gql) `
    query issuersByDataModelCount_query($id: String!) {
  issuersByDataModelCount(id: $id)
}
    `;
exports.me_queryDocument = (0, utils_1.gql) `
    query me_query {
  me {
    accesses {
      id
      role
    }
    arweaveUrl
    authentications {
      hash
      id
      type
      userId
    }
    createdAt
    credentialsExtraCredits
    dataModels {
      arweaveUrl
      consumptionPrice
      createdAt
      description
      featured
      id
      image
      pdasIssuedCount
      permissioning
      revenueGenerated
      schema
      tags
      title
      uniqueIssuersCount
      verified
    }
    dataModelsExtraCredits
    dataRequestTemplates {
      arweaveUrl
      createdAt
      dataRequestsCount
      description
      id
      name
      revenueGenerated
      schema
      tags
      uniqueVerifiersCount
    }
    deletedAt
    displayName
    email
    gatewayId
    gatewayIdLastupdate
    gatewayIdUpdatedAt
    hash
    id
    isCompleted
    issuedPDAs {
      arweaveUrl
      claimHash
      expirationDate
      hash
      id
      issuanceDate
      issuerHash
      lastUpdated
      ownerHash
      status
    }
    issuedProofs {
      arweaveUrl
      createdAt
      facilitationFee
      hash
      id
      proofHash
      status
      totalCost
      updatedAt
    }
    profilePicture
    receivedPDAs {
      arweaveUrl
      claimHash
      expirationDate
      hash
      id
      issuanceDate
      issuerHash
      lastUpdated
      ownerHash
      status
    }
    receivedProofs {
      arweaveUrl
      createdAt
      facilitationFee
      hash
      id
      proofHash
      status
      totalCost
      updatedAt
    }
    recipientDataRequests {
      arweaveUrl
      createdAt
      dataUse
      id
      status
    }
    roles
    status
    updatedAt
    verifierDataRequests {
      arweaveUrl
      createdAt
      dataUse
      id
      status
    }
    walletId
  }
}
    `;
exports.myDataModelsCount_queryDocument = (0, utils_1.gql) `
    query myDataModelsCount_query($filter: FilterDataModelInput) {
  myDataModelsCount(filter: $filter)
}
    `;
exports.myDataRequestTemplatesCount_queryDocument = (0, utils_1.gql) `
    query myDataRequestTemplatesCount_query($filter: FilterDataRequestTemplateInput) {
  myDataRequestTemplatesCount(filter: $filter)
}
    `;
exports.myFinancialTransactions_queryDocument = (0, utils_1.gql) `
    query myFinancialTransactions_query($organizationId: String, $skip: Int, $take: Int) {
  myFinancialTransactions(
    organizationId: $organizationId
    skip: $skip
    take: $take
  ) {
    action
    createdAt
    fee
    from {
      ... on Organization {
        arweaveUrl
        createdAt
        description
        gatewayId
        id
        image
        name
        updatedAt
        usernameUpdatedAt
        verified
        walletId
        website
      }
      ... on User {
        arweaveUrl
        createdAt
        credentialsExtraCredits
        dataModelsExtraCredits
        deletedAt
        displayName
        email
        gatewayId
        gatewayIdLastupdate
        gatewayIdUpdatedAt
        hash
        id
        isCompleted
        profilePicture
        roles
        status
        updatedAt
        walletId
      }
    }
    id
    memo
    to {
      ... on Organization {
        arweaveUrl
        createdAt
        description
        gatewayId
        id
        image
        name
        updatedAt
        usernameUpdatedAt
        verified
        walletId
        website
      }
      ... on User {
        arweaveUrl
        createdAt
        credentialsExtraCredits
        dataModelsExtraCredits
        deletedAt
        displayName
        email
        gatewayId
        gatewayIdLastupdate
        gatewayIdUpdatedAt
        hash
        id
        isCompleted
        profilePicture
        roles
        status
        updatedAt
        walletId
      }
    }
    total
    transaction {
      action
      arweaveUrl
      cost
      createdAt
      id
      updatedAt
    }
    transactionId
    type
    updatedAt
    value
    wallet {
      balance
      moneyIn
      moneyOut
    }
  }
}
    `;
exports.myFinancialTransactionsCount_queryDocument = (0, utils_1.gql) `
    query myFinancialTransactionsCount_query($organizationId: String) {
  myFinancialTransactionsCount(organizationId: $organizationId)
}
    `;
exports.myPDACount_queryDocument = (0, utils_1.gql) `
    query myPDACount_query($filter: FilterPDAInput) {
  myPDACount(filter: $filter)
}
    `;
exports.myPDAs_queryDocument = (0, utils_1.gql) `
    query myPDAs_query($filter: FilterPDAInput, $order: JSON, $skip: Float, $take: Float) {
  myPDAs(filter: $filter, order: $order, skip: $skip, take: $take) {
    arweaveUrl
    claimHash
    dataAsset {
      claim
      description
      expirationDate
      image
      qrCode
      title
    }
    expirationDate
    hash
    id
    issuanceDate
    issuerHash
    lastUpdated
    ownerHash
    status
  }
}
    `;
exports.myTransactions_queryDocument = (0, utils_1.gql) `
    query myTransactions_query($filter: FilterTransactionsInput) {
  myTransactions(filter: $filter) {
    action
    arweaveUrl
    cost
    createdAt
    financialTransactions {
      action
      createdAt
      fee
      id
      memo
      total
      transactionId
      type
      updatedAt
      value
    }
    from {
      ... on Organization {
        arweaveUrl
        createdAt
        description
        gatewayId
        id
        image
        name
        updatedAt
        usernameUpdatedAt
        verified
        walletId
        website
      }
      ... on User {
        arweaveUrl
        createdAt
        credentialsExtraCredits
        dataModelsExtraCredits
        deletedAt
        displayName
        email
        gatewayId
        gatewayIdLastupdate
        gatewayIdUpdatedAt
        hash
        id
        isCompleted
        profilePicture
        roles
        status
        updatedAt
        walletId
      }
    }
    id
    metadata {
      ... on DataModelMetadata {
        creator
        dataModel
        signedBy
      }
      ... on OrganizationMetadata {
        organization
        users
        usersAdmin
        verified
      }
      ... on PDAMetadata {
        dataModel
        expirationDate
        issuer
        pda
        signedBy
        pdametadastatus
      }
      ... on ProofMetadata {
        earnings
        fees
        owner
        proof
        request
        status
        verifier
      }
      ... on RequestMetadata {
        owner
        requestStringNonNull: request
        requestTemplate
        status
        verifier
      }
      ... on RequestTemplateMetadata {
        creator
        dataModels
        requestTemplate
        signedBy
      }
      ... on UserMetadata {
        user
      }
    }
    to {
      ... on Organization {
        arweaveUrl
        createdAt
        description
        gatewayId
        id
        image
        name
        updatedAt
        usernameUpdatedAt
        verified
        walletId
        website
      }
      ... on User {
        arweaveUrl
        createdAt
        credentialsExtraCredits
        dataModelsExtraCredits
        deletedAt
        displayName
        email
        gatewayId
        gatewayIdLastupdate
        gatewayIdUpdatedAt
        hash
        id
        isCompleted
        profilePicture
        roles
        status
        updatedAt
        walletId
      }
    }
    updatedAt
  }
}
    `;
exports.myWallet_queryDocument = (0, utils_1.gql) `
    query myWallet_query($organizationId: String) {
  myWallet(organizationId: $organizationId) {
    balance
    moneyIn
    moneyInSummary {
      action
      amount
    }
    moneyOut
    moneyOutSummary {
      action
      amount
    }
  }
}
    `;
exports.organization_queryDocument = (0, utils_1.gql) `
    query organization_query($input: OrganizationIdentificationInput!) {
  organization(input: $input) {
    accesses {
      id
      role
    }
    arweaveUrl
    createdAt
    dataModels {
      arweaveUrl
      consumptionPrice
      createdAt
      description
      featured
      id
      image
      pdasIssuedCount
      permissioning
      revenueGenerated
      schema
      tags
      title
      uniqueIssuersCount
      verified
    }
    dataRequestTemplates {
      arweaveUrl
      createdAt
      dataRequestsCount
      description
      id
      name
      revenueGenerated
      schema
      tags
      uniqueVerifiersCount
    }
    description
    gatewayId
    id
    image
    name
    receivedProofs {
      arweaveUrl
      createdAt
      facilitationFee
      hash
      id
      proofHash
      status
      totalCost
      updatedAt
    }
    updatedAt
    usernameUpdatedAt
    verified
    verifierDataRequests {
      arweaveUrl
      createdAt
      dataUse
      id
      status
    }
    walletId
    website
  }
}
    `;
exports.organizations_queryDocument = (0, utils_1.gql) `
    query organizations_query($filter: FilterOrganizationInput, $skip: Float, $take: Float) {
  organizations(filter: $filter, skip: $skip, take: $take) {
    accesses {
      id
      role
    }
    arweaveUrl
    createdAt
    dataModels {
      arweaveUrl
      consumptionPrice
      createdAt
      description
      featured
      id
      image
      pdasIssuedCount
      permissioning
      revenueGenerated
      schema
      tags
      title
      uniqueIssuersCount
      verified
    }
    dataRequestTemplates {
      arweaveUrl
      createdAt
      dataRequestsCount
      description
      id
      name
      revenueGenerated
      schema
      tags
      uniqueVerifiersCount
    }
    description
    gatewayId
    id
    image
    name
    receivedProofs {
      arweaveUrl
      createdAt
      facilitationFee
      hash
      id
      proofHash
      status
      totalCost
      updatedAt
    }
    updatedAt
    usernameUpdatedAt
    verified
    verifierDataRequests {
      arweaveUrl
      createdAt
      dataUse
      id
      status
    }
    walletId
    website
  }
}
    `;
exports.proof_queryDocument = (0, utils_1.gql) `
    query proof_query($id: String!) {
  proof(id: $id) {
    arweaveUrl
    createdAt
    data {
      raw
    }
    dataRequest {
      arweaveUrl
      createdAt
      dataUse
      id
      status
    }
    facilitationFee
    hash
    id
    owner {
      arweaveUrl
      createdAt
      credentialsExtraCredits
      dataModelsExtraCredits
      deletedAt
      displayName
      email
      gatewayId
      gatewayIdLastupdate
      gatewayIdUpdatedAt
      hash
      id
      isCompleted
      profilePicture
      roles
      status
      updatedAt
      walletId
    }
    proofHash
    status
    totalCost
    updatedAt
    verifier {
      arweaveUrl
      createdAt
      credentialsExtraCredits
      dataModelsExtraCredits
      deletedAt
      displayName
      email
      gatewayId
      gatewayIdLastupdate
      gatewayIdUpdatedAt
      hash
      id
      isCompleted
      profilePicture
      roles
      status
      updatedAt
      walletId
    }
    verifierOrganization {
      arweaveUrl
      createdAt
      description
      gatewayId
      id
      image
      name
      updatedAt
      usernameUpdatedAt
      verified
      walletId
      website
    }
  }
}
    `;
exports.proofs_queryDocument = (0, utils_1.gql) `
    query proofs_query($filter: FilterProofInput, $order: JSON, $skip: Float, $take: Float) {
  proofs(filter: $filter, order: $order, skip: $skip, take: $take) {
    arweaveUrl
    createdAt
    data {
      raw
    }
    dataRequest {
      arweaveUrl
      createdAt
      dataUse
      id
      status
    }
    facilitationFee
    hash
    id
    owner {
      arweaveUrl
      createdAt
      credentialsExtraCredits
      dataModelsExtraCredits
      deletedAt
      displayName
      email
      gatewayId
      gatewayIdLastupdate
      gatewayIdUpdatedAt
      hash
      id
      isCompleted
      profilePicture
      roles
      status
      updatedAt
      walletId
    }
    proofHash
    status
    totalCost
    updatedAt
    verifier {
      arweaveUrl
      createdAt
      credentialsExtraCredits
      dataModelsExtraCredits
      deletedAt
      displayName
      email
      gatewayId
      gatewayIdLastupdate
      gatewayIdUpdatedAt
      hash
      id
      isCompleted
      profilePicture
      roles
      status
      updatedAt
      walletId
    }
    verifierOrganization {
      arweaveUrl
      createdAt
      description
      gatewayId
      id
      image
      name
      updatedAt
      usernameUpdatedAt
      verified
      walletId
      website
    }
  }
}
    `;
exports.proofsByPDAIds_queryDocument = (0, utils_1.gql) `
    query proofsByPDAIds_query($pdaIds: [String!]!, $skip: Float, $take: Float) {
  proofsByPDAIds(pdaIds: $pdaIds, skip: $skip, take: $take) {
    arweaveUrl
    createdAt
    data {
      raw
    }
    dataRequest {
      arweaveUrl
      createdAt
      dataUse
      id
      status
    }
    facilitationFee
    hash
    id
    owner {
      arweaveUrl
      createdAt
      credentialsExtraCredits
      dataModelsExtraCredits
      deletedAt
      displayName
      email
      gatewayId
      gatewayIdLastupdate
      gatewayIdUpdatedAt
      hash
      id
      isCompleted
      profilePicture
      roles
      status
      updatedAt
      walletId
    }
    proofHash
    status
    totalCost
    updatedAt
    verifier {
      arweaveUrl
      createdAt
      credentialsExtraCredits
      dataModelsExtraCredits
      deletedAt
      displayName
      email
      gatewayId
      gatewayIdLastupdate
      gatewayIdUpdatedAt
      hash
      id
      isCompleted
      profilePicture
      roles
      status
      updatedAt
      walletId
    }
    verifierOrganization {
      arweaveUrl
      createdAt
      description
      gatewayId
      id
      image
      name
      updatedAt
      usernameUpdatedAt
      verified
      walletId
      website
    }
  }
}
    `;
exports.receivedProofs_queryDocument = (0, utils_1.gql) `
    query receivedProofs_query($order: JSON, $organizationId: String, $skip: Float, $take: Float) {
  receivedProofs(
    order: $order
    organizationId: $organizationId
    skip: $skip
    take: $take
  ) {
    arweaveUrl
    createdAt
    data {
      raw
    }
    dataRequest {
      arweaveUrl
      createdAt
      dataUse
      id
      status
    }
    facilitationFee
    hash
    id
    owner {
      arweaveUrl
      createdAt
      credentialsExtraCredits
      dataModelsExtraCredits
      deletedAt
      displayName
      email
      gatewayId
      gatewayIdLastupdate
      gatewayIdUpdatedAt
      hash
      id
      isCompleted
      profilePicture
      roles
      status
      updatedAt
      walletId
    }
    proofHash
    status
    totalCost
    updatedAt
    verifier {
      arweaveUrl
      createdAt
      credentialsExtraCredits
      dataModelsExtraCredits
      deletedAt
      displayName
      email
      gatewayId
      gatewayIdLastupdate
      gatewayIdUpdatedAt
      hash
      id
      isCompleted
      profilePicture
      roles
      status
      updatedAt
      walletId
    }
    verifierOrganization {
      arweaveUrl
      createdAt
      description
      gatewayId
      id
      image
      name
      updatedAt
      usernameUpdatedAt
      verified
      walletId
      website
    }
  }
}
    `;
exports.receivedProofsCount_queryDocument = (0, utils_1.gql) `
    query receivedProofsCount_query($organizationId: String) {
  receivedProofsCount(organizationId: $organizationId)
}
    `;
exports.requestsReceived_queryDocument = (0, utils_1.gql) `
    query requestsReceived_query($filter: FilterDataRequestInput, $order: JSON, $skip: Float, $take: Float) {
  requestsReceived(filter: $filter, order: $order, skip: $skip, take: $take) {
    arweaveUrl
    createdAt
    dataRequestTemplate {
      arweaveUrl
      createdAt
      dataRequestsCount
      description
      id
      name
      revenueGenerated
      schema
      tags
      uniqueVerifiersCount
    }
    dataUse
    id
    owner {
      arweaveUrl
      createdAt
      credentialsExtraCredits
      dataModelsExtraCredits
      deletedAt
      displayName
      email
      gatewayId
      gatewayIdLastupdate
      gatewayIdUpdatedAt
      hash
      id
      isCompleted
      profilePicture
      roles
      status
      updatedAt
      walletId
    }
    proof {
      arweaveUrl
      createdAt
      facilitationFee
      hash
      id
      proofHash
      status
      totalCost
      updatedAt
    }
    status
    verifier {
      arweaveUrl
      createdAt
      credentialsExtraCredits
      dataModelsExtraCredits
      deletedAt
      displayName
      email
      gatewayId
      gatewayIdLastupdate
      gatewayIdUpdatedAt
      hash
      id
      isCompleted
      profilePicture
      roles
      status
      updatedAt
      walletId
    }
    verifierOrganization {
      arweaveUrl
      createdAt
      description
      gatewayId
      id
      image
      name
      updatedAt
      usernameUpdatedAt
      verified
      walletId
      website
    }
  }
}
    `;
exports.requestsReceivedCount_queryDocument = (0, utils_1.gql) `
    query requestsReceivedCount_query($filter: FilterDataRequestInput) {
  requestsReceivedCount(filter: $filter)
}
    `;
exports.requestsSent_queryDocument = (0, utils_1.gql) `
    query requestsSent_query($filter: FilterDataRequestInput, $order: JSON, $skip: Float, $take: Float) {
  requestsSent(filter: $filter, order: $order, skip: $skip, take: $take) {
    arweaveUrl
    createdAt
    dataRequestTemplate {
      arweaveUrl
      createdAt
      dataRequestsCount
      description
      id
      name
      revenueGenerated
      schema
      tags
      uniqueVerifiersCount
    }
    dataUse
    id
    owner {
      arweaveUrl
      createdAt
      credentialsExtraCredits
      dataModelsExtraCredits
      deletedAt
      displayName
      email
      gatewayId
      gatewayIdLastupdate
      gatewayIdUpdatedAt
      hash
      id
      isCompleted
      profilePicture
      roles
      status
      updatedAt
      walletId
    }
    proof {
      arweaveUrl
      createdAt
      facilitationFee
      hash
      id
      proofHash
      status
      totalCost
      updatedAt
    }
    status
    verifier {
      arweaveUrl
      createdAt
      credentialsExtraCredits
      dataModelsExtraCredits
      deletedAt
      displayName
      email
      gatewayId
      gatewayIdLastupdate
      gatewayIdUpdatedAt
      hash
      id
      isCompleted
      profilePicture
      roles
      status
      updatedAt
      walletId
    }
    verifierOrganization {
      arweaveUrl
      createdAt
      description
      gatewayId
      id
      image
      name
      updatedAt
      usernameUpdatedAt
      verified
      walletId
      website
    }
  }
}
    `;
exports.requestsSentCount_queryDocument = (0, utils_1.gql) `
    query requestsSentCount_query($filter: FilterDataRequestInput) {
  requestsSentCount(filter: $filter)
}
    `;
exports.sentProofs_queryDocument = (0, utils_1.gql) `
    query sentProofs_query($order: JSON, $skip: Float, $take: Float) {
  sentProofs(order: $order, skip: $skip, take: $take) {
    arweaveUrl
    createdAt
    data {
      raw
    }
    dataRequest {
      arweaveUrl
      createdAt
      dataUse
      id
      status
    }
    facilitationFee
    hash
    id
    owner {
      arweaveUrl
      createdAt
      credentialsExtraCredits
      dataModelsExtraCredits
      deletedAt
      displayName
      email
      gatewayId
      gatewayIdLastupdate
      gatewayIdUpdatedAt
      hash
      id
      isCompleted
      profilePicture
      roles
      status
      updatedAt
      walletId
    }
    proofHash
    status
    totalCost
    updatedAt
    verifier {
      arweaveUrl
      createdAt
      credentialsExtraCredits
      dataModelsExtraCredits
      deletedAt
      displayName
      email
      gatewayId
      gatewayIdLastupdate
      gatewayIdUpdatedAt
      hash
      id
      isCompleted
      profilePicture
      roles
      status
      updatedAt
      walletId
    }
    verifierOrganization {
      arweaveUrl
      createdAt
      description
      gatewayId
      id
      image
      name
      updatedAt
      usernameUpdatedAt
      verified
      walletId
      website
    }
  }
}
    `;
exports.sentProofsCount_queryDocument = (0, utils_1.gql) `
    query sentProofsCount_query {
  sentProofsCount
}
    `;
exports.templateByDataRequest_queryDocument = (0, utils_1.gql) `
    query templateByDataRequest_query($requestID: String!) {
  templateByDataRequest(requestID: $requestID) {
    arweaveUrl
    createdAt
    dataModels {
      arweaveUrl
      consumptionPrice
      createdAt
      description
      featured
      id
      image
      pdasIssuedCount
      permissioning
      revenueGenerated
      schema
      tags
      title
      uniqueIssuersCount
      verified
    }
    dataRequests {
      arweaveUrl
      createdAt
      dataUse
      id
      status
    }
    dataRequestsCount
    description
    id
    name
    organization {
      arweaveUrl
      createdAt
      description
      gatewayId
      id
      image
      name
      updatedAt
      usernameUpdatedAt
      verified
      walletId
      website
    }
    revenueGenerated
    schema
    tags
    uniqueVerifiersCount
    user {
      arweaveUrl
      createdAt
      credentialsExtraCredits
      dataModelsExtraCredits
      deletedAt
      displayName
      email
      gatewayId
      gatewayIdLastupdate
      gatewayIdUpdatedAt
      hash
      id
      isCompleted
      profilePicture
      roles
      status
      updatedAt
      walletId
    }
  }
}
    `;
exports.transaction_queryDocument = (0, utils_1.gql) `
    query transaction_query($id: String!) {
  transaction(id: $id) {
    action
    arweaveUrl
    cost
    createdAt
    financialTransactions {
      action
      createdAt
      fee
      id
      memo
      total
      transactionId
      type
      updatedAt
      value
    }
    from {
      ... on Organization {
        arweaveUrl
        createdAt
        description
        gatewayId
        id
        image
        name
        updatedAt
        usernameUpdatedAt
        verified
        walletId
        website
      }
      ... on User {
        arweaveUrl
        createdAt
        credentialsExtraCredits
        dataModelsExtraCredits
        deletedAt
        displayName
        email
        gatewayId
        gatewayIdLastupdate
        gatewayIdUpdatedAt
        hash
        id
        isCompleted
        profilePicture
        roles
        status
        updatedAt
        walletId
      }
    }
    id
    metadata {
      ... on DataModelMetadata {
        creator
        dataModel
        signedBy
      }
      ... on OrganizationMetadata {
        organization
        users
        usersAdmin
        verified
      }
      ... on PDAMetadata {
        dataModel
        expirationDate
        issuer
        pda
        signedBy
        pdametadastatus
      }
      ... on ProofMetadata {
        earnings
        fees
        owner
        proof
        request
        status
        verifier
      }
      ... on RequestMetadata {
        owner
        requestStringNonNull: request
        requestTemplate
        status
        verifier
      }
      ... on RequestTemplateMetadata {
        creator
        dataModels
        requestTemplate
        signedBy
      }
      ... on UserMetadata {
        user
      }
    }
    to {
      ... on Organization {
        arweaveUrl
        createdAt
        description
        gatewayId
        id
        image
        name
        updatedAt
        usernameUpdatedAt
        verified
        walletId
        website
      }
      ... on User {
        arweaveUrl
        createdAt
        credentialsExtraCredits
        dataModelsExtraCredits
        deletedAt
        displayName
        email
        gatewayId
        gatewayIdLastupdate
        gatewayIdUpdatedAt
        hash
        id
        isCompleted
        profilePicture
        roles
        status
        updatedAt
        walletId
      }
    }
    updatedAt
  }
}
    `;
exports.transactions_queryDocument = (0, utils_1.gql) `
    query transactions_query($filter: FilterTransactionsInput) {
  transactions(filter: $filter) {
    action
    arweaveUrl
    cost
    createdAt
    financialTransactions {
      action
      createdAt
      fee
      id
      memo
      total
      transactionId
      type
      updatedAt
      value
    }
    from {
      ... on Organization {
        arweaveUrl
        createdAt
        description
        gatewayId
        id
        image
        name
        updatedAt
        usernameUpdatedAt
        verified
        walletId
        website
      }
      ... on User {
        arweaveUrl
        createdAt
        credentialsExtraCredits
        dataModelsExtraCredits
        deletedAt
        displayName
        email
        gatewayId
        gatewayIdLastupdate
        gatewayIdUpdatedAt
        hash
        id
        isCompleted
        profilePicture
        roles
        status
        updatedAt
        walletId
      }
    }
    id
    metadata {
      ... on DataModelMetadata {
        creator
        dataModel
        signedBy
      }
      ... on OrganizationMetadata {
        organization
        users
        usersAdmin
        verified
      }
      ... on PDAMetadata {
        dataModel
        expirationDate
        issuer
        pda
        signedBy
        pdametadastatus
      }
      ... on ProofMetadata {
        earnings
        fees
        owner
        proof
        request
        status
        verifier
      }
      ... on RequestMetadata {
        owner
        requestStringNonNull: request
        requestTemplate
        status
        verifier
      }
      ... on RequestTemplateMetadata {
        creator
        dataModels
        requestTemplate
        signedBy
      }
      ... on UserMetadata {
        user
      }
    }
    to {
      ... on Organization {
        arweaveUrl
        createdAt
        description
        gatewayId
        id
        image
        name
        updatedAt
        usernameUpdatedAt
        verified
        walletId
        website
      }
      ... on User {
        arweaveUrl
        createdAt
        credentialsExtraCredits
        dataModelsExtraCredits
        deletedAt
        displayName
        email
        gatewayId
        gatewayIdLastupdate
        gatewayIdUpdatedAt
        hash
        id
        isCompleted
        profilePicture
        roles
        status
        updatedAt
        walletId
      }
    }
    updatedAt
  }
}
    `;
exports.transactionsCount_queryDocument = (0, utils_1.gql) `
    query transactionsCount_query($showMoneyTxs: Boolean) {
  transactionsCount(showMoneyTxs: $showMoneyTxs)
}
    `;
exports.user_queryDocument = (0, utils_1.gql) `
    query user_query($input: UserIdentificationInput!) {
  user(input: $input) {
    accesses {
      id
      role
    }
    arweaveUrl
    authentications {
      hash
      id
      type
      userId
    }
    createdAt
    credentialsExtraCredits
    dataModels {
      arweaveUrl
      consumptionPrice
      createdAt
      description
      featured
      id
      image
      pdasIssuedCount
      permissioning
      revenueGenerated
      schema
      tags
      title
      uniqueIssuersCount
      verified
    }
    dataModelsExtraCredits
    dataRequestTemplates {
      arweaveUrl
      createdAt
      dataRequestsCount
      description
      id
      name
      revenueGenerated
      schema
      tags
      uniqueVerifiersCount
    }
    deletedAt
    displayName
    email
    gatewayId
    gatewayIdLastupdate
    gatewayIdUpdatedAt
    hash
    id
    isCompleted
    issuedPDAs {
      arweaveUrl
      claimHash
      expirationDate
      hash
      id
      issuanceDate
      issuerHash
      lastUpdated
      ownerHash
      status
    }
    issuedProofs {
      arweaveUrl
      createdAt
      facilitationFee
      hash
      id
      proofHash
      status
      totalCost
      updatedAt
    }
    profilePicture
    receivedPDAs {
      arweaveUrl
      claimHash
      expirationDate
      hash
      id
      issuanceDate
      issuerHash
      lastUpdated
      ownerHash
      status
    }
    receivedProofs {
      arweaveUrl
      createdAt
      facilitationFee
      hash
      id
      proofHash
      status
      totalCost
      updatedAt
    }
    recipientDataRequests {
      arweaveUrl
      createdAt
      dataUse
      id
      status
    }
    roles
    status
    updatedAt
    verifierDataRequests {
      arweaveUrl
      createdAt
      dataUse
      id
      status
    }
    walletId
  }
}
    `;
exports.verifiersByDataRequestTemplate_queryDocument = (0, utils_1.gql) `
    query verifiersByDataRequestTemplate_query($id: String!) {
  verifiersByDataRequestTemplate(id: $id) {
    count
    verifier {
      ... on Organization {
        arweaveUrl
        createdAt
        description
        gatewayId
        id
        image
        name
        updatedAt
        usernameUpdatedAt
        verified
        walletId
        website
      }
      ... on User {
        arweaveUrl
        createdAt
        credentialsExtraCredits
        dataModelsExtraCredits
        deletedAt
        displayName
        email
        gatewayId
        gatewayIdLastupdate
        gatewayIdUpdatedAt
        hash
        id
        isCompleted
        profilePicture
        roles
        status
        updatedAt
        walletId
      }
    }
  }
}
    `;
exports.verifiersByDataRequestTemplateCount_queryDocument = (0, utils_1.gql) `
    query verifiersByDataRequestTemplateCount_query($id: String!) {
  verifiersByDataRequestTemplateCount(id: $id)
}
    `;
exports.addEmail_mutationDocument = (0, utils_1.gql) `
    mutation addEmail_mutation($input: AddEmailInput!) {
  addEmail(input: $input) {
    code
    email
  }
}
    `;
exports.addEmailConfirmation_mutationDocument = (0, utils_1.gql) `
    mutation addEmailConfirmation_mutation($input: AddEmailConfirmationInput!) {
  addEmailConfirmation(input: $input) {
    user {
      arweaveUrl
      createdAt
      credentialsExtraCredits
      dataModelsExtraCredits
      deletedAt
      displayName
      email
      gatewayId
      gatewayIdLastupdate
      gatewayIdUpdatedAt
      hash
      id
      isCompleted
      profilePicture
      roles
      status
      updatedAt
      walletId
    }
  }
}
    `;
exports.addMemberToOrganization_mutationDocument = (0, utils_1.gql) `
    mutation addMemberToOrganization_mutation($input: MemberInput!) {
  addMemberToOrganization(input: $input) {
    id
    organization {
      arweaveUrl
      createdAt
      description
      gatewayId
      id
      image
      name
      updatedAt
      usernameUpdatedAt
      verified
      walletId
      website
    }
    role
    user {
      arweaveUrl
      createdAt
      credentialsExtraCredits
      dataModelsExtraCredits
      deletedAt
      displayName
      email
      gatewayId
      gatewayIdLastupdate
      gatewayIdUpdatedAt
      hash
      id
      isCompleted
      profilePicture
      roles
      status
      updatedAt
      walletId
    }
  }
}
    `;
exports.addWallet_mutationDocument = (0, utils_1.gql) `
    mutation addWallet_mutation($input: CreateWalletNonceInput!) {
  addWallet(input: $input) {
    message
  }
}
    `;
exports.addWalletConfirmation_mutationDocument = (0, utils_1.gql) `
    mutation addWalletConfirmation_mutation($input: AddWalletConfirmationInput!) {
  addWalletConfirmation(input: $input) {
    accesses {
      id
      role
    }
    arweaveUrl
    authentications {
      hash
      id
      type
      userId
    }
    createdAt
    credentialsExtraCredits
    dataModels {
      arweaveUrl
      consumptionPrice
      createdAt
      description
      featured
      id
      image
      pdasIssuedCount
      permissioning
      revenueGenerated
      schema
      tags
      title
      uniqueIssuersCount
      verified
    }
    dataModelsExtraCredits
    dataRequestTemplates {
      arweaveUrl
      createdAt
      dataRequestsCount
      description
      id
      name
      revenueGenerated
      schema
      tags
      uniqueVerifiersCount
    }
    deletedAt
    displayName
    email
    gatewayId
    gatewayIdLastupdate
    gatewayIdUpdatedAt
    hash
    id
    isCompleted
    issuedPDAs {
      arweaveUrl
      claimHash
      expirationDate
      hash
      id
      issuanceDate
      issuerHash
      lastUpdated
      ownerHash
      status
    }
    issuedProofs {
      arweaveUrl
      createdAt
      facilitationFee
      hash
      id
      proofHash
      status
      totalCost
      updatedAt
    }
    profilePicture
    receivedPDAs {
      arweaveUrl
      claimHash
      expirationDate
      hash
      id
      issuanceDate
      issuerHash
      lastUpdated
      ownerHash
      status
    }
    receivedProofs {
      arweaveUrl
      createdAt
      facilitationFee
      hash
      id
      proofHash
      status
      totalCost
      updatedAt
    }
    recipientDataRequests {
      arweaveUrl
      createdAt
      dataUse
      id
      status
    }
    roles
    status
    updatedAt
    verifierDataRequests {
      arweaveUrl
      createdAt
      dataUse
      id
      status
    }
    walletId
  }
}
    `;
exports.changeMemberRole_mutationDocument = (0, utils_1.gql) `
    mutation changeMemberRole_mutation($input: MemberInput!) {
  changeMemberRole(input: $input) {
    id
    organization {
      arweaveUrl
      createdAt
      description
      gatewayId
      id
      image
      name
      updatedAt
      usernameUpdatedAt
      verified
      walletId
      website
    }
    role
    user {
      arweaveUrl
      createdAt
      credentialsExtraCredits
      dataModelsExtraCredits
      deletedAt
      displayName
      email
      gatewayId
      gatewayIdLastupdate
      gatewayIdUpdatedAt
      hash
      id
      isCompleted
      profilePicture
      roles
      status
      updatedAt
      walletId
    }
  }
}
    `;
exports.changePDAStatus_mutationDocument = (0, utils_1.gql) `
    mutation changePDAStatus_mutation($input: UpdatePDAStatusInput!) {
  changePDAStatus(input: $input) {
    arweaveUrl
    claimHash
    dataAsset {
      claim
      description
      expirationDate
      image
      qrCode
      title
    }
    expirationDate
    hash
    id
    issuanceDate
    issuerHash
    lastUpdated
    ownerHash
    status
  }
}
    `;
exports.createApplication_mutationDocument = (0, utils_1.gql) `
    mutation createApplication_mutation($input: CreateApplicationInput!) {
  createApplication(input: $input) {
    apiKey
    gatewayFacilitationFee
    organization {
      arweaveUrl
      createdAt
      description
      gatewayId
      id
      image
      name
      updatedAt
      usernameUpdatedAt
      verified
      walletId
      website
    }
  }
}
    `;
exports.createDataModel_mutationDocument = (0, utils_1.gql) `
    mutation createDataModel_mutation($input: CreateDataModelInput!) {
  createDataModel(input: $input) {
    PDAs {
      arweaveUrl
      claimHash
      expirationDate
      hash
      id
      issuanceDate
      issuerHash
      lastUpdated
      ownerHash
      status
    }
    allowedOrganizations {
      arweaveUrl
      createdAt
      description
      gatewayId
      id
      image
      name
      updatedAt
      usernameUpdatedAt
      verified
      walletId
      website
    }
    allowedUsers {
      arweaveUrl
      createdAt
      credentialsExtraCredits
      dataModelsExtraCredits
      deletedAt
      displayName
      email
      gatewayId
      gatewayIdLastupdate
      gatewayIdUpdatedAt
      hash
      id
      isCompleted
      profilePicture
      roles
      status
      updatedAt
      walletId
    }
    arweaveUrl
    consumptionPrice
    createdAt
    createdBy {
      arweaveUrl
      createdAt
      credentialsExtraCredits
      dataModelsExtraCredits
      deletedAt
      displayName
      email
      gatewayId
      gatewayIdLastupdate
      gatewayIdUpdatedAt
      hash
      id
      isCompleted
      profilePicture
      roles
      status
      updatedAt
      walletId
    }
    description
    featured
    group {
      createdAt
      id
      official
    }
    id
    image
    organization {
      arweaveUrl
      createdAt
      description
      gatewayId
      id
      image
      name
      updatedAt
      usernameUpdatedAt
      verified
      walletId
      website
    }
    pdas {
      arweaveUrl
      claimHash
      expirationDate
      hash
      id
      issuanceDate
      issuerHash
      lastUpdated
      ownerHash
      status
    }
    pdasIssuedCount
    permissioning
    revenueGenerated
    schema
    tags
    title
    uniqueIssuersCount
    verified
  }
}
    `;
exports.createDataRequest_mutationDocument = (0, utils_1.gql) `
    mutation createDataRequest_mutation($input: DataRequestSchemaInput!) {
  createDataRequest(input: $input) {
    arweaveUrl
    createdAt
    dataRequestTemplate {
      arweaveUrl
      createdAt
      dataRequestsCount
      description
      id
      name
      revenueGenerated
      schema
      tags
      uniqueVerifiersCount
    }
    dataUse
    id
    owner {
      arweaveUrl
      createdAt
      credentialsExtraCredits
      dataModelsExtraCredits
      deletedAt
      displayName
      email
      gatewayId
      gatewayIdLastupdate
      gatewayIdUpdatedAt
      hash
      id
      isCompleted
      profilePicture
      roles
      status
      updatedAt
      walletId
    }
    proof {
      arweaveUrl
      createdAt
      facilitationFee
      hash
      id
      proofHash
      status
      totalCost
      updatedAt
    }
    status
    verifier {
      arweaveUrl
      createdAt
      credentialsExtraCredits
      dataModelsExtraCredits
      deletedAt
      displayName
      email
      gatewayId
      gatewayIdLastupdate
      gatewayIdUpdatedAt
      hash
      id
      isCompleted
      profilePicture
      roles
      status
      updatedAt
      walletId
    }
    verifierOrganization {
      arweaveUrl
      createdAt
      description
      gatewayId
      id
      image
      name
      updatedAt
      usernameUpdatedAt
      verified
      walletId
      website
    }
  }
}
    `;
exports.createDataRequestTemplate_mutationDocument = (0, utils_1.gql) `
    mutation createDataRequestTemplate_mutation($input: TemplateSchemaInput!) {
  createDataRequestTemplate(input: $input) {
    arweaveUrl
    createdAt
    dataModels {
      arweaveUrl
      consumptionPrice
      createdAt
      description
      featured
      id
      image
      pdasIssuedCount
      permissioning
      revenueGenerated
      schema
      tags
      title
      uniqueIssuersCount
      verified
    }
    dataRequests {
      arweaveUrl
      createdAt
      dataUse
      id
      status
    }
    dataRequestsCount
    description
    id
    name
    organization {
      arweaveUrl
      createdAt
      description
      gatewayId
      id
      image
      name
      updatedAt
      usernameUpdatedAt
      verified
      walletId
      website
    }
    revenueGenerated
    schema
    tags
    uniqueVerifiersCount
    user {
      arweaveUrl
      createdAt
      credentialsExtraCredits
      dataModelsExtraCredits
      deletedAt
      displayName
      email
      gatewayId
      gatewayIdLastupdate
      gatewayIdUpdatedAt
      hash
      id
      isCompleted
      profilePicture
      roles
      status
      updatedAt
      walletId
    }
  }
}
    `;
exports.createEmailNonce_mutationDocument = (0, utils_1.gql) `
    mutation createEmailNonce_mutation($input: CreateEmailNonceInput!) {
  createEmailNonce(input: $input) {
    code
    email
  }
}
    `;
exports.createOrganization_mutationDocument = (0, utils_1.gql) `
    mutation createOrganization_mutation($input: CreateOrganizationInput!) {
  createOrganization(input: $input) {
    accesses {
      id
      role
    }
    arweaveUrl
    createdAt
    dataModels {
      arweaveUrl
      consumptionPrice
      createdAt
      description
      featured
      id
      image
      pdasIssuedCount
      permissioning
      revenueGenerated
      schema
      tags
      title
      uniqueIssuersCount
      verified
    }
    dataRequestTemplates {
      arweaveUrl
      createdAt
      dataRequestsCount
      description
      id
      name
      revenueGenerated
      schema
      tags
      uniqueVerifiersCount
    }
    description
    gatewayId
    id
    image
    name
    receivedProofs {
      arweaveUrl
      createdAt
      facilitationFee
      hash
      id
      proofHash
      status
      totalCost
      updatedAt
    }
    updatedAt
    usernameUpdatedAt
    verified
    verifierDataRequests {
      arweaveUrl
      createdAt
      dataUse
      id
      status
    }
    walletId
    website
  }
}
    `;
exports.createPDA_mutationDocument = (0, utils_1.gql) `
    mutation createPDA_mutation($input: CreatePDAInput!) {
  createPDA(input: $input) {
    arweaveUrl
    claimHash
    dataAsset {
      claim
      description
      expirationDate
      image
      qrCode
      title
    }
    expirationDate
    hash
    id
    issuanceDate
    issuerHash
    lastUpdated
    ownerHash
    status
  }
}
    `;
exports.createProof_mutationDocument = (0, utils_1.gql) `
    mutation createProof_mutation($claims: JSON, $requestId: String, $signature: String, $verifier: IdentificationInput, $wallet: String) {
  createProof(
    claims: $claims
    requestId: $requestId
    signature: $signature
    verifier: $verifier
    wallet: $wallet
  ) {
    arweaveUrl
    createdAt
    data {
      raw
    }
    dataRequest {
      arweaveUrl
      createdAt
      dataUse
      id
      status
    }
    facilitationFee
    hash
    id
    owner {
      arweaveUrl
      createdAt
      credentialsExtraCredits
      dataModelsExtraCredits
      deletedAt
      displayName
      email
      gatewayId
      gatewayIdLastupdate
      gatewayIdUpdatedAt
      hash
      id
      isCompleted
      profilePicture
      roles
      status
      updatedAt
      walletId
    }
    proofHash
    status
    totalCost
    updatedAt
    verifier {
      arweaveUrl
      createdAt
      credentialsExtraCredits
      dataModelsExtraCredits
      deletedAt
      displayName
      email
      gatewayId
      gatewayIdLastupdate
      gatewayIdUpdatedAt
      hash
      id
      isCompleted
      profilePicture
      roles
      status
      updatedAt
      walletId
    }
    verifierOrganization {
      arweaveUrl
      createdAt
      description
      gatewayId
      id
      image
      name
      updatedAt
      usernameUpdatedAt
      verified
      walletId
      website
    }
  }
}
    `;
exports.createProofMessage_mutationDocument = (0, utils_1.gql) `
    mutation createProofMessage_mutation($requestId: String!) {
  createProofMessage(requestId: $requestId)
}
    `;
exports.createWalletNonce_mutationDocument = (0, utils_1.gql) `
    mutation createWalletNonce_mutation($input: CreateWalletNonceInput!) {
  createWalletNonce(input: $input) {
    message
  }
}
    `;
exports.deleteAccount_mutationDocument = (0, utils_1.gql) `
    mutation deleteAccount_mutation($id: String!) {
  deleteAccount(id: $id)
}
    `;
exports.loginEmail_mutationDocument = (0, utils_1.gql) `
    mutation loginEmail_mutation($input: LoginEmailInput!) {
  loginEmail(input: $input) {
    protocol_id
    refresh_token
    token
    user {
      arweaveUrl
      createdAt
      credentialsExtraCredits
      dataModelsExtraCredits
      deletedAt
      displayName
      email
      gatewayId
      gatewayIdLastupdate
      gatewayIdUpdatedAt
      hash
      id
      isCompleted
      profilePicture
      roles
      status
      updatedAt
      walletId
    }
  }
}
    `;
exports.loginWallet_mutationDocument = (0, utils_1.gql) `
    mutation loginWallet_mutation($input: LoginWalletInput!) {
  loginWallet(input: $input) {
    protocol_id
    refresh_token
    token
    user {
      arweaveUrl
      createdAt
      credentialsExtraCredits
      dataModelsExtraCredits
      deletedAt
      displayName
      email
      gatewayId
      gatewayIdLastupdate
      gatewayIdUpdatedAt
      hash
      id
      isCompleted
      profilePicture
      roles
      status
      updatedAt
      walletId
    }
  }
}
    `;
exports.migrateAuthMethod_mutationDocument = (0, utils_1.gql) `
    mutation migrateAuthMethod_mutation($input: MigrateAuthInput!) {
  migrateAuthMethod(input: $input)
}
    `;
exports.refreshToken_mutationDocument = (0, utils_1.gql) `
    mutation refreshToken_mutation($input: RefreshTokenInput!) {
  refreshToken(input: $input) {
    protocol_id
    refresh_token
    token
    user {
      arweaveUrl
      createdAt
      credentialsExtraCredits
      dataModelsExtraCredits
      deletedAt
      displayName
      email
      gatewayId
      gatewayIdLastupdate
      gatewayIdUpdatedAt
      hash
      id
      isCompleted
      profilePicture
      roles
      status
      updatedAt
      walletId
    }
  }
}
    `;
exports.rejectDataRequest_mutationDocument = (0, utils_1.gql) `
    mutation rejectDataRequest_mutation($requestId: String!) {
  rejectDataRequest(requestId: $requestId) {
    arweaveUrl
    createdAt
    dataRequestTemplate {
      arweaveUrl
      createdAt
      dataRequestsCount
      description
      id
      name
      revenueGenerated
      schema
      tags
      uniqueVerifiersCount
    }
    dataUse
    id
    owner {
      arweaveUrl
      createdAt
      credentialsExtraCredits
      dataModelsExtraCredits
      deletedAt
      displayName
      email
      gatewayId
      gatewayIdLastupdate
      gatewayIdUpdatedAt
      hash
      id
      isCompleted
      profilePicture
      roles
      status
      updatedAt
      walletId
    }
    proof {
      arweaveUrl
      createdAt
      facilitationFee
      hash
      id
      proofHash
      status
      totalCost
      updatedAt
    }
    status
    verifier {
      arweaveUrl
      createdAt
      credentialsExtraCredits
      dataModelsExtraCredits
      deletedAt
      displayName
      email
      gatewayId
      gatewayIdLastupdate
      gatewayIdUpdatedAt
      hash
      id
      isCompleted
      profilePicture
      roles
      status
      updatedAt
      walletId
    }
    verifierOrganization {
      arweaveUrl
      createdAt
      description
      gatewayId
      id
      image
      name
      updatedAt
      usernameUpdatedAt
      verified
      walletId
      website
    }
  }
}
    `;
exports.removeApplication_mutationDocument = (0, utils_1.gql) `
    mutation removeApplication_mutation($id: String!) {
  removeApplication(id: $id) {
    apiKey
    gatewayFacilitationFee
    organization {
      arweaveUrl
      createdAt
      description
      gatewayId
      id
      image
      name
      updatedAt
      usernameUpdatedAt
      verified
      walletId
      website
    }
  }
}
    `;
exports.removeMemberFromOrganization_mutationDocument = (0, utils_1.gql) `
    mutation removeMemberFromOrganization_mutation($input: TransferMemberInput!) {
  removeMemberFromOrganization(input: $input)
}
    `;
exports.transferOwnership_mutationDocument = (0, utils_1.gql) `
    mutation transferOwnership_mutation($input: TransferMemberInput!) {
  transferOwnership(input: $input) {
    id
    organization {
      arweaveUrl
      createdAt
      description
      gatewayId
      id
      image
      name
      updatedAt
      usernameUpdatedAt
      verified
      walletId
      website
    }
    role
    user {
      arweaveUrl
      createdAt
      credentialsExtraCredits
      dataModelsExtraCredits
      deletedAt
      displayName
      email
      gatewayId
      gatewayIdLastupdate
      gatewayIdUpdatedAt
      hash
      id
      isCompleted
      profilePicture
      roles
      status
      updatedAt
      walletId
    }
  }
}
    `;
exports.unregisterAuthMethod_mutationDocument = (0, utils_1.gql) `
    mutation unregisterAuthMethod_mutation($input: AuthInput!) {
  unregisterAuthMethod(input: $input)
}
    `;
exports.updateMyDisplayName_mutationDocument = (0, utils_1.gql) `
    mutation updateMyDisplayName_mutation($displayName: String) {
  updateMyDisplayName(displayName: $displayName)
}
    `;
exports.updateMyGatewayId_mutationDocument = (0, utils_1.gql) `
    mutation updateMyGatewayId_mutation($gatewayId: String!) {
  updateMyGatewayId(gatewayId: $gatewayId) {
    accesses {
      id
      role
    }
    arweaveUrl
    authentications {
      hash
      id
      type
      userId
    }
    createdAt
    credentialsExtraCredits
    dataModels {
      arweaveUrl
      consumptionPrice
      createdAt
      description
      featured
      id
      image
      pdasIssuedCount
      permissioning
      revenueGenerated
      schema
      tags
      title
      uniqueIssuersCount
      verified
    }
    dataModelsExtraCredits
    dataRequestTemplates {
      arweaveUrl
      createdAt
      dataRequestsCount
      description
      id
      name
      revenueGenerated
      schema
      tags
      uniqueVerifiersCount
    }
    deletedAt
    displayName
    email
    gatewayId
    gatewayIdLastupdate
    gatewayIdUpdatedAt
    hash
    id
    isCompleted
    issuedPDAs {
      arweaveUrl
      claimHash
      expirationDate
      hash
      id
      issuanceDate
      issuerHash
      lastUpdated
      ownerHash
      status
    }
    issuedProofs {
      arweaveUrl
      createdAt
      facilitationFee
      hash
      id
      proofHash
      status
      totalCost
      updatedAt
    }
    profilePicture
    receivedPDAs {
      arweaveUrl
      claimHash
      expirationDate
      hash
      id
      issuanceDate
      issuerHash
      lastUpdated
      ownerHash
      status
    }
    receivedProofs {
      arweaveUrl
      createdAt
      facilitationFee
      hash
      id
      proofHash
      status
      totalCost
      updatedAt
    }
    recipientDataRequests {
      arweaveUrl
      createdAt
      dataUse
      id
      status
    }
    roles
    status
    updatedAt
    verifierDataRequests {
      arweaveUrl
      createdAt
      dataUse
      id
      status
    }
    walletId
  }
}
    `;
exports.updateMyProfilePicture_mutationDocument = (0, utils_1.gql) `
    mutation updateMyProfilePicture_mutation($profilePictureUrl: String) {
  updateMyProfilePicture(profilePictureUrl: $profilePictureUrl)
}
    `;
exports.updateNotificationEmail_mutationDocument = (0, utils_1.gql) `
    mutation updateNotificationEmail_mutation($email: String!) {
  updateNotificationEmail(email: $email) {
    user {
      arweaveUrl
      createdAt
      credentialsExtraCredits
      dataModelsExtraCredits
      deletedAt
      displayName
      email
      gatewayId
      gatewayIdLastupdate
      gatewayIdUpdatedAt
      hash
      id
      isCompleted
      profilePicture
      roles
      status
      updatedAt
      walletId
    }
  }
}
    `;
exports.updateOrganization_mutationDocument = (0, utils_1.gql) `
    mutation updateOrganization_mutation($input: UpdateOrganizationInput!) {
  updateOrganization(input: $input) {
    accesses {
      id
      role
    }
    arweaveUrl
    createdAt
    dataModels {
      arweaveUrl
      consumptionPrice
      createdAt
      description
      featured
      id
      image
      pdasIssuedCount
      permissioning
      revenueGenerated
      schema
      tags
      title
      uniqueIssuersCount
      verified
    }
    dataRequestTemplates {
      arweaveUrl
      createdAt
      dataRequestsCount
      description
      id
      name
      revenueGenerated
      schema
      tags
      uniqueVerifiersCount
    }
    description
    gatewayId
    id
    image
    name
    receivedProofs {
      arweaveUrl
      createdAt
      facilitationFee
      hash
      id
      proofHash
      status
      totalCost
      updatedAt
    }
    updatedAt
    usernameUpdatedAt
    verified
    verifierDataRequests {
      arweaveUrl
      createdAt
      dataUse
      id
      status
    }
    walletId
    website
  }
}
    `;
exports.updatePDA_mutationDocument = (0, utils_1.gql) `
    mutation updatePDA_mutation($input: UpdatePDAInput!) {
  updatePDA(input: $input) {
    arweaveUrl
    claimHash
    dataAsset {
      claim
      description
      expirationDate
      image
      qrCode
      title
    }
    expirationDate
    hash
    id
    issuanceDate
    issuerHash
    lastUpdated
    ownerHash
    status
  }
}
    `;
exports.updateUser_mutationDocument = (0, utils_1.gql) `
    mutation updateUser_mutation($input: UpdateUserInput!) {
  updateUser(input: $input) {
    accesses {
      id
      role
    }
    arweaveUrl
    authentications {
      hash
      id
      type
      userId
    }
    createdAt
    credentialsExtraCredits
    dataModels {
      arweaveUrl
      consumptionPrice
      createdAt
      description
      featured
      id
      image
      pdasIssuedCount
      permissioning
      revenueGenerated
      schema
      tags
      title
      uniqueIssuersCount
      verified
    }
    dataModelsExtraCredits
    dataRequestTemplates {
      arweaveUrl
      createdAt
      dataRequestsCount
      description
      id
      name
      revenueGenerated
      schema
      tags
      uniqueVerifiersCount
    }
    deletedAt
    displayName
    email
    gatewayId
    gatewayIdLastupdate
    gatewayIdUpdatedAt
    hash
    id
    isCompleted
    issuedPDAs {
      arweaveUrl
      claimHash
      expirationDate
      hash
      id
      issuanceDate
      issuerHash
      lastUpdated
      ownerHash
      status
    }
    issuedProofs {
      arweaveUrl
      createdAt
      facilitationFee
      hash
      id
      proofHash
      status
      totalCost
      updatedAt
    }
    profilePicture
    receivedPDAs {
      arweaveUrl
      claimHash
      expirationDate
      hash
      id
      issuanceDate
      issuerHash
      lastUpdated
      ownerHash
      status
    }
    receivedProofs {
      arweaveUrl
      createdAt
      facilitationFee
      hash
      id
      proofHash
      status
      totalCost
      updatedAt
    }
    recipientDataRequests {
      arweaveUrl
      createdAt
      dataUse
      id
      status
    }
    roles
    status
    updatedAt
    verifierDataRequests {
      arweaveUrl
      createdAt
      dataUse
      id
      status
    }
    walletId
  }
}
    `;
function getSdk(requester) {
    return {
        PDA_query(variables, options) {
            return requester(exports.PDA_queryDocument, variables, options);
        },
        PDACount_query(variables, options) {
            return requester(exports.PDACount_queryDocument, variables, options);
        },
        PDAs_query(variables, options) {
            return requester(exports.PDAs_queryDocument, variables, options);
        },
        applications_query(variables, options) {
            return requester(exports.applications_queryDocument, variables, options);
        },
        calculateProofCost_query(variables, options) {
            return requester(exports.calculateProofCost_queryDocument, variables, options);
        },
        checkUsernameAvailability_query(variables, options) {
            return requester(exports.checkUsernameAvailability_queryDocument, variables, options);
        },
        createDepositLink_query(variables, options) {
            return requester(exports.createDepositLink_queryDocument, variables, options);
        },
        dataModel_query(variables, options) {
            return requester(exports.dataModel_queryDocument, variables, options);
        },
        dataModels_query(variables, options) {
            return requester(exports.dataModels_queryDocument, variables, options);
        },
        dataModelsCount_query(variables, options) {
            return requester(exports.dataModelsCount_queryDocument, variables, options);
        },
        dataModelsMetadata_query(variables, options) {
            return requester(exports.dataModelsMetadata_queryDocument, variables, options);
        },
        dataRequest_query(variables, options) {
            return requester(exports.dataRequest_queryDocument, variables, options);
        },
        dataRequestCount_query(variables, options) {
            return requester(exports.dataRequestCount_queryDocument, variables, options);
        },
        dataRequestStatus_query(variables, options) {
            return requester(exports.dataRequestStatus_queryDocument, variables, options);
        },
        dataRequestTemplate_query(variables, options) {
            return requester(exports.dataRequestTemplate_queryDocument, variables, options);
        },
        dataRequestTemplates_query(variables, options) {
            return requester(exports.dataRequestTemplates_queryDocument, variables, options);
        },
        dataRequestTemplatesCount_query(variables, options) {
            return requester(exports.dataRequestTemplatesCount_queryDocument, variables, options);
        },
        dataRequestTemplatesMetadata_query(variables, options) {
            return requester(exports.dataRequestTemplatesMetadata_queryDocument, variables, options);
        },
        dataRequests_query(variables, options) {
            return requester(exports.dataRequests_queryDocument, variables, options);
        },
        financialTransactions_query(variables, options) {
            return requester(exports.financialTransactions_queryDocument, variables, options);
        },
        findValidPDAsForRequest_query(variables, options) {
            return requester(exports.findValidPDAsForRequest_queryDocument, variables, options);
        },
        generatedFees_query(variables, options) {
            return requester(exports.generatedFees_queryDocument, variables, options);
        },
        getExplorerStats_query(variables, options) {
            return requester(exports.getExplorerStats_queryDocument, variables, options);
        },
        getMonthlyUserUsage_query(variables, options) {
            return requester(exports.getMonthlyUserUsage_queryDocument, variables, options);
        },
        getTotalofIssuersByDataModel_query(variables, options) {
            return requester(exports.getTotalofIssuersByDataModel_queryDocument, variables, options);
        },
        getTransactionsExplorerStats_query(variables, options) {
            return requester(exports.getTransactionsExplorerStats_queryDocument, variables, options);
        },
        issuedPDAs_query(variables, options) {
            return requester(exports.issuedPDAs_queryDocument, variables, options);
        },
        issuedPDAsCount_query(variables, options) {
            return requester(exports.issuedPDAsCount_queryDocument, variables, options);
        },
        issuersByDataModel_query(variables, options) {
            return requester(exports.issuersByDataModel_queryDocument, variables, options);
        },
        issuersByDataModelCount_query(variables, options) {
            return requester(exports.issuersByDataModelCount_queryDocument, variables, options);
        },
        me_query(variables, options) {
            return requester(exports.me_queryDocument, variables, options);
        },
        myDataModelsCount_query(variables, options) {
            return requester(exports.myDataModelsCount_queryDocument, variables, options);
        },
        myDataRequestTemplatesCount_query(variables, options) {
            return requester(exports.myDataRequestTemplatesCount_queryDocument, variables, options);
        },
        myFinancialTransactions_query(variables, options) {
            return requester(exports.myFinancialTransactions_queryDocument, variables, options);
        },
        myFinancialTransactionsCount_query(variables, options) {
            return requester(exports.myFinancialTransactionsCount_queryDocument, variables, options);
        },
        myPDACount_query(variables, options) {
            return requester(exports.myPDACount_queryDocument, variables, options);
        },
        myPDAs_query(variables, options) {
            return requester(exports.myPDAs_queryDocument, variables, options);
        },
        myTransactions_query(variables, options) {
            return requester(exports.myTransactions_queryDocument, variables, options);
        },
        myWallet_query(variables, options) {
            return requester(exports.myWallet_queryDocument, variables, options);
        },
        organization_query(variables, options) {
            return requester(exports.organization_queryDocument, variables, options);
        },
        organizations_query(variables, options) {
            return requester(exports.organizations_queryDocument, variables, options);
        },
        proof_query(variables, options) {
            return requester(exports.proof_queryDocument, variables, options);
        },
        proofs_query(variables, options) {
            return requester(exports.proofs_queryDocument, variables, options);
        },
        proofsByPDAIds_query(variables, options) {
            return requester(exports.proofsByPDAIds_queryDocument, variables, options);
        },
        receivedProofs_query(variables, options) {
            return requester(exports.receivedProofs_queryDocument, variables, options);
        },
        receivedProofsCount_query(variables, options) {
            return requester(exports.receivedProofsCount_queryDocument, variables, options);
        },
        requestsReceived_query(variables, options) {
            return requester(exports.requestsReceived_queryDocument, variables, options);
        },
        requestsReceivedCount_query(variables, options) {
            return requester(exports.requestsReceivedCount_queryDocument, variables, options);
        },
        requestsSent_query(variables, options) {
            return requester(exports.requestsSent_queryDocument, variables, options);
        },
        requestsSentCount_query(variables, options) {
            return requester(exports.requestsSentCount_queryDocument, variables, options);
        },
        sentProofs_query(variables, options) {
            return requester(exports.sentProofs_queryDocument, variables, options);
        },
        sentProofsCount_query(variables, options) {
            return requester(exports.sentProofsCount_queryDocument, variables, options);
        },
        templateByDataRequest_query(variables, options) {
            return requester(exports.templateByDataRequest_queryDocument, variables, options);
        },
        transaction_query(variables, options) {
            return requester(exports.transaction_queryDocument, variables, options);
        },
        transactions_query(variables, options) {
            return requester(exports.transactions_queryDocument, variables, options);
        },
        transactionsCount_query(variables, options) {
            return requester(exports.transactionsCount_queryDocument, variables, options);
        },
        user_query(variables, options) {
            return requester(exports.user_queryDocument, variables, options);
        },
        verifiersByDataRequestTemplate_query(variables, options) {
            return requester(exports.verifiersByDataRequestTemplate_queryDocument, variables, options);
        },
        verifiersByDataRequestTemplateCount_query(variables, options) {
            return requester(exports.verifiersByDataRequestTemplateCount_queryDocument, variables, options);
        },
        addEmail_mutation(variables, options) {
            return requester(exports.addEmail_mutationDocument, variables, options);
        },
        addEmailConfirmation_mutation(variables, options) {
            return requester(exports.addEmailConfirmation_mutationDocument, variables, options);
        },
        addMemberToOrganization_mutation(variables, options) {
            return requester(exports.addMemberToOrganization_mutationDocument, variables, options);
        },
        addWallet_mutation(variables, options) {
            return requester(exports.addWallet_mutationDocument, variables, options);
        },
        addWalletConfirmation_mutation(variables, options) {
            return requester(exports.addWalletConfirmation_mutationDocument, variables, options);
        },
        changeMemberRole_mutation(variables, options) {
            return requester(exports.changeMemberRole_mutationDocument, variables, options);
        },
        changePDAStatus_mutation(variables, options) {
            return requester(exports.changePDAStatus_mutationDocument, variables, options);
        },
        createApplication_mutation(variables, options) {
            return requester(exports.createApplication_mutationDocument, variables, options);
        },
        createDataModel_mutation(variables, options) {
            return requester(exports.createDataModel_mutationDocument, variables, options);
        },
        createDataRequest_mutation(variables, options) {
            return requester(exports.createDataRequest_mutationDocument, variables, options);
        },
        createDataRequestTemplate_mutation(variables, options) {
            return requester(exports.createDataRequestTemplate_mutationDocument, variables, options);
        },
        createEmailNonce_mutation(variables, options) {
            return requester(exports.createEmailNonce_mutationDocument, variables, options);
        },
        createOrganization_mutation(variables, options) {
            return requester(exports.createOrganization_mutationDocument, variables, options);
        },
        createPDA_mutation(variables, options) {
            return requester(exports.createPDA_mutationDocument, variables, options);
        },
        createProof_mutation(variables, options) {
            return requester(exports.createProof_mutationDocument, variables, options);
        },
        createProofMessage_mutation(variables, options) {
            return requester(exports.createProofMessage_mutationDocument, variables, options);
        },
        createWalletNonce_mutation(variables, options) {
            return requester(exports.createWalletNonce_mutationDocument, variables, options);
        },
        deleteAccount_mutation(variables, options) {
            return requester(exports.deleteAccount_mutationDocument, variables, options);
        },
        loginEmail_mutation(variables, options) {
            return requester(exports.loginEmail_mutationDocument, variables, options);
        },
        loginWallet_mutation(variables, options) {
            return requester(exports.loginWallet_mutationDocument, variables, options);
        },
        migrateAuthMethod_mutation(variables, options) {
            return requester(exports.migrateAuthMethod_mutationDocument, variables, options);
        },
        refreshToken_mutation(variables, options) {
            return requester(exports.refreshToken_mutationDocument, variables, options);
        },
        rejectDataRequest_mutation(variables, options) {
            return requester(exports.rejectDataRequest_mutationDocument, variables, options);
        },
        removeApplication_mutation(variables, options) {
            return requester(exports.removeApplication_mutationDocument, variables, options);
        },
        removeMemberFromOrganization_mutation(variables, options) {
            return requester(exports.removeMemberFromOrganization_mutationDocument, variables, options);
        },
        transferOwnership_mutation(variables, options) {
            return requester(exports.transferOwnership_mutationDocument, variables, options);
        },
        unregisterAuthMethod_mutation(variables, options) {
            return requester(exports.unregisterAuthMethod_mutationDocument, variables, options);
        },
        updateMyDisplayName_mutation(variables, options) {
            return requester(exports.updateMyDisplayName_mutationDocument, variables, options);
        },
        updateMyGatewayId_mutation(variables, options) {
            return requester(exports.updateMyGatewayId_mutationDocument, variables, options);
        },
        updateMyProfilePicture_mutation(variables, options) {
            return requester(exports.updateMyProfilePicture_mutationDocument, variables, options);
        },
        updateNotificationEmail_mutation(variables, options) {
            return requester(exports.updateNotificationEmail_mutationDocument, variables, options);
        },
        updateOrganization_mutation(variables, options) {
            return requester(exports.updateOrganization_mutationDocument, variables, options);
        },
        updatePDA_mutation(variables, options) {
            return requester(exports.updatePDA_mutationDocument, variables, options);
        },
        updateUser_mutation(variables, options) {
            return requester(exports.updateUser_mutationDocument, variables, options);
        }
    };
}
exports.getSdk = getSdk;
