"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PDA = void 0;
const errorHandler_1 = require("../utils/errorHandler");
const validators_1 = require("../utils/validators");
class PDA {
    constructor(sdk) {
        this.sdk = sdk;
    }
    /**
     * The function `getPDA` is an asynchronous function that takes an `id` parameter and returns a
     * Promise that resolves to a `PDA_queryQuery` object.
     * @param {string} id - A string representing the ID of the PDA that you
     * want to query.
     * @returns The function `getPda` is returning a Promise that resolves to a `PDA_queryQuery` object.
     */
    getPDA(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                (0, validators_1.isUUIDValid)(id);
                return yield this.sdk.PDA_query({ id });
            }
            catch (error) {
                throw new Error((0, errorHandler_1.errorHandler)(error));
            }
        });
    }
    /**
     * The function `getPDACount` is an asynchronous function that retrieves the count of PDAs
     *  based on an optional filter.
     * @param {FilterPDAInput} [filter] - The `filter` parameter is an optional input that allows you to
     * specify criteria for filtering the PDAs  before counting them. It is
     * of type `FilterPDAInput`.
     * @returns a Promise that resolves to a number.
     */
    getPDACount(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return (yield this.sdk.PDACount_query({ filter })).PDACount;
            }
            catch (error) {
                throw new Error((0, errorHandler_1.errorHandler)(error));
            }
        });
    }
    /**
     * The function `getPDAs` retrieves PDAs based on the provided filter, order, skip, and take
     * parameters.
     * @param {PDAs_queryQueryVariables}  - - `filter`: An object that contains filter criteria for the query.
     * @returns a Promise that resolves to a value of type PDAs_queryQuery.
     */
    getPDAs(variables) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.sdk.PDAs_query(variables);
            }
            catch (error) {
                throw new Error((0, errorHandler_1.errorHandler)(error));
            }
        });
    }
    /**
     * The function `getIssuedPDAs` retrieves issued PDAs based on the provided filter, order, skip, and
     * take parameters.
     * @param {issuedPDAs_queryQueryVariables}  - - `filter`: An object that contains filter criteria for the query. It is
     * used to specify conditions that the returned PDAs must meet.
     * @returns a Promise that resolves to an object of type `issuedPDAs_queryQuery`.
     */
    getIssuedPDAs(variables) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.sdk.issuedPDAs_query(variables);
            }
            catch (error) {
                throw new Error((0, errorHandler_1.errorHandler)(error));
            }
        });
    }
    /**
     * The function `getIssuedPDAsCount` is an asynchronous function that retrieves the count of issued
     * PDAs based on an optional filter.
     * @param {FilterPDAInput} [filter] - The `filter` parameter is an optional input that allows you to
     * specify criteria for filtering the issued PDAs. It is of type `FilterPDAInput`.
     * @returns a Promise that resolves to a number.
     */
    getIssuedPDAsCount(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return (yield this.sdk.issuedPDAsCount_query({ filter })).issuedPDAsCount;
            }
            catch (error) {
                throw new Error((0, errorHandler_1.errorHandler)(error));
            }
        });
    }
    /**
     * The function `changePDAStatus` is an asynchronous function that takes an `id` and a `status` as
     * parameters and returns a Promise that resolves to a `changePDAStatus_mutationMutation` object.
     * @param  - - `id`: The ID of the PDA  whose status needs to be changed.
     * @returns a Promise that resolves to a `changePDAStatus_mutationMutation` object.
     */
    changePDAStatus({ id, status }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                (0, validators_1.isUUIDValid)(id);
                return yield this.sdk.changePDAStatus_mutation({ input: { id, status } });
            }
            catch (error) {
                throw new Error((0, errorHandler_1.errorHandler)(error));
            }
        });
    }
    /**
     * The function creates a PDA  using the provided input and returns the result.
     * @param {CreatePDAInput} pdaInput - The `pdaInput` parameter is an object that contains the input
     * data for creating a PDA . It is of type `CreatePDAInput`.
     * @returns the result of the `createPDA_mutation` method call, which is a Promise.
     */
    createPDA(pdaInput) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                (0, validators_1.validateObjectProperties)(pdaInput);
                return yield this.sdk.createPDA_mutation({ input: pdaInput });
            }
            catch (error) {
                throw new Error((0, errorHandler_1.errorHandler)(error));
            }
        });
    }
    /**
     * The function `updatePDA` updates a PDA  using the provided input and returns
     * the result of the mutation.
     * @param {UpdatePDAInput} updatedPDA - The parameter `updatedPDA` is of type `UpdatePDAInput`. It is
     * an input object that contains the data to update a PDA. The specific
     * properties and their types within `UpdatePDAInput` would depend on the implementation of the
     * `updatePDA_m
     * @returns a Promise that resolves to an object of type `updatePDA_mutationMutation`.
     */
    updatePDA(updatedPDA) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                (0, validators_1.validateObjectProperties)(updatedPDA);
                return yield this.sdk.updatePDA_mutation({ input: updatedPDA });
            }
            catch (error) {
                throw new Error((0, errorHandler_1.errorHandler)(error));
            }
        });
    }
}
exports.PDA = PDA;
