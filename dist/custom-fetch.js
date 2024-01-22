"use strict";
const { Headers, fetch } = require('@whatwg-node/fetch');
module.exports = function (url, init, context) {
    const headers = new Headers();
    headers.set('accept', 'application/graphql-response+json application/json multipart/mixed');
    headers.set('content-type', 'application/json');
    headers.set('Authorization', `Bearer ${context === null || context === void 0 ? void 0 : context.token}`);
    headers.set('X-Api-Key', context === null || context === void 0 ? void 0 : context.apiKey);
    init.headers = headers;
    return fetch((context === null || context === void 0 ? void 0 : context.url) || url, init);
};
