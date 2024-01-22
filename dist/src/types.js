"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chain = exports.AuthType = exports.OrganizationRole = exports.OrganizationIdentifierType = exports.PDAStatus = exports.UserIdentifierType = void 0;
var UserIdentifierType;
(function (UserIdentifierType) {
    UserIdentifierType["EMAIL"] = "EMAIL";
    UserIdentifierType["EVM"] = "EVM";
    UserIdentifierType["GATEWAY_ID"] = "GATEWAY_ID";
    UserIdentifierType["SOLANA"] = "SOLANA";
    UserIdentifierType["USER_ID"] = "USER_ID";
})(UserIdentifierType || (exports.UserIdentifierType = UserIdentifierType = {}));
var PDAStatus;
(function (PDAStatus) {
    PDAStatus["Expired"] = "Expired";
    PDAStatus["Revoked"] = "Revoked";
    PDAStatus["Suspended"] = "Suspended";
    PDAStatus["Valid"] = "Valid";
})(PDAStatus || (exports.PDAStatus = PDAStatus = {}));
var OrganizationIdentifierType;
(function (OrganizationIdentifierType) {
    OrganizationIdentifierType["GATEWAY_ID"] = "GATEWAY_ID";
    OrganizationIdentifierType["ORG_ID"] = "ORG_ID";
})(OrganizationIdentifierType || (exports.OrganizationIdentifierType = OrganizationIdentifierType = {}));
var OrganizationRole;
(function (OrganizationRole) {
    OrganizationRole["Admin"] = "Admin";
    OrganizationRole["Member"] = "Member";
    OrganizationRole["Owner"] = "Owner";
})(OrganizationRole || (exports.OrganizationRole = OrganizationRole = {}));
var AuthType;
(function (AuthType) {
    AuthType["EMAIL"] = "EMAIL";
    AuthType["GOOGLE"] = "GOOGLE";
    AuthType["HOT_WALLET"] = "HOT_WALLET";
    AuthType["WALLET"] = "WALLET";
})(AuthType || (exports.AuthType = AuthType = {}));
var Chain;
(function (Chain) {
    Chain["EVM"] = "EVM";
    Chain["SOL"] = "SOL";
})(Chain || (exports.Chain = Chain = {}));
