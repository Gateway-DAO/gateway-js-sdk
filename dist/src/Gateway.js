"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gateway = exports.OrganizationRole = exports.UserIdentifierType = exports.PDAStatus = exports.OrganizationIdentifierType = exports.Chain = exports.AuthType = void 0;
const _mesh_1 = require("../.mesh");
const organization_1 = require("./organization/organization");
const auth_1 = require("./auth/auth");
const pda_1 = require("./pda/pda");
const dataRequestsTemplate_1 = require("./dataRequestsTemplate/dataRequestsTemplate");
const proof_1 = require("./proof/proof");
const request_1 = require("./request/request");
const data_model_1 = require("./data-model/data-model");
const user_1 = require("./user/user");
var types_1 = require("./types");
Object.defineProperty(exports, "AuthType", { enumerable: true, get: function () { return types_1.AuthType; } });
Object.defineProperty(exports, "Chain", { enumerable: true, get: function () { return types_1.Chain; } });
Object.defineProperty(exports, "OrganizationIdentifierType", { enumerable: true, get: function () { return types_1.OrganizationIdentifierType; } });
Object.defineProperty(exports, "PDAStatus", { enumerable: true, get: function () { return types_1.PDAStatus; } });
Object.defineProperty(exports, "UserIdentifierType", { enumerable: true, get: function () { return types_1.UserIdentifierType; } });
Object.defineProperty(exports, "OrganizationRole", { enumerable: true, get: function () { return types_1.OrganizationRole; } });
class Gateway {
    constructor({ apiKey, token, url, }) {
        if (!apiKey && !token)
            throw new Error('No token found');
        this.sdk = (0, _mesh_1.getMeshSDK)({
            apiKey,
            token,
            url,
        });
        this.pda = new pda_1.PDA(this.sdk);
        this.dataRequestTemplate = new dataRequestsTemplate_1.DataRequestTemplate(this.sdk);
        this.organization = new organization_1.Organization(this.sdk);
        this.auth = new auth_1.Auth(this.sdk);
        this.dataModel = new data_model_1.DataModel(this.sdk);
        this.proof = new proof_1.Proof(this.sdk);
        this.request = new request_1.Request(this.sdk);
        this.user = new user_1.User(this.sdk);
    }
}
exports.Gateway = Gateway;
