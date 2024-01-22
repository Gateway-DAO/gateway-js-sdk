import { Organization } from './organization/organization';
import { Auth } from './auth/auth';
import { PDA } from './pda/pda';
import { DataRequestTemplate } from './dataRequestsTemplate/dataRequestsTemplate';
import { Proof } from './proof/proof';
import { Request } from './request/request';
import { DataModel } from './data-model/data-model';
import { User } from './user/user';
export { AuthType, Chain, OrganizationIdentifierType, PDAStatus, UserIdentifierType, OrganizationRole, } from './types';
export declare class Gateway {
    private sdk;
    dataModel: DataModel;
    proof: Proof;
    user: User;
    request: Request;
    pda: PDA;
    dataRequestTemplate: DataRequestTemplate;
    organization: Organization;
    auth: Auth;
    constructor({ apiKey, token, url, }: {
        apiKey: string;
        token: string;
        url: string;
    });
}
