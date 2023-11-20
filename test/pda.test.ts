import dotenv from 'dotenv';
import { Gateway } from '../src/Gateway';
import { PDAStatus, UserIdentifierType } from '../src/types';
dotenv.config();
const DEFAULT_TIMEOUT = 10000;

let api: Gateway;

beforeAll(() => {
  api = new Gateway({
    apiKey: process.env.API_KEY!,
    token: process.env.BEARER_TOKEN!,
  });
});

describe('PDA SERVICE TESTING', () => {
  it(
    'pda crud',
    async () => {
      let obj = {
        dataModelId: process.env.DATAMODEL_ID!,
        description: 'test',
        title: 'test',
        claim: {
          gatewayUse: 'test',
        },
        owner: {
          type: UserIdentifierType.GATEWAY_ID,
          value: 'sid',
        },
      };
      const { createPDA } = await api.pda.createPDA(obj);
      const { changePDAStatus } = await api.pda.changePDAStatus({
        id: createPDA.id,
        status: PDAStatus.Suspended,
      });
      expect(changePDAStatus.status).toEqual(PDAStatus.Suspended);
      const { PDA } = await api.pda.getPDA(createPDA.id);
      expect(PDA?.dataAsset?.title).toEqual('test');
    },
    DEFAULT_TIMEOUT,
  );

  it(
    'pda count',
    async () => {
      const count = await api.pda.getPDACount();
      expect(count).toBeGreaterThanOrEqual(0);
    },
    DEFAULT_TIMEOUT,
  );

  it(
    'pdas',
    async () => {
      const { PDAs } = await api.pda.getPDAs({ skip: 0, take: 10 });
      expect(PDAs.length).toBeGreaterThanOrEqual(0);
    },
    DEFAULT_TIMEOUT,
  );

  it(
    'issued pdas count',
    async () => {
      const count = await api.pda.getIssuedPDAsCount();
      expect(count).toBeGreaterThanOrEqual(0);
    },
    DEFAULT_TIMEOUT,
  );
});
