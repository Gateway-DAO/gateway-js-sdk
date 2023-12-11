export const PDAMockService = jest.fn().mockResolvedValue({
  createPDAMutationMock:jest.spyOn(pda.sdk, 'createPDA_mutation');
});