import { MOCK_DEMANDS } from "@/mocks/fake-data";

export const demandService = {
  getAll: async () => {
    await new Promise(res => setTimeout(res, 800));
    return MOCK_DEMANDS;
  }
};