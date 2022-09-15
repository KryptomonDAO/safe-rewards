import { ethers } from "ethers";

import { DAOFacet, DAOFacet__factory } from "../contracts";

export const daoFacetInterface = DAOFacet__factory.createInterface();

export function daoFacetInstance(address: string, provider: ethers.providers.Provider): DAOFacet {
  return DAOFacet__factory.connect(address, provider);
}
